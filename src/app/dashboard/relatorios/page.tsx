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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  DollarSign,
  Users,
  FileText,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn, formatCurrency } from "@/lib/utils";

const revenueData = [
  { month: "Jul", revenue: 32000, projected: 30000 },
  { month: "Ago", revenue: 35000, projected: 33000 },
  { month: "Set", revenue: 38000, projected: 36000 },
  { month: "Out", revenue: 41000, projected: 40000 },
  { month: "Nov", revenue: 43000, projected: 42000 },
  { month: "Dez", revenue: 45000, projected: 44000 },
  { month: "Jan", revenue: 48000, projected: 46000 },
];

const engagementByNetwork = [
  { network: "Instagram", engagement: 4.2, followers: 125000, posts: 89 },
  { network: "Facebook", engagement: 2.8, followers: 85000, posts: 67 },
  { network: "Twitter", engagement: 3.1, followers: 45000, posts: 124 },
  { network: "LinkedIn", engagement: 5.4, followers: 28000, posts: 34 },
];

const contentPerformance = [
  { type: "Imagens", views: 45000, engagement: 3200, shares: 890 },
  { type: "Vídeos", views: 78000, engagement: 5600, shares: 1450 },
  { type: "Carrossel", views: 32000, engagement: 2800, shares: 670 },
  { type: "Texto", views: 12000, engagement: 980, shares: 230 },
];

const clientDistribution = [
  { name: "Enterprise", value: 15, color: "#8B5CF6" },
  { name: "Profissional", value: 55, color: "#6366F1" },
  { name: "Básico", value: 30, color: "#94A3B8" },
];

const weeklyPosts = [
  { day: "Seg", posts: 12, scheduled: 8 },
  { day: "Ter", posts: 15, scheduled: 10 },
  { day: "Qua", posts: 18, scheduled: 12 },
  { day: "Qui", posts: 14, scheduled: 9 },
  { day: "Sex", posts: 22, scheduled: 15 },
  { day: "Sáb", posts: 8, scheduled: 5 },
  { day: "Dom", posts: 5, scheduled: 3 },
];

const topClients = [
  { name: "Loja Fashion", posts: 45, engagement: 12500, revenue: 2500 },
  { name: "Tech Solutions", posts: 38, engagement: 9800, revenue: 3500 },
  { name: "Academia Fit", posts: 42, engagement: 11200, revenue: 2200 },
  { name: "Clínica Bem Estar", posts: 35, engagement: 8900, revenue: 2800 },
  { name: "Restaurante Sabor", posts: 28, engagement: 7500, revenue: 1800 },
];

export default function RelatoriosPage() {
  return (
    <>
      <Header title="Relatórios" subtitle="Análises e métricas de desempenho" />

      <main className="p-6 space-y-6">
        {/* Period Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
            <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium">
              7 dias
            </button>
            <button className="px-4 py-2 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100">
              30 dias
            </button>
            <button className="px-4 py-2 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100">
              90 dias
            </button>
            <button className="px-4 py-2 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Personalizado
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Download className="w-4 h-4" />
            Exportar PDF
          </motion.button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +15%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(48000)}</p>
            <p className="text-sm text-slate-500">Faturamento do Mês</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +8%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">94</p>
            <p className="text-sm text-slate-500">Posts Publicados</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-pink-50 rounded-lg">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">45.2K</p>
            <p className="text-sm text-slate-500">Total Engajamentos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <span className="flex items-center gap-1 text-sm text-red-600">
                <TrendingDown className="w-4 h-4" />
                -2
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">6</p>
            <p className="text-sm text-slate-500">Clientes Ativos</p>
          </motion.div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Evolução do Faturamento</h3>
                <p className="text-sm text-slate-500">Últimos 7 meses</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-xs text-slate-500">Realizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="text-xs text-slate-500">Projetado</span>
                </div>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => `R$${value/1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => typeof value === "number" ? formatCurrency(value) : value}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                  />
                  <Area type="monotone" dataKey="projected" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                  <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Client Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Clientes por Plano</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {clientDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {clientDistribution.map((item) => (
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

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement by Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Desempenho por Rede</h3>
            <div className="space-y-4">
              {engagementByNetwork.map((network) => {
                const icons = {
                  Instagram: { icon: Instagram, color: "text-pink-500", bgColor: "bg-pink-50" },
                  Facebook: { icon: Facebook, color: "text-blue-600", bgColor: "bg-blue-50" },
                  Twitter: { icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50" },
                  LinkedIn: { icon: Linkedin, color: "text-blue-700", bgColor: "bg-blue-700/10" },
                };
                const config = icons[network.network as keyof typeof icons];
                const NetworkIcon = config.icon;

                return (
                  <div key={network.network} className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-lg", config.bgColor)}>
                      <NetworkIcon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900">{network.network}</span>
                        <span className="text-sm text-emerald-600">{network.engagement}% eng.</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(network.engagement / 6) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span>{network.followers.toLocaleString()} seguidores</span>
                        <span>{network.posts} posts</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Weekly Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Posts por Dia</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-xs text-slate-500">Publicados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-xs text-slate-500">Agendados</span>
                </div>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPosts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="posts" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="scheduled" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Top Clients Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Top Clientes do Mês</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left p-4 text-sm font-medium text-slate-500">#</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Cliente</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Posts</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Engajamento</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Receita</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topClients.map((client, index) => (
                  <tr key={client.name} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        index === 0 ? "bg-amber-100 text-amber-700" :
                        index === 1 ? "bg-slate-200 text-slate-600" :
                        index === 2 ? "bg-orange-100 text-orange-700" :
                        "bg-slate-100 text-slate-500"
                      )}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-900">{client.name}</td>
                    <td className="p-4 text-slate-600">{client.posts}</td>
                    <td className="p-4">
                      <span className="text-emerald-600 font-medium">{client.engagement.toLocaleString()}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{formatCurrency(client.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Content Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Desempenho por Tipo de Conteúdo</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {contentPerformance.map((content) => (
              <div key={content.type} className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-900 mb-3">{content.type}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Views
                    </span>
                    <span className="font-medium text-slate-900">{content.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Heart className="w-3 h-3" /> Engajamento
                    </span>
                    <span className="font-medium text-slate-900">{content.engagement.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Share2 className="w-3 h-3" /> Shares
                    </span>
                    <span className="font-medium text-slate-900">{content.shares.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  );
}
