"use client";

import { motion } from "framer-motion";

export function HubDataFlowRings({ shouldAnimate = true }: { shouldAnimate?: boolean }) {
  return (
    <>
      {/* Dynamic Circuit Trace Rings - Strengthened Opacities */}
      {[
        { r: 49, d: 20, col: "rgba(34, 211, 238, 0.5)", dash: "2 18", s: 0.15 },
        { r: 48, d: 15, col: "rgba(34, 211, 238, 0.7)", dash: "40 60", s: 0.25, rev: true },
        { r: 19, d: 10, col: "rgba(34, 211, 238, 0.8)", dash: "5 5", s: 0.35 },
      ].map((cfg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: shouldAnimate ? (cfg.rev ? -360 : 360) : 0 }}
          transition={shouldAnimate ? { duration: cfg.d, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r={cfg.r}
              fill="none"
              stroke={cfg.col}
              strokeWidth={cfg.s}
              strokeDasharray={cfg.dash}
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}
