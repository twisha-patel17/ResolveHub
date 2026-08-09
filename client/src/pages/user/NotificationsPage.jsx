import {
  Bell,
  CheckCheck,
} from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import NotificationCard from "../../components/common/NotificationCard";
import NotificationEmpty from "../../components/common/NotificationEmpty";

import api from "../../lib/axios";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],

    queryFn: async () => {
      const response = await api.get("/notifications");

      return response.data.data;
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      const response = await api.patch(
        "/notifications/read-all"
      );

      return response.data.data;
    },

    onSuccess: () => {
      toast.success("All notifications marked as read");

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notification-count"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to mark notifications as read"
      );
    },
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const getDateGroup = (date) => {
    const notificationDate = new Date(date);
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
      notificationDate.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    if (
      notificationDate.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return "Earlier";
  };

  const groupedNotifications = notifications.reduce(
    (groups, notification) => {
      const group = getDateGroup(
        notification.createdAt
      );

      if (!groups[group]) {
        groups[group] = [];
      }

      groups[group].push(notification);

      return groups;
    },
    {}
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-125 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading notifications...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-bold text-red-700">
            Failed to load notifications
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error?.response?.data?.message ||
              "Something went wrong while loading notifications."}
          </p>

          <button
            type="button"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["notifications"],
              })
            }
            className="mt-4 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="rounded-2xl bg-orange-100 p-3">
              <Bell
                size={24}
                className="text-orange-500"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-1 text-slate-500">
                {unreadCount}{" "}
                {unreadCount === 1
                  ? "unread notification"
                  : "unread notifications"}
              </p>
            </div>

          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() =>
                markAllReadMutation.mutate()
              }
              disabled={
                markAllReadMutation.isPending
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:border-orange-400
                hover:bg-orange-50
                hover:text-orange-600
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <CheckCheck size={17} />

              {markAllReadMutation.isPending
                ? "Marking..."
                : "Mark all as read"}
            </button>
          )}

        </div>

        {notifications.length === 0 ? (
          <NotificationEmpty />
        ) : (
          <div className="space-y-8">

            {groupedNotifications.Today?.length > 0 && (
              <section>

                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Today
                </h2>

                <div className="space-y-3">
                  {groupedNotifications.Today.map(
                    (notification) => (
                      <NotificationCard
                        key={notification._id}
                        notification={notification}
                      />
                    )
                  )}
                </div>

              </section>
            )}

            {groupedNotifications.Yesterday?.length >
              0 && (
              <section>

                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Yesterday
                </h2>

                <div className="space-y-3">
                  {groupedNotifications.Yesterday.map(
                    (notification) => (
                      <NotificationCard
                        key={notification._id}
                        notification={notification}
                      />
                    )
                  )}
                </div>

              </section>
            )}

            {groupedNotifications.Earlier?.length > 0 && (
              <section>

                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Earlier
                </h2>

                <div className="space-y-3">
                  {groupedNotifications.Earlier.map(
                    (notification) => (
                      <NotificationCard
                        key={notification._id}
                        notification={notification}
                      />
                    )
                  )}
                </div>

              </section>
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;