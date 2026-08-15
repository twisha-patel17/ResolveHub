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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserDetailsModal = ({ user, onClose }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-user", user?.id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/admin/users/${user.id}`,
        { withCredentials: true }
      );
      return res.data.data;
    },
    enabled: !!user?.id,
  });

  if (!user) return null;

  const userData = data || user;
  const resolutionRate = userData.complaints
    ? Math.round((userData.resolved / userData.complaints) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
              {userData.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="font-bold text-slate-900">User Details</h2>
              <p className="text-xs text-slate-400">{userData.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Loading user details...
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-sm text-red-500">
              Failed to load user details.
            </div>
          ) : (
            <>
              {/* Profile */}
              <div className="rounded-2xl border bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {userData.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Mail size={15} />
                      {userData.email}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        userData.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {userData.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        userData.role === "Admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {userData.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Info icon={<User size={16} />} label="User ID" value={userData.id} />
                <Info
                  icon={<CalendarDays size={16} />}
                  label="Joined"
                  value={userData.joinedAt}
                />
              </div>

              {/* Complaint Activity */}
              <div className="mt-5">
                <h4 className="mb-3 font-semibold text-slate-800">
                  Complaint Activity
                </h4>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Stat
                    icon={<FileText size={17} />}
                    label="Complaints"
                    value={userData.complaints}
                  />

                  <Stat
                    icon={<CheckCircle2 size={17} />}
                    label="Resolved"
                    value={userData.resolved}
                    className="text-green-600"
                  />

                  <Stat
                    icon={<Activity size={17} />}
                    label="Resolution Rate"
                    value={`${resolutionRate}%`}
                    className="text-orange-500"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mt-5 rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <ShieldCheck size={19} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      Account Role
                    </p>
                    <p className="text-sm text-slate-500">
                      This account is registered as{" "}
                      <span className="font-semibold text-slate-700">
                        {userData.role}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-5 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="rounded-xl border p-4">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
    <p className="mt-2 break-all font-semibold text-slate-800">{value}</p>
  </div>
);

const Stat = ({ icon, label, value, className = "text-slate-900" }) => (
  <div className="rounded-xl border p-4">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="text-xs uppercase tracking-wide">{label}</span>
    </div>
    <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
  </div>
);

export default UserDetailsModal;