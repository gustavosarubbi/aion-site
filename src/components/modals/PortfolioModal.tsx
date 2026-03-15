"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  X, Palette, ExternalLink, ArrowLeft, Eye, Heart,
  Share2, MoreHorizontal, Globe, Monitor, Smartphone,
  ArrowUpRight, Zap, Layers, Code2, CheckCircle,
  Filter, ChevronRight, Sparkles, Target, ArrowRight, Rocket
} from "lucide-react";
import Image from "next/image";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  solucaoNome?: string;
  corSolucao?: string;
}

const categorias = [
  { id: "todos", nome: "Todos" },
  { id: "ecommerce", nome: "E-commerce" },
  { id: "saas", nome: "SaaS" },
  { id: "landing", nome: "Landing Pages" },
  { id: "dashboard", nome: "Dashboards" },
];

const projetos = [
  {
    id: 1,
    titulo: "Loja Premium",
    categoria: "ecommerce",
    imagem: "",
    icone: ShoppingBag,
    descricao: "E-commerce completo com checkout otimizado, automação de estoque e integração com múltiplos gateways de pagamento.",
    tecnologias: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    resultados: { conversao: "+45%", receita: "R$ 2.4M", tempo: "-30%" },
    cores: ["#f59e0b", "#ef4444"],
  },
  {
    id: 2,
    titulo: "SaaS Analytics",
    categoria: "saas",
    imagem: "",
    icone: BarChart3,
    descricao: "Plataforma de analytics em tempo real com dashboards personalizáveis, relatórios automáticos e integração com 50+ fontes de dados.",
    tecnologias: ["React", "Node.js", "ClickHouse", "WebSocket"],
    resultados: { usuarios: "12k+", dados: "2TB/dia", satisfaction: "98%" },
    cores: ["#3b82f6", "#8b5cf6"],
  },
  {
    id: 3,
    titulo: "Landing Pro",
    categoria: "landing",
    imagem: "",
    icone: Rocket,
    descricao: "Sistema de landing pages com A/B testing nativo, otimização automática e integração completa com Google Ads e Meta.",
    tecnologias: ["Next.js", "Vercel", "Supabase", "Analytics"],
    resultados: { leads: "+320%", cpl: "-60%", roi: "450%" },
    cores: ["#10b981", "#06b6d4"],
  },
  {
    id: 4,
    titulo: "Dashboard Corp",
    categoria: "dashboard",
    imagem: "",
    icone: LayoutDashboard,
    descricao: "Dashboard executivo com dados consolidados de múltiplos departamentos, alertas em tempo real e exportação automática.",
    tecnologias: ["React", "D3.js", "PostgreSQL", "n8n"],
    resultados: { eficiencia: "+80%", reports: "-90%", decision: "3x" },
    cores: ["#8b5cf6", "#ec4899"],
  },
];

function ShoppingBag(props: any) {
  return <Target {...props} />;
}

function LayoutDashboard(props: any) {
  return <Layers {...props} />;
}

import { BarChart3 } from "lucide-react";

export function PortfolioModal({ isOpen, onClose, solucaoNome = "Autoridade Digital", corSolucao = "#f472b6" }: PortfolioModalProps) {
  const [activeTab, setActiveTab] = useState<"galeria" | "destaques" | "metricas">("galeria");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [projetoSelecionado, setProjetoSelecionado] = useState<typeof projetos[0] | null>(null);

  const projetosFiltrados = categoriaAtiva === "todos" 
    ? projetos 
    : projetos.filter(p => p.categoria === categoriaAtiva);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="relative w-full max-w-5xl bg-[#0a0f1c] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${corSolucao}20`, border: `1px solid ${corSolucao}40` }}
              >
                <Palette className="w-5 h-5" style={{ color: corSolucao }} />
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Demo Portfólio</span>
                <p className="text-sm text-white font-medium">{solucaoNome}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {[
              { id: "galeria", label: "Galeria", icon: Layers },
              { id: "destaques", label: "Cases de Sucesso", icon: Sparkles },
              { id: "metricas", label: "Resultados", icon: Target },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="portfolioTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: corSolucao }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[65vh]" style={{ display: projetoSelecionado ? 'none' : 'block' }}>
            <AnimatePresence mode="wait">
              {activeTab === "galeria" && (
                <motion.div
                  key="galeria"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Nossos Projetos</h3>
                    <p className="text-sm text-white/40">Portfólio de cases de sucesso</p>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {categorias.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoriaAtiva(cat.id)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                          categoriaAtiva === cat.id
                            ? "text-white"
                            : "text-white/50 hover:text-white/80"
                        }`}
                        style={{
                          background: categoriaAtiva === cat.id ? `${corSolucao}30` : "rgba(255,255,255,0.05)",
                          border: categoriaAtiva === cat.id ? `1px solid ${corSolucao}60` : "1px solid rgba(255,255,255,0.1)"
                        }}
                      >
                        {cat.nome}
                      </button>
                    ))}
                  </div>

                  {/* Projects Grid */}
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {projetosFiltrados.map((projeto) => {
                        const Icon = projeto.icone;
                        return (
                          <motion.div
                            key={projeto.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group cursor-pointer"
                            onClick={() => setProjetoSelecionado(projeto)}
                          >
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                              <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ 
                                  background: `linear-gradient(135deg, ${projeto.cores[0]}20, ${projeto.cores[1]}10)` 
                                }}
                              >
                                <Icon className="w-16 h-16 text-white/20" />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4">
                                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/20 text-white/80">
                                    {projeto.categoria}
                                  </span>
                                  <h4 className="text-lg font-bold text-white mt-2">{projeto.titulo}</h4>
                                  <div className="flex items-center gap-2 mt-2">
                                    <ArrowUpRight className="w-4 h-4 text-white/60" />
                                    <span className="text-xs text-white/60">Ver detalhes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "destaques" && (
                <motion.div
                  key="destaques"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Cases de Sucesso</h3>
                    <p className="text-sm text-white/40">Transformações reais de clientes</p>
                  </div>

                  {/* Featured Cases */}
                  <div className="space-y-4">
                    {[
                      { 
                        cliente: "TechStart", 
                        antes: "50 leads/mês", 
                        depois: "800 leads/mês",
                        resultado: "1.500%",
                        icone: Zap
                      },
                      { 
                        cliente: "E-commerce Pro", 
                        antes: "2% conversão", 
                        depois: "12% conversão",
                        resultado: "500%",
                        icone: Target
                      },
                      { 
                        cliente: "SaaS Corp", 
                        antes: "Manual", 
                        depois: "100% Automatizado",
                        resultado: "80% economia",
                        icone: CheckCircle
                      },
                    ].map((caseStudy, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                            <caseStudy.icone className="w-6 h-6 text-pink-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-medium">{caseStudy.cliente}</h4>
                              <span className="text-lg font-bold text-emerald-400">{caseStudy.resultado}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-white/40">Antes: {caseStudy.antes}</span>
                              <ArrowRight className="w-4 h-4 text-white/20" />
                              <span className="text-emerald-400">Depois: {caseStudy.depois}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "metricas" && (
                <motion.div
                  key="metricas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Nossos Números</h3>
                    <p className="text-sm text-white/40">Resultados acumulados de todos os projetos</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Projetos", value: "50+", desc: "Entregues", color: "#f472b6" },
                      { label: "Leads Gerados", value: "2.4M+", desc: "Para clientes", color: "#ec4899" },
                      { label: "Faturamento", value: "R$ 12M+", desc: "Em vendas", color: "#8b5cf6" },
                      { label: "Satisfação", value: "98%", desc: "NPS médio", color: "#3b82f6" },
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center"
                      >
                        <div 
                          className="text-3xl font-bold mb-1"
                          style={{ color: metric.color }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-sm text-white font-medium mb-1">{metric.label}</div>
                        <div className="text-xs text-white/40">{metric.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Project Detail View */}
          <AnimatePresence>
            {projetoSelecionado && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#0a0f1c] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setProjetoSelecionado(null)}
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Voltar</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10"
                    >
                      <X className="w-5 h-5 text-white/60" />
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Project Header */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${projetoSelecionado.cores[0]}30, ${projetoSelecionado.cores[1]}20)` 
                        }}
                      >
                        <projetoSelecionado.icone className="w-24 h-24 text-white/30" />
                      </div>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/60">
                        {projetoSelecionado.categoria}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-3">{projetoSelecionado.titulo}</h3>
                      <p className="text-white/60 mt-2">{projetoSelecionado.descricao}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {projetoSelecionado.tecnologias.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-medium text-white mb-4">Resultados</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(projetoSelecionado.resultados).map(([key, value], i) => (
                          <div key={i} className="text-center">
                            <div className="text-xl font-bold text-white">{value}</div>
                            <div className="text-xs text-white/40 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/40">{projetos.length} projetos no portfólio</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-sm font-medium text-white/80 border border-white/10 hover:bg-white/5 transition-colors"
              >
                Fechar Demo
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
