import mongoose from "mongoose";
import Complaint from "../models/Complaint.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getIO } from "../sockets/socket.js";
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
];

export const createComplaint = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      category,
      priority,
      location,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !category
    ) {
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

      location: location ? JSON.parse(location) : {},

      images: req.cloudinaryImages || [],

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
  }
);

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

    const { status, message } = req.body;

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

    const statusMessage =
      message?.trim() ||
      `Complaint status changed to ${status}`;

    complaint.statusHistory.push({
      status,
      message: statusMessage,
      updatedBy: req.user._id,
    });

    await complaint.save();

    const notification = await createNotification({
      recipient: complaint.createdBy,
      complaint: complaint._id,
      title: "Complaint Status Updated",
      message: `Your complaint "${complaint.title}" is now ${status}.`,
      type: "status",
    });

    try {
      const io = getIO();

      io.to(
        `user:${complaint.createdBy.toString()}`
      ).emit("notification:new", notification);
    } catch (socketError) {
      console.error(
        "Socket notification error:",
        socketError.message
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Complaint status updated successfully"
      )
    );
  }
);
export const getMyDashboardStats = asyncHandler(
  async (req, res) => {
    const stats = await Complaint.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user._id),
        },
      },
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
        "User dashboard statistics fetched successfully"
      )
    );
  }
);
export const addReply = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
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

  complaint.replies.push({
    sender: isAdmin ? "admin" : "user",
    message: message.trim(),
  });

  await complaint.save();

  const recipient = isAdmin
    ? complaint.createdBy
    : complaint.assignedTo;

  let notification = null;

  if (recipient) {
    notification = await createNotification({
      recipient,
      complaint: complaint._id,
      title: isAdmin
        ? "New Reply"
        : "New Complaint Reply",
      message: isAdmin
        ? "An administrator replied to your complaint."
        : "The complainant replied to your complaint.",
      type: "reply",
    });

    try {
      const io = getIO();

      io.to(
        `user:${recipient.toString()}`
      ).emit(
        "notification:new",
        notification
      );
    } catch (socketError) {
      console.error(
        "Socket notification error:",
        socketError.message
      );
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      complaint,
      "Reply added successfully"
    )
  );
});

export const getMyRecentActivity = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({
    createdBy: req.user._id,
  })
    .select(
      "complaintId title createdAt status statusHistory replies"
    )
    .sort({ updatedAt: -1 })
    .limit(10);

  const activities = [];

  complaints.forEach((complaint) => {
    activities.push({
      id: `${complaint._id}-created`,
      type: "pending",
      title: "Complaint Submitted",
      description: `${complaint.title} was submitted.`,
      time: complaint.createdAt,
      createdAt: complaint.createdAt,
    });

    complaint.statusHistory?.forEach((history, index) => {
      let type = "pending";
      let title = "Complaint Updated";

      if (history.status === "Resolved") {
        type = "resolved";
        title = "Complaint Resolved";
      } else if (history.status === "In Progress") {
        type = "reply";
        title = "Complaint In Progress";
      } else if (history.status === "Rejected") {
        type = "default";
        title = "Complaint Rejected";
      }

      activities.push({
        id: `${complaint._id}-status-${index}`,
        type,
        title,
        description:
          history.message ||
          `Complaint ${complaint.complaintId} status changed to ${history.status}.`,
        time: history.updatedAt,
        createdAt: history.updatedAt,
      });
    });
    complaint.replies?.forEach((reply, index) => {
      if (reply.sender === "admin") {
        activities.push({
          id: `${complaint._id}-reply-${index}`,
          type: "reply",
          title: "Admin Replied",
          description: reply.message,
          time: reply.createdAt,
          createdAt: reply.createdAt,
        });
      }
    });
  });
  activities.sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      activities.slice(0, 5),
      "Recent activity fetched successfully"
    )
  );
});