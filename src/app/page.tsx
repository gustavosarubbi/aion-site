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
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ChatCircleDots, RocketLaunch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

// Montserrat font class applied consistently
const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const heroContent = [
  { service: "SITES", outcome: "RESULTADOS" },
  { service: "CHATBOTS", outcome: "ATENDIMENTO" },
  { service: "AUTOMACAO", outcome: "ESCALA" },
  { service: "FUNIS", outcome: "CONVERSAO" },
];

const longestService = heroContent.reduce(
  (longest, item) => (item.service.length > longest.length ? item.service : longest),
  ""
);

const longestOutcome = heroContent.reduce(
  (longest, item) => (item.outcome.length > longest.length ? item.outcome : longest),
  ""
);

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
    label: "CHATBOTS",
    color: "text-violet-300",
    halo: "bg-violet-400/35",
    divider: "via-violet-300/70",
  },
  {
    icon: RocketLaunch,
    label: "AUTOMACAO",
    color: "text-orange-300",
    halo: "bg-orange-400/35",
    divider: "via-orange-300/75",
  },
] as const;

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
      className="w-full lg:max-w-[720px] flex flex-col items-center lg:items-start gap-1 sm:gap-1 overflow-visible"
    >
      <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1 sm:gap-x-2 gap-y-0 w-full">
        <span className="block font-black text-blue-200/80 tracking-tight text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] uppercase">
          TRANSFORMAMOS
        </span>

        <div className="relative inline-flex items-end pb-0.5 sm:pb-1">
          <span className="invisible font-black text-transparent text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] tracking-tight leading-none pt-0.5 uppercase">
            {longestService}
          </span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={heroContent[index].service}
              initial={{ opacity: 0, filter: "blur(2px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(2px)", y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-x-0 lg:inset-x-auto lg:left-0 flex justify-center lg:justify-start"
            >
              <span className="inline-flex flex-col items-center lg:items-start w-fit">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#99e9ff] via-[#57c9ff] to-[#357dff] drop-shadow-[0_0_8px_rgba(56,189,248,0.36)] text-center lg:text-left text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] tracking-tight leading-none pt-0.5 uppercase">
                  {heroContent[index].service}
                </span>
                <span className="mt-0.5 h-[2px] w-full bg-gradient-to-r from-cyan-300/85 via-sky-300/70 to-blue-400/35 shadow-[0_0_12px_rgba(34,211,238,0.55)]" />
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </h1>

      <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full -mt-2 sm:-mt-3">
        <span className="block font-black text-blue-200/80 tracking-tight text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] mt-1 uppercase">
          EM
        </span>

        <div className="relative h-[2.2rem] sm:h-[3rem] lg:h-[3.8rem] inline-flex items-center overflow-visible">
          <span className="invisible font-black text-transparent tracking-tight text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] leading-none whitespace-nowrap pt-0.5 uppercase">
            {longestOutcome}
          </span>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={heroContent[index].outcome}
              initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
              transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
              className="absolute inset-x-0 lg:inset-x-auto lg:left-0 text-transparent bg-clip-text bg-gradient-to-r from-[#98e7ff] via-[#4eb8ff] to-[#2b67e9] drop-shadow-[0_0_9px_rgba(56,189,248,0.32)] font-black tracking-tight text-center lg:text-left text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] leading-none whitespace-nowrap pt-0.5 uppercase"
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
      className="text-white/82 text-sm sm:text-base lg:text-[17px] leading-relaxed font-medium max-w-[46ch] mt-1 sm:mt-2"
    >
      Da visita ao fechamento, criamos sites, chatbots e automacoes para gerar
      mais conversao com menos atrito.
    </p>
  );
}

function ServiceBar() {
  return (
    <div className="inline-flex items-stretch rounded-2xl border border-white/14 bg-[#040d1d]/70 overflow-hidden shadow-[0_16px_44px_rgba(0,0,0,0.45)]">
      {serviceItems.map(({ icon: Icon, label, color, halo, divider }, i) => (
        <div
          key={i}
          className="relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 cursor-default transition-colors duration-300 hover:bg-white/[0.025]"
        >
          {i !== serviceItems.length - 1 && (
            <>
              <span className={`absolute right-0 top-1/2 h-[64%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent ${divider} to-transparent`} />
              <span className={`absolute right-0 top-1/2 h-[40%] w-[3px] -translate-y-1/2 rounded-full ${halo} blur-[3px]`} />
            </>
          )}
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full">
            <span className={`absolute inset-0 rounded-full ${halo} blur-md`} />
            <Icon size={18} weight="duotone" className={color} />
          </span>
          <span
            style={montserrat}
            className={`text-[9px] sm:text-[11px] font-extrabold tracking-[0.16em] ${color} uppercase whitespace-nowrap`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center overflow-x-hidden bg-[#000000]">

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 76% 66% at 50% 45%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 76% 66% at 50% 45%, black 40%, transparent 100%)",
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

      <div className="fixed top-[18%] left-[8%] w-[34vw] h-[34vw] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[12%] right-[10%] w-[28vw] h-[28vw] rounded-full bg-cyan-500/7 blur-[118px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,#000000_100%)]" />

      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start overflow-visible pt-16 sm:pt-24 pb-12">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <div className="w-full h-full relative overflow-visible pointer-events-auto">
            <Hero3DWrapper />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent z-10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-12 pointer-events-none">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 lg:gap-6 lg:max-w-[720px] xl:max-w-[820px]">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/7 via-cyan-500/4 to-blue-500/6 blur-[102px] -z-10 rounded-full opacity-42 pointer-events-none" />

            <div className="relative z-20 flex items-center gap-3.5 lg:-ml-1 mb-2">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/AionLogo.png"
                  alt="Aion Logo"
                  width={48}
                  height={48}
                  priority
                  unoptimized
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <div className="flex flex-col -space-y-0.5 mt-0.5">
                <span
                  className="text-white font-extrabold tracking-[0.23em] text-[1.55rem] sm:text-[1.82rem] leading-none drop-shadow-[0_0_14px_rgba(125,211,252,0.34)]"
                  style={montserrat}
                >
                  AION
                </span>
                <span
                  className="text-[10px] sm:text-[12px] font-semibold tracking-[0.3em] text-[#4169E1] uppercase leading-none pl-[2px] drop-shadow-[0_0_14px_rgba(65,105,225,0.75)]"
                  style={{ fontFamily: "var(--font-source-code-pro)" }}
                >
                  digital
                </span>
              </div>
            </div>

            <div className="z-10 mt-2 mb-2">
              <ServiceBar />
            </div>

            <div className="relative z-10 overflow-visible w-full">
              <HeroHeadline />
            </div>

            <div className="max-w-2xl">
              <HeroSubtitle />
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 pt-4 w-full sm:w-auto pointer-events-auto">
              <p
                style={montserrat}
                className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] text-white/55 uppercase font-semibold flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                Atendimento personalizado · Resultados mensuráveis
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-1">
                <ActionNode />
                <a
                  href="#services"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[44px] px-5 sm:px-6 rounded-xl border border-[#6f8fd4]/35 bg-gradient-to-r from-[#081223]/95 to-[#0d1b33]/90 text-[10px] sm:text-[11px] font-black tracking-[0.12em] text-[#cfe0ff] uppercase transition-all duration-250 hover:from-[#0c1930] hover:to-[#132847] hover:border-[#97b2e8]/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9db8f0]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black pointer-events-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  style={montserrat}
                >
                  Ver Serviços
                  <ArrowIcon />
                </a>
              </div>
            </div>
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

function ArrowIcon() {
  return (
    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
      {"->"}
    </span>
  );
}
