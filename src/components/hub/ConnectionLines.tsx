"use client";

import { motion } from "framer-motion";
import { Integration, ConnectionPath } from "./types";

interface ConnectionLinesProps {
  paths: ConnectionPath[];
  integrations: Integration[];
  hoveredCard: number | null;
}

export function ConnectionLines({ paths, integrations, hoveredCard }: ConnectionLinesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 hidden lg:block overflow-visible opacity-90">
      <svg width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <filter id="glow-circuit" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((line) => {
          const item = integrations[line.id];
          const isActive = hoveredCard === line.id;

          return (
            <g key={line.id}>
              {/* Multiple tangled wires for organic look */}
              {/* Wire 1 - Main path */}
              <path d={line.path} fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.5" />
              {/* Wire 2 - Offset for tangled effect */}
              <path
                d={line.path}
                fill="none"
                stroke="rgba(34, 211, 238, 0.08)"
                strokeWidth="2.5"
                style={{ transform: 'translate(2px, 1px)' }}
              />
              {/* Wire 3 - Thin accent line */}
              <path
                d={line.path}
                fill="none"
                stroke={item.accent}
                strokeWidth="0.5"
                opacity="0.3"
              />

              {/* Active Glowing Line with stronger presence */}
              <path
                d={line.path}
                fill="none"
                stroke={isActive ? item.accent : "transparent"}
                strokeWidth={isActive ? "3" : "1"}
                className="transition-colors duration-300"
                style={{ filter: isActive ? "url(#glow-circuit)" : "none" }}
              />

              {/* Subtle ambient data flow - always visible */}
              <motion.path
                d={line.path}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="8 120"
                animate={{ strokeDashoffset: [128, 0] }}
                transition={{ duration: 3 + line.id * 0.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d={line.path}
                fill="none"
                stroke={item.accent}
                strokeWidth="0.5"
                strokeDasharray="3 60"
                animate={{ strokeDashoffset: [63, 0] }}
                transition={{ duration: 2 + line.id * 0.3, repeat: Infinity, ease: "linear", delay: line.id * 0.2 }}
                opacity="0.4"
              />

              {/* Moving Streaming Beams - Enhanced on hover */}
              {isActive && (
                <>
                  <motion.path
                    d={line.path}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeDasharray="15 150"
                    animate={{ strokeDashoffset: [165, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    filter="url(#glow-circuit)"
                  />
                  <motion.path
                    d={line.path}
                    fill="none"
                    stroke={item.accent}
                    strokeWidth="1.5"
                    strokeDasharray="4 80"
                    animate={{ strokeDashoffset: [84, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear", delay: 0.2 }}
                    filter="url(#glow-circuit)"
                    opacity="0.9"
                  />
                </>
              )}

            {/* Half-circle dot - positioned at card border (bottom half visible, aligned with card edge) */}
            {/* Normal state - semicircle at card border (only bottom half shows, creating a 'half-dot' look) */}
            {!isActive && (
              <>
                {/* Bottom half - filled with accent color, clipped to show only bottom half */}
                <path
                  d={`M ${line.cx - 5} ${line.cy} A 5 5 0 0 0 ${line.cx + 5} ${line.cy} Z`}
                  fill={item.accent}
                  opacity="0.7"
                />
              </>
            )}
            {/* Active/Hover state - full filled circle positioned ABOVE the card */}
            {isActive && (
              <>
                {/* Full filled circle - positioned above the card border */}
                <circle
                  cx={line.cx}
                  cy={line.cy - 12}
                  r="6"
                  fill={item.accent}
                  filter="url(#glow-circuit)"
                />
                {/* Pulse animation - expanding from the full circle */}
                <circle
                  cx={line.cx}
                  cy={line.cy - 12}
                  r="10"
                  fill="none"
                  stroke={item.accent}
                  strokeWidth="1.5"
                  opacity="0.5"
                >
                  <animate attributeName="r" values="8;16;8" dur="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </>
            )}

              {/* Hub Origin Point - Visual indicator where wires emerge */}
              {isActive && (
                <>
                  {/* Hub connection point glow */}
                  <circle
                    cx={line.hx}
                    cy={line.hy}
                    r="6"
                    fill="none"
                    stroke={item.accent}
                    strokeWidth="2"
                    opacity="0.8"
                    filter="url(#glow-circuit)"
                  >
                    <animate attributeName="r" values="4;8;4" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite" />
                  </circle>
                  {/* Hub connector dot */}
                  <circle
                    cx={line.hx}
                    cy={line.hy}
                    r="4"
                    fill={item.accent}
                    filter="url(#glow-circuit)"
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
