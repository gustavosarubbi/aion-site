"use client";

import { motion } from "framer-motion";
import { MagnifyingGlass, Code, RocketLaunch, ArrowRight } from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const steps = [
  {
    icon: MagnifyingGlass,
    step: "01",
    title: "Diagnóstico Estratégico",
    subtitle: "Analisamos seu cenário",
    description: "Entendemos seu público, concorrência e gargalos atuais. Você recebe um mapa claro do que precisa ser construído para multiplicar resultados.",
    time: "1ª Semana",
    color: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Code,
    step: "02",
    title: "Construção Completa",
    subtitle: "Criamos seu ecossistema",
    description: "Site premium + robôs de atendimento + automações. Tudo integrado e testado antes de entrar no ar. Cada elemento pensado para converter.",
    time: "2ª a 4ª Semana",
    color: "from-cyan-400 to-blue-500",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: RocketLaunch,
    step: "03",
    title: "Entrega e Escala",
    subtitle: "Você recebe tudo pronto",
    description: "Treinamento rápido, acesso total e acompanhamento contínuo. Seu negócio começa a operar no automático e você vê o resultado.",
    time: "5ª Semana em diante",
    color: "from-blue-600 to-cyan-500",
    borderColor: "border-blue-600/30",
    bgColor: "bg-blue-600/10",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative z-10 w-full py-20 md:py-32 overflow-hidden bg-[#000208]">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] sm:text-[11px] font-black tracking-[0.35em] text-[#379cfd] uppercase mb-5"
          >
            Processo Simplificado
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={montserrat}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[0.95] mb-6"
          >
            De ideia à operação{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] to-[#5db8ff]">
              em 3 passos
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed"
          >
            Sem complexidade. Sem demora. Você acompanha cada etapa e recebe tudo pronto para começar a vender mais.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-8 h-full flex flex-col transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.1]">
                {/* Step Number Badge */}
                <div className={`absolute -top-3 left-8 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-[10px] font-black tracking-wider`}>
                  PASSO {item.step}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-6 mt-2 group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={28} weight="duotone" className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <span className="text-[#379cfd] text-xs font-bold tracking-[0.15em] uppercase mb-2">
                    {item.subtitle}
                  </span>
                  
                  <h3 style={montserrat} className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>

                  {/* Timeline Badge */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#379cfd]" />
                    <span className="text-white/40 text-xs font-medium tracking-wide">
                      {item.time}
                    </span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={20} className="text-[#379cfd]" />
                </div>
              </div>

              {/* Connection Line (hidden on mobile, visible on lg) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 z-0">
                  <div className="h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#379cfd]/50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm mb-6">
            Pronto para começar seu projeto?
          </p>
          <a
            href="https://wa.me/message/SEULINKAQUI"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#379cfd] to-[#5db8ff] rounded-2xl text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Quero Meu Orçamento
            <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
