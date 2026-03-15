"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { CreditCard, Zap, Play } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Solucao } from "@/data/solucoes";
import { usePexelsImage } from "@/hooks/usePexelsImage";
import { CheckoutModal } from "@/components/modals/CheckoutModal";

interface CheckoutCardInlineProps {
  solucao: Solucao;
  index: number;
}

export function CheckoutCardInline({ solucao, index }: CheckoutCardInlineProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, loading } = usePexelsImage("payment credit card terminal", 8);

  const IconComponent = solucao.icone;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            {/* Card Preview */}
            <div className="relative h-44 overflow-hidden">
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

              {/* Floating Card Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { y: [0, -8, 0], rotateY: [0, 5, -5, 0] } : { y: 0, rotateY: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-28 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${solucao.gradientFrom}60, ${solucao.gradientTo}30)`,
                    border: `1px solid ${solucao.cor}50`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="p-4 h-full flex flex-col justify-between relative">
                    <div className="flex justify-between items-start">
                      <CreditCard className="w-6 h-6 text-white/80" />
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-1 h-1 rounded-full bg-white/60" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm text-white/80 tracking-widest">•••• 4242</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-white/50 uppercase">Validade</span>
                        <span className="text-xs text-white/80">12/25</span>
                      </div>
                    </div>
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </div>
                </motion.div>
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
                  Demo Interativa
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${solucao.gradientFrom}20, ${solucao.gradientTo}10)`,
                    border: `1px solid ${solucao.cor}40`
                  }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: solucao.cor }} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">
                    Solução 0{index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {solucao.nome}
                  </h3>
                </div>
              </div>

              {/* Problem */}
              <p className="text-sm text-white/60 leading-relaxed mb-3 flex-1 line-clamp-2">
                {solucao.problema}
              </p>

              {/* Architecture */}
              <div className="mb-4">
                <span className="text-[9px] font-medium text-emerald-400/70 uppercase tracking-wider block mb-1">
                  Arquitetura
                </span>
                <p className="text-xs text-white/50 leading-snug">
                  {solucao.arquitetura}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {solucao.tecnologias.slice(0, 3).map((tech, i) => {
                  const TechIcon = tech.icone;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] text-white/50"
                    >
                      <TechIcon className="w-2.5 h-2.5" />
                      {tech.nome}
                    </span>
                  );
                })}
                {solucao.tecnologias.length > 3 && (
                  <span className="text-[8px] text-white/30 px-1">+{solucao.tecnologias.length - 3}</span>
                )}
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl text-white text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${solucao.cor}25, ${solucao.cor}10)`,
                  border: `1px solid ${solucao.cor}40`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-3.5 h-3.5" />
                Experimentar Checkout
              </motion.button>
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
