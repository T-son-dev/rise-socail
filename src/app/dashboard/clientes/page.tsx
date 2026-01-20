"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Building2,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn, formatCurrency } from "@/lib/utils";

type ClientStatus = "active" | "pending" | "inactive";
type Network = "instagram" | "facebook" | "twitter" | "linkedin";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: ClientStatus;
  plan: string;
  monthlyValue: number;
  networks: Network[];
  joinedAt: string;
  lastActivity: string;
  totalPosts: number;
  pendingApprovals: number;
}

const clients: Client[] = [
  {
    id: 1,
    name: "Maria Silva",
    email: "financeiro@lojafashion.com",
    phone: "(11) 99999-1234",
    company: "Loja Fashion",
    status: "active",
    plan: "Profissional",
    monthlyValue: 2500,
    networks: ["instagram", "facebook"],
    joinedAt: "2023-06-15",
    lastActivity: "2024-01-20",
    totalPosts: 156,
    pendingApprovals: 2,
  },
  {
    id: 2,
    name: "João Santos",
    email: "contato@techsolutions.com.br",
    phone: "(11) 98888-5678",
    company: "Tech Solutions",
    status: "active",
    plan: "Enterprise",
    monthlyValue: 3500,
    networks: ["linkedin", "twitter", "facebook"],
    joinedAt: "2023-08-01",
    lastActivity: "2024-01-19",
    totalPosts: 98,
    pendingApprovals: 1,
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "gerencia@restaurantesabor.com",
    phone: "(11) 97777-9012",
    company: "Restaurante Sabor",
    status: "pending",
    plan: "Básico",
    monthlyValue: 1800,
    networks: ["instagram", "facebook", "twitter"],
    joinedAt: "2023-09-10",
    lastActivity: "2024-01-15",
    totalPosts: 67,
    pendingApprovals: 0,
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    email: "comunicacao@academiafit.com.br",
    phone: "(11) 96666-3456",
    company: "Academia Fit",
    status: "active",
    plan: "Profissional",
    monthlyValue: 2200,
    networks: ["instagram"],
    joinedAt: "2023-07-20",
    lastActivity: "2024-01-20",
    totalPosts: 134,
    pendingApprovals: 1,
  },
  {
    id: 5,
    name: "Patricia Lima",
    email: "adm@clinicabemestar.com.br",
    phone: "(11) 95555-7890",
    company: "Clínica Bem Estar",
    status: "active",
    plan: "Profissional",
    monthlyValue: 2800,
    networks: ["instagram", "facebook"],
    joinedAt: "2023-05-01",
    lastActivity: "2024-01-18",
    totalPosts: 189,
    pendingApprovals: 0,
  },
  {
    id: 6,
    name: "Roberto Almeida",
    email: "adm@advocaciasilva.com",
    phone: "(11) 94444-2345",
    company: "Advocacia Silva",
    status: "inactive",
    plan: "Básico",
    monthlyValue: 1500,
    networks: ["linkedin"],
    joinedAt: "2023-10-01",
    lastActivity: "2023-12-15",
    totalPosts: 23,
    pendingApprovals: 0,
  },
];

const statusConfig: Record<ClientStatus, { label: string; color: string; bgColor: string; icon: typeof CheckCircle }> = {
  active: { label: "Ativo", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: CheckCircle },
  pending: { label: "Pendente", color: "text-amber-600", bgColor: "bg-amber-50", icon: Clock },
  inactive: { label: "Inativo", color: "text-slate-500", bgColor: "bg-slate-100", icon: AlertCircle },
};

const networkConfig: Record<Network, { icon: typeof Instagram; color: string; bgColor: string }> = {
  instagram: { icon: Instagram, color: "text-pink-500", bgColor: "bg-pink-50" },
  facebook: { icon: Facebook, color: "text-blue-600", bgColor: "bg-blue-50" },
  twitter: { icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50" },
  linkedin: { icon: Linkedin, color: "text-blue-700", bgColor: "bg-blue-700/10" },
};

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalMRR = clients.filter((c) => c.status === "active").reduce((sum, c) => sum + c.monthlyValue, 0);
  const activeClients = clients.filter((c) => c.status === "active").length;

  return (
    <>
      <Header title="Clientes" subtitle="Gestão de clientes e contas" />

      <main className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <User className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{clients.length}</p>
                <p className="text-sm text-slate-500">Total de Clientes</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{activeClients}</p>
                <p className="text-sm text-slate-500">Clientes Ativos</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalMRR)}</p>
                <p className="text-sm text-slate-500">Receita Mensal</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {clients.reduce((sum, c) => sum + c.pendingApprovals, 0)}
                </p>
                <p className="text-sm text-slate-500">Aprovações Pendentes</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ClientStatus | "all")}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="pending">Pendentes</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </motion.button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => {
            const status = statusConfig[client.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{client.name}</h3>
                        {client.company && (
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {client.company}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1", status.bgColor, status.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {client.email}
                    </p>
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {client.phone}
                    </p>
                  </div>

                  {/* Plan & Value */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Plano</p>
                      <p className="font-medium text-slate-900">{client.plan}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Valor Mensal</p>
                      <p className="font-semibold text-emerald-600">{formatCurrency(client.monthlyValue)}</p>
                    </div>
                  </div>

                  {/* Networks */}
                  <div className="flex items-center gap-2 mb-4">
                    {client.networks.map((network) => {
                      const config = networkConfig[network];
                      const NetworkIcon = config.icon;
                      return (
                        <div key={network} className={cn("p-1.5 rounded-lg", config.bgColor)}>
                          <NetworkIcon className={cn("w-4 h-4", config.color)} />
                        </div>
                      );
                    })}
                    <span className="text-xs text-slate-500 ml-auto">
                      {client.totalPosts} posts
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    {client.pendingApprovals > 0 && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        {client.pendingApprovals} pendente{client.pendingApprovals > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Nenhum cliente encontrado</h3>
            <p className="text-slate-500">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </main>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedClient(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {selectedClient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedClient.name}</h2>
                    {selectedClient.company && (
                      <p className="text-sm text-slate-500">{selectedClient.company}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1", statusConfig[selectedClient.status].bgColor, statusConfig[selectedClient.status].color)}>
                    {(() => {
                      const StatusIcon = statusConfig[selectedClient.status].icon;
                      return <StatusIcon className="w-3 h-3" />;
                    })()}
                    {statusConfig[selectedClient.status].label}
                  </span>
                </div>

                {/* Contact */}
                <div className="space-y-2 p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {selectedClient.email}
                  </p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {selectedClient.phone}
                  </p>
                </div>

                {/* Plan Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-xl">
                    <p className="text-xs text-indigo-600">Plano</p>
                    <p className="font-semibold text-slate-900">{selectedClient.plan}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <p className="text-xs text-emerald-600">Valor Mensal</p>
                    <p className="font-semibold text-slate-900">{formatCurrency(selectedClient.monthlyValue)}</p>
                  </div>
                </div>

                {/* Networks */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Redes Conectadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.networks.map((network) => {
                      const config = networkConfig[network];
                      const NetworkIcon = config.icon;
                      return (
                        <div
                          key={network}
                          className={cn("flex items-center gap-2 px-3 py-2 rounded-lg", config.bgColor)}
                        >
                          <NetworkIcon className={cn("w-5 h-5", config.color)} />
                          <span className="text-sm font-medium text-slate-700 capitalize">{network}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-2xl font-bold text-slate-900">{selectedClient.totalPosts}</p>
                    <p className="text-xs text-slate-500">Posts</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-2xl font-bold text-slate-900">{selectedClient.pendingApprovals}</p>
                    <p className="text-xs text-slate-500">Pendentes</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-2xl font-bold text-slate-900">
                      {Math.floor((new Date().getTime() - new Date(selectedClient.joinedAt).getTime()) / (1000 * 60 * 60 * 24 * 30))}
                    </p>
                    <p className="text-xs text-slate-500">Meses</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Cliente desde</span>
                    <span className="text-slate-900">{selectedClient.joinedAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Última atividade</span>
                    <span className="text-slate-900">{selectedClient.lastActivity}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-medium hover:bg-slate-200 transition-colors">
                  Ver Jobs
                </button>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                  Editar Cliente
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
