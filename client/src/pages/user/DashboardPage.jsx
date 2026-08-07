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
import LiveNotification from "../../components/dashboard/LiveNotification";

const DashboardPage = () => {
  
  const complaints = [
    {
      _id: "1",
      complaintId: "RH-2049",
      title: "Street light not working",
      priority: "High",
      status: "In Progress",
      updatedAt: new Date(),
    },
    {
      _id: "2",
      complaintId: "RH-2048",
      title: "Garbage not collected",
      priority: "Medium",
      status: "Pending",
      updatedAt: new Date(),
    },
    {
      _id: "3",
      complaintId: "RH-2047",
      title: "Water leakage",
      priority: "Low",
      status: "Resolved",
      updatedAt: new Date(),
    },
  ];

  const activities = [
    {
      id: 1,
      type: "resolved",
      title: "Complaint Resolved",
      description: "Street light issue has been fixed.",
      time: "10 mins ago",
    },
    {
      id: 2,
      type: "reply",
      title: "Admin Replied",
      description: "Inspection scheduled for tomorrow.",
      time: "35 mins ago",
    },
    {
      id: 3,
      type: "pending",
      title: "Complaint Submitted",
      description: "Garbage complaint received.",
      time: "1 hour ago",
    },
  ];

  const notification = {
    title: "Complaint Updated",
    message: "Your complaint RH-2049 has been marked as In Progress.",
    time: "2 minutes ago",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <DashboardHeader />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Complaints"
            value={18}
            subtitle="All complaints"
            icon={FileText}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
          />

          <StatCard
            title="Pending"
            value={5}
            subtitle="Awaiting review"
            icon={Clock3}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />

          <StatCard
            title="In Progress"
            value={7}
            subtitle="Currently active"
            icon={Activity}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Resolved"
            value={6}
            subtitle="Completed"
            icon={CircleCheckBig}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <RecentComplaints complaints={complaints} />
          </div>

          <ActivityFeed activities={activities} />

        </div>

        <LiveNotification notification={notification} />

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;