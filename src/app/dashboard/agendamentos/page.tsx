"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

type Network = "instagram" | "facebook" | "twitter" | "linkedin";

interface ScheduledPost {
  id: number;
  title: string;
  client: string;
  networks: Network[];
  time: string;
  date: string;
}

const scheduledPosts: ScheduledPost[] = [
  { id: 1, title: "Promoção de Verão", client: "Loja Fashion", networks: ["instagram", "facebook"], time: "14:00", date: "2024-01-22" },
  { id: 2, title: "Dicas de Tecnologia", client: "Tech Solutions", networks: ["linkedin", "twitter"], time: "10:00", date: "2024-01-21" },
  { id: 3, title: "Happy Hour Especial", client: "Restaurante Sabor", networks: ["instagram", "facebook", "twitter"], time: "17:00", date: "2024-01-26" },
  { id: 4, title: "Novidades Janeiro", client: "Academia Fit", networks: ["instagram"], time: "09:00", date: "2024-01-23" },
  { id: 5, title: "Serviços Premium", client: "Clínica Bem Estar", networks: ["facebook", "linkedin"], time: "11:30", date: "2024-01-24" },
  { id: 6, title: "Consultoria Gratuita", client: "Advocacia Silva", networks: ["linkedin"], time: "15:00", date: "2024-01-25" },
  { id: 7, title: "Receita da Semana", client: "Restaurante Sabor", networks: ["instagram", "facebook"], time: "12:00", date: "2024-01-22" },
  { id: 8, title: "Flash Sale", client: "Loja Fashion", networks: ["instagram", "twitter"], time: "20:00", date: "2024-01-21" },
];

const networkConfig: Record<Network, { icon: typeof Instagram; color: string; bgColor: string }> = {
  instagram: { icon: Instagram, color: "text-pink-500", bgColor: "bg-pink-50" },
  facebook: { icon: Facebook, color: "text-blue-600", bgColor: "bg-blue-50" },
  twitter: { icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50" },
  linkedin: { icon: Linkedin, color: "text-blue-700", bgColor: "bg-blue-700/10" },
};

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AgendamentosPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 21)); // January 2024
  const [selectedDate, setSelectedDate] = useState<string | null>("2024-01-21");
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (date: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
  };

  const getPostsForDate = (date: string) => {
    return scheduledPosts.filter((post) => post.date === date);
  };

  const selectedDatePosts = selectedDate ? getPostsForDate(selectedDate) : [];

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <>
      <Header title="Agendamentos" subtitle="Calendário de publicações" />

      <main className="p-6 space-y-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setView("calendar")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                view === "calendar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Calendário
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                view === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Clock className="w-4 h-4 inline-block mr-2" />
              Lista
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            {/* Calendar Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <button
                onClick={previousMonth}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              </button>
              <h2 className="text-lg font-semibold text-slate-900">
                {months[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dateStr = day ? formatDate(day) : "";
                  const posts = day ? getPostsForDate(dateStr) : [];
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === "2024-01-21";

                  return (
                    <div
                      key={index}
                      onClick={() => day && setSelectedDate(dateStr)}
                      className={cn(
                        "min-h-[80px] p-2 rounded-xl transition-colors cursor-pointer",
                        day ? "hover:bg-slate-50" : "",
                        isSelected && "bg-indigo-50 border-2 border-indigo-500",
                        !isSelected && isToday && "bg-amber-50 border border-amber-200"
                      )}
                    >
                      {day && (
                        <>
                          <span className={cn(
                            "text-sm font-medium",
                            isSelected ? "text-indigo-600" : isToday ? "text-amber-600" : "text-slate-900"
                          )}>
                            {day}
                          </span>
                          {posts.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {posts.slice(0, 2).map((post) => (
                                <div
                                  key={post.id}
                                  className="text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded truncate"
                                >
                                  {post.time} - {post.title}
                                </div>
                              ))}
                              {posts.length > 2 && (
                                <div className="text-xs text-slate-500">
                                  +{posts.length - 2} mais
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Selected Date Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  : "Selecione uma data"}
              </h3>
              <p className="text-sm text-slate-500">
                {selectedDatePosts.length} publicações agendadas
              </p>
            </div>

            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
              {selectedDatePosts.length > 0 ? (
                selectedDatePosts.map((post) => (
                  <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-indigo-600">{post.time}</span>
                        </div>
                        <h4 className="font-medium text-slate-900">{post.title}</h4>
                        <p className="text-sm text-slate-500">{post.client}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          {post.networks.map((network) => {
                            const config = networkConfig[network];
                            const NetworkIcon = config.icon;
                            return (
                              <div key={network} className={cn("p-1 rounded", config.bgColor)}>
                                <NetworkIcon className={cn("w-3 h-3", config.color)} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                          <Edit className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500">Nenhuma publicação agendada</p>
                  <button className="mt-3 text-sm text-indigo-500 hover:underline">
                    Agendar nova publicação
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Posts List */}
        {view === "list" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Próximas Publicações</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {scheduledPosts
                .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
                .map((post) => (
                  <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                    <div className="flex-shrink-0 w-20 text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {new Date(post.date).getDate()}
                      </p>
                      <p className="text-xs text-slate-500 uppercase">
                        {months[new Date(post.date).getMonth()].slice(0, 3)}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-indigo-600">{post.time}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500">{post.client}</span>
                      </div>
                      <h4 className="font-medium text-slate-900">{post.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.networks.map((network) => {
                        const config = networkConfig[network];
                        const NetworkIcon = config.icon;
                        return (
                          <div key={network} className={cn("p-1.5 rounded-lg", config.bgColor)}>
                            <NetworkIcon className={cn("w-4 h-4", config.color)} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <Edit className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}
