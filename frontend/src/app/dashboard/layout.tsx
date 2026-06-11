"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#342E37] relative">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#342E37] border-b border-[#4A4450]/40 sticky top-0 z-[60]">
        <div className="font-syne font-extrabold text-xl text-[#9FD356]">FinOs</div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-[#9E99A3] p-1"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with Responsive Visibility */}
      <div className={`
        fixed inset-y-0 left-0 z-[60] transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <main className="lg:pl-[220px] min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}