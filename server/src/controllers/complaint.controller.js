import mongoose from "mongoose";
import Complaint from "../models/Complaint.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";

const ALLOWED_STATUSES = [
  "Pending",
  "In Progress",
  "Resolved",
  "Rejected",
];

const ALLOWED_UPDATE_FIELDS = [
  "title",
  "description",
  "category",
  "priority",
  "location",
  "images",
];

export const createComplaint = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    priority,
    location,
    images,
  } = req.body;

  if (!title?.trim() || !description?.trim() || !category) {
    throw new ApiError(
      400,
      "Title, description and category are required"
    );
  }

  const complaint = await Complaint.create({
    complaintId: `RH-${Date.now()}`,

    title: title.trim(),
    description: description.trim(),

    category,

    priority: priority || "Medium",

    location,

    images: images || [],

    createdBy: req.user._id,

    status: "Pending",

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
});

export const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({
    createdBy: req.user._id,
  })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      complaints,
      "Complaints fetched successfully"
    )
  );
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let complaint;

  if (mongoose.Types.ObjectId.isValid(id)) {
    complaint = await Complaint.findById(id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("statusHistory.updatedBy", "name");
  } else {
    complaint = await Complaint.findOne({
      complaintId: id,
    })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("statusHistory.updatedBy", "name");
  }

  if (!complaint) {
    throw new ApiError(
      404,
      "Complaint not found"
    );
  }

  const ownerId = complaint.createdBy?._id?.toString();

  const isOwner =
    ownerId === req.user._id.toString();

  const isAdmin =
    req.user.role === "admin";

  if (!isOwner && !isAdmin) {
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
});

export const updateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(
    req.params.id
  );

  if (!complaint) {
    throw new ApiError(
      404,
      "Complaint not found"
    );
  }

  const isOwner =
    complaint.createdBy.toString() ===
    req.user._id.toString();

  const isAdmin =
    req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  if (complaint.status !== "Pending") {
    throw new ApiError(
      400,
      "Only pending complaints can be updated"
    );
  }

  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (req.body[field] !== undefined) {
      complaint[field] = req.body[field];
    }
  }

  await complaint.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      complaint,
      "Complaint updated successfully"
    )
  );
});

export const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(
    req.params.id
  );

  if (!complaint) {
    throw new ApiError(
      404,
      "Complaint not found"
    );
  }

  const isOwner =
    complaint.createdBy.toString() ===
    req.user._id.toString();

  const isAdmin =
    req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(
      403,
      "Access denied"
    );
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
});

export const getAllComplaints = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  const {
    status,
    category,
    priority,
    search,
  } = req.query;

  const page = Math.max(
    Number(req.query.page) || 1,
    1
  );

  const limit = Math.min(
    Math.max(
      Number(req.query.limit) || 10,
      1
    ),
    100
  );

  const query = {};

  if (status) {
    if (!ALLOWED_STATUSES.includes(status)) {
      throw new ApiError(
        400,
        "Invalid complaint status"
      );
    }

    query.status = status;
  }

  if (category) {
    query.category = category;
  }

  if (priority) {
    query.priority = priority;
  }

  if (search?.trim()) {
    const searchValue = search.trim();

    query.$or = [
      {
        title: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        description: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        complaintId: {
          $regex: searchValue,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [complaints, total] = await Promise.all([
    Complaint.find(query)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Complaint.countDocuments(query),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        complaints,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      "Complaints fetched successfully"
    )
  );
});

export const updateComplaintStatus = asyncHandler(
  async (req, res) => {
    if (req.user.role !== "admin") {
      throw new ApiError(
        403,
        "Only admins can update complaint status"
      );
    }

    const {
      status,
      message,
    } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new ApiError(
        400,
        "Invalid complaint status"
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

    if (complaint.status === status) {
      throw new ApiError(
        400,
        `Complaint is already ${status}`
      );
    }

    complaint.status = status;

    complaint.statusHistory.push({
      status,
      message:
        message?.trim() ||
        `Complaint status changed to ${status}`,
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
    if (req.user.role !== "admin") {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
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

      switch (item._id) {
        case "Pending":
          data.pending = item.count;
          break;

        case "In Progress":
          data.inProgress = item.count;
          break;

        case "Resolved":
          data.resolved = item.count;
          break;

        case "Rejected":
          data.rejected = item.count;
          break;
      }
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

export const addReply = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    throw new ApiError(400, "Reply message is required");
  }

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  const isOwner =
    complaint.createdBy.toString() ===
    req.user._id.toString();

  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Access denied");
  }

  complaint.replies.push({
    sender: isAdmin ? "admin" : "user",
    message: message.trim(),
  });

  await complaint.save();

  await createNotification({
    recipient: isAdmin
      ? complaint.createdBy
      : complaint.assignedTo,
    complaint: complaint._id,
    title: isAdmin ? "New Reply" : "New Complaint Reply",
    message: isAdmin
      ? "An administrator replied to your complaint."
      : "The complainant replied to your complaint.",
    type: "reply",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      complaint,
      "Reply added successfully"
    )
  );
});