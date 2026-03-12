"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const heroContent = [
  {
    service: "SITES",
    outcome: "CLIENTES",
    colors: {
      text: "from-[#379cfd] via-[#5ec4ff] to-white",
      glow: "rgba(55,156,253,0.45)",
      underline: "from-[#379cfd] via-[#5ec4ff] to-white",
      underlineShadow: "rgba(55,156,253,0.6)",
      outcomeGradient: "from-[#379cfd] via-[#5db8ff] to-white",
      outcomeShadow: "rgba(55,156,253,0.35)"
    }
  },
  {
    service: "ROBÔS DE IA",
    outcome: "ATENDIMENTO",
    colors: {
      text: "from-[#379cfd] via-[#5ec4ff] to-white",
      glow: "rgba(55,156,253,0.40)",
      underline: "from-[#379cfd] via-[#5ec4ff] to-white",
      underlineShadow: "rgba(55,156,253,0.55)",
      outcomeGradient: "from-[#379cfd] via-[#5db8ff] to-white",
      outcomeShadow: "rgba(55,156,253,0.32)"
    }
  },
  {
    service: "AUTOMAÇÃO",
    outcome: "ESCALA",
    colors: {
      text: "from-[#379cfd] via-[#5ec4ff] to-white",
      glow: "rgba(55,156,253,0.42)",
      underline: "from-[#379cfd] via-[#5ec4ff] to-white",
      underlineShadow: "rgba(55,156,253,0.5)",
      outcomeGradient: "from-[#379cfd] via-[#5db8ff] to-white",
      outcomeShadow: "rgba(55,156,253,0.32)"
    }
  },
];

const longestService = "ROBÔS DE IA";
const longestOutcome = "ATENDIMENTO";

export default function HeroHeadline({ tabletSide }: { tabletSide?: "left" | "right" }) {
  const [index, setIndex] = useState(0);
  // Aumentado para destacar mais
  const mobileDisplaySize = "text-[clamp(1.8rem,1.4rem+2vw,3rem)]";
  const mobileDynamicDisplaySize = "text-[clamp(1.9rem,1.5rem+2.1vw,3.2rem)]";

  const tabletDisplaySize = "md:text-[clamp(2.2rem,1.2rem+2.5vw,3.5rem)]";
  const tabletDynamicSize = "md:text-[clamp(2.4rem,1.3rem+2.7vw,3.8rem)]";

  const desktopDisplaySize = "text-[clamp(2.5rem,1.5rem+2vw,4.5rem)]";

  useEffect(() => {
    if (typeof document === "undefined") return;

    let timer: number | null = null;

    const schedule = () => {
      if (timer !== null) {
        window.clearInterval(timer);
      }

      if (document.visibilityState !== "visible") {
        timer = null;
        return;
      }

      timer = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % heroContent.length);
      }, 4200);
    };

    schedule();
    document.addEventListener("visibilitychange", schedule);

    return () => {
      document.removeEventListener("visibilitychange", schedule);
      if (timer !== null) {
        window.clearInterval(timer);
      }
    };
  }, []);

  const current = heroContent[index] || heroContent[0];

  return (
    <div
      style={montserrat}
      className={`w-full md:w-fit min-[1280px]:w-full min-[1280px]:max-w-[780px] flex flex-col items-center min-[1280px]:items-start gap-0.5 overflow-visible ${tabletSide === "left" ? "md:items-start" : "md:items-center"}`}
    >
      {/* MOBILE / TABLET (< 1280px): Stacked layout */}
      <div className={`min-[1280px]:hidden flex flex-col items-center gap-1 ${tabletSide === "left" ? "md:items-start" : "md:items-center"}`}>
        <h1 className={`block font-black text-white/90 tracking-[-0.02em] leading-[0.92] md:leading-[0.9] ${mobileDisplaySize} ${tabletDisplaySize} uppercase text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"}`}>
          CRIAMOS
        </h1>

        <motion.div layout className={`relative flex items-center justify-center overflow-visible w-full ${tabletSide === "left" ? "md:justify-start" : "md:justify-center"}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {current && (
              <motion.div
                key={`mobile-service-${current.service}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={`flex items-center justify-center py-1 ${tabletSide === "left" ? "md:justify-start" : "md:justify-center"}`}
              >
                <span className={`inline-flex flex-col items-center w-fit ${tabletSide === "left" ? "md:items-start" : "md:items-center"}`}>
                  <span
                    className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"} ${mobileDynamicDisplaySize} ${tabletDynamicSize} tracking-[-0.02em] leading-[0.95] md:leading-[0.95] uppercase whitespace-nowrap`}
                    style={{ filter: `drop-shadow(0 0 6px ${current.colors?.glow || "rgba(0,0,0,0)"})` }}
                  >
                    {current.service}
                  </span>
                  <span
                    className={`mt-1 h-[2px] w-full bg-gradient-to-r ${current.colors?.underline || "from-white"} rounded-full`}
                    style={{ boxShadow: `0 0 8px ${current.colors?.underlineShadow || "transparent"}` }}
                  />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h1 layout className={`flex items-baseline justify-center gap-1.5 sm:gap-2 mt-0.5 ${tabletSide === "left" ? "md:justify-start" : "md:justify-center"}`}>
          <motion.span layout className={`block font-black text-white/90 tracking-[-0.015em] leading-[0.92] md:leading-[0.9] ${mobileDisplaySize} ${tabletDisplaySize} uppercase text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"}`}>
            PARA
          </motion.span>
          <div className="relative flex items-baseline overflow-visible">
            <AnimatePresence mode="popLayout" initial={false}>
              {current && (
                <motion.div
                  key={`mobile-outcome-${current.outcome}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.outcomeGradient || "from-blue-400"} font-black tracking-[-0.015em] text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"} ${mobileDynamicDisplaySize} ${tabletDynamicSize} leading-[0.92] md:leading-[0.9] whitespace-nowrap uppercase`}
                  style={{ filter: `drop-shadow(0 0 7px ${current.colors?.outcomeShadow || "rgba(0,0,0,0)"})` }}
                >
                  {current.outcome}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.h1>
      </div>

      {/* DESKTOP (>= 1280px): 2 lines left-aligned */}
      <div className="hidden min-[1280px]:block w-full">
        <h1 className="flex flex-wrap items-center justify-start gap-x-1 sm:gap-x-2 gap-y-0 w-full">
          <span className={`block font-black text-white/90 tracking-tight leading-[0.95] ${desktopDisplaySize} uppercase`}>
            CRIAMOS
          </span>

          <div className="relative inline-flex items-end pb-0.5 sm:pb-1">
            <span className={`invisible font-black text-transparent ${desktopDisplaySize} tracking-tight leading-[0.95] pt-0.5 uppercase`}>
              {longestService}
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              {current && (
                <motion.span
                  key={current.service}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-x-0 left-0 flex justify-start"
                >
                  <span className="inline-flex flex-col items-start w-fit">
                    <span
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-left ${desktopDisplaySize} tracking-tight leading-[0.95] pt-0.5 uppercase whitespace-nowrap`}
                      style={{ filter: `drop-shadow(0 0 5px ${current.colors?.glow || "rgba(0,0,0,0)"})` }}
                    >
                      {current.service}
                    </span>
                    <span
                      className={`mt-1 h-[2px] w-full bg-gradient-to-r ${current.colors?.underline || "from-white"} rounded-full`}
                      style={{ boxShadow: `0 0 8px ${current.colors?.underlineShadow || "transparent"}` }}
                    />
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </h1>

        <h1 className="flex flex-wrap items-baseline justify-start gap-1 sm:gap-2 w-full -mt-0.5 sm:-mt-1">
          <span className={`block font-black text-white/90 tracking-tight leading-[0.95] ${desktopDisplaySize} uppercase`}>
            PARA
          </span>

          <div className="relative inline-flex items-baseline overflow-visible">
            <span className={`invisible font-black text-transparent tracking-tight ${desktopDisplaySize} leading-[0.95] whitespace-nowrap pt-0.5 uppercase`}>
              {longestOutcome}
            </span>

            <AnimatePresence mode="popLayout" initial={false}>
              {current && (
                <motion.div
                  key={current.outcome}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
                  className={`absolute inset-x-0 left-0 text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.outcomeGradient || "from-blue-400"} font-black tracking-tight text-left ${desktopDisplaySize} leading-[0.95] whitespace-nowrap pt-0.5 uppercase`}
                  style={{ filter: `drop-shadow(0 0 6px ${current.colors?.outcomeShadow || "rgba(0,0,0,0)"})` }}
                >
                  {current.outcome}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </h1>
      </div>
    </div>
  );
}
