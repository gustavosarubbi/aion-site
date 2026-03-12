"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FlowPathData } from "./types";

export function HubWavyFlow() {
  const bundles = 8;
  const pathsPerBundle = 4;

  const flowData = useRef<FlowPathData[][]>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (flowData.current.length === 0) {
    flowData.current = [...Array(bundles)].map((_, bIdx) => {
      const baseAngle = (bIdx * (360 / bundles)) * (Math.PI / 180);
      return [...Array(pathsPerBundle)].map((_, pIdx) => {
        const angleOffset = (Math.random() - 0.5) * 0.35;
        const angle = baseAngle + angleOffset;
        const rLink = 48;
        const rCore = 0;
        const x1 = 50 + rLink * Math.cos(angle);
        const y1 = 50 + rLink * Math.sin(angle);
        const x2 = 50 + rCore * Math.cos(angle);
        const y2 = 50 + rCore * Math.sin(angle);
        const curve1 = 0.3 + Math.random() * 0.5;
        const curve2 = 0.3 + Math.random() * 0.5;
        const cp1x = 50 + (rLink - 12) * Math.cos(angle + curve1);
        const cp1y = 50 + (rLink - 12) * Math.sin(angle + curve1);
        const cp2x = 50 + (rCore + 18) * Math.cos(angle - curve2);
        const cp2y = 50 + (rCore + 18) * Math.sin(angle - curve2);

        const isThick = Math.random() > 0.7;
        return {
          pathD: `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`,
          thickness: isThick ? 0.4 : 0.15,
          opacity: isThick ? 0.25 : 0.12,
          speed: 15 + Math.random() * 10,
          isThick,
          pIdx
        };
      });
    });
  }

  return (
    <div className="absolute inset-0 pointer-events-none [transform-style:preserve-3d]">
      <svg viewBox="0 0 100 100" className="w-full h-full [transform:translateZ(15px)]">
        {flowData.current.map((bundle, bIdx) => (
          <g key={`bundle-${bIdx}`}>
            {bundle.map((path, pIdx) => (
              <g key={`path-${bIdx}-${pIdx}`}>
                {/* Underlying Tangled Path */}
                <path
                  d={path.pathD}
                  fill="none"
                  stroke="rgba(34, 211, 238, 1)"
                  strokeWidth={path.thickness}
                  strokeOpacity={path.opacity}
                />

                {/* High-Tech Streaming Beams (Dash Offset Animation) */}
                <motion.path
                  d={path.pathD}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={path.thickness * 1.8}
                  strokeDasharray="6 200"
                  animate={{ strokeDashoffset: [206, 0] }}
                  transition={{
                    duration: path.speed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: (bIdx * 0.5) + (pIdx * 0.1)
                  }}
                  style={{
                    filter: "drop-shadow(0 0 3px #22d3ee)",
                    opacity: 0.9
                  }}
                />

                {/* Secondary Faster Stream for depth */}
                {path.isThick && (
                  <motion.path
                    d={path.pathD}
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.8)"
                    strokeWidth={path.thickness * 0.5}
                    strokeDasharray="2 120"
                    animate={{ strokeDashoffset: [122, 0] }}
                    transition={{
                      duration: path.speed * 0.6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random()
                    }}
                  />
                )}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
