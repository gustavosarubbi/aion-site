"use client";
import { memo } from "react";
import { HubBackground } from "./HubBackground";
import { HubGeometricRings } from "./HubGeometricRings";
import { HubWavyFlow } from "./HubWavyFlow";
import { HubOrbitals } from "./HubOrbitals";
import { HubOrbitingElements } from "./HubOrbitingElements";

import { HubInnerCore } from "./HubInnerCore";

interface CentralHubProps {
  hubRef?: React.RefObject<HTMLDivElement | null>;
  centerRef?: React.RefObject<HTMLDivElement | null>;
  shouldAnimate?: boolean;
  liteMode?: boolean;
  showEdgePulses?: boolean;
}

export const CentralHub = memo(function CentralHub({ hubRef, centerRef, shouldAnimate = true, liteMode = false, showEdgePulses = true }: CentralHubProps) {
  const animate = shouldAnimate && !liteMode;
  const ringLayers = liteMode ? 5 : 8; // Mais camadas para efeito torus

  return (
    <div
      ref={hubRef}
      className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] flex items-center justify-center [perspective:2500px]"
    >
      {/* 3D Scene Wrapper */}
      <div
        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
        style={{ transform: animate ? "scale(1.02)" : "scale(1)", transition: "transform 1400ms ease-out" }}
      >
        {/* TORUS EFFECT - Estrutura em camadas tipo rosquinha */}
        {/* Camada 1: Exterior - borda grossa com neon sutil */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: "2px solid rgba(34, 211, 238, 0.5)",
            transform: "translateZ(25px) scale(0.95)",
            boxShadow: `
              0 0 15px rgba(34, 211, 238, 0.2),
              inset 0 0 20px rgba(34, 211, 238, 0.08)
            `,
            background: "radial-gradient(circle at center, transparent 70%, rgba(34, 211, 238, 0.03) 100%)",
          }}
        />

        {/* Camada 2: Meio - depressão central (efeito poço) */}
        <div
          className="absolute inset-[5%] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(34, 211, 238, 0.3)",
            transform: "translateZ(15px) scale(0.92)",
            background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 30%, transparent 70%)",
            boxShadow: "inset 0 0 30px rgba(34, 211, 238, 0.05)",
          }}
        />

        {/* Camada 3: Anel intermediário com neon */}
        <div
          className="absolute inset-[10%] rounded-full pointer-events-none"
          style={{
            border: "1.5px solid rgba(34, 211, 238, 0.4)",
            transform: "translateZ(20px) scale(0.88)",
            boxShadow: "0 0 12px rgba(34, 211, 238, 0.15)",
          }}
        />

        {/* Camada 4: Interior - borda fina */}
        <div
          className="absolute inset-[15%] rounded-full pointer-events-none"
          style={{
            border: "1px solid rgba(34, 211, 238, 0.25)",
            transform: "translateZ(10px) scale(0.85)",
            background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, transparent 60%)",
          }}
        />

        {/* Camada 5: Fundo do poço - escuro */}
        <div
          className="absolute inset-[20%] rounded-full pointer-events-none"
          style={{
            border: "0.5px solid rgba(34, 211, 238, 0.15)",
            transform: "translateZ(0px) scale(0.8)",
            background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)",
            boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.5)",
          }}
        />

        {/* Camadas volumétricas adicionais para profundidade */}
        {[...Array(ringLayers)].map((_, i) => {
          const zDepth = (i - ringLayers / 2) * 8;
          const opacity = i === 0 || i === ringLayers - 1 ? 0.35 : 0.08 + (i * 0.03);
          const scale = 0.9 - (i * 0.02);
          const isEdge = i === 0 || i === ringLayers - 1;
          
          return (
            <div
              key={i}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                transform: `translateZ(${zDepth}px) scale(${scale})`,
                border: `${isEdge ? 1.2 : 0.5}px solid rgba(34, 211, 238, ${opacity})`,
                boxShadow: isEdge 
                  ? `0 0 ${8 + i * 2}px rgba(34, 211, 238, ${0.12 - i * 0.01})`
                  : 'none',
                background: i === Math.floor(ringLayers / 2) 
                  ? 'radial-gradient(circle, transparent 60%, rgba(34, 211, 238, 0.04) 100%)' 
                  : 'none',
              }}
            />
          );
        })}

        {/* Container dos elementos orbitais - DEVE vir antes dos outros elementos */}
        <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(30px)" }}>
          <HubOrbitingElements liteMode={liteMode} shouldAnimate={animate} />
        </div>

        {/* Outros componentes do hub */}
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          <HubBackground liteMode={liteMode} />
          <HubGeometricRings liteMode={liteMode} shouldAnimate={shouldAnimate} />
          <HubOrbitals liteMode={liteMode} shouldAnimate={shouldAnimate} />
          {showEdgePulses && <HubWavyFlow shouldAnimate={shouldAnimate} />}
        </div>

        {/* Inner Hub Symbol */}
        <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(50px)]">
          <HubInnerCore innerRef={centerRef} shouldAnimate={animate} />
        </div>
      </div>
    </div>
  );
});
