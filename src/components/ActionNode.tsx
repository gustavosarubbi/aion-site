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
            className="group relative flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-[12px] font-bold tracking-wide text-white rounded-full overflow-hidden transition-all duration-300"
            style={{
                fontFamily: "var(--font-montserrat)",
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1E40AF 100%)",
                boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 4px 15px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
        >
            {/* Hover overlay */}
            <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{
                    background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%)",
                    boxShadow: "0 0 40px rgba(59,130,246,0.7)",
                }}
            />
            {/* Shine */}
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <span className="relative z-10 flex items-center gap-2">
                Agendar Consultoria
                <ArrowRight
                    size={15}
                    weight="bold"
                    className="group-hover:translate-x-1 transition-transform duration-200"
                />
            </span>
        </a>
    );
}
