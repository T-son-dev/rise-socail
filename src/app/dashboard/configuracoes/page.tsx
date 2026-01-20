"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Link2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Webhook,
  Key,
  Mail,
  Smartphone,
  Globe,
  Check,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

type TabId = "profile" | "company" | "notifications" | "security" | "billing" | "integrations";

interface Tab {
  id: TabId;
  label: string;
  icon: typeof User;
}

const tabs: Tab[] = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "company", label: "Empresa", icon: Building2 },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "billing", label: "Faturamento", icon: CreditCard },
  { id: "integrations", label: "Integrações", icon: Link2 },
];

const socialConnections = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500", connected: true, account: "@rise.social" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600", connected: true, account: "Rise Social Media" },
  { id: "twitter", name: "Twitter/X", icon: Twitter, color: "bg-black", connected: true, account: "@risesocial" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700", connected: false, account: null },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <>
      <Header title="Configurações" subtitle="Gerencie suas preferências" />

      <main className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-500"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <TabIcon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Informações Pessoais</h2>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      AS
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                        Alterar Foto
                      </button>
                      <p className="text-xs text-slate-500 mt-2">JPG, PNG ou GIF. Máximo 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                      <input
                        type="text"
                        defaultValue="Admin Sistema"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                      <input
                        type="email"
                        defaultValue="admin@rise.social"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                      <input
                        type="tel"
                        defaultValue="(11) 99999-9999"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
                      <input
                        type="text"
                        defaultValue="Gerente de Social Media"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Company Tab */}
            {activeTab === "company" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Dados da Empresa</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
                      <input
                        type="text"
                        defaultValue="Rise Social Media"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
                      <input
                        type="text"
                        defaultValue="12.345.678/0001-99"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telefone Comercial</label>
                      <input
                        type="tel"
                        defaultValue="(11) 3333-4444"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                      <input
                        type="text"
                        defaultValue="Av. Paulista, 1000 - São Paulo, SP"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                      <input
                        type="url"
                        defaultValue="https://rise.social"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Fuso Horário</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                        <option>America/Sao_Paulo (GMT-3)</option>
                        <option>America/Manaus (GMT-4)</option>
                        <option>America/Noronha (GMT-2)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Preferências de Notificação</h2>

                  <div className="space-y-4">
                    {[
                      { id: "approval", label: "Novos conteúdos para aprovação", description: "Receba alertas quando clientes enviarem conteúdos", email: true, push: true },
                      { id: "published", label: "Posts publicados", description: "Confirmação de publicações realizadas", email: true, push: false },
                      { id: "payment", label: "Pagamentos recebidos", description: "Notificações de cobranças pagas", email: true, push: true },
                      { id: "overdue", label: "Cobranças atrasadas", description: "Alertas de faturas em atraso", email: true, push: true },
                      { id: "error", label: "Erros de publicação", description: "Falhas em agendamentos ou conexões", email: true, push: true },
                      { id: "report", label: "Relatórios semanais", description: "Resumo de métricas e desempenho", email: true, push: false },
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-900">{notification.label}</p>
                          <p className="text-sm text-slate-500">{notification.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={notification.email}
                              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <Mail className="w-4 h-4 text-slate-400" />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={notification.push}
                              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                            />
                            <Smartphone className="w-4 h-4 text-slate-400" />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                      Salvar Preferências
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Alterar Senha</h2>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Senha Atual</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nova Senha</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>

                  <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                    Atualizar Senha
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Autenticação em Dois Fatores</h2>

                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-900">2FA Ativado</p>
                        <p className="text-sm text-emerald-700">Sua conta está protegida com autenticação em dois fatores</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-emerald-700 bg-emerald-100 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors">
                      Gerenciar
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Sessões Ativas</h2>

                  <div className="space-y-3">
                    {[
                      { device: "Chrome no Windows", location: "São Paulo, BR", current: true, time: "Agora" },
                      { device: "Safari no iPhone", location: "São Paulo, BR", current: false, time: "Há 2 horas" },
                      { device: "Firefox no Mac", location: "Rio de Janeiro, BR", current: false, time: "Há 1 dia" },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">
                              {session.device}
                              {session.current && (
                                <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                  Sessão Atual
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-slate-500">{session.location} • {session.time}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="text-red-500 text-sm font-medium hover:underline">
                            Encerrar
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm">Integração Asaas</p>
                      <h2 className="text-2xl font-bold mt-1">Conta Conectada</h2>
                      <p className="text-emerald-100 mt-2">API Key: ****************************abc123</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <CreditCard className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Configurações de Cobrança</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Cobrança Automática</p>
                        <p className="text-sm text-slate-500">Gerar cobranças automaticamente no vencimento</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Lembrete de Vencimento</p>
                        <p className="text-sm text-slate-500">Enviar lembrete 3 dias antes do vencimento</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Métodos de Pagamento</p>
                        <p className="text-sm text-slate-500">PIX, Boleto e Cartão de Crédito</p>
                      </div>
                      <button className="text-indigo-500 text-sm font-medium hover:underline flex items-center gap-1">
                        Configurar <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Integrations Tab */}
            {activeTab === "integrations" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">Redes Sociais Conectadas</h2>

                  <div className="space-y-4">
                    {socialConnections.map((social) => {
                      const SocialIcon = social.icon;
                      return (
                        <div key={social.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className={cn("p-2.5 rounded-xl text-white", social.color)}>
                              <SocialIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{social.name}</p>
                              {social.connected ? (
                                <p className="text-sm text-emerald-600 flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Conectado como {social.account}
                                </p>
                              ) : (
                                <p className="text-sm text-slate-500">Não conectado</p>
                              )}
                            </div>
                          </div>
                          {social.connected ? (
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                <RefreshCw className="w-4 h-4 text-slate-500" />
                              </button>
                              <button className="px-4 py-2 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                                Desconectar
                              </button>
                            </div>
                          ) : (
                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                              Conectar
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-6">API & Webhooks</h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Key className="w-5 h-5 text-slate-500" />
                          <span className="font-medium text-slate-900">API Key</span>
                        </div>
                        <button className="text-indigo-500 text-sm font-medium hover:underline">
                          Regenerar
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-slate-200 rounded-lg text-sm text-slate-700 font-mono">
                          sk_live_********************************
                        </code>
                        <button className="px-3 py-2 bg-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-300 transition-colors">
                          Copiar
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Webhook className="w-5 h-5 text-slate-500" />
                          <span className="font-medium text-slate-900">Webhook URL</span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                          Ativo
                        </span>
                      </div>
                      <input
                        type="url"
                        defaultValue="https://api.seusite.com/webhooks/rise"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
