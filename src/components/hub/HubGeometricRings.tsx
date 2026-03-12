"use client";

export function HubGeometricRings() {
  return (
    <>
      {/* Precision Circular Ticks - Spherical Perfect Symmetry */}
      <div className="absolute inset-0 flex items-center justify-center opacity-85 [transform:translateZ(10px)]">
        <svg viewBox="0 0 100 100" className="w-[100%] h-[100%]">
          {[...Array(60)].map((_, i) => {
            const isMajor = i % 10 === 0;
            const h = isMajor ? 4 : 2;
            return (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2={2 + h}
                stroke={isMajor ? "rgba(34, 211, 238, 0.8)" : "rgba(34, 211, 238, 0.3)"}
                strokeWidth={isMajor ? "0.4" : "0.2"}
                transform={`rotate(${i * 6} 50 50)`}
              />
            );
          })}
          {/* Symmetrical Outer Detail Ring */}
          <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.1" strokeDasharray="1 3" />
          {/* Main Perfect Boundary Ring */}
          <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="0.1" />
        </svg>
      </div>

      {/* Layered Spherical Infrastructure - Glows & Technical Depth */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60 [transform:translateZ(-10px)]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="0.12" strokeDasharray="1 15" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.12" strokeDasharray="2 6" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="0.12" strokeDasharray="10 20" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="0.12" />
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
