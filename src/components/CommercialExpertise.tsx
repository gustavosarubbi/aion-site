"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Target,
    Headset,
    Gear,
    ArrowUpRight,
    CodeBlock,
    Lightning
} from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

function CardAutoridade({
    title,
    desc,
    icon: Icon,
    tag,
    className = "",
    delay = 0
}: {
    title: string;
    desc: string;
    icon: any;
    tag: string;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={`group relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-blue-500/20 ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon size={24} weight="bold" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase py-1 px-3 bg-white/5 rounded-full border border-white/5">
                        {tag}
                    </span>
                </div>

                <div>
                    <h3 style={montserrat} className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                        {desc}
                    </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-white/20 uppercase">Padrão QODEC</span>
                    <ArrowUpRight size={18} className="text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
            </div>
        </motion.div>
    );
}

export default function AutoridadeTecnica() {
    return (
        <section className="relative z-10 w-full py-24 md:py-40 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #06091c 35%, #080c22 55%, #000000 100%)" }}
        >
            {/* ── Rich Background Elements ── */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.05] blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.04] blur-[100px] rounded-full pointer-events-none" />

            {/* Dot Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Corner Accent */}
            <div className="absolute bottom-16 right-16 w-24 h-24 opacity-[0.06] pointer-events-none">
                <div className="absolute inset-0 border border-white/30 rotate-45" />
                <div className="absolute inset-3 border border-white/20 rotate-45" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-6"
                    >
                        Engenharia de Sucesso
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={montserrat}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]"
                    >
                        Autoridade técnica para <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400">
                            resultados inquestionáveis.
                        </span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
                    {/* Main Card */}
                    <CardAutoridade
                        className="md:col-span-6 lg:col-span-8 lg:row-span-2"
                        icon={Target}
                        tag="Precisão"
                        title="Sistemas de Alta Disponibilidade"
                        desc="Diferente de agências focadas em estética passageira, a QODEC entrega infraestruturas robustas. Seus sistemas nunca param, processando leads e dados enquanto você foca no seu negócio."
                        delay={0.1}
                    />

                    <CardAutoridade
                        className="md:col-span-3 lg:col-span-4 lg:row-span-2"
                        icon={Gear}
                        tag="Automação"
                        title="Fluxos Inteligentes"
                        desc="Sincronia perfeita entre seus sistemas de gestão, site e canais de atendimento. Engenharia de ponta que elimina erros operacionais e gargalos de processamento."
                        delay={0.5}
                    />

                    <CardAutoridade
                        className="md:col-span-3 lg:col-span-4"
                        icon={ShieldCheck}
                        tag="Segurança"
                        title="Protocolo de Elite"
                        desc="Criptografia ponta a ponta e arquitetura serverless blindada. Compliance total por design para operações críticas."
                        delay={0.2}
                    />

                    <CardAutoridade
                        className="md:col-span-3 lg:col-span-4"
                        icon={Headset}
                        tag="Suporte"
                        title="Acompanhamento Especializado"
                        desc="Acompanhamento técnico real, do planejamento estratégico à operação diária pós-deploy."
                        delay={0.3}
                    />

                    {/* New Grid Row */}
                    <CardAutoridade
                        className="md:col-span-3 lg:col-span-4"
                        icon={Lightning}
                        tag="Rapidez"
                        title="Performance Extrema"
                        desc="Carregamento instantâneo e otimização técnica profunda para escala massiva."
                        delay={0.4}
                    />

                    <CardAutoridade
                        className="md:col-span-3 lg:col-span-4"
                        icon={CodeBlock}
                        tag="Código Limpo"
                        title="Arquitetura Modular"
                        desc="Estrutura de software escalável que permite evoluções contínuas sem retrabalho."
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
}
