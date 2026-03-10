"use client";

import { motion } from "framer-motion";
import { MagnifyingGlass, CursorClick, Cpu, ShieldCheck, ArrowRight } from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

// THEME COLOR: #379cfd
const THEME_BLUE = "#379cfd";

const pilares = [
    {
        title: "DIAGNÓSTICO ESTRATÉGICO",
        desc: "Mergulhamos em seus gargalos operacionais para arquitetar soluções que maximizam sua eficiência e receita.",
        tag: "AUDITORIA INICIAL",
        Icon: MagnifyingGlass,
        image: "/assets/showcase/card_1_tech.jpg",
        delay: 0.1
    },
    {
        title: "EXPERIÊNCIA DE CONVERSÃO PREMIUM",
        desc: "Interfaces que transmitem prestígio e autoridade técnica para seu público high-ticket. Cada detalhe guia à ação.",
        tag: "UX DE ALTA PERFORMANCE",
        Icon: CursorClick,
        image: "/assets/showcase/card_2_tech.jpg",
        delay: 0.2
    },
    {
        title: "INTELIGÊNCIA OPERACIONAL & ESCALA",
        desc: "Elimine erros manuais e processe dados 24/7. Integração completa de pagamentos e fluxos críticos.",
        tag: "REDUÇÃO DE ERROS",
        Icon: Cpu,
        image: "/assets/showcase/card_3_tech.jpg",
        delay: 0.3
    },
    {
        title: "ESTABILIDADE CRÍTICA E MONITORAMENTO",
        desc: "Implementamos infraestrutura robusta na nuvem. Monitoramento proativo para garantir zero downtime.",
        tag: "GARANTIA DE DISPONIBILIDADE",
        Icon: ShieldCheck,
        image: "/assets/showcase/card_4_tech.jpg",
        delay: 0.4
    }
];

export default function VitrineEngenharia() {
    return (
        <section id="engenharia" className="relative z-10 w-full py-16 md:py-24 overflow-hidden bg-[#00030A]">
            {/* ── Background Elements ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Primary Premium Background - Platinum/White/Blue Tech Layer */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-0 opacity-30"
                    style={{
                        backgroundImage: `url('/assets/showcase/bg_lowpoly_structure.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(1) brightness(1.2) contrast(1.2) sepia(1) hue-rotate(185deg) saturate(4)'
                    }}
                />

                {/* Theme Color #379cfd Accents */}
                <div className="absolute inset-0 bg-[#379cfd]/5 mix-blend-overlay z-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#00030A] via-[#00030A]/70 to-[#00030A] z-0" />

                {/* Floating 3D Premium Elements - Stylized Torus Knot */}
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        rotate: [15, 25, 15],
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -left-32 w-[600px] h-[600px] z-0"
                >
                    <img
                        src="/assets/showcase/shape_knot_structure.png"
                        alt=""
                        className="w-full h-full object-contain"
                        style={{
                            filter: 'grayscale(1) brightness(1.1) sepia(1) hue-rotate(188deg) saturate(6) contrast(1.3)'
                        }}
                    />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 50, 0],
                        rotate: [-15, -25, -15],
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-48 -right-48 w-[800px] h-[800px] z-0"
                >
                    <img
                        src="/assets/showcase/shape_knot_structure.png"
                        alt=""
                        className="w-full h-full object-contain"
                        style={{
                            filter: 'grayscale(1) brightness(1.1) sepia(1) hue-rotate(188deg) saturate(4) contrast(1.2) blur(4px)'
                        }}
                    />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading Section */}
                <div className="text-center space-y-6 mb-16 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-32 bg-[#379cfd]/10 blur-[100px] rounded-full -z-10" />

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-[12px] font-black tracking-[1em] text-[#379cfd] uppercase drop-shadow-[0_0_15px_rgba(55,156,253,0.8)]"
                    >
                        ENGENHARIA E PERFORMANCE
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={montserrat}
                        className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#379cfd]/60 leading-[0.9] uppercase relative z-10"
                    >
                        ARQUITETAMOS <br />
                        ECOSSISTEMAS <br />
                        DE ELITE
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed tracking-wider"
                    >
                        Padrão AION: Excelência técnica e estética premium operando em sintonia absoluta com a paleta #379cfd.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                    {pilares.map((pilar, idx) => (
                        <CardPilar
                            key={idx}
                            {...pilar}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CardPilar({ title, desc, tag, Icon, image, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-7 rounded-[32px] border border-white/[0.04] hover:border-[#379cfd]/50 transition-all duration-700 overflow-hidden flex flex-col h-full min-h-[420px] bg-[#01040D]/60 backdrop-blur-md"
        >
            {/* Card Base Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050C21] to-[#01040D] z-0" />

            {/* Premium Asset Reveal Layer - Now strictly filtered to #379cfd */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-[3s] ease-out group-hover:scale-105 opacity-20 group-hover:opacity-60"
                style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(1) sepia(1) hue-rotate(185deg) saturate(5) contrast(130%) brightness(0.9)'
                }}
            />

            {/* Specific Blue #379cfd Tint Overlay */}
            <div className="absolute inset-0 mix-blend-color bg-[#379cfd]/30 z-0 pointer-events-none" />

            {/* Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#01040D] via-[#01040D]/80 to-transparent group-hover:from-[#01040D] group-hover:via-[#01040D]/40 group-hover:to-[#379cfd]/25 transition-all duration-700 z-0" />

            {/* Inner Reflective Border */}
            <div className="absolute inset-0 rounded-[32px] border border-white/[0.06] pointer-events-none z-10" />

            {/* Content Body */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Thin Premium Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#379cfd]/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-8 self-start group-hover:scale-110 group-hover:border-[#379cfd]/70 group-hover:bg-[#379cfd]/10 group-hover:shadow-[0_0_30px_rgba(55,156,253,0.3)] transition-all duration-500 shadow-xl">
                    <Icon size={28} weight="thin" className="text-[#379cfd] group-hover:text-white transition-colors duration-400" />
                </div>

                <div className="mt-auto">
                    <h3 style={montserrat} className="text-lg font-bold text-white mb-3 tracking-tight leading-snug uppercase">
                        {title}
                    </h3>

                    <p className="text-white/50 text-[13px] leading-relaxed mb-8 font-light group-hover:text-white/90 transition-colors tracking-tight">
                        {desc}
                    </p>

                    <div className="pt-5 border-t border-white/[0.08] group-hover:border-[#379cfd]/50 transition-colors duration-500 flex justify-between items-center">
                        <span className="text-[9px] font-black tracking-[0.2em] text-[#379cfd] uppercase bg-[#379cfd]/5 px-4 py-2 rounded-full border border-[#379cfd]/20 group-hover:bg-[#379cfd] group-hover:text-black transition-all duration-400">
                            {tag}
                        </span>

                        <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#379cfd] group-hover:bg-[#379cfd] transition-all duration-400">
                            <ArrowRight size={18} weight="bold" className="text-white group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
