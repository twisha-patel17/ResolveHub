import { useState, useEffect, useRef } from "react";

import {
  Bell,
  Moon,
  Search,
  Menu,
} from "lucide-react";

import NotificationDropdown from "../common/NotificationDropdown";
import { useNotifications } from "../../context/NotificationContext";

const Topbar = ({ setIsSidebarOpen }) => {
  const [showNotifications, setShowNotifications] =
    useState(false);

  const notificationRef = useRef(null);

  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      
      <div className="flex items-center gap-4">

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-xl border border-slate-200 bg-white p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="relative hidden w-72 md:block lg:w-96">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search complaints..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">

        <button className="rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100 md:hidden">
          <Search size={20} />
        </button>

        <button className="rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">
          <Moon size={20} />
        </button>

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            onClick={() =>
              setShowNotifications(
                (prev) => !prev
              )
            }
            className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <>
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              </>
            )}
          </button>

          {showNotifications && (
            <NotificationDropdown
              onClose={() =>
                setShowNotifications(false)
              }
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;