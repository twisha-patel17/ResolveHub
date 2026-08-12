import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  CircleCheckBig,
  Clock3,
  FileText,
  Users,
  AlertTriangle,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../lib/axios";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const [statsResponse, complaintsResponse] =
          await Promise.all([
            api.get("/complaints/dashboard/stats"),
            api.get("/complaints/admin/all?limit=5"),
          ]);

        setStats(
          statsResponse.data.data || {
            total: 0,
            pending: 0,
            inProgress: 0,
            resolved: 0,
            rejected: 0,
          }
        );

        setComplaints(
          complaintsResponse.data.data?.complaints || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch admin dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  const highPriorityCount = useMemo(() => {
    return complaints.filter(
      (complaint) =>
        complaint.priority === "High" ||
        complaint.priority === "Urgent" ||
        complaint.priority === "Critical"
    ).length;
  }, [complaints]);

  const recentComplaints = complaints.slice(0, 4);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Platform-wide overview, updated live.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <StatCard
            title="Total Complaints"
            value={loading ? "..." : stats.total}
            subtitle="Across platform"
            icon={FileText}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
          />

          <StatCard
            title="Pending"
            value={loading ? "..." : stats.pending}
            subtitle="Awaiting review"
            icon={Clock3}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />

          <StatCard
            title="In Progress"
            value={loading ? "..." : stats.inProgress}
            subtitle="Currently active"
            icon={Activity}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />

          <StatCard
            title="High Priority"
            value={loading ? "..." : highPriorityCount}
            subtitle="Recent complaints"
            icon={AlertTriangle}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />

          <StatCard
            title="Resolved"
            value={loading ? "..." : stats.resolved}
            subtitle="Completed"
            icon={CircleCheckBig}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />

          <StatCard
            title="Total Users"
            value="—"
            subtitle="Coming soon"
            icon={Users}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />

        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Monthly Complaints
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complaint activity across recent months.
              </p>
            </div>

            <div className="flex h-56 items-end gap-3 border-b border-slate-200 px-2 sm:gap-5">

              {[35, 48, 44, 62, 58, 76, 70].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-lg bg-orange-400 transition hover:bg-orange-500"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                )
              )}

            </div>

            <div className="mt-3 grid grid-cols-7 text-center text-xs text-slate-400">
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Resolution Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track how complaint resolution is progressing.
              </p>
            </div>

            <div className="relative h-56">

              <div className="absolute inset-0 flex flex-col justify-between">
                <span className="border-t border-slate-100" />
                <span className="border-t border-slate-100" />
                <span className="border-t border-slate-100" />
                <span className="border-t border-slate-100" />
                <span className="border-t border-slate-200" />
              </div>

              <svg
                viewBox="0 0 500 220"
                className="relative h-full w-full"
                preserveAspectRatio="none"
              >
                <polyline
                  points="10,185 90,160 165,155 245,120 320,105 400,65 490,55"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-green-500"
                />

                <polygon
                  points="10,185 90,160 165,155 245,120 320,105 400,65 490,55 490,220 10,220"
                  fill="currentColor"
                  className="text-green-50"
                />
              </svg>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Latest Complaints
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recently submitted complaints.
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                View all
              </button>

            </div>

            <div className="overflow-x-auto">

              {recentComplaints.length === 0 && !loading ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  No complaints found.
                </div>
              ) : (
                <table className="w-full min-w-[650px]">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-4 sm:px-6">
                        ID
                      </th>

                      <th className="px-5 py-4">
                        User
                      </th>

                      <th className="px-5 py-4">
                        Title
                      </th>

                      <th className="px-5 py-4">
                        Priority
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentComplaints.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >

                        <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600 sm:px-6">
                          {complaint.complaintId}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          {complaint.createdBy?.name ||
                            "Unknown"}
                        </td>

                        <td className="max-w-[240px] px-5 py-4">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {complaint.title}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              complaint.priority === "Urgent" ||
                              complaint.priority === "Critical"
                                ? "bg-red-100 text-red-700"
                                : complaint.priority === "High"
                                ? "bg-orange-100 text-orange-700"
                                : complaint.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {complaint.priority}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              complaint.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : complaint.status ===
                                  "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : complaint.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              )}

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Newest Users
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recently registered users.
              </p>
            </div>

            <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-slate-50">

              <div className="text-center">

                <Users
                  size={32}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="text-sm font-medium text-slate-500">
                  User statistics coming soon
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Connect the users API to display this section.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;