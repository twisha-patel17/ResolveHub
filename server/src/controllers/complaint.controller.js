import Complaint from "../models/Complaint.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";

export const createComplaint = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      category,
      priority,
      location,
    } = req.body;

    if (!title || !description || !category) {
      throw new ApiError(
        400,
        "Title, description and category are required"
      );
    }

    const complaint = await Complaint.create({
      complaintId: `RH${Date.now()}`,
      title,
      description,
      category,
      priority: priority || "Medium",
      location,
      createdBy: req.user._id,

      statusHistory: [
        {
          status: "Pending",
          message: "Complaint submitted",
          updatedBy: req.user._id,
        },
      ],

    });

    return res.status(201).json(
      new ApiResponse(
        201,
        complaint,
        "Complaint created successfully"
      )
    );
  }
);

export const getMyComplaints = asyncHandler(
  async (req, res) => {
    const complaints = await Complaint.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        complaints,
        "Complaints fetched successfully"
      )
    );
  }
);

export const getComplaintById = asyncHandler(
  async (req, res) => {
    const complaint = await Complaint.findById(
      req.params.id
    ).populate(
      "createdBy",
      "name email"
    ).populate("statusHistory.updatedBy", "name");

    if (!complaint) {
      throw new ApiError(
        404,
        "Complaint not found"
      );
    }

    if (
      complaint.createdBy._id.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Complaint fetched successfully"
      )
    );
  }
);

export const updateComplaint = asyncHandler(
  async (req, res) => {
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      throw new ApiError(404, "Complaint not found");
    }

    if (
      complaint.createdBy.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      throw new ApiError(403, "Access denied");
    }

    if (complaint.status !== "Pending") {
      throw new ApiError(
        400,
        "Only pending complaints can be updated"
      );
    }

    Object.assign(complaint, req.body);

    await complaint.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Complaint updated successfully"
      )
    );
  }
);

export const deleteComplaint = asyncHandler(
  async (req, res) => {
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      throw new ApiError(404, "Complaint not found");
    }

    if (
      complaint.createdBy.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      throw new ApiError(403, "Access denied");
    }

    if (complaint.status !== "Pending") {
      throw new ApiError(
        400,
        "Only pending complaints can be deleted"
      );
    }

    await complaint.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Complaint deleted successfully"
      )
    );
  }
);

export const getAllComplaints = asyncHandler(
  async (req, res) => {
    const {
      status,
      category,
      priority,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const [complaints, total] = await Promise.all([
      Complaint.find(query)
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),

      Complaint.countDocuments(query),
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          complaints,
          page: pageNumber,
          limit: limitNumber,
          total,
          totalPages: Math.ceil(total / limitNumber),
        },
        "Complaints fetched successfully"
      )
    );
  }
);

export const updateComplaintStatus = asyncHandler(
  async (req, res) => {
    const { status } = req.body;

    if (req.user.role !== "admin") {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Resolved",
      "Rejected",
    ]

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(
        400,
        "Invalid status"
      );
    }

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      throw new ApiError(
        404,
        "Complaint not found"
      );
    }

    complaint.status = status;

    complaint.statusHistory.push({
      status,
      message: `Complaint status changed to ${status}`,
      updatedBy: req.user._id,
    });

    await complaint.save();

    await createNotification({
      recipient: complaint.createdBy,
      complaint: complaint._id,
      title: "Complaint Status Updated",
      message: `Your complaint "${complaint.title}" is now ${status}.`,
      type: "status",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Complaint status updated successfully"
      )
    );
  }
);

export const getDashboardStats = asyncHandler(
  async (req, res) => {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const data = {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      rejected: 0,
    };

    stats.forEach((item) => {
      data.total += item.count;

      if (item._id === "Pending")
        data.pending = item.count;

      if (item._id === "In Progress")
        data.inProgress = item.count;

      if (item._id === "Resolved")
        data.resolved = item.count;

      if (item._id === "Rejected")
        data.rejected = item.count;
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        data,
        "Dashboard statistics fetched successfully"
      )
    );
  }
);

export const addReply = asyncHandler(
  async (req, res) => {
    const { message } = req.body;

    if (req.user.role !== "admin") {
      throw new ApiError(
        403,
        "Only admins can reply to complaints"
      );
    }

    if (!message?.trim()) {
      throw new ApiError(
        400,
        "Reply message is required"
      );
    }

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      throw new ApiError(
        404,
        "Complaint not found"
      );
    }

    complaint.replies.push({
      sender: "admin",
      message: message.trim(),
    });

    await complaint.save();

    await createNotification({
      recipient: complaint.createdBy,
      complaint: complaint._id,
      title: "New Reply",
      message:
        "An administrator replied to your complaint.",
      type: "reply",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Reply added successfully"
      )
    );
  }
);