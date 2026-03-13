"use client";

import { Feature } from "./types";
import { montserrat } from "./constants";

interface FeatureCardsProps {
  features: Feature[];
  animate?: boolean;
}

export function FeatureCards({ features, animate }: FeatureCardsProps) {
  return (
    <div className="space-y-1.5 max-w-[340px] mx-auto lg:mx-0">
      {features.map((feature, i) => {
        const cardStyle = {
          background: "rgba(20, 30, 55, 0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTopColor: "rgba(34, 211, 238, 0.15)",
          borderLeftColor: "rgba(34, 211, 238, 0.08)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        } as const;

        const iconBgStyle = {
          background: "rgba(15, 25, 45, 0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
        } as const;

        return (
          <div
            key={i}
            className="relative group cursor-pointer px-3 py-2 rounded-[12px] flex items-center gap-2.5 transition-all duration-300 overflow-hidden hover:border-cyan-500/30"
            style={cardStyle}
          >
            {/* Icon container */}
            <div
              className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
              style={iconBgStyle}
            >
              <svg
                className={`w-3.5 h-3.5 ${feature.color}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
              </svg>
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3
                className="text-[11px] font-bold text-white/90 tracking-tight group-hover:text-cyan-400 transition-colors duration-300 leading-tight"
                style={montserrat}
              >
                {feature.title}
              </h3>
              <p className="text-[9px] text-slate-400/70 font-normal leading-tight">
                {feature.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
