"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: "Qual o prazo para um ecossistema completo?", a: "O tempo de implementação depende da complexidade da sua operação. Após o diagnóstico, definimos um cronograma preciso para o seu deploy." },
        { q: "O bot de WhatsApp é seguro contra banimentos?", a: "Sim. Utilizamos exclusivamente a API Oficial da Meta (WhatsApp Business Cloud), garantindo conformidade total com as políticas." },
        { q: "Vocês fazem integração com qualquer CRM?", a: "Sim. Nossas automações conectam HubSpot, RD Station, Pipedrive e sistemas proprietários via API ou conectores de dados." },
        { q: "A AION oferece suporte após a entrega?", a: "Sim. Oferecemos acompanhamento de estabilidade e suporte especializado para garantir que seu sistema opere com zero tempo de inatividade." }
    ];

    return (
        <section id="faq" className="relative z-10 w-full py-24 md:py-40 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #050717 35%, #070920 55%, #000000 100%)" }}
        >
            {/* ── Background Elements ── */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/[0.02] blur-[80px] rounded-full pointer-events-none" />

            {/* Vertical accent lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute left-[20%] w-px h-full bg-white" />
                <div className="absolute right-[20%] w-px h-full bg-white" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-6"
                    >
                        Perguntas Frequentes
                    </motion.span>
                    <h2 style={montserrat} className="text-4xl md:text-5xl font-bold tracking-tight text-white font-bold">
                        Eliminando <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">gargalos técnicos.</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className={`group bg-white/[0.02] backdrop-blur-md border ${openIndex === idx ? 'border-blue-500/30 bg-white/[0.04]' : 'border-white/[0.06]'} p-7 md:p-8 rounded-[24px] cursor-pointer hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-300`}
                        >
                            <div className="flex justify-between items-center gap-6">
                                <h3 style={montserrat} className={`text-[16px] md:text-[18px] font-bold tracking-tight transition-colors ${openIndex === idx ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>
                                    {faq.q}
                                </h3>
                                <div className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center shrink-0 ${openIndex === idx ? 'bg-blue-500 border-blue-400 rotate-180' : 'bg-white/5 border-white/10 group-hover:bg-blue-500 group-hover:border-blue-400'}`}>
                                    <CaretDown size={14} weight="bold" className={`transition-colors ${openIndex === idx ? 'text-black' : 'text-white/40 group-hover:text-black'}`} />
                                </div>
                            </div>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/40 text-sm leading-relaxed max-w-2xl border-t border-white/5 pt-4">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
