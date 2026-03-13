"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, InstagramLogo, EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { FlipWords } from "@/components/ui/flip-words";
import ServiceCards from "@/components/ServiceCards";
import ActionNode from "@/components/ActionNode";

const Hero3DWrapper = dynamic(() => import("@/components/Hero3DWrapper"), {
  loading: () => <div className="w-full h-[240px] sm:h-[290px] md:h-[340px] lg:h-[560px]" />,
});

const words = ["SITES", "ROBÔS DE IA", "AUTOMAÇÃO"];
const outcomes = ["CLIENTES", "ATENDIMENTO", "ESCALA"];

const socialLinks = [
  {
    Icon: InstagramLogo,
    name: "Instagram",
    href: "https://instagram.com",
    baseColor: "text-[#60a5fa]",
    borderColor: "border-[#60a5fa]/60",
    glowColor: "shadow-[0_0_0_1px_rgba(96,165,250,0.3),0_4px_20px_rgba(96,165,250,0.3)]",
    hoverGlow: "hover:shadow-[0_0_0_1px_rgba(96,165,250,0.5),0_6px_30px_rgba(96,165,250,0.5)]",
    hoverBg: "hover:bg-[#60a5fa]/15",
  },
  {
    Icon: EnvelopeSimple,
    name: "E-mail",
    href: "mailto:contato@qodec.digital",
    baseColor: "text-[#38bdf8]",
    borderColor: "border-[#38bdf8]/60",
    glowColor: "shadow-[0_0_0_1px_rgba(56,189,248,0.3),0_4px_20px_rgba(56,189,248,0.3)]",
    hoverGlow: "hover:shadow-[0_0_0_1px_rgba(56,189,248,0.5),0_6px_30px_rgba(56,189,248,0.5)]",
    hoverBg: "hover:bg-[#38bdf8]/15",
  },
  {
    Icon: WhatsappLogo,
    name: "WhatsApp",
    href: "https://wa.me/message/SEULINKAQUI",
    baseColor: "text-[#22d3ee]",
    borderColor: "border-[#22d3ee]/60",
    glowColor: "shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_4px_20px_rgba(34,211,238,0.3)]",
    hoverGlow: "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_6px_30px_rgba(34,211,238,0.5)]",
    hoverBg: "hover:bg-[#22d3ee]/15",
  },
];

function HeroSubtitle() {
  return (
    <div className="flex flex-col">
      <p className="font-[family-name:var(--font-montserrat)] text-white/70 text-sm md:text-base leading-relaxed font-normal max-w-md md:max-w-lg lg:max-w-xl">
        Sites, sistemas e robôs de IA. Você foca no negócio, nós na tecnologia. 
        Soluções digitais que convertem visitantes em clientes e automatizam processos para escalar sem limites.
      </p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="inicio" className="relative w-full min-h-screen overflow-hidden bg-[#111827]">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #379cfd 1px, transparent 1px),
            linear-gradient(to bottom, #379cfd 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111827]/50 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* MOBILE & TABLET LAYOUT */}
        <div className="lg:hidden flex flex-col pt-24 sm:pt-28 pb-8">
          {/* Service Cards */}
          <div className="relative flex flex-col items-center justify-center gap-4 px-4 pb-2 mx-auto w-full">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#379cfd]/6 via-[#379cfd]/3 to-[#379cfd]/6 blur-[36px] -z-10 rounded-full opacity-30 pointer-events-none" />
            <ServiceCards />
          </div>

          {/* Headline */}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-6 md:gap-8 lg:gap-10 mx-auto w-full mt-8">
            <motion.div 
              className="flex flex-col items-center md:items-start select-none md:flex-shrink-0"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            >
              <div className="text-center md:text-left">
                <h1 className="font-[family-name:var(--font-montserrat)] block font-black text-white/90 tracking-tight leading-[0.92] text-2xl sm:text-3xl md:text-4xl uppercase">
                  CRIAMOS{" "}
                </h1>
                <div className="inline-flex flex-col items-center md:items-start">
                  <span className="font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5ec4ff] to-white text-2xl sm:text-3xl md:text-4xl tracking-tight leading-[0.95] uppercase">
                    <FlipWords words={words} duration={4000} />
                  </span>
                  <span className="mt-1 h-[2px] w-full bg-gradient-to-r from-[#379cfd] via-[#5ec4ff] to-white rounded-full" />
                </div>
                <h1 className="font-[family-name:var(--font-montserrat)] block font-black text-white/90 tracking-tight leading-[0.92] text-2xl sm:text-3xl md:text-4xl uppercase mt-2">
                  PARA{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5db8ff] to-white">
                    <FlipWords words={outcomes} duration={4000} />
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Vertical Divider - hidden on mobile */}
            <div className="hidden md:block w-[1.5px] h-[120px] bg-white/30" />

            {/* Subtitle */}
            <motion.div 
              className="px-2 md:px-0 text-center md:text-left flex flex-col justify-center flex-1 md:max-w-[480px]"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            >
              <HeroSubtitle />
            </motion.div>
          </div>

          {/* 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative overflow-visible pointer-events-none mt-8"
            style={{ width: "calc(100% + 2rem)", marginLeft: "-1rem", height: "clamp(300px, 62vw, 480px)" }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
              <Hero3DWrapper />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col items-center gap-4 sm:gap-6 w-full pointer-events-auto pb-6 pt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          >
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className={`relative w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-sm bg-[#1e293b]/40 border ${social.borderColor} transition-all duration-300 hover:scale-110 ${social.hoverBg} ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}
                >
                  <social.Icon size={22} weight="duotone" />
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-col md:flex-row md:items-center justify-center gap-3 sm:gap-4 px-4 md:max-w-none">
              <ActionNode compact />
              <a
                href="#engenharia"
                className="font-[family-name:var(--font-montserrat)] group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 md:h-12 px-6 md:px-8 rounded-full backdrop-blur-[12px] text-xs font-bold text-white tracking-wide uppercase cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none overflow-hidden border border-white/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  VER SOLUÇÕES
                  <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </div>

            {/* Tagline */}
            <p className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-widest text-[#379cfd]/80">
              Design de elite e tecnologia estratégica.
            </p>
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid h-full min-h-screen items-center gap-x-8 grid-cols-1 lg:grid-cols-[1fr_56%] xl:grid-cols-[1fr_52%] py-20 lg:py-0">
          {/* Left Column */}
          <div className="relative h-full flex flex-col items-start text-left justify-center gap-4 lg:gap-6 xl:gap-7 pl-0 xl:pl-8">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#379cfd]/6 via-[#379cfd]/3 to-[#379cfd]/6 blur-[36px] -z-10 rounded-full opacity-30 pointer-events-none" />
            
            {/* Service Cards */}
            <motion.div 
              className="relative z-30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              <ServiceCards />
            </motion.div>

            {/* Headline */}
            <motion.div 
              className="relative z-30 w-full max-w-[780px]"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            >
              <h1 className="flex flex-wrap items-center justify-start gap-x-2 gap-y-0 w-full">
                <span className="font-[family-name:var(--font-montserrat)] block font-black text-white/90 tracking-tight leading-[1.05] text-3xl lg:text-4xl xl:text-5xl uppercase">
                  CRIAMOS{" "}
                </span>
                <span className="font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5ec4ff] to-white text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-[1.05] uppercase">
                  <FlipWords words={words} duration={4000} />
                </span>
              </h1>
              <h1 className="flex flex-wrap items-baseline justify-start gap-2 w-full -mt-1">
                <span className="font-[family-name:var(--font-montserrat)] block font-black text-white/90 tracking-tight leading-[0.95] text-3xl lg:text-4xl xl:text-5xl uppercase">
                  PARA{" "}
                </span>
                <span className="font-[family-name:var(--font-montserrat)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5db8ff] to-white text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-[0.95] uppercase">
                  <FlipWords words={outcomes} duration={4000} />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div 
              className="relative z-30 w-full max-w-md"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            >
              <HeroSubtitle />
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="relative z-10 flex flex-col items-start gap-5 w-full pointer-events-auto mt-4"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.78 }}
            >
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className={`relative w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-sm bg-[#1e293b]/40 border ${social.borderColor} transition-all duration-300 hover:scale-110 ${social.hoverBg} ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}
                  >
                    <social.Icon size={22} weight="duotone" />
                  </a>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pointer-events-auto">
                <ActionNode />
                <a
                  href="#engenharia"
                  className="font-[family-name:var(--font-montserrat)] group relative inline-flex items-center justify-center gap-2 h-12 px-6 xl:px-8 rounded-full backdrop-blur-[12px] text-xs font-bold text-white tracking-wide uppercase cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none overflow-hidden border border-white/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Ver soluções
                    <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>

              {/* Tagline */}
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-[2px] bg-[#379cfd] opacity-80" />
                <p className="font-[family-name:var(--font-montserrat)] text-[10px] lg:text-xs uppercase tracking-widest text-[#379cfd]/80">
                  Design de elite e tecnologia estratégica.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-20 self-stretch w-full overflow-visible pointer-events-none lg:pointer-events-auto"
          >
            <div className="relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
              <Hero3DWrapper />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
