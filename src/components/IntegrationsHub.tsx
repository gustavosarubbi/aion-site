"use client";

import { motion } from "framer-motion";
import { ChatCircleDots, Database, WhatsappLogo, Globe, ShieldCheck, ChartLineUp, AppWindow, ArrowsLeftRight } from "@phosphor-icons/react";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

// Integrações da esquerda baseadas na Imagem 2 (com ícones nativos para visual perfeito)
const integracoesLeft = [
    { name: "Stripe", desc: "Pagamentos globais", icon: AppWindow, iconColor: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", delay: 0 },
    { name: "n8n", desc: "Automação de fluxos", icon: Database, iconColor: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", delay: 0.1 },
    { name: "WhatsApp API", desc: "Atendimento 24/7", icon: WhatsappLogo, iconColor: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", delay: 0.2 },
    { name: "Gatilhos", desc: "Eventos em tempo real", icon: Globe, iconColor: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", delay: 0.3 },
    { name: "ASAAS", desc: "Cobranças automatizadas", icon: ShieldCheck, iconColor: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", delay: 0.4 },
    { name: "Gestão", desc: "CRM integrado", icon: ChartLineUp, iconColor: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", delay: 0.5 },
];

// Logos Orbitais - Usando Google Favicon API para baixar *imagens reais* / logos de alta qualidade das marcas.
const getLogoApi = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const floatingNodes = [
    { name: "Salesforce", domain: "salesforce.com", color: "00A1E0", angle: -45, radius: 140, delay: 0.2, size: 48 },
    { name: "Slack", domain: "slack.com", color: "E01E5A", angle: 15, radius: 180, delay: 0.4, size: 56 },
    { name: "Typeform", domain: "typeform.com", color: "FFFFFF", angle: 70, radius: 130, delay: 0.6, size: 40 },
    { name: "Zendesk", domain: "zendesk.com", color: "03363D", angle: -130, radius: 160, delay: 0.8, size: 52 },
    { name: "Shopify", domain: "shopify.com", color: "95BF47", angle: 120, radius: 170, delay: 1.0, size: 44 },
    { name: "HubSpot", domain: "hubspot.com", color: "FF7A59", angle: 195, radius: 150, delay: 1.2, size: 52 },
];

export default function CentralIntegracoes() {
    return (
        <section id="integracoes" className="relative z-10 w-full py-24 md:py-36 overflow-hidden border-t border-white/[0.05]"
            style={{ background: "linear-gradient(180deg, #000000 0%, #04091a 30%, #060e24 50%, #04091a 70%, #000000 100%)" }}
        >
            {/* Ambient deep tech glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.08] blur-[120px] rounded-full pointer-events-none" />

            {/* Cyber Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #4facfe 1px, transparent 1px),
                        linear-gradient(to bottom, #4facfe 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left: Text + Integration Cards Grid */}
                    <div className="space-y-10 relative z-20">
                        <div className="space-y-5 relative">
                            {/* Decorative tech accent */}
                            <div className="absolute -left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50 hidden md:block" />

                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-[11px] font-bold tracking-[0.4em] text-cyan-400 uppercase"
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
                                Seu negócio conectado às <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">maiores plataformas.</span>
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-20">
                            {integracoesLeft.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: item.delay, duration: 0.4 }}
                                        className={`group bg-[#0A0D18]/80 backdrop-blur-sm border ${item.border} rounded-2xl p-4 hover:bg-[#0D1224] transition-all duration-300 cursor-default relative overflow-hidden`}
                                    >
                                        {/* Scanline effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent -translate-y-full group-hover:animate-[scanline_1.5s_ease-in-out_infinite]" />

                                        <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                            <Icon weight="fill" className={`w-5 h-5 ${item.iconColor} drop-shadow-[0_0_8px_currentColor]`} />
                                        </div>
                                        <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                                        <p className="text-white/30 text-[11px] leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right: Highly Complex Cybernetic Hub */}
                    <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px] w-full mt-10 lg:mt-0">

                        {/* Connecting Paths from Left to Right (simulated cyber physical wires - PRINT 2 IDEAS) */}
                        <svg className="absolute top-1/2 -left-40 w-[180%] h-[180%] -translate-y-1/2 pointer-events-none hidden lg:block z-0" viewBox="0 0 600 600" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="wire-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#4facfe" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#0ea5e9" />
                                </linearGradient>
                            </defs>
                            {[
                                // Route 1: Top
                                { path: "M-50 150 L 50 150 Q 80 150 80 180 L 80 270 Q 80 300 110 300 L 300 300", delay: 0 },
                                // Route 2: Mid-Top
                                { path: "M-50 220 L 100 220 Q 130 220 130 250 L 130 270 Q 130 300 160 300 L 300 300", delay: 0.2 },
                                // Route 3: Straight Center
                                { path: "M-50 300 L 300 300", delay: 0.4 },
                                // Route 4: Mid-Bottom
                                { path: "M-50 380 L 120 380 Q 150 380 150 350 L 150 330 Q 150 300 180 300 L 300 300", delay: 0.6 },
                                // Route 5: Bottom
                                { path: "M-50 450 L 60 450 Q 90 450 90 420 L 90 330 Q 90 300 120 300 L 300 300", delay: 0.8 },
                                // Route 6: Deep Top (extra circuits from print 2)
                                { path: "M-50 80 L 30 80 Q 60 80 60 110 L 60 270 Q 60 300 90 300 L 300 300", delay: 0.5 },
                                // Route 7: Deep Bottom
                                { path: "M-50 520 L 40 520 Q 70 520 70 490 L 70 330 Q 70 300 100 300 L 300 300", delay: 0.7 },
                            ].map((wire, idx) => (
                                <g key={idx}>
                                    {/* Base track */}
                                    <path d={wire.path} fill="none" stroke="rgba(79, 172, 254, 0.15)" strokeWidth="2" strokeDasharray="4 4" />
                                    {/* Highlight glowing track */}
                                    <motion.path
                                        d={wire.path}
                                        fill="none"
                                        stroke="url(#wire-glow)"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 2, delay: wire.delay, ease: "easeInOut" }}
                                    />
                                    {/* Scifi Data packets traveling along orthogonal circuit paths */}
                                    <motion.rect
                                        width="8" height="3" rx="1.5"
                                        fill="#0ea5e9"
                                        className="drop-shadow-[0_0_8px_#4facfe]"
                                        initial={{ offsetDistance: "0%", opacity: 0 }}
                                        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                                        transition={{ duration: 3, delay: wire.delay, repeat: Infinity, ease: "linear" }}
                                        style={{ offsetPath: `path('${wire.path}')` } as any}
                                    />
                                </g>
                            ))}
                        </svg>

                        {/* Complex Concentric Cyber Rings - EXTREME SCI-FI HUB like Print 2 */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 scale-[0.6] sm:scale-75 md:scale-100 lg:scale-[1.1] xl:scale-[1.2]">
                            {/* Inner dense core rings */}
                            <div className="absolute w-[160px] h-[160px] rounded-full border-[2px] border-[#0A1229] shadow-[inset_0_0_30px_rgba(0,161,224,0.6)] bg-blue-500/10 mix-blend-screen" />
                            <div className="absolute w-[180px] h-[180px] rounded-full border-[3px] border-cyan-400/80 animate-[spin_10s_linear_infinite] shadow-[0_0_20px_#4facfe]"
                                style={{ borderRightColor: 'transparent', borderLeftColor: 'transparent' }} />
                            <div className="absolute w-[200px] h-[200px] rounded-full border-[2px] border-dashed border-cyan-300/50 animate-[spin_20s_linear_infinite_reverse]" />

                            {/* Data blocks ring (Simulating tech nodes) */}
                            <div className="absolute w-[240px] h-[240px] animate-[spin_40s_linear_infinite]">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="absolute w-2 h-4 bg-cyan-400/40 rounded-sm"
                                        style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-120px)` }} />
                                ))}
                            </div>

                            <div className="absolute w-[280px] h-[280px] rounded-full border-[4px] border-[#061530] shadow-[0_0_40px_rgba(0,161,224,0.3)]" />

                            {/* Circuit track ring (medium) */}
                            <div className="absolute w-[320px] h-[320px] rounded-full border-[2px] border-blue-500/30 shadow-[inset_0_0_20px_rgba(37,99,235,0.2)]">
                                <div className="absolute -top-1.5 left-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_25px_#4facfe]" />
                                <div className="absolute -bottom-1.5 left-1/3 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_25px_#3b82f6]" />
                                <div className="absolute top-1/3 -right-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#fff]" />
                            </div>

                            {/* Outer dashed/dotted complex rings mapping to print 2's density */}
                            <div className="absolute w-[400px] h-[400px] rounded-full border-[1.5px] border-cyan-500/10 animate-[spin_60s_linear_infinite]" />
                            <div className="absolute w-[440px] h-[440px] rounded-full border-[4px] border-dashed border-cyan-500/30 animate-[spin_80s_linear_infinite]" />
                            <div className="absolute w-[450px] h-[450px] rounded-full border-[1px] border-blue-400/20" />
                            <div className="absolute w-[520px] h-[520px] rounded-full border-2 border-dotted border-cyan-500/40 animate-[spin_120s_linear_infinite_reverse]" />
                            <div className="absolute w-[580px] h-[580px] rounded-full border border-blue-500/10" />
                            <div className="absolute w-[640px] h-[640px] rounded-full border border-dashed border-cyan-500/10 animate-[spin_160s_linear_infinite]" />
                            <div className="absolute w-[700px] h-[700px] rounded-full border border-white/5" />

                            {/* Radar sweep effect upgraded */}
                            <div className="absolute w-[520px] h-[520px] rounded-full overflow-hidden" style={{ maskImage: "radial-gradient(transparent 30%, black 100%)" }}>
                                <motion.div
                                    className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tr from-cyan-400/0 via-cyan-400/20 to-cyan-400/0"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Central HUB Chip */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative z-20 w-32 h-32 rounded-2xl bg-gradient-to-b from-[#0B1536] to-[#04091a] border border-cyan-500/40 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.25)] before:absolute before:-inset-[1px] before:rounded-2xl before:bg-gradient-to-b before:from-cyan-400/50 before:to-transparent before:-z-10"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:10px_10px]" />

                            <motion.div
                                className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-2xl"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            <div className="relative z-10 w-14 h-14 bg-[#0A1229] rounded-xl border border-cyan-400/40 flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.4)] mb-2 group">
                                <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-xl animate-pulse" />
                                <ArrowsLeftRight size={28} weight="bold" className="text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,1)] relative z-20 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="relative z-10 text-[11px] font-bold tracking-[0.3em] text-cyan-200 uppercase drop-shadow-[0_0_5px_#4facfe]">HUB</span>

                            {/* Corner tech details improved */}
                            <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-sm shadow-[0_0_10px_#4facfe]" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-sm shadow-[0_0_10px_#4facfe]" />
                            <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-500 rounded-sm shadow-[0_0_10px_#3b82f6]" />
                            <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-sm shadow-[0_0_10px_#3b82f6]" />
                        </motion.div>

                        {/* Floating External Nodes ( Orbiting - USE LOGOS VIA API ) */}
                        <div className="absolute inset-0 z-30 w-full h-full pointer-events-none flex items-center justify-center scale-[0.6] sm:scale-75 md:scale-100 lg:scale-[1.1] xl:scale-[1.2]">
                            {floatingNodes.map((item, idx) => {
                                const angle = item.angle;
                                const rad = (angle * Math.PI) / 180;
                                const x = Math.cos(rad) * item.radius;
                                const y = Math.sin(rad) * item.radius;

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                        whileInView={{ opacity: 1, scale: 1, x, y }}
                                        viewport={{ once: true }}
                                        transition={{ delay: item.delay, duration: 0.8, type: "spring", stiffness: 50 }}
                                        className="absolute w-12 h-12 origin-center flex items-center justify-center group pointer-events-auto"
                                    >
                                        {/* Dynamic connection line to center */}
                                        <svg className="absolute w-[400px] h-[400px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" style={{
                                            left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: -1
                                        }}>
                                            <line x1="200" y1="200" x2={200 - x} y2={200 - y} stroke={`#${item.color === 'FFFFFF' ? '4facfe' : item.color}`} strokeWidth="1.5" strokeDasharray="3 3" />
                                        </svg>

                                        {/* Floating Animation */}
                                        <motion.div
                                            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
                                            transition={{ duration: 4 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
                                            className="relative"
                                        >
                                            <div
                                                className="rounded-full bg-[#0A1229] border-[2px] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden"
                                                style={{ width: item.size, height: item.size, borderColor: `#${item.color}80` }}
                                            >
                                                <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" style={{ backgroundColor: `#${item.color}` }} />
                                                {/* API IMAGE FETCH as requested */}
                                                <img
                                                    src={getLogoApi(item.domain)}
                                                    alt={item.name}
                                                    className="object-contain relative z-10 w-3/5 h-3/5 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                                    onError={(e) => {
                                                        // Fallback just in case
                                                        (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${item.name.toLowerCase()}/${item.color}`;
                                                    }}
                                                />
                                            </div>

                                            {/* Tooltip */}
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0A1229] border border-cyan-500/30 px-2 py-1 rounded text-[10px] font-bold text-cyan-50 shadow-[0_0_10px_rgba(6,182,212,0.3)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                                {item.name}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Bottom Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0A0D18]/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                    {[
                        { label: "APIs Conectadas", value: "20+" },
                        { label: "Uptime Garantido", value: "99.9%" },
                        { label: "Eventos/mês", value: "500k+" },
                        { label: "Tempo de Setup", value: "< 48h" },
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center space-y-2 relative">
                            {idx !== 0 && (
                                <div className="hidden md:block absolute top-1/2 -left-3 -translate-y-1/2 w-[1px] h-8 bg-white/10" />
                            )}
                            <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{stat.value}</p>
                            <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase relative z-10">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Global scanline utility required for this component */}
            <style jsx global>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </section>
    );
}
