"use client";

import { memo } from "react";

interface HubOrbitingElementsProps {
  liteMode?: boolean;
  shouldAnimate?: boolean;
}

export const HubOrbitingElements = memo(function HubOrbitingElements({
  liteMode = false,
  shouldAnimate = true,
}: HubOrbitingElementsProps) {
  const orbitalRadius = 130; // Raio da órbita

  // 4 hexágonos orbitando em círculo
  const elements = [
    { id: 0, angle: 0 },
    { id: 1, angle: 90 },
    { id: 2, angle: 180 },
    { id: 3, angle: 270 },
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        willChange: shouldAnimate ? 'transform' : 'auto',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 340 340"
        className="absolute inset-0"
        style={{
          overflow: 'visible',
        }}
      >
        <defs>
          {/* Glow intenso */}
          <filter id="hexGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(170, 170)">
          {/* Anel de órbita visível */}
          <circle
            r={orbitalRadius}
            fill="none"
            stroke="rgba(34, 211, 238, 0.4)"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity={0.6}
          />

          {/* Grupo rotativo - TODOS os hexágonos giram juntos em círculo */}
          <g
            style={{
              animation: shouldAnimate
                ? `hubOrbitRotate 20s linear infinite`
                : 'none',
              transformOrigin: '0 0',
              willChange: 'transform',
            }}
          >
            {elements.map((el) => (
              <g key={el.id} transform={`rotate(${el.angle})`}>
                {/* Hexágono posicionado no raio da órbita */}
                <g transform={`translate(${orbitalRadius}, 0)`}>
                  {/* Hexágono externo */}
                  <polygon
                    points="0,-14 12.1,-7 12.1,7 0,14 -12.1,7 -12.1,-7"
                    fill="#0f172a"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    opacity="1"
                    filter="url(#hexGlow)"
                  />

                  {/* Hexágono interno */}
                  <polygon
                    points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4"
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth="1"
                    opacity="0.8"
                  />

                  {/* Ponto central brilhante */}
                  <circle
                    r={3}
                    fill="#a5f3fc"
                    opacity="1"
                    style={{
                      animation: shouldAnimate
                        ? `hubCenterPulse ${1.5 + el.id * 0.3}s ease-in-out infinite alternate`
                        : 'none',
                    }}
                  />
                </g>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
});
