"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="pl-[260px] transition-all duration-200">
        {children}
      </div>
    </div>
  );
}
