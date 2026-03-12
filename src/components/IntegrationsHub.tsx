"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  // Constants
  integrations,
  features,
  montserrat,
  // Components
  CentralHub,
  ConnectionLines,
  IntegrationCards,
  FeatureCards,
  // Utilities
  calculateConnectionPaths,
  // Types
  ConnectionPath,
} from "./hub";

export default function IntegrationsHub() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<ConnectionPath[]>([]);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const hubCenterRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Calculate connection paths between hub and cards
  useEffect(() => {
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

      setConnectionPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updatePaths);
      if (containerRef.current) observer.observe(containerRef.current);
    }

    // Multiple timeouts to ensure paths are calculated after animations
    const timeouts = [150, 500, 1000, 2000].map(ms => setTimeout(updatePaths, ms));

    return () => {
      window.removeEventListener("resize", updatePaths);
      if (observer) observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="integracoes"
      className="relative z-10 w-full overflow-hidden bg-[#030914] text-white"
      style={{ paddingTop: "4rem", paddingBottom: "5rem" }}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 w-full">
        <div ref={containerRef} className="relative min-h-[600px] flex flex-col">
          
          {/* Top Section: Hub (left) + Content (right) */}
          <div className="grid lg:grid-cols-12 gap-x-10 items-center w-full mb-12 flex-1">
            
            {/* Left Column: Central Hub */}
            <div className="col-span-12 lg:col-span-5 relative flex justify-center items-center min-h-[450px] lg:min-h-[550px] mt-12 lg:mt-0 z-30 lg:pr-10">
              <div className="scale-[0.80] sm:scale-[0.90] md:scale-100 lg:scale-[0.85] xl:scale-100 origin-center transition-transform duration-500">
                <CentralHub hubRef={hubRef} centerRef={hubCenterRef} />
              </div>
            </div>

            {/* Right Column: Headlines and Features */}
            <div className="col-span-12 lg:col-span-7 flex flex-col z-20 lg:pl-8">
              <div className="mb-10 text-center lg:text-left">
                
                {/* Subtitle */}
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-blue-500/80 mb-5"
                  style={montserrat}
                >
                  Potencialize suas conversões
                </motion.span>

                {/* Main Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[2.2rem] md:text-5xl lg:text-[4.2rem] xl:text-[4.5rem] tracking-tighter mb-6"
                  style={montserrat}
                >
                  <span className="text-white font-light leading-none block mb-1">Escale suas</span>
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 leading-none block pb-2">
                    conversões
                  </span>
                  <span className="text-white/90 text-[1.8rem] md:text-4xl lg:text-[2.6rem] xl:text-[2.8rem] font-medium leading-[1.1] tracking-tight block mt-2">
                    com nossas integrações.
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[14px] md:text-[15px] text-slate-400 font-normal max-w-[520px] mx-auto lg:mx-0 leading-relaxed mb-12"
                >
                  Integramos Gateways de Pagamento, sistemas CRM avançados e Automação de Marketing para maximizar suas vendas e otimizar a gestão do seu ecossistema.
                </motion.p>

                {/* Feature Cards */}
                <FeatureCards features={features} />
              </div>
            </div>
          </div>

          {/* Connection Lines SVG */}
          <ConnectionLines 
            paths={connectionPaths} 
            integrations={integrations}
            hoveredCard={hoveredCard}
          />

          {/* Integration Cards - Vertical column on the right */}
          <IntegrationCards
            integrations={integrations}
            hoveredCard={hoveredCard}
            onHover={setHoveredCard}
            cardRefs={cardRefs}
          />

        </div>
      </div>
    </section>
  );
}
