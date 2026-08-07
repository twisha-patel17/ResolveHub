import {
  Shield,
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Bell,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      end: true
    },
    {
      title: "Create Complaint",
      icon: PlusCircle,
      path: "/complaints/create",
    },
    {
      title: "My Complaints",
      icon: ClipboardList,
      path: "/complaints",
      end: true
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/notifications",
      end: true
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
      end: true
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
      end: true
    },
  ];

  return (
    <>
    
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-72 flex-col
          bg-slate-800 text-white shadow-xl
          transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
       
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500 p-3">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                ResolveHub
              </h1>

              <p className="text-sm text-slate-400">
                Complaint Management
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

    
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 p-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-700 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold">
                {user?.name}
              </p>

              <p className="text-sm text-slate-300">
                Citizen
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-700 py-3 font-medium transition hover:border-red-500 hover:bg-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;