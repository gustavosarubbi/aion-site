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
import { Globe, Robot, Lightning } from "@phosphor-icons/react";

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

      {/* Hero Section - Full Interactive Depth */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-start overflow-visible pt-16 sm:pt-24 pb-20">

        {/* Full-Section 3D Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <div className="w-full h-full relative overflow-visible">
            <Hero3DWrapper />
          </div>
          {/* Bottom fade transition */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent z-10"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 mt-8 sm:mt-16">
          {/* Subtle glow behind the content */}
          <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-[120px] -z-10 rounded-full opacity-30"></div>

          {/* Logo with glow ring */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <div className="absolute -inset-2 bg-cyan-500/10 rounded-full blur-xl"></div>
            <img
              src="/AionLogo.png"
              alt="Aion Digital"
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] relative"
            />
          </motion.div>

          {/* Service badges with Phosphor Icons */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 flex-wrap"
          >
            {[
              { icon: Globe, label: "Web Design" },
              { icon: Robot, label: "Chatbots" },
              { icon: Lightning, label: "Automação" },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] text-cyan-400/90 uppercase">
                <item.icon size={14} weight="duotone" className="text-cyan-400" />
                {item.label}
                {i < 2 && <span className="ml-3 text-white/20">|</span>}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.9] pb-2 overflow-visible relative z-10 flex flex-col gap-1"
          >
            <span className="block italic font-light opacity-90">Criamos sites que</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] pr-4">
              Convertem e bots
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              Que vendem
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/55 text-base sm:text-lg max-w-lg leading-relaxed"
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
