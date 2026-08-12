import {
  LayoutDashboard,
  FileText,
  Clock3,
  Activity,
  CircleCheckBig,
  XCircle,
  Users,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const mainLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
  ];

  const complaintLinks = [
    {
      label: "All Complaints",
      icon: FileText,
      path: "/admin/complaints",
    },
    {
      label: "Pending",
      icon: Clock3,
      path: "/admin/complaints?status=Pending",
    },
    {
      label: "In Progress",
      icon: Activity,
      path: "/admin/complaints?status=In%20Progress",
    },
    {
      label: "Resolved",
      icon: CircleCheckBig,
      path: "/admin/complaints?status=Resolved",
    },
    {
      label: "Rejected",
      icon: XCircle,
      path: "/admin/complaints?status=Rejected",
    },
  ];

  const systemLinks = [
    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    // We'll connect this to the logout API later.
    navigate("/login");
  };

  const renderLinks = (links) =>
    links.map((link) => {
      const Icon = link.icon;

      return (
        <NavLink
          key={link.label}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-orange-100 text-orange-600"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`
          }
        >
          <Icon size={19} />
          <span>{link.label}</span>
        </NavLink>
      );
    });

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            ResolveHub
          </h1>

          <p className="text-xs font-medium text-orange-500">
            ADMIN PANEL
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {/* Main */}
        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <div className="space-y-1">
            {renderLinks(mainLinks)}
          </div>
        </div>

        {/* Complaints */}
        <div className="mt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Complaint Management
          </p>

          <div className="space-y-1">
            {renderLinks(complaintLinks)}
          </div>
        </div>

        {/* System */}
        <div className="mt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            System
          </p>

          <div className="space-y-1">
            {renderLinks(systemLinks)}
          </div>
        </div>
      </nav>

      {/* Admin profile / logout */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;