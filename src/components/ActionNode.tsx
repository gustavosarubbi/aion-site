"use client";

import { playSfx } from "@/lib/audio";
import { ArrowRight } from "@phosphor-icons/react";

export default function ActionNode() {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playSfx("hover")}
      onClick={() => playSfx("click")}
      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[46px] px-6 sm:px-7 rounded-full bg-[#3475f3] text-[12px] sm:text-[13px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-[0_0_22px_rgba(52,117,243,0.55)]"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <span className="relative z-10 flex items-center gap-2">
        Agendar Consultoria
        <ArrowRight size={15} weight="bold" />
      </span>
    </a>
  );
}
