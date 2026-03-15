"use client";

import { CSSProperties, ComponentType, useEffect, useMemo, useRef, useState } from "react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

function AzureLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M5.483 0L1.006 8.602 0 20.77h4.503L12.209 0zm1.885 3.403L11.753 16.56l-5.635 5.477H24z" />
    </svg>
  );
}

function InfinitePayLogo() {
  return (
    <svg viewBox="0 0 210 210" fill="currentColor" className="h-4 w-auto">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105 157.962C134.246 157.962 157.962 134.246 157.962 105C157.962 75.754 134.246 52.038 105 52.038C75.754 52.038 52.038 75.754 52.038 105C52.038 134.246 75.754 157.962 105 157.962ZM174.076 105C174.076 143.15 143.15 174.076 105 174.076C66.85 174.076 35.924 143.15 35.924 105C35.924 66.85 66.85 35.924 105 35.924C143.15 35.924 174.076 66.85 174.076 105Z"
      />
    </svg>
  );
}

function MercadoPagoLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <ellipse cx="12" cy="12" rx="10" ry="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.8 12c1.3-1.6 2.7-2.4 4.2-2.4 1.2 0 2.1.5 3 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.2 12c-1.3 1.6-2.7 2.4-4.2 2.4-1.2 0-2.1-.5-3-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type GatewayItem = {
  name: string;
  logo?: string;
  CustomIcon?: ComponentType;
  brandColor: string;
};

const gateways: GatewayItem[] = [
  { name: "n8n.io", logo: "/integrations/n8n.svg", brandColor: "#FF6C37" },
  { name: "WhatsApp Business", logo: "/integrations/whatsapp.svg", brandColor: "#25D366" },
  { name: "Mercado Pago", CustomIcon: MercadoPagoLogo, brandColor: "#009EE3" },
  { name: "InfinitePay", CustomIcon: InfinitePayLogo, brandColor: "#00FF5F" },
  { name: "Stripe", logo: "/integrations/stripe.svg", brandColor: "#635BFF" },
  { name: "Microsoft Azure", CustomIcon: AzureLogo, brandColor: "#008AD7" },
  { name: "Amazon AWS", logo: "/integrations/aws.svg", brandColor: "#FF9900" },
  { name: "Shopify", logo: "/integrations/shopify.svg", brandColor: "#96BF48" },
  { name: "Meta Business", logo: "/integrations/meta.svg", brandColor: "#0668E1" },
];

const marqueeItems = [...gateways, ...gateways, ...gateways];

export default function GatewayCarousel() {
<<<<<<< HEAD
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { root: null, rootMargin: "120px 0px 120px 0px", threshold: 0.02 }
=======
    return (
        <div className="relative w-full py-2 bg-black overflow-hidden flex flex-col items-center group">
            {/* Expanded Track Container with Integrated Title */}
            <div className="w-full max-w-5xl mx-auto relative flex flex-col overflow-x-hidden">

                {/* Top Border with Integrated Title */}
                <div className="absolute top-0 inset-x-0 outline-none flex items-center justify-center z-30 pt-1 pointer-events-none">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-blue-500/10" />
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                        viewport={{ once: true }}
                        className="px-6 text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.25em]"
                    >
                        Tecnologias Integradas
                    </motion.span>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-500/10 via-blue-500/30 to-transparent" />
                </div>
                {/* Secondary line just below the title for that "track" feel */}
                <div className="absolute top-[2px] inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none" />


                {/* Harmonious Bottom Border */}
                <div className="absolute bottom-0 inset-x-0 flex flex-col items-center z-10 pointer-events-none">
                    <div className="h-px w-[95%] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-[1px]" />
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                    {/* Subtle bottom glow */}
                    <div className="absolute bottom-0 h-4 w-full bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
                </div>

                {/* Fixed Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex shrink-0 w-max items-center py-8 mt-4"
                    animate={{
                        x: [0, "-50%"] // Translate exactly half of the multiplied sets
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35, // Slowed down from 20 for a smoother, relaxed pace
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((item, idx) => {
                        return (
                            // Perfect math sizing block: includes gap and right padding to seamlessly repeat without parent gap math drift
                            <div key={idx} className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14">
                                <div
                                    className="relative flex flex-col items-center gap-2.5 transition-all duration-300 group/item cursor-default"
                                    style={{ '--hover-color': item.brandColor } as React.CSSProperties}
                                >
                                    <div className="transition-all duration-300 group-hover/item:text-[var(--hover-color)] text-white/80 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_15px_var(--hover-color)]">
                                        {item.CustomIcon ? (
                                            <item.CustomIcon />
                                        ) : (
                                            <div
                                                className="h-5 w-8 bg-current transition-colors duration-300"
                                                style={{
                                                    maskImage: `url(${item.logo})`,
                                                    maskSize: 'contain',
                                                    maskRepeat: 'no-repeat',
                                                    maskPosition: 'center',
                                                    WebkitMaskImage: `url(${item.logo})`,
                                                    WebkitMaskSize: 'contain',
                                                    WebkitMaskRepeat: 'no-repeat',
                                                    WebkitMaskPosition: 'center',
                                                }}
                                            />
                                        )}
                                    </div>
                                    <span
                                        style={montserrat}
                                        className="text-[9px] md:text-[10px] text-white/60 font-bold whitespace-nowrap uppercase transition-all duration-300 group-hover/item:text-white"
                                    >
                                        {item.name}
                                    </span>
                                </div>
                                {/* Discrete Vertical Separator */}
                                <div className="w-[1px] h-6 bg-white/10" />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
>>>>>>> 5b6aedce9124892d2e483ddd898ec8debdddf6f1
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const shouldAnimate = isInView && !prefersReducedMotion;
  const trackStyle = useMemo(
    () =>
      ({
        animationPlayState: shouldAnimate ? "running" : "paused",
      }) as CSSProperties,
    [shouldAnimate]
  );

  const shellStyle = {
    background: "linear-gradient(180deg, rgba(15, 20, 35, 0.96) 0%, rgba(11, 17, 32, 0.98) 100%)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderTopColor: "rgba(34, 211, 238, 0.12)",
    borderLeftColor: "rgba(34, 211, 238, 0.07)",
    boxShadow: "0 10px 24px rgba(0,0,0,0.46), inset 0 1px 0 rgba(255,255,255,0.04)",
  } as const;

  const shellMaskStyle = {
    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  } as const;

  const viewportMaskStyle = {
    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
  } as const;

  return (
    <div ref={rootRef} className="relative w-full isolate">
      <div className="absolute inset-y-1 -left-10 w-20 bg-[#0b1120]/88 blur-[26px] pointer-events-none" />
      <div className="absolute inset-y-1 -right-10 w-20 bg-[#0b1120]/88 blur-[26px] pointer-events-none" />

      <div className="relative w-full overflow-hidden rounded-[18px] md:rounded-[20px]" style={{ ...shellStyle, ...shellMaskStyle }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-y-0 left-0 w-14 sm:w-16 md:w-20 bg-[#0b1120] z-30 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/94 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-20 sm:w-24 md:w-28 bg-gradient-to-r from-[#0b1120]/96 to-transparent z-20 pointer-events-none blur-[26px]" />

        <div className="absolute inset-y-0 right-0 w-14 sm:w-16 md:w-20 bg-[#0b1120] z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-28 md:w-32 bg-gradient-to-l from-[#0b1120] via-[#0b1120]/94 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-24 md:w-28 bg-gradient-to-l from-[#0b1120]/96 to-transparent z-20 pointer-events-none blur-[26px]" />

        <div className="relative overflow-hidden" style={viewportMaskStyle}>
          <div className="gateway-marquee-track flex w-max items-center py-3 sm:py-4 px-3 sm:px-4" style={trackStyle}>
            {marqueeItems.map((item, idx) => (
              <div key={`${item.name}-${idx}`} className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14">
                <div
                  className="relative flex flex-col items-center gap-2.5 transition-all duration-300 group/item cursor-default"
                  style={{ "--hover-color": item.brandColor } as CSSProperties}
                >
                  <div className="bg-transparent text-white/80 transition-all duration-300 group-hover/item:text-[var(--hover-color)] group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_15px_var(--hover-color)]">
                    {item.CustomIcon ? (
                      <item.CustomIcon />
                    ) : (
                      <div
                        className="h-5 w-8 bg-current transition-colors duration-300"
                        style={{
                          maskImage: `url(${item.logo})`,
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskImage: `url(${item.logo})`,
                          WebkitMaskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={montserrat}
                    className="text-[9px] md:text-[10px] text-white/60 font-bold whitespace-nowrap uppercase transition-all duration-300 group-hover/item:text-white"
                  >
                    {item.name}
                  </span>
                </div>
                <div className="w-px h-6 bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .gateway-marquee-track {
          will-change: transform;
          animation: gateway-marquee 38s linear infinite;
        }

        @keyframes gateway-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gateway-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
