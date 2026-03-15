"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { 
  MousePointer, Eye,
  Zap, Play, Target,
  Flame
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Solucao } from "@/data/solucoes";
import { usePexelsImage } from "@/hooks/usePexelsImage";
import { AnalyticsModal } from "@/components/modals/AnalyticsModal";

interface AnalyticsCardProps {
  solucao: Solucao;
  index: number;
}

const generateHeatmapData = (seed: number) =>
  Array.from({ length: 20 }, (_, i) => {
    const base = (seed + 1) * 37 + i * 23;
    const intensity = 18 + (base % 78);
    const xOffset = 4 + ((seed + 3) * 19 + i * 17) % 72;

    return {
      intensity,
      delay: i * 0.05,
      xOffset,
    };
  });

export function AnalyticsCard({ solucao, index }: AnalyticsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, loading } = usePexelsImage("analytics heatmap data visualization", 8);
  const heatmapData = useMemo(() => generateHeatmapData(index), [index]);

  // Rotate metrics animation
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const IconComponent = solucao.icone;

  const metrics = [
    { icon: Eye, label: "Visualizações", value: "2.4k", change: "+12%", color: "#06b6d4" },
    { icon: MousePointer, label: "Cliques", value: "856", change: "+8%", color: "#8b5cf6" },
    { icon: Target, label: "Conversão", value: "3.2%", change: "+15%", color: "#f59e0b" },
    { icon: Flame, label: "Hot Zones", value: "5", change: "Identificadas", color: "#ef4444" },
  ];

  const ActiveMetricIcon = metrics[activeMetric].icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { 
          setIsHovered(false); 
          setShowTech(false);
          setActiveMetric(0);
        }}
        className="group relative h-full"
      >
        <MagicCard
          className="relative h-full overflow-hidden rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
          gradientSize={400}
          gradientColor={solucao.cor}
          gradientOpacity={isHovered ? 0.15 : 0.05}
          gradientFrom={solucao.cor}
          gradientTo="transparent"
        >
          <div className="flex flex-col h-full">
            {/* Heatmap Preview */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0a0f1c] to-[#0d1320]">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-25">
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
              
              {/* Heatmap Grid Simulation */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full max-w-[260px] space-y-3">
                  {/* Website Mockup */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-20 h-2 bg-white/20 rounded-full" />
                      <div className="flex-1" />
                      <div className="w-8 h-2 bg-white/10 rounded-full" />
                      <div className="w-8 h-2 bg-white/10 rounded-full" />
                    </div>
                    
                    {/* Heatmap Points */}
                    <div className="space-y-2">
                      {heatmapData.slice(0, 8).map((point, i) => (
                        <motion.div
                          key={i}
                          className="h-3 rounded-full relative overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <motion.div
                            className="absolute h-full rounded-full"
                            style={{
                              background: point.intensity > 70 
                                ? "rgba(239, 68, 68, 0.8)" 
                                : point.intensity > 40 
                                  ? "rgba(245, 158, 11, 0.6)" 
                                  : "rgba(6, 182, 212, 0.4)"
                            }}
                            initial={{ width: 0, x: `${point.xOffset}%` }}
                            animate={{ 
                              width: isHovered ? `${point.intensity}%` : "20%",
                              opacity: isHovered ? 1 : 0.5
                            }}
                            transition={{ duration: 0.5, delay: point.delay }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Active Metric */}
                  <motion.div
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10"
                    animate={{ 
                      borderColor: isHovered ? metrics[activeMetric].color : "rgba(255,255,255,0.1)"
                    }}
                  >
                    <ActiveMetricIcon 
                      className="w-4 h-4" 
                      style={{ color: metrics[activeMetric].color }}
                    />
                    <span className="text-xs text-white/60">{metrics[activeMetric].label}</span>
                    <span 
                      className="text-xs font-bold"
                      style={{ color: metrics[activeMetric].color }}
                    >
                      {metrics[activeMetric].value}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Demo badge */}
              <motion.div 
                className="absolute top-3 right-3 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span 
                  className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border backdrop-blur-sm"
                  style={{ 
                    background: `${solucao.cor}20`,
                    color: solucao.cor,
                    borderColor: `${solucao.cor}40`
                  }}
                >
                  Analytics Demo
                </span>
              </motion.div>
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
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
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
                      className="absolute inset-0 flex items-center gap-1.5 text-[10px] text-white/40 hover:text-orange-400 transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
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
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[9px] text-orange-300/80"
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
                <span>Ver Analytics em Ação</span>
                <Play className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </MagicCard>

        {/* Modal */}
        <AnalyticsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          solucaoNome={solucao.nome}
          corSolucao={solucao.cor}
        />
      </motion.div>
    </>
  );
}
