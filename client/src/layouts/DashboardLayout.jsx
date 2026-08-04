import { useState } from "react";

import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col">

        <Topbar
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;