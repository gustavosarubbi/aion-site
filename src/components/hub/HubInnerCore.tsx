"use client";

import React from "react";

interface HubInnerCoreProps {
  innerRef?: React.RefObject<HTMLDivElement | null>;
  shouldAnimate?: boolean;
}

export function HubInnerCore({ innerRef, shouldAnimate = true }: HubInnerCoreProps) {
  return (
    <div
      className="relative z-20 w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 60%, rgba(15, 23, 42, 0.95) 100%)",
        border: "1px solid rgba(34, 211, 238, 0.8)",
        boxShadow: `
          0 0 20px rgba(34, 211, 238, 0.4),
          0 0 40px rgba(34, 211, 238, 0.2),
          0 0 60px rgba(34, 211, 238, 0.1),
          inset 0 0 30px rgba(34, 211, 238, 0.15)
        `,
        backdropFilter: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {/* Decorative Outer Dashed Ring - Neon intensificado */}
      <div
        className={
          shouldAnimate
            ? "absolute inset-2 rounded-full border-[0.5px] border-cyan-400/60 border-dashed animate-[spin_50s_linear_infinite]"
            : "absolute inset-2 rounded-full border-[0.5px] border-cyan-400/60 border-dashed"
        }
        style={{
          boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)",
        }}
      />
      <div
        className={
          shouldAnimate
            ? "absolute inset-5 rounded-full border-[0.5px] border-cyan-500/40 border-dotted animate-[spin_35s_linear_infinite_reverse]"
            : "absolute inset-5 rounded-full border-[0.5px] border-cyan-500/40 border-dotted"
        }
        style={{
          boxShadow: "inset 0 0 10px rgba(34, 211, 238, 0.2)",
        }}
      />

      {/* The Central Symbol - Stacked Diamonds */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Stacked Diamonds Icon */}
        <div ref={innerRef} className="flex flex-col items-center justify-center mb-1">
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" className="md:w-[64px] md:h-[64px]" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.3))' }}>
            {/* Top Diamond */}
            <path d="M32 12 L50 22 L32 32 L14 22 Z" stroke="#22d3ee" strokeWidth="3" strokeLinejoin="round" opacity="0.95" />
            {/* Middle Chevron */}
            <path d="M14 30 L32 40 L50 30" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            {/* Bottom Chevron */}
            <path d="M14 40 L32 50 L50 40" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
          </svg>
        </div>

        {/* Hub Text */}
        <span className="text-cyan-400/90 font-extrabold tracking-[0.35em] text-[10px] md:text-xs" style={{ textShadow: '0 0 6px rgba(34,211,238,0.3)' }}>
          H U B
        </span>
      </div>
    </div>
  );
}
