"use client";

import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardShellProps {
  children: React.ReactNode;
  agencyLogo?: string | null;
  notificationCount?: number;
}

export default function DashboardShell({
  children,
  agencyLogo,
  notificationCount,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-vb-bg">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        agencyLogo={agencyLogo}
      />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar
          onToggleSidebar={handleToggleSidebar}
          agencyLogo={agencyLogo}
          notificationCount={notificationCount}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
