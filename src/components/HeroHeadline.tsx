"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const heroContent = [
  {
    service: "DESIGN ELITE",
    outcome: "RESULTADOS",
    colors: {
      text: "from-[#b8f3ff] via-[#67dcff] to-[#2f94ff]",
      glow: "rgba(56,189,248,0.36)",
      underline: "from-cyan-300/85 via-sky-300/70 to-blue-400/35",
      underlineShadow: "rgba(34,211,238,0.55)",
      outcomeGradient: "from-[#c6f6ff] via-[#6fd7ff] to-[#348bff]",
      outcomeShadow: "rgba(56,189,248,0.32)"
    }
  },
  {
    service: "ROBÔS I.A.",
    outcome: "ATENDIMENTO",
    colors: {
      text: "from-[#d2f7ff] via-[#7ae0ff] to-[#37a8ff]",
      glow: "rgba(34,211,238,0.34)",
      underline: "from-cyan-300/85 via-sky-300/70 to-blue-400/35",
      underlineShadow: "rgba(34,211,238,0.52)",
      outcomeGradient: "from-[#d9f9ff] via-[#8be4ff] to-[#4d9bff]",
      outcomeShadow: "rgba(34,211,238,0.3)"
    }
  },
  {
    service: "AUTOMAÇÃO",
    outcome: "ESCALA",
    colors: {
      text: "from-[#c7f5ff] via-[#74d5ff] to-[#3a8dff]",
      glow: "rgba(59,130,246,0.34)",
      underline: "from-sky-300/85 via-cyan-300/70 to-blue-400/35",
      underlineShadow: "rgba(56,189,248,0.52)",
      outcomeGradient: "from-[#d3f8ff] via-[#7fdfff] to-[#4a88ff]",
      outcomeShadow: "rgba(59,130,246,0.3)"
    }
  },
];

const longestService = "DESIGN ELITE";
const longestOutcome = "ATENDIMENTO";

export default function HeroHeadline({ tabletSide }: { tabletSide?: "left" | "right" }) {
  const [index, setIndex] = useState(0);
  const mobileDisplaySize = "text-[clamp(1.64rem,1.31rem+2vw,2.54rem)]";
  const mobileDynamicDisplaySize = "text-[clamp(1.69rem,1.36rem+2.06vw,2.62rem)]";

  // Specific scaling for the 768-1279 range where it's split in a 2-column block
  // More modest headline for tablet to allow right column to breathe and balance
  const tabletDisplaySize = "md:text-[clamp(1.85rem,1rem+2vw,2.75rem)]";
  const tabletDynamicSize = "md:text-[clamp(1.95rem,1.1rem+2.1vw,2.9rem)]";

  const desktopDisplaySize = "text-[clamp(1.85rem,1.2rem+1.95vw,4rem)]";

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
        <h1 className={`block font-black text-blue-200/88 tracking-[-0.02em] leading-[0.92] md:leading-[0.9] ${mobileDisplaySize} ${tabletDisplaySize} uppercase text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"}`}>
          TRANSFORMAMOS
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
                    className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"} ${mobileDynamicDisplaySize} ${tabletDynamicSize} tracking-[-0.02em] leading-[0.92] md:leading-[0.9] uppercase`}
                    style={{ filter: `drop-shadow(0 0 6px ${current.colors?.glow || "rgba(0,0,0,0)"})` }}
                  >
                    {current.service}
                  </span>
                  <span
                    className={`mt-0.5 h-[2px] w-full bg-gradient-to-r ${current.colors?.underline || "from-white"}`}
                    style={{ boxShadow: `0 0 7px ${current.colors?.underlineShadow || "transparent"}` }}
                  />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h1 layout className={`flex items-baseline justify-center gap-1.5 sm:gap-2 mt-0.5 ${tabletSide === "left" ? "md:justify-start" : "md:justify-center"}`}>
          <motion.span layout className={`block font-black text-blue-200/88 tracking-[-0.015em] leading-[0.92] md:leading-[0.9] ${mobileDisplaySize} ${tabletDisplaySize} uppercase text-center ${tabletSide === "left" ? "md:text-left" : "md:text-center"}`}>
            EM
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
          <span className={`block font-black text-blue-200/85 tracking-tight leading-[0.95] ${desktopDisplaySize} uppercase`}>
            TRANSFORMAMOS
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
                      className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-left ${desktopDisplaySize} tracking-tight leading-[0.95] pt-0.5 uppercase`}
                      style={{ filter: `drop-shadow(0 0 5px ${current.colors?.glow || "rgba(0,0,0,0)"})` }}
                    >
                      {current.service}
                    </span>
                    <span
                      className={`mt-0.5 h-[2px] w-full bg-gradient-to-r ${current.colors?.underline || "from-white"}`}
                      style={{ boxShadow: `0 0 6px ${current.colors?.underlineShadow || "transparent"}` }}
                    />
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </h1>

        <h1 className="flex flex-wrap items-baseline justify-start gap-1 sm:gap-2 w-full -mt-0.5 sm:-mt-1">
          <span className={`block font-black text-blue-200/85 tracking-tight leading-[0.95] ${desktopDisplaySize} uppercase`}>
            EM
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
