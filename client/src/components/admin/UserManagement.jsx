import { useMemo, useState } from "react";
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
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  /* =========================
     FILTER USERS
  ========================= */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" || user.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, status]);

  /* =========================
     STATS
  ========================= */

  const totalUsers = users.length;

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

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
  };

  return (
    <>
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          User Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage users registered on ResolveHub.
        </p>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Users */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Users
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {totalUsers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <Users
                size={21}
                className="text-orange-500"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Registered users
          </p>
        </div>

        {/* Active Users */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Users
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {activeUsers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <UserCheck
                size={21}
                className="text-green-600"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Currently active
          </p>
        </div>

        {/* Inactive Users */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Inactive Users
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {inactiveUsers}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
              <UserX
                size={21}
                className="text-red-500"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Currently inactive
          </p>
        </div>

        {/* Complaints */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Complaints
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {totalComplaints}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <FileText
                size={21}
                className="text-blue-500"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Submitted by users
          </p>
        </div>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-slate-900">
              Users
            </h2>

            <p className="text-xs text-slate-400">
              Search and filter registered users
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:self-auto"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* Search */}

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or ID..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User ID
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Complaints
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Joined
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* User */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                          {user.name
                            .charAt(0)
                            .toUpperCase()}
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

                    {/* ID */}

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {user.id}
                    </td>

                    {/* Status */}

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

                    {/* Complaints */}

                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-700">
                        {user.complaints}
                      </span>
                    </td>

                    {/* Joined */}

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {user.joined}
                    </td>

                    {/* Action */}

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center"
                  >
                    <Users
                      size={35}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-semibold text-slate-600">
                      No users found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* Table Footer */}

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {users.length}
            </span>{" "}
            users
          </p>
        </div>
      </div>

      {/* =========================
          USER DETAILS MODAL
      ========================= */}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <ShieldCheck
                    size={20}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    User Details
                  </h2>

                  <p className="text-xs text-slate-400">
                    {selectedUser.id}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Content */}

            <div className="p-5">

              {/* Profile */}

              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  {selectedUser.name
                    .charAt(0)
                    .toUpperCase()}
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

              {/* Details */}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Email
                    </span>
                  </div>

                  <p className="mt-2 break-all font-medium text-slate-700">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Joined
                    </span>
                  </div>

                  <p className="mt-2 font-medium text-slate-700">
                    {selectedUser.joined}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FileText size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Complaints
                    </span>
                  </div>

                  <p className="mt-2 font-bold text-slate-800">
                    {selectedUser.complaints}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <UserCheck size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Status
                    </span>
                  </div>

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

            {/* Modal Footer */}

            <div className="border-t bg-slate-50 px-5 py-4 text-right">

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
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