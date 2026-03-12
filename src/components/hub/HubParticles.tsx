"use client";

import { motion } from "framer-motion";

export function HubParticles() {
  return (
    <>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full"
          animate={{ rotate: angle + 360 }}
          transition={{ duration: 15 + (i * 2), repeat: Infinity, ease: "linear" }}
        >
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full ${i % 3 === 0 ? 'bg-white shadow-[0_0_6px_#fff]' : 'bg-cyan-400 shadow-[0_0_5px_#22d3ee]'}`}
            style={{
              top: `${0.8 + (i % 4 * 0.4)}%`,
              width: i % 3 === 0 ? '1.2px' : '0.8px',
              height: i % 3 === 0 ? '1.2px' : '0.8px',
              opacity: 0.95
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
