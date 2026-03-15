"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { CreditCard, Check, ArrowRight, Zap, Shield, Clock, Sparkles } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Solucao } from "@/data/solucoes";
import { usePexelsImage } from "@/hooks/usePexelsImage";
import { CheckoutModal } from "@/components/modals/CheckoutModal";

interface CheckoutCardProps {
  solucao: Solucao;
  index: number;
}

export function CheckoutCard({ solucao, index }: CheckoutCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, loading } = usePexelsImage("credit card payment terminal", 8);

  const IconComponent = solucao.icone;

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
        }}
        className="group relative h-full"
      >
        <MagicCard
          className="relative h-full overflow-hidden rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
          gradientSize={400}
          gradientColor={solucao.cor}
          gradientOpacity={isHovered ? 0.15 : 0.05}
          gradientFrom={solucao.cor}
          gradientTo="transparent"
        >
          <div className="flex flex-col h-full">
            {/* Preview de Checkout Interativo */}
            <div className="relative h-56 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                {!loading && imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={solucao.nome}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent" />
              </div>

              {/* Animated checkout preview */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <motion.div 
                  className="w-full max-w-[240px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl"
                  animate={isHovered ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Card visual */}
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${solucao.gradientFrom}40, ${solucao.gradientTo}20)`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute inset-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <CreditCard className="w-6 h-6 text-white/80" />
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-white/60"
                              animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/60 mb-0.5">Total</div>
                        <div className="text-lg font-bold text-white">R$ 997,00</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress steps */}
                  <div className="flex items-center gap-2">
                    {['Dados', 'Pagamento', 'Confirmação'].map((step, i) => (
                      <div key={step} className="flex-1">
                        <motion.div 
                          className="h-1 rounded-full bg-white/10 overflow-hidden"
                          initial={false}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: solucao.cor }}
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? `${(i + 1) * 33}%` : '0%' }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                          />
                        </motion.div>
                        <div className="text-[8px] text-white/40 mt-1 text-center">{step}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Badge Demo */}
              <motion.div 
                className="absolute top-4 right-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span 
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md"
                  style={{ 
                    background: `${solucao.cor}20`,
                    color: solucao.cor,
                    borderColor: `${solucao.cor}40`
                  }}
                >
                  Demo Interativa
                </span>
              </motion.div>

              {/* Hover metrics */}
              <motion.div 
                className="absolute bottom-4 left-4 flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/20 backdrop-blur-md border border-violet-500/30">
                  <Shield className="w-3 h-3 text-violet-400" />
                  <span className="text-[9px] text-violet-300">SSL</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span className="text-[9px] text-emerald-300">&lt;2s</span>
                </div>
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
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors">
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
                      className="absolute inset-0 flex items-center gap-1.5 text-[10px] text-white/40 hover:text-violet-400 transition-colors"
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
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[9px] text-violet-300/80"
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

              {/* CTA Principal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full group/btn flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${solucao.cor}30 0%, ${solucao.cor}15 100%)`,
                  border: `1px solid ${solucao.cor}40`
                }}
              >
                <span>Experimentar Checkout</span>
                <Zap className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </MagicCard>
      </motion.div>

      {/* Modal */}
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        solucaoNome={solucao.nome}
        corSolucao={solucao.cor}
      />
    </>
  );
}
