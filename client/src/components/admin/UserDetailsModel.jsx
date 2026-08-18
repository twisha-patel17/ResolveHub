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

import api from "../../lib/axios";

const UserDetailsModal = ({ user, onClose }) => {
  const userId = user?.id || user?._id;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-user", userId],

    queryFn: async () => {
      const res = await api.get(
        `/admin/users/${userId}`
      );

      return res.data.data;
    },

    enabled: Boolean(userId),
  });

  if (!user) return null;

  const userData = data || user;

  const complaints = Number(
    userData.complaints || 0
  );

  const resolved = Number(
    userData.resolved || 0
  );

  const resolutionRate = complaints
    ? Math.round((resolved / complaints) * 100)
    : 0;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-900/50
        p-0
        backdrop-blur-sm
        sm:p-4
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          bg-white
          shadow-2xl
          sm:h-auto
          sm:max-h-[92vh]
          sm:max-w-2xl
          sm:rounded-2xl
        "
      >
       
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-4
            py-3
            sm:px-5
            sm:py-4
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-orange-100
                text-base
                font-bold
                text-orange-600
                sm:h-11
                sm:w-11
                sm:text-lg
              "
            >
              {userData.name
                ?.charAt(0)
                .toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                User Details
              </h2>

              <p className="mt-0.5 truncate text-[11px] text-slate-400 sm:text-xs">
                {userData.id || userId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              ml-3
              shrink-0
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-4 sm:p-5 lg:p-6">
            {isLoading ? (
              <div className="flex min-h-[280px] items-center justify-center">
                <div className="text-center">
                  <div
                    className="
                      mx-auto
                      h-8
                      w-8
                      animate-spin
                      rounded-full
                      border-2
                      border-slate-200
                      border-t-orange-500
                    "
                  />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading user details...
                  </p>
                </div>
              </div>
            ) : isError ? (
              <div className="flex min-h-[280px] items-center justify-center">
                <div className="rounded-xl bg-red-50 px-5 py-4 text-center">
                  <p className="text-sm font-medium text-red-600">
                    Failed to load user details.
                  </p>

                  <p className="mt-1 text-xs text-red-400">
                    Please try again later.
                  </p>
                </div>
              </div>
            ) : (
              <>
               
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-orange-100
                          text-xl
                          font-bold
                          text-orange-600
                          sm:h-16
                          sm:w-16
                          sm:text-2xl
                        "
                      >
                        {userData.name
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                          {userData.name ||
                            "Unknown User"}
                        </h3>

                        <p className="mt-1 flex min-w-0 items-center gap-2 text-xs text-slate-500 sm:text-sm">
                          <Mail
                            size={14}
                            className="shrink-0"
                          />

                          <span className="truncate">
                            {userData.email ||
                              "No email available"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* STATUS + ROLE */}
                    <div className="flex flex-wrap gap-2 sm:pl-20">
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          ${
                            userData.status ===
                            "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {userData.status ||
                          "Unknown"}
                      </span>

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          ${
                            userData.role ===
                            "Admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-200 text-slate-600"
                          }
                        `}
                      >
                        {userData.role || "User"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">
                    Basic Information
                  </h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <Info
                      icon={<User size={16} />}
                      label="User ID"
                      value={userData.id || "—"}
                    />

                    <Info
                      icon={
                        <CalendarDays size={16} />
                      }
                      label="Joined"
                      value={
                        userData.joined ||
                        (userData.joinedAt
                          ? new Date(
                              userData.joinedAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "—")
                      }
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">
                    Complaint Activity
                  </h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <Stat
                      icon={<FileText size={17} />}
                      label="Complaints"
                      value={complaints}
                    />

                    <Stat
                      icon={
                        <CheckCircle2 size={17} />
                      }
                      label="Resolved"
                      value={resolved}
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

                <div className="mt-5 rounded-2xl border border-slate-200 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <ShieldCheck
                        size={19}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800">
                        Account Role
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        This account is registered as{" "}
                        <span className="font-semibold text-slate-700">
                          {userData.role ||
                            "User"}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-100
                sm:w-auto
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-[10px] font-medium uppercase tracking-wide sm:text-xs">
          {label}
        </span>
      </div>

      <p className="mt-2 break-all text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
};

const Stat = ({
  icon,
  label,
  value,
  className = "text-slate-900",
}) => {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-[10px] uppercase tracking-wide sm:text-xs">
          {label}
        </span>
      </div>

      <p
        className={`mt-2 text-xl font-bold sm:text-2xl ${className}`}
      >
        {value}
      </p>
    </div>
  );
};

export default UserDetailsModal;