"use client";

import React from "react";

interface HubInnerCoreProps {
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export function HubInnerCore({ innerRef }: HubInnerCoreProps) {
  return (
    <div
      className="relative z-20 w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 100%)",
        border: "1px solid rgba(34, 211, 238, 0.4)",
        boxShadow: `
          0 0 50px rgba(14, 165, 233, 0.3),
          inset 0 0 30px rgba(34, 211, 238, 0.2)
        `,
        backdropFilter: "none",
      }}
    >
      {/* Decorative Outer Dashed Ring (Subtle) */}
      <div className="absolute inset-2 rounded-full border-[0.5px] border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border-[0.5px] border-blue-500/10 border-dotted animate-[spin_40s_linear_infinite_reverse]" />

      {/* The Central Symbol - Stacked Diamonds */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Stacked Diamonds Icon */}
        <div ref={innerRef} className="flex flex-col items-center justify-center mb-1">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="md:w-[72px] md:h-[72px] drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
            {/* Top Diamond */}
            <path d="M32 12 L50 22 L32 32 L14 22 Z" stroke="#22d3ee" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Middle Chevron */}
            <path d="M14 30 L32 40 L50 30" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Bottom Chevron */}
            <path d="M14 40 L32 50 L50 40" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Hub Text */}
        <span className="text-cyan-400 font-extrabold tracking-[0.4em] text-xs md:text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] uppercase">
          H U B
        </span>
      </div>
    </div>
  );
}
