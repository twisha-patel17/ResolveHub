import { Search, Plus, SlidersHorizontal, ChevronDown } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ComplaintsTable from "../../components/complaint/ComplaintsTable";

const MyComplaintsPage = () => {
  const tabs = [
    "All",
    "Pending",
    "In Progress",
    "Resolved",
    "Closed",
    "Critical",
  ];

  return (
    <DashboardLayout>
  <div className="space-y-6">

    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          My Complaints
        </h1>

        <p className="mt-2 text-slate-500">
          12 complaints tracked
        </p>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-orange-600 sm:w-fit">
        <Plus size={20} />
        New Complaint
      </button>
    </div>

    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-3 border-b border-slate-200 pb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              index === 0
                ? "bg-orange-100 text-orange-600"
                : tab === "Critical"
                ? "text-red-500"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div className="flex flex-1 flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search your complaints..."
              className="w-full rounded-2xl border border-slate-300 py-3.5 pl-14 pr-5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <select className="rounded-2xl border border-slate-300 px-5 py-3.5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
            <option>All statuses</option>
          </select>

          <select className="rounded-2xl border border-slate-300 px-5 py-3.5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
            <option>All priorities</option>
          </select>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3.5 font-medium text-slate-700 transition hover:border-orange-400 hover:bg-orange-50">
            <SlidersHorizontal size={18} />
            More filters
          </button>

        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="text-sm text-slate-500">
            Sort by
          </span>

          <button className="flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3.5 font-medium transition hover:border-orange-400">
            Newest first
            <ChevronDown size={18} />
          </button>
        </div>

      </div>

    </div>

    <ComplaintsTable />

  </div>
</DashboardLayout>
  );
};

export default MyComplaintsPage;