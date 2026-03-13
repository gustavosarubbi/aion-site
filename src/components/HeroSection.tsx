"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, InstagramLogo, EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BorderBeam } from "@/components/ui/border-beam";
import { FlipWords } from "@/components/ui/flip-words";
import ServiceCards from "@/components/ServiceCards";
import ActionNode from "@/components/ActionNode";

const Particles = dynamic(
  () => import("@/components/ui/particles").then((mod) => mod.Particles),
  {
    loading: () => <div className="absolute inset-0" />,
    ssr: false,
  }
);

const Hero3DWrapper = dynamic(() => import("@/components/Hero3DWrapper"), {
  loading: () => <div className="w-full h-[240px] sm:h-[290px] md:h-[340px] min-[1280px]:h-[560px]" />,
});

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

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
      <p
        style={montserrat}
        className="text-white/70 text-[13px] sm:text-[14px] md:text-[15px] min-[1280px]:text-[16px] leading-[1.5] md:leading-[1.55] font-normal max-w-[42ch] md:max-w-[50ch] lg:max-w-[60ch] tracking-tight"
      >
        Sites, sistemas e robôs de IA. Você foca no negócio, nós na tecnologia. Soluções digitais que convertem visitantes em clientes e automatizam processos para escalar sem limites.
      </p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <AuroraBackground className="min-h-screen relative">
      {/* Particles Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          className="absolute inset-0"
          quantity={60}
          ease={80}
          color="#379cfd"
          size={1}
          refresh
        />
      </div>

      {/* Gradient Overlays */}
      <div className="fixed top-[18%] left-[8%] w-[34vw] h-[34vw] rounded-full bg-[#379cfd]/5 blur-[44px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[12%] right-[10%] w-[28vw] h-[28vw] rounded-full bg-[#379cfd]/4 blur-[38px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,transparent_60%,rgba(0,0,0,0.3)_100%)]" />

      {/* Main Content */}
      <section
        id="inicio"
        className="relative w-full overflow-x-clip overflow-y-visible min-[1280px]:min-h-[min(85dvh,780px)]"
      >
        {/* Center Glow */}
        <div className="absolute inset-x-0 top-[8%] h-[75%] bg-[radial-gradient(ellipse_at_center,rgba(55,156,253,0.05)_0%,rgba(55,156,253,0.02)_50%,rgba(0,0,0,0)_80%)] pointer-events-none z-0" />

        <div className="relative z-10 w-full min-[1280px]:h-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          
          {/* MOBILE LAYOUT (< 1280px) */}
          <div className="min-[1280px]:hidden flex flex-col pt-[calc(var(--header-height,76px)+24px)] pb-6">
            {/* Service Cards */}
            <div className="relative flex flex-col items-center justify-center gap-4 md:gap-4 px-4 sm:px-4 pb-0.5 mx-auto w-full max-w-5xl">
              <div className="absolute -inset-8 bg-gradient-to-r from-[#379cfd]/6 via-[#379cfd]/3 to-[#379cfd]/6 blur-[36px] -z-10 rounded-full opacity-30 pointer-events-none" />
              <ServiceCards />
            </div>

            {/* Headline */}
            <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-6 md:gap-6 lg:gap-10 mx-auto w-full md:px-0 mt-6">
              <motion.div
                className="flex flex-col items-center md:items-start select-none md:flex-shrink-0"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                <div className="text-center md:text-left">
                  <h1
                    style={montserrat}
                    className="block font-black text-white/90 tracking-[-0.02em] leading-[0.92] text-[clamp(1.8rem,1.4rem+2vw,3rem)] md:text-[clamp(2.2rem,1.2rem+2.5vw,3.5rem)] uppercase"
                  >
                    CRIAMOS{" "}
                  </h1>
                  <div className="inline-flex flex-col items-center md:items-start">
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5ec4ff] to-white text-[clamp(1.9rem,1.5rem+2.1vw,3.2rem)] md:text-[clamp(2.4rem,1.3rem+2.7vw,3.8rem)] tracking-[-0.02em] leading-[0.95] uppercase drop-shadow-[0_0_6px_rgba(55,156,253,0.45)]">
                      <FlipWords words={words} duration={4000} />
                    </span>
                    <span className="mt-1 h-[2px] w-full bg-gradient-to-r from-[#379cfd] via-[#5ec4ff] to-white rounded-full shadow-[0_0_8px_rgba(55,156,253,0.6)]" />
                  </div>
                  <h1
                    style={montserrat}
                    className="block font-black text-white/90 tracking-[-0.015em] leading-[0.92] text-[clamp(1.8rem,1.4rem+2vw,3rem)] md:text-[clamp(2.2rem,1.2rem+2.5vw,3.5rem)] uppercase mt-2"
                  >
                    PARA{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5db8ff] to-white drop-shadow-[0_0_7px_rgba(55,156,253,0.35)]">
                      <FlipWords words={outcomes} duration={4000} />
                    </span>
                  </h1>
                </div>
              </motion.div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-[1.5px] h-[120px] md:h-[130px] lg:h-[140px] bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

              {/* Subtitle */}
              <motion.div
                className="px-2 md:px-0 text-center md:text-left flex flex-col justify-center flex-1 md:max-w-[580px]"
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
              <div className="relative w-full h-full">
                <BorderBeam
                  size={400}
                  duration={15}
                  colorFrom="#379cfd"
                  colorTo="#5ec4ff"
                  className="absolute inset-0 rounded-2xl"
                />
                <div className="absolute inset-[2px] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
                  <Hero3DWrapper />
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col items-center gap-4 sm:gap-6 w-full pointer-events-auto pb-6 pt-3"
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
              <div className="flex w-full flex-col md:flex-row md:items-center justify-center gap-3 sm:gap-4 px-6 md:max-w-none">
                <ActionNode compact />
                <a
                  href="#engenharia"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[44px] lg:h-[48px] px-6 lg:px-8 rounded-full backdrop-blur-[12px] text-[11px] font-bold text-white tracking-[0.5px] uppercase cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none overflow-hidden"
                  style={{
                    ...montserrat,
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 8px 32px -8px rgba(59, 130, 246, 0.25), 0 4px 12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 50% 100%, rgba(147, 197, 253, 0.15) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)",
                      boxShadow: "0 12px 40px -8px rgba(59, 130, 246, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    VER SOLUÇÕES
                    <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>

              {/* Tagline */}
              <p style={montserrat} className="text-[10.5px] uppercase tracking-[0.08em] text-[#379cfd]/80">
                Design de elite e tecnologia estratégica.
              </p>
            </motion.div>
          </div>

          {/* DESKTOP LAYOUT (>= 1280px) */}
          <div
            className="hidden min-[1280px]:grid h-full min-[1280px]:items-start min-[1280px]:gap-x-8 min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(580px,56%)] lg:pl-32 min-[1280px]:pl-[clamp(2.25rem,15.625rem-9.375vw,6.25rem)]"
            style={{ paddingTop: "calc(var(--header-height, 88px) - 32px)" }}
          >
            {/* Left Column */}
            <div className="relative h-full flex flex-col items-start text-left justify-start pt-[7vh] pb-12 min-[1280px]:pb-20 gap-3 lg:gap-4 transform-gpu min-[1280px]:pt-[9vh] min-[1280px]:translate-y-6 min-[1280px]:gap-7 min-[1280px]:-translate-x-1">
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
                <div className="hidden min-[1280px]:block w-full">
                  <h1 className="flex flex-wrap items-center justify-start gap-x-1 sm:gap-x-2 gap-y-0 w-full">
                    <span className="block font-black text-white/90 tracking-tight leading-[1.05] text-[clamp(2.5rem,1.5rem+2vw,4.5rem)] uppercase">
                      CRIAMOS{" "}
                    </span>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5ec4ff] to-white text-[clamp(2.5rem,1.5rem+2vw,4.5rem)] tracking-tight leading-[1.05] uppercase drop-shadow-[0_0_6px_rgba(55,156,253,0.45)]">
                      <FlipWords words={words} duration={4000} />
                    </span>
                  </h1>
                  <h1 className="flex flex-wrap items-baseline justify-start gap-1 sm:gap-2 w-full -mt-0.5 sm:-mt-1">
                    <span className="block font-black text-white/90 tracking-tight leading-[0.95] text-[clamp(2.5rem,1.5rem+2vw,4.5rem)] uppercase">
                      PARA{" "}
                    </span>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] via-[#5db8ff] to-white text-[clamp(2.5rem,1.5rem+2vw,4.5rem)] tracking-tight leading-[0.95] uppercase drop-shadow-[0_0_6px_rgba(55,156,253,0.35)]">
                      <FlipWords words={outcomes} duration={4000} />
                    </span>
                  </h1>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                className="relative z-30 w-full max-w-[42ch]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              >
                <HeroSubtitle />
              </motion.div>

              {/* CTA */}
              <motion.div
                className="relative z-10 flex flex-col items-start gap-5 w-full pointer-events-auto min-[1280px]:mt-[16px]"
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
                    className="group relative inline-flex items-center justify-center gap-2 h-[46px] lg:h-[48px] min-[1280px]:h-[52px] px-5 lg:px-6 min-[1280px]:px-8 rounded-full backdrop-blur-[12px] text-[10px] lg:text-[11px] min-[1280px]:text-[12px] font-bold text-white tracking-[0.5px] uppercase cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none overflow-hidden"
                    style={{
                      ...montserrat,
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 8px 32px -8px rgba(59, 130, 246, 0.25), 0 4px 12px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at 50% 100%, rgba(147, 197, 253, 0.15) 0%, transparent 60%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                      style={{
                        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)",
                        boxShadow: "0 12px 40px -8px rgba(59, 130, 246, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Ver soluções
                      <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </div>

                {/* Tagline */}
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-[2px] bg-[#379cfd] opacity-80" />
                  <p style={montserrat} className="text-[10px] lg:text-[10.5px] min-[1280px]:text-[12px] uppercase tracking-[0.1em] text-[#379cfd]/80">
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
              className="relative z-20 self-stretch w-full overflow-visible pointer-events-none min-[1280px]:pointer-events-auto"
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[136%] max-w-[100vw] min-h-[480px] overflow-visible">
                <div className="relative w-full h-full">
                  <BorderBeam
                    size={500}
                    duration={15}
                    colorFrom="#379cfd"
                    colorTo="#5ec4ff"
                    className="absolute inset-0 rounded-2xl"
                  />
                  <div className="absolute inset-[3px] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
                    <Hero3DWrapper />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
}
