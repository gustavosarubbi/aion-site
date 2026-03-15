"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Users, Bot, Zap, ArrowRight, Sparkles, Play } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Solucao } from "@/data/solucoes";
import { usePexelsImage } from "@/hooks/usePexelsImage";
import { CapturaModal } from "@/components/modals/CapturaModal";

interface CapturaCardProps {
  solucao: Solucao;
  index: number;
}

// Simulação de chat ao vivo
const chatMessages = [
  { id: 1, type: "user", text: "Quero saber mais sobre o serviço", delay: 0 },
  { id: 2, type: "bot", text: "Claro! Qual seu maior desafio hoje?", delay: 1.5 },
  { id: 3, type: "user", text: "Tenho muitos leads mas não consigo responder todos", delay: 3 },
  { id: 4, type: "bot", text: "Perfeito! Nossa IA pode automatizar 80% desses atendimentos", delay: 4.5 },
];

export function CapturaCard({ solucao, index }: CapturaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [activeMessage, setActiveMessage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, loading } = usePexelsImage("chatbot ai conversation", 8);

  // Animação do chat
  useEffect(() => {
    if (!isHovered) {
      setActiveMessage(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % chatMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

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
        setActiveMessage(0);
      }}
      className="group relative h-full"
    >
      <MagicCard
        className="relative h-full overflow-hidden rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
        gradientSize={400}
        gradientColor={solucao.cor}
        gradientOpacity={isHovered ? 0.15 : 0.05}
        gradientFrom={solucao.cor}
        gradientTo="transparent"
      >
        <div className="flex flex-col h-full">
          {/* Preview de Chat Interativo */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0a0f1c] to-[#0d1320]">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-30">
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
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Chat Simulation */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[280px] space-y-3">
                <AnimatePresence mode="wait">
                  {chatMessages.slice(0, activeMessage + 1).map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          msg.type === 'user' 
                            ? 'bg-cyan-500/20 text-cyan-100 rounded-br-md border border-cyan-500/30' 
                            : 'bg-white/5 text-white/80 rounded-bl-md border border-white/10'
                        }`}
                      >
                        {msg.type === 'bot' && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <Bot className="w-3 h-3 text-cyan-400" />
                            <span className="text-[9px] text-cyan-400/70 uppercase tracking-wider">IA</span>
                          </div>
                        )}
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isHovered && activeMessage < chatMessages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/5 border border-white/10">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Metrics overlay */}
            <motion.div 
              className="absolute bottom-4 left-4 right-4 flex justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-white/70">+127 leads hoje</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-white/70">80% auto</span>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Header com ícone */}
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
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {solucao.nome}
                </h3>
              </div>
            </div>

            {/* Problemas & Solução */}
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
                    className="absolute inset-0 flex items-center gap-1.5 text-[10px] text-white/40 hover:text-cyan-400 transition-colors"
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
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] text-cyan-300/80"
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
            <span>Experimentar Demo</span>
            <Play className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </MagicCard>

    {/* Modal */}
    <CapturaModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      solucaoNome={solucao.nome}
      corSolucao={solucao.cor}
    />
  </motion.div>
  );
}
