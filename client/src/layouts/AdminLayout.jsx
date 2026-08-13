import { useState } from "react";

import AdminSidebar from "../components/common/AdminSidebar";
import AdminTopbar from "../components/common/AdminTopbar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <AdminSidebar />
          </div>
        </>
      )}

      {/* Main Area */}
      <div className="lg:pl-72">

        {/* Topbar */}
        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="p-5 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;