"use client";

import { Integration } from "./types";
import { montserrat } from "./constants";

interface IntegrationCardsProps {
  integrations: Integration[];
  hoveredCard: number | null;
  onHover: (index: number | null) => void;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  liteMode?: boolean;
}

// AWS Logo component (same as carousel)
function AWSLogo() {
  return (
    <svg viewBox="0 0 304 182" fill="currentColor" className="h-4 w-auto">
      <path d="M86.4,66.4c0,3.7,0.4,6.7,1.1,8.9c0.8,2.2,1.8,4.6,3.2,7.2c0.5,0.8,0.7,1.6,0.7,2.3c0,1-0.6,2-1.9,3l-6.3,4.2c-0.9,0.6-1.8,0.9-2.6,0.9c-1,0-2-0.5-3-1.4C76.2,90,75,88.4,74,86.8c-1-1.7-2-3.6-3.1-5.9c-7.8,9.2-17.6,13.8-29.4,13.8c-8.4,0-15.1-2.4-20-7.2c-4.9-4.8-7.4-11.2-7.4-19.2c0-8.5,3-15.4,9.1-20.6c6.1-5.2,14.2-7.8,24.5-7.8c3.4,0,6.9,0.3,10.6,0.8c3.7,0.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16c-3.2-3.1-8.6-4.6-16.3-4.6c-3.5,0-7.1,0.4-10.8,1.3c-3.7,0.9-7.3,2-10.8,3.4c-1.6,0.7-2.8,1.1-3.5,1.3c-0.7,0.2-1.2,0.3-1.6,0.3c-1.4,0-2.1-1-2.1-3.1v-4.9c0-1.6,0.2-2.8,0.7-3.5c0.5-0.7,1.4-1.4,2.8-2.1c3.5-1.8,7.7-3.3,12.6-4.5c4.9-1.3,10.1-1.9,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1c5.5,5.4,8.3,13.6,8.3,24.6V66.4z M45.8,81.6c3.3,0,6.7-0.6,10.3-1.8c3.6-1.2,6.8-3.4,9.5-6.4c1.6-1.9,2.8-4,3.4-6.4c0.6-2.4,1-5.3,1-8.7v-4.2c-2.9-0.7-6-1.3-9.2-1.7c-3.2-0.4-6.3-0.6-9.4-0.6c-6.7,0-11.6,1.3-14.9,4c-3.3,2.7-4.9,6.5-4.9,11.5c0,4.7,1.2,8.2,3.7,10.6C37.7,80.4,41.2,81.6,45.8,81.6z M126.1,92.4c-1.8,0-3-0.3-3.8-1c-0.8-0.6-1.5-2-2.1-3.9L96.7,10.2c-0.6-2-0.9-3.3-0.9-4c0-1.6,0.8-2.5,2.4-2.5h9.8c1.9,0,3.2,0.3,3.9,1c0.8,0.6,1.4,2,2,3.9l16.8,66.2l15.6-66.2c0.5-2,1.1-3.3,1.9-3.9c0.8-0.6,2.2-1,4-1h8c1.9,0,3.2,0.3,4,1c0.8,0.6,1.5,2,1.9,3.9l15.8,67l17.3-67c0.6-2,1.3-3.3,2-3.9c0.8-0.6,2.1-1,3.9-1h9.3c1.6,0,2.5,0.8,2.5,2.5c0,0.5-0.1,1-0.2,1.6c-0.1,0.6-0.3,1.4-0.7,2.5l-24.1,77.3c-0.6,2-1.3,3.3-2.1,3.9c-0.8,0.6-2.1,1-3.8,1h-8.6c-1.9,0-3.2-0.3-4-1c-0.8-0.7-1.5-2-1.9-4L156,23l-15.4,64.4c-0.5,2-1.1,3.3-1.9,4c-0.8,0.7-2.2,1-4,1H126.1z M254.6,95.1c-5.2,0-10.4-0.6-15.4-1.8c-5-1.2-8.9-2.5-11.5-4c-1.6-0.9-2.7-1.9-3.1-2.8c-0.4-0.9-0.6-1.9-0.6-2.8v-5.1c0-2.1,0.8-3.1,2.3-3.1c0.6,0,1.2,0.1,1.8,0.3c0.6,0.2,1.5,0.6,2.5,1c3.4,1.5,7.1,2.7,11,3.5c4,0.8,7.9,1.2,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3c3.4-2.2,5.2-5.4,5.2-9.5c0-2.8-0.9-5.1-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L246,52c-7.3-2.3-12.7-5.7-16-10.2c-3.3-4.4-5-9.3-5-14.5c0-4.2,0.9-7.9,2.7-11.1c1.8-3.2,4.2-6,7.2-8.2c3-2.3,6.4-4,10.4-5.2c4-1.2,8.2-1.7,12.6-1.7c2.2,0,4.5,0.1,6.8,0.3c2.3,0.2,4.6,0.6,6.8,1c1.1,0.3,2.2,0.6,3.3,0.9c1.1,0.3,2,0.6,2.7,0.9c0.4,0.2,0.9,0.4,1.2,0.8c0.3,0.4,0.5,0.9,0.5,1.4v4.7c0,1-0.4,1.5-1.1,1.5c-0.4,0-1-0.2-1.8-0.5c-5.6-2.6-11.9-3.9-18.8-3.9c-5.4,0-9.7,0.9-12.7,2.6c-3,1.7-4.6,4.3-4.6,7.8c0,2.8,1,5.2,3,7.1c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6c3.1,4.1,4.6,8.8,4.6,14c0,4.3-0.9,8.2-2.6,11.6c-1.8,3.4-4.2,6.4-7.3,8.8c-3.1,2.5-6.7,4.3-10.9,5.6C264.4,94.4,259.7,95.1,254.6,95.1z"/>
      <g fill="#FF9900">
        <path d="M273.5,143.7c-32.9,24.3-80.7,37.2-121.8,37.2c-57.6,0-109.5-21.3-148.7-56.7c-3.1-2.8-0.3-6.6,3.4-4.4c42.4,24.6,94.7,39.5,148.8,39.5c36.5,0,76.6-7.6,113.5-23.2C274.2,133.6,278.9,139.7,273.5,143.7z"/>
        <path d="M287.2,128.1c-4.2-5.4-27.8-2.6-38.5-1.3c-3.2,0.4-3.7-2.4-0.8-4.5c18.8-13.2,49.7-9.4,53.3-5c3.6,4.5-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C282.5,155.7,291.4,133.4,287.2,128.1z"/>
      </g>
    </svg>
  );
}

export function IntegrationCards({ integrations, hoveredCard, onHover, cardRefs, liteMode = false }: IntegrationCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 mt-8">
      {integrations.map((item, idx) => {
        const isHovered = hoveredCard === idx;
        const cardStyle = {
          background: "rgba(15, 20, 35, 0.85)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTopColor: "rgba(34, 211, 238, 0.15)",
          borderLeftColor: "rgba(34, 211, 238, 0.08)",
          boxShadow: liteMode ? "0 6px 14px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)" : "0 8px 18px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: isHovered ? (liteMode ? "translateY(-1px)" : "scale(1.02) translateY(-2px)") : "none",
          zIndex: 20,
        } as const;

        const cardContent = (
          <>
            {/* Texture overlay */}
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* Hover subtle glow outline */}
            <div
              className="absolute inset-0 rounded-[20px] border border-transparent transition-colors duration-300 pointer-events-none"
              style={{
                borderColor: isHovered ? `${item.accent}30` : "transparent",
                boxShadow: isHovered ? `inset 0 0 20px ${item.accent}10` : "none",
              }}
            />

            {/* Icon container */}
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 z-10 transition-all duration-300"
              style={{
                background: "rgba(15, 20, 35, 0.8)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "inset 0 2px 10px rgba(255,255,255,0.02)",
              }}
            >
              {item.name === "AWS" ? (
                <div
                  className="object-contain transition-all duration-300 group-hover:scale-110 text-white group-hover:text-[#FF9900]"
                  style={{
                    filter: isHovered ? "none" : "brightness(0) invert(1)",
                  }}
                >
                  <AWSLogo />
                </div>
              ) : (
                <div
                  className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    maskImage: `url(${item.icon})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${item.icon})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    backgroundColor: isHovered ? item.accent : 'white',
                  }}
                />
              )}
            </div>

            {/* Text Box */}
            <div className="z-10 flex-1 min-w-0 pr-2">
              <h4 className="text-[13px] font-bold text-white tracking-tight" style={montserrat}>
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate font-medium">
                {item.desc}
              </p>
            </div>
          </>
        );

        return (
          <div
            key={item.name}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            onMouseEnter={() => onHover(idx)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onHover(idx)}
            className="relative group cursor-pointer px-5 py-4 rounded-[20px] flex items-center gap-4 transition-all duration-300 overflow-hidden"
            style={cardStyle}
          >
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}
