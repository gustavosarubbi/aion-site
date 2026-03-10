"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        delay: 0.1
    },
    {
        title: "EXPERIÊNCIA DE CONVERSÃO PREMIUM",
        desc: "Interfaces que transmitem prestígio e autoridade técnica para seu público high-ticket. Cada detalhe guia à ação.",
        tag: "UX DE ALTA PERFORMANCE",
        Icon: CursorClick,
        delay: 0.2
    },
    {
        title: "INTELIGÊNCIA OPERACIONAL & ESCALA",
        desc: "Elimine erros manuais e processe dados 24/7. Integração completa de pagamentos e fluxos críticos.",
        tag: "REDUÇÃO DE ERROS",
        Icon: Cpu,
        delay: 0.3
    },
    {
        title: "ESTABILIDADE CRÍTICA E MONITORAMENTO",
        desc: "Implementamos infraestrutura robusta na nuvem. Monitoramento proativo para garantir zero downtime.",
        tag: "GARANTIA DE DISPONIBILIDADE",
        Icon: ShieldCheck,
        delay: 0.4
    }
];

export default function VitrineEngenharia() {
    const [assets, setAssets] = useState<{ background: string, cards: string[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadAssets() {
            try {
                const res = await fetch(`/api/showcase?purge=${Date.now()}`);
                const data = await res.json();
                setAssets(data);
            } catch (error) {
                console.error("Failed to load assets", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadAssets();
    }, []);

    return (
        <section id="engenharia" className="relative z-10 w-full py-24 md:py-32 overflow-hidden bg-[#00030A]">
            {/* ── Background Elements ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dynamic Premium Background - Strictly Color Grayscale + #379cfd Overlay */}
                <AnimatePresence>
                    {!isLoading && assets?.background && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 3 }}
                            className="absolute inset-0 z-0"
                            style={{
                                backgroundImage: `url('${assets.background}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(1) brightness(0.6) contrast(120%)'
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Force Specific Blue #379cfd Casting */}
                <div className="absolute inset-0 bg-[#379cfd]/30 mix-blend-overlay z-0" />
                <div className="absolute inset-0 bg-[#379cfd]/10 mix-blend-color z-0" />
                <div className="absolute inset-0 bg-[#00030A]/85 z-0" />

                {/* Composed 3D Elements - Fixing "Square Box" and Palette #379cfd perfectly */}
                <motion.div
                    animate={{ y: [0, -45, 0], rotate: [0, 15, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[8%] -left-32 w-[700px] h-[700px] z-0"
                >
                    <div
                        className="w-full h-full bg-[#379cfd] opacity-50 blur-[2px]"
                        style={{
                            maskImage: 'url("/assets/3d_shape_glass_cyan.png")',
                            WebkitMaskImage: 'url("/assets/3d_shape_glass_cyan.png")',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                        }}
                    />
                    {/* Secondary layer for glow/depth overlay */}
                    <img
                        src="/assets/3d_shape_glass_cyan.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-20"
                        style={{
                            filter: 'hue-rotate(25deg) saturate(2)',
                            maskImage: 'radial-gradient(circle, black 30%, transparent 65%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 65%)'
                        }}
                    />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 60, 0], rotate: [0, -12, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-15%] -right-48 w-[950px] h-[950px] z-0"
                >
                    <div
                        className="w-full h-full bg-[#379cfd] opacity-35 blur-[10px]"
                        style={{
                            maskImage: 'url("/assets/3d_shape_glass_cyan.png")',
                            WebkitMaskImage: 'url("/assets/3d_shape_glass_cyan.png")',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                        }}
                    />
                    <img
                        src="/assets/3d_shape_glass_cyan.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain blur-[8px] mix-blend-screen opacity-15"
                        style={{
                            filter: 'hue-rotate(30deg) saturate(2)',
                            maskImage: 'radial-gradient(circle, black 25%, transparent 60%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 25%, transparent 60%)'
                        }}
                    />
                </motion.div>

                {/* Wavy Kinetic Path using #379cfd */}
                <svg className="absolute top-1/2 left-0 w-full h-[600px] -translate-y-1/2 opacity-30 blur-3xl mix-blend-screen z-0" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M0 60C150 110 300 10 450 60C600 110 750 10 900 60C1050 110 1200 60 1200 60"
                        stroke={THEME_BLUE}
                        strokeWidth="5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 8, ease: "easeInOut" }}
                    />
                </svg>

                <div className="absolute inset-0 bg-gradient-to-b from-[#00030A] via-transparent to-[#00030A] z-0" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading Section */}
                <div className="text-center space-y-8 mb-24 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-40 bg-[#379cfd]/20 blur-[130px] rounded-full -z-10" />

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
                        className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#379cfd]/60 leading-[0.85] uppercase relative z-10"
                    >
                        ARQUITETAMOS <br />
                        ECOSSISTEMAS <br />
                        DE ELITE
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed tracking-wider"
                    >
                        Padrão AION: Excelência técnica e estética premium operando em sintonia absoluta com a paleta #379cfd.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
                    {pilares.map((pilar, idx) => (
                        <CardPilar
                            key={idx}
                            {...pilar}
                            cardImage={assets?.cards?.[idx]}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CardPilar({ title, desc, tag, Icon, delay, cardImage, isLoading }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-9 rounded-[42px] border border-white/[0.04] hover:border-[#379cfd]/60 transition-all duration-700 overflow-hidden flex flex-col h-full min-h-[520px] bg-[#01040D]/40 backdrop-blur-[8px]"
        >
            {/* Card Base Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050C21] to-[#01040D] z-0" />

            {/* Premium Asset Reveal Layer - Now strictly filtered to #379cfd */}
            <AnimatePresence>
                {!isLoading && cardImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        className="absolute inset-0 z-0 transition-transform duration-[3s] ease-out group-hover:scale-105 group-hover:opacity-75"
                        style={{
                            backgroundImage: `url('${cardImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(1) sepia(1) hue-rotate(185deg) saturate(5) contrast(130%) brightness(0.9)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Shimmer Effect */}
            {isLoading && (
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#379cfd]/15 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            )}

            {/* Specific Blue #379cfd Tint Overlay */}
            <div className="absolute inset-0 mix-blend-color bg-[#379cfd]/30 z-0 pointer-events-none" />

            {/* Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#01040D] via-[#01040D]/80 to-transparent group-hover:from-[#01040D] group-hover:via-[#01040D]/40 group-hover:to-[#379cfd]/25 transition-all duration-700 z-0" />

            {/* Inner Reflective Border */}
            <div className="absolute inset-0 rounded-[42px] border border-white/[0.06] pointer-events-none z-10" />

            {/* Content Body */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Thin Premium Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#379cfd]/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center mb-16 self-start group-hover:scale-110 group-hover:border-[#379cfd]/70 group-hover:bg-[#379cfd]/10 group-hover:shadow-[0_0_40px_rgba(55,156,253,0.3)] transition-all duration-500 shadow-2xl">
                    <Icon size={34} weight="thin" className="text-[#379cfd] group-hover:text-white transition-colors duration-400" />
                </div>

                <div className="mt-auto">
                    <h3 style={montserrat} className="text-xl font-bold text-white mb-4 tracking-tight leading-snug uppercase">
                        {title}
                    </h3>

                    <p className="text-white/45 text-[14px] leading-relaxed mb-16 font-light group-hover:text-white/80 transition-colors tracking-tight">
                        {desc}
                    </p>

                    <div className="pt-7 border-t border-white/[0.08] group-hover:border-[#379cfd]/50 transition-colors duration-500 flex justify-between items-center">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#379cfd] uppercase bg-[#379cfd]/5 px-6 py-3 rounded-full border border-[#379cfd]/20 group-hover:bg-[#379cfd] group-hover:text-black transition-all duration-400 shadow-xl">
                            {tag}
                        </span>

                        <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#379cfd] group-hover:bg-[#379cfd] transition-all duration-400 shadow-2xl">
                            <ArrowRight size={22} weight="bold" className="text-white group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
