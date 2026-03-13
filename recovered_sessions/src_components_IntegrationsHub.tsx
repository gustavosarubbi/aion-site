"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { integrations, features, montserrat } from "./hub/constants";
import { CentralHub } from "./hub/CentralHub";
import { ConnectionLines } from "./hub/ConnectionLines";
import { IntegrationCards } from "./hub/IntegrationCards";
import { FeatureCards } from "./hub/FeatureCards";
import { calculateConnectionPaths } from "./hub/utils";
import { ConnectionPath } from "./hub/types";

export default function IntegrationsHub() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<ConnectionPath[]>([]);
  const [isUltraLite, setIsUltraLite] = useState(false);
  const [effectsActive, setEffectsActive] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isLiteMode = true;
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const hubCenterRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offscreenTimerRef = useRef<number | null>(null);
  const scrollStopTimerRef = useRef<number | null>(null);
  const scrollingRef = useRef(false);
  const hasMeasuredConnectionsRef = useRef(false);

  const shouldAnimateCore = effectsActive && !prefersReducedMotion && !isUltraLite;
  const shouldAnimateWires = shouldAnimateCore && !isScrolling;
  const displayConnectionPaths = connectionPaths;

  const handleHoverCard = useCallback((index: number | null) => {
    setHoveredCard((prev) => (prev === index ? prev : index));
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { root: null, rootMargin: "-20% 0px -20% 0px", threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (offscreenTimerRef.current !== null) {
        window.clearTimeout(offscreenTimerRef.current);
      }
      if (scrollStopTimerRef.current !== null) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!scrollingRef.current) {
        scrollingRef.current = true;
        setIsScrolling(true);
        setHoveredCard(null);
      }

      if (scrollStopTimerRef.current !== null) {
        window.clearTimeout(scrollStopTimerRef.current);
      }

      scrollStopTimerRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
        setIsScrolling(false);
        scrollStopTimerRef.current = null;
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimerRef.current !== null) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      if (offscreenTimerRef.current !== null) {
        window.clearTimeout(offscreenTimerRef.current);
        offscreenTimerRef.current = null;
      }

      offscreenTimerRef.current = window.setTimeout(() => {
        setEffectsActive(true);
        offscreenTimerRef.current = null;
      }, 0);
      return;
    }

    if (offscreenTimerRef.current !== null) {
      window.clearTimeout(offscreenTimerRef.current);
    }

    offscreenTimerRef.current = window.setTimeout(() => {
      setEffectsActive(false);
      offscreenTimerRef.current = null;
    }, 420);
  }, [isInView]);

  useEffect(() => {
    const updateUltraLite = () => {
      if (typeof window === "undefined") return;

      const nav = window.navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };

      const hardwareConcurrency = nav.hardwareConcurrency ?? 8;
      const deviceMemory = nav.deviceMemory ?? 8;
      const saveData = Boolean(nav.connection?.saveData);
      const isSmallViewport = window.matchMedia("(max-width: 1024px)").matches;
      const isLowEndDevice = hardwareConcurrency <= 4 || deviceMemory <= 4;

      setIsUltraLite(prefersReducedMotion || saveData || (isLowEndDevice && isSmallViewport));
    };

    updateUltraLite();
    window.addEventListener("resize", updateUltraLite, { passive: true });

    return () => {
      window.removeEventListener("resize", updateUltraLite);
    };
  }, [prefersReducedMotion]);

  // Calculate connection paths between hub and cards
  useEffect(() => {
    if (isUltraLite) {
      hasMeasuredConnectionsRef.current = false;
      return;
    }

    let rafId: number | null = null;
    const retryTimeouts: number[] = [];

    const updatePaths = () => {
      if (!containerRef.current || !hubRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const targetElement = hubCenterRef.current || hubRef.current;
      const hubRect = targetElement.getBoundingClientRect();

      const newPaths = calculateConnectionPaths(
        containerRect,
        hubRect,
        cardRefs.current,
        hubCenterRef.current
      );

      if (newPaths.length === 0) return;

      setConnectionPaths((prev) => {
        const unchanged =
          prev.length === newPaths.length &&
          prev.every((path, idx) => {
            const next = newPaths[idx];
            return (
              path.path === next.path &&
              path.cx === next.cx &&
              path.cy === next.cy &&
              path.hx === next.hx &&
              path.hy === next.hy
            );
          });

        return unchanged ? prev : newPaths;
      });

      if (newPaths.length === integrations.length) {
        hasMeasuredConnectionsRef.current = true;
      }
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updatePaths();
      });
    };

    if (effectsActive && !hasMeasuredConnectionsRef.current) {
      scheduleUpdate();
      [180, 420, 860].forEach((ms) => {
        const retry = window.setTimeout(() => {
          if (!hasMeasuredConnectionsRef.current) {
            scheduleUpdate();
          }
        }, ms);
        retryTimeouts.push(retry);
      });
    }

    const onResize = () => {
      hasMeasuredConnectionsRef.current = false;
      scheduleUpdate();
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      retryTimeouts.forEach(window.clearTimeout);
    };
  }, [effectsActive, isUltraLite]);

  return (
    <section
      ref={sectionRef}
      id="integracoes"
      className="relative z-10 w-full overflow-hidden bg-[#030914] text-white"
      style={{ paddingTop: "4rem", paddingBottom: "5rem", contain: "layout paint" }}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-cyan-900/10 rounded-full blur-[40px]" style={isUltraLite ? { opacity: 0.32, filter: "blur(20px)" } : undefined} />
        <div className="absolute top-1/4 right-[5%] w-[380px] h-[380px] bg-blue-900/10 rounded-full blur-[34px]" style={isUltraLite ? { opacity: 0.32, filter: "blur(16px)" } : undefined} />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />
      </div>

    <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 w-full">
      <div ref={containerRef} className="relative min-h-[700px] flex flex-col" style={{ position: 'relative', minHeight: isUltraLite ? "620px" : undefined }}>

{/* Top Section: Hub (left) + Content (right) */}
<div className="grid lg:grid-cols-2 gap-x-20 xl:gap-x-28 items-center w-full mb-8 flex-1">

{/* Central Hub - Higher z-index to be in front of wires */}
<div className="relative flex justify-center lg:justify-end items-center min-h-[350px] lg:min-h-[500px] mt-4 lg:mt-0 z-30">
<div className="scale-[0.70] sm:scale-[0.80] md:scale-90 lg:scale-100 origin-center transition-transform duration-500">
{isUltraLite ? (
  <div
    ref={hubRef}
    className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border border-cyan-400/20 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.14),rgba(3,9,20,0.95)_65%)]"
    aria-hidden="true"
  >
    <div className="absolute inset-[10%] rounded-full border border-cyan-400/15" />
    <div className="absolute inset-[20%] rounded-full border border-blue-400/20" />
    <div className="absolute inset-[31%] rounded-full border border-cyan-300/25" />
    <div ref={hubCenterRef} className="absolute inset-[40%] rounded-full bg-cyan-300/30 border border-cyan-200/35" />
  </div>
) : (
  <CentralHub
    hubRef={hubRef}
    centerRef={hubCenterRef}
    shouldAnimate={shouldAnimateCore}
    liteMode={isLiteMode}
    showEdgePulses
  />
)}
</div>
</div>

{/* Right Column: Headlines and Features */}
        <div
          className="flex flex-col z-40 mt-6 lg:mt-0 lg:pl-10 relative rounded-[20px] p-5 lg:p-7"
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderTopColor: "rgba(34, 211, 238, 0.15)",
            borderLeftColor: "rgba(34, 211, 238, 0.1)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="mb-5 text-center lg:text-left">

            {/* Custom Badge - emphasizes it's not pre-made */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(10, 15, 30, 0.6)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.15)",
              }}
            >
              <svg
                className="w-3.5 h-3.5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-red-400/90" style={montserrat}>
                SOLUÇÃO SOB MEDIDA
              </span>
            </div>

            {/* Pain-focused Headline */}
            <div className="mb-4" style={montserrat}>
              <span className="text-white font-bold text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem] leading-[1] block tracking-[-0.02em] uppercase">
                PARA DE PERDER
              </span>
              <span className="text-white/90 font-bold text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem] leading-[1] block tracking-[-0.02em] uppercase">
                VENDAS COM
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1] block tracking-[-0.02em] uppercase mt-1">
                SISTEMAS FRAGMENTADOS
              </span>
            </div>

            {/* Context - explaining it's custom */}
            <div className="mb-5">
              <p className="text-[13px] leading-[1.7] text-slate-300 font-medium max-w-[380px] mx-auto lg:mx-0 mb-2">
                <span className="text-cyan-400">Não vendemos software pronto.</span> Desenhamos e conectamos seu ecossistema digital sob medida para você parar de perder vendas e começar a escalar.
              </p>
              <p className="text-[11px] leading-[1.6] text-slate-500 max-w-[380px] mx-auto lg:mx-0">
                Cada negócio é único. Por isso não usamos templates — conectamos exatamente o que você precisa.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-5" />

            {/* Feature Cards - showing pain points we solve */}
            <div className="mb-3">
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 mb-3" style={montserrat}>
                AS DIFICULDADES QUE ELIMINAMOS:
              </p>
            </div>
            <FeatureCards features={features} />
          </div>
        </div>
</div>

{/* Connection Lines - all wires from cards to hub (light preset mode) */}
{!isUltraLite && (
  <ConnectionLines
    paths={displayConnectionPaths}
    integrations={integrations}
    hoveredCard={hoveredCard}
    shouldAnimate={shouldAnimateWires}
    className="absolute inset-0 z-[22] pointer-events-none overflow-visible hidden lg:block"
    centerMaskRadius={88}
  />
)}

{/* Integration Cards - With wires connected */}
<IntegrationCards
integrations={integrations}
hoveredCard={hoveredCard}
onHover={handleHoverCard}
cardRefs={cardRefs}
liteMode={isLiteMode}
/>

        </div>
      </div>
    </section>
  );
}
