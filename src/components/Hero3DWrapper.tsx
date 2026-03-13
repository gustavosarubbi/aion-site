"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Hero3DVizProps = {
  quality?: "desktop" | "mobile";
};

const Hero3DViz = dynamic<Hero3DVizProps>(() => import("@/components/Hero3DViz"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] min-[1366px]:min-h-[480px]" />,
});

export default function Hero3DWrapper() {
  const [allow3D, setAllow3D] = useState(false);
  const [shouldMount3D, setShouldMount3D] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 1279px)");
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
        setAllow3D(!saveData && cores >= 4 && memory >= 4);
        return;
      }

      setAllow3D(!saveData);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isMobileViewport]);

  useEffect(() => {
    if (!allow3D) return;
    const frame = window.requestAnimationFrame(() => setShouldMount3D(true));
    return () => window.cancelAnimationFrame(frame);
  }, [allow3D]);

  return (
    <>
      <div className="hidden min-[1280px]:block w-full h-full overflow-visible">
        {allow3D && shouldMount3D ? (
          <Hero3DViz quality="desktop" />
        ) : (
          <div className="relative w-full h-full overflow-visible">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.06),transparent_48%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_68%,rgba(59,130,246,0.05),transparent_54%)]" />
            <div className="absolute left-[58%] top-[45%] w-[320px] max-w-[100vw] h-[320px] rounded-full border border-cyan-300/8 blur-[1px]" />
          </div>
        )}
      </div>

      <div className="min-[1280px]:hidden relative w-full h-full pointer-events-auto">
        {allow3D && shouldMount3D ? (
          <Hero3DViz quality="mobile" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.05),transparent_52%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_68%,rgba(59,130,246,0.04),transparent_56%)]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] max-w-[100vw] h-[220px] rounded-full border border-cyan-300/8 blur-[1px]" />
          </>
        )}
      </div>
    </>
  );
}
