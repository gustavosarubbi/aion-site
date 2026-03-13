"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { Code, ChatCircleDots, Gear } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const serviceItems = [
  {
    icon: Code,
    label: "SITES",
    description: "Sites de alta conversão",
    color: "text-[#5db8ff]",
    gradient: "from-[#379cfd] to-[#5ec4ff]",
  },
  {
    icon: ChatCircleDots,
    label: "CONVERSÃO",
    description: "Robôs de IA e chatbots",
    color: "text-[#38bdf8]",
    gradient: "from-[#5ec4ff] to-[#60a5fa]",
  },
  {
    icon: Gear,
    label: "AUTOMAÇÃO",
    description: "Automação de processos",
    color: "text-[#22d3ee]",
    gradient: "from-[#60a5fa] to-[#22d3ee]",
  },
] as const;

export default function ServiceCards() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
    >
      {serviceItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3 + index * 0.1,
          }}
        >
          <MagicCard
            className="cursor-pointer group relative overflow-hidden"
            gradientColor={`rgba(55, 156, 253, ${0.3 + index * 0.1})`}
            gradientOpacity={0.6}
          >
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3">
              {/* Icon with glow effect */}
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300`}
                  style={{
                    background: `linear-gradient(135deg, ${item.gradient.split(" ")[1]}, ${item.gradient.split(" ")[3]})`,
                  }}
                />
                <item.icon
                  size={18}
                  weight="duotone"
                  className={`relative ${item.color} sm:hidden`}
                />
                <item.icon
                  size={22}
                  weight="duotone"
                  className={`relative ${item.color} hidden sm:block`}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span
                  style={montserrat}
                  className={`text-[9px] sm:text-[11px] min-[1280px]:text-[12px] font-extrabold tracking-[0.08em] sm:tracking-[0.11em] ${item.color} uppercase whitespace-nowrap`}
                >
                  {item.label}
                </span>
                <span
                  style={montserrat}
                  className="text-[8px] sm:text-[9px] text-white/50 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {item.description}
                </span>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
