"use client";

import { motion } from "framer-motion";

interface HeroFrameProps {
    children: React.ReactNode;
}

export default function HeroFrame({ children }: HeroFrameProps) {
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-12 group">
            {/* HUD Corner Accents */}
            <div className="absolute -inset-4 pointer-events-none">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg" />
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400/60 rounded-tl-sm blur-[1px]" />

                {/* Top Right */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/30 rounded-tr-lg" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400/60 rounded-tr-sm blur-[1px]" />

                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/30 rounded-bl-lg" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400/60 rounded-bl-sm blur-[1px]" />

                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400/60 rounded-br-sm blur-[1px]" />

                {/* HUD Scanning Lines (Subtle) */}
                <div className="absolute inset-0 border border-white/5 rounded-2xl overflow-hidden">
                    <motion.div
                        animate={{
                            y: ["0%", "100%", "0%"]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 py-8 lg:py-12">
                {children}
            </div>
        </div>
    );
}
