
import { useState } from "react";

import AdminSidebar from "../components/common/AdminSidebar";
import AdminTopbar from "../components/common/AdminTopbar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <AdminSidebar
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />

          <div
            className="relative h-full w-72 max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar
              onNavigate={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:pl-72">

        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;



