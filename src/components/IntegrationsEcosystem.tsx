"use client";

import { motion } from "framer-motion";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

// Ícones customizados em SVG - não genéricos
const LightningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SyncIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 3L16 7M12 3L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DataFlowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M8.5 10.5L14 7.5M8.5 13.5L14 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 3V21M3 12H21M7 8L12 3L17 8M7 16L12 21L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 7H21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const benefits = [
  {
    icon: LightningIcon,
    title: "Latência Sub-100ms",
    description: "Respostas instantâneas que eliminam fricção. Seus clientes não esperam — convertem no impulso.",
    stat: "<100ms",
    statLabel: "tempo resposta",
    color: "from-cyan-400/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    delay: 0,
  },
  {
    icon: SyncIcon,
    title: "Sync Bicondicional",
    description: "Dados fluem em tempo real entre todas as plataformas. Atualizações instantâneas, sem conflitos.",
    stat: "Tempo real",
    statLabel: "sincronização",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    delay: 0.1,
  },
  {
    icon: DataFlowIcon,
    title: "Webhooks Inteligentes",
    description: "Eventos que disparam ações automaticamente. Cada interação do cliente ativa o próximo passo da jornada.",
    stat: "99.9%",
    statLabel: "entrega garantida",
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    delay: 0.2,
  },
  {
    icon: ShieldCheckIcon,
    title: "Compliance Nativo",
    description: "LGPD, PCI-DSS, SOC2 incorporados. Cada transação protegida por padrão, sem configuração adicional.",
    stat: "100%",
    statLabel: "compliant",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    delay: 0.3,
  },
  {
    icon: ScaleIcon,
    title: "Escala Elástica",
    description: "De 100 a 1M+ requests/dia sem mudar código. Infraestrutura que cresce automaticamente com seus picos.",
    stat: "1M+",
    statLabel: "req/dia",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
    delay: 0.4,
  },
  {
    icon: ChartUpIcon,
    title: "Analytics Embutido",
    description: "Métricas de conversão em cada endpoint. Descubra exatamente onde seus funis ganham e perdem dinheiro.",
    stat: "ROI",
    statLabel: "mensurável",
    color: "from-emerald-500/20 to-cyan-500/20",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    delay: 0.5,
  },
];

export default function IntegrationsEcosystem() {
  return (
    <section id="ecossistema" className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#020817] to-[#000000]" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #4facfe 1px, transparent 1px), linear-gradient(to bottom, #4facfe 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-black tracking-[0.4em] text-cyan-400 uppercase mb-6"
          >
            Ecosistema de Integrações
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={montserrat}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            Escale suas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              conversões
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Infraestrutura que conecta seu negócio às maiores plataformas do mercado. 
            Menos código, mais resultado.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: benefit.delay, duration: 0.5 }}
                className="group relative"
              >
                <div className={`relative h-full bg-gradient-to-br ${benefit.color} backdrop-blur-xl border ${benefit.borderColor} rounded-2xl p-6 hover:border-opacity-60 transition-all duration-500 overflow-hidden`}>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Scanline on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent -translate-y-full group-hover:animate-[scanline_2s_ease-in-out_infinite]" />

                  <div className="relative z-10">
                    {/* Icon + Stat row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${benefit.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <div className={benefit.iconColor}>
                          <Icon />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${benefit.iconColor}`}>
                          {benefit.stat}
                        </div>
                        <div className="text-[10px] font-bold tracking-wider text-white/30 uppercase">
                          {benefit.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${benefit.iconColor}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="#contato"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-[1.02]"
            >
              <span className="relative z-10">Ver documentação</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
                  </div>
                ))}
              </div>
              <span>+20 integrações nativas</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global styles for scanline animation */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}</style>
    </section>
  );
}
