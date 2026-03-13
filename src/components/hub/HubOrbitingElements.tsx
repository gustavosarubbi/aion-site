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
  const elementCount = liteMode ? 4 : 6;
  const orbitalRadius = 110; // px - maior que o botão central
  
  const elements = Array.from({ length: elementCount }, (_, i) => {
    const angle = (i * 360) / elementCount;
    const isEven = i % 2 === 0;
    
    return {
      id: i,
      angle,
      isEven,
    };
  });

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
          {/* Gradientes para elementos */}
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.5" />
          </linearGradient>
          
          {/* Glow suave */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g transform="translate(170, 170)">
          {/* Anel de órbita (tracejado sutil) */}
          <circle
            r={orbitalRadius}
            fill="none"
            stroke="url(#orbitGrad2)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity={0.4}
          />
          
          {/* Grupo rotativo - TODOS os elementos giram juntos */}
          <g
            style={{
              animation: shouldAnimate 
                ? `hubOrbitRotate 30s linear infinite`
                : 'none',
              transformOrigin: '0 0',
              willChange: 'transform',
            }}
          >
            {elements.map((el) => (
              <g key={el.id} transform={`rotate(${el.angle})`}>
                {/* Linha de conexão circuito */}
                <line
                  x1={0}
                  y1={0}
                  x2={orbitalRadius}
                  y2={0}
                  stroke={el.isEven ? "#22d3ee" : "#0e7490"}
                  strokeWidth="0.3"
                  strokeDasharray="2 4"
                  opacity={0.3}
                />
                
                {/* Hexágono orbital */}
                <g transform={`translate(${orbitalRadius}, 0)`}>
                  {/* Hexágono externo */}
                  <polygon
                    points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4"
                    fill={el.isEven ? "#0f172a" : "#1e293b"}
                    stroke={el.isEven ? "url(#orbitGrad1)" : "url(#orbitGrad2)"}
                    strokeWidth="1"
                    opacity={el.isEven ? 0.95 : 0.75}
                    filter={el.isEven ? "url(#softGlow)" : undefined}
                    style={{
                      animation: shouldAnimate 
                        ? `hubElementPulse ${2 + el.id * 0.3}s ease-in-out infinite`
                        : 'none',
                      transformOrigin: '0 0',
                    }}
                  />
                  
                  {/* Ponto central */}
                  <circle
                    r={el.isEven ? 2 : 1.5}
                    fill="#22d3ee"
                    opacity={el.isEven ? 0.9 : 0.7}
                    style={{
                      animation: shouldAnimate 
                        ? `hubCenterPulse ${1.5 + el.id * 0.2}s ease-in-out infinite alternate`
                        : 'none',
                    }}
                  />
                  
                  {/* Arco circuito ao redor */}
                  <path
                    d={`M -10,0 A 10,10 0 0,1 10,0`}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    opacity={0.4}
                    style={{
                      transform: `rotate(${el.isEven ? 0 : 180}deg)`,
                    }}
                  />
                </g>
              </g>
            ))}
          </g>
          
          {/* Anel interno rotativo (sentido oposto) */}
          <g
            style={{
              animation: shouldAnimate 
                ? `hubOrbitRotate 45s linear infinite reverse`
                : 'none',
              transformOrigin: '0 0',
              willChange: 'transform',
            }}
          >
            <circle
              r={orbitalRadius - 15}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.3"
              strokeDasharray="1 6"
              opacity={0.25}
            />
          </g>
        </g>
      </svg>
    </div>
  );
});
