"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Hero3DVizProps = {
    quality?: "desktop" | "mobile";
};

const Hero3DViz = dynamic<Hero3DVizProps>(() => import("@/components/Hero3DViz"), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[480px]" />,
});

export default function Hero3DWrapper() {
    const [allow3D, setAllow3D] = useState(false);
    const [shouldMount3D, setShouldMount3D] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia("(max-width: 767px)");
        const onChange = () => setIsMobileViewport(media.matches);

        onChange();
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

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

            if (reducedMotion) {
                setAllow3D(false);
                return;
            }

            if (isMobileViewport) {
                setAllow3D(true);
                return;
            }

            setAllow3D(!saveData && cores >= 4 && memory >= 4);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isMobileViewport]);

    useEffect(() => {
        if (!allow3D || typeof window === "undefined") return;

        if (isMobileViewport) {
            const frame = window.requestAnimationFrame(() => setShouldMount3D(true));
            return () => window.cancelAnimationFrame(frame);
        }

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
            }).requestIdleCallback(() => mount3D(), { timeout: isMobileViewport ? 900 : 2200 });
        }

        timeoutId = window.setTimeout(() => mount3D(), 1200);

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
    }, [allow3D, isMobileViewport]);

    return (
        <>
            {/* Desktop: fills full column height, overflow-visible so labels/orbs never get clipped */}
            <div className="hidden md:block w-full h-full overflow-visible">
                {allow3D && shouldMount3D ? (
                    <Hero3DViz quality="desktop" />
                ) : (
                    <div className="relative w-full h-full overflow-visible">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.12),transparent_48%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_68%,rgba(59,130,246,0.09),transparent_54%)]" />
                        <div className="absolute left-[58%] top-[45%] w-[320px] h-[320px] rounded-full border border-cyan-300/10 blur-[1px]" />
                    </div>
                )}
            </div>

            <div className="md:hidden relative w-full h-full pointer-events-none">
                {allow3D && shouldMount3D ? (
                    <Hero3DViz quality="mobile" />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.11),transparent_52%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_68%,rgba(59,130,246,0.09),transparent_56%)]" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-cyan-300/12 blur-[1px]" />
                    </>
                )}
            </div>
        </>
    );
}
