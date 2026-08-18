import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

const ComplaintFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
}) => {
  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setCategory("All");
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
            <SlidersHorizontal
              size={18}
              className="text-orange-500"
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-900">
              Filter Complaints
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Search and filter complaints
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:w-auto"
        >
          <RotateCcw size={15} />
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search complaints..."
            className={`${inputClass} pl-10`}
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={inputClass}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={inputClass}
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option value="All">All Categories</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Drainage">Drainage</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Street Light">Street Light</option>
          <option value="Traffic">Traffic</option>
          <option value="Public Property">Public Property</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default ComplaintFilters;