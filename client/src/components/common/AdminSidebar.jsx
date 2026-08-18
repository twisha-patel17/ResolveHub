import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ onNavigate }) => {
  const navigate = useNavigate();

  const mainLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Manage Complaints",
      icon: FileText,
      path: "/admin/complaints",
    },
    {
      label: "User Management",
      icon: Users,
      path: "/admin/users",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
  ];

  const systemLinks = [
    {
      label: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  const renderLinks = (links) =>
    links.map((link) => {
      const Icon = link.icon;

      return (
        <NavLink
          key={link.label}
          to={link.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-orange-500 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-3">
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 2}
                />

                <span className="text-sm font-semibold">
                  {link.label}
                </span>
              </div>

              {isActive && (
                <ChevronRight size={16} />
              )}
            </>
          )}
        </NavLink>
      );
    });

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-800 px-6">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
          <Shield size={23} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            ResolveHub
          </h1>

          <p className="mt-0.5 text-[11px] font-bold tracking-widest text-orange-400">
            ADMIN PANEL
          </p>
        </div>

      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <div>
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Overview
          </p>

          <div className="space-y-1.5">
            {renderLinks(mainLinks)}
          </div>
        </div>
        <div className="mt-8">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            System
          </p>

          <div className="space-y-1.5">
            {renderLinks(systemLinks)}
          </div>
        </div>

      </nav>

      <div className="shrink-0 border-t border-slate-800 p-4">

        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-800 p-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Administrator
            </p>

            <p className="truncate text-xs text-slate-400">
              System Administrator
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-semibold
            text-slate-300
            transition
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;



