"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  X, BarChart3, MousePointer, Eye, TrendingUp, 
  Zap, Target, Flame, Users, Activity,
  Play, Pause, RotateCcw, ChevronRight,
  Split, MousePointerClick, ScanEye, ScanFace,
  Timer, MapPin, Smartphone, Monitor, CheckCircle
} from "lucide-react";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  solucaoNome?: string;
  corSolucao?: string;
}

export function AnalyticsModal({ isOpen, onClose, solucaoNome = "Analytics & Tracking", corSolucao = "#f97316" }: AnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState<"heatmap" | "funnel" | "session" | "ab">("heatmap");
  const [heatmapFilter, setHeatmapFilter] = useState("all");
  const [funnelStep, setFunnelStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
                <BarChart3 className="w-5 h-5" style={{ color: corSolucao }} />
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Demo Analytics</span>
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

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5">
            {[
              { icon: Eye, label: "Page Views", value: "24.5k", change: "+12%", color: "#06b6d4" },
              { icon: MousePointer, label: "Cliques", value: "8.2k", change: "+8%", color: "#8b5cf6" },
              { icon: Target, label: "Conversão", value: "3.4%", change: "+0.5%", color: "#10b981" },
              { icon: Users, label: "Visitantes", value: "12.1k", change: "+15%", color: "#f59e0b" },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                </div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-white/40">{stat.label}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {[
              { id: "heatmap", label: "Heatmap", icon: Flame },
              { id: "funnel", label: "Funil", icon: Target },
              { id: "session", label: "Gravações", icon: Play },
              { id: "ab", label: "A/B Test", icon: Split },
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
                    layoutId="analyticsTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: corSolucao }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {/* Heatmap Tab */}
              {activeTab === "heatmap" && (
                <motion.div
                  key="heatmap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Filter Buttons */}
                  <div className="flex gap-2">
                    {[
                      { id: "all", label: "Todos os cliques" },
                      { id: "desktop", label: "Desktop" },
                      { id: "mobile", label: "Mobile" },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setHeatmapFilter(filter.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          heatmapFilter === filter.id 
                            ? "text-white" 
                            : "text-white/50 hover:text-white/80"
                        }`}
                        style={{
                          background: heatmapFilter === filter.id ? `${corSolucao}30` : "rgba(255,255,255,0.05)",
                          border: heatmapFilter === filter.id ? `1px solid ${corSolucao}60` : "1px solid rgba(255,255,255,0.1)"
                        }}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Heatmap Visualization */}
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-white/40">
                        <div className="w-3 h-3 rounded-full bg-cyan-500/60" />
                        <span>Baixo</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/40">
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <span>Médio</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/40">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span>Alto</span>
                      </div>
                    </div>

                    {/* Website Mockup with Heatmap */}
                    <div className="mt-12 space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-3 p-4 border-b border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20" />
                        <div className="flex-1" />
                        <div className="w-16 h-2 bg-white/10 rounded-full" />
                        <div className="w-16 h-2 bg-white/10 rounded-full" />
                        <div className="w-16 h-2 bg-white/10 rounded-full" />
                      </div>

                      {/* Hero Section */}
                      <div className="p-6 text-center">
                        <motion.div 
                          className="relative inline-block"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="px-6 py-3 rounded-full text-sm font-medium text-white"
                            style={{ background: corSolucao }}
                          >
                            Botão CTA Principal
                          </div>
                          {/* Heatmap overlay */}
                          <motion.div 
                            className="absolute -inset-4 rounded-full"
                            style={{ 
                              background: `radial-gradient(circle, ${corSolucao}60 0%, transparent 70%)`,
                              filter: "blur(8px)"
                            }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="absolute -top-8 -right-8 px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold">
                            Hot!
                          </div>
                        </motion.div>
                      </div>

                      {/* Content Sections with Heatmap */}
                      <div className="grid grid-cols-3 gap-4 p-4">
                        {[
                          { intensity: 85, label: "Formulário" },
                          { intensity: 45, label: "Galeria" },
                          { intensity: 25, label: "Footer" },
                        ].map((section, i) => (
                          <motion.div 
                            key={i}
                            className="relative p-4 rounded-xl border border-white/10 overflow-hidden cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div 
                              className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-50"
                              style={{
                                background: section.intensity > 70 
                                  ? "linear-gradient(135deg, rgba(239, 68, 68, 0.4), transparent)"
                                  : section.intensity > 40
                                    ? "linear-gradient(135deg, rgba(245, 158, 11, 0.3), transparent)"
                                    : "linear-gradient(135deg, rgba(6, 182, 212, 0.2), transparent)"
                              }}
                            />
                            <div className="relative space-y-2">
                              <div className="h-2 bg-white/20 rounded-full w-3/4" />
                              <div className="h-2 bg-white/10 rounded-full" />
                              <div className="h-2 bg-white/10 rounded-full w-5/6" />
                            </div>
                            <div className="relative mt-3 flex items-center justify-between">
                              <span className="text-xs text-white/60">{section.label}</span>
                              <span 
                                className="text-xs font-bold"
                                style={{ 
                                  color: section.intensity > 70 ? "#ef4444" : section.intensity > 40 ? "#f59e0b" : "#06b6d4"
                                }}
                              >
                                {section.intensity}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Heatmap Stats */}
                    <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">847</div>
                          <div className="text-xs text-white/40">Cliques totais</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">156</div>
                          <div className="text-xs text-white/40">Hot zones</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">2.4s</div>
                          <div className="text-xs text-white/40">Tempo até clique</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Funnel Tab */}
              {activeTab === "funnel" && (
                <motion.div
                  key="funnel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Funil de Conversão</h3>
                    <p className="text-sm text-white/40">Análise do funil completo</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { step: 1, title: "Landing Page", users: 12540, percent: 100, drop: 0, color: "#06b6d4", icon: Eye },
                      { step: 2, title: "Página de Produto", users: 8320, percent: 66, drop: 34, color: "#8b5cf6", icon: ScanEye },
                      { step: 3, title: "Adicionou ao Carrinho", users: 4280, percent: 34, drop: 48, color: "#f59e0b", icon: MousePointerClick },
                      { step: 4, title: "Iniciou Checkout", users: 1850, percent: 15, drop: 57, color: "#f97316", icon: Target },
                      { step: 5, title: "Compra Completa", users: 425, percent: 3.4, drop: 77, color: "#10b981", icon: CheckCircle },
                    ].map((item, index) => {
                      const ItemIcon = item.icon;
                      return (
                        <motion.div
                          key={item.step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative"
                        >
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: `${item.color}20` }}
                            >
                              <ItemIcon className="w-5 h-5" style={{ color: item.color }} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-white">{item.title}</span>
                                <span 
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{ background: `${item.color}20`, color: item.color }}
                                >
                                  Step {item.step}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-white/60">{item.users.toLocaleString()} usuários</span>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: item.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percent}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-white">{item.percent}%</span>
                              </div>
                            </div>
                          </div>
                          {index < 4 && (
                            <div className="flex items-center justify-center my-2">
                              <div className="text-xs text-red-400 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 rotate-180" />
                                Perda: {item.drop}%
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Taxa de Conversão: 3.4%</p>
                        <p className="text-xs text-white/50">
                          Acima da média do setor (2.1%). Identifique onde os usuários abandonam e otimize esses pontos.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Session Recordings Tab */}
              {activeTab === "session" && (
                <motion.div
                  key="session"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Gravações de Sessão</h3>
                    <p className="text-sm text-white/40">Veja exatamente como os usuários navegam</p>
                  </div>

                  {/* Video Player Mockup */}
                  <div className="relative aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-1" />
                          )}
                        </div>
                        <p className="text-sm text-white/60">Sessão #8472 • 3:24</p>
                      </div>
                    </div>
                    
                    {/* Mouse Trail Animation */}
                    {isPlaying && (
                      <motion.div
                        className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none"
                        style={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                        animate={{
                          x: [100, 300, 200, 400, 150],
                          y: [200, 150, 300, 200, 250],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                      />
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-white"
                            animate={{ width: isPlaying ? ["0%", "100%"] : "0%" }}
                            transition={{ duration: 10, repeat: Infinity }}
                          />
                        </div>
                        <span className="text-xs text-white/60">1:45 / 3:24</span>
                        <button className="text-white/60 hover:text-white">
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Session List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-white">Sessões Recentes</h4>
                      <button className="text-xs text-white/60 hover:text-white">Ver todas</button>
                    </div>
                    {[
                      { user: "Visitante #8472", duration: "3:24", pages: 5, actions: 23, frustrated: false },
                      { user: "Visitante #8471", duration: "1:12", pages: 2, actions: 8, frustrated: true },
                      { user: "Visitante #8470", duration: "5:47", pages: 8, actions: 45, frustrated: false },
                    ].map((session, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <ScanFace className="w-5 h-5 text-white/60" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white font-medium">{session.user}</span>
                            {session.frustrated && (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px]">
                                Frustração detectada
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              {session.duration}
                            </span>
                            <span>{session.pages} páginas</span>
                            <span>{session.actions} ações</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* A/B Test Tab */}
              {activeTab === "ab" && (
                <motion.div
                  key="ab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Teste A/B Ativo</h3>
                    <p className="text-sm text-white/40">Botão CTA: &quot;Comprar Agora&quot; vs &quot;Adicionar ao Carrinho&quot;</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Variant A */}
                    <motion.div 
                      className="p-5 rounded-2xl bg-white/5 border border-emerald-500/30 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                        Vencedor!
                      </div>
                      <div className="text-center mb-4">
                        <span className="text-xs uppercase tracking-wider text-white/40">Variante A</span>
                        <h4 className="text-lg font-bold text-white mt-1">&quot;Comprar Agora&quot;</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-400">4.2%</div>
                          <div className="text-xs text-white/40">Taxa de conversão</div>
                        </div>
                        
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div>
                            <div className="text-sm font-bold text-white">612</div>
                            <div className="text-[10px] text-white/40">Conversões</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">14.5k</div>
                            <div className="text-[10px] text-white/40">Visitantes</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Variant B */}
                    <motion.div 
                      className="p-5 rounded-2xl bg-white/5 border border-white/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center mb-4">
                        <span className="text-xs uppercase tracking-wider text-white/40">Variante B</span>
                        <h4 className="text-lg font-bold text-white mt-1">&quot;Adicionar ao Carrinho&quot;</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white/60">2.8%</div>
                          <div className="text-xs text-white/40">Taxa de conversão</div>
                        </div>
                        
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full bg-white/40"
                            initial={{ width: 0 }}
                            animate={{ width: "47%" }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div>
                            <div className="text-sm font-bold text-white">408</div>
                            <div className="text-[10px] text-white/40">Conversões</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">14.5k</div>
                            <div className="text-[10px] text-white/40">Visitantes</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Resultado: +50% de conversão</p>
                        <p className="text-xs text-white/50">
                          A variante A tem 99.9% de chance de ser a melhor. Recomendamos implementar em 100% do tráfego.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/40">Analytics em tempo real</span>
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
