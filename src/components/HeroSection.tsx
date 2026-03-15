"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Code, ChatCircleDots, Gear, InstagramLogo, EnvelopeSimple, WhatsappLogo, ArrowRight } from "@phosphor-icons/react";
import HeroHeadline from "@/components/HeroHeadline";
import ActionNode from "@/components/ActionNode";

const Hero3DWrapper = dynamic(() => import("@/components/Hero3DWrapper"), {
  loading: () => <div className="w-full h-full" />,
});

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const serviceItems = [
  { icon: Code, label: "SITES", color: "text-[#379cfd]", halo: "bg-[#379cfd]/35", divider: "via-[#379cfd]/70" },
  { icon: ChatCircleDots, label: "CONVERSÃO", color: "text-[#379cfd]", halo: "bg-[#379cfd]/35", divider: "via-[#379cfd]/70" },
  { icon: Gear, label: "AUTOMAÇÃO", color: "text-[#379cfd]", halo: "bg-[#379cfd]/35", divider: "via-[#379cfd]/75" },
] as const;

function ServiceBar() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-x-3 sm:gap-x-5 max-w-full">
      {serviceItems.map(({ icon: Icon, label, color, halo }, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2 sm:gap-4 py-2.5 sm:py-4 cursor-default px-2 sm:px-4 min-[1280px]:first:pl-0 last:pr-0">
            <span className="relative inline-flex h-7 w-7 min-[360px]:h-8 min-[360px]:w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full">
              <span className={`absolute inset-0 rounded-full ${halo} blur-sm opacity-45`} />
              <Icon size={18} weight="duotone" className={`${color} sm:hidden`} />
              <Icon size={20} weight="duotone" className={`${color} hidden sm:block`} />
            </span>
            <span style={montserrat} className={`text-[11px] min-[360px]:text-[12px] sm:text-[14px] min-[1280px]:text-[16px] font-extrabold tracking-[0.05em] sm:tracking-[0.1em] min-[1280px]:tracking-[0.11em] ${color} uppercase whitespace-nowrap`}>
              {label}
            </span>
          </div>
          {i !== serviceItems.length - 1 && (
            <div className="hidden sm:block h-5 sm:h-6 w-px bg-white/20 self-center mx-2 sm:mx-4" />
          )}
        </div>
      ))}
    </div>
  );
}

function HeroSubtitle() {
  return (
    <div className="flex flex-col">
      <p style={montserrat} className="text-white/80 text-[15px] sm:text-[16px] md:text-[17px] min-[1280px]:text-[18px] leading-[1.6] md:leading-[1.65] font-normal max-w-[48ch] md:max-w-[55ch] lg:max-w-[65ch] tracking-tight">
        Potencializamos sua escala digital com ecossistemas de <span className="text-[#379cfd] font-medium">alta performance</span>: <span className="text-[#379cfd] font-medium">Sites</span> magnéticos, <span className="text-[#379cfd] font-medium">robôs</span> de conversão e <span className="text-[#379cfd] font-medium">automações</span> voltadas para o lucro.
      </p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="inicio" className="relative w-full overflow-x-clip overflow-y-visible min-h-[90dvh] min-[1280px]:min-h-[min(90dvh,850px)]">
      {/* Animated Grid Background - Movimento diagonal suave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #379cfd 1px, transparent 1px),
              linear-gradient(to bottom, #379cfd 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
      
      {/* Grid secundário estático */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #379cfd 1px, transparent 1px),
          linear-gradient(to bottom, #379cfd 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }} />
      
      <div className="absolute inset-x-0 top-[8%] h-[75%] bg-[radial-gradient(ellipse_at_center,rgba(55,156,253,0.05)_0%,rgba(55,156,253,0.02)_50%,rgba(0,0,0,0)_80%)] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full min-h-full min-[1280px]:h-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        
        {/* MOBILE LAYOUT (< 1280px) */}
        <div className="min-[1280px]:hidden flex flex-col min-h-screen pt-[calc(var(--header-height,76px)+24px)] pb-6">
          {/* Text block: ServiceBar + Headline + Subtitle */}
          <div className="relative flex flex-col items-start justify-center gap-4 md:gap-4 px-4 sm:px-4 pb-0.5 mx-auto w-full max-w-5xl">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#379cfd]/6 via-[#379cfd]/3 to-[#379cfd]/6 blur-[50px] -z-10 rounded-full opacity-30 pointer-events-none" />
            
            <motion.div className="flex justify-start w-full mb-2 md:mb-2" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
              <ServiceBar />
            </motion.div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-6 md:gap-6 lg:gap-10 mx-auto w-full md:px-0">
              <motion.div className="flex flex-col items-start md:items-start select-none md:flex-shrink-0" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}>
                <HeroHeadline tabletSide="left" />
              </motion.div>
              
              <div className="hidden md:block w-[1.5px] h-[120px] md:h-[130px] lg:h-[140px] bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
              
              <motion.div className="px-2 md:px-0 text-left flex flex-col justify-center flex-1 md:max-w-[580px]" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}>
                <HeroSubtitle />
              </motion.div>
            </div>
          </div>

          {/* 3D cards */}
          <motion.div initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }} className="relative overflow-visible pointer-events-none flex-1 min-h-[400px]" style={{ width: "calc(100% + 2rem)", marginLeft: "-1rem" }}>
            <Hero3DWrapper />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
          </motion.div>

          {/* Buttons + social - ALINHADOS À ESQUERDA */}
          <motion.div className="flex flex-col items-start gap-4 sm:gap-6 w-full pointer-events-auto pb-6 pt-3 px-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}>
            <div className="flex items-center gap-3">
              {[
                { Icon: InstagramLogo, href: "https://instagram.com", baseColor: "text-cyan-300", borderColor: "border-cyan-400/30", glowColor: "shadow-[0_0_10px_rgba(34,211,238,0.16)]", hoverGlow: "hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]" },
                { Icon: EnvelopeSimple, href: "mailto:contato@qodec.digital", baseColor: "text-sky-300", borderColor: "border-sky-400/30", glowColor: "shadow-[0_0_10px_rgba(56,189,248,0.16)]", hoverGlow: "hover:shadow-[0_0_16px_rgba(56,189,248,0.28)]" },
                { Icon: WhatsappLogo, href: "https://wa.me/message/SEULINKAQUI", baseColor: "text-blue-300", borderColor: "border-blue-400/30", glowColor: "shadow-[0_0_10px_rgba(96,165,250,0.16)]", hoverGlow: "hover:shadow-[0_0_16px_rgba(96,165,250,0.28)]" }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.03] border ${social.borderColor} transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}>
                  <social.Icon size={20} weight="duotone" />
                </a>
              ))}
            </div>
            
            <div className="flex w-full flex-col sm:flex-row sm:items-start justify-start gap-3 sm:gap-4">
              <ActionNode compact />
              <a href="#servicos" className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[48px] lg:h-[52px] px-8 lg:px-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[13px] font-bold text-white transition-all duration-500 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] overflow-hidden" style={montserrat}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2 tracking-[0.1em] uppercase">
                  VER SOLUÇÕES
                  <ArrowRight size={16} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1 text-[#379cfd]" />
                </span>
              </a>
            </div>
            
            <p style={montserrat} className="text-[10.5px] uppercase tracking-[0.08em] text-[#379cfd]/80">
              Design de elite e tecnologia estratégica.
            </p>
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT (>= 1280px) */}
        <div className="hidden min-[1280px]:grid min-h-screen min-[1280px]:items-start min-[1280px]:gap-x-8 min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(580px,56%)] lg:pl-32 min-[1280px]:pl-[80px] lg:pl-[100px] xl:pl-[120px] 2xl:pl-[140px]" style={{ paddingTop: "calc(var(--header-height, 88px) - 32px)" }}>
          <div className="relative h-full min-h-[800px] flex flex-col items-start text-left justify-start pt-[7vh] pb-12 min-[1280px]:pb-20 gap-3 lg:gap-4 transform-gpu min-[1280px]:pt-[9vh] min-[1280px]:translate-y-6 min-[1280px]:gap-7 min-[1280px]:-translate-x-1">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#379cfd]/6 via-[#379cfd]/3 to-[#379cfd]/6 blur-[50px] -z-10 rounded-full opacity-30 pointer-events-none" />
            
            <motion.div className="relative z-30" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}>
              <ServiceBar />
            </motion.div>
            
            <motion.div className="relative z-30 w-full" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}>
              <HeroHeadline />
            </motion.div>
            
            <motion.div className="relative z-30 w-full max-w-[48ch]" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}>
              <HeroSubtitle />
            </motion.div>
            
            {/* CTAs ALINHADOS À ESQUERDA */}
            <motion.div className="relative z-10 flex flex-col items-start gap-5 w-full pointer-events-auto min-[1280px]:mt-[16px]" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.78 }}>
              <div className="flex items-center gap-3">
                {[
                  { Icon: InstagramLogo, href: "https://instagram.com", baseColor: "text-cyan-300", borderColor: "border-cyan-400/30", glowColor: "shadow-[0_0_10px_rgba(34,211,238,0.16)]", hoverGlow: "hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]" },
                  { Icon: EnvelopeSimple, href: "mailto:contato@aion.digital", baseColor: "text-sky-300", borderColor: "border-sky-400/30", glowColor: "shadow-[0_0_10px_rgba(56,189,248,0.16)]", hoverGlow: "hover:shadow-[0_0_16px_rgba(56,189,248,0.28)]" },
                  { Icon: WhatsappLogo, href: "https://wa.me/message/SEULINKAQUI", baseColor: "text-blue-300", borderColor: "border-blue-400/30", glowColor: "shadow-[0_0_10px_rgba(96,165,250,0.16)]", hoverGlow: "hover:shadow-[0_0_16px_rgba(96,165,250,0.28)]" }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.03] border ${social.borderColor} transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}>
                    <social.Icon size={20} weight="duotone" />
                  </a>
                ))}
              </div>
              
              <div className="flex items-start gap-4 pointer-events-auto">
                <ActionNode />
                <a href="#servicos" className="group relative inline-flex items-center justify-center gap-3 h-[52px] lg:h-[56px] min-[1280px]:h-[60px] px-8 lg:px-10 min-[1280px]:px-12 rounded-full bg-[#379cfd]/10 backdrop-blur-xl border border-[#379cfd]/20 text-[12px] lg:text-[13px] min-[1280px]:text-[14px] font-semibold text-white transition-all duration-500 hover:bg-[#379cfd]/15 hover:border-[#379cfd]/35 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#379cfd]/50 pointer-events-auto shadow-[0_0_14px_rgba(55,156,253,0.06)] hover:shadow-[0_0_22px_rgba(55,156,253,0.12)] overflow-hidden" style={montserrat}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />
                  <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.14em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.1)] group-hover:text-white transition-all duration-500">
                    Ver soluções
                    <ArrowRight size={16} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1 text-[#379cfd] group-hover:text-white" />
                  </span>
                </a>
              </div>
              
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-[2px] bg-[#379cfd] opacity-80" />
                <p style={montserrat} className="text-[10px] lg:text-[10.5px] min-[1280px]:text-[12px] uppercase tracking-[0.1em] text-[#379cfd]/80">
                  Design de elite e tecnologia estratégica.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D scene */}
          <motion.div initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="relative z-20 self-stretch w-full overflow-visible pointer-events-none min-[1280px]:pointer-events-auto min-h-[800px]">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[136%] max-w-[100vw] min-h-[800px] overflow-visible">
              <Hero3DWrapper />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 lg:h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
