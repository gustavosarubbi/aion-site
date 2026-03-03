"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const heroContent = [
  {
    service: "WEBDESIGN",
    outcome: "RESULTADOS",
    colors: {
      text: "from-[#99e9ff] via-[#57c9ff] to-[#357dff]",
      glow: "rgba(56,189,248,0.36)",
      underline: "from-cyan-300/85 via-sky-300/70 to-blue-400/35",
      underlineShadow: "rgba(34,211,238,0.55)",
      outcomeGradient: "from-[#98e7ff] via-[#4eb8ff] to-[#2b67e9]",
      outcomeShadow: "rgba(56,189,248,0.32)"
    }
  },
  {
    service: "CHATBOTS",
    outcome: "ATENDIMENTO",
    colors: {
      text: "from-[#d8b4fe] via-[#a855f7] to-[#7c3aed]",
      glow: "rgba(168,85,247,0.36)",
      underline: "from-purple-300/85 via-fuchsia-300/70 to-violet-400/35",
      underlineShadow: "rgba(168,85,247,0.55)",
      outcomeGradient: "from-[#e9d5ff] via-[#c084fc] to-[#9333ea]",
      outcomeShadow: "rgba(168,85,247,0.32)"
    }
  },
  {
    service: "AUTOMAÇÃO",
    outcome: "ESCALA",
    colors: {
      text: "from-[#fdba74] via-[#f97316] to-[#ea580c]",
      glow: "rgba(249,115,22,0.36)",
      underline: "from-orange-300/85 via-amber-300/70 to-orange-400/35",
      underlineShadow: "rgba(249,115,22,0.55)",
      outcomeGradient: "from-[#fed7aa] via-[#fb923c] to-[#f97316]",
      outcomeShadow: "rgba(249,115,22,0.32)"
    }
  },
];

const longestService = "AUTOMAÇÃO";
const longestOutcome = "ATENDIMENTO";

export default function HeroHeadline() {
  const [index, setIndex] = useState(0);

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
                    className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.text || "from-blue-400"} text-center lg:text-left text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] tracking-tight leading-none pt-0.5 uppercase`}
                    style={{ filter: `drop-shadow(0 0 8px ${current.colors?.glow || "rgba(0,0,0,0)"})` }}
                  >
                    {current.service}
                  </span>
                  <span
                    className={`mt-0.5 h-[2px] w-full bg-gradient-to-r ${current.colors?.underline || "from-white"}`}
                    style={{ boxShadow: `0 0 12px ${current.colors?.underlineShadow || "transparent"}` }}
                  />
                </span>
              </motion.span>
            )}
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
            {current && (
              <motion.div
                key={current.outcome}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
                className={`absolute inset-x-0 lg:inset-x-auto lg:left-0 text-transparent bg-clip-text bg-gradient-to-r ${current.colors?.outcomeGradient || "from-blue-400"} font-black tracking-tight text-center lg:text-left text-[1.8rem] sm:text-[2.5rem] lg:text-[3rem] leading-none whitespace-nowrap pt-0.5 uppercase`}
                style={{ filter: `drop-shadow(0 0 9px ${current.colors?.outcomeShadow || "rgba(0,0,0,0)"})` }}
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
