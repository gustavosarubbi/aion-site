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

  return (
    <div ref={rootRef} className="relative w-full py-1 overflow-hidden flex flex-col items-center group bg-[#0a0a0f]">
      <div className="relative w-full max-w-[900px] sm:max-w-[1000px] md:max-w-[1100px] lg:max-w-[1200px] mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 lg:w-48 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent z-20 pointer-events-none blur-[10px]" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 lg:w-48 bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent z-20 pointer-events-none blur-[10px]" />

        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-28 bg-[#0a0a0f] z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-28 bg-[#0a0a0f] z-30 pointer-events-none" />

        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="gateway-marquee-track flex shrink-0 w-max items-center py-4 mt-2" style={trackStyle}>
          {marqueeItems.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14">
              <div
                className="relative flex flex-col items-center gap-2.5 transition-all duration-300 group/item cursor-default"
                style={{ "--hover-color": item.brandColor } as CSSProperties}
              >
                <div className="transition-all duration-300 group-hover/item:text-[var(--hover-color)] text-white/80 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_15px_var(--hover-color)]">
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
              <div className="w-[1px] h-6 bg-white/10" />
            </div>
          ))}
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
