import { Eye, LoaderCircle, FileText } from "lucide-react";

const AdminComplaintTable = ({
  complaints,
  loading,
  onViewComplaint,
}) => {
  const getStatusStyle = (status) => {
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    if (status === "In Progress")
      return "bg-blue-100 text-blue-700";

    if (status === "Resolved")
      return "bg-green-100 text-green-700";

    return "bg-red-100 text-red-700";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "Critical" || priority === "Urgent")
      return "bg-red-100 text-red-700";

    if (priority === "High")
      return "bg-orange-100 text-orange-700";

    if (priority === "Medium")
      return "bg-yellow-100 text-yellow-700";

    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            All Complaints
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage complaints submitted by users.
          </p>
        </div>

        <span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:block">
          {complaints.length} complaints
        </span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center gap-3 text-sm text-slate-500">
          <LoaderCircle
            size={20}
            className="animate-spin text-orange-500"
          />
          Loading complaints...
        </div>
      ) : complaints.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <FileText size={25} className="text-slate-400" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-800">
            No complaints found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filter options.
          </p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Complaint</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                >
                  {/* ID */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                    {complaint.complaintId}
                  </td>

                  {/* Complaint */}
                  <td className="max-w-[260px] px-5 py-4">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {complaint.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {complaint.category}
                    </p>
                  </td>

                  {/* User */}
                  <td className="max-w-[220px] px-5 py-4">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {complaint.createdBy?.name || "Unknown"}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {complaint.createdBy?.email || ""}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                        complaint.priority
                      )}`}
                    >
                      {complaint.priority}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onViewComplaint?.(complaint)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Eye size={15} />
                      View
                    </button>
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

export default AdminComplaintTable;