"use client";

import ActionNode from "@/components/ActionNode";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServiceStack from "@/components/ServiceStack";
import CommercialExpertise from "@/components/CommercialExpertise";
import Methodology from "@/components/Methodology";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Squares from "@/components/Squares";
import Hero3DWrapper from "@/components/Hero3DWrapper";
import RotatingText from "@/components/ui/RotatingText";
import TextType from "@/components/ui/TextType";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Robot, Lightning } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

// Montserrat font class applied consistently
const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const heroContent = [
  { service: "SITES", outcome: "RESULTADOS." },
  { service: "CHATBOTS", outcome: "VENDAS REAIS." },
  { service: "AUTOMAÇÕES", outcome: "ESCALA ABSOLUTA." },
];

function HeroHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroContent.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={montserrat}
      className="w-full lg:max-w-[680px] flex flex-col items-center lg:items-start gap-3 sm:gap-4 overflow-visible"
    >
      {/* Line 1: STATIC Conector (Harmonized) + DYNAMIC Badge (Harmonized) */}
      <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
        <span className="block font-bold text-white/70 tracking-[0.18em] text-base sm:text-lg lg:text-xl mt-1 uppercase">
          TRANSFORMAMOS
        </span>

        {/* Ultra-Tech Glass Badge - Harmonized Scale */}
        <motion.div
          layout
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="relative flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-[#0a1128]/60 backdrop-blur-xl border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.1),inset_0_0_12px_rgba(59,130,246,0.1)] overflow-hidden"
        >
          {/* Invisible Spacer */}
          <span className="invisible font-black text-cyan-400 text-lg sm:text-xl lg:text-3xl tracking-tight leading-none pt-0.5">
            {heroContent[index].service}
          </span>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={heroContent[index].service}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)", y: 15 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)", y: -15 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-x-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)] text-center text-lg sm:text-xl lg:text-3xl tracking-tight leading-none pt-0.5"
            >
              {heroContent[index].service}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </h1>

      {/* Line 2: EM (Harmonized) + DYNAMIC Outcome (Harmonized) */}
      <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full -mt-2 sm:-mt-2.5">
        <span className="block font-bold text-white/70 tracking-[0.18em] text-base sm:text-lg lg:text-xl mt-1 uppercase">
          EM
        </span>

        <div className="relative h-[2rem] sm:h-[2.8rem] lg:h-[3.8rem] flex items-center overflow-visible">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={heroContent[index].outcome}
              initial={{ opacity: 0, x: -15, filter: "blur(15px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 15, filter: "blur(15px)" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-400 to-cyan-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.25)] font-black tracking-tight text-[1.8rem] sm:text-[2.6rem] lg:text-[3.5rem] leading-none whitespace-nowrap"
            >
              {heroContent[index].outcome}
            </motion.div>
          </AnimatePresence>
        </div>
      </h1>
    </div>
  );
}

function HeroSubtitle() {
  return (
    <p
      style={montserrat}
      className="text-white/50 text-sm sm:text-base lg:text-[16px] leading-relaxed font-medium min-h-[3rem] mt-1 sm:mt-2"
    >
      <TextType
        text={[
          "Da primeira impressão ao fechamento — a máquina digital do seu negócio.",
          "Sites que vendem. Bots que atendem. Automações que liberam o seu tempo.",
        ]}
        typingSpeed={30}
        pauseDuration={2600}
        deletingSpeed={16}
        showCursor
        cursorCharacter="▎"
        cursorClassName="text-blue-400/60"
        cursorBlinkDuration={0.55}
        loop
        as="span"
        startOnVisible
      />
    </p>
  );
}

/** Print-3 style service bar: dark strip, large icons, separated sections */
function ServiceBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="flex items-stretch divide-x divide-white/[0.07] bg-white/[0.03] border border-white/[0.07] backdrop-blur-md rounded-xl overflow-hidden shadow-2xl"
    >
      {[
        { icon: Globe, label: "WEB DESIGN", color: "text-blue-400", glow: "shadow-[0_0_18px_rgba(59,130,246,0.25)]", iconBg: "bg-blue-500/10" },
        { icon: Robot, label: "CHATBOTS", color: "text-violet-400", glow: "shadow-[0_0_18px_rgba(139,92,246,0.25)]", iconBg: "bg-violet-500/10" },
        { icon: Lightning, label: "AUTOMAÇÃO", color: "text-orange-400", glow: "shadow-[0_0_18px_rgba(249,115,22,0.25)]", iconBg: "bg-orange-500/10" },
      ].map(({ icon: Icon, label, color, glow, iconBg }, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3.5 group hover:bg-white/[0.04] transition-colors duration-200 cursor-default`}
        >
          <div className={`${iconBg} ${glow} p-1.5 sm:p-2 rounded-lg transition-shadow duration-200 group-hover:${glow}`}>
            <Icon size={18} weight="duotone" className={color} />
          </div>
          <span
            style={montserrat}
            className={`text-[9px] sm:text-[11px] font-bold tracking-[0.16em] ${color} uppercase whitespace-nowrap`}
          >
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center overflow-x-hidden bg-[#000000]">

      {/* Dynamic Squares Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)' }}>
        <Squares direction="diagonal" speed={0.3} squareSize={48} borderColor="#1a1a2e" hoverFillColor="#0d1117" />
      </div>

      {/* Neon auras */}
      <div className="fixed top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/8 blur-[140px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed top-[30%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-violet-600/8 blur-[130px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,#000000_100%)]" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start overflow-visible pt-16 sm:pt-24 pb-12">

        {/* 3D Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <div className="w-full h-full relative overflow-visible pointer-events-auto">
            <Hero3DWrapper />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent z-10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-12 pointer-events-none">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-5 lg:max-w-[700px] xl:max-w-[800px]">
            {/* Content glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/5 via-violet-500/4 to-cyan-500/5 blur-[120px] -z-10 rounded-full opacity-40 pointer-events-none" />

            {/* Logo + AION wordmark */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-20 flex items-center gap-3 lg:-ml-1 mb-2"
            >
              <div className="relative flex items-center justify-center p-1">
                <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-xl" />
                <img
                  src="/AionLogo.png"
                  alt="Aion Digital"
                  className="h-8 sm:h-10 w-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] relative"
                />
              </div>
              <div className="flex flex-col -space-y-0.5 mt-0.5">
                <span
                  className="text-white font-extrabold tracking-[0.24em] text-lg sm:text-xl leading-none"
                  style={montserrat}
                >
                  AION
                </span>
                <span
                  className="text-[8px] tracking-[0.32em] text-blue-400/60 uppercase leading-none pl-[2px]"
                  style={{ fontFamily: "var(--font-source-code-pro)" }}
                >
                  digital
                </span>
              </div>
            </motion.div>

            {/* Service bar — print-3 style */}
            <div className="z-10 mt-2 mb-4">
              <ServiceBar />
            </div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10 overflow-visible w-full"
            >
              <HeroHeadline />
            </motion.div>

            {/* TextType Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="max-w-xl"
            >
              <HeroSubtitle />
            </motion.div>

            {/* Micro line + Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center lg:items-start gap-4 pt-4 w-full sm:w-auto pointer-events-auto"
            >
              <p
                style={montserrat}
                className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/40 uppercase font-semibold flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                Atendimento personalizado · Resultados mensuráveis
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2">
                <ActionNode />
                <a
                  href="#services"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-[12px] font-bold text-white/50 hover:text-blue-300 bg-white/[0.03] border border-white/10 hover:border-blue-500/35 hover:bg-blue-500/[0.04] rounded-full transition-all duration-300 pointer-events-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  style={montserrat}
                >
                  Ver Serviços
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flowing Sections */}
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
