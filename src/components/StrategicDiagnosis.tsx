"use client";

import { motion } from "framer-motion";
import { WhatsappLogo, ArrowRight, ShieldCheck, ChartLineUp, ClockAfternoon } from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

export default function DiagnosticoEstrategico() {
    return (
        <section id="diagnostico" className="relative z-10 w-full py-24 md:py-40 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #020818 30%, #040c22 50%, #020818 70%, #000000 100%)" }}
        >
            {/* Background glow and geometric shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Dot grid pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "28px 28px"
                }}
            />

            {/* Floating accent squares */}
            <div className="absolute top-20 left-16 w-16 h-16 opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0 border border-white/40 rotate-12" />
            </div>
            <div className="absolute bottom-32 right-20 w-12 h-12 opacity-[0.04] pointer-events-none">
                <div className="absolute inset-0 border border-cyan-400/40 rotate-45" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative">
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Glass highlight */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-10"
                    >
                        <ShieldCheck size={32} weight="duotone" className="text-blue-400" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={montserrat}
                        className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-2xl"
                    >
                        Paremos de falar em tarefas. <br />
                        Vamos falar em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Escala Real.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 text-[16px] md:text-[18px] max-w-xl leading-relaxed mb-12"
                    >
                        Sua operação merece uma consultoria técnica de elite. Solicite um diagnóstico estratégico e descubra como automatizar seus gargalos.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl mb-14">
                        <div className="flex flex-col items-center gap-2">
                            <ChartLineUp size={24} weight="duotone" className="text-blue-400" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Triagem de Dados</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <ClockAfternoon size={24} weight="duotone" className="text-cyan-400" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Engenharia de Deploy</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <ShieldCheck size={24} weight="duotone" className="text-sky-400" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Protocolo de Elite</span>
                        </div>
                    </div>

                    <motion.a
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        viewport={{ once: true }}
                        href="https://wa.me/message/SEULINKAQUI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold tracking-[0.1em] uppercase overflow-hidden shadow-[0_20px_40px_rgba(59,130,246,0.2)] transition-all"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <WhatsappLogo size={24} weight="fill" />
                        Solicitar Diagnóstico Estratégico
                        <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>

                    <p className="mt-8 text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Vagas limitadas para onboarding técnico este mês.
                    </p>
                </div>
            </div>
        </section>
    );
}
