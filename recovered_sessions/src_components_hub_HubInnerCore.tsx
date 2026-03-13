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

      {/* Hexágono Gigante Central */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div ref={innerRef} className="flex flex-col items-center justify-center mb-1">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 100 100" 
            fill="none" 
            className="md:w-[100px] md:h-[100px]"
            style={{ 
              filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.6)) drop-shadow(0 0 24px rgba(34,211,238,0.3))'
            }}
          >
            {/* Hexágono externo - contorno principal */}
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Hexágono interno - camada 1 */}
            <polygon
              points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Hexágono interno - camada 2 */}
            <polygon
              points="50,25 70,36.25 70,63.75 50,75 30,63.75 30,36.25"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* Ponto central */}
            <circle cx="50" cy="50" r="4" fill="#22d3ee" opacity="0.95">
              {shouldAnimate && (
                <animate
                  attributeName="opacity"
                  values="0.95;0.6;0.95"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            
            {/* Linhas conectando centro aos vértices */}
            <line x1="50" y1="50" x2="50" y2="5" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="50" y1="50" x2="90" y2="27.5" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="50" y1="50" x2="90" y2="72.5" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="50" y1="50" x2="50" y2="95" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="50" y1="50" x2="10" y2="72.5" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="50" y1="50" x2="10" y2="27.5" stroke="#22d3ee" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>

        {/* Hub Text */}
        <span 
          className="text-cyan-400 font-extrabold tracking-[0.35em] text-[10px] md:text-xs" 
          style={{ 
            textShadow: '0 0 8px rgba(34,211,238,0.5), 0 0 16px rgba(34,211,238,0.3)'
          }}
        >
          H U B
        </span>
      </div>
    </div>
  );
}
