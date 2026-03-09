"use client";

import { motion } from "framer-motion";
import {
    ChartBar,
    Target,
    Lightning,
    ShieldCheck,
    TrendUp,
    Pulse
} from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const pilares = [
    {
        title: "Inteligência Operacional",
        desc: "Elimine gargalos e processe dados 24/7 com automação de fluxo e integrações robustas.",
        icon: ChartBar,
        color: "text-blue-400",
        bg: "bg-blue-400/5",
        border: "border-blue-400/20",
        delay: 0.1
    },
    {
        title: "Experiência de Conversão",
        desc: "Interfaces minimalistas desenhadas sob medida para guiar leads de alto valor até o fechamento.",
        icon: Target,
        color: "text-cyan-300",
        bg: "bg-cyan-300/5",
        border: "border-cyan-300/20",
        delay: 0.2
    },
    {
        title: "Escalabilidade de Elite",
        desc: "Sistemas arquitetados para suportar o crescimento sem perder estabilidade ou velocidade.",
        icon: Lightning,
        color: "text-sky-400",
        bg: "bg-sky-400/5",
        border: "border-sky-400/20",
        delay: 0.3
    }
];

export default function VitrineEngenharia() {
    return (
        <section id="engenharia" className="relative z-10 w-full py-24 md:py-40 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #030918 40%, #050d20 60%, #000000 100%)" }}
        >
            {/* ── Rich Background Elements ── */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                }}
            />

            {/* Diagonal Lines */}
            <div className="absolute top-20 right-20 w-32 h-32 opacity-[0.06] pointer-events-none">
                <div className="absolute inset-0 border border-white/30 rotate-45" />
                <div className="absolute inset-4 border border-white/20 rotate-45" />
                <div className="absolute inset-8 border border-white/10 rotate-45" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Manifesto Column */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase"
                            >
                                O Manifesto
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                style={montserrat}
                                className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
                            >
                                Arquitetamos <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ecossistemas Digitais.</span>
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-white/40 text-lg md:text-xl leading-relaxed max-w-lg"
                        >
                            Do consultório médico à operação logística, transformamos gargalos em fluxos automatizados de receita. Se o desafio é escala e monitoramento crítico, o AION é a solução final.
                        </motion.p>

                        {/* Animated KPI Bars */}
                        <div className="space-y-6 pt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="text-2xl font-bold text-blue-400"
                                    >
                                        500k+
                                    </motion.p>
                                    <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Dados Processados</p>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "85%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="text-2xl font-bold text-cyan-400"
                                    >
                                        99.9%
                                    </motion.p>
                                    <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Uptime Real</p>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "99.9%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <ShieldCheck size={18} className="text-blue-400" />
                                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Segurança Total</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <TrendUp size={18} className="text-cyan-400" />
                                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Escala Real</span>
                            </div>
                        </div>

                    </div>

                    {/* Pillars Column */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {pilares.slice(0, 2).map((pilar, idx) => (
                                <CardPilar key={idx} {...pilar} />
                            ))}
                        </div>
                        <div className="md:mt-12 space-y-6">
                            {pilares.slice(2).map((pilar, idx) => (
                                <CardPilar key={idx} {...pilar} />
                            ))}
                            {/* Real Card replacing placeholder */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="group p-8 rounded-[32px] bg-gradient-to-br from-blue-500/[0.06] to-cyan-500/[0.03] backdrop-blur-md border border-blue-400/15 hover:border-blue-400/30 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Pulse size={24} weight="duotone" className="text-blue-400" />
                                    </div>
                                    <h3 style={montserrat} className="text-xl font-bold text-white mb-3 tracking-tight">Monitoramento 24/7</h3>
                                    <p className="text-white/30 text-sm leading-relaxed">Supervisão contínua com alertas em tempo real para que nenhum evento crítico passe despercebido.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CardPilar({ title, desc, icon: Icon, color, bg, border, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className={`group p-8 rounded-[32px] bg-white/[0.02] backdrop-blur-md border ${border} hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden`}
        >
            {/* Subtle inner glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} weight="duotone" className={color} />
                </div>
                <h3 style={montserrat} className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}
