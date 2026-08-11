import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  FileText,
  MessageCircle,
  AlertCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

const NotificationsPage = () => {
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [deletingId, setDeletingId] =
    useState(null);
  const handleDelete = async (
    e,
    notificationId
  ) => {
    e.stopPropagation();

    try {
      setDeletingId(notificationId);

      await api.delete(
        `/notifications/${notificationId}`
      );

      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete notification"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleNotificationClick = async (
    notification
  ) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }

    if (notification.complaint?._id) {
      navigate(
        `/complaints/${notification.complaint._id}`
      );
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "status":
        return (
          <div className="rounded-xl bg-orange-100 p-3">
            <AlertCircle
              size={20}
              className="text-orange-500"
            />
          </div>
        );

      case "reply":
        return (
          <div className="rounded-xl bg-blue-100 p-3">
            <MessageCircle
              size={20}
              className="text-blue-600"
            />
          </div>
        );

      default:
        return (
          <div className="rounded-xl bg-purple-100 p-3">
            <Bell
              size={20}
              className="text-purple-600"
            />
          </div>
        );
    }
  };

  const formatTime = (date) => {
    if (!date) return "";

    const notificationDate =
      new Date(date);

    const now = new Date();

    const difference =
      now.getTime() -
      notificationDate.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days}d ago`;
    }

    return notificationDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3">
                <Bell
                  size={24}
                  className="text-orange-500"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Notifications
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Stay updated about your complaints.
                </p>
              </div>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-orange-200
                bg-orange-50
                px-4
                py-2.5
                text-sm
                font-semibold
                text-orange-600
                transition
                hover:bg-orange-100
              "
            >
              <CheckCheck size={17} />

              Mark all as read
            </button>
          )}

        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5">
                <Bell
                  size={19}
                  className="text-slate-600"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Total
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {notifications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-2.5">
                <Clock
                  size={19}
                  className="text-orange-500"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-orange-500">
                  Unread
                </p>
                <p className="text-xl font-bold text-orange-700">
                  {unreadCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2.5">
                <Check
                  size={19}
                  className="text-green-600"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-green-600">
                  Read
                </p>
                <p className="text-xl font-bold text-green-700">
                  {notifications.length -
                    unreadCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Notifications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest account activity.
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="flex min-h-90 flex-col items-center justify-center px-6 text-center">
              <div className="rounded-full bg-slate-100 p-5">
                <Bell
                  size={32}
                  className="text-slate-400"
                />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No notifications yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                You'll receive notifications here
                when there are updates to your
                complaints.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map(
                (notification) => (
                  <div
                    key={notification._id}
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                    className={`
                      group
                      cursor-pointer
                      px-6
                      py-5
                      transition
                      hover:bg-slate-50
                      ${
                        !notification.isRead
                          ? "bg-orange-50/40"
                          : "bg-white"
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">

                      {getNotificationIcon(
                        notification.type
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`
                                text-sm
                                ${
                                  notification.isRead
                                    ? "font-semibold text-slate-800"
                                    : "font-bold text-slate-900"
                                }
                              `}
                            >
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <span className="h-2 w-2 rounded-full bg-orange-500" />
                            )}
                          </div>
                          <span className="shrink-0 text-xs text-slate-400">
                            {formatTime(
                              notification.createdAt
                            )}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {notification.message}
                        </p>
                        {notification.complaint && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">

                            <FileText size={14} />

                            {notification.complaint
                              .complaintId}

                            <ChevronRight
                              size={14}
                            />

                          </div>
                        )}
                        <div className="mt-4 flex items-center gap-2">

                          {!notification.isRead && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                markAsRead(
                                  notification._id
                                );
                              }}
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-orange-600
                                transition
                                hover:bg-orange-100
                              "
                            >
                              <Check size={14} />

                              Mark as read
                            </button>
                          )}


                          <button
                            type="button"
                            disabled={
                              deletingId ===
                              notification._id
                            }
                            onClick={(e) =>
                              handleDelete(
                                e,
                                notification._id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              text-red-500
                              transition
                              hover:bg-red-50
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <Trash2 size={14} />

                            {deletingId ===
                            notification._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;