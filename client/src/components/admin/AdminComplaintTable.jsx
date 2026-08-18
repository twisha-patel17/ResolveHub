import {
  Eye,
  FileText,
  User,
} from "lucide-react";

import EmptyState from "../../components/ui/EmptyState";
import SkeletonTable from "../../components/ui/SkeletonTable";

const AdminComplaintTable = ({
  complaints = [],
  loading,
  onViewComplaint,
}) => {
  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Resolved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  const getPriorityStyle = (priority) => {
    if (
      priority === "Critical" ||
      priority === "Urgent"
    ) {
      return "bg-red-100 text-red-700";
    }

    if (priority === "High") {
      return "bg-orange-100 text-orange-700";
    }

    if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">

            <h2 className="text-lg font-bold text-slate-900">
              All Complaints
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Review and manage complaints submitted by users.
            </p>

          </div>

          <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 sm:px-3">
            {complaints.length}

            <span className="hidden sm:inline">
              {" "}
              complaints
            </span>
          </span>

        </div>

      </div>

      {loading ? (
        <SkeletonTable />
      ) : complaints.length === 0 ? (

        <div className="p-4 sm:p-6">

          <EmptyState
            icon={FileText}
            title="No complaints found"
            description="Try changing your search or filter options."
          />

        </div>

      ) : (

        <>
          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

                  <th className="whitespace-nowrap px-5 py-4">
                    ID
                  </th>

                  <th className="px-5 py-4">
                    Complaint
                  </th>

                  <th className="px-5 py-4">
                    User
                  </th>

                  <th className="whitespace-nowrap px-5 py-4">
                    Priority
                  </th>

                  <th className="whitespace-nowrap px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {complaints.map((complaint) => (

                  <tr
                    key={complaint._id}
                    className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                  >

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                      {complaint.complaintId}
                    </td>

                    <td className="max-w-70 px-5 py-4">

                      <p className="truncate text-sm font-semibold text-slate-900">
                        {complaint.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {complaint.category}
                      </p>

                    </td>

                    <td className="max-w-55 px-5 py-4">

                      <p className="truncate text-sm font-medium text-slate-700">
                        {complaint.createdBy?.name ||
                          "Unknown"}
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
                        onClick={() =>
                          onViewComplaint?.(complaint)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-slate-200
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-slate-600
                          transition
                          hover:border-orange-200
                          hover:bg-orange-50
                          hover:text-orange-600
                        "
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

          <div className="divide-y divide-slate-100 lg:hidden">

            {complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="p-4 transition hover:bg-slate-50 sm:p-5"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="text-xs font-semibold text-slate-400">
                        {complaint.complaintId}
                      </span>

                      <span className="text-slate-300">
                        •
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        {complaint.category}
                      </span>

                    </div>

                    <h3 className="mt-2 wrap-break-word text-sm font-bold leading-5 text-slate-900 sm:text-base">
                      {complaint.title}
                    </h3>

                  </div>

                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <User size={17} />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-xs font-semibold text-slate-700 sm:text-sm">
                      {complaint.createdBy?.name ||
                        "Unknown"}
                    </p>

                    <p className="truncate text-[11px] text-slate-400 sm:text-xs">
                      {complaint.createdBy?.email || ""}
                    </p>

                  </div>

                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">

                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getPriorityStyle(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority}
                  </span>

                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    onViewComplaint?.(complaint)
                  }
                  className="
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-slate-600
                    transition
                    hover:border-orange-200
                    hover:bg-orange-50
                    hover:text-orange-600
                    sm:text-sm
                  "
                >
                  <Eye size={16} />
                  View Complaint
                </button>

              </div>

            ))}

          </div>
        </>

      )}

    </div>
  );
};

export default AdminComplaintTable;