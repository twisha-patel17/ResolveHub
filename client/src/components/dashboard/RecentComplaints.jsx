import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

const RecentComplaints = ({ complaints = [] }) => {
  const recentComplaints = complaints.slice(0, 3);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Complaints
        </h2>

        <Link
          to="/complaints"
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-500"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>
      {recentComplaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 rounded-full bg-slate-100 p-4">
            <ArrowRight
              size={24}
              className="-rotate-45 text-slate-400"
            />
          </div>

          <p className="font-medium text-slate-700">
            No complaints yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Your submitted complaints will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">

            <thead>
              <tr className="border-b border-slate-200 text-left text-sm uppercase tracking-wide text-slate-500">
                <th className="pb-4">ID</th>
                <th className="pb-4">Title</th>
                <th className="pb-4">Priority</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Updated</th>
              </tr>
            </thead>

            <tbody>
              {recentComplaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  
                  <td className="py-5 font-medium text-slate-700">
                    {complaint.complaintId}
                  </td>
                  <td className="py-5">
                    <Link
                      to={`/complaints/${complaint._id}`}
                      className="font-semibold text-slate-900 transition hover:text-orange-500"
                    >
                      {complaint.title}
                    </Link>
                  </td>
                  <td className="py-5 text-slate-700">
                    {complaint.priority}
                  </td>
                  <td className="py-5">
                    <StatusBadge status={complaint.status} />
                  </td>

                  <td className="py-5 text-slate-500">
                    {complaint.updatedAt
                      ? new Date(
                          complaint.updatedAt
                        ).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
};

export default RecentComplaints;