import {
  Search,
  Users,
  UserCheck,
  UserX,
  FileText,
  Eye,
  X,
  Mail,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const UserManagement = ({
  users = [],
  pagination,
  search,
  setSearch,
  status,
  setStatus,
  onSearch,
  clearFilters,
  page,
  setPage,
  selectedUser,
  setSelectedUser,
}) => {
  const totalUsers = pagination?.totalUsers || 0;
  const totalPages = pagination?.totalPages || 1;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const totalComplaints = users.reduce(
    (total, user) => total + user.complaints,
    0
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          User Management
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View and manage users registered on ResolveHub.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total Users", totalUsers, "Registered users", Users, "orange"],
          ["Active Users", activeUsers, "Currently active", UserCheck, "green"],
          ["Inactive Users", inactiveUsers, "Currently inactive", UserX, "red"],
          ["Total Complaints", totalComplaints, "Submitted by users", FileText, "blue"],
        ].map(([title, value, text, Icon, color]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {value}
                </h3>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${color}-100`}
              >
                <Icon size={21} className={`text-${color}-500`} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">{text}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Users</h2>
            <p className="text-xs text-slate-400">
              Search and filter registered users
            </p>
          </div>

          <button
            onClick={clearFilters}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b bg-slate-50">
                {["User", "User ID", "Status", "Complaints", "Joined", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.length ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {user.id}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {user.complaints}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {user.joined}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <Users size={35} className="mx-auto text-slate-300" />
                    <p className="mt-3 font-semibold text-slate-600">
                      No users found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
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

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-2 text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="rounded-lg border bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <ShieldCheck size={20} className="text-orange-500" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">User Details</h2>
                  <p className="text-xs text-slate-400">
                    {selectedUser.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {selectedUser.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <Mail size={16} className="text-slate-400" />
                  <p className="mt-2 break-all font-medium">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <CalendarDays size={16} className="text-slate-400" />
                  <p className="mt-2 font-medium">
                    {selectedUser.joined}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <FileText size={16} className="text-slate-400" />
                  <p className="mt-2 font-bold">
                    {selectedUser.complaints}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <UserCheck size={16} className="text-slate-400" />
                  <p
                    className={`mt-2 font-semibold ${
                      selectedUser.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedUser.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t bg-slate-50 px-5 py-4 text-right">
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;