"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const heroContent = [
  {
    service: "WEBDESIGN",
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
    service: "CHATBOTS",
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

const longestService = "AUTOMAÇÃO";
const longestOutcome = "ATENDIMENTO";

export default function HeroHeadline() {
  const [index, setIndex] = useState(0);
  const mobileDisplaySize = "text-[clamp(1.64rem,1.31rem+2vw,2.54rem)]";
  const mobileDynamicDisplaySize = "text-[clamp(1.69rem,1.36rem+2.06vw,2.62rem)]";
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
      className="w-full min-[1280px]:max-w-[740px] 2xl:max-w-[780px] flex flex-col items-center min-[1280px]:items-start gap-0.5 overflow-visible"
    >
      <div className="min-[1280px]:hidden w-full mx-auto flex flex-col items-center md:items-start gap-1">
        <h1 className={`block font-black text-blue-200/88 tracking-[-0.02em] leading-[0.92] ${mobileDisplaySize} uppercase text-center md:text-left w-full`}>
          TRANSFORMAMOS
        </h1>

        <motion.div layout className="relative flex items-center justify-center md:justify-start overflow-visible w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {current && (
              <motion.div
                key={`mobile-service-${current.service}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex items-center justify-center py-1"
              >
                <span className="inline-flex flex-col items-center md:items-start w-fit">
                  <span
                    className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-center md:text-left ${mobileDynamicDisplaySize} tracking-[-0.02em] leading-[0.92] uppercase`}
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

        <motion.h1 layout className="flex items-baseline justify-center md:justify-start gap-1.5 sm:gap-2 mt-0.5 w-full">
          <motion.span layout className={`block font-black text-blue-200/88 tracking-[-0.015em] leading-[0.92] ${mobileDisplaySize} uppercase text-center md:text-left`}>
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
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.outcomeGradient || "from-blue-400"} font-black tracking-[-0.015em] text-center md:text-left ${mobileDynamicDisplaySize} leading-[0.92] whitespace-nowrap uppercase`}
                  style={{ filter: `drop-shadow(0 0 7px ${current.colors?.outcomeShadow || "rgba(0,0,0,0)"})` }}
                >
                  {current.outcome}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.h1>
      </div>

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
