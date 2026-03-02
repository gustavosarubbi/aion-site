"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import { SignalProvider } from "./hero/SignalContext";
import { Scene } from "./hero/Scene";

type Hero3DVizProps = {
    quality?: "desktop" | "mobile";
};

export default function Hero3DViz({ quality = "desktop" }: Hero3DVizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileOptimized = quality === "mobile";

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden flex items-center justify-center"
        >
            <div
                className={
                    mobileOptimized
                        ? "absolute left-[62%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-cyan-500/8 rounded-full blur-[72px] pointer-events-none"
                        : "absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"
                }
            />

            <div className="w-full h-full absolute inset-0 overflow-visible pointer-events-auto">
                <Canvas
                    dpr={mobileOptimized ? [0.85, 1.15] : [1, 1.7]}
                    gl={{
                        antialias: !mobileOptimized,
                        alpha: true,
                        powerPreference: "high-performance",
                    }}
                    style={{ background: "transparent" }}
                >
                    <Suspense fallback={null}>
                        <SignalProvider>
                            <Scene mobileOptimized={mobileOptimized} />
                        </SignalProvider>
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
