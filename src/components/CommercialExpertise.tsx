import { Globe, WhatsappLogo, ChartLineUp } from "@phosphor-icons/react/dist/ssr";

export default function CommercialExpertise() {
    const areas = [
        {
            icon: <Globe size={22} weight="duotone" />,
            title: "Web Design Premium",
            desc: "Sites e landing pages com design de alto impacto. Interfaces modernas construídas em Next.js que carregam rápido e convertem mais rápido.",
            tag: "UI/UX",
            accentColor: "cyan"
        },
        {
            icon: <WhatsappLogo size={22} weight="duotone" />,
            title: "Bots de WhatsApp",
            desc: "Atendentes virtuais inteligentes que qualificam leads, respondem dúvidas e agendam reuniões — rodando na API oficial da Meta, 24h/dia.",
            tag: "CHATBOT",
            accentColor: "cyan"
        },
        {
            icon: <ChartLineUp size={22} weight="duotone" />,
            title: "Automação de Processos",
            desc: "Workflows conectando CRMs, ERPs e APIs para eliminar tarefas manuais. Sua equipe foca no que importa.",
            tag: "N8N / MAKE",
            accentColor: "cyan"
        }
    ];

    return (
        <section id="services" className="relative z-10 w-full py-32 bg-gradient-to-b from-transparent via-[#020610] to-transparent">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-20">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">O Que Fazemos</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
                        Três pilares.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Um ecossistema.</span>
                    </h2>
                    <p className="text-white/40 mt-1 text-balance leading-relaxed">
                        Combinamos design premium, inteligência artificial e automação para construir máquinas de crescimento digital.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    {areas.map((area, idx) => (
                        <div
                            key={idx}
                            className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-cyan-500/20 p-8 rounded-2xl transition-all duration-500 flex flex-col gap-7 flex-1 relative overflow-hidden hover:translate-y-[-2px] hover:bg-white/[0.04]"
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent group-hover:from-cyan-500/[0.03] transition-all duration-700 pointer-events-none"></div>

                            <div className="flex items-center justify-between relative z-10">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-cyan-600/80 to-blue-600/80 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                    {area.icon}
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.15em] text-white/30 px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
                                    {area.tag}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 relative z-10">
                                <h3 className="text-lg font-bold tracking-tight text-white">{area.title}</h3>
                                <p className="text-[13px] text-white/35 leading-relaxed">{area.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
