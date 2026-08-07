import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-[1100px] w-full">

          <thead className="bg-slate-50 text-left text-sm uppercase tracking-wide text-slate-500">

            <tr>

              <th className="px-6 py-5">ID</th>

              <th className="px-6 py-5">Title</th>

              <th className="px-6 py-5">Category</th>

              <th className="px-6 py-5">Priority</th>

              <th className="px-6 py-5">Status</th>

              <th className="px-6 py-5">Created</th>

              <th className="px-6 py-5">Updated</th>

              <th className="px-6 py-5 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="border-t border-slate-100 transition hover:bg-orange-50/60"
              >

                <td className="px-6 py-6 font-medium text-slate-500">
                  {complaint.id}
                </td>

                <td className="max-w-xs px-6 py-6">

                  <p className="font-semibold text-slate-900">
                    {complaint.title}
                  </p>

                </td>

                <td className="px-6 py-6 text-slate-600">
                  {complaint.category}
                </td>

                <td className="px-6 py-6">

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[complaint.priority]}`}
                  >
                    {complaint.priority}
                  </span>

                </td>

                <td className="px-6 py-6">

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[complaint.status]}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {complaint.status}
                  </span>

                </td>

                <td className="px-6 py-6 text-slate-600 whitespace-nowrap">
                  {complaint.created}
                </td>

                <td className="px-6 py-6 text-slate-600 whitespace-nowrap">
                  {complaint.updated}
                </td>

                <td className="px-6 py-6 text-center">

                  <button className="inline-flex items-center gap-2 font-semibold text-slate-700 transition hover:text-orange-500">
                    View
                    <ArrowRight size={16} />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-slate-500">
          Showing
          <span className="font-semibold text-slate-700">
            {" "}1–6{" "}
          </span>
          of
          <span className="font-semibold text-slate-700">
            {" "}12
          </span>
        </p>

        <div className="flex items-center gap-2">

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-400 transition hover:border-orange-400 hover:text-orange-500">
            <ChevronLeft size={18} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-semibold text-white">
            1
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 transition hover:border-orange-400">
            2
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-400 transition hover:border-orange-400 hover:text-orange-500">
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ComplaintsTable;