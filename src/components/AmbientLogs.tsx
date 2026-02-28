"use client";

import { useEffect, useState } from "react";

const LOGS = [
    "AION_CORE: SYSTEM_INTEGRITY_VERIFIED",
    "AION_AUTONOME: ANALYZING_MARKET_PATTERNS...",
    "SYS_CTRL: OPTIMIZING_ASSETS_DELIVERY",
    "NET_NODE: ESTABLISHING_SECURE_CONNECTION",
    "AION_CORE: READY_FOR_DEPLOYMENT"
];

export default function AmbientLogs() {
    const [logIndex, setLogIndex] = useState(0);
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentLog = LOGS[logIndex];

        if (isTyping) {
            if (text.length < currentLog.length) {
                timeout = setTimeout(() => {
                    setText(currentLog.slice(0, text.length + 1));
                }, Math.random() * 30 + 20); // Variable typing speed
            } else {
                timeout = setTimeout(() => setIsTyping(false), 2500); // Pause
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText(text.slice(0, -1));
                }, 15); // Fast delete
            } else {
                setLogIndex((prev) => (prev + 1) % LOGS.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, isTyping, logIndex]);

    return (
        <div className="mt-8 font-mono text-xs sm:text-sm text-aionGray flex items-center gap-3 bg-white/5 border border-aionBlue/10 px-4 py-2 rounded-sm backdrop-blur-sm min-w-[280px] sm:min-w-[420px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-aionBlue animate-pulse shadow-[0_0_8px_theme(colors.aionBlue)] shrink-0"></span>
            <span className="opacity-80 tracking-wider">
                {text}
                <span className="animate-pulse ml-1 text-aionBlue">_</span>
            </span>
        </div>
    );
}
