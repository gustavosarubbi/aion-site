"use client";

import { playSfx } from "@/lib/audio";
import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function ActionNode() {
  return (
    <motion.a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playSfx("hover")}
      onClick={() => playSfx("click")}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[44px] px-5 sm:px-6 rounded-xl border border-[#8eb1ff]/35 bg-gradient-to-r from-[#1a2f63] via-[#244886] to-[#2d5ca8] text-[10px] sm:text-[11px] font-black tracking-[0.12em] text-white uppercase transition-all duration-250 hover:from-[#203875] hover:via-[#2a5397] hover:to-[#3a6bbd] hover:border-[#b4cbff]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fc0ff]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_6px_16px_rgba(7,20,46,0.45)]"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <span className="relative z-10 flex items-center gap-2">
        Agendar Consultoria
        <ArrowRight
          size={15}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </motion.a>
  );
}
