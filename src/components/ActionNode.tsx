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
            className="group relative flex items-center justify-center px-8 py-4 text-sm font-bold text-[#000000] bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 rounded-full overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                Agendar Consultoria
                <ArrowRight size={16} weight="bold" className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
        </a>
    );
}
