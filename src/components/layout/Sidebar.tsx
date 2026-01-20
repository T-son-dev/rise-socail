"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  CheckCircle,
  CreditCard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  BarChart3,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Jobs de Conteúdo", href: "/dashboard/jobs", icon: FileText },
      { name: "Agendamentos", href: "/dashboard/agendamentos", icon: Calendar },
    ],
  },
  {
    title: "Aprovações",
    items: [
      { name: "Pendentes", href: "/dashboard/aprovacoes", icon: CheckCircle },
      { name: "Publicados", href: "/dashboard/publicados", icon: Send },
    ],
  },
  {
    title: "Financeiro",
    items: [
      { name: "Faturamento", href: "/dashboard/faturamento", icon: CreditCard },
      { name: "Assinaturas", href: "/dashboard/assinaturas", icon: Zap },
    ],
  },
  {
    title: "Gestão",
    items: [
      { name: "Clientes", href: "/dashboard/clientes", icon: Users },
      { name: "Relatórios", href: "/dashboard/relatorios", icon: BarChart3 },
      { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-slate-200",
        "flex flex-col z-40"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-lg">Rise</span>
                <p className="text-xs text-slate-500">Social Media</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 top-20 w-6 h-6 rounded-full",
          "bg-white border border-slate-200 shadow-sm",
          "flex items-center justify-center",
          "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
          "transition-colors z-50"
        )}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {section.title}
                </motion.h3>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                      "group relative",
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 flex-shrink-0",
                        isActive && "text-indigo-600"
                      )}
                    />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                      />
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-3 border-t border-slate-100">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-slate-50",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            MA
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-slate-900 truncate">
                  Maria Admin
                </p>
                <p className="text-xs text-slate-500 truncate">Administrador</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 mt-2 px-3 py-2.5 rounded-xl",
            "text-slate-500 hover:text-red-500 hover:bg-red-50",
            "transition-all",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Sair
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.aside>
  );
}
