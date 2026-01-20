"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Send,
  AlertCircle,
  Calendar,
  Image as ImageIcon,
  Video,
  FileText,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

type JobStatus = "draft" | "pending" | "approved" | "scheduled" | "published" | "rejected";
type ContentType = "image" | "video" | "carousel" | "text";
type Network = "instagram" | "facebook" | "twitter" | "linkedin";

interface Job {
  id: number;
  title: string;
  client: string;
  content: string;
  contentType: ContentType;
  networks: Network[];
  status: JobStatus;
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  thumbnail?: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Promoção de Verão",
    client: "Loja Fashion",
    content: "Aproveite 50% de desconto em todas as peças de verão! Corra que é por tempo limitado. 🌞👗",
    contentType: "image",
    networks: ["instagram", "facebook"],
    status: "pending",
    createdAt: "2024-01-20",
    scheduledFor: "2024-01-22 14:00",
  },
  {
    id: 2,
    title: "Dicas de Tecnologia",
    client: "Tech Solutions",
    content: "5 dicas para aumentar a produtividade da sua equipe com ferramentas de TI modernas.",
    contentType: "carousel",
    networks: ["linkedin", "twitter"],
    status: "approved",
    createdAt: "2024-01-19",
    scheduledFor: "2024-01-21 10:00",
  },
  {
    id: 3,
    title: "Happy Hour Especial",
    client: "Restaurante Sabor",
    content: "Toda sexta-feira é dia de Happy Hour! Chopp por R$9,90 das 17h às 20h. 🍺",
    contentType: "video",
    networks: ["instagram", "facebook", "twitter"],
    status: "scheduled",
    createdAt: "2024-01-18",
    scheduledFor: "2024-01-26 17:00",
  },
  {
    id: 4,
    title: "Aulas em Grupo",
    client: "Academia Fit",
    content: "Novo horário de aulas coletivas! Confira a grade completa no nosso site.",
    contentType: "image",
    networks: ["instagram"],
    status: "published",
    createdAt: "2024-01-15",
    publishedAt: "2024-01-20 09:30",
  },
  {
    id: 5,
    title: "Saúde no Verão",
    client: "Clínica Bem Estar",
    content: "Cuidados essenciais com a saúde durante o verão. Hidratação, proteção solar e mais!",
    contentType: "carousel",
    networks: ["facebook", "instagram"],
    status: "published",
    createdAt: "2024-01-14",
    publishedAt: "2024-01-20 08:00",
  },
  {
    id: 6,
    title: "Direitos Trabalhistas",
    client: "Advocacia Silva",
    content: "Você sabe quais são seus direitos trabalhistas? Confira nosso guia completo.",
    contentType: "text",
    networks: ["linkedin"],
    status: "draft",
    createdAt: "2024-01-21",
  },
  {
    id: 7,
    title: "Lançamento Coleção",
    client: "Loja Fashion",
    content: "Nova coleção outono/inverno chegando! Peças exclusivas para você arrasar.",
    contentType: "video",
    networks: ["instagram", "facebook", "twitter"],
    status: "rejected",
    createdAt: "2024-01-17",
  },
];

const statusConfig: Record<JobStatus, { label: string; color: string; bgColor: string; icon: typeof Clock }> = {
  draft: { label: "Rascunho", color: "text-slate-500", bgColor: "bg-slate-100", icon: FileText },
  pending: { label: "Aguardando Aprovação", color: "text-amber-600", bgColor: "bg-amber-50", icon: Clock },
  approved: { label: "Aprovado", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: CheckCircle },
  scheduled: { label: "Agendado", color: "text-indigo-600", bgColor: "bg-indigo-50", icon: Calendar },
  published: { label: "Publicado", color: "text-green-600", bgColor: "bg-green-50", icon: Send },
  rejected: { label: "Rejeitado", color: "text-red-600", bgColor: "bg-red-50", icon: AlertCircle },
};

const networkConfig: Record<Network, { icon: typeof Instagram; color: string; bgColor: string }> = {
  instagram: { icon: Instagram, color: "text-pink-500", bgColor: "bg-pink-50" },
  facebook: { icon: Facebook, color: "text-blue-600", bgColor: "bg-blue-50" },
  twitter: { icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50" },
  linkedin: { icon: Linkedin, color: "text-blue-700", bgColor: "bg-blue-700/10" },
};

const contentTypeIcons: Record<ContentType, typeof ImageIcon> = {
  image: ImageIcon,
  video: Video,
  carousel: ImageIcon,
  text: FileText,
};

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const jobCounts = {
    all: jobs.length,
    draft: jobs.filter((j) => j.status === "draft").length,
    pending: jobs.filter((j) => j.status === "pending").length,
    approved: jobs.filter((j) => j.status === "approved").length,
    scheduled: jobs.filter((j) => j.status === "scheduled").length,
    published: jobs.filter((j) => j.status === "published").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };

  return (
    <>
      <Header title="Jobs" subtitle="Gerenciamento de conteúdos" />

      <main className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as JobStatus | "all")}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">Todos ({jobCounts.all})</option>
                <option value="draft">Rascunhos ({jobCounts.draft})</option>
                <option value="pending">Pendentes ({jobCounts.pending})</option>
                <option value="approved">Aprovados ({jobCounts.approved})</option>
                <option value="scheduled">Agendados ({jobCounts.scheduled})</option>
                <option value="published">Publicados ({jobCounts.published})</option>
                <option value="rejected">Rejeitados ({jobCounts.rejected})</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            Novo Job
          </motion.button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["all", "draft", "pending", "approved", "scheduled", "published", "rejected"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                statusFilter === status
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {status === "all" ? "Todos" : statusConfig[status].label}
              <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-white/20">
                {jobCounts[status]}
              </span>
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => {
            const status = statusConfig[job.status];
            const StatusIcon = status.icon;
            const ContentIcon = contentTypeIcons[job.contentType];

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Thumbnail Area */}
                <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 relative flex items-center justify-center">
                  <ContentIcon className="w-12 h-12 text-slate-300" />
                  <div className="absolute top-3 right-3">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1", status.bgColor, status.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500">{job.client}</p>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{job.content}</p>

                  {/* Networks */}
                  <div className="flex items-center gap-2">
                    {job.networks.map((network) => {
                      const config = networkConfig[network];
                      const NetworkIcon = config.icon;
                      return (
                        <div key={network} className={cn("p-1.5 rounded-lg", config.bgColor)}>
                          <NetworkIcon className={cn("w-4 h-4", config.color)} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Schedule/Publish Info */}
                  {job.scheduledFor && job.status !== "published" && (
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Agendado: {job.scheduledFor}
                    </p>
                  )}
                  {job.publishedAt && (
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Send className="w-3 h-3" />
                      Publicado: {job.publishedAt}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                    {job.status === "pending" && (
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Aprovar
                      </button>
                    )}
                    {(job.status === "draft" || job.status === "rejected") && (
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Nenhum job encontrado</h3>
            <p className="text-slate-500">Tente ajustar os filtros ou criar um novo job.</p>
          </div>
        )}
      </main>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedJob(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                  <p className="text-sm text-slate-500">{selectedJob.client}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Status */}
                <div className="flex items-center gap-4">
                  <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1", statusConfig[selectedJob.status].bgColor, statusConfig[selectedJob.status].color)}>
                    {(() => {
                      const StatusIcon = statusConfig[selectedJob.status].icon;
                      return <StatusIcon className="w-4 h-4" />;
                    })()}
                    {statusConfig[selectedJob.status].label}
                  </span>
                  <span className="text-sm text-slate-500">Criado em: {selectedJob.createdAt}</span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Conteúdo</h3>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-slate-700 whitespace-pre-wrap">{selectedJob.content}</p>
                  </div>
                </div>

                {/* Networks */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Redes Sociais</h3>
                  <div className="flex items-center gap-3">
                    {selectedJob.networks.map((network) => {
                      const config = networkConfig[network];
                      const NetworkIcon = config.icon;
                      return (
                        <div key={network} className={cn("flex items-center gap-2 px-3 py-2 rounded-lg", config.bgColor)}>
                          <NetworkIcon className={cn("w-5 h-5", config.color)} />
                          <span className="text-sm font-medium text-slate-700 capitalize">{network}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Schedule */}
                {selectedJob.scheduledFor && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Agendamento</h3>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                      <span>{selectedJob.scheduledFor}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-slate-100 flex items-center gap-3 justify-end">
                {selectedJob.status === "pending" && (
                  <>
                    <button className="px-4 py-2 rounded-xl text-red-600 bg-red-50 font-medium hover:bg-red-100 transition-colors">
                      Rejeitar
                    </button>
                    <button className="px-4 py-2 rounded-xl text-emerald-600 bg-emerald-50 font-medium hover:bg-emerald-100 transition-colors">
                      Aprovar
                    </button>
                  </>
                )}
                {selectedJob.status === "approved" && (
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                    Agendar Publicação
                  </button>
                )}
                {(selectedJob.status === "draft" || selectedJob.status === "rejected") && (
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                    Editar Job
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
