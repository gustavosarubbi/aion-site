"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { SignalProvider } from "./hero/SignalContext";
import { Scene } from "./hero/Scene";

type Hero3DVizProps = {
    quality?: "desktop" | "mobile";
};

export default function Hero3DViz({ quality = "desktop" }: Hero3DVizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileOptimized = quality === "mobile";
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const onVisibilityChange = () => {
            setIsTabVisible(document.visibilityState === "visible");
        };

        onVisibilityChange();
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, []);

    useEffect(() => {
        if (!containerRef.current || typeof window === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { rootMargin: "200px 0px 200px 0px", threshold: 0.02 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const shouldAnimate = isTabVisible && isInView;

    const dprRange = useMemo<[number, number]>(() => {
        if (typeof navigator === "undefined") {
            return mobileOptimized ? [0.6, 0.9] : [0.8, 1.1];
        }

        const cores = navigator.hardwareConcurrency ?? 8;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
        const lowEnd = cores <= 4 || memory <= 4;
        const midTier = !lowEnd && (cores <= 8 || memory <= 8);

        if (mobileOptimized || lowEnd) return [0.6, 0.9];
        if (midTier) return [0.75, 1.05];
        return [0.9, 1.25];
    }, [mobileOptimized]);

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
                    frameloop={shouldAnimate ? "always" : "never"}
                    dpr={dprRange}
                    gl={{
                        antialias: dprRange[1] >= 1.15,
                        alpha: true,
                        powerPreference: "default",
                        stencil: false,
                    }}
                    performance={{ min: 0.5 }}
                    camera={{ near: 0.1, far: 90 }}
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
