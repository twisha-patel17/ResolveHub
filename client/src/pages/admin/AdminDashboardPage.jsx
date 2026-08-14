import { useEffect, useState } from "react";
import {
  Activity,
  CircleCheckBig,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/dashboard/StatCard";
import ComplaintMonthlyChart from "../../components/admin/ComplaintMonthlyChart";
import ResolutionTrendChart from "../../components/admin/ResolutionTrendChart";
import api from "../../lib/axios";

const DEFAULT_STATS = {
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  rejected: 0,
};

const DEFAULT_CHARTS = {
  monthlyComplaints: [],
  resolutionTrend: [],
};

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [charts, setCharts] = useState(DEFAULT_CHARTS);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          statsResponse,
          complaintsResponse,
          chartsResponse,
        ] = await Promise.all([
          api.get("/complaints/admin/dashboard/stats"),

          api.get("/complaints/admin/all", {
            params: {
              page: 1,
              limit: 5,
            },
          }),

          api.get("/complaints/admin/dashboard/charts"),
        ]);

        setStats(
          statsResponse.data?.data || DEFAULT_STATS
        );

        setComplaints(
          complaintsResponse.data?.data?.complaints || []
        );

        setCharts(
          chartsResponse.data?.data || DEFAULT_CHARTS
        );
      } catch (error) {
        console.error(
          "Failed to fetch admin dashboard:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  const recentComplaints = complaints.slice(0, 4);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Platform-wide overview, updated live.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          <StatCard
            title="Total Complaints"
            value={loading ? "..." : stats.total}
            subtitle="All submitted complaints"
            icon={FileText}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
            accentColor="bg-orange-500"
          />

          <StatCard
            title="Pending"
            value={loading ? "..." : stats.pending}
            subtitle="Waiting for review"
            icon={Clock3}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
            accentColor="bg-yellow-500"
          />

          <StatCard
            title="In Progress"
            value={loading ? "..." : stats.inProgress}
            subtitle="Currently being handled"
            icon={Activity}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            accentColor="bg-blue-500"
          />

          <StatCard
            title="Resolved"
            value={loading ? "..." : stats.resolved}
            subtitle="Successfully completed"
            icon={CircleCheckBig}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            accentColor="bg-green-500"
          />

          <StatCard
            title="Rejected"
            value={loading ? "..." : stats.rejected}
            subtitle="Rejected complaints"
            icon={XCircle}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            accentColor="bg-red-500"
          />

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <ComplaintMonthlyChart
            data={charts.monthlyComplaints}
          />

          <ResolutionTrendChart
            data={charts.resolutionTrend}
          />

        </div>

        {/* Latest Complaints */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

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
              className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
            >
              View all
            </button>

          </div>

          <div className="overflow-x-auto">

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Loading complaints...
              </div>
            ) : recentComplaints.length === 0 ? (
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
                        {complaint.createdBy?.name || "Unknown"}
                      </td>

                      <td className="max-w-[240px] px-5 py-4">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {complaint.title}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            complaint.priority === "Urgent"
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
                              : complaint.status === "In Progress"
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

      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;