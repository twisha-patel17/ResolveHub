import {
  CheckCircle2,
  Clock3,
  MessageSquare,
  Bell,
} from "lucide-react";

import SkeletonTable from "../../components/ui/SkeletonTable";

const ActivityFeed = ({
  activities = [],
  loading = false,
}) => {
  const getIcon = (type) => {
    const icons = {
      reply: (
        <MessageSquare
          size={18}
          className="text-blue-600"
        />
      ),
      resolved: (
        <CheckCircle2
          size={18}
          className="text-green-600"
        />
      ),
      pending: (
        <Clock3
          size={18}
          className="text-yellow-600"
        />
      ),
    };

    return (
      icons[type] || (
        <Bell
          size={18}
          className="text-orange-500"
        />
      )
    );
  };

  const getIconBg = (type) => {
    const backgrounds = {
      reply: "bg-blue-100",
      resolved: "bg-green-100",
      pending: "bg-yellow-100",
    };

    return backgrounds[type] || "bg-orange-100";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Recent Activity
      </h2>

      {loading ? (
        <SkeletonTable />
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 rounded-full bg-slate-100 p-4">
            <Bell
              size={22}
              className="text-slate-400"
            />
          </div>

          <p className="font-medium text-slate-700">
            No recent activity
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Your complaint activity will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={activity.id || index}
              className="flex items-start gap-4"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${getIconBg(
                  activity.type
                )}`}
              >
                {getIcon(activity.type)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {activity.description}
                </p>

                <span className="mt-2 block text-xs text-slate-400">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;