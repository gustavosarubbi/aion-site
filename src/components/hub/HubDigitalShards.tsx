"use client";

import { motion } from "framer-motion";

export function HubDigitalShards() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-90">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + (i * 5), repeat: Infinity, ease: "linear" }}
        >
          <div
            className="bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
            style={{
              width: i % 2 === 0 ? '5px' : '3px',
              height: i % 2 === 0 ? '1.5px' : '3px',
              transform: `translate(${75 + (i * 22)}px, 0) rotate(${i * 45}deg)`,
              opacity: 0.8
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
