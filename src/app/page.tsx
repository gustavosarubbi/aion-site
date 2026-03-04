"use client";

import ActionNode from "@/components/ActionNode";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServiceStack from "@/components/ServiceStack";
import CommercialExpertise from "@/components/CommercialExpertise";
import Methodology from "@/components/Methodology";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import HeroHeadline from "@/components/HeroHeadline";
import dynamic from "next/dynamic";
import { Code, ChatCircleDots, RocketLaunch, InstagramLogo, EnvelopeSimple, WhatsappLogo, ArrowRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const Squares = dynamic(() => import("@/components/Squares"), {
  loading: () => <div className="w-full h-full" />,
});

const Hero3DWrapper = dynamic(() => import("@/components/Hero3DWrapper"), {
  loading: () => <div className="w-full h-[260px] sm:h-[320px] md:h-[390px] lg:h-[560px]" />,
});

// Montserrat font class applied consistently
const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const serviceItems = [
  {
    icon: Code,
    label: "WEB DESIGN",
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

function HeroSubtitle() {
  return (
    <div className="flex flex-col">
      <p
        style={montserrat}
        className="text-white/82 text-[15px] sm:text-[16px] lg:text-[17px] 2xl:text-[18px] leading-[1.55] font-medium max-w-[42ch] tracking-tight"
      >
        Potencializamos sua escala digital com ecossistemas de alta performance:
        <span className="text-cyan-300 font-bold"> Sites magnéticos</span>,
        <span className="text-sky-300 font-bold font-semibold"> chatbots de conversão</span> e
        <span className="text-blue-300 font-bold font-semibold"> automações voltadas para o lucro</span>.
      </p>
    </div>
  );
}

function ServiceBar() {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-1 overflow-visible">
      {serviceItems.map(({ icon: Icon, label, color, halo }, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-1.5 sm:gap-2.5 py-1.5 cursor-default px-1.5 sm:px-2.5 lg:first:pl-0 last:pr-0">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full">
              <span className={`absolute inset-0 rounded-full ${halo} blur-sm opacity-45`} />
              <Icon size={18} weight="duotone" className={color} />
            </span>
            <span
              style={montserrat}
              className={`text-[10px] sm:text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-extrabold tracking-[0.1em] xl:tracking-[0.11em] 2xl:tracking-[0.12em] ${color} uppercase whitespace-nowrap`}
            >
              {label}
            </span>
          </div>
          {i !== serviceItems.length - 1 && (
            <div className="hidden sm:block h-4 w-px bg-white/35 self-center mx-1.5 sm:mx-2" />
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

      <section id="inicio" className="relative w-full overflow-visible md:h-[100dvh]">
        <div className="absolute inset-x-0 top-[10%] h-[68%] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08)_0%,rgba(0,0,0,0)_72%)] pointer-events-none z-0" />

        <div className="relative z-10 w-full md:h-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 lg:pl-32 xl:pl-44 2xl:pl-8 overflow-visible">

          {/* ── MOBILE LAYOUT (< md) ── stacked: text → 3D → buttons */}
          <div className="md:hidden flex flex-col pt-[calc(var(--header-height,76px)-12px)] min-h-[100dvh]">

            {/* Text block: ServiceBar + Headline + Subtitle */}
            <div className="relative flex flex-col items-center text-center gap-1.5 px-1 pb-1">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/6 via-cyan-500/3 to-blue-500/5 blur-[58px] -z-10 rounded-full opacity-30 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <ServiceBar />
              </motion.div>

              <motion.div
                className="relative z-10 w-full"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                <HeroHeadline />
              </motion.div>

              <motion.div
                className="w-full max-w-[34ch] px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              >
                <HeroSubtitle />
              </motion.div>
            </div>

            {/* 3D cards — full bleed, overflow-visible so labels/orbs never clip */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="relative overflow-visible pointer-events-none"
              style={{ width: "calc(100% + 2rem)", marginLeft: "-1rem", height: "clamp(300px, 60vw, 440px)" }}
            >
              <Hero3DWrapper />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
            </motion.div>

            {/* Buttons + social — below cards */}
            <motion.div
              className="flex flex-col items-center gap-6 w-full pointer-events-auto pb-8 pt-2"
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

              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:justify-center">
                <ActionNode />
                <a
                  href="#services"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 h-[48px] px-6 rounded-2xl bg-sky-500/10 backdrop-blur-xl border border-sky-400/20 text-[13px] font-semibold text-white transition-all duration-500 hover:bg-sky-500/15 hover:border-sky-400/35 active:scale-[0.98] pointer-events-auto shadow-[0_0_14px_rgba(56,189,248,0.06)] overflow-hidden"
                  style={montserrat}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2.5 uppercase tracking-[0.14em]">
                    Ver soluções
                    <ArrowRight size={16} weight="bold" className="text-sky-300" />
                  </span>
                </a>
              </div>

              <p style={montserrat} className="text-[10.5px] uppercase tracking-[0.08em] text-cyan-200/60">
                Diagnóstico estratégico em até 24h úteis.
              </p>
            </motion.div>
          </div>

          {/* ── DESKTOP LAYOUT (≥ md) ── side-by-side 2-column grid, full viewport height */}
          <div
            className="hidden md:grid h-full md:items-start md:gap-x-4 lg:gap-x-8
              md:grid-cols-[minmax(0,1fr)_minmax(360px,50%)]
              lg:grid-cols-[minmax(0,1fr)_minmax(480px,54%)]
              xl:grid-cols-[minmax(0,1fr)_minmax(580px,56%)]"
            style={{ paddingTop: "calc(var(--header-height, 88px) - 32px)" }}
          >

            {/* Left: text content — vertically centered within the grid row */}
            <div className="relative h-full flex flex-col items-start text-left justify-start pt-[7vh] 2xl:pt-[10vh] gap-3 lg:gap-4 2xl:gap-7">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/6 via-cyan-500/3 to-blue-500/5 blur-[58px] -z-10 rounded-full opacity-30 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                <ServiceBar />
              </motion.div>

              <motion.div
                className="relative z-10 w-full"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              >
                <HeroHeadline />
              </motion.div>

              <motion.div
                className="w-full max-w-[42ch]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              >
                <HeroSubtitle />
              </motion.div>

              <motion.div
                className="flex flex-col items-start gap-4 lg:gap-5 2xl:gap-8 w-full pointer-events-auto"
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

                <div className="flex items-center gap-3 lg:gap-4 pointer-events-auto">
                  <ActionNode />
                  <a
                    href="#services"
                    className="group relative inline-flex items-center justify-center gap-1.5 h-[46px] lg:h-[48px] xl:h-[48.5px] 2xl:h-[52px] px-2.5 lg:px-3.5 xl:px-3 2xl:px-8 rounded-2xl bg-sky-500/10 backdrop-blur-xl border border-sky-400/20 text-[10.5px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[13px] font-semibold text-white transition-all duration-500 hover:bg-sky-500/15 hover:border-sky-400/35 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 pointer-events-auto shadow-[0_0_14px_rgba(56,189,248,0.06)] hover:shadow-[0_0_22px_rgba(56,189,248,0.12)] overflow-hidden"
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
                  <p style={montserrat} className="text-[10px] lg:text-[10.5px] 2xl:text-[12px] uppercase tracking-[0.1em] text-cyan-200/60">
                    Diagnóstico estratégico em até 24h úteis.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: 3D scene — fills full column height, overflow-visible so labels/orbs never clip */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative self-stretch w-full overflow-visible pointer-events-none md:pointer-events-auto"
            >
              {/* Added horizontal bleed wrapper to prevent WebGL clipping without shifting the center */}
              <div className="absolute inset-y-0 -left-[30%] w-[160%] min-h-[480px] overflow-visible">
                <Hero3DWrapper />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-16 lg:h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      <Methodology />
      <CommercialExpertise />
      <PortfolioShowcase />
      <ServiceStack />
      <Testimonials />
      <FAQ />
      <Footer />

    </main>
  );
}
