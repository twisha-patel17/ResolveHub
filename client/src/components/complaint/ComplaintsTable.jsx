import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const complaints = [
  {
    id: "RH-2049",
    title: "Leaking pipe near Block C entrance",
    category: "Infrastructure",
    priority: "High",
    status: "In Progress",
    created: "Aug 1, 2026",
    updated: "2 min ago",
  },
  {
    id: "RH-2048",
    title: "Broken streetlight, Sector 9",
    category: "Utilities",
    priority: "Medium",
    status: "Pending",
    created: "Jul 31, 2026",
    updated: "1 hr ago",
  },
  {
    id: "RH-2044",
    title: "Overflowing garbage bin, Park Rd",
    category: "Sanitation",
    priority: "Low",
    status: "Pending",
    created: "Jul 30, 2026",
    updated: "5 hrs ago",
  },
  {
    id: "RH-2041",
    title: "Elevator noise, Tower B",
    category: "Infrastructure",
    priority: "Low",
    status: "Resolved",
    created: "Jul 27, 2026",
    updated: "Yesterday",
  },
  {
    id: "RH-2038",
    title: "Unauthorized parking blocking exit",
    category: "Security",
    priority: "High",
    status: "In Progress",
    created: "Jul 25, 2026",
    updated: "2 days ago",
  },
  {
    id: "RH-2036",
    title: "Water contamination report",
    category: "Utilities",
    priority: "Critical",
    status: "Closed",
    created: "Jul 20, 2026",
    updated: "3 days ago",
  },
];

const priorityStyles = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-orange-100 text-orange-600",
  High: "bg-orange-100 text-orange-600",
  Critical: "bg-red-100 text-red-600",
};

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Closed: "bg-slate-200 text-slate-600",
};

const ComplaintsTable = () => {
  const navigate = useNavigate();

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

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Updated
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>

            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="border-b border-slate-100 transition-colors duration-200 hover:bg-orange-50/50"
              >

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm font-semibold text-slate-500">
                    {complaint.id}
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
                      priorityStyles[complaint.priority]
                    }`}
                  >
                    {complaint.priority}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[complaint.status]
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {complaint.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm text-slate-600">
                    {complaint.created}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-5">
                  <span className="text-sm text-slate-600">
                    {complaint.updated}
                  </span>
                </td>

                <td className="px-5 py-5 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/complaints/${complaint._id}`)
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
            1–6
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            12
          </span>
        </p>

        <div className="flex items-center gap-2">

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-orange-400 hover:text-orange-500"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-sm"
          >
            1
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-sm font-medium text-slate-600 transition hover:border-orange-400 hover:text-orange-500"
          >
            2
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-orange-400 hover:text-orange-500"
          >
            <ChevronRight size={17} />
          </button>

        </div>
      </div>

    </div>
  );
};

export default ComplaintsTable;