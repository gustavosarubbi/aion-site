"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, TrendingUp, Activity, AlertCircle, Database, ArrowRight, Sparkles, Play } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Solucao } from "@/data/solucoes";
import { usePexelsImage } from "@/hooks/usePexelsImage";
import { DashboardModal } from "@/components/modals/DashboardModal";

interface DashboardCardProps {
  solucao: Solucao;
  index: number;
}

// Dados simulados para o dashboard
const dashboardData = [
  { label: "Vendas", value: 45, color: "#10b981", icon: TrendingUp },
  { label: "Leads", value: 127, color: "#06b6d4", icon: Activity },
  { label: "Alertas", value: 3, color: "#f59e0b", icon: AlertCircle },
];

const chartBars = [
  { height: 40, delay: 0 },
  { height: 65, delay: 0.1 },
  { height: 45, delay: 0.2 },
  { height: 80, delay: 0.3 },
  { height: 55, delay: 0.4 },
  { height: 70, delay: 0.5 },
];

export function DashboardCard({ solucao, index }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, loading } = usePexelsImage("dashboard analytics data", 8);

  // Animação dos dados
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev + 1) % dashboardData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const IconComponent = solucao.icone;
  const currentData = dashboardData[dataIndex];
  const CurrentIcon = currentData.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { 
        setIsHovered(false); 
        setShowTech(false);
        setDataIndex(0);
      }}
      className="group relative h-full"
    >
      <MagicCard
        className="relative h-full overflow-hidden rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
        gradientSize={400}
        gradientColor={solucao.cor}
        gradientOpacity={isHovered ? 0.15 : 0.05}
        gradientFrom={solucao.cor}
        gradientTo="transparent"
      >
        <div className="flex flex-col h-full">
          {/* Preview de Dashboard Interativo */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0a0f1c] to-[#0d1320]">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              {!loading && imageUrl && (
                <Image
                  src={imageUrl}
                  alt={solucao.nome}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            
            {/* Grid lines */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
            />

            {/* Dashboard Preview */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[280px] space-y-3">
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-2">
                  {dashboardData.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className={`p-2.5 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                        dataIndex === i ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'
                      }`}
                      animate={{ scale: dataIndex === i ? 1.05 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className={`w-3.5 h-3.5 mb-1 ${dataIndex === i ? 'text-emerald-400' : 'text-white/40'}`} />
                      <div className={`text-sm font-bold ${dataIndex === i ? 'text-emerald-400' : 'text-white/70'}`}>
                        {item.value}
                      </div>
                      <div className="text-[8px] text-white/40">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart visualization */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] text-white/60">Analytics em tempo real</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {chartBars.map((bar, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/40 to-emerald-400/60"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: isHovered ? `${bar.height}%` : '20%',
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: bar.delay,
                          repeat: isHovered ? Infinity : 0,
                          repeatType: "reverse",
                          repeatDelay: 1
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Connection lines animation */}
                <motion.div 
                  className="flex items-center gap-2 text-[10px] text-emerald-400/70"
                  animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>3 APIs conectadas</span>
                  <Database className="w-3 h-3" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ 
                  background: `linear-gradient(135deg, ${solucao.gradientFrom}20, ${solucao.gradientTo}10)`,
                  border: `1px solid ${solucao.cor}40`
                }}
              >
                <IconComponent className="w-6 h-6" style={{ color: solucao.cor }} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                  Solução 0{index + 1}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {solucao.nome}
                </h3>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-3 mb-4 flex-1">
              <div>
                <span className="text-[10px] font-medium text-red-400/70 uppercase tracking-wider block mb-1">
                  Problema
                </span>
                <p className="text-sm text-white/50 leading-relaxed">
                  {solucao.problema}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-medium text-emerald-400/70 uppercase tracking-wider block mb-1">
                  Nossa Solução
                </span>
                <p className="text-sm text-white/70 leading-relaxed">
                  {solucao.arquitetura}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="relative h-8 mb-5">
              <AnimatePresence mode="wait">
                {!showTech ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowTech(true)}
                    className="absolute inset-0 flex items-center gap-1.5 text-[10px] text-white/40 hover:text-emerald-400 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ver tecnologias</span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 flex flex-wrap gap-2"
                  >
                    {solucao.tecnologias.map((tech, i) => {
                      const TechIcon = tech.icone;
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-300/80"
                        >
                          <TechIcon className="w-3 h-3" />
                          {tech.nome}
                        </motion.span>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

{/* CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full group/btn flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${solucao.cor}30 0%, ${solucao.cor}15 100%)`,
              border: `1px solid ${solucao.cor}40`
            }}
          >
            <span>Ver Demo Dashboard</span>
            <Play className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </MagicCard>

    {/* Modal */}
    <DashboardModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      solucaoNome={solucao.nome}
      corSolucao={solucao.cor}
    />
  </motion.div>
  );
}
