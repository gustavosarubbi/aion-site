"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";


type Hero3DVizProps = {
    quality?: "desktop" | "mobile";
};


export default function Hero3DWrapper() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [allow3D, setAllow3D] = useState(false);
    const [shouldMount3D, setShouldMount3D] = useState(false);
    const [isInViewport, setIsInViewport] = useState(true);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [Hero3DVizComponent, setHero3DVizComponent] = useState<ComponentType<Hero3DVizProps> | null>(null);


    useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      if (!scrollingRef.current) {
        setIsScrolling(true);
        scrollingRef.current = true;
      }
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
      scrollStopTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        scrollingRef.current = false;
      }, 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, []);

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

        if (!rootRef.current || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            { root: null, rootMargin: "300px 0px 300px 0px", threshold: 0.01 }
        );

        observer.observe(rootRef.current);

        return () => observer.disconnect();
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
                setAllow3D(!saveData && cores >= 6 && memory >= 4);
                return;
            }

            setAllow3D(!saveData && cores >= 4 && memory >= 4);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isMobileViewport]);

    useEffect(() => {
        if (!allow3D || !isInViewport) return;
        setShouldMount3D(true);
    }, [allow3D, isInViewport]);

    useEffect(() => {
        if (!allow3D || Hero3DVizComponent) return;

        void import("@/components/Hero3DViz");
    }, [allow3D, Hero3DVizComponent]);

    useEffect(() => {
        if (!allow3D || !shouldMount3D || Hero3DVizComponent) return;

        let cancelled = false;

        import("@/components/Hero3DViz").then((mod) => {
            if (!cancelled) {
                setHero3DVizComponent(() => mod.default);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [allow3D, shouldMount3D, Hero3DVizComponent]);

    return (
        <div ref={rootRef} className="w-full h-full">
            {/* Desktop: fills full column height, overflow-visible so labels/orbs never get clipped */}
            <div className="hidden min-[1280px]:block w-full h-full overflow-visible">
                {allow3D && shouldMount3D && Hero3DVizComponent ? (
                    <Hero3DVizComponent quality="desktop" shouldAnimate={!isScrolling} />
                ) : (
                    <div className="relative w-full h-full overflow-visible">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.06),transparent_48%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_68%,rgba(59,130,246,0.05),transparent_54%)]" />
          <div className="absolute left-[58%] top-[45%] w-[320px] max-w-[100vw] h-[320px] rounded-full border border-cyan-300/8 blur-[1px]" />
                    </div>

                )}

            </div>



            <div className="min-[1280px]:hidden relative w-full h-full pointer-events-auto">

                {allow3D && shouldMount3D && Hero3DVizComponent ? (
                    <Hero3DVizComponent quality="mobile" shouldAnimate={!isScrolling} />
                ) : (
                    <>

<div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(56,189,248,0.05),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_68%,rgba(59,130,246,0.04),transparent_56%)]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] max-w-[100vw] h-[220px] rounded-full border border-cyan-300/8 blur-[1px]" />
                    </>
                )}
            </div>
        </div>
    );
}
