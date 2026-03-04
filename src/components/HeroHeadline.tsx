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
  const displaySize = "text-[clamp(1.7rem,1.1rem+2.2vw,4rem)]";

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
      className="w-full lg:max-w-[740px] xl:max-w-[780px] flex flex-col items-center lg:items-start gap-0.5 overflow-visible"
    >
      <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1 sm:gap-x-2 gap-y-0 w-full">
        <span className={`block font-black text-blue-200/85 tracking-tight leading-[0.95] ${displaySize} uppercase`}>
          TRANSFORMAMOS
        </span>

        <div className="relative inline-flex items-end pb-0.5 sm:pb-1">
          <span className={`invisible font-black text-transparent ${displaySize} tracking-tight leading-[0.95] pt-0.5 uppercase`}>
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
                className="absolute inset-x-0 lg:inset-x-auto lg:left-0 flex justify-center lg:justify-start"
              >
                <span className="inline-flex flex-col items-center lg:items-start w-fit">
                  <span
                    className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-center lg:text-left ${displaySize} tracking-tight leading-[0.95] pt-0.5 uppercase`}
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

      <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2 w-full -mt-0.5 sm:-mt-1">
        <span className={`block font-black text-blue-200/85 tracking-tight leading-[0.95] ${displaySize} uppercase`}>
          EM
        </span>

        <div className="relative h-[2.3rem] sm:h-[3.15rem] lg:h-[3.85rem] inline-flex items-center overflow-visible">
          <span className={`invisible font-black text-transparent tracking-tight ${displaySize} leading-[0.95] whitespace-nowrap pt-0.5 uppercase`}>
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
                className={`absolute inset-x-0 lg:inset-x-auto lg:left-0 text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.outcomeGradient || "from-blue-400"} font-black tracking-tight text-center lg:text-left ${displaySize} leading-[0.95] whitespace-nowrap pt-0.5 uppercase`}
                style={{ filter: `drop-shadow(0 0 6px ${current.colors?.outcomeShadow || "rgba(0,0,0,0)"})` }}
              >
                {current.outcome}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </h1>
    </div>
  );
}
