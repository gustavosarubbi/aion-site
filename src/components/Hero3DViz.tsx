"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SignalProvider } from "./hero/SignalContext";
import { Scene } from "./hero/Scene";

export default function Hero3DViz() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-full h-full" />;

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden flex items-center justify-center pointer-events-auto">
            <div className="absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="w-full h-full absolute inset-0 overflow-visible pointer-events-auto">
                <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
                    <Suspense fallback={null}>
                        <SignalProvider>
                            <Scene containerRef={containerRef as any} />
                        </SignalProvider>
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
