"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Hero3DVizProps = {
    quality?: "desktop" | "mobile";
};

const Hero3DViz = dynamic<Hero3DVizProps>(() => import("@/components/Hero3DViz"), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] lg:h-[550px]" />,
});

export default function Hero3DWrapper() {
    const [allow3D, setAllow3D] = useState(false);
    const [shouldMount3D, setShouldMount3D] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const frame = window.requestAnimationFrame(() => {
            const nav = navigator as Navigator & {
                deviceMemory?: number;
                connection?: { saveData?: boolean };
            };

            const cores = nav.hardwareConcurrency ?? 8;
            const memory = nav.deviceMemory ?? 8;
            const saveData = Boolean(nav.connection?.saveData);
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            setAllow3D(!reducedMotion && !saveData && cores >= 6 && memory >= 6);
        });

        return () => window.cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!allow3D || typeof window === "undefined") return;

        let timeoutId: number | null = null;
        let idleId: number | null = null;

        const mount3D = () => setShouldMount3D(true);
        const onInteract = () => mount3D();

        window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
        window.addEventListener("keydown", onInteract, { once: true });
        window.addEventListener("touchstart", onInteract, { once: true, passive: true });

        if ("requestIdleCallback" in window) {
            idleId = (window as Window & {
                requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
            }).requestIdleCallback(() => mount3D(), { timeout: 2600 });
        }

        timeoutId = window.setTimeout(() => mount3D(), 1500);

        return () => {
            window.removeEventListener("pointerdown", onInteract);
            window.removeEventListener("keydown", onInteract);
            window.removeEventListener("touchstart", onInteract);

            if (idleId !== null && "cancelIdleCallback" in window) {
                (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [allow3D]);

    return (
        <>
            <div className="hidden md:block w-full h-full">
                {allow3D && shouldMount3D ? (
                    <Hero3DViz quality="desktop" />
                ) : (
                    <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.18),transparent_48%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_68%,rgba(59,130,246,0.13),transparent_54%)]" />
                        <div className="absolute left-[58%] top-[45%] w-[320px] h-[320px] rounded-full border border-cyan-300/15 blur-[1px]" />
                    </div>
                )}
            </div>

            <div className="md:hidden relative w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(56,189,248,0.14),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_65%,rgba(59,130,246,0.12),transparent_58%)]" />
                <div className="absolute inset-x-0 top-[28%] h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
            </div>
        </>
    );
}
