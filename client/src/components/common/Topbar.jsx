import {
  Moon,
  Search,
  Menu,
} from "lucide-react";

import NotificationBadge from "./NotificationBadge";

const Topbar = ({ setIsSidebarOpen }) => {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-4
        shadow-sm
        sm:px-6
        lg:px-8
      "
    >

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-2
            transition
            hover:bg-slate-100
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        <div
          className="
            relative
            hidden
            w-72
            md:block
            lg:w-96
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search complaints..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-orange-500
              focus:bg-white
              focus:ring-4
              focus:ring-orange-100
            "
          />
        </div>

      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-3
            transition
            hover:bg-slate-100
            md:hidden
          "
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-3
            text-slate-600
            transition
            hover:bg-slate-100
          "
        >
          <Moon size={20} />
        </button>

        <NotificationBadge />

      </div>

    </header>
  );
};

export default Topbar;