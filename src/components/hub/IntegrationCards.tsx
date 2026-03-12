"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Integration } from "./types";
import { montserrat } from "./constants";

interface IntegrationCardsProps {
  integrations: Integration[];
  hoveredCard: number | null;
  onHover: (index: number | null) => void;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function IntegrationCards({ integrations, hoveredCard, onHover, cardRefs }: IntegrationCardsProps) {
  return (
    <div className="w-full mt-auto relative z-20 pb-4 pt-8">
      {/* Subtle top border line to unify the stripe conceptually without a full background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 relative z-30 mt-4">
        {integrations.map((item, idx) => {
          const isHovered = hoveredCard === idx;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={() => onHover(null)}
              className="relative group cursor-pointer"
            >
              <div
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="relative px-5 py-4 rounded-[20px] flex items-center gap-4 transition-all duration-300 overflow-hidden"
                style={{
                  background: "rgba(10, 15, 30, 0.4)",
                  border: "1px solid rgba(255,255,255,0.03)",
                  borderTopColor: "rgba(34, 211, 238, 0.1)",
                  borderLeftColor: "rgba(34, 211, 238, 0.05)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(40px)",
                  transform: isHovered ? "scale(1.02) translateY(-2px)" : "none",
                  zIndex: 20
                }}
              >
                {/* Hover subtle glow outline */}
                <div
                  className="absolute inset-0 rounded-[20px] border border-transparent transition-colors duration-300 pointer-events-none"
                  style={{
                    borderColor: isHovered ? `${item.accent}30` : 'transparent',
                    boxShadow: isHovered ? `inset 0 0 20px ${item.accent}10` : 'none'
                  }}
                />

                {/* Icon container */}
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 z-10 transition-all duration-300"
                  style={{
                    background: "rgba(15, 20, 35, 0.8)",
                    border: `1px solid rgba(255,255,255,0.05)`,
                    boxShadow: `inset 0 2px 10px rgba(255,255,255,0.02)`,
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: item.name === "OpenAI" || item.name === "WhatsApp API" || item.name === "n8n" || item.name === "AWS" ? "brightness(0) invert(1)" : undefined }}
                  />
                </div>

                {/* Text Box */}
                <div className="z-10 flex-1 min-w-0 pr-2">
                  <h4 className="text-[13px] font-bold text-white tracking-tight" style={montserrat}>
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
