import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const priorityStyles = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-orange-100 text-orange-600",
  High: "bg-orange-100 text-orange-600",
  Urgent: "bg-red-100 text-red-600",
};

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const ComplaintsTable = ({
  complaints = [],
  totalComplaints = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading,
  isError,
  error,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          Loading complaints...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="font-semibold text-red-700">
          Failed to load complaints
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error?.response?.data?.message ||
            "Something went wrong"}
        </p>
      </div>
    );
  }


  if (complaints.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">
          No complaints found
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">
        <table className="min-w-275 w-full border-collapse">

          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Title
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>

            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b border-slate-100 transition-colors hover:bg-orange-50/50"
              >

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm font-semibold text-slate-500">
                    {complaint.complaintId}
                  </span>
                </td>

                <td className="max-w-70 px-5 py-5">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {complaint.title}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm text-slate-600">
                    {complaint.category}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      priorityStyles[
                        complaint.priority
                      ] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {complaint.priority}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[
                        complaint.status
                      ] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />

                    {complaint.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm text-slate-600">
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString()}
                  </span>
                </td>

                <td className="px-5 py-5 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/complaints/${complaint._id}`
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-orange-500"
                  >
                    View
                    <ArrowRight size={15} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {complaints.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {totalComplaints}
          </span>{" "}
          complaints
        </p>

        <div className="flex items-center justify-center gap-2">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              onPageChange(currentPage - 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <ChevronLeft size={17} />
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "border border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-500"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              onPageChange(currentPage + 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <ChevronRight size={17} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ComplaintsTable;