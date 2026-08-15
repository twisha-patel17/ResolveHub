import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";
import Complaint from "../models/Complaint.model.js";

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - 6,
    1
  );

  const [summary, monthly, categories, priorities] = await Promise.all([
    Complaint.aggregate([
      {
        $group: {
          _id: null,
          totalComplaints: { $sum: 1 },
          resolvedComplaints: {
            $sum: {
              $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0],
            },
          },
        },
      },
    ]),

    Complaint.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),

    Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]),

    Complaint.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]),
  ]);

  const totalUsers = await User.countDocuments({
    role: "user",
  });

  const totalComplaints = summary[0]?.totalComplaints || 0;
  const resolvedComplaints = summary[0]?.resolvedComplaints || 0;

  const resolutionRate = totalComplaints
    ? Math.round((resolvedComplaints / totalComplaints) * 100)
    : 0;

  const resolvedTimes = await Complaint.aggregate([
    {
      $match: {
        status: "Resolved",
      },
    },
    {
      $project: {
        resolutionTime: {
          $subtract: ["$updatedAt", "$createdAt"],
        },
      },
    },
    {
      $group: {
        _id: null,
        averageTime: { $avg: "$resolutionTime" },
      },
    },
  ]);

  const averageResolutionTime = resolvedTimes[0]?.averageTime
    ? Number(
        (
          resolvedTimes[0].averageTime /
          (1000 * 60 * 60 * 24)
        ).toFixed(1)
      )
    : 0;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyComplaints = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const found = monthly.find(
      (item) =>
        item._id.year === year &&
        item._id.month === month
    );

    monthlyComplaints.push({
      month: monthNames[month - 1],
      count: found?.count || 0,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        admin: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },

        analytics: {
          summary: {
            totalComplaints,
            resolutionRate,
            averageResolutionTime,
            totalUsers,
          },

          monthlyComplaints,

          categoryDistribution: categories.map((item) => ({
            category: item._id,
            count: item.count,
          })),

          priorityDistribution: priorities.map((item) => ({
            priority: item._id,
            count: item.count,
          })),
        },
      },
      "Admin dashboard data fetched successfully"
    )
  );
});


export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(
    Math.max(Number(req.query.limit) || 10, 1),
    50
  );

  const search = req.query.search?.trim() || "";
  const status = req.query.status || "All";

  const match = {
    ...(status !== "All" && {
      isActive: status === "Active",
    }),

    ...(search && {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }),
  };

  const skip = (page - 1) * limit;

  const [users, totalUsers] = await Promise.all([
    User.aggregate([
      { $match: match },

      {
        $lookup: {
          from: "complaints",
          localField: "_id",
          foreignField: "createdBy",
          as: "complaintsData",
        },
      },

      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          name: 1,
          email: 1,
          role: 1,
          isActive: 1,
          createdAt: 1,

          complaints: {
            $size: "$complaintsData",
          },

          resolved: {
            $size: {
              $filter: {
                input: "$complaintsData",
                as: "complaint",
                cond: {
                  $eq: ["$$complaint.status", "Resolved"],
                },
              },
            },
          },
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]),

    User.countDocuments(match),
  ]);

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "admin" ? "Admin" : "User",
    status: user.isActive ? "Active" : "Inactive",
    complaints: user.complaints,
    resolved: user.resolved,
    joinedAt: user.createdAt,
    joined: new Date(user.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    ),
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users: formattedUsers,
        pagination: {
          page,
          limit,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
        },
      },
      "Users fetched successfully"
    )
  );
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const users = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },

    {
      $lookup: {
        from: "complaints",
        localField: "_id",
        foreignField: "createdBy",
        as: "complaintsData",
      },
    },

    {
      $project: {
        _id: 0,
        id: { $toString: "$_id" },
        name: 1,
        email: 1,
        role: 1,
        isActive: 1,
        createdAt: 1,

        complaints: {
          $size: "$complaintsData",
        },

        resolved: {
          $size: {
            $filter: {
              input: "$complaintsData",
              as: "complaint",
              cond: {
                $eq: ["$$complaint.status", "Resolved"],
              },
            },
          },
        },
      },
    },
  ]);

  if (!users.length) {
    throw new ApiError(404, "User not found");
  }

  const user = users[0];

  const formattedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "admin" ? "Admin" : "User",
    status: user.isActive ? "Active" : "Inactive",
    complaints: user.complaints,
    resolved: user.resolved,
    joinedAt: user.createdAt,
    joined: new Date(user.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    ),
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      formattedUser,
      "User details fetched successfully"
    )
  );
});