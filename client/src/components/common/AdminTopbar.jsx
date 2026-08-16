/* eslint-disable no-unused-vars */
import {
  Search,
  Bell,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import { getSocket } from "../../sockets/socket";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] =
    useState(false);

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications");

        setNotifications(
          response.data?.data || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
  const socket = getSocket();

  if (!socket) {
    console.error("Socket instance not found");
    return;
  }

  // Get logged-in user/admin
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    console.error("No logged-in user found");
    return;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Invalid user data in localStorage");
    return;
  }

  if (!user?._id) {
    console.error("Admin ID not found");
    return;
  }

  // Connect socket
  if (!socket.connected) {
    socket.connect();
  }

  // Join admin's personal notification room
  socket.emit("join-user", user._id);

  console.log(
    `👤 Admin joined room: user:${user._id}`
  );

  // Listen for new notifications
  const handleNewNotification = (notification) => {
    console.log(
      "🔔 New admin notification:",
      notification
    );

    setNotifications((prev) => {
      const exists = prev.some(
        (item) =>
          item._id === notification._id
      );

      if (exists) {
        return prev;
      }

      return [
        notification,
        ...prev,
      ];
    });
  };

  socket.on(
    "new-notification",
    handleNewNotification
  );

  return () => {
    socket.off(
      "new-notification",
      handleNewNotification
    );
  };
}, []);
  const unreadCount = notifications.filter(
    (notification) =>
      !notification.isRead
  ).length;


  const markAsRead = async (
    notification
  ) => {
    try {
      if (!notification.isRead) {
        await api.patch(
          `/notifications/${notification._id}/read`
        );

        setNotifications((prev) =>
          prev.map((item) =>
            item._id === notification._id
              ? {
                  ...item,
                  isRead: true,
                }
              : item
          )
        );
      }

      if (notification.complaint?._id) {
        navigate(
          `/complaints/${notification.complaint._id}`
        );
      }

      setShowNotifications(false);
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead = async () => {
    try {
      await api.patch(
        "/notifications/read-all"
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark notifications as read:",
        error
      );
    }
  };

  // ==========================================
  // VIEW ALL NOTIFICATIONS
  // ==========================================

  const viewAllNotifications = () => {
    setShowNotifications(false);

    navigate(
      "/admin/notifications"
    );
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">

      {/* LEFT */}

      <div>
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          Control Center
        </h2>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* SEARCH */}

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search complaints..."
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* =====================================
            NOTIFICATIONS
        ====================================== */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                (prev) => !prev
              )
            }
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-orange-500"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}
          </button>

          {/* ===================================
              DROPDOWN
          ==================================== */}

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Notifications
                  </h3>

                  <p className="text-xs text-slate-500">
                    {unreadCount} unread
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={
                      markAllAsRead
                    }
                    className="text-xs font-semibold text-orange-500 transition hover:text-orange-600"
                  >
                    Mark all read
                  </button>
                )}

              </div>

              {/* LIST */}

              <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (
                  <div className="px-6 py-10 text-center">

                    <Bell
                      size={28}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-600">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You're all caught up.
                    </p>

                  </div>
                ) : (
                  notifications
                    .slice(0, 5)
                    .map(
                      (notification) => (
                        <button
                          key={
                            notification._id
                          }
                          type="button"
                          onClick={() =>
                            markAsRead(
                              notification
                            )
                          }
                          className={`w-full border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 ${
                            !notification.isRead
                              ? "bg-orange-50/50"
                              : "bg-white"
                          }`}
                        >

                          <div className="flex gap-3">

                            {/* DOT */}

                            <div className="pt-1">
                              <span
                                className={`block h-2.5 w-2.5 rounded-full ${
                                  notification.isRead
                                    ? "bg-slate-200"
                                    : "bg-orange-500"
                                }`}
                              />
                            </div>

                            {/* CONTENT */}

                            <div className="min-w-0 flex-1">

                              <div className="flex items-start justify-between gap-2">

                                <p className="text-sm font-semibold text-slate-800">
                                  {
                                    notification.title
                                  }
                                </p>

                                {!notification.isRead && (
                                  <span className="text-[10px] font-bold uppercase text-orange-500">
                                    New
                                  </span>
                                )}

                              </div>

                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {
                                  notification.message
                                }
                              </p>

                              {notification.complaint && (
                                <p className="mt-2 text-[11px] font-semibold text-slate-400">
                                  {
                                    notification
                                      .complaint
                                      .complaintId
                                  }
                                </p>
                              )}

                              <p className="mt-1 text-[10px] text-slate-400">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}
                              </p>

                            </div>

                          </div>

                        </button>
                      )
                    )
                )}

              </div>

              {/* FOOTER */}

              {notifications.length > 0 && (
                <div className="border-t border-slate-200 p-3">

                  <button
                    type="button"
                    onClick={
                      viewAllNotifications
                    }
                    className="w-full rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-500"
                  >
                    View all notifications
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        {/* DIVIDER */}

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* ADMIN PROFILE */}

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <ShieldCheck size={20} />
          </div>

          <div className="hidden text-left sm:block">

            <p className="text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              System Admin
            </p>

          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />

        </button>

      </div>
    </header>
  );
};

export default AdminTopbar;