"use client";

import ActionNode from "@/components/ActionNode";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServiceStack from "@/components/ServiceStack";
import CommercialExpertise from "@/components/CommercialExpertise";
import Methodology from "@/components/Methodology";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Squares from "@/components/Squares";
import Hero3DWrapper from "@/components/Hero3DWrapper";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center overflow-x-hidden bg-[#000000]">

      {/* Dynamic Squares Background - masked edges for immersion */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)' }}>
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={48}
          borderColor="#1a1a2e"
          hoverFillColor="#0d1117"
        />
      </div>

      {/* Neon Radial Gradient auras in the background */}
      <div className="fixed top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
      <div className="fixed bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,#000000_100%)]"></div>

      {/* Hero Content - Asymmetrical Modern Layout */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-24 sm:pt-40 sm:pb-40 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[85vh]">

        {/* Left: Brand + Typography & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-7 max-w-2xl relative mt-8 lg:mt-16 w-full lg:w-1/2">
          {/* Subtle glow behind the content */}
          <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-[100px] -z-10 rounded-full opacity-40"></div>

          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src="/AionLogo.png"
            alt="AION Digital"
            className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          />

          {/* Sub-label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-cyan-400/80 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
            Web Design &middot; Chatbots &middot; Automação
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] pb-2"
          >
            Criamos sites que<br />convertem e{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] pr-2">
              bots que vendem.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-base sm:text-lg max-w-lg leading-relaxed"
          >
            Web design de alto impacto, chatbots de WhatsApp e automação de processos — tudo integrado para escalar seu negócio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
          >
            <ActionNode />
            <a href="#services" className="px-8 py-3.5 text-sm font-bold text-white/50 hover:text-cyan-400 bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/[0.05] rounded-full transition-all duration-300">
              Ver Serviços
            </a>
          </motion.div>
        </div>

        {/* Right: Floating 3D Visualization */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center mt-8 lg:mt-0 relative overflow-visible h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center scale-110">
            <Hero3DWrapper />
          </div>
        </div>

      </section>

      {/* Flowing Sections */}
      <Methodology />
      <CommercialExpertise />
      <PortfolioShowcase />
      <ServiceStack />
      <Testimonials />
      <FAQ />

      {/* Absolute Dark Footer */}
      <Footer />

    </main >
  );
}
