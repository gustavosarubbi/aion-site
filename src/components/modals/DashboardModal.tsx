"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  X, LayoutDashboard, TrendingUp, Users, DollarSign, 
  Activity, AlertCircle, Filter, Calendar, RefreshCw,
  ArrowUpRight, ArrowDownRight, Zap, CheckCircle,
  BarChart3, PieChart, LineChart, MoreHorizontal
} from "lucide-react";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  solucaoNome?: string;
  corSolucao?: string;
}

const dadosPeriodo = {
  "7d": { vendas: 45200, leads: 342, conversao: 12.5, ticket: 132 },
  "30d": { vendas: 184500, leads: 1380, conversao: 13.4, ticket: 134 },
  "90d": { vendas: 523400, leads: 4120, conversao: 14.2, ticket: 127 },
};

const canais = [
  { nome: "WhatsApp", leads: 520, percent: 38, cor: "#25D366" },
  { nome: "Instagram", leads: 415, percent: 30, cor: "#E4405F" },
  { nome: "Facebook", leads: 248, percent: 18, cor: "#1877F2" },
  { nome: "Email", leads: 197, percent: 14, cor: "#EA4335" },
];

const alertas = [
  { id: 1, tipo: "success", msg: "Meta diária atingida", time: "2 min atrás" },
  { id: 2, tipo: "warning", msg: "Pico de tráfego detectado", time: "15 min atrás" },
  { id: 3, tipo: "info", msg: "Nova integração ativa", time: "1 hora atrás" },
];

export function DashboardModal({ isOpen, onClose, solucaoNome = "Centralização Operacional", corSolucao = "#10b981" }: DashboardModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "canais" | "alertas">("overview");
  const [periodoSelecionado, setPeriodoSelecionado] = useState<"7d" | "30d" | "90d">("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dados, setDados] = useState(dadosPeriodo["30d"]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setActiveTab("overview");
      setPeriodoSelecionado("30d");
    }
  }, [isOpen]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handlePeriodoChange = (p: "7d" | "30d" | "90d") => {
    setPeriodoSelecionado(p);
    setDados(dadosPeriodo[p]);
  };

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
                <LayoutDashboard className="w-5 h-5" style={{ color: corSolucao }} />
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Demo Dashboard</span>
                <p className="text-sm text-white font-medium">{solucaoNome}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-pulse' : ''}`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/60">Período:</span>
              {(["7d", "30d", "90d"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePeriodoChange(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    periodoSelecionado === p 
                      ? "text-white" 
                      : "text-white/50 hover:text-white/80"
                  }`}
                  style={{
                    background: periodoSelecionado === p ? `${corSolucao}30` : "rgba(255,255,255,0.05)",
                    border: periodoSelecionado === p ? `1px solid ${corSolucao}60` : "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  {p === "7d" ? "7 dias" : p === "30d" ? "30 dias" : "90 dias"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Dados em tempo real
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "canais", label: "Canais", icon: PieChart },
              { id: "alertas", label: "Alertas", icon: Activity },
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
                    layoutId="dashTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: corSolucao }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[65vh]">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { 
                        label: "Vendas", 
                        value: `R$ ${(dados.vendas / 1000).toFixed(0)}k`, 
                        change: "+12.5%", 
                        icon: DollarSign, 
                        color: "#10b981",
                        positive: true
                      },
                      { 
                        label: "Leads", 
                        value: dados.leads.toString(), 
                        change: "+8.3%", 
                        icon: Users, 
                        color: "#06b6d4",
                        positive: true
                      },
                      { 
                        label: "Conversão", 
                        value: `${dados.conversao}%`, 
                        change: "+2.1%", 
                        icon: TrendingUp, 
                        color: "#8b5cf6",
                        positive: true
                      },
                      { 
                        label: "Ticket Médio", 
                        value: `R$ ${dados.ticket}`, 
                        change: "-1.2%", 
                        icon: Activity, 
                        color: "#f59e0b",
                        positive: false
                      },
                    ].map((kpi, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${kpi.color}20` }}
                          >
                            <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                          </div>
                          <div className={`flex items-center gap-1 text-xs ${kpi.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {kpi.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {kpi.change}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                          {kpi.value}
                        </div>
                        <div className="text-xs text-white/40">{kpi.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-white">Vendas por Período</h4>
                        <LineChart className="w-4 h-4 text-white/40" />
                      </div>
                      <div className="flex items-end gap-2 h-32">
                        {[40, 55, 45, 70, 85, 60, 90, 75, 95, 110, 127, 140].map((h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-t-sm cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ 
                              background: i === 11 ? `linear-gradient(to top, ${corSolucao}, ${corSolucao}80)` : 'rgba(16, 185, 129, 0.3)'
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] text-white/30 mt-3">
                        {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((m) => (
                          <span key={m}>{m}</span>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Funnel */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-white">Funil de Conversão</h4>
                        <TrendingUp className="w-4 h-4 text-white/40" />
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "Visitantes", value: 5240, percent: 100, color: "#06b6d4" },
                          { label: "Leads Capturados", value: 1380, percent: 26, color: "#8b5cf6" },
                          { label: "Qualificados", value: 485, percent: 35, color: "#f59e0b" },
                          { label: "Clientes", value: 184, percent: 38, color: "#10b981" },
                        ].map((step, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-white/60">{step.label}</span>
                              <span className="text-white font-medium">{step.value}</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: step.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${step.percent}%` }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Activity */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-white">Atividade em Tempo Real</span>
                      </div>
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Ao vivo
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Leads Ativos", value: "24", sub: "+3 hoje" },
                        { label: "Conversas IA", value: "156", sub: "80% auto" },
                        { label: "Hot Leads", value: "8", sub: "Qualificados" },
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xl font-bold text-white">{item.value}</div>
                          <div className="text-xs text-white/40">{item.label}</div>
                          <div className="text-[10px] text-emerald-400 mt-1">{item.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "canais" && (
                <motion.div
                  key="canais"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Distribuição por Canal</h3>
                    <p className="text-sm text-white/40">Veja de onde vêm seus leads</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Representation */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-medium text-white mb-6 text-center">Participação por Canal</h4>
                      <div className="relative w-48 h-48 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          {canais.reduce((acc, canal, i) => {
                            const prevPercent = acc.total;
                            acc.total += canal.percent;
                            acc.elements.push(
                              <circle
                                key={i}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={canal.cor}
                                strokeWidth="12"
                                strokeDasharray={`${canal.percent * 2.51} 251`}
                                strokeDashoffset={-prevPercent * 2.51}
                                className="transition-all duration-500"
                              />
                            );
                            return acc;
                          }, { total: 0, elements: [] as React.ReactNode[] }).elements}
                          <circle cx="50" cy="50" r="28" fill="#0a0f1c" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">1,380</div>
                            <div className="text-xs text-white/40">Leads</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Channel List */}
                    <div className="space-y-3">
                      {canais.map((canal, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ background: canal.cor }}
                              />
                              <span className="text-sm font-medium text-white">{canal.nome}</span>
                            </div>
                            <span className="text-sm text-white/60">{canal.leads} leads</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ background: canal.cor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${canal.percent}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                              />
                            </div>
                            <span className="text-xs font-medium" style={{ color: canal.cor }}>
                              {canal.percent}%
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Integration Status */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-white">Status das Integrações</h4>
                      <div className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        Todas ativas
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["WhatsApp API", "Instagram DM", "Facebook Ads", "Google Analytics", "CRM", "Email", "Webhook", "Zapier"].map((integration, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs text-white/60">{integration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "alertas" && (
                <motion.div
                  key="alertas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Central de Alertas</h3>
                    <p className="text-sm text-white/40">Notificações em tempo real</p>
                  </div>

                  <div className="space-y-3">
                    {alertas.map((alerta, i) => (
                      <motion.div
                        key={alerta.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-2xl border cursor-pointer hover:scale-[1.02] transition-transform ${
                          alerta.tipo === "success" 
                            ? "bg-emerald-500/10 border-emerald-500/30" 
                            : alerta.tipo === "warning" 
                              ? "bg-yellow-500/10 border-yellow-500/30"
                              : "bg-blue-500/10 border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            alerta.tipo === "success" 
                              ? "bg-emerald-500/20" 
                              : alerta.tipo === "warning" 
                                ? "bg-yellow-500/20"
                                : "bg-blue-500/20"
                          }`}>
                            {alerta.tipo === "success" ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            ) : alerta.tipo === "warning" ? (
                              <AlertCircle className="w-4 h-4 text-yellow-400" />
                            ) : (
                              <Zap className="w-4 h-4 text-blue-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white font-medium">{alerta.msg}</p>
                            <p className="text-xs text-white/40 mt-1">{alerta.time}</p>
                          </div>
                          <MoreHorizontal className="w-4 h-4 text-white/20" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Configure seus alertas</h4>
                        <p className="text-xs text-white/50 mb-3">
                          Receba notificações quando metas forem atingidas, picos de tráfego ou qualquer evento importante.
                        </p>
                        <button className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-medium hover:bg-violet-500/30 transition-colors">
                          Configurar Alertas
                        </button>
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
                <span className="text-xs text-white/40">Dashboard em tempo real</span>
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
