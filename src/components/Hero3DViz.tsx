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
  const [viewportWidth, setViewportWidth] = useState(1600);
  const [isAnyCardDragging, setIsAnyCardDragging] = useState(false);

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

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onResize = () => setViewportWidth(window.innerWidth);
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

  const shouldRenderScene = isTabVisible && isInView;
  const shouldAnimateEffects = shouldRenderScene;
    const mobileBand = viewportWidth < 768 ? "phone" : viewportWidth < 1024 ? "tablet" : viewportWidth < 1280 ? "laptop" : "desktop";

    const dprRange = useMemo<[number, number]>(() => {
        if (typeof navigator === "undefined") {
            return mobileOptimized ? [0.6, 0.9] : [0.8, 1.1];
        }

        const cores = navigator.hardwareConcurrency ?? 8;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
        const lowEnd = cores <= 4 || memory <= 4;
        const midTier = !lowEnd && (cores <= 8 || memory <= 8);

        if (mobileOptimized) {
            if (mobileBand === "laptop") return lowEnd ? [0.58, 0.82] : [0.65, 0.95];
            if (mobileBand === "tablet") return lowEnd ? [0.55, 0.78] : [0.62, 0.9];
            return [0.5, 0.78];
        }

        if (lowEnd) return [0.6, 0.9];
        if (midTier) return [0.72, 1.0];
        return [0.85, 1.15];
    }, [mobileBand, mobileOptimized]);

  const desktopGlow = useMemo(() => {
    if (viewportWidth <= 1366) {
      return { left: "47%", size: 340, opacity: "bg-[#379cfd]/5", blur: "blur-[60px]" };
    }

    if (viewportWidth <= 1536) {
      return { left: "50%", size: 390, opacity: "bg-[#379cfd]/6", blur: "blur-[70px]" };
    }

    if (viewportWidth >= 1850) {
      return { left: "54%", size: 560, opacity: "bg-[#379cfd]/7", blur: "blur-[85px]" };
    }

    return { left: "52%", size: 450, opacity: "bg-[#379cfd]/6", blur: "blur-[75px]" };
  }, [viewportWidth]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative flex items-center justify-center overflow-visible"
        >
            <div
      className={
        mobileOptimized
          ? mobileBand === "laptop"
            ? "absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[340px] max-w-[100vw] h-[340px] bg-[#379cfd]/6 rounded-full blur-[70px] pointer-events-none"
            : mobileBand === "tablet"
            ? "absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[285px] max-w-[100vw] h-[285px] bg-[#379cfd]/5 rounded-full blur-[60px] pointer-events-none"
            : "absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[220px] max-w-[100vw] h-[220px] bg-[#379cfd]/4 rounded-full blur-[50px] pointer-events-none"
          : `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none ${desktopGlow.opacity} ${desktopGlow.blur}`
      }
                style={
                    mobileOptimized
                        ? undefined
                        : {
                            left: desktopGlow.left,
                            width: `${desktopGlow.size}px`,
                            height: `${desktopGlow.size}px`,
                        }
                }
            />

            <div className="w-full h-full absolute inset-0 !overflow-visible pointer-events-auto">
                <Canvas
                    frameloop="always"
                    dpr={dprRange}
                    gl={{
                        antialias: !mobileOptimized && dprRange[1] >= 1.05,
                        alpha: true,
                        powerPreference: mobileOptimized ? "low-power" : "high-performance",
                        stencil: false,
                    }}
performance={{ min: mobileOptimized ? (mobileBand === "laptop" ? 0.38 : mobileBand === "tablet" ? 0.34 : 0.3) : 0.45 }}
        camera={{ near: 0.1, far: 90 }}
        style={{
          background: "transparent",
          overflow: "visible",
          touchAction: isAnyCardDragging ? "none" : "pan-y",
        }}
      >
                    <Suspense fallback={null}>
<SignalProvider>
          <Scene 
            mobileOptimized={mobileOptimized} 
            onAnyCardDraggingChange={setIsAnyCardDragging}
            shouldAnimate={shouldAnimateEffects}
          />
        </SignalProvider>
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
