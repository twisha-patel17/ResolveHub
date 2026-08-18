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
import SkeletonCard from "../../components/ui/SkeletonCard";

import api from "../../lib/axios";

const DashboardPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [activities, setActivities] = useState([]);

  const [complaintsLoading, setComplaintsLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setComplaintsLoading(true);

        const response = await api.get("/complaints/my");

        const complaintsData = response.data.data;

        const userComplaints = Array.isArray(complaintsData)
          ? complaintsData
          : complaintsData?.complaints || [];

        setComplaints(userComplaints);
      } catch (error) {
        console.error(
          "Failed to fetch complaints:",
          error
        );
      } finally {
        setComplaintsLoading(false);
      }
    };

    const fetchActivities = async () => {
      try {
        setActivitiesLoading(true);

        const response = await api.get(
          "/complaints/activity/recent"
        );

        const activitiesData = response.data.data;

        const userActivities = Array.isArray(activitiesData)
          ? activitiesData
          : [];

        setActivities(userActivities.slice(0, 3));
      } catch (error) {
        console.error(
          "Failed to fetch activities:",
          error
        );
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchComplaints();
    fetchActivities();
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

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <DashboardHeader />

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {complaintsLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard
                title="Total Complaints"
                value={stats.total}
                subtitle="All complaints"
                icon={FileText}
                iconBg="bg-orange-100"
                iconColor="text-orange-500"
                accentColor="bg-orange-500"
              />

              <StatCard
                title="Pending"
                value={stats.pending}
                subtitle="Awaiting review"
                icon={Clock3}
                iconBg="bg-yellow-100"
                iconColor="text-yellow-600"
                accentColor="bg-yellow-500"
              />

              <StatCard
                title="In Progress"
                value={stats.inProgress}
                subtitle="Currently active"
                icon={Activity}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
                accentColor="bg-blue-500"
              />

              <StatCard
                title="Resolved"
                value={stats.resolved}
                subtitle="Completed"
                icon={CircleCheckBig}
                iconBg="bg-green-100"
                iconColor="text-green-600"
                accentColor="bg-green-500"
              />
            </>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <RecentComplaints
              complaints={complaints}
              loading={complaintsLoading}
            />
          </div>

          <ActivityFeed
            activities={activities}
            loading={activitiesLoading}
          />

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;