"use client";

import { playSfx } from "@/lib/audio";
import { ArrowRight } from "@phosphor-icons/react";

type ActionNodeProps = {
  compact?: boolean;
};

export default function ActionNode({ compact = false }: ActionNodeProps) {
  // Glassmorphism - Card Azul Principal
  const rootClass = compact
    ? "group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[44px] px-6 rounded-full backdrop-blur-[12px] text-[11px] font-bold text-white tracking-[0.5px] uppercase cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none overflow-hidden"
    : "group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[46px] lg:h-[48px] min-[1280px]:h-[52px] px-5 lg:px-6 min-[1280px]:px-8 rounded-full backdrop-blur-[12px] text-[10px] lg:text-[11px] min-[1280px]:text-[12px] font-bold text-white tracking-[0.5px] uppercase cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none overflow-hidden";

  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playSfx("hover")}
      onClick={() => playSfx("click")}
      className={rootClass}
      style={{ 
        fontFamily: "var(--font-montserrat)",
        background: "linear-gradient(180deg, rgba(59, 130, 246, 0.35) 0%, rgba(37, 99, 235, 0.25) 50%, rgba(29, 78, 216, 0.2) 100%)",
        border: "1px solid rgba(147, 197, 253, 0.5)",
        borderBottom: "2px solid rgba(130, 220, 255, 0.9)",
        boxShadow: "inset 0px -15px 25px -10px rgba(96, 165, 250, 0.6), 0px 8px 32px rgba(37, 99, 235, 0.4), 0px 4px 15px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* Internal Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: "radial-gradient(ellipse at 50% 0%, rgba(191, 219, 254, 0.3) 0%, transparent 50%)"
        }}
      />
      
      {/* Hover state */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        style={{ 
          background: "linear-gradient(180deg, rgba(59, 130, 246, 0.45) 0%, rgba(37, 99, 235, 0.35) 50%, rgba(29, 78, 216, 0.3) 100%)",
          boxShadow: "inset 0px -15px 25px -10px rgba(96, 165, 250, 0.8), 0px 12px 40px rgba(37, 99, 235, 0.5), 0px 4px 15px rgba(0, 0, 0, 0.3)"
        }}
      />

      <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
        RESERVAR ESTRATÉGIA
        <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}
