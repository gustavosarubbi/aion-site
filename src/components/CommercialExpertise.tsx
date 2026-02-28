"use client";

import { useState, useRef } from "react";
import { Globe, WhatsappLogo, ChartLineUp, ArrowRight, Code, Cpu, Layout } from "@phosphor-icons/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function BentoCard({
    title,
    desc,
    icon: Icon,
    tag,
    className = "",
    accent = "cyan",
}: {
    title: string;
    desc: string;
    icon: any;
    tag: string;
    className?: string;
    accent?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] ${className}`}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6,182,212,0.1), transparent 40%)`,
                }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-transform group-hover:scale-110">
                        <Icon size={24} weight="duotone" />
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                        {tag}
                    </span>
                </div>

                <div>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">
                        {desc}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                    Saber mais <ArrowRight size={14} weight="bold" />
                </div>
            </div>
        </motion.div>
    );
}

export default function CommercialExpertise() {
    return (
        <section id="services" className="relative z-10 w-full py-32">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col items-center gap-4 text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase"
                    >
                        Nossa Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
                    >
                        Criamos a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">vanguarda digital.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[280px]">
                    {/* Main Webdesign Bento Element */}
                    <BentoCard
                        className="md:col-span-3 lg:col-span-8 lg:row-span-2"
                        icon={Layout}
                        tag="Web Design & UI"
                        title="Experiências Digitais de Elite"
                        desc="Não fazemos apenas sites. Construímos ativos digitais de alta performance com Next.js, focados em UX impecável e conversão máxima. Design que para o scroll e tecnologia que escala seu negócio."
                    />

                    {/* Chatbot Bento Element */}
                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={WhatsappLogo}
                        tag="Automação AI"
                        title="Bots Inteligentes"
                        desc="Capture e qualifique leads 24/7 com chatbots via API oficial."
                    />

                    {/* Workflow Bento Element */}
                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={ChartLineUp}
                        tag="Sistemas"
                        title="Automação de Processos"
                        desc="Conecte seu CRM e ERP com workflows inteligentes que eliminam o trabalho manual."
                    />

                    {/* Speed/Tech Bento Element (Secondary) */}
                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={Cpu}
                        tag="DevOps"
                        title="Performance Extrema"
                        desc="Carregamento em milissegundos e 100% SEO-friendly por padrão."
                    />

                    {/* Code/Niche Bento Element (Secondary) */}
                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={Code}
                        tag="Custom"
                        title="Código Limpo"
                        desc="Arquitetura moderna e modular para evoluir sem fricção técnica."
                    />

                    {/* Global/Reach Bento Element (Secondary) */}
                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={Globe}
                        tag="Scalability"
                        title="Escala Global"
                        desc="Sua infraestrutura pronta para crescer junto com seu faturamento."
                    />
                </div>
            </div>
        </section>
    );
}
