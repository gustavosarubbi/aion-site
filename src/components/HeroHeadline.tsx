"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
