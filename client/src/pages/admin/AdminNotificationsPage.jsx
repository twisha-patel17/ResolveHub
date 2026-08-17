import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  MessageSquare,
  FileText,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../lib/axios";
import socket from "../../sockets/socket";
import { useAuth } from "../../context/AuthContext";

const AdminNotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const joinUserRoom = () => {
      socket.emit("join-user", user._id);
    };

    const handleNewNotification = (notification) => {
      if (!notification?._id) return;

      setNotifications((prev) => {
        const exists = prev.some(
          (item) => item._id === notification._id
        );

        return exists
          ? prev
          : [notification, ...prev];
      });
    };

    if (!socket.connected) socket.connect();

    if (socket.connected) {
      joinUserRoom();
    }

    socket.on("connect", joinUserRoom);
    socket.on(
      "notification:new",
      handleNewNotification
    );

    return () => {
      socket.off("connect", joinUserRoom);
      socket.off(
        "notification:new",
        handleNewNotification
      );
    };
  }, [user?._id]);

  const markAsRead = async (id) => {
    try {
      const { data } = await api.patch(
        `/notifications/${id}/read`
      );

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? data.data
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const getIcon = (type) =>
    type === "reply"
      ? MessageSquare
      : FileText;

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
              <Bell size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Stay updated with complaint activity.
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
            <p className="mt-4 text-sm text-slate-500">
              Loading notifications...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <Bell
              size={28}
              className="mx-auto text-slate-300"
            />
            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No notifications
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              You're all caught up.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);

              return (
                <div
                  key={notification._id}
                  className={`flex gap-4 border-b border-slate-100 p-5 last:border-b-0 ${
                    !notification.isRead
                      ? "bg-orange-50/40"
                      : ""
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      !notification.isRead
                        ? "bg-orange-100 text-orange-500"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        {notification.title}
                      </h3>

                      <span className="text-xs text-slate-400">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {notification.message}
                    </p>

                    {notification.complaint && (
                      <p className="mt-2 text-xs font-medium text-orange-500">
                        {notification.complaint.complaintId}
                        {" · "}
                        {notification.complaint.title}
                      </p>
                    )}

                    <div className="mt-3 flex gap-3">
                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            markAsRead(notification._id)
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-500"
                        >
                          <Check size={15} />
                          Mark as read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteNotification(
                            notification._id
                          )
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>

                  {!notification.isRead && (
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;