import {
  CheckCircle2,
  Clock3,
  MessageSquare,
  Bell,
} from "lucide-react";

const ActivityFeed = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case "reply":
        return (
          <MessageSquare
            size={18}
            className="text-blue-600"
          />
        );

      case "resolved":
        return (
          <CheckCircle2
            size={18}
            className="text-green-600"
          />
        );

      case "pending":
        return (
          <Clock3
            size={18}
            className="text-yellow-600"
          />
        );

      default:
        return (
          <Bell
            size={18}
            className="text-orange-500"
          />
        );
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "reply":
        return "bg-blue-100";

      case "resolved":
        return "bg-green-100";

      case "pending":
        return "bg-yellow-100";

      default:
        return "bg-orange-100";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full ${getIconBg(
                activity.type
              )}`}
            >
              {getIcon(activity.type)}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-800">
                {activity.title}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {activity.description}
              </p>

              <span className="mt-2 block text-xs text-slate-400">
                {activity.time}
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ActivityFeed;