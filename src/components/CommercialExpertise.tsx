import { Globe, WhatsappLogo, ChartLineUp, ArrowRight, Code, Cpu, Layout } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

function BentoCard({
    title,
    desc,
    icon,
    tag,
    className = "",
}: {
    title: string;
    desc: string;
    icon: ReactNode;
    tag: string;
    className?: string;
}) {
    return (
        <article className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] ${className}`}>
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.14),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-transform group-hover:scale-110">
                        {icon}
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                        {tag}
                    </span>
                </div>

                <div>
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">
                        {desc}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                    Saber mais <ArrowRight size={14} weight="bold" />
                </div>
            </div>
        </article>
    );
}

export default function CommercialExpertise() {
    return (
        <section id="services" className="cv-auto relative z-10 w-full py-32" style={{ containIntrinsicSize: "1000px" }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col items-center gap-4 text-center mb-20">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
                        Nossa Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                        Criamos a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">vanguarda digital.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[280px]">
                    <BentoCard
                        className="md:col-span-3 lg:col-span-8 lg:row-span-2"
                        icon={<Layout size={24} weight="duotone" />}
                        tag="Web Design & UI"
                        title="Experiencias Digitais de Elite"
                        desc="Nao fazemos apenas sites. Construimos ativos digitais de alta performance com Next.js, focados em UX impecavel e conversao maxima."
                    />

                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={<WhatsappLogo size={24} weight="duotone" />}
                        tag="Automacao AI"
                        title="Bots Inteligentes"
                        desc="Capture e qualifique leads 24/7 com chatbots via API oficial."
                    />

                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={<ChartLineUp size={24} weight="duotone" />}
                        tag="Sistemas"
                        title="Automacao de Processos"
                        desc="Conecte seu CRM e ERP com workflows inteligentes que eliminam trabalho manual."
                    />

                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={<Cpu size={24} weight="duotone" />}
                        tag="DevOps"
                        title="Performance Extrema"
                        desc="Carregamento em milissegundos e SEO forte por padrao."
                    />

                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={<Code size={24} weight="duotone" />}
                        tag="Custom"
                        title="Codigo Limpo"
                        desc="Arquitetura modular para evoluir sem friccao tecnica."
                    />

                    <BentoCard
                        className="md:col-span-3 lg:col-span-4"
                        icon={<Globe size={24} weight="duotone" />}
                        tag="Scalability"
                        title="Escala Global"
                        desc="Infraestrutura pronta para crescer junto com seu faturamento."
                    />
                </div>
            </div>
        </section>
    );
}
