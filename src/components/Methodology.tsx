import { MagnifyingGlass, PencilLine, Lightning, RocketLaunch } from "@phosphor-icons/react/dist/ssr";

export default function Methodology() {
    const steps = [
        { num: "01", icon: <MagnifyingGlass size={20} weight="duotone" />, title: "Descoberta & Briefing", text: "Mergulhamos no seu negócio para entender o público, os objetivos e os gargalos. Definimos métricas antes de qualquer pixel." },
        { num: "02", icon: <PencilLine size={20} weight="duotone" />, title: "Design UI/UX", text: "Criamos wireframes e protótipos interativos com foco em conversão. Cada tela guia o usuário até a ação." },
        { num: "03", icon: <Lightning size={20} weight="duotone" />, title: "Automação & Bots", text: "Integramos fluxos inteligentes de WhatsApp, n8n e webhooks que capturam leads e automatizam processos 24/7." },
        { num: "04", icon: <RocketLaunch size={20} weight="duotone" />, title: "Deploy & Otimização", text: "Publicamos na nuvem com monitoramento em tempo real. Iteramos para maximizar resultados." },
    ];

    return (
        <section id="process" className="cv-auto relative z-10 w-full py-16 md:py-32 bg-gradient-to-b from-[#000000] via-[#040810] to-[#000000]" style={{ containIntrinsicSize: "980px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col items-center gap-4 text-center mb-20">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Nosso Processo</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Do briefing ao deploy.</h2>
                    <p className="text-white/40 max-w-lg mt-1">Cada etapa é projetada para entregar resultados mensuráveis com design de classe mundial.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    {steps.map((step, idx) => (
                        <div key={idx} className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-cyan-500/20 p-8 rounded-2xl flex flex-col gap-6 transition-all duration-500 hover:translate-y-[-2px] hover:bg-white/[0.04]">
                            {/* Top accent line */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex justify-between items-center">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-400 bg-cyan-500/[0.08] border border-cyan-500/10 group-hover:bg-cyan-500/15 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.12)] transition-all">
                                    {step.icon}
                                </div>
                                <span className="text-[11px] font-mono font-bold text-white/12 group-hover:text-cyan-400/30 transition-colors">{step.num}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[15px] font-bold tracking-tight text-white">{step.title}</h3>
                                <p className="text-white/35 text-[13px] leading-relaxed">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
