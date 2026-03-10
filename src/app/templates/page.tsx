"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, RocketLaunch, ChartBar, Cube, Check, WhatsappLogo } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

const templates = [
    {
        id: "vendas",
        categoria: "Motor de Escala",
        titulo: "Ecossistema de Vendas v1.0",
        desc: "Landing page de alta conversão com funil de vendas integrado, checkout otimizado e automação de follow-up. Ideal para infoprodutores e negócios high-ticket.",
        recursos: [
            "Landing Page com Copy Persuasiva",
            "Checkout Integrado (Stripe/Mercado Pago)",
            "Bot de Atendimento WhatsApp",
            "Funil de E-mail Automático",
            "Painel de Métricas em Tempo Real",
            "SEO Otimizado para Google"
        ],
        stats: { label: "Performance", value: "98/100" },
        color: "text-blue-400",
        border: "border-blue-500/20",
        bg: "bg-blue-500/5",
        gradientFrom: "from-blue-600/20",
        gradientTo: "to-cyan-500/10",
        icon: RocketLaunch,
        image: "/template-vendas.png",
    },
    {
        id: "saude",
        categoria: "Autoridade Profissional",
        titulo: "Sistema de Saúde Elite",
        desc: "Plataforma premium para médicos e clínicas que exigem prestígio digital. Agendamento sem atrito, gestão de pacientes e presença online de autoridade.",
        recursos: [
            "Design Minimalista Premium",
            "Agendamento Online Automatizado",
            "Gestão de Pacientes Integrada",
            "WhatsApp Business Automatizado",
            "Área do Paciente com Login",
            "Google Meu Negócio Otimizado"
        ],
        stats: { label: "Fidelidade", value: "100%" },
        color: "text-cyan-400",
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/5",
        gradientFrom: "from-cyan-600/20",
        gradientTo: "to-sky-500/10",
        icon: ChartBar,
        image: "/template-saude.png",
    },
    {
        id: "automacao",
        categoria: "Operações Sob Medida",
        titulo: "Arquiteto de Processos",
        desc: "Dashboard inteligente para operações que precisam de monitoramento em tempo real. Automação de workflows, painéis de KPIs e integração total com seus sistemas.",
        recursos: [
            "Dashboard de KPIs em Tempo Real",
            "Automação de Workflows n8n",
            "Integração com APIs Externas",
            "Relatórios Automáticos",
            "Alertas e Notificações Push",
            "Painel Administrativo Completo"
        ],
        stats: { label: "Eficiência", value: "99%" },
        color: "text-sky-400",
        border: "border-sky-500/20",
        bg: "bg-sky-500/5",
        gradientFrom: "from-sky-600/20",
        gradientTo: "to-blue-500/10",
        icon: Cube,
        image: "/template-automacao.png",
    },
];

export default function TemplatesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "32px 32px"
                    }}
                />

                <div className="max-w-7xl mx-auto px-6 relative">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Voltar ao início
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-4 block">
                            Galeria de Templates
                        </span>
                        <h1 style={montserrat} className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                            Sites prontos para{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                converter.
                            </span>
                        </h1>
                        <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl">
                            Explore nossos templates premium. Cada um é uma arquitetura completa com design de conversão,
                            automações integradas e infraestrutura de escala. Pronto para deploy imediato.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="space-y-32">
                        {templates.map((tpl, idx) => (
                            <motion.div
                                key={tpl.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:direction-rtl" : ""}`}
                            >
                                {/* Image Side */}
                                <div className={`relative group ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <div className={`absolute -inset-4 bg-gradient-to-br ${tpl.gradientFrom} ${tpl.gradientTo} rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
                                        {/* Browser chrome */}
                                        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                            </div>
                                            <div className="flex-1 mx-3 h-5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                                                <span className="text-[10px] text-white/20">qodec.digital/{tpl.id}</span>
                                            </div>
                                        </div>
                                        <Image
                                            src={tpl.image}
                                            alt={tpl.titulo}
                                            width={800}
                                            height={450}
                                            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Floating badge */}
                                    <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl">
                                        <div className={`w-2 h-2 rounded-full ${tpl.color === "text-blue-400" ? "bg-blue-400" : tpl.color === "text-cyan-400" ? "bg-cyan-400" : "bg-sky-400"} animate-pulse`} />
                                        <span className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase">Deploy Ready</span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className={`space-y-8 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-10 h-10 rounded-xl ${tpl.bg} border ${tpl.border} flex items-center justify-center`}>
                                                <tpl.icon size={20} weight="duotone" className={tpl.color} />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
                                                {tpl.categoria}
                                            </span>
                                        </div>
                                        <h2 style={montserrat} className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                                            {tpl.titulo}
                                        </h2>
                                        <p className="text-white/40 text-base leading-relaxed">
                                            {tpl.desc}
                                        </p>
                                    </div>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {tpl.recursos.map((rec, rIdx) => (
                                            <li key={rIdx} className="flex items-center gap-2.5 text-sm text-white/50">
                                                <div className={`w-5 h-5 rounded-full ${tpl.bg} border ${tpl.border} flex items-center justify-center shrink-0`}>
                                                    <Check size={10} weight="bold" className={tpl.color} />
                                                </div>
                                                {rec}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                        <a
                                            href="https://wa.me/message/SEULINKAQUI"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold text-sm tracking-[0.08em] uppercase shadow-[0_12px_30px_rgba(59,130,246,0.2)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <WhatsappLogo size={20} weight="fill" />
                                            Solicitar Este Template
                                            <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                        <button className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 font-bold text-sm tracking-[0.08em] uppercase hover:bg-white/10 hover:text-white transition-all">
                                            <Eye size={18} />
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-24 border-t border-white/[0.05]">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 style={montserrat} className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Não encontrou o que procura?
                    </h2>
                    <p className="text-white/40 text-lg mb-10">
                        Criamos ecossistemas sob medida para a sua operação. Fale com nossa equipe e receba um diagnóstico gratuito.
                    </p>
                    <a
                        href="https://wa.me/message/SEULINKAQUI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold tracking-[0.1em] uppercase shadow-[0_20px_40px_rgba(59,130,246,0.2)] hover:scale-[1.02] transition-all"
                    >
                        <WhatsappLogo size={24} weight="fill" />
                        Falar com Especialista
                        <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>
        </main>
    );
}
