"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Layers, Sliders, Rocket, ChevronRight } from "lucide-react";
import { etapasProcesso } from "@/data/solucoes";

const iconesEtapa = [Search, Layers, Sliders, Rocket];

export function ProcessoTimeline() {
  const [etapaAtiva, setEtapaAtiva] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Linha conectora com gradiente */}
      <div className="hidden lg:block absolute top-[45px] left-[60px] right-[60px] h-[2px]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-violet-500/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
        {etapasProcesso.map((item, index) => {
          const Icon = iconesEtapa[index];
          const isActive = etapaAtiva === index;
          const isPast = etapaAtiva !== null && index < etapaAtiva;
          
          return (
            <motion.div
              key={item.etapa}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setEtapaAtiva(index)}
              onMouseLeave={() => setEtapaAtiva(null)}
            >
              {/* Step Number Circle */}
              <motion.div 
                className="relative z-10 w-[90px] h-[90px] mx-auto lg:mx-0 mb-5 rounded-3xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: isActive ? "rgba(6, 182, 212, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: isActive 
                    ? "2px solid rgba(6, 182, 212, 0.5)" 
                    : "1px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    opacity: isActive ? 1 : 0.6
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon 
                    className="w-7 h-7 transition-colors duration-300"
                    style={{ color: isActive ? "#06b6d4" : "rgba(255, 255, 255, 0.3)" }}
                  />
                </motion.div>

                {/* Step number badge */}
                <div 
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300"
                  style={{
                    background: isActive || isPast ? "#06b6d4" : "rgba(255, 255, 255, 0.1)",
                    color: isActive || isPast ? "#000" : "rgba(255, 255, 255, 0.5)"
                  }}
                >
                  {item.etapa}
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center lg:text-left space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <h4 
                    className="text-lg font-semibold transition-colors duration-300"
                    style={{ color: isActive ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                  >
                    {item.titulo}
                  </h4>
                  <motion.div
                    animate={{ x: isActive ? 5 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{ color: isActive ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.4)" }}
                >
                  {item.desc}
                </motion.p>

                {/* Active indicator bar */}
                <motion.div
                  className="h-0.5 rounded-full mt-4 lg:mt-6 origin-left"
                  style={{ background: "#06b6d4" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/60">
            Média de entrega: <span className="text-white font-medium">14 dias</span> para projetos padrão
          </span>
        </div>
      </motion.div>
    </div>
  );
}
