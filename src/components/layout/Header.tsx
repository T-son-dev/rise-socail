"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Plus,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const notifications = [
  { id: 1, type: "approval", title: "Novo conteúdo para aprovar", message: "Cliente ABC enviou post para revisão", time: "5 min", unread: true },
  { id: 2, type: "published", title: "Post publicado com sucesso", message: "Instagram - @clientexyz", time: "1h", unread: true },
  { id: 3, type: "payment", title: "Pagamento recebido", message: "Fatura #1234 - R$ 1.500,00", time: "2h", unread: false },
  { id: 4, type: "error", title: "Falha na publicação", message: "Erro de autenticação - Facebook", time: "3h", unread: true },
];

const notificationIcons = {
  approval: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  published: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
  payment: { icon: CheckCircle, color: "text-indigo-500", bg: "bg-indigo-50" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
};

export function Header({ title, subtitle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      {/* Left Side - Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar jobs, clientes, conteúdos..."
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-xl",
              "bg-slate-100 border border-transparent",
              "text-slate-900 placeholder-slate-400",
              "focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* Social Networks Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg">
          <Instagram className="w-4 h-4 text-pink-500" />
          <Facebook className="w-4 h-4 text-blue-600" />
          <Twitter className="w-4 h-4 text-sky-500" />
          <Linkedin className="w-4 h-4 text-blue-700" />
          <span className="text-xs text-slate-500 ml-1">Conectados</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100",
              "transition-colors"
            )}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notificações</h3>
                    <span className="text-xs text-indigo-500 hover:underline cursor-pointer">
                      Marcar todas como lidas
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => {
                      const config = notificationIcons[notif.type as keyof typeof notificationIcons];
                      const Icon = config.icon;
                      return (
                        <div
                          key={notif.id}
                          className={cn(
                            "p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors",
                            notif.unread && "bg-indigo-50/50"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn("p-2 rounded-lg", config.bg)}>
                              <Icon className={cn("w-4 h-4", config.color)} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">
                                {notif.title}
                              </p>
                              <p className="text-sm text-slate-500">
                                {notif.message}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                Há {notif.time}
                              </p>
                            </div>
                            {notif.unread && (
                              <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <button className="text-sm text-indigo-500 hover:underline">
                      Ver todas as notificações
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* New Post Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl",
            "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium",
            "hover:from-indigo-600 hover:to-purple-700 transition-all",
            "shadow-lg shadow-indigo-500/25"
          )}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Novo Post</span>
        </motion.button>
      </div>
    </header>
  );
}
