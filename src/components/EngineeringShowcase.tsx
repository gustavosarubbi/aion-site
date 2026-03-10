"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, CursorClick, Cpu, ShieldCheck, ArrowRight } from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

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
                const res = await fetch("/api/showcase");
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
        <section id="engenharia" className="relative z-10 w-full py-24 md:py-32 overflow-hidden bg-[#00040D]">
            {/* ── Background Elements ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dynamic Premium Background */}
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
                                filter: 'contrast(130%) brightness(0.5) saturate(1.2)'
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Intense Specific Blue #3188ff Palette Casting */}
                <div className="absolute inset-0 bg-[#3188ff]/30 mix-blend-overlay z-0" />
                <div className="absolute inset-0 bg-[#3188ff]/10 mix-blend-color z-0" />
                <div className="absolute inset-0 bg-[#00040D]/70 z-0" />

                {/* Vertical Fade gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00040D] via-transparent to-[#00040D] z-0" />

                {/* Composed 3D Elements - Fixing "Square Box" by adding masks and better blending */}
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[5%] -left-32 w-[650px] h-[650px] opacity-40 mix-blend-screen z-0"
                >
                    <img
                        src="/assets/3d_shape_glass_cyan.png"
                        alt=""
                        className="w-full h-full object-contain blur-[1px]"
                        style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)' }}
                    />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 40, 0], rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] -right-48 w-[800px] h-[800px] opacity-20 mix-blend-screen z-0"
                >
                    <img
                        src="/assets/3d_shape_glass_cyan.png"
                        alt=""
                        className="w-full h-full object-contain blur-[5px]"
                        style={{ maskImage: 'radial-gradient(circle, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 75%)' }}
                    />
                </motion.div>

                {/* Futuristic Tech Grid Texture */}
                <div
                    className="absolute inset-0 opacity-15 mix-blend-overlay z-0"
                    style={{
                        backgroundImage: "url('/assets/dark_tech_bg_grid.png')",
                        backgroundSize: '900px',
                        backgroundRepeat: 'repeat',
                        maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                    }}
                />

                {/* Wavy Kinetic Path using #3188ff */}
                <svg className="absolute top-1/2 left-0 w-full h-80 -translate-y-1/2 opacity-30 blur-xl mix-blend-screen z-0" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M0 60C150 110 300 10 450 60C600 110 750 10 900 60C1050 110 1200 60 1200 60"
                        stroke="#3188ff"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 7, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading Section */}
                <div className="text-center space-y-6 mb-24 relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[700px] h-32 bg-[#3188ff]/10 blur-[100px] rounded-full -z-10" />

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-[11px] font-black tracking-[0.7em] text-[#3188ff] uppercase drop-shadow-[0_0_12px_rgba(49,136,255,0.6)]"
                    >
                        ENGENHARIA E PERFORMANCE
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={montserrat}
                        className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#3188ff]/40 leading-tight uppercase relative z-10"
                    >
                        ARQUITETAMOS ECOSSISTEMAS <br className="hidden md:block" />
                        DIGITAIS DE ELITE
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Do diagnóstico à operação crítica. Soluções robustas e automações inteligentes com excelência técnica e estética premium sob medida.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.7 }}
            className="group relative p-8 rounded-[36px] border border-white/5 hover:border-[#3188ff]/40 transition-all duration-700 overflow-hidden flex flex-col h-full min-h-[480px] bg-[#050A18]/20 backdrop-blur-sm"
        >
            {/* Card Base Layer */}
            <div className="absolute inset-0 bg-[#00040D] z-0" />

            {/* Premium Asset Reveal Layer */}
            <AnimatePresence>
                {!isLoading && cardImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.12, scale: 1 }}
                        className="absolute inset-0 z-0 transition-transform duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-45"
                        style={{
                            backgroundImage: `url('${cardImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'saturate(1.2)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Shimmer Effect */}
            {isLoading && (
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#3188ff]/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            )}

            {/* Specific Blue #3188ff Tint Overlay */}
            <div className="absolute inset-0 mix-blend-color bg-[#3188ff]/20 z-0 pointer-events-none" />

            {/* Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00040D] via-[#00040D]/80 to-transparent group-hover:from-[#00040D] group-hover:via-[#00040D]/40 group-hover:to-[#3188ff]/20 transition-all duration-700 z-0" />

            {/* Inner Reflective Border */}
            <div className="absolute inset-0 rounded-[36px] border border-white/[0.03] pointer-events-none z-10" />

            {/* Content Body */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Thin Premium Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#3188ff]/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center mb-12 self-start group-hover:scale-110 group-hover:border-[#3188ff]/50 group-hover:bg-[#3188ff]/10 group-hover:shadow-[0_0_20px_rgba(49,136,255,0.2)] transition-all duration-500">
                    <Icon size={34} weight="thin" className="text-[#3188ff] group-hover:text-white transition-colors duration-400" />
                </div>

                <div className="mt-auto">
                    <h3 style={montserrat} className="text-xl font-bold text-white mb-4 tracking-tight leading-snug uppercase">
                        {title}
                    </h3>

                    <p className="text-white/40 text-[13.5px] leading-relaxed mb-12 font-light group-hover:text-white/60 transition-colors">
                        {desc}
                    </p>

                    <div className="pt-5 border-t border-white/[0.05] group-hover:border-[#3188ff]/30 transition-colors duration-500 flex justify-between items-center">
                        <span className="text-[10px] font-black tracking-[0.2em] text-[#3188ff] uppercase bg-[#3188ff]/5 px-5 py-2.5 rounded-full border border-[#3188ff]/10 group-hover:bg-[#3188ff] group-hover:text-black transition-all duration-300">
                            {tag}
                        </span>

                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#3188ff] group-hover:bg-[#3188ff] transition-all duration-300">
                            <ArrowRight size={18} weight="bold" className="text-white group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
