"use client";

import { motion } from "framer-motion";
import {
    CreditCard,
    WhatsappLogo,
    Globe,
    Database,
    ChatCircleDots,
    ShieldCheck,
    TrendUp,
    ArrowRight
} from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const integracoes = [
    { name: "Stripe", desc: "Pagamentos globais", icon: CreditCard, color: "text-blue-400", bg: "bg-blue-400/10", delay: 0 },
    { name: "n8n", desc: "Automação de fluxos", icon: Database, color: "text-pink-400", bg: "bg-pink-400/10", delay: 0.1 },
    { name: "WhatsApp API", desc: "Atendimento 24/7", icon: WhatsappLogo, color: "text-green-400", bg: "bg-green-400/10", delay: 0.2 },
    { name: "Gatilhos", desc: "Eventos em tempo real", icon: Globe, color: "text-cyan-400", bg: "bg-cyan-400/10", delay: 0.3 },
    { name: "ASAAS", desc: "Cobranças automatizadas", icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-400/10", delay: 0.4 },
    { name: "Gestão", desc: "CRM integrado", icon: TrendUp, color: "text-indigo-400", bg: "bg-indigo-400/10", delay: 0.5 },
];

export default function CentralIntegracoes() {
    return (
        <section id="integracoes" className="relative z-10 w-full py-24 md:py-36 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #04091a 30%, #060e24 50%, #04091a 70%, #000000 100%)" }}
        >
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.05] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

            {/* Crosshatch pattern unique to this section */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: `
                        linear-gradient(45deg, white 1px, transparent 1px),
                        linear-gradient(-45deg, white 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Text + Integration Cards Grid */}
                    <div className="space-y-10">
                        <div className="space-y-5">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase"
                            >
                                Integrações Poderosas
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                style={montserrat}
                                className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                            >
                                Seu negócio conectado às <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">maiores plataformas.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-white/40 text-lg leading-relaxed max-w-xl"
                            >
                                Do checkout à automação de marketing, conectamos seu ecossistema inteiro. Sem código, sem dor de cabeça — pura escala.
                            </motion.p>
                        </div>

                        {/* Integration cards in a compact grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {integracoes.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: item.delay, duration: 0.4 }}
                                    className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.06] hover:border-blue-500/20 transition-all duration-300 cursor-default"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <item.icon size={20} weight="duotone" className={item.color} />
                                    </div>
                                    <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                                    <p className="text-white/30 text-[11px] leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual Connection Hub */}
                    <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                        {/* Center Node - bigger and more impactful */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative z-20 w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.15)] gap-2"
                        >
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl animate-pulse" />
                            <ChatCircleDots size={36} weight="duotone" className="text-blue-400 relative z-10" />
                            <span className="text-[8px] font-bold tracking-[0.2em] text-white/40 uppercase relative z-10">HUB</span>
                        </motion.div>

                        {/* Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 400 400">
                            {integracoes.map((_, idx) => {
                                const angle = (idx * 360) / integracoes.length - 90;
                                const rad = (angle * Math.PI) / 180;
                                const innerR = 60;
                                const outerR = 150;
                                const x1 = 200 + Math.cos(rad) * innerR;
                                const y1 = 200 + Math.sin(rad) * innerR;
                                const x2 = 200 + Math.cos(rad) * outerR;
                                const y2 = 200 + Math.sin(rad) * outerR;
                                return (
                                    <motion.line
                                        key={idx}
                                        x1={x1} y1={y1} x2={x2} y2={y2}
                                        stroke="rgba(59,130,246,0.15)"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                    />
                                );
                            })}
                        </svg>

                        {/* Orbiting Icons */}
                        <div className="absolute inset-0 z-30 w-full h-full">
                            {integracoes.map((item, idx) => {
                                const angle = (idx * 360) / integracoes.length;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: item.delay + 0.2, duration: 0.5 }}
                                        className="absolute left-1/2 top-1/2 -mt-7 -ml-7 w-14 h-14 origin-center group"
                                        style={{ transform: `rotate(${angle}deg)` }}
                                    >
                                        <div
                                            className="relative flex flex-col items-center justify-center w-full h-full translate-x-[clamp(85px,22vw,130px)] md:translate-x-[140px]"
                                            style={{ transform: `rotate(-${angle}deg)` }}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-white/25 transition-all duration-300 shadow-lg shadow-black/20`}>
                                                <item.icon size={24} weight="duotone" className={`${item.color} group-hover:scale-110 transition-transform`} />
                                            </div>
                                            <span className="absolute -bottom-6 whitespace-nowrap text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                                {item.name}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Background Rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[clamp(180px,45vw,260px)] h-[clamp(180px,45vw,260px)] rounded-full border border-dashed border-white/[0.06] animate-[spin_80s_linear_infinite]" />
                            <div className="absolute w-[clamp(260px,65vw,380px)] h-[clamp(260px,65vw,380px)] rounded-full border border-dashed border-white/[0.04] animate-[spin_120s_linear_infinite_reverse]" />
                            <div className="absolute w-[clamp(70px,20vw,120px)] h-[clamp(70px,20vw,120px)] rounded-full border border-blue-400/10" />
                        </div>
                    </div>

                </div>

                {/* Bottom Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
                >
                    {[
                        { label: "APIs Conectadas", value: "20+" },
                        { label: "Uptime Garantido", value: "99.9%" },
                        { label: "Eventos/mês", value: "500k+" },
                        { label: "Tempo de Setup", value: "< 48h" },
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center space-y-1">
                            <p className="text-xl md:text-2xl font-bold text-blue-400">{stat.value}</p>
                            <p className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
