"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const nav = navigator as Navigator & {
            deviceMemory?: number;
            connection?: { saveData?: boolean };
        };
        const cores = nav.hardwareConcurrency ?? 8;
        const memory = nav.deviceMemory ?? 8;
        const saveData = Boolean(nav.connection?.saveData);
        const lowPowerDevice = saveData || cores <= 4 || memory <= 4;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || lowPowerDevice) return;

        const lenis = new Lenis({
            autoRaf: false,
            lerp: 0.08,
            wheelMultiplier: 1,
        });

        let rafId = 0;
        let active = true;

        function raf(time: number) {
            if (!active) return;
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        const onVisibilityChange = () => {
            active = document.visibilityState === "visible";
            if (active && rafId === 0) {
                rafId = requestAnimationFrame(raf);
            }
            if (!active && rafId !== 0) {
                cancelAnimationFrame(rafId);
                rafId = 0;
            }
        };

        onVisibilityChange();
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            active = false;
            if (rafId !== 0) {
                cancelAnimationFrame(rafId);
            }
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
