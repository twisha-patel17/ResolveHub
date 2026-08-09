import { BellOff } from "lucide-react";

const NotificationEmpty = () => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <BellOff
          size={28}
          className="text-slate-400"
        />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        You're all caught up
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        You don't have any new notifications right now.
      </p>

    </div>
  );
};

export default NotificationEmpty;