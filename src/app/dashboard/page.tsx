"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Eye,
  Heart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn, formatCurrency } from "@/lib/utils";

const stats = [
  {
    title: "Jobs Ativos",
    value: "24",
    change: "+8%",
    trend: "up",
    icon: FileText,
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Pendentes Aprovação",
    value: "7",
    change: "-2",
    trend: "down",
    icon: Clock,
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Publicados Hoje",
    value: "12",
    change: "+4",
    trend: "up",
    icon: Send,
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Faturamento Mês",
    value: formatCurrency(45800),
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
];

const engagementData = [
  { day: "Seg", instagram: 1250, facebook: 890, twitter: 450, linkedin: 320 },
  { day: "Ter", instagram: 1480, facebook: 920, twitter: 520, linkedin: 280 },
  { day: "Qua", instagram: 1320, facebook: 850, twitter: 480, linkedin: 350 },
  { day: "Qui", instagram: 1680, facebook: 1100, twitter: 620, linkedin: 410 },
  { day: "Sex", instagram: 2100, facebook: 1350, twitter: 780, linkedin: 520 },
  { day: "Sáb", instagram: 1890, facebook: 980, twitter: 590, linkedin: 290 },
  { day: "Dom", instagram: 1450, facebook: 720, twitter: 380, linkedin: 180 },
];

const networkDistribution = [
  { name: "Instagram", value: 45, color: "#E4405F" },
  { name: "Facebook", value: 25, color: "#1877F2" },
  { name: "Twitter", value: 18, color: "#1DA1F2" },
  { name: "LinkedIn", value: 12, color: "#0A66C2" },
];

const pendingApprovals = [
  {
    id: 1,
    client: "Loja Fashion",
    content: "Promoção de verão - 50% off em todas as peças!",
    network: "instagram",
    scheduledFor: "2024-01-21 14:00",
    image: true,
  },
  {
    id: 2,
    client: "Tech Solutions",
    content: "Conheça nossas soluções em TI para sua empresa",
    network: "linkedin",
    scheduledFor: "2024-01-21 10:00",
    image: true,
  },
  {
    id: 3,
    client: "Restaurante Sabor",
    content: "Happy Hour toda sexta-feira! Chopp por R$9,90",
    network: "facebook",
    scheduledFor: "2024-01-22 17:00",
    image: false,
  },
];

const recentPosts = [
  {
    id: 1,
    client: "Academia Fit",
    content: "Novo horário de aulas em grupo!",
    network: "instagram",
    publishedAt: "2024-01-20 09:30",
    likes: 234,
    comments: 18,
    reach: 2450,
  },
  {
    id: 2,
    client: "Clínica Bem Estar",
    content: "Dicas de saúde para o verão",
    network: "facebook",
    publishedAt: "2024-01-20 08:00",
    likes: 156,
    comments: 12,
    reach: 1890,
  },
  {
    id: 3,
    client: "Advocacia Silva",
    content: "Direitos trabalhistas: o que você precisa saber",
    network: "linkedin",
    publishedAt: "2024-01-19 15:00",
    likes: 89,
    comments: 7,
    reach: 1240,
  },
];

const networkIcons: Record<string, { icon: typeof Instagram; color: string }> = {
  instagram: { icon: Instagram, color: "text-pink-500" },
  facebook: { icon: Facebook, color: "text-blue-600" },
  twitter: { icon: Twitter, color: "text-sky-500" },
  linkedin: { icon: Linkedin, color: "text-blue-700" },
};

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" subtitle="Visão geral do sistema" />

      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                  <stat.icon className={cn("w-6 h-6", stat.color.replace("bg-", "text-"))} />
                </div>
                <span
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Engajamento por Rede
                </h3>
                <p className="text-sm text-slate-500">Última semana</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pink-500" />
                  <span className="text-xs text-slate-500">Instagram</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="text-xs text-slate-500">Facebook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500" />
                  <span className="text-xs text-slate-500">Twitter</span>
                </div>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E4405F" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#E4405F" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1877F2" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#1877F2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} fill="url(#colorInstagram)" />
                  <Area type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} fill="url(#colorFacebook)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Network Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Distribuição por Rede
            </h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={networkDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {networkDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {networkDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Aguardando Aprovação
                </h3>
              </div>
              <button className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                Ver todos <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {pendingApprovals.map((item) => {
                const network = networkIcons[item.network];
                const NetworkIcon = network.icon;
                return (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2 rounded-lg", item.network === "instagram" ? "bg-pink-50" : item.network === "facebook" ? "bg-blue-50" : item.network === "linkedin" ? "bg-sky-50" : "bg-slate-50")}>
                        <NetworkIcon className={cn("w-5 h-5", network.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{item.client}</p>
                        <p className="text-sm text-slate-500 truncate">{item.content}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Agendado: {item.scheduledFor}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                          Aprovar
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                          Revisar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Posts Recentes
                </h3>
              </div>
              <button className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                Ver todos <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentPosts.map((post) => {
                const network = networkIcons[post.network];
                const NetworkIcon = network.icon;
                return (
                  <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2 rounded-lg", post.network === "instagram" ? "bg-pink-50" : post.network === "facebook" ? "bg-blue-50" : "bg-sky-50")}>
                        <NetworkIcon className={cn("w-5 h-5", network.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{post.client}</p>
                        <p className="text-sm text-slate-500 truncate">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Heart className="w-3 h-3" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <MessageCircle className="w-3 h-3" /> {post.comments}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Eye className="w-3 h-3" /> {post.reach.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
