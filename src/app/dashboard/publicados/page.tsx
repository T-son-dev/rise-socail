"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Calendar,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

type Network = "instagram" | "facebook" | "twitter" | "linkedin";

interface PublishedPost {
  id: number;
  title: string;
  client: string;
  content: string;
  networks: Network[];
  publishedAt: string;
  metrics: {
    reach: number;
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    engagement: number;
  };
}

const publishedPosts: PublishedPost[] = [
  {
    id: 1,
    title: "Aulas em Grupo",
    client: "Academia Fit",
    content: "Novo horário de aulas coletivas! Confira a grade completa no nosso site.",
    networks: ["instagram"],
    publishedAt: "2024-01-20 09:30",
    metrics: { reach: 2450, impressions: 3200, likes: 234, comments: 18, shares: 12, engagement: 4.2 },
  },
  {
    id: 2,
    title: "Saúde no Verão",
    client: "Clínica Bem Estar",
    content: "Cuidados essenciais com a saúde durante o verão. Hidratação e proteção solar!",
    networks: ["facebook", "instagram"],
    publishedAt: "2024-01-20 08:00",
    metrics: { reach: 1890, impressions: 2500, likes: 156, comments: 12, shares: 8, engagement: 3.8 },
  },
  {
    id: 3,
    title: "Direitos Trabalhistas",
    client: "Advocacia Silva",
    content: "Você sabe quais são seus direitos trabalhistas? Confira nosso guia completo.",
    networks: ["linkedin"],
    publishedAt: "2024-01-19 15:00",
    metrics: { reach: 1240, impressions: 1800, likes: 89, comments: 7, shares: 23, engagement: 5.1 },
  },
  {
    id: 4,
    title: "Promoção Relâmpago",
    client: "Loja Fashion",
    content: "Só hoje! 30% de desconto em toda a loja. Corra e aproveite!",
    networks: ["instagram", "facebook", "twitter"],
    publishedAt: "2024-01-19 12:00",
    metrics: { reach: 5420, impressions: 7800, likes: 567, comments: 89, shares: 145, engagement: 6.8 },
  },
  {
    id: 5,
    title: "Novos Serviços",
    client: "Tech Solutions",
    content: "Conheça nossos novos serviços de consultoria em TI para PMEs.",
    networks: ["linkedin", "twitter"],
    publishedAt: "2024-01-18 10:00",
    metrics: { reach: 980, impressions: 1200, likes: 45, comments: 5, shares: 12, engagement: 3.2 },
  },
  {
    id: 6,
    title: "Cardápio Especial",
    client: "Restaurante Sabor",
    content: "Novo cardápio de verão com pratos leves e refrescantes!",
    networks: ["instagram", "facebook"],
    publishedAt: "2024-01-17 18:00",
    metrics: { reach: 3200, impressions: 4500, likes: 342, comments: 28, shares: 56, engagement: 5.5 },
  },
];

const networkConfig: Record<Network, { icon: typeof Instagram; color: string; bgColor: string; name: string }> = {
  instagram: { icon: Instagram, color: "text-pink-500", bgColor: "bg-pink-50", name: "Instagram" },
  facebook: { icon: Facebook, color: "text-blue-600", bgColor: "bg-blue-50", name: "Facebook" },
  twitter: { icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50", name: "Twitter" },
  linkedin: { icon: Linkedin, color: "text-blue-700", bgColor: "bg-blue-700/10", name: "LinkedIn" },
};

export default function PublicadosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [networkFilter, setNetworkFilter] = useState<Network | "all">("all");

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNetwork = networkFilter === "all" || post.networks.includes(networkFilter);
    return matchesSearch && matchesNetwork;
  });

  const totalReach = publishedPosts.reduce((sum, post) => sum + post.metrics.reach, 0);
  const totalEngagement = publishedPosts.reduce((sum, post) => sum + post.metrics.likes + post.metrics.comments + post.metrics.shares, 0);
  const avgEngagementRate = (publishedPosts.reduce((sum, post) => sum + post.metrics.engagement, 0) / publishedPosts.length).toFixed(1);

  return (
    <>
      <Header title="Posts Publicados" subtitle="Histórico e métricas de publicações" />

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
                <Eye className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{totalReach.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Alcance Total</p>
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
              <div className="p-2 bg-pink-50 rounded-lg">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{totalEngagement.toLocaleString()}</p>
                <p className="text-sm text-slate-500">Total Engajamentos</p>
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
                <TrendingUp className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{avgEngagementRate}%</p>
                <p className="text-sm text-slate-500">Taxa Média Engajamento</p>
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
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{publishedPosts.length}</p>
                <p className="text-sm text-slate-500">Posts Publicados</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar publicações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setNetworkFilter("all")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                networkFilter === "all"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              Todas
            </button>
            {(["instagram", "facebook", "twitter", "linkedin"] as Network[]).map((network) => {
              const config = networkConfig[network];
              const NetworkIcon = config.icon;
              return (
                <button
                  key={network}
                  onClick={() => setNetworkFilter(network)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    networkFilter === network
                      ? "bg-indigo-500 text-white"
                      : cn("border border-slate-200", config.bgColor, "hover:opacity-80")
                  )}
                >
                  <NetworkIcon className={cn("w-5 h-5", networkFilter === network ? "text-white" : config.color)} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{post.title}</h3>
                    <p className="text-sm text-slate-500">{post.client}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
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
                </div>

                {/* Content Preview */}
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{post.content}</p>

                {/* Published Date */}
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Publicado em: {post.publishedAt}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="font-semibold">{post.metrics.likes}</span>
                    </div>
                    <p className="text-xs text-slate-500">Curtidas</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-indigo-500 mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-semibold">{post.metrics.comments}</span>
                    </div>
                    <p className="text-xs text-slate-500">Comentários</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
                      <Share2 className="w-4 h-4" />
                      <span className="font-semibold">{post.metrics.shares}</span>
                    </div>
                    <p className="text-xs text-slate-500">Compartilh.</p>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{post.metrics.reach.toLocaleString()} alcance</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-600">{post.metrics.engagement}%</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-indigo-500 hover:underline">
                    Ver detalhes <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Nenhuma publicação encontrada</h3>
            <p className="text-slate-500">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </main>
    </>
  );
}
