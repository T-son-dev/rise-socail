"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
  X,
  Eye,
  Calendar,
  Image as ImageIcon,
  Video,
  FileText,
  MessageSquare,
  Send,
  AlertTriangle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

type Network = "instagram" | "facebook" | "twitter" | "linkedin";
type ContentType = "image" | "video" | "carousel" | "text";

interface PendingApproval {
  id: number;
  title: string;
  client: string;
  clientEmail: string;
  content: string;
  contentType: ContentType;
  networks: Network[];
  createdAt: string;
  scheduledFor: string;
  comments: string[];
  urgent: boolean;
}

const pendingApprovals: PendingApproval[] = [
  {
    id: 1,
    title: "Promoção de Verão",
    client: "Loja Fashion",
    clientEmail: "marketing@lojafashion.com",
    content: "Aproveite 50% de desconto em todas as peças de verão! Corra que é por tempo limitado. 🌞👗\n\n#LojaFashion #PromoçãoVerão #Moda #Desconto",
    contentType: "image",
    networks: ["instagram", "facebook"],
    createdAt: "2024-01-20 09:30",
    scheduledFor: "2024-01-22 14:00",
    comments: [],
    urgent: true,
  },
  {
    id: 2,
    title: "Dicas de Tecnologia",
    client: "Tech Solutions",
    clientEmail: "contato@techsolutions.com.br",
    content: "5 dicas para aumentar a produtividade da sua equipe com ferramentas de TI modernas.\n\n1. Automatize tarefas repetitivas\n2. Use ferramentas de colaboração em nuvem\n3. Implemente metodologias ágeis\n4. Invista em segurança da informação\n5. Capacite sua equipe constantemente",
    contentType: "carousel",
    networks: ["linkedin", "twitter"],
    createdAt: "2024-01-19 15:00",
    scheduledFor: "2024-01-21 10:00",
    comments: ["Verificar se as imagens estão corretas"],
    urgent: false,
  },
  {
    id: 3,
    title: "Happy Hour Especial",
    client: "Restaurante Sabor",
    clientEmail: "gerencia@restaurantesabor.com",
    content: "Toda sexta-feira é dia de Happy Hour! Chopp por R$9,90 das 17h às 20h. 🍺\n\nVenha curtir com os amigos!\n\n📍 Rua das Flores, 123 - Centro\n📱 (11) 9999-9999",
    contentType: "video",
    networks: ["instagram", "facebook", "twitter"],
    createdAt: "2024-01-18 11:00",
    scheduledFor: "2024-01-26 17:00",
    comments: ["Ajustar horário do vídeo", "Adicionar logo no final"],
    urgent: false,
  },
  {
    id: 4,
    title: "Novidades Janeiro",
    client: "Academia Fit",
    clientEmail: "comunicacao@academiafit.com.br",
    content: "Novo horário de aulas coletivas a partir de fevereiro! 💪\n\nConfira a grade completa no nosso site ou fale com nossos atendentes.\n\n#AcademiaFit #VidaSaudável #Fitness",
    contentType: "image",
    networks: ["instagram"],
    createdAt: "2024-01-20 08:00",
    scheduledFor: "2024-01-23 09:00",
    comments: [],
    urgent: false,
  },
];

const networkConfig: Record<Network, { icon: typeof Instagram; color: string; bgColor: string; name: string }> = {
  instagram: { icon: Instagram, color: "text-pink-500", bgColor: "bg-pink-50", name: "Instagram" },
  facebook: { icon: Facebook, color: "text-blue-600", bgColor: "bg-blue-50", name: "Facebook" },
  twitter: { icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50", name: "Twitter" },
  linkedin: { icon: Linkedin, color: "text-blue-700", bgColor: "bg-blue-700/10", name: "LinkedIn" },
};

const contentTypeIcons: Record<ContentType, { icon: typeof ImageIcon; label: string }> = {
  image: { icon: ImageIcon, label: "Imagem" },
  video: { icon: Video, label: "Vídeo" },
  carousel: { icon: ImageIcon, label: "Carrossel" },
  text: { icon: FileText, label: "Texto" },
};

export default function AprovacoesPage() {
  const [selectedItem, setSelectedItem] = useState<PendingApproval | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (id: number) => {
    // In real app, would call API
    console.log("Approved:", id);
    setSelectedItem(null);
  };

  const handleReject = (id: number) => {
    // In real app, would call API
    console.log("Rejected:", id, "Reason:", rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedItem(null);
  };

  return (
    <>
      <Header title="Aprovações Pendentes" subtitle="Conteúdos aguardando aprovação do cliente" />

      <main className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{pendingApprovals.length}</p>
                <p className="text-sm text-slate-500">Aguardando Aprovação</p>
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
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {pendingApprovals.filter((p) => p.urgent).length}
                </p>
                <p className="text-sm text-slate-500">Urgentes</p>
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
              <div className="p-2 bg-indigo-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {pendingApprovals.filter((p) => p.comments.length > 0).length}
                </p>
                <p className="text-sm text-slate-500">Com Comentários</p>
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
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Send className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-sm text-slate-500">Enviados Hoje</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pending List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Fila de Aprovação</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {pendingApprovals.map((item, index) => {
              const ContentIcon = contentTypeIcons[item.contentType].icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "p-4 hover:bg-slate-50 transition-colors",
                    item.urgent && "bg-red-50/50"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Content Type Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                      <ContentIcon className="w-8 h-8 text-slate-400" />
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900">{item.title}</h3>
                        {item.urgent && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                            Urgente
                          </span>
                        )}
                        {item.comments.length > 0 && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {item.comments.length}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{item.client}</p>
                      <p className="text-sm text-slate-600 line-clamp-2 mt-1">{item.content}</p>

                      {/* Networks & Schedule */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                          {item.networks.map((network) => {
                            const config = networkConfig[network];
                            const NetworkIcon = config.icon;
                            return (
                              <div key={network} className={cn("p-1.5 rounded-lg", config.bgColor)}>
                                <NetworkIcon className={cn("w-4 h-4", config.color)} />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{item.scheduledFor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowRejectModal(true);
                        }}
                        className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aprovar
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedItem && !showRejectModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{selectedItem.title}</h2>
                    {selectedItem.urgent && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                        Urgente
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{selectedItem.client} • {selectedItem.clientEmail}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Preview Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Content Preview */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Preview do Conteúdo</h3>
                    <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                      {(() => {
                        const ContentIcon = contentTypeIcons[selectedItem.contentType].icon;
                        return <ContentIcon className="w-16 h-16 text-slate-300" />;
                      })()}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      {contentTypeIcons[selectedItem.contentType].label}
                    </p>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Texto da Publicação</h3>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-slate-700 whitespace-pre-wrap text-sm">{selectedItem.content}</p>
                    </div>
                  </div>
                </div>

                {/* Networks */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Será publicado em</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.networks.map((network) => {
                      const config = networkConfig[network];
                      const NetworkIcon = config.icon;
                      return (
                        <div
                          key={network}
                          className={cn("flex items-center gap-2 px-3 py-2 rounded-lg", config.bgColor)}
                        >
                          <NetworkIcon className={cn("w-5 h-5", config.color)} />
                          <span className="text-sm font-medium text-slate-700">{config.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Agendamento</h3>
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="font-medium text-slate-900">{selectedItem.scheduledFor}</p>
                      <p className="text-sm text-slate-500">Data e hora programadas</p>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                {selectedItem.comments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Comentários Internos</h3>
                    <div className="space-y-2">
                      {selectedItem.comments.map((comment, index) => (
                        <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                          <p className="text-sm text-amber-800">{comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-4 py-2.5 rounded-xl text-red-600 bg-red-50 font-medium hover:bg-red-100 transition-colors"
                >
                  Rejeitar
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 bg-slate-100 font-medium hover:bg-slate-200 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => handleApprove(selectedItem.id)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/25"
                  >
                    Aprovar Publicação
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason("");
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Rejeitar Publicação</h2>
                <p className="text-sm text-slate-500">{selectedItem.title}</p>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Motivo da rejeição
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Descreva o motivo da rejeição para o cliente..."
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                  rows={4}
                />
              </div>
              <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleReject(selectedItem.id)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Confirmar Rejeição
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
