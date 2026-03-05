import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export default function FAQ() {
    const faqs = [
        { q: "Qual o prazo para entregar um site completo?", a: "Um site institucional ou landing page leva de 2 a 4 semanas. Projetos com automação e chatbot levam entre 4 e 8 semanas." },
        { q: "O bot de WhatsApp não arrisca banimento?", a: "Não. Utilizamos exclusivamente a API oficial do WhatsApp Cloud (Meta). Seguindo as políticas de uso, o risco é virtualmente zero." },
        { q: "Vocês integram com o meu CRM ou ERP?", a: "Sim. Trabalhamos com n8n, Make, Webhooks e APIs REST para conectar qualquer sistema — HubSpot, Pipedrive, RD Station e mais." },
        { q: "Atendem clientes fora do Brasil?", a: "Sim. Nossa stack é 100% na nuvem e nossos processos são assíncronos. Já atendemos clientes em Portugal, EUA e México." }
    ];

    return (
        <section id="faq" className="cv-auto relative z-10 w-full py-16 md:py-32 bg-gradient-to-b from-transparent via-[#020408] to-transparent" style={{ containIntrinsicSize: "760px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent"></div>

            <div className="max-w-3xl mx-auto px-6">
                <div className="flex flex-col items-center gap-4 text-center mb-16">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">FAQ</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">Perguntas frequentes.</h2>
                </div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white/[0.02] backdrop-blur-sm p-6 sm:p-7 group cursor-pointer border border-white/[0.06] hover:border-cyan-500/15 rounded-xl transition-all duration-300 flex justify-between items-start gap-6 hover:translate-y-[-1px] hover:bg-white/[0.04]">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[14px] font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">{faq.q}</h3>
                                <p className="text-white/35 text-[13px] leading-relaxed">{faq.a}</p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] group-hover:bg-cyan-500/10 group-hover:border-cyan-500/15 flex items-center justify-center shrink-0 transition-all mt-0.5">
                                <CaretDown size={14} weight="bold" className="text-white/30 group-hover:text-cyan-400 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
