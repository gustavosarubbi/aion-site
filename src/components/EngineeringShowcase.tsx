"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import LordIcon from "./LordIcon";
import Image from "next/image";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

// Curated Unsplash images — direct CDN URLs, no API key needed
const pilares = [
    {
        title: "DIAGNÓSTICO DE POTENCIAL",
        desc: "Descubra o dinheiro que você deixa na mesa. Analisamos seu cenário e revelamos o caminho exato para multiplicar seus resultados.",
        tag: "CONSULTORIA ESTRATÉGICA",
        iconId: "msoeawqm",
        // Analytics / data charts
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
        accentColor: "rgba(55,156,253,0.4)",
        delay: 0.1
    },
    {
        title: "POSICIONAMENTO PREMIUM",
        desc: "Design impressionante que apaixona clientes no primeiro olhar, transmitindo a autoridade e o alto valor que sua marca merece.",
        tag: "DESIGN QUE CONVERTE",
        iconId: "wloilxuq",
        // Premium laptop/UI design
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop",
        accentColor: "rgba(93,184,255,0.35)",
        delay: 0.2
    },
    {
        title: "OPERAÇÃO ESCALÁVEL",
        desc: "Venda mais, 24 horas por dia. Automatizamos processos para sua empresa rodar quase no piloto automático, sem esforço extra.",
        tag: "VENDAS NO AUTOMÁTICO",
        iconId: "hwuyodym",
        // Circuit board / automation tech
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
        accentColor: "rgba(55,156,253,0.3)",
        delay: 0.3
    },
    {
        title: "INFRAESTRUTURA BLINDADA",
        desc: "Tecnologia de ponta para que seu site nunca caia nos picos de acesso. Segurança e velocidade para você não perder nenhuma venda.",
        tag: "SEM PERDA DE VENDAS",
        iconId: "shield2",
        // Server room / infrastructure
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
        accentColor: "rgba(30,95,168,0.4)",
        delay: 0.4
    }
];

export default function VitrineEngenharia() {
    return (
        <section id="engenharia" className="relative z-10 w-full py-16 md:py-24 overflow-hidden bg-[#00030A]">
            {/* ── Background Decoration (pointer-events-none, clipped, not overlapping content) ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Subtle grid texture */}
                <div className="absolute inset-0 bg-[#379cfd]/5 mix-blend-overlay z-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#00030A] via-[#00030A]/70 to-[#00030A] z-0" />

                {/* Top-right remote decorative orb — hidden on mobile so it doesn't interfere */}
                <motion.div
                    animate={{ y: [0, -30, 0], scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden md:block absolute -top-24 -right-24 w-[420px] h-[420px] z-0"
                >
                    <img
                        src="/assets/showcase/shape_knot_structure.png"
                        alt=""
                        className="w-full h-full object-contain"
                        style={{ filter: 'grayscale(1) brightness(1.1) sepia(1) hue-rotate(188deg) saturate(6) contrast(1.3)' }}
                    />
                </motion.div>

                {/* Bottom-left remote decorative orb */}
                <motion.div
                    animate={{ y: [0, 40, 0], scale: [1, 1.1, 1], opacity: [0.15, 0.28, 0.15] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="hidden md:block absolute -bottom-40 -left-40 w-[560px] h-[560px] z-0"
                >
                    <img
                        src="/assets/showcase/shape_knot_structure.png"
                        alt=""
                        className="w-full h-full object-contain"
                        style={{ filter: 'grayscale(1) brightness(1.05) sepia(1) hue-rotate(188deg) saturate(4) contrast(1.2) blur(6px)' }}
                    />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* ── Heading Section ── */}
                <div className="text-center space-y-4 mb-14 md:mb-20 relative">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-[#379cfd]/8 blur-[80px] rounded-full -z-10" />

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-[9px] sm:text-[10px] font-black tracking-[0.35em] sm:tracking-[0.5em] text-[#379cfd] uppercase drop-shadow-[0_0_12px_rgba(55,156,253,0.7)]"
                    >
                        MÉTODO EXCLUSIVO QODEC
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={montserrat}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#379cfd]/60 leading-[0.9] uppercase"
                    >
                        ECOSSISTEMAS <br />
                        DIGITAIS QUE <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>ESCALAM{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#379cfd] to-[#5db8ff]">VENDAS</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide px-4"
                    >
                        Não entregamos apenas sites. Construímos plataformas dinâmicas e irresistíveis, com design premium e engenharia de conversão para posicionar sua marca no topo.
                    </motion.p>
                </div>

                {/* ── Cards Grid ── */}
                {/* Mobile: 1 col | Tablet: 2 col | Desktop: 4 col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {pilares.map((pilar, idx) => (
                        <CardPilar key={idx} {...pilar} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CardPilar({ title, desc, tag, iconId, image, accentColor, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-[28px] border border-white/[0.04] hover:border-[#379cfd]/50 transition-all duration-700 overflow-hidden flex flex-col backdrop-blur-md"
            style={{ minHeight: 420 }}
        >
            {/* Photo Background */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[28px]">
                {/* eslint-disable-next-line */}
                <img
                    src={image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
                    style={{
                        filter: 'grayscale(1) sepia(1) hue-rotate(190deg) saturate(4) contrast(1.1) brightness(0.55)'
                    }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00030A] via-[#00030A]/75 to-[#00030A]/40 z-10" />
                {/* Hover accent glow */}
                <div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor} 0%, transparent 65%)` }}
                />
            </div>

            {/* Inner glow border */}
            <div className="absolute inset-0 rounded-[28px] border border-white/[0.06] pointer-events-none z-20" />

            {/* Content */}
            <div className="relative z-30 flex flex-col h-full p-6 sm:p-7">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#379cfd]/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6 self-start group-hover:scale-110 group-hover:border-[#379cfd]/70 group-hover:bg-[#379cfd]/10 transition-all duration-500 shadow-xl overflow-hidden">
                    <motion.div
                        className="flex items-center justify-center w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                        <LordIcon
                            src={`/assets/icons/${iconId}.json`}
                            trigger="hover"
                            size={32}
                            stroke="bold"
                            colors={`primary:#379cfd,secondary:#ffffff`}
                        />
                    </motion.div>
                </div>

                <div className="mt-auto">
                    <h3 style={montserrat} className="text-base sm:text-lg font-bold text-white mb-3 tracking-tight leading-snug uppercase">
                        {title}
                    </h3>

                    <p className="text-white/55 text-[13px] leading-relaxed mb-6 font-light group-hover:text-white/85 transition-colors tracking-tight">
                        {desc}
                    </p>

                    <div className="pt-4 border-t border-white/[0.08] group-hover:border-[#379cfd]/50 transition-colors duration-500 flex justify-between items-center gap-3">
                        <span className="text-[9px] font-black tracking-[0.1em] text-[#379cfd] uppercase bg-[#379cfd]/5 px-3 h-10 rounded-full border border-[#379cfd]/20 group-hover:bg-[#379cfd] group-hover:text-black transition-all duration-400 flex-1 flex items-center justify-center text-center leading-[1.2]">
                            {tag}
                        </span>

                        <div className="w-10 h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#379cfd] group-hover:bg-[#379cfd] transition-all duration-400">
                            <ArrowRight size={18} weight="bold" className="text-white group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
