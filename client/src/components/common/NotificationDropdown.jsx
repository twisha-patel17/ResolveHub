import {
  Bell,
  Trash2,
  MessageSquare,
  Clock,
  AlertCircle,
} from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";

const NotificationDropdown = ({ onClose }) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const getIcon = (type) => {
    if (type === "reply") {
      return <MessageSquare size={17} />;
    }

    if (type === "status") {
      return <Clock size={17} />;
    }

    return <AlertCircle size={17} />;
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
  };

  return (
    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-[calc(100vw-2rem)]
        max-w-[380px]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl
        sm:w-[380px]
      "
    >
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900">
              Notifications
            </h3>

            {unreadCount > 0 ? (
              <p className="mt-1 text-xs text-slate-500">
                {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-400">
                You're all caught up
              </p>
            )}
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Bell size={18} />
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="
              mt-3
              rounded-lg
              py-1
              text-xs
              font-semibold
              text-orange-600
              transition
              hover:text-orange-700
              focus:outline-none
              focus:ring-2
              focus:ring-orange-100
            "
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="max-h-[60vh] overflow-y-auto sm:max-h-[420px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center sm:py-14">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Bell size={25} className="text-slate-400" />
            </div>

            <p className="font-semibold text-slate-700">
              No notifications
            </p>

            <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-400">
              When there is an update on your complaints,
              you'll see it here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`
                group
                relative
                border-b
                border-slate-100
                px-4
                py-4
                transition
                sm:px-5
                ${
                  !notification.isRead
                    ? "bg-orange-50/40 hover:bg-orange-50"
                    : "bg-white hover:bg-slate-50"
                }
              `}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`
                    mt-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    sm:h-10
                    sm:w-10
                    ${
                      !notification.isRead
                        ? "bg-orange-100 text-orange-600"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {getIcon(notification.type)}
                </div>

                {/* Notification content */}
                <button
                  type="button"
                  onClick={() =>
                    handleNotificationClick(notification)
                  }
                  className="min-w-0 flex-1 text-left focus:outline-none"
                >
                  <div className="flex items-start gap-2">
                    <p
                      className={`
                        min-w-0
                        flex-1
                        break-words
                        text-sm
                        leading-5
                        ${
                          !notification.isRead
                            ? "font-bold text-slate-900"
                            : "font-semibold text-slate-700"
                        }
                      `}
                    >
                      {notification.title}
                    </p>

                    {!notification.isRead && (
                      <span
                        className="
                          mt-1.5
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          bg-orange-500
                        "
                      />
                    )}
                  </div>

                  <p className="mt-1.5 line-clamp-2 break-words text-xs leading-5 text-slate-500">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() =>
                    deleteNotification(notification._id)
                  }
                  className="
                    shrink-0
                    rounded-lg
                    p-1.5
                    text-slate-400
                    transition
                    hover:bg-red-50
                    hover:text-red-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-100
                  "
                  title="Delete notification"
                  aria-label="Delete notification"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-500
              transition
              hover:bg-white
              hover:text-slate-900
              focus:outline-none
              focus:ring-2
              focus:ring-slate-200
            "
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;