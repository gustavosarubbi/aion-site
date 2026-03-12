"use client";

import { motion } from "framer-motion";
import { HubBackground } from "./HubBackground";
import { HubGeometricRings } from "./HubGeometricRings";
import { HubWavyFlow } from "./HubWavyFlow";
import { HubDataFlowRings } from "./HubDataFlowRings";
import { HubDigitalShards } from "./HubDigitalShards";
import { HubParticles } from "./HubParticles";
import { HubInnerCore } from "./HubInnerCore";
import { HubStatusLabels } from "./HubStatusLabels";

interface CentralHubProps {
  hubRef?: React.RefObject<HTMLDivElement | null>;
  centerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CentralHub({ hubRef, centerRef }: CentralHubProps) {
  return (
    <div
      ref={hubRef}
      className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] flex items-center justify-center [perspective:2500px]"
    >
      {/* Ground Projection / Shadow (Reinforces depth) */}
      <div className="absolute bottom-[-10%] w-[100%] h-[20%] bg-cyan-900/10 blur-[100px] rounded-full [transform:rotateX(80deg)_translateZ(-150px)] pointer-events-none" />

      {/* 3D Scene Wrapper - NOW FLAT */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: 0, rotateY: 0, scale: 1.05 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        {/* Core Shadow (Hole depth) */}
        <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full bg-black/95 [filter:blur(60px)] [transform:translateZ(-60px)]" />

        {/* Volumetric Torus Body - More distinct layering */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-[0.8px]"
            style={{
              transform: `translateZ(${i * 12 - 40}px) scale(${1 - i * 0.008})`,
              borderColor: `rgba(34, 211, 238, ${0.05 + (i * 0.04)})`,
              boxShadow: i === 4 ? '0 0 100px rgba(34, 211, 238, 0.3), inset 0 0 50px rgba(34, 211, 238, 0.15)' : 'none',
              background: i === 4 ? 'radial-gradient(circle, transparent 75%, rgba(34, 211, 238, 0.05) 100%)' : 'none'
            }}
          />
        ))}

        {/* Technical Detail Rim Plates */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`plate-${i}`}
            className="absolute w-full h-full border-[10px] border-transparent border-t-cyan-400/30 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateZ(32px)`,
              clipPath: 'inset(0 88% 88% 0)',
              opacity: 0.8
            }}
          />
        ))}

        {/* Orbital Energy Nodes - BRINGING EVEN CLOSER FOR HARMONY */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
            animate={{ rotate: 360 }}
            transition={{ duration: 25 + (i * 3), repeat: Infinity, ease: "linear" }}
            style={{
              transform: `rotate(${i * 30}deg) translate(180px, 0)`,
              width: i % 3 === 0 ? '4px' : '2.5px',
              height: i % 3 === 0 ? '4px' : '2.5px',
              opacity: 0.85
            }}
          />
        ))}

        <div className="absolute inset-0 [transform-style:preserve-3d]">
          <HubBackground />
          <HubGeometricRings />
          <HubWavyFlow />
          <HubDataFlowRings />
          <HubDigitalShards />
          <HubParticles />
        </div>

        {/* Inner Hub Symbol */}
        <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(50px)]">
          <HubInnerCore innerRef={centerRef} />
        </div>

        <HubStatusLabels />
      </motion.div>
    </div>
  );
}
