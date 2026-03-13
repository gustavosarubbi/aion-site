"use client";

import { memo } from "react";

interface HubRotatingRectanglesProps {
  liteMode?: boolean;
  shouldAnimate?: boolean;
}

export const HubRotatingRectangles = memo(function HubRotatingRectangles({
  liteMode = false,
  shouldAnimate = true,
}: HubRotatingRectanglesProps) {
  const rectangleCount = liteMode ? 8 : 12;
  const rectangles = Array.from({ length: rectangleCount }, (_, i) => {
    const angle = (i * 360) / rectangleCount;
    const isEven = i % 2 === 0;
    const size = isEven ? "24px" : "16px";
    const opacity = isEven ? 0.8 : 0.5;
    const delay = i * (20 / rectangleCount);
    const radius = isEven ? 140 : 138;
    
    return {
      id: i,
      angle,
      size,
      opacity,
      delay,
      radius,
      isEven,
    };
  });

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ 
        willChange: shouldAnimate ? 'transform' : 'auto',
        contain: 'layout paint style',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 340 340"
        className="absolute inset-0"
        style={{
          transform: "scale(1)",
          willChange: shouldAnimate ? 'transform' : 'auto',
        }}
      >
        <defs>
          <linearGradient id="rectGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="rectGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
          </linearGradient>
          <filter id="rectGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g transform="translate(170, 170)">
          {rectangles.map((rect) => (
            <g
              key={rect.id}
              transform={`rotate(${rect.angle}) translate(${rect.radius}, 0)`}
            >
              <rect
                x={-parseInt(rect.size) / 2}
                y={-parseInt(rect.size) / 2}
                width={rect.size}
                height={rect.size}
                fill={`url(#rectGradient${rect.isEven ? '1' : '2'})`}
                rx="2"
                opacity={rect.opacity}
                filter={rect.isEven ? "url(#rectGlow)" : undefined}
                style={{
                  willChange: 'transform',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: shouldAnimate 
                    ? `hubRectRotate 20s linear infinite ${rect.delay}s`
                    : 'none',
                }}
              />
              {/* Mini rect inside for extra detail */}
              {rect.isEven && (
                <rect
                  x={-4}
                  y={-4}
                  width="8px"
                  height="8px"
                  fill="#22d3ee"
                  rx="1"
                  opacity={0.9}
                  style={{
                    willChange: 'transform',
                    animation: shouldAnimate 
                      ? `hubRectPulse 3s ease-in-out infinite ${rect.delay * 0.5}s`
                      : 'none',
                  }}
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
});
