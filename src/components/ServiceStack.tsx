import { CheckCircle, ArrowRight, Code, Robot, TreeStructure } from "@phosphor-icons/react/dist/ssr";

export default function ServiceStack() {
    const features = [
        "Landing Pages e Sites Institucionais com Next.js",
        "Chatbots inteligentes para WhatsApp (API Oficial)",
        "Automação de workflows com n8n, Make e Webhooks",
        "Integrações com CRMs, ERPs e plataformas de pagamento",
    ];

    return (
        <section id="services" className="cv-auto relative z-10 w-full py-32 bg-gradient-to-b from-transparent via-[#020510] to-transparent" style={{ containIntrinsicSize: "900px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 md:p-14 flex flex-col md:flex-row items-start justify-between gap-14 relative overflow-hidden">

                    {/* Background glows */}
                    <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-blue-500/[0.025] blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-violet-500/[0.02] blur-[80px] rounded-full pointer-events-none" />

                    {/* Left: Info */}
                    <div className="flex flex-col gap-8 flex-1 relative z-10 max-w-lg">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">Stack Completa</span>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tighter leading-tight">
                            Design, bots e automação<br />em um só lugar.
                        </h3>
                        <p className="text-white/40 leading-relaxed text-[15px]">
                            Da interface do seu site até os fluxos invisíveis que operam seu negócio — projetamos tudo como um sistema integrado que roda 24/7.
                        </p>

                        <ul className="flex flex-col gap-3 mt-2">
                            {features.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-[13px] font-medium text-white/50">
                                    <CheckCircle size={16} weight="duotone" className="text-blue-500/70 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="#"
                            className="group flex items-center justify-center gap-2 w-max mt-4 px-7 py-3 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.45)] transition-all rounded-full"
                        >
                            Falar com Especialista
                            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>

                    {/* Right: Visual Diagram */}
                    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-center relative z-10">
                        <div className="w-full flex flex-col gap-3 relative">
                            {/* Connector line */}
                            <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-blue-400/30 via-violet-500/20 to-orange-500/10 rounded-full" />

                            {/* Web Design card — blue */}
                            <div className="w-full h-14 bg-white/[0.03] backdrop-blur-sm border border-blue-500/20 rounded-xl flex items-center gap-3 px-8 hover:border-blue-500/40 hover:bg-blue-500/[0.05] transition-all cursor-default z-30 group">
                                <Code size={16} weight="duotone" className="text-blue-400 shrink-0" />
                                <span className="text-white text-[13px] font-semibold">Web Design & Desenvolvimento</span>
                                <span className="ml-auto text-[9px] font-bold tracking-widest text-blue-400/50 uppercase">azul</span>
                            </div>

                            {/* Chatbot card — violet */}
                            <div className="w-[92%] h-14 bg-white/[0.025] backdrop-blur-sm border border-violet-500/20 rounded-xl flex items-center gap-3 px-8 ml-auto hover:border-violet-500/40 hover:bg-violet-500/[0.05] transition-all cursor-default z-20">
                                <Robot size={16} weight="duotone" className="text-violet-400 shrink-0" />
                                <span className="text-white/70 text-[13px] font-medium">Chatbot WhatsApp com IA</span>
                                <span className="ml-auto text-[9px] font-bold tracking-widest text-violet-400/50 uppercase">roxo</span>
                            </div>

                            {/* Automação card — orange */}
                            <div className="w-[84%] h-14 bg-white/[0.018] border border-orange-500/15 rounded-xl flex items-center gap-3 px-8 ml-auto hover:border-orange-500/35 hover:bg-orange-500/[0.04] transition-all cursor-default z-10">
                                <TreeStructure size={16} weight="duotone" className="text-orange-400 shrink-0" />
                                <span className="text-white/50 text-[13px] font-medium">Workflows & Integrações</span>
                                <span className="ml-auto text-[9px] font-bold tracking-widest text-orange-400/40 uppercase">laranja</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
