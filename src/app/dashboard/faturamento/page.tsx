"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  Send,
  X,
  Calendar,
  CreditCard,
  FileText,
  Receipt,
  Plus,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn, formatCurrency } from "@/lib/utils";

type InvoiceStatus = "paid" | "pending" | "overdue" | "cancelled";
type PaymentMethod = "pix" | "boleto" | "credit_card";

interface Invoice {
  id: string;
  client: string;
  clientEmail: string;
  description: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  asaasId: string;
}

const invoices: Invoice[] = [
  {
    id: "INV-001",
    client: "Loja Fashion",
    clientEmail: "financeiro@lojafashion.com",
    description: "Gestão de Redes Sociais - Janeiro/2024",
    amount: 2500,
    dueDate: "2024-01-25",
    paidAt: "2024-01-20",
    status: "paid",
    paymentMethod: "pix",
    asaasId: "pay_abc123",
  },
  {
    id: "INV-002",
    client: "Tech Solutions",
    clientEmail: "contato@techsolutions.com.br",
    description: "Gestão de Redes Sociais - Janeiro/2024",
    amount: 3500,
    dueDate: "2024-01-28",
    status: "pending",
    asaasId: "pay_def456",
  },
  {
    id: "INV-003",
    client: "Restaurante Sabor",
    clientEmail: "gerencia@restaurantesabor.com",
    description: "Gestão de Redes Sociais - Janeiro/2024",
    amount: 1800,
    dueDate: "2024-01-15",
    status: "overdue",
    asaasId: "pay_ghi789",
  },
  {
    id: "INV-004",
    client: "Academia Fit",
    clientEmail: "comunicacao@academiafit.com.br",
    description: "Gestão de Redes Sociais - Janeiro/2024",
    amount: 2200,
    dueDate: "2024-01-30",
    status: "pending",
    asaasId: "pay_jkl012",
  },
  {
    id: "INV-005",
    client: "Clínica Bem Estar",
    clientEmail: "adm@clinicabemestar.com.br",
    description: "Gestão de Redes Sociais - Janeiro/2024",
    amount: 2800,
    dueDate: "2024-01-22",
    paidAt: "2024-01-18",
    status: "paid",
    paymentMethod: "boleto",
    asaasId: "pay_mno345",
  },
  {
    id: "INV-006",
    client: "Advocacia Silva",
    clientEmail: "adm@advocaciasilva.com",
    description: "Gestão de Redes Sociais - Dezembro/2023",
    amount: 1500,
    dueDate: "2023-12-20",
    status: "cancelled",
    asaasId: "pay_pqr678",
  },
];

const statusConfig: Record<InvoiceStatus, { label: string; color: string; bgColor: string; icon: typeof Clock }> = {
  paid: { label: "Pago", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: CheckCircle },
  pending: { label: "Pendente", color: "text-amber-600", bgColor: "bg-amber-50", icon: Clock },
  overdue: { label: "Atrasado", color: "text-red-600", bgColor: "bg-red-50", icon: AlertCircle },
  cancelled: { label: "Cancelado", color: "text-slate-500", bgColor: "bg-slate-100", icon: X },
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  pix: "PIX",
  boleto: "Boleto",
  credit_card: "Cartão de Crédito",
};

export default function FaturamentoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalReceived = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  return (
    <>
      <Header title="Faturamento" subtitle="Gestão de cobranças via Asaas" />

      <main className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalReceived)}</p>
                <p className="text-sm text-slate-500">Recebido no Mês</p>
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
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalPending)}</p>
                <p className="text-sm text-slate-500">A Receber</p>
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
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalOverdue)}</p>
                <p className="text-sm text-slate-500">Em Atraso</p>
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
              <div className="p-2 bg-indigo-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">+15%</p>
                <p className="text-sm text-slate-500">vs. Mês Anterior</p>
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
                placeholder="Buscar faturas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | "all")}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">Todos os Status</option>
              <option value="paid">Pagos</option>
              <option value="pending">Pendentes</option>
              <option value="overdue">Atrasados</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewInvoiceModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            Nova Cobrança
          </motion.button>
        </div>

        {/* Asaas Integration Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Integração Asaas Ativa</p>
              <p className="text-white/80 text-sm">Cobranças automáticas via PIX, Boleto e Cartão</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Painel Asaas
          </button>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Fatura</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Cliente</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Valor</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Vencimento</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((invoice, index) => {
                  const status = statusConfig[invoice.status];
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <Receipt className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{invoice.id}</p>
                            <p className="text-xs text-slate-500">{invoice.asaasId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-slate-900">{invoice.client}</p>
                        <p className="text-sm text-slate-500">{invoice.clientEmail}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-900">{formatCurrency(invoice.amount)}</p>
                        {invoice.paymentMethod && (
                          <p className="text-xs text-slate-500">{paymentMethodLabels[invoice.paymentMethod]}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="text-slate-900">{invoice.dueDate}</p>
                        {invoice.paidAt && (
                          <p className="text-xs text-emerald-600">Pago em {invoice.paidAt}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit", status.bgColor, status.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4 text-slate-500" />
                          </button>
                          {invoice.status === "pending" && (
                            <button
                              className="p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                              title="Enviar lembrete"
                            >
                              <Send className="w-4 h-4 text-indigo-500" />
                            </button>
                          )}
                          <button
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">Nenhuma fatura encontrada</h3>
              <p className="text-slate-500">Tente ajustar os filtros de busca.</p>
            </div>
          )}
        </div>
      </main>

      {/* Invoice Detail Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedInvoice(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Fatura {selectedInvoice.id}</h2>
                  <p className="text-sm text-slate-500">ID Asaas: {selectedInvoice.asaasId}</p>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-600">Valor</span>
                  <span className="text-2xl font-bold text-slate-900">{formatCurrency(selectedInvoice.amount)}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Cliente</span>
                    <span className="font-medium text-slate-900">{selectedInvoice.client}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">E-mail</span>
                    <span className="text-slate-900">{selectedInvoice.clientEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Descrição</span>
                    <span className="text-slate-900 text-right max-w-[200px]">{selectedInvoice.description}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Vencimento</span>
                    <span className="text-slate-900">{selectedInvoice.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1", statusConfig[selectedInvoice.status].bgColor, statusConfig[selectedInvoice.status].color)}>
                      {(() => {
                        const StatusIcon = statusConfig[selectedInvoice.status].icon;
                        return <StatusIcon className="w-3 h-3" />;
                      })()}
                      {statusConfig[selectedInvoice.status].label}
                    </span>
                  </div>
                  {selectedInvoice.paymentMethod && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Forma de Pagamento</span>
                      <span className="text-slate-900">{paymentMethodLabels[selectedInvoice.paymentMethod]}</span>
                    </div>
                  )}
                  {selectedInvoice.paidAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Data do Pagamento</span>
                      <span className="text-emerald-600 font-medium">{selectedInvoice.paidAt}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                {selectedInvoice.status === "pending" && (
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Enviar Lembrete
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
