"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Zap,
  Star,
  Package,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn, formatCurrency } from "@/lib/utils";

type SubscriptionStatus = "active" | "pending" | "cancelled" | "suspended";
type BillingCycle = "monthly" | "quarterly" | "yearly";

interface Subscription {
  id: string;
  client: string;
  clientEmail: string;
  plan: string;
  amount: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: string;
  nextBilling: string;
  asaasId: string;
  features: string[];
}

const subscriptions: Subscription[] = [
  {
    id: "SUB-001",
    client: "Loja Fashion",
    clientEmail: "financeiro@lojafashion.com",
    plan: "Profissional",
    amount: 2500,
    billingCycle: "monthly",
    status: "active",
    startDate: "2023-06-15",
    nextBilling: "2024-02-15",
    asaasId: "sub_abc123",
    features: ["4 redes sociais", "20 posts/mês", "Relatórios avançados", "Suporte prioritário"],
  },
  {
    id: "SUB-002",
    client: "Tech Solutions",
    clientEmail: "contato@techsolutions.com.br",
    plan: "Enterprise",
    amount: 3500,
    billingCycle: "monthly",
    status: "active",
    startDate: "2023-08-01",
    nextBilling: "2024-02-01",
    asaasId: "sub_def456",
    features: ["Redes ilimitadas", "Posts ilimitados", "API personalizada", "Gerente dedicado"],
  },
  {
    id: "SUB-003",
    client: "Restaurante Sabor",
    clientEmail: "gerencia@restaurantesabor.com",
    plan: "Básico",
    amount: 1800,
    billingCycle: "monthly",
    status: "suspended",
    startDate: "2023-09-10",
    nextBilling: "2024-01-10",
    asaasId: "sub_ghi789",
    features: ["2 redes sociais", "10 posts/mês", "Relatórios básicos"],
  },
  {
    id: "SUB-004",
    client: "Academia Fit",
    clientEmail: "comunicacao@academiafit.com.br",
    plan: "Profissional",
    amount: 2200,
    billingCycle: "monthly",
    status: "active",
    startDate: "2023-07-20",
    nextBilling: "2024-02-20",
    asaasId: "sub_jkl012",
    features: ["4 redes sociais", "20 posts/mês", "Relatórios avançados", "Suporte prioritário"],
  },
  {
    id: "SUB-005",
    client: "Clínica Bem Estar",
    clientEmail: "adm@clinicabemestar.com.br",
    plan: "Profissional",
    amount: 2800,
    billingCycle: "monthly",
    status: "active",
    startDate: "2023-05-01",
    nextBilling: "2024-02-01",
    asaasId: "sub_mno345",
    features: ["4 redes sociais", "20 posts/mês", "Relatórios avançados", "Suporte prioritário"],
  },
  {
    id: "SUB-006",
    client: "Advocacia Silva",
    clientEmail: "adm@advocaciasilva.com",
    plan: "Básico",
    amount: 1500,
    billingCycle: "monthly",
    status: "cancelled",
    startDate: "2023-10-01",
    nextBilling: "-",
    asaasId: "sub_pqr678",
    features: ["2 redes sociais", "10 posts/mês", "Relatórios básicos"],
  },
];

const plans = [
  {
    name: "Básico",
    price: 1500,
    icon: Package,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    features: ["2 redes sociais", "10 posts/mês", "Relatórios básicos", "Suporte por e-mail"],
  },
  {
    name: "Profissional",
    price: 2500,
    icon: Star,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    popular: true,
    features: ["4 redes sociais", "20 posts/mês", "Relatórios avançados", "Suporte prioritário", "Aprovação de cliente"],
  },
  {
    name: "Enterprise",
    price: 3500,
    icon: Zap,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    features: ["Redes ilimitadas", "Posts ilimitados", "API personalizada", "Gerente dedicado", "SLA garantido"],
  },
];

const statusConfig: Record<SubscriptionStatus, { label: string; color: string; bgColor: string; icon: typeof Clock }> = {
  active: { label: "Ativa", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: CheckCircle },
  pending: { label: "Pendente", color: "text-amber-600", bgColor: "bg-amber-50", icon: Clock },
  suspended: { label: "Suspensa", color: "text-red-600", bgColor: "bg-red-50", icon: AlertCircle },
  cancelled: { label: "Cancelada", color: "text-slate-500", bgColor: "bg-slate-100", icon: X },
};

const billingCycleLabels: Record<BillingCycle, string> = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  yearly: "Anual",
};

export default function AssinaturasPage() {
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showPlans, setShowPlans] = useState(false);

  const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
  const mrr = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);
  const churnRate = (subscriptions.filter((s) => s.status === "cancelled").length / subscriptions.length * 100).toFixed(1);

  return (
    <>
      <Header title="Assinaturas" subtitle="Gestão de planos recorrentes via Asaas" />

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
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(mrr)}</p>
                <p className="text-sm text-slate-500">MRR (Receita Mensal)</p>
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
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Users className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{activeSubscriptions.length}</p>
                <p className="text-sm text-slate-500">Assinaturas Ativas</p>
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
              <div className="p-2 bg-amber-50 rounded-lg">
                <RefreshCw className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{churnRate}%</p>
                <p className="text-sm text-slate-500">Taxa de Cancelamento</p>
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
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">+12%</p>
                <p className="text-sm text-slate-500">Crescimento Mensal</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Plans Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Planos Disponíveis</h2>
            <button
              onClick={() => setShowPlans(!showPlans)}
              className="text-sm text-indigo-500 hover:underline"
            >
              {showPlans ? "Ocultar" : "Ver todos"}
            </button>
          </div>

          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", !showPlans && "hidden md:grid")}>
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "rounded-xl p-5 border-2 transition-all hover:shadow-md",
                    plan.popular ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200"
                  )}
                >
                  {plan.popular && (
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                      Mais Popular
                    </span>
                  )}
                  <div className="flex items-center gap-3 mt-3 mb-4">
                    <div className={cn("p-2 rounded-lg", plan.bgColor)}>
                      <PlanIcon className={cn("w-5 h-5", plan.color)} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(plan.price)}<span className="text-sm font-normal text-slate-500">/mês</span></p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Assinaturas dos Clientes</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Nova Assinatura
            </motion.button>
          </div>

          <div className="divide-y divide-slate-100">
            {subscriptions.map((subscription, index) => {
              const status = statusConfig[subscription.status];
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={subscription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Client Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900">{subscription.client}</h3>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1", status.bgColor, status.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{subscription.clientEmail}</p>
                    </div>

                    {/* Plan & Price */}
                    <div className="text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        subscription.plan === "Enterprise" ? "bg-purple-100 text-purple-700" :
                        subscription.plan === "Profissional" ? "bg-indigo-100 text-indigo-700" :
                        "bg-slate-100 text-slate-700"
                      )}>
                        {subscription.plan}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {formatCurrency(subscription.amount)}/{billingCycleLabels[subscription.billingCycle].toLowerCase().slice(0, 3)}
                      </p>
                    </div>

                    {/* Next Billing */}
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Próxima cobrança</p>
                      <p className="text-sm font-medium text-slate-900">{subscription.nextBilling}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedSubscription(subscription)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4 text-slate-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </button>
                      {subscription.status === "active" && (
                        <button
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Subscription Detail Modal */}
      <AnimatePresence>
        {selectedSubscription && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedSubscription(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedSubscription.client}</h2>
                  <p className="text-sm text-slate-500">ID Asaas: {selectedSubscription.asaasId}</p>
                </div>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                  <div>
                    <span className="text-indigo-600 font-medium">Plano {selectedSubscription.plan}</span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(selectedSubscription.amount)}<span className="text-sm font-normal text-slate-500">/mês</span></p>
                  </div>
                  <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1", statusConfig[selectedSubscription.status].bgColor, statusConfig[selectedSubscription.status].color)}>
                    {(() => {
                      const StatusIcon = statusConfig[selectedSubscription.status].icon;
                      return <StatusIcon className="w-4 h-4" />;
                    })()}
                    {statusConfig[selectedSubscription.status].label}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">E-mail</span>
                    <span className="text-slate-900">{selectedSubscription.clientEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Ciclo de Cobrança</span>
                    <span className="text-slate-900">{billingCycleLabels[selectedSubscription.billingCycle]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Data de Início</span>
                    <span className="text-slate-900">{selectedSubscription.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Próxima Cobrança</span>
                    <span className="text-slate-900 font-medium">{selectedSubscription.nextBilling}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Recursos Incluídos</h3>
                  <ul className="space-y-2">
                    {selectedSubscription.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                {selectedSubscription.status === "active" && (
                  <button className="px-4 py-2 rounded-xl text-red-600 bg-red-50 font-medium hover:bg-red-100 transition-colors">
                    Cancelar Assinatura
                  </button>
                )}
                {selectedSubscription.status === "suspended" && (
                  <button className="px-4 py-2 rounded-xl text-emerald-600 bg-emerald-50 font-medium hover:bg-emerald-100 transition-colors">
                    Reativar
                  </button>
                )}
                {selectedSubscription.status === "cancelled" && <div />}
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                  Alterar Plano
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
