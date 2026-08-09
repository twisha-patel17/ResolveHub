import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LiveNotification = ({ notification }) => {
  if (!notification) {
    return (
      <div className="rounded-2xl bg-slate-800 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">

          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>

          <h2 className="font-bold">
            Live Notification
          </h2>
        </div>

        <p className="mt-3 text-sm text-slate-300">
          You're all caught up 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-800 p-6 text-white shadow-md">
      

      <div className="flex items-center gap-2">
        
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>

        <h2 className="font-bold">
          Live Notification
        </h2>

      </div>

      <div className="mt-4">
        
        <p className="text-sm leading-6 text-slate-300">
          {notification.title}
        </p>

        <p className="mt-1 text-sm leading-6 text-white">
          {notification.message}
        </p>

      </div>

      <Link
        to="/notifications"
        className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-orange-500
          px-4
          py-2.5
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition
          hover:bg-orange-600
        "
      >
        View update
        <ArrowRight size={15} />
      </Link>

    </div>
  );
};

export default LiveNotification;