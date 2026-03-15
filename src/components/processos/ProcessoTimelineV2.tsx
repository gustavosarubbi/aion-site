"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Search, Layers, Sliders, Rocket, ChevronRight, Clock,
  CheckCircle2, Circle, ArrowRight, Zap, Target, Sparkles
} from "lucide-react";
import { etapasProcesso } from "@/data/solucoes";

const iconesEtapa = [Search, Layers, Sliders, Rocket];
const coresEtapa = ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981"];

export function ProcessoTimelineV2() {
  const [etapaAtiva, setEtapaAtiva] = useState<number | null>(null);
  const [etapaCompleta, setEtapaCompleta] = useState(2); // Simula progresso até etapa 2

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Timeline Container */}
      <div className="relative">
        {/* Progress Line Background */}
        <div className="absolute top-[40px] left-[60px] right-[60px] h-1 bg-white/5 rounded-full hidden lg:block" />
        
        {/* Active Progress Line */}
        <motion.div 
          className="absolute top-[40px] left-[60px] h-1 rounded-full hidden lg:block"
          style={{
            background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #10b981)"
          }}
          initial={{ width: "0%", opacity: 0.3 }}
          whileInView={{ 
            width: `${(etapaCompleta / 4) * 100}%`,
            opacity: 1
          }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
          {etapasProcesso.map((item, index) => {
            const Icon = iconesEtapa[index];
            const cor = coresEtapa[index];
            const isActive = etapaAtiva === index;
            const isCompleted = index < etapaCompleta;
            const isCurrent = index === etapaCompleta;
            
            return (
              <motion.div
                key={item.etapa}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative group"
                onMouseEnter={() => setEtapaAtiva(index)}
                onMouseLeave={() => setEtapaAtiva(null)}
              >
                {/* Step Circle */}
                <motion.div 
                  className="relative z-10 mb-5 flex justify-center lg:justify-start"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer"
                    style={{
                      background: isActive || isCurrent 
                        ? `linear-gradient(135deg, ${cor}20, ${cor}05)` 
                        : "rgba(255, 255, 255, 0.03)",
                      border: isActive || isCurrent 
                        ? `2px solid ${cor}60` 
                        : isCompleted 
                          ? `1px solid ${cor}40`
                          : "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                    animate={{
                      boxShadow: isActive 
                        ? `0 0 30px ${cor}30`
                        : "0 0 0px transparent"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.15 : 1,
                        rotate: isActive ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon 
                        className="w-7 h-7 transition-colors duration-300"
                        style={{ 
                          color: isActive || isCurrent || isCompleted ? cor : "rgba(255, 255, 255, 0.3)" 
                        }}
                      />
                    </motion.div>

                    {/* Completed checkmark */}
                    <AnimatePresence>
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: cor }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Current indicator pulse */}
                    <AnimatePresence>
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ border: `2px solid ${cor}` }}
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Step number */}
                    <div 
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        background: isActive || isCurrent || isCompleted ? cor : "rgba(255, 255, 255, 0.1)",
                        color: isActive || isCurrent || isCompleted ? "#000" : "rgba(255, 255, 255, 0.5)"
                      }}
                    >
                      {item.etapa}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="text-center lg:text-left space-y-2">
                  {/* Title */}
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <motion.h4 
                      className="text-lg font-bold transition-colors duration-300"
                      style={{ color: isActive || isCurrent ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                    >
                      {item.titulo}
                    </motion.h4>
                    
                    {/* Arrow on hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: cor }} />
                    </motion.div>
                  </div>
                  
                  {/* Description */}
                  <motion.p 
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ 
                      color: isActive ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)" 
                    }}
                  >
                    {item.desc}
                  </motion.p>

                  {/* Detail expansion on hover */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-3 overflow-hidden"
                      >
                        <div 
                          className="p-3 rounded-xl text-xs leading-relaxed"
                          style={{ 
                            background: `${cor}10`,
                            border: `1px solid ${cor}20`,
                            color: "rgba(255, 255, 255, 0.7)"
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5" style={{ color: cor }}>
                            <Zap className="w-3 h-3" />
                            <span className="font-medium">O que entregamos:</span>
                          </div>
                          {index === 0 && "Documento completo com mapeamento de dores, oportunidades e arquitetura recomendada."}
                          {index === 1 && "Estrutura técnica definida com tecnologias, integrações e fluxos de dados."}
                          {index === 2 && "Adaptações específicas ao seu negócio, branding e necessidades únicas."}
                          {index === 3 && "Sistema em produção, testado, documentado e com acompanhamento de 30 dias."}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Timeline connector dot */}
                  <motion.div
                    className="h-1 rounded-full mt-4 origin-left lg:block hidden"
                    style={{ background: cor }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : isCompleted ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16"
      >
        <div className="relative p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08]">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-violet-500/5 rounded-3xl" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Status */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Status do Projeto</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Em Personalização
                </p>
              </div>
            </div>

            {/* Center: Progress */}
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Progresso</span>
                  <span className="text-cyan-400 font-medium">50%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Time */}
            <div className="flex items-center justify-end gap-4">
              <div className="text-right">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Tempo Estimado</p>
                <div className="flex items-center justify-end gap-2">
                  <Clock className="w-4 h-4 text-violet-400" />
                  <span className="text-white font-medium">7 dias restantes</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="relative grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
            {[
              { label: "Discovery", status: "completed", icon: CheckCircle2 },
              { label: "Arquitetura", status: "completed", icon: CheckCircle2 },
              { label: "Personalização", status: "current", icon: Circle },
              { label: "Entrega", status: "pending", icon: Circle },
            ].map((step, i) => {
              const StepIcon = step.icon;
              const isDone = step.status === "completed";
              const isCurrent = step.status === "current";
              
              return (
                <motion.div 
                  key={i}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isDone 
                        ? "bg-emerald-500/20 border border-emerald-500/40" 
                        : isCurrent 
                          ? "bg-violet-500/20 border border-violet-500/40 animate-pulse"
                          : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <StepIcon 
                      className={`w-5 h-5 ${
                        isDone ? "text-emerald-400" : isCurrent ? "text-violet-400" : "text-white/30"
                      }`} 
                    />
                  </div>
                  <span 
                    className={`text-[10px] uppercase tracking-wider ${
                      isDone || isCurrent ? "text-white/70" : "text-white/30"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
