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
  loading: () => <div className="w-full h-[420px] lg:h-[560px]" />,
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
    color: "text-violet-300",
    halo: "bg-violet-400/35",
    divider: "via-violet-300/70",
  },
  {
    icon: RocketLaunch,
    label: "AUTOMAÇÃO",
    color: "text-orange-300",
    halo: "bg-orange-400/35",
    divider: "via-orange-300/75",
  },
] as const;

function HeroSubtitle() {
  return (
    <div className="flex flex-col gap-4 mt-3 sm:mt-4">
      <p
        style={montserrat}
        className="text-white/85 text-sm sm:text-base lg:text-[18px] leading-relaxed font-medium max-w-[52ch] tracking-tight"
      >
        Potencializamos sua escala digital com ecossistemas de alta performance:
        <span className="text-blue-300 font-bold"> Sites magnéticos</span>,
        <span className="text-violet-300 font-bold font-semibold"> chatbots de conversão</span> e
        <span className="text-orange-300 font-bold font-semibold"> automações voltadas para o lucro</span>.
      </p>
    </div>
  );
}

function ServiceBar() {
  return (
    <div className="flex items-center overflow-visible">
      {serviceItems.map(({ icon: Icon, label, color, halo }, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2 sm:gap-2.5 py-1.5 cursor-default px-2 sm:px-3 lg:first:pl-0 last:pr-0">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full">
              <span className={`absolute inset-0 rounded-full ${halo} blur-md opacity-70`} />
              <Icon size={18} weight="duotone" className={color} />
            </span>
            <span
              style={montserrat}
              className={`text-[10px] sm:text-[11px] font-extrabold tracking-[0.18em] ${color} uppercase whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]`}
            >
              {label}
            </span>
          </div>
          {i !== serviceItems.length - 1 && (
            <div className="relative h-4 w-[1px] bg-white/70 self-center mx-1 sm:mx-2 overflow-visible">
              {/* Core glow - sharp */}
              <div className="absolute inset-0 bg-white blur-[1px]" />
              {/* Aura - soft white/blue tint for tech feel */}
              <div className="absolute inset-x-[-3px] inset-y-[-2px] bg-blue-400/20 blur-[6px] rounded-full" />
              <div className="absolute inset-x-[-1px] inset-y-[-1px] bg-white/40 blur-[3px] rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const premiumEntrance = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const // Premium Expo-style easing
    }
  } as const;

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

      <div className="fixed top-[18%] left-[8%] w-[34vw] h-[34vw] rounded-full bg-blue-600/9 blur-[96px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[12%] right-[10%] w-[28vw] h-[28vw] rounded-full bg-cyan-500/6 blur-[88px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,#000000_100%)]" />

      <section id="inicio" className="relative w-full min-h-[90vh] flex flex-col items-center justify-start overflow-visible pt-16 sm:pt-24 pb-12">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full h-full relative overflow-visible pointer-events-auto"
          >
            <Hero3DWrapper />
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent z-10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-2 sm:mt-4 pointer-events-none">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 lg:gap-6 lg:max-w-[720px] xl:max-w-[820px]">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/7 via-cyan-500/4 to-blue-500/6 blur-[74px] -z-10 rounded-full opacity-42 pointer-events-none" />


            {/* 1. ServiceBar - Top-Down Slide */}
            <motion.div
              className="z-10 mb-0.5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25
              }}
            >
              <ServiceBar />
            </motion.div>

            {/* 2. Headline - Lateral Left-to-Right */}
            <motion.div
              className="relative z-10 overflow-visible w-full -mt-2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.45
              }}
            >
              <HeroHeadline />
            </motion.div>

            {/* 3. Subtitle - Lateral Right-to-Left */}
            <motion.div
              className="max-w-2xl px-4 lg:px-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.65
              }}
            >
              <HeroSubtitle />
            </motion.div>

            <motion.div
              className="flex flex-col items-center lg:items-start gap-4 -mt-3.5 w-full sm:w-auto pointer-events-auto"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.85
              }}
            >
              <div className="flex flex-col items-center lg:items-start -mb-1">
                <div className="h-[2px] w-[130px] bg-white/45 lg:block hidden mb-1.5" />
                <div className="flex items-center gap-2.5">
                  {[
                    {
                      Icon: InstagramLogo,
                      href: "https://instagram.com",
                      baseColor: "text-pink-500",
                      borderColor: "border-pink-500/30",
                      glowColor: "shadow-[0_0_12px_rgba(236,72,153,0.3)]",
                      hoverGlow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                    },
                    {
                      Icon: EnvelopeSimple,
                      href: "mailto:contato@aion.digital",
                      baseColor: "text-blue-400",
                      borderColor: "border-blue-400/30",
                      glowColor: "shadow-[0_0_12px_rgba(96,165,250,0.3)]",
                      hoverGlow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]"
                    },
                    {
                      Icon: WhatsappLogo,
                      href: "https://wa.me/message/SEULINKAQUI",
                      baseColor: "text-emerald-400",
                      borderColor: "border-emerald-400/30",
                      glowColor: "shadow-[0_0_12px_rgba(52,211,153,0.3)]",
                      hoverGlow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                    }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border ${social.borderColor} transition-all duration-300 hover:scale-110 hover:bg-white/[0.1] ${social.baseColor} ${social.glowColor} ${social.hoverGlow}`}
                    >
                      <social.Icon size={19} weight="duotone" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2">
                <ActionNode />
                <a
                  href="#services"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 h-[52px] px-8 rounded-2xl bg-sky-500/10 backdrop-blur-3xl border border-sky-400/25 text-[13px] font-semibold text-white transition-all duration-500 hover:bg-sky-500/20 hover:border-sky-400/50 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 pointer-events-auto shadow-[0_0_20px_rgba(56,189,248,0.08)] hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] overflow-hidden"
                  style={montserrat}
                >
                  {/* 1. High-Definition Glass: Edge Highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* 2. Soft Light Pulse: Hover Aura */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />

                  {/* 3. Subtle HUD Shimmer: Natural Leak */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

                  <span className="relative z-10 flex items-center gap-2.5 uppercase tracking-[0.16em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.1)] group-hover:text-white transition-all duration-500">
                    Ver soluções
                    <ArrowRight size={18} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1 text-sky-300 group-hover:text-white" />
                  </span>
                </a>
              </div>
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

function ArrowIcon() {
  return (
    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
      {"->"}
    </span>
  );
}
