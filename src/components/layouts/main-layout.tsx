import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

// Main Layout Component
const MainLayout: React.FC = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar Desktop */}
      <Sidebar />

      <div className="flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
