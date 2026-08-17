import { useEffect, useState } from "react";
import {
  Activity,
  CircleCheckBig,
  Clock3,
  FileText,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import ActivityFeed from "../../components/dashboard/ActivityFeed";

import api from "../../lib/axios";

const DashboardPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [complaintsResponse, activityResponse] =
          await Promise.all([
            api.get("/complaints/my"),
            api.get("/complaints/activity/recent"),
          ]);
const complaintsData =
  complaintsResponse.data.data;

const userComplaints = Array.isArray(complaintsData)
  ? complaintsData
  : complaintsData?.complaints || [];

const activitiesData =
  activityResponse.data.data;

const userActivities = Array.isArray(activitiesData)
  ? activitiesData
  : [];

setComplaints(userComplaints);
setActivities(userActivities.slice(0, 3));
      } catch (error) {
        console.error(
          "Failed to fetch dashboard data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = {
    total: complaints.length,

    pending: complaints.filter(
      (complaint) => complaint.status === "Pending"
    ).length,

    inProgress: complaints.filter(
      (complaint) => complaint.status === "In Progress"
    ).length,

    resolved: complaints.filter(
      (complaint) => complaint.status === "Resolved"
    ).length,

    rejected: complaints.filter(
      (complaint) => complaint.status === "Rejected"
    ).length,
  };

  const recentComplaints = complaints.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <DashboardHeader />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Complaints"
            value={loading ? "..." : stats.total}
            subtitle="All complaints"
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
            title="Resolved"
            value={loading ? "..." : stats.resolved}
            subtitle="Completed"
            icon={CircleCheckBig}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <RecentComplaints
              complaints={recentComplaints}
            />
          </div>

          <ActivityFeed
            activities={activities}
          />

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;