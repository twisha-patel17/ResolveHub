import { BellRing, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LiveNotification = ({ notification }) => {
  if (!notification) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-orange-100 p-3">
            <BellRing size={22} className="text-orange-500" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Live Notification
            </h2>

            <p className="text-sm text-slate-500">
              You're all caught up 🎉
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          No new notifications available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-orange-100 p-3">
          <BellRing
            size={22}
            className="text-orange-500"
          />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Live Notification
          </h2>

          <p className="text-sm text-slate-500">
            Latest update
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900">
          {notification.title}
        </h3>

        <p className="text-sm leading-6 text-slate-600">
          {notification.message}
        </p>

        <p className="text-xs text-slate-400">
          {notification.time}
        </p>
      </div>

      <Link
        to="/notifications"
        className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-500 transition hover:text-orange-600"
      >
        View Notifications
        <ArrowRight size={16} />
      </Link>

    </div>
  );
};

export default LiveNotification;