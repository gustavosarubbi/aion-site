"use client";

import { motion } from "framer-motion";
import { Feature } from "./types";
import { montserrat } from "./constants";

interface FeatureCardsProps {
  features: Feature[];
}

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[580px] mx-auto lg:mx-0">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="group relative p-4 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 transition-all duration-300"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${feature.bg} border border-white/5`}>
            <svg className={`w-5 h-5 ${feature.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
            </svg>
          </div>
          <h4 className="text-[14px] font-bold text-white mb-1" style={montserrat}>{feature.title}</h4>
          <p className="text-[12px] text-slate-500 leading-snug">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
