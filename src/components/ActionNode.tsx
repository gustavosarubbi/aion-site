"use client";

import { playSfx } from "@/lib/audio";
import { ArrowRight } from "@phosphor-icons/react";

export default function ActionNode() {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playSfx("hover")}
      onClick={() => playSfx("click")}
      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-[46px] lg:h-[48px] xl:h-[48.5px] 2xl:h-[52px] px-2.5 lg:px-3.5 xl:px-3 2xl:px-8 rounded-2xl bg-blue-500/12 backdrop-blur-xl border border-blue-400/20 text-[10.5px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[13px] font-bold text-white transition-all duration-500 hover:bg-blue-500/18 hover:border-blue-400/35 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 overflow-hidden shadow-[0_0_14px_rgba(59,130,246,0.08)] hover:shadow-[0_0_22px_rgba(59,130,246,0.16)]"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {/* 1. Neon Edge Highlight: Pure 1px Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/28 to-transparent pointer-events-none" />

      {/* 2. Soft Aura: Content Pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/[0.05] to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-in-out pointer-events-none" />

      {/* 3. Base Glow: Elegant Bloom */}
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/3 transition-colors duration-500" />

      <span className="relative z-10 flex items-center gap-2.5 tracking-[0.14em] uppercase text-center font-bold group-hover:text-white transition-all duration-500">
        Reservar estratégia
        <ArrowRight size={14} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1 text-blue-300 group-hover:text-white" />
      </span>
    </a>
  );
}
