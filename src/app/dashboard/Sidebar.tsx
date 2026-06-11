"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, PieChart, Target, Settings, Home, X } from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { name: "Budget", href: "/dashboard/budget", icon: PieChart },
  { name: "Goals", href: "/dashboard/goals", icon: Target },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-[#342E37] border-r border-[#4A4450]/40 h-screen flex flex-col justify-between p-4 select-none">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between pl-2 pt-2">
          <div className="font-syne font-extrabold text-2xl text-[#9FD356] tracking-tight">
            FinOs
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-[#9E99A3]">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Навигация */}
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors duration-200 relative group ${
                  isActive ? "text-[#9FD356]" : "text-[#9E99A3] hover:text-[#F5F5F5]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#3E3842] border border-[#4A4450]/50 rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {isActive && (
                  <motion.span 
                    layoutId="active-line"
                    className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#9FD356] rounded-r z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon 
                  size={16} 
                  strokeWidth={1.5} 
                  className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* Back to Home */}
        <Link 
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-[13px] text-[#9E99A3] hover:text-[#F5F5F5] transition-colors group"
        >
          <Home size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
          <span>Back to Website</span>
        </Link>

        {/* Юзер qwerty */}
        <div className="flex items-center justify-between border-t border-[#4A4450]/20 pt-4 pb-2 px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#3E3842] border border-[#4A4450]/50 overflow-hidden flex items-center justify-center text-[11px] text-[#9E99A3] font-semibold">
              qw
            </div>
            <span className="text-[13px] text-[#9E99A3] font-medium">qwerty</span>
          </div>
          <button className="text-[#9E99A3] hover:text-[#F5F5F5] transition-colors">
            <Settings size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}
