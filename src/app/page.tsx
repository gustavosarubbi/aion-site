import ActionNode from "@/components/ActionNode";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServiceStack from "@/components/ServiceStack";
import CommercialExpertise from "@/components/CommercialExpertise";
import Methodology from "@/components/Methodology";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import HeroHeadline from "@/components/HeroHeadline";
import dynamic from "next/dynamic";
import { Code, ChatCircleDots, RocketLaunch } from "@phosphor-icons/react/dist/ssr";

const Squares = dynamic(() => import("@/components/Squares"), {
  loading: () => <div className="w-full h-full" />,
});

const Hero3DWrapper = dynamic(() => import("@/components/Hero3DWrapper"), {
  loading: () => <div className="w-full h-[420px] lg:h-[560px]" />,
});

// Montserrat font class applied consistently
const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const serviceItems = [
  {
    icon: Code,
    label: "WEB DESIGN",
    color: "text-sky-300",
    halo: "bg-sky-400/35",
    divider: "via-sky-300/70",
  },
  {
    icon: ChatCircleDots,
    label: "CONVERSÃO",
    color: "text-violet-300",
    halo: "bg-violet-400/35",
    divider: "via-violet-300/70",
  },
  {
    icon: RocketLaunch,
    label: "AUTOMAÇÃO",
    color: "text-orange-300",
    halo: "bg-orange-400/35",
    divider: "via-orange-300/75",
  },
] as const;

function HeroSubtitle() {
  return (
    <div className="flex flex-col gap-4 mt-3 sm:mt-4">
      <p
        style={montserrat}
        className="text-white/85 text-sm sm:text-base lg:text-[18px] leading-relaxed font-medium max-w-[52ch] tracking-tight"
      >
        Potencializamos sua escala digital com ecossistemas de alta performance:
        <span className="text-blue-300 font-bold"> Sites magnéticos</span>,
        <span className="text-violet-300 font-bold font-semibold"> chatbots de conversão</span> e
        <span className="text-orange-300 font-bold font-semibold"> automações voltadas para o lucro</span>.
      </p>
    </div>
  );
}

function ServiceBar() {
  return (
    <div className="flex items-center overflow-visible">
      {serviceItems.map(({ icon: Icon, label, color, halo }, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2 sm:gap-2.5 py-1.5 cursor-default px-2 sm:px-3 lg:first:pl-0 last:pr-0">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full">
              <span className={`absolute inset-0 rounded-full ${halo} blur-md opacity-70`} />
              <Icon size={18} weight="duotone" className={color} />
            </span>
            <span
              style={montserrat}
              className={`text-[10px] sm:text-[11px] font-extrabold tracking-[0.18em] ${color} uppercase whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]`}
            >
              {label}
            </span>
          </div>
          {i !== serviceItems.length - 1 && (
            <div className="relative h-4 w-[1px] bg-white/70 self-center mx-1 sm:mx-2 overflow-visible">
              {/* Core glow - sharp */}
              <div className="absolute inset-0 bg-white blur-[1px]" />
              {/* Aura - soft white/blue tint for tech feel */}
              <div className="absolute inset-x-[-3px] inset-y-[-2px] bg-blue-400/20 blur-[6px] rounded-full" />
              <div className="absolute inset-x-[-1px] inset-y-[-1px] bg-white/40 blur-[3px] rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center overflow-x-hidden bg-[#000000]">

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 76% 66% at 50% 45%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 76% 66% at 50% 45%, black 40%, transparent 100%)",
        }}
      >
        <Squares
          direction="diagonal"
          speed={0.08}
          squareSize={56}
          borderColor="#121b2e"
          hoverFillColor="#081120"
        />
      </div>

      <div className="fixed top-[18%] left-[8%] w-[34vw] h-[34vw] rounded-full bg-blue-600/9 blur-[96px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-[12%] right-[10%] w-[28vw] h-[28vw] rounded-full bg-cyan-500/6 blur-[88px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,#000000_100%)]" />

      <section id="inicio" className="relative w-full min-h-[90vh] flex flex-col items-center justify-start overflow-visible pt-16 sm:pt-24 pb-12">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <div className="w-full h-full relative overflow-visible pointer-events-auto">
            <Hero3DWrapper />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent z-10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-2 sm:mt-4 pointer-events-none">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 lg:gap-6 lg:max-w-[720px] xl:max-w-[820px]">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/7 via-cyan-500/4 to-blue-500/6 blur-[74px] -z-10 rounded-full opacity-42 pointer-events-none" />


            <div className="z-10 mb-0.5">
              <ServiceBar />
            </div>

            <div className="relative z-10 overflow-visible w-full -mt-2">
              <HeroHeadline />
            </div>

            <div className="max-w-2xl">
              <HeroSubtitle />
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 pt-2 w-full sm:w-auto pointer-events-auto">
              <p
                style={montserrat}
                className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] text-white/55 uppercase font-semibold flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                Atendimento personalizado · Resultados mensuráveis
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-1">
                <ActionNode />
                <a
                  href="#services"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[46px] px-6 sm:px-7 rounded-full bg-[#3475f3] text-[12px] sm:text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#3f81ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black pointer-events-auto shadow-[0_0_22px_rgba(52,117,243,0.55)]"
                  style={montserrat}
                >
                  Ver Serviços
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Methodology />
      <CommercialExpertise />
      <PortfolioShowcase />
      <ServiceStack />
      <Testimonials />
      <FAQ />
      <Footer />

    </main>
  );
}

function ArrowIcon() {
  return (
    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
      {"->"}
    </span>
  );
}
