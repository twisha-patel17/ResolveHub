import {
  Search,
  Bell,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      
      {/* Left */}
      <div>
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          Control Center
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search complaints..."
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-orange-500"
        >
          <Bell size={20} />

          {/* Notification dot */}
          <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <ShieldCheck size={20} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              System Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </button>

      </div>
    </header>
  );
};

export default AdminTopbar;