import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import AdminAnalyticsCharts from "../../components/admin/AdminAnalyticsCharts";
import api from "../../lib/axios";

const DEFAULT_ANALYTICS = {
  totalComplaints: 0,
  resolutionRate: 0,
  avgResolutionTime: 0,
  rejectionRate: 0,
  complaintTrend: [],
  statusDistribution: [],
  categoryDistribution: [],
  priorityDistribution: [],
};

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(DEFAULT_ANALYTICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/complaints/admin/analytics"
        );

        const data = response.data?.data;

        if (!data) {
          throw new Error("Invalid analytics response");
        }

        setAnalytics({
          ...DEFAULT_ANALYTICS,
          ...data,
        });
      } catch (error) {
        console.error(
          "Failed to fetch admin analytics:",
          error
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load analytics"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Analyze complaint activity, resolution performance,
            categories, and priorities.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <AdminAnalyticsCharts
          analytics={analytics}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;