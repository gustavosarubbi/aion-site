"use client";

import ActionNode from "@/components/ActionNode";
import VitrineEngenharia from "@/components/EngineeringShowcase";
import CentralIntegracoes from "@/components/IntegrationsHub";
import VitrineSistemas from "@/components/TemplateShowcase";
import AutoridadeTecnica from "@/components/CommercialExpertise";
import DiagnosticoEstrategico from "@/components/StrategicDiagnosis";
import FAQ from "@/components/FAQ";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import Footer from "@/components/Footer";
import HeroHeadline from "@/components/HeroHeadline";
import GatewayCarousel from "@/components/GatewayCarousel";
import dynamic from "next/dynamic";
import { Code, ChatCircleDots, RocketLaunch, InstagramLogo, EnvelopeSimple, WhatsappLogo, ArrowRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const Squares = dynamic(() => import("@/components/Squares"), {
  loading: () => <div className="w-full h-full" />,
});

const Hero3DWrapper = dynamic(() => import("@/components/Hero3DWrapper"), {
  loading: () => <div className="w-full h-[240px] sm:h-[290px] md:h-[340px] min-[1280px]:h-[560px]" />,
});

// Montserrat font class applied consistently
const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const serviceItems = [
  {
    icon: Code,
    label: "SITES PREMIUM",
    color: "text-sky-300",
    halo: "bg-sky-400/35",
    divider: "via-sky-300/70",
  },
  {
    icon: ChatCircleDots,
    label: "CONVERSÃO",
    color: "text-cyan-300",
    halo: "bg-cyan-400/35",
    divider: "via-cyan-300/70",
  },
  {
    icon: RocketLaunch,
    label: "AUTOMAÇÃO",
    color: "text-blue-300",
    halo: "bg-blue-400/35",
    divider: "via-blue-300/75",
  },
] as const;

const HERO_SECTION_CLASS = "relative w-full overflow-x-clip overflow-y-visible min-[1280px]:min-h-[min(85dvh,780px)]";
const HERO_SHELL_CLASS = "relative z-10 w-full min-[1280px]:h-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 overflow-visible";
const HERO_DESKTOP_GRID_CLASS = "hidden min-[1280px]:grid h-full min-[1280px]:items-start min-[1280px]:gap-x-8 min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(580px,56%)]";
const HERO_DESKTOP_LEFT_CLASS = "relative h-full flex flex-col items-start text-left justify-start pt-[7vh] pb-12 min-[1280px]:pb-20 gap-3 lg:gap-4 transform-gpu min-[1280px]:pt-[9vh] min-[1280px]:translate-y-6 min-[1280px]:gap-7 min-[1280px]:-translate-x-1";
const HERO_DESKTOP_ACTIONS_CLASS = "relative z-10 flex flex-col items-start gap-5 w-full pointer-events-auto min-[1280px]:mt-[16px]";
const HERO_DESKTOP_RIGHT_CLASS = "relative z-20 self-stretch w-full overflow-visible pointer-events-none min-[1280px]:pointer-events-auto";
const HERO_DESKTOP_BLEED_CLASS = "absolute inset-y-0 left-1/2 -translate-x-1/2 w-[136%] max-w-[100vw] min-h-[480px] overflow-visible";

function HeroSubtitle() {
  return (
    <div className="flex flex-col">
      <p
        style={montserrat}
        className="text-white/84 text-[15.5px] sm:text-[16.5px] md:text-[clamp(1.05rem,0.4rem+1.8vw,1.45rem)] min-[1280px]:text-[18px] leading-[1.46] md:leading-[1.55] min-[1280px]:leading-[1.46] font-medium max-w-[40ch] md:max-w-[50ch] lg:max-w-none tracking-tight [text-wrap:balance] md:text-wrap"
      >
        Potencializamos sua escala digital com ecossistemas de alta performance:
        <span className="text-cyan-300 font-bold"> Sites magnéticos</span>,
        <span className="text-sky-300 font-bold font-semibold"> robôs de conversão</span> e
        <span className="text-blue-300 font-bold font-semibold"> automações voltadas para o lucro</span>.
      </p>
    </div>
  );
}

function ServiceBar() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-x-0.5 sm:gap-x-1 max-w-full">
      {serviceItems.map(({ icon: Icon, label, color, halo }, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-1 sm:gap-2.5 py-1.5 cursor-default px-1 sm:px-2.5 min-[1280px]:first:pl-0 last:pr-0">
            <span className="relative inline-flex h-5 w-5 min-[360px]:h-6 min-[360px]:w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full">
              <span className={`absolute inset-0 rounded-full ${halo} blur-sm opacity-45`} />
              <Icon size={14} weight="duotone" className={`${color} sm:hidden`} />
              <Icon size={15} weight="duotone" className={`${color} hidden sm:block`} />
            </span>
            <span
              style={montserrat}
              className={`text-[8.5px] min-[360px]:text-[10px] sm:text-[11px] min-[1280px]:text-[12px] font-extrabold tracking-[0.05em] sm:tracking-[0.1em] min-[1280px]:tracking-[0.11em] ${color} uppercase whitespace-nowrap`}
            >
              {label}
            </span>
          </div>
          {i !== serviceItems.length - 1 && (
            <div className="hidden sm:block h-3 sm:h-4 w-px bg-white/20 self-center mx-1 sm:mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center bg-[#000000]">

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 118% 84% at 50% 46%, black 44%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 118% 84% at 50% 46%, black 44%, transparent 100%)",
        }}
      >
        <Squares
          direction="diagonal"
          speed={0.08}
          squareSize={56}
          borderColor="#121b2e"
          hoverFillColor="#081120"
        />
      </div>

      <div className="fixed top-[18%] left-[8%] w-[34vw] h-[34vw] rounded-full bg-blue-600/7 blur-[84px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[12%] right-[10%] w-[28vw] h-[28vw] rounded-full bg-cyan-500/5 blur-[76px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,#000000_100%)]" />

      <section id="inicio" className={HERO_SECTION_CLASS}>
        <div className="absolute inset-x-0 top-[10%] h-[68%] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08)_0%,rgba(0,0,0,0)_72%)] pointer-events-none z-0" />

        <div className={HERO_SHELL_CLASS}>

          {/* ── MOBILE LAYOUT (< md) ── stacked: text → 3D → buttons */}
          <div className="min-[1280px]:hidden flex flex-col pt-[calc(var(--header-height,76px)+24px)] pb-6">

            {/* Text block: ServiceBar + Headline + Subtitle */}
            <div className="relative flex flex-col items-center justify-center gap-4 md:gap-4 px-4 sm:px-4 pb-0.5 mx-auto w-full max-w-5xl">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/6 via-cyan-500/3 to-blue-500/5 blur-[58px] -z-10 rounded-full opacity-30 pointer-events-none" />

              {/* ServiceBar: Centered for Tablet */}
              <motion.div
                className="flex justify-center w-full mb-2 md:mb-2"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <ServiceBar />
              </motion.div>

              {/* Unified Block: Headline | Divider | Subtitle - Perfect Vertical Harmony */}
              <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-6 md:gap-6 lg:gap-10 mx-auto w-full md:px-0">
                <motion.div
                  className="flex flex-col items-center md:items-start select-none md:flex-shrink-0"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                >
                  <HeroHeadline tabletSide="left" />
                </motion.div>

                {/* Vertical Divider: Perfectly Centered */}
                <div className="hidden md:block w-[1.5px] h-[120px] md:h-[130px] lg:h-[140px] bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

                <motion.div
                  className="px-2 md:px-0 text-center md:text-left flex flex-col justify-center flex-1 md:max-w-[580px]"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
                >
                  <HeroSubtitle />
                </motion.div>
              </div>
            </div>

            {/* 3D cards — full bleed, overflow-visible so labels/orbs never clip */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="relative overflow-visible pointer-events-none"
              style={{ width: "calc(100% + 2rem)", marginLeft: "-1rem", height: "clamp(300px, 62vw, 480px)" }}
            >
              <Hero3DWrapper />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
            </motion.div>

            {/* Buttons + social — below cards */}
            <motion.div
              className="flex flex-col items-center gap-4 sm:gap-6 w-full pointer-events-auto pb-6 pt-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            >
              <div className="flex items-center gap-3">
                {[
                  {
                    Icon: InstagramLogo,
                    href: "https://instagram.com",
                    baseColor: "text-cyan-300",
                    borderColor: "border-cyan-400/30",
                    glowColor: "shadow-[0_0_10px_rgba(34,211,238,0.16)]",
                    hoverGlow: "hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]"
                  },
                  {
                    Icon: EnvelopeSimple,
                    href: "mailto:contato@aion.digital",
                    baseColor: "text-sky-300",
                    borderColor: "border-sky-400/30",
                    glowColor: "shadow-[0_0_10px_rgba(56,189,248,0.16)]",
                    hoverGlow: "hover:shadow-[0_0_16px_rgba(56,189,248,0.28)]"
                  },
                  {
                    Icon: WhatsappLogo,
                    href: "https://wa.me/message/SEULINKAQUI",
                    baseColor: "text-blue-300",
                    borderColor: "border-blue-400/30",
                    glowColor: "shadow-[0_0_10px_rgba(96,165,250,0.16)]",
                    hoverGlow: "hover:shadow-[0_0_16px_rgba(96,165,250,0.28)]"
                  }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border ${social.borderColor} transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}
                  >
                    <social.Icon size={19} weight="duotone" />
                  </a>
                ))}
              </div>

              <div className="flex w-full flex-col md:flex-row md:items-center justify-center gap-3 sm:gap-4 px-6 md:max-w-none">
                <ActionNode compact />
                <a
                  href="#servicos"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-[44px] lg:h-[48px] px-6 lg:px-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-[12px] font-bold text-white transition-all duration-500 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] overflow-hidden"
                  style={montserrat}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2 tracking-[0.1em] uppercase">
                    VER SOLUÇÕES
                    <ArrowRight size={14} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1 text-blue-300" />
                  </span>
                </a>
              </div>

              <p style={montserrat} className="text-[10.5px] uppercase tracking-[0.08em] text-cyan-200/60">
                Design de elite e tecnologia estratégica.
              </p>
            </motion.div>
          </div>

          {/* ── DESKTOP LAYOUT (≥ md) ── side-by-side 2-column grid, full viewport height */}
          <div className={`${HERO_DESKTOP_GRID_CLASS} lg:pl-32 min-[1280px]:pl-[clamp(2.25rem,15.625rem-9.375vw,6.25rem)]`} style={{ paddingTop: "calc(var(--header-height, 88px) - 32px)" }}>

            {/* Left: text content — vertically centered within the grid row */}
            <div className={HERO_DESKTOP_LEFT_CLASS}>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/6 via-cyan-500/3 to-blue-500/5 blur-[58px] -z-10 rounded-full opacity-30 pointer-events-none" />

              <motion.div
                className="relative z-30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                <ServiceBar />
              </motion.div>

              <motion.div
                className="relative z-30 w-full"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              >
                <HeroHeadline />
              </motion.div>

              <motion.div
                className="relative z-30 w-full max-w-[42ch]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              >
                <HeroSubtitle />
              </motion.div>

              <motion.div
                className={HERO_DESKTOP_ACTIONS_CLASS}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.78 }}
              >
                <div className="flex items-center gap-3">
                  {[
                    {
                      Icon: InstagramLogo,
                      href: "https://instagram.com",
                      baseColor: "text-cyan-300",
                      borderColor: "border-cyan-400/30",
                      glowColor: "shadow-[0_0_10px_rgba(34,211,238,0.16)]",
                      hoverGlow: "hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]"
                    },
                    {
                      Icon: EnvelopeSimple,
                      href: "mailto:contato@aion.digital",
                      baseColor: "text-sky-300",
                      borderColor: "border-sky-400/30",
                      glowColor: "shadow-[0_0_10px_rgba(56,189,248,0.16)]",
                      hoverGlow: "hover:shadow-[0_0_16px_rgba(56,189,248,0.28)]"
                    },
                    {
                      Icon: WhatsappLogo,
                      href: "https://wa.me/message/SEULINKAQUI",
                      baseColor: "text-blue-300",
                      borderColor: "border-blue-400/30",
                      glowColor: "shadow-[0_0_10px_rgba(96,165,250,0.16)]",
                      hoverGlow: "hover:shadow-[0_0_16px_rgba(96,165,250,0.28)]"
                    }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border ${social.borderColor} transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}
                    >
                      <social.Icon size={19} weight="duotone" />
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-4 pointer-events-auto">
                  <ActionNode />
                  <a
                    href="#servicos"
                    className="group relative inline-flex items-center justify-center gap-2.5 h-[46px] lg:h-[48px] min-[1280px]:h-[52px] px-2.5 lg:px-3.5 min-[1280px]:px-8 rounded-2xl bg-sky-500/10 backdrop-blur-xl border border-sky-400/20 text-[10.5px] lg:text-[11.5px] min-[1280px]:text-[13px] font-semibold text-white transition-all duration-500 hover:bg-sky-500/15 hover:border-sky-400/35 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 pointer-events-auto shadow-[0_0_14px_rgba(56,189,248,0.06)] hover:shadow-[0_0_22px_rgba(56,189,248,0.12)] overflow-hidden"
                    style={montserrat}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />
                    <span className="relative z-10 flex items-center gap-2.5 uppercase tracking-[0.14em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.1)] group-hover:text-white transition-all duration-500">
                      Ver soluções
                      <ArrowRight size={14} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1 text-sky-300 group-hover:text-white" />
                    </span>
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-[2px] bg-sky-400 opacity-80" />
                  <p style={montserrat} className="text-[10px] lg:text-[10.5px] min-[1280px]:text-[12px] uppercase tracking-[0.1em] text-cyan-200/60">
                    Design de elite e tecnologia estratégica.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: 3D scene — fills full column height, overflow-visible so labels/orbs never clip */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className={HERO_DESKTOP_RIGHT_CLASS}
            >
              {/* Added horizontal bleed wrapper to prevent WebGL clipping without shifting the center */}
              <div className={HERO_DESKTOP_BLEED_CLASS}>
                <Hero3DWrapper />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-16 lg:h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Modern Section Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>

      <GatewayCarousel />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>

      <VitrineEngenharia />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-sm" />
      </div>

      <CentralIntegracoes />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>

      <VitrineSistemas />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-sm" />
      </div>

      <AutoridadeTecnica />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>

      <PerformanceMetrics />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-sm" />
      </div>

      <FAQ />

      {/* ── Divider ── */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>

      <DiagnosticoEstrategico />
      <Footer />

    </main>
  );
}
