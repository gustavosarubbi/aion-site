"use client";

import { motion } from "framer-motion";
import LordIcon from "./LordIcon";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

// Curated Unsplash images — meaningful visuals that convey each service
const pilares = [
  {
    title: "DIAGNÓSTICO DE POTENCIAL",
    desc: "Descubra o dinheiro que você deixa na mesa. Analisamos seu cenário e revelamos o caminho exato para multiplicar seus resultados.",
    tag: "CONSULTORIA ESTRATÉGICA",
    iconId: "msoeawqm",
    // Analytics dashboard - data analysis and metrics
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    accentColor: "rgba(55,156,253,0.4)",
    delay: 0.1
  },
  {
    title: "POSICIONAMENTO PREMIUM",
    desc: "Design impressionante que apaixona clientes no primeiro olhar, transmitindo a autoridade e o alto valor que sua marca merece.",
    tag: "DESIGN QUE CONVERTE",
    iconId: "wloilxuq",
    // Design work with color swatches - creative process
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop",
    accentColor: "rgba(93,184,255,0.35)",
    delay: 0.2
  },
  {
    title: "OPERAÇÃO ESCALÁVEL",
    desc: "Venda mais, 24 horas por dia. Automatizamos processos para sua empresa rodar quase no piloto automático, sem esforço extra.",
    tag: "VENDAS NO AUTOMÁTICO",
    iconId: "hwuyodym",
    // Dashboard/metrics - automation and business intelligence
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    accentColor: "rgba(55,156,253,0.3)",
    delay: 0.3
  },
  {
    title: "INFRAESTRUTURA BLINDADA",
    desc: "Tecnologia de ponta para que seu site nunca caia nos picos de acesso. Segurança e velocidade para você não perder nenhuma venda.",
    tag: "SEM PERDA DE VENDAS",
    iconId: "shield2",
    // Circuit board/tech hardware - infrastructure and security
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
    accentColor: "rgba(30,95,168,0.4)",
    delay: 0.4
  }
];

export default function VitrineEngenharia() {
  return (
    <section id="engenharia" className="relative z-10 w-full py-16 md:py-24 overflow-hidden bg-[#050812]">
{/* ── Abstract Tech Geometric Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep base - matches hero */}
        <div className="absolute inset-0 bg-[#000208]" />
        
        {/* Circuit board texture image */}
        <div 
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url('/assets/showcase/tech-circuit-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'hue-rotate(180deg) saturate(0.6) brightness(0.7) contrast(1.1)',
          }}
        />
        
        {/* Dark overlay for image */}
        <div className="absolute inset-0 bg-[#000208]/60" />
        
        {/* Subtle gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000208]/50 via-transparent to-[#000208]/50" />
        
        {/* Tech Grid - visible but subtle */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(55,156,253,0.5) 1px, transparent 1px),
              linear-gradient(rgba(55,156,253,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }} />
        </div>
        
        {/* Geometric Wireframe Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techLines" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Diamond shape */}
              <path d="M100 20 L180 100 L100 180 L20 100 Z" fill="none" stroke="#379cfd" strokeWidth="0.8" opacity="0.7"/>
              {/* Cross lines */}
              <path d="M100 20 L100 180" fill="none" stroke="#379cfd" strokeWidth="0.4" opacity="0.5"/>
              <path d="M20 100 L180 100" fill="none" stroke="#379cfd" strokeWidth="0.4" opacity="0.5"/>
              {/* Corner dots */}
              <circle cx="100" cy="100" r="2" fill="#379cfd" opacity="0.6"/>
              <circle cx="100" cy="20" r="1.5" fill="#5db8ff" opacity="0.5"/>
              <circle cx="180" cy="100" r="1.5" fill="#5db8ff" opacity="0.5"/>
              <circle cx="100" cy="180" r="1.5" fill="#5db8ff" opacity="0.5"/>
              <circle cx="20" cy="100" r="1.5" fill="#5db8ff" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techLines)" />
        </svg>
        
        {/* Circuit-style lines */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
          <div className="absolute top-[15%] -left-[5%] w-[110%] h-[2px] bg-gradient-to-r from-transparent via-[#379cfd] to-transparent" />
          <div className="absolute top-[35%] -left-[5%] w-[110%] h-[1px] bg-gradient-to-r from-transparent via-[#379cfd] to-transparent opacity-70" />
          <div className="absolute top-[55%] -left-[5%] w-[110%] h-[1px] bg-gradient-to-r from-transparent via-[#5db8ff] to-transparent opacity-60" />
          <div className="absolute top-[75%] -left-[5%] w-[110%] h-[2px] bg-gradient-to-r from-transparent via-[#379cfd] to-transparent" />
        </div>
        
        {/* Floating nodes */}
        <div className="absolute top-[12%] left-[15%] w-2 h-2 rounded-full bg-[#379cfd] opacity-[0.25]" />
        <div className="absolute top-[22%] right-[20%] w-2.5 h-2.5 rounded-full bg-[#5db8ff] opacity-[0.2]" />
        <div className="absolute top-[42%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#379cfd] opacity-[0.18]" />
        <div className="absolute top-[68%] right-[12%] w-2 h-2 rounded-full bg-[#5db8ff] opacity-[0.22]" />
        <div className="absolute top-[82%] left-[25%] w-2.5 h-2.5 rounded-full bg-[#379cfd] opacity-[0.15]" />
        <div className="absolute top-[45%] right-[30%] w-2 h-2 rounded-full bg-[#379cfd] opacity-[0.2]" />
        
        {/* Ambient glows - hero style */}
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#379cfd]/[0.03] blur-[250px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#5db8ff]/[0.02] blur-[200px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Heading Section ── */}
        <div className="text-center space-y-4 mb-14 md:mb-20 relative">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-[#379cfd]/8 blur-[100px] rounded-full -z-10" />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-block text-[9px] sm:text-[10px] font-black tracking-[0.35em] sm:tracking-[0.5em] text-[#379cfd] uppercase drop-shadow-[0_0_12px_rgba(55,156,253,0.7)]"
          >
            MÉTODO EXCLUSIVO QODEC
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={montserrat}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#379cfd]/60 leading-[0.9] uppercase"
          >
            ECOSSISTEMAS <br />
            DIGITAIS QUE <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>ESCALAM{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] to-[#5db8ff]">VENDAS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide px-4"
          >
            Não entregamos apenas sites. Construímos plataformas dinâmicas e irresistíveis, com design premium e engenharia de conversão para posicionar sua marca no topo.
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        {/* Mobile: 1 col | Tablet: 2 col | Desktop: 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pilares.map((pilar, idx) => (
            <CardPilar key={idx} {...pilar} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardPilar({ title, desc, tag, iconId, image, accentColor, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[28px] border-2 border-[#379cfd]/30 hover:border-[#379cfd] shadow-[0_0_30px_rgba(55,156,253,0.15)] hover:shadow-[0_0_50px_rgba(55,156,253,0.35)] transition-all duration-700 overflow-hidden flex flex-col backdrop-blur-md bg-[#0a1628]/40"
      style={{ minHeight: 420 }}
    >
      {/* Photo Background */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[28px]">
        {/* eslint-disable-next-line */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
          style={{
            filter: 'brightness(0.65) contrast(1.1)'
          }}
        />
        {/* Dark overlay — stronger for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00030A] via-[#00030A]/70 to-[#00030A]/30 z-10" />
        {/* Hover accent glow */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor} 0%, transparent 65%)` }}
        />
      </div>

      {/* Inner glow border - blue accent */}
      <div className="absolute inset-0 rounded-[28px] border border-[#379cfd]/20 group-hover:border-[#379cfd]/60 pointer-events-none z-20 shadow-[inset_0_0_30px_rgba(55,156,253,0.1)] group-hover:shadow-[inset_0_0_50px_rgba(55,156,253,0.2)] transition-all duration-700" />

      {/* Content */}
      <div className="relative z-30 flex flex-col h-full p-6 sm:p-7">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#0a1628] border border-[#379cfd]/20 flex items-center justify-center mb-6 self-start group-hover:scale-110 group-hover:border-[#379cfd]/60 group-hover:bg-[#0d1f3c] transition-all duration-500 shadow-[0_0_20px_rgba(55,156,253,0.08)] overflow-hidden">
          <motion.div
            className="flex items-center justify-center w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <LordIcon
              src={`/assets/icons/${iconId}.json`}
              trigger="loop"
              size={32}
              stroke="bold"
              colors={`primary:#379cfd,secondary:#ffffff`}
              delay={2000}
            />
          </motion.div>
        </div>

        <div className="mt-auto">
          <h3 style={montserrat} className="text-base sm:text-lg font-extrabold text-white mb-3 tracking-tight leading-snug uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {title}
          </h3>

          <p className="text-white/75 text-[13px] leading-relaxed mb-6 font-medium group-hover:text-white transition-colors tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {desc}
          </p>

          <div className="pt-4 border-t border-white/[0.08] group-hover:border-[#379cfd]/50 transition-colors duration-500 flex justify-center items-center">
            <span className="text-[9px] font-black tracking-[0.1em] text-[#5db8ff] uppercase bg-[#379cfd]/10 px-4 h-10 rounded-full border border-[#379cfd]/30 group-hover:bg-[#379cfd] group-hover:text-black transition-all duration-400 flex items-center justify-center text-center leading-[1.2] shadow-[0_0_15px_rgba(55,156,253,0.2)]">
              {tag}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
