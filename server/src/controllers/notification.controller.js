import Notification from "../models/Notification.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getMyNotifications = asyncHandler(
  async (req, res) => {
    const notifications =
      await Notification.find({
        recipient: req.user._id,
      })
        .populate(
          "complaint",
          "complaintId title status"
        )
        .sort({ createdAt: -1 });
    return res.status(200).json(
      new ApiResponse(
        200,
        notifications,
        "Notifications fetched successfully"
      )
    );
  }
);

export const markNotificationAsRead =
  asyncHandler(async (req, res) => {
    const notification =
      await Notification.findOne({
        _id: req.params.id,
        recipient: req.user._id,
      });
    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }
    if (!notification.isRead) {
      notification.isRead = true;
      await notification.save();
    }
    return res.status(200).json(
      new ApiResponse(
        200,
        notification,
        "Notification marked as read"
      )
    );
  });

export const markAllNotificationsAsRead =
  asyncHandler(async (req, res) => {
    await Notification.updateMany(
      {
        recipient: req.user._id,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );
    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "All notifications marked as read"
      )
    );
  });

export const deleteNotification =
  asyncHandler(async (req, res) => {
    const notification =
      await Notification.findOneAndDelete({
        _id: req.params.id,
        recipient: req.user._id,
      });
    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }
    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Notification deleted successfully"
      )
    );
  });