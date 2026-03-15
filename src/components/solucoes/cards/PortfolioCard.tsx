"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, ChevronLeft, ChevronRight, ExternalLink, Eye, MousePointer, ArrowRight, Sparkles, Play } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Solucao } from "@/data/solucoes";
import { usePexelsImage } from "@/hooks/usePexelsImage";
import { PortfolioModal } from "@/components/modals/PortfolioModal";

interface PortfolioCardProps {
  solucao: Solucao;
  index: number;
}

// Projetos de exemplo para o carrossel
const projetos = [
  { id: 1, nome: "Projeto Alpha", categoria: "E-commerce", views: "2.4k" },
  { id: 2, nome: "Projeto Beta", categoria: "SaaS", views: "1.8k" },
  { id: 3, nome: "Projeto Gamma", categoria: "Landing Page", views: "3.1k" },
];

export function PortfolioCard({ solucao, index }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [projetoAtivo, setProjetoAtivo] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, loading } = usePexelsImage("creative design portfolio website", 8);

  // Auto-play do carrossel
  useEffect(() => {
    if (!isHovered || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setProjetoAtivo((prev) => (prev + 1) % projetos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, isAutoPlaying]);

  const proximoProjeto = () => {
    setIsAutoPlaying(false);
    setProjetoAtivo((prev) => (prev + 1) % projetos.length);
  };

  const projetoAnterior = () => {
    setIsAutoPlaying(false);
    setProjetoAtivo((prev) => (prev - 1 + projetos.length) % projetos.length);
  };

  const IconComponent = solucao.icone;

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
        setIsAutoPlaying(true);
      }}
      className="group relative h-full"
    >
      <MagicCard
        className="relative h-full overflow-hidden rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 hover:border-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/10"
        gradientSize={400}
        gradientColor={solucao.cor}
        gradientOpacity={isHovered ? 0.15 : 0.05}
        gradientFrom={solucao.cor}
        gradientTo="transparent"
      >
        <div className="flex flex-col h-full">
          {/* Preview de Portfolio com Carrossel */}
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
            
            {/* Decorative gradient */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${solucao.gradientFrom}20, transparent 50%)`
              }}
            />

            {/* Portfolio Carousel */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[260px]">
                {/* Project cards stack */}
                <div className="relative h-32">
                  <AnimatePresence mode="popLayout">
                    {projetos.map((projeto, i) => {
                      const isActive = i === projetoAtivo;
                      const isPrev = i === (projetoAtivo - 1 + projetos.length) % projetos.length;
                      const isNext = i === (projetoAtivo + 1) % projetos.length;
                      
                      if (!isActive && !isPrev && !isNext) return null;
                      
                      return (
                        <motion.div
                          key={projeto.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8, x: 50 }}
                          animate={{ 
                            opacity: isActive ? 1 : 0.5,
                            scale: isActive ? 1 : 0.9,
                            x: isActive ? 0 : isPrev ? -30 : 30,
                            zIndex: isActive ? 10 : 1
                          }}
                          exit={{ opacity: 0, scale: 0.8, x: -50 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                          className="absolute inset-0 rounded-xl overflow-hidden border border-white/10"
                          style={{
                            background: isActive 
                              ? `linear-gradient(135deg, ${solucao.gradientFrom}30, ${solucao.gradientTo}10)` 
                              : 'rgba(255,255,255,0.05)'
                          }}
                        >
                          <div className="p-4 h-full flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: solucao.cor }}
                                />
                                <span className="text-[10px] text-white/60 uppercase tracking-wider">
                                  {projeto.categoria}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white">{projeto.nome}</h4>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                                <Eye className="w-3 h-3" />
                                <span>{projeto.views}</span>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3 text-white/70" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1.5">
                    {projetos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setProjetoAtivo(i);
                        }}
                        className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                          i === projetoAtivo ? 'w-6' : 'w-1.5 bg-white/20'
                        }`}
                        style={{ background: i === projetoAtivo ? solucao.cor : undefined }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={projetoAnterior}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-white/60" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={proximoProjeto}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-white/60" />
                    </motion.button>
                  </div>
                </div>

                {/* Interaction hint */}
                <motion.div 
                  className="flex items-center justify-center gap-2 mt-3 text-[10px] text-white/30"
                  animate={{ opacity: isHovered ? 1 : 0.5 }}
                >
                  <MousePointer className="w-3 h-3" />
                  <span>Clique para explorar</span>
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
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-pink-400 transition-colors">
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
                    className="absolute inset-0 flex items-center gap-1.5 text-[10px] text-white/40 hover:text-pink-400 transition-colors"
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
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[9px] text-pink-300/80"
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
            <span>Ver Portfólio Completo</span>
            <Play className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </MagicCard>

    {/* Modal */}
    <PortfolioModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      solucaoNome={solucao.nome}
      corSolucao={solucao.cor}
    />
  </motion.div>
  );
}
