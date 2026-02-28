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
          <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-[80px] -z-10 rounded-full opacity-60"></div>

          {/* Logo */}
          <img src="/AionLogo.png" alt="AION Digital" className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]" />

          {/* Sub-label */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-cyan-400/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4] animate-pulse"></span>
            Web Design &middot; Chatbots &middot; Automação
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
            Criamos sites que<br />convertem e{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              bots que vendem.
            </span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg max-w-lg leading-relaxed">
            Web design de alto impacto, chatbots de WhatsApp e automação de processos — tudo integrado para escalar seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <ActionNode />
            <a href="#services" className="px-6 py-3 text-sm font-semibold text-white/50 hover:text-white bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.06] rounded-full transition-all duration-300">
              Ver Serviços
            </a>
          </div>
        </div>

        {/* Right: Floating 3D Visualization */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center mt-8 lg:mt-0">
          <Hero3DWrapper />
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
