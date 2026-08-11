import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import socket from "../sockets/socket";
import api from "../lib/axios";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestNotification, setLatestNotification] =
    useState(null);

  useEffect(() => {
    if (!user?._id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotifications([]);
      setUnreadCount(0);
      setLatestNotification(null);

      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await api.get(
          "/notifications"
        );

        const data = response.data.data || [];

        setNotifications(data);

        setUnreadCount(
          data.filter(
            (notification) =>
              !notification.isRead
          ).length
        );
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );
      }
    };

    fetchNotifications();
  }, [user?._id]);

  useEffect(() => {
    if (!user?._id) return;

    const handleNewNotification = (
      notification
    ) => {
      console.log(
        "🔔 New notification:",
        notification
      );

      setNotifications((prev) => [
        notification,
        ...prev,
      ]);

      setUnreadCount((prev) => prev + 1);

      setLatestNotification(notification);
    };

    socket.connect();

    socket.emit(
      "join:user",
      user._id
    );

    socket.on(
      "new-notification",
      handleNewNotification
    );

    return () => {
      socket.off(
        "new-notification",
        handleNewNotification
      );

      socket.disconnect();
    };
  }, [user?._id]);

  const markAsRead = async (
    notificationId
  ) => {
    try {
      const notification =
        notifications.find(
          (item) =>
            item._id === notificationId
        );

      if (notification?.isRead) {
        return;
      }

      await api.patch(
        `/notifications/${notificationId}/read`
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );

      setUnreadCount((prev) =>
        Math.max(prev - 1, 0)
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );

      throw error;
    }
  };

  const markAllAsRead = async () => {
    try {
      if (unreadCount === 0) {
        return;
      }

      await api.patch(
        "/notifications/read-all"
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );

      throw error;
    }
  };
  const deleteNotification = async (
    notificationId
  ) => {
    try {
      const notification =
        notifications.find(
          (item) =>
            item._id === notificationId
        );

      await api.delete(
        `/notifications/${notificationId}`
      );

      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            notification._id !== notificationId
        )
      );

      if (
        notification &&
        !notification.isRead
      ) {
        setUnreadCount((prev) =>
          Math.max(prev - 1, 0)
        );
      }
      if (
        latestNotification?._id ===
        notificationId
      ) {
        setLatestNotification(null);
      }
    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error
      );

      throw error;
    }
  };
  const clearLatestNotification = () => {
    setLatestNotification(null);
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        latestNotification,

        markAsRead,
        markAllAsRead,
        deleteNotification,

        clearLatestNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
};