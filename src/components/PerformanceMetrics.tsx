"use client";

import { ChartBar, Lightning, ShieldCheck, Database, Cpu, Globe } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

export default function PerformanceMetrics() {
    const metrics = [
        {
            label: "Latência de Resposta",
            value: "< 200ms",
            desc: "Otimização crítica de carregamento e tempo de resposta de APIs.",
            icon: Lightning,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            barWidth: "75%",
            barColor: "from-blue-600 to-blue-400"
        },
        {
            label: "Disponibilidade (SLA)",
            value: "99.99%",
            desc: "Infraestrutura serverless com redundância global automática.",
            icon: ShieldCheck,
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            barWidth: "99%",
            barColor: "from-cyan-600 to-cyan-400"
        },
        {
            label: "Processamento de Dados",
            value: "500k+",
            desc: "Eventos processados mensalmente por nossos ecossistemas Beta.",
            icon: Database,
            color: "text-sky-400",
            bg: "bg-sky-400/10",
            barWidth: "85%",
            barColor: "from-sky-600 to-sky-400"
        },
        {
            label: "Eficiência de Triage",
            value: "85%",
            desc: "Redução média de intervenção humana em atendimentos iniciais.",
            icon: Cpu,
            color: "text-indigo-400",
            bg: "bg-indigo-400/10",
            barWidth: "85%",
            barColor: "from-indigo-600 to-indigo-400"
        },
        {
            label: "Escalabilidade Solo",
            value: "10x",
            desc: "Capacidade de escala sem aumento de custos operacionais fixos.",
            icon: ChartBar,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            barWidth: "90%",
            barColor: "from-blue-700 to-blue-500"
        },
        {
            label: "Segurança de Borda",
            value: "WAF+",
            desc: "Proteção contra bots e ataques DDoS em nível de rede.",
            icon: Globe,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            barWidth: "95%",
            barColor: "from-cyan-700 to-cyan-500"
        }
    ];

    return (
        <section id="metricas" className="relative z-10 w-full py-24 md:py-40 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #040814 30%, #070b1e 50%, #040814 70%, #000000 100%)" }}
        >
            {/* ── Background Elements ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-500/[0.04] blur-[80px] rounded-full pointer-events-none" />

            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute left-1/4 w-px h-full bg-white" />
                <div className="absolute left-2/4 w-px h-full bg-white" />
                <div className="absolute left-3/4 w-px h-full bg-white" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[11px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-6"
                    >
                        Benchmarks Internos
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={montserrat}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                    >
                        Performance baseada em <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">dados reais de engenharia.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative bg-white/[0.02] backdrop-blur-md border border-white/[0.06] p-8 rounded-[32px] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Card inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl ${metric.bg} border border-white/5 flex items-center justify-center ${metric.color} group-hover:scale-110 transition-transform`}>
                                        <metric.icon size={26} weight="duotone" />
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-3xl font-bold tracking-tight ${metric.color}`}>
                                            {metric.value}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={montserrat} className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                                        {metric.label}
                                    </h3>
                                    <p className="text-white/30 text-sm leading-relaxed mb-4">
                                        {metric.desc}
                                    </p>
                                </div>

                                {/* Animated Progress Bar */}
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: metric.barWidth }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + idx * 0.1 }}
                                        className={`h-full bg-gradient-to-r ${metric.barColor} rounded-full`}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Métricas obtidas em ambientes de teste controlados e deploys reais da infraestrutura AION.
                    </p>
                </div>
            </div>
        </section>
    );
}
