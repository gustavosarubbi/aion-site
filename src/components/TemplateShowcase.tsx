"use client";

import { motion } from "framer-motion";
import { ArrowRight, RocketLaunch, ChartBar, Cube, Check, Eye } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const sistemas = [
    {
        categoria: "Motor de Escala",
        titulo: "Ecossistema de Vendas v1.0",
        desc: "Landing page de alta conversão com funil integrado e automação de follow-up.",
        recursos: ["Página de Captura High-Ticket", "Checkout Integrado", "Bot WhatsApp 24/7"],
        stats: { label: "Desempenho", value: "98/100" },
        color: "text-blue-400",
        border: "border-blue-500/20",
        bg: "bg-blue-500/5",
        icon: RocketLaunch,
        image: "/template-vendas.png",
        gradientFrom: "from-blue-600/30",
        gradientTo: "to-cyan-500/10",
    },
    {
        categoria: "Autoridade Profissional",
        titulo: "Sistema de Saúde Elite",
        desc: "Plataforma premium para médicos que exigem prestígio e agendamento sem atrito.",
        recursos: ["Design Minimalista Premium", "Agendamento Automatizado", "Gestão de Pacientes"],
        stats: { label: "Fidelidade", value: "100%" },
        color: "text-cyan-400",
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/5",
        icon: ChartBar,
        image: "/template-saude.png",
        gradientFrom: "from-cyan-600/30",
        gradientTo: "to-sky-500/10",
    },
    {
        categoria: "Operações Sob Medida",
        titulo: "Arquiteto de Processos",
        desc: "Dashboard inteligente que conecta sua operação financeira, vendas e entrega em tempo real.",
        recursos: ["Automação de Workflows", "Painéis em Tempo Real", "Zero Trabalho Manual"],
        stats: { label: "Eficiência", value: "99%" },
        color: "text-sky-400",
        border: "border-sky-500/20",
        bg: "bg-sky-500/5",
        icon: Cube,
        image: "/template-automacao.png",
        gradientFrom: "from-sky-600/30",
        gradientTo: "to-blue-500/10",
    },
];

export default function VitrineSistemas() {
    return (
        <section id="sistemas" className="relative z-10 w-full py-24 md:py-40 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #020a18 40%, #030d1f 60%, #000000 100%)" }}
        >
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-500/[0.04] blur-[160px] rounded-full pointer-events-none" />

            {/* Subtle grid lines */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute left-1/4 w-px h-full bg-white" />
                <div className="absolute left-2/4 w-px h-full bg-white" />
                <div className="absolute left-3/4 w-px h-full bg-white" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="space-y-4 max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[11px] font-bold tracking-[0.4em] text-cyan-500 uppercase"
                        >
                            Templates Premium
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={montserrat}
                            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
                        >
                            Sites prontos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Converter.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-white/40 text-base leading-relaxed"
                        >
                            Arquiteturas testadas e otimizadas para resultados reais. Cada template é um ecossistema completo com design de conversão e automações prontas para escalar seu negócio.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/templates"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/60 uppercase tracking-[0.1em] hover:bg-white/10 hover:text-white transition-all"
                        >
                            <Eye size={18} />
                            Ver Galeria Completa
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {sistemas.map((sis, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12, duration: 0.6 }}
                            className={`group flex flex-col bg-white/[0.02] backdrop-blur-md border ${sis.border} rounded-[28px] overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
                        >
                            {/* ── Image Preview with Browser Chrome ── */}
                            <div className="relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${sis.gradientFrom} ${sis.gradientTo} opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none z-10`} />
                                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06] relative z-20">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                                    </div>
                                    <div className="flex-1 mx-2 h-3 rounded bg-white/[0.04]" />
                                </div>
                                <Image
                                    src={sis.image}
                                    alt={sis.titulo}
                                    width={600}
                                    height={340}
                                    className="w-full h-[180px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="p-7 lg:p-8 space-y-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className={`w-10 h-10 rounded-xl ${sis.bg} border ${sis.border} flex items-center justify-center`}>
                                        <sis.icon size={20} weight="duotone" className={sis.color} />
                                    </div>
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase py-1 px-2.5 bg-white/[0.05] rounded-full">
                                        {sis.categoria}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h3 style={montserrat} className="text-xl font-bold text-white tracking-tight">
                                        {sis.titulo}
                                    </h3>
                                    <p className="text-white/35 text-sm leading-relaxed">
                                        {sis.desc}
                                    </p>
                                </div>

                                <ul className="space-y-2.5">
                                    {sis.recursos.map((rec, rIdx) => (
                                        <li key={rIdx} className="flex items-center gap-2.5 text-xs text-white/50 font-medium">
                                            <div className={`w-4 h-4 rounded-full ${sis.bg} border ${sis.border} flex items-center justify-center shrink-0`}>
                                                <Check size={8} weight="bold" className={sis.color} />
                                            </div>
                                            {rec}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-5 flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-none">
                                            {sis.stats.label}
                                        </p>
                                        <p className={`text-xl font-bold ${sis.color}`}>
                                            {sis.stats.value}
                                        </p>
                                    </div>
                                    <Link
                                        href="/templates"
                                        className="group/btn relative h-9 px-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 transition-all hover:bg-cyan-500 hover:border-cyan-400 overflow-hidden"
                                    >
                                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[9px] font-bold tracking-[0.15em] text-black transition-all duration-500 group-hover/btn:max-w-[100px] uppercase">
                                            Ver Mais
                                        </span>
                                        <ArrowRight size={16} weight="bold" className="text-white group-hover/btn:text-black transition-colors shrink-0" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 flex flex-col items-center text-center gap-6"
                >
                    <p className="text-white/20 text-xs font-bold tracking-[0.2em] uppercase">
                        Cada template inclui deploy completo + 30 dias de suporte
                    </p>
                    <Link
                        href="/templates"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold text-sm tracking-[0.08em] uppercase shadow-[0_12px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Explorar Todos os Templates
                        <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
