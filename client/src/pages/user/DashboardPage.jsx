import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's an overview of your complaints and recent activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Complaints
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              18
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-500">
              5
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-500">
              7
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Resolved
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-500">
              6
            </h2>
          </div>
        </div>

        {/* Placeholder */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Complaints
          </h2>

          <p className="mt-3 text-slate-500">
            Your recent complaints will appear here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;