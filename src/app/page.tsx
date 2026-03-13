"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

const GatewayCarousel = dynamic(() => import("@/components/GatewayCarousel"), {
  loading: () => <div className="w-full h-[90px]" />,
});

const VitrineEngenharia = dynamic(() => import("@/components/EngineeringShowcase"), {
  loading: () => <div className="w-full min-h-[700px]" />,
});

const CentralIntegracoes = dynamic(() => import("@/components/IntegrationsHub"), {
  loading: () => <div className="w-full min-h-[900px]" />,
});

const VitrineSistemas = dynamic(() => import("@/components/TemplateShowcase"), {
  loading: () => <div className="w-full min-h-[900px]" />,
});

const AutoridadeTecnica = dynamic(() => import("@/components/CommercialExpertise"), {
  loading: () => <div className="w-full min-h-[800px]" />,
});

const PerformanceMetrics = dynamic(() => import("@/components/PerformanceMetrics"), {
  loading: () => <div className="w-full min-h-[700px]" />,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="w-full min-h-[650px]" />,
});

const DiagnosticoEstrategico = dynamic(() => import("@/components/StrategicDiagnosis"), {
  loading: () => <div className="w-full min-h-[650px]" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="w-full min-h-[250px]" />,
});

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center bg-[#000000]">
      <HeroSection />
      
      <GatewayCarousel />
      
      <VitrineEngenharia />
      
      {/* Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>
      
      <CentralIntegracoes />
      
      {/* Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>
      
      <VitrineSistemas />
      
      {/* Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-sm" />
      </div>
      
      <AutoridadeTecnica />
      
      {/* Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>
      
      <PerformanceMetrics />
      
      {/* Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-sm" />
      </div>
      
      <FAQ />
      
      {/* Divider */}
      <div className="relative w-full h-px overflow-visible z-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent blur-sm" />
      </div>
      
      <DiagnosticoEstrategico />
      <Footer />
    </main>
  );
}
