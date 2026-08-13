import {
  X,
  User,
  Mail,
  CalendarDays,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Activity,
} from "lucide-react";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
              {user.name.charAt(0)}
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                User Details
              </h2>

              <p className="text-xs text-slate-400">
                {user.id}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6">

          {/* Profile */}
          <div className="rounded-2xl border bg-slate-50 p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600">
                {user.name.charAt(0)}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {user.name}
                </h3>

                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={15} />
                  {user.email}
                </p>
              </div>

              <div className="flex gap-2">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "Admin"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {user.role}
                </span>

              </div>

            </div>

          </div>

          {/* Information */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <User size={16} />

                <span className="text-xs font-medium uppercase tracking-wide">
                  User ID
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {user.id}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={16} />

                <span className="text-xs font-medium uppercase tracking-wide">
                  Joined
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {user.joinedAt}
              </p>
            </div>

          </div>

          {/* Activity Stats */}
          <div className="mt-5">

            <h4 className="mb-3 font-semibold text-slate-800">
              Complaint Activity
            </h4>

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border p-4">

                <div className="flex items-center gap-2 text-slate-400">
                  <FileText size={17} />

                  <span className="text-xs uppercase tracking-wide">
                    Complaints
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {user.complaints}
                </p>

              </div>

              <div className="rounded-xl border p-4">

                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 size={17} />

                  <span className="text-xs uppercase tracking-wide">
                    Resolved
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold text-green-600">
                  {user.resolved}
                </p>

              </div>

              <div className="rounded-xl border p-4">

                <div className="flex items-center gap-2 text-slate-400">
                  <Activity size={17} />

                  <span className="text-xs uppercase tracking-wide">
                    Resolution Rate
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold text-orange-500">
                  {user.complaints
                    ? Math.round(
                        (user.resolved / user.complaints) * 100
                      )
                    : 0}
                  %
                </p>

              </div>

            </div>

          </div>

          {/* Role Information */}
          <div className="mt-5 rounded-xl border p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <ShieldCheck
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Account Role
                </p>

                <p className="text-sm text-slate-500">
                  This account is registered as a{" "}
                  <span className="font-semibold text-slate-700">
                    {user.role}
                  </span>
                  .
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-5 py-4">

          <div className="flex justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDetailsModal;