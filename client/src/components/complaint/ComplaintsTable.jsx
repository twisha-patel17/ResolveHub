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
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

        <p className="mt-4 text-sm text-slate-500">
          Loading complaints...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center sm:rounded-3xl sm:p-8">
        <h2 className="font-semibold text-red-700">
          Failed to load complaints
        </h2>

        <p className="mt-1 text-sm leading-6 text-red-600">
          {error?.response?.data?.message ||
            "Something went wrong"}
        </p>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <h2 className="text-lg font-semibold text-slate-800">
          No complaints found
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  const getPaginationPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const paginationPages = getPaginationPages();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
     
      <div className="divide-y divide-slate-100 md:hidden">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="p-4 transition-colors hover:bg-orange-50/40"
          >
            {/* TOP */}

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-400">
                  #{complaint.complaintId}
                </p>

                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-900">
                  {complaint.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/complaints/${complaint._id}`
                  )
                }
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                View
                <ArrowRight size={14} />
              </button>
            </div>
  
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {/* CATEGORY */}

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Category
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-700">
                  {complaint.category}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Created
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Priority
                </p>

                <span
                  className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    priorityStyles[
                      complaint.priority
                    ] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {complaint.priority}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <span
                  className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[
                      complaint.status
                    ] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />

                  {complaint.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[850px] border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Title
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                {/* ID */}

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm font-semibold text-slate-500">
                    {complaint.complaintId}
                  </span>
                </td>

                {/* TITLE */}

                <td className="max-w-[280px] px-5 py-5">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {complaint.title}
                  </p>
                </td>

                {/* CATEGORY */}

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm text-slate-600">
                    {complaint.category}
                  </span>
                </td>

                {/* PRIORITY */}

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

                {/* STATUS */}

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

                {/* CREATED */}

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm text-slate-600">
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString()}
                  </span>
                </td>

                {/* ACTION */}

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

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* COUNT */}

          <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
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

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
           
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                onPageChange(currentPage - 1)
              }
              aria-label="Previous page"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              <ChevronLeft size={17} />
            </button>

            {/* PAGE NUMBERS */}

            {paginationPages.map(
              (page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-6 items-center justify-center text-sm text-slate-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      onPageChange(page)
                    }
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-orange-500 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-500"
                    }`}
                  >
                    {page}
                  </button>
                )
            )}

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                onPageChange(currentPage + 1)
              }
              aria-label="Next page"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsTable;