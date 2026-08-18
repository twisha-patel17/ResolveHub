import {
  Search,
  Bell,
  ShieldCheck,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import { getSocket } from "../../sockets/socket";

const AdminTopbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] =
    useState(false);

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
      console.error(
        "Socket instance not found"
      );
      return;
    }

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error(
        "Invalid user data in localStorage"
      );
      return;
    }

    const adminId = user?._id;

    if (!adminId) {
      return;
    }

    const joinAdminRoom = () => {
      socket.emit(
        "join-user",
        adminId
      );
    };

    const handleNewNotification = (
      notification
    ) => {
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
      "connect",
      joinAdminRoom
    );

    socket.on(
      "new-notification",
      handleNewNotification
    );

    if (!socket.connected) {
      socket.connect();
    } else {
      joinAdminRoom();
    }

    return () => {
      socket.off(
        "connect",
        joinAdminRoom
      );

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

  const viewAllNotifications = () => {
    setShowNotifications(false);

    navigate(
      "/admin/notifications"
    );
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-4
        shadow-sm
        sm:h-20
        sm:px-6
        lg:px-8
      "
    >

      <div className="flex min-w-0 items-center gap-3">

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            text-slate-600
            transition
            hover:bg-slate-50
            lg:hidden
          "
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <p className="hidden text-sm font-medium text-slate-500 sm:block">
            Administration
          </p>

          <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
            Control Center
          </h2>
        </div>

      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search complaints..."
            className="
              w-64
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-2.5
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-orange-400
              focus:bg-white
              focus:ring-4
              focus:ring-orange-100
            "
          />
        </div>

        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            text-slate-600
            transition
            hover:bg-slate-50
            lg:hidden
          "
          aria-label="Search"
        >
          <Search size={19} />
        </button>

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                (prev) => !prev
              )
            }
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-600
              transition
              hover:bg-slate-50
              hover:text-orange-500
              sm:h-11
              sm:w-11
            "
            aria-label="Notifications"
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-500
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                  ring-2
                  ring-white
                "
              >
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="
                fixed
                left-3
                right-3
                top-18
                z-50
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
                sm:absolute
                sm:left-auto
                sm:right-0
                sm:top-14
                sm:w-96
              "
            >
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
                    onClick={markAllAsRead}
                    className="
                      text-xs
                      font-semibold
                      text-orange-500
                      transition
                      hover:text-orange-600
                    "
                  >
                    Mark all read
                  </button>
                )}

              </div>

              <div className="max-h-[60vh] overflow-y-auto sm:max-h-96">

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
                          className={`
                            w-full
                            border-b
                            border-slate-100
                            px-4
                            py-4
                            text-left
                            transition
                            hover:bg-slate-50
                            ${
                              !notification.isRead
                                ? "bg-orange-50/50"
                                : "bg-white"
                            }
                          `}
                        >

                          <div className="flex gap-3">

                            <div className="pt-1">
                              <span
                                className={`
                                  block
                                  h-2.5
                                  w-2.5
                                  rounded-full
                                  ${
                                    notification.isRead
                                      ? "bg-slate-200"
                                      : "bg-orange-500"
                                  }
                                `}
                              />
                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="flex items-start justify-between gap-2">

                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {
                                    notification.title
                                  }
                                </p>

                                {!notification.isRead && (
                                  <span className="shrink-0 text-[10px] font-bold uppercase text-orange-500">
                                    New
                                  </span>
                                )}

                              </div>

                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
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

              {notifications.length > 0 && (
                <div className="border-t border-slate-200 p-3">

                  <button
                    type="button"
                    onClick={
                      viewAllNotifications
                    }
                    className="
                      w-full
                      rounded-xl
                      bg-slate-50
                      py-2.5
                      text-sm
                      font-semibold
                      text-slate-700
                      transition
                      hover:bg-orange-50
                      hover:text-orange-500
                    "
                  >
                    View all notifications
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            transition
            hover:bg-slate-50
            sm:h-auto
            sm:w-auto
            sm:gap-3
            sm:px-2
            sm:py-1.5
          "
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <ShieldCheck size={20} />
          </div>

          <div className="hidden text-left md:block">

            <p className="text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              System Admin
            </p>

          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 md:block"
          />

        </button>

      </div>
    </header>
  );
};

export default AdminTopbar;

