import {
  Search,
  Users,
  UserCheck,
  UserX,
  FileText,
  Eye,
  RotateCcw,
} from "lucide-react";

import SkeletonTable from "../../components/ui/SkeletonTable";

const UserManagement = ({
  users = [],
  pagination,
  search = "",
  setSearch,
  status = "All",
  setStatus,
  onSearch,
  clearFilters,
  page,
  setPage,
  setSelectedUser,
  loading = false,
}) => {
  const totalUsers = pagination?.totalUsers ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  const activeUsers =
    pagination?.activeUsers ??
    users.filter((user) => user.status === "Active").length;

  const inactiveUsers =
    pagination?.inactiveUsers ??
    users.filter((user) => user.status === "Inactive").length;

  const totalComplaints =
    pagination?.totalComplaints ??
    users.reduce(
      (sum, user) => sum + Number(user.complaints || 0),
      0
    );

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      text: "Registered users",
      Icon: Users,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Active Users",
      value: activeUsers,
      text: "Currently active",
      Icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      text: "Currently inactive",
      Icon: UserX,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      title: "Total Complaints",
      value: totalComplaints,
      text: "Submitted by users",
      Icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="w-full min-w-0">
      {/* PAGE HEADER */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          User Management
        </h1>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
          View and manage users registered on ResolveHub.
        </p>
      </div>

      {/* STATISTICS */}
      {loading ? (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="
                animate-pulse
                min-w-0
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-full">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="mt-3 h-8 w-16 rounded bg-slate-200" />
                </div>

                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200 sm:h-11 sm:w-11" />
              </div>

              <div className="mt-4 h-3 w-28 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {stats.map(
            ({
              title,
              value,
              text,
              Icon,
              iconBg,
              iconColor,
            }) => (
              <div
                key={title}
                className="
                  min-w-0
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
                      {title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {value}
                    </h3>
                  </div>

                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      sm:h-11
                      sm:w-11
                      ${iconBg}
                    `}
                  >
                    <Icon
                      size={20}
                      className={iconColor}
                    />
                  </div>
                </div>

                <p className="mt-3 truncate text-[11px] text-slate-400 sm:text-xs">
                  {text}
                </p>
              </div>
            )
          )}
        </div>
      )}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-6 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900">
              Users
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Search and filter registered users
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-xs
              font-medium
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
              sm:text-sm
            "
          >
            <RotateCcw size={14} />
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        
          <div className="relative min-w-0">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch?.(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch?.();
                }
              }}
              placeholder="Search by name or email..."
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                py-3
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-100
              "
            />
          </div>

          <select
            value={status}
            onChange={(e) => {
              const selectedStatus = e.target.value;

              setStatus?.(selectedStatus);
              onSearch?.(selectedStatus);
            }}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-100
            "
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <SkeletonTable />
        ) : (
          <>
            {users.length > 0 && (
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-400 sm:hidden">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Swipe horizontally to view all columns
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {[
                      "User",
                      "User ID",
                      "Status",
                      "Complaints",
                      "Joined",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="
                          whitespace-nowrap
                          px-4
                          py-3.5
                          text-left
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-slate-500
                          sm:px-5
                          sm:py-4
                          sm:text-xs
                        "
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.length > 0 ? (
                    users.map((user) => {
                      const userId =
                        user.id || user._id;

                      return (
                        <tr
                          key={userId}
                          className="transition hover:bg-slate-50"
                        >
                     
                          <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                            <div className="flex min-w-[220px] items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600 sm:h-10 sm:w-10">
                                {user.name
                                  ?.charAt(0)
                                  .toUpperCase() ||
                                  "U"}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {user.name ||
                                    "Unknown User"}
                                </p>

                                <p className="max-w-[200px] truncate text-xs text-slate-400">
                                  {user.email ||
                                    "No email"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600 sm:px-5 sm:py-4">
                            {userId || "—"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5 sm:px-5 sm:py-4">
                            <span
                              className={`
                                inline-flex
                                rounded-full
                                px-3
                                py-1
                                text-[11px]
                                font-semibold
                                ${
                                  user.status ===
                                  "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }
                              `}
                            >
                              {user.status ||
                                "Unknown"}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-slate-700 sm:px-5 sm:py-4">
                            {Number(
                              user.complaints || 0
                            )}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500 sm:px-5 sm:py-4">
                            {user.joined ||
                              user.joinedAt ||
                              "—"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5 text-right sm:px-5 sm:py-4">
                            <button
                              type="button"
                              onClick={() => {
                                if (!userId) return;

                                setSelectedUser({
                                  ...user,
                                  id: userId,
                                });
                              }}
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-slate-200
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-slate-600
                                transition
                                hover:border-orange-200
                                hover:bg-orange-50
                                hover:text-orange-600
                                sm:text-sm
                              "
                            >
                              <Eye size={15} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-14 text-center"
                      >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                          <Users
                            size={25}
                            className="text-slate-300"
                          />
                        </div>

                        <p className="mt-3 font-semibold text-slate-600">
                          No users found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your search or
                          filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {users.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {totalUsers}
                  </span>{" "}
                  users
                </p>

                <div className="flex items-center justify-between gap-2 sm:justify-end">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() =>
                      setPage((currentPage) =>
                        Math.max(
                          currentPage - 1,
                          1
                        )
                      )
                    }
                    className="
                      flex-1
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-slate-600
                      transition
                      hover:bg-slate-100
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                      sm:flex-none
                      sm:text-sm
                    "
                  >
                    Previous
                  </button>

                  <span className="whitespace-nowrap px-1 text-xs text-slate-600 sm:px-2 sm:text-sm">
                    Page{" "}
                    <span className="font-semibold">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {totalPages}
                    </span>
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPage((currentPage) =>
                        Math.min(
                          currentPage + 1,
                          totalPages
                        )
                      )
                    }
                    className="
                      flex-1
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-slate-600
                      transition
                      hover:bg-slate-100
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                      sm:flex-none
                      sm:text-sm
                    "
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;