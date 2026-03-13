"use client";

interface HubGeometricRingsProps {
  liteMode?: boolean;
  shouldAnimate?: boolean;
}

export function HubGeometricRings({ liteMode = false, shouldAnimate = true }: HubGeometricRingsProps) {
  const ticks = liteMode ? 24 : 60;

  return (
    <>
      {/* Precision Circular Ticks - Spherical Perfect Symmetry */}
      <div className="absolute inset-0 flex items-center justify-center opacity-85 [transform:translateZ(10px)]">
        <svg viewBox="0 0 100 100" className="w-[100%] h-[100%]">
          {[...Array(ticks)].map((_, i) => {
            const isMajor = i % (liteMode ? 6 : 10) === 0;
            const h = isMajor ? 4 : 2;
            return (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2={2 + h}
                stroke={isMajor ? "rgba(34, 211, 238, 0.95)" : "rgba(34, 211, 238, 0.6)"}
                strokeWidth={isMajor ? "0.4" : "0.2"}
                transform={`rotate(${i * (360 / ticks)} 50 50)`}
              />
            );
          })}
      {/* Symmetrical Outer Detail Ring */}
      <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.15" strokeDasharray="1 3" />
      {/* Main Perfect Boundary Ring */}
      <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(34, 211, 238, 0.7)" strokeWidth="0.15" />
      <circle cx="50" cy="50" r="47.8" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="0.15" strokeDasharray="6 26">
        {shouldAnimate && (
          <animate
            attributeName="stroke-dashoffset"
            values="0;320"
            dur={liteMode ? "34s" : "22s"}
            repeatCount="indefinite"
          />
        )}
      </circle>
      
      {/* Anel rotativo rápido - tracejado */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.12" strokeDasharray="3 9">
        {shouldAnimate && (
          <animate
            attributeName="stroke-dashoffset"
            values="0;96"
            dur={liteMode ? "18s" : "12s"}
            repeatCount="indefinite"
          />
        )}
      </circle>
      
      {/* Anel rotativo médio - pontilhado sentido oposto */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.1" strokeDasharray="1 4">
        {shouldAnimate && (
          <animate
            attributeName="stroke-dashoffset"
            values="96;0"
            dur={liteMode ? "27s" : "18s"}
            repeatCount="indefinite"
          />
        )}
      </circle>
      
      {/* Anel rotativo lento - sólido com gaps */}
      <circle cx="50" cy="50" r="43.5" fill="none" stroke="rgba(34, 211, 238, 0.35)" strokeWidth="0.12" strokeDasharray="15 35">
        {shouldAnimate && (
          <animate
            attributeName="stroke-dashoffset"
            values="0;200"
            dur={liteMode ? "45s" : "30s"}
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  </div>

{/* Layered Spherical Infrastructure - Glows & Technical Depth */}
    <div className="absolute inset-0 flex items-center justify-center opacity-70 [transform:translateZ(-10px)]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(34, 211, 238, 0.75)" strokeWidth="0.15" strokeDasharray="1 15" />
        {!liteMode && <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(34, 211, 238, 0.65)" strokeWidth="0.15" strokeDasharray="2 6" />}
        {!liteMode && <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(59, 130, 246, 0.55)" strokeWidth="0.15" strokeDasharray="10 20" />}
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(34, 211, 238, 0.7)" strokeWidth="0.15" />
          {/* Inner Spherical Glow Layer */}
          <circle cx="50" cy="50" r="48" fill="url(#sphericalInnerGlow)" opacity="0.4" />
          <defs>
            <radialGradient id="sphericalInnerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
