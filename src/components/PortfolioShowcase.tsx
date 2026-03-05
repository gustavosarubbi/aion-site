import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function PortfolioShowcase() {
    return (
        <section id="cases" className="cv-auto relative z-10 w-full py-16 md:py-32 bg-gradient-to-b from-[#000000] via-[#030712] to-[#000000]" style={{ containIntrinsicSize: "940px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Cases Recentes</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">Resultados reais.</h2>
                    <p className="max-w-lg text-white/40 text-[15px] mt-1">Projetos entregues que geraram impacto mensurável em conversão e eficiência operacional.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {/* Case 1 */}
                    <div className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-cyan-500/20 p-10 rounded-2xl transition-all duration-500 flex flex-col gap-6 min-h-[360px] relative overflow-hidden hover:translate-y-[-2px] hover:bg-white/[0.04]">
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <span className="w-max font-bold text-[10px] tracking-[0.15em] uppercase text-white/30 px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">Bot WhatsApp</span>

                        <h3 className="text-2xl font-bold text-white tracking-tight">Assistente IA para Vendas</h3>

                        <p className="text-[13px] text-white/35 leading-relaxed max-w-md">
                            Bot inteligente integrado ao CRM que qualifica leads automaticamente via WhatsApp. Reduziu o tempo de resposta para zero e filtrou +5.000 contatos em 8 semanas.
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.04]">
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-2xl font-bold text-cyan-400">5k+</p>
                                    <p className="text-[11px] text-white/25 mt-0.5">leads qualificados</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-cyan-400">0s</p>
                                    <p className="text-[11px] text-white/25 mt-0.5">tempo de resposta</p>
                                </div>
                            </div>
                            <a href="#" className="text-white/20 hover:text-cyan-400 transition-colors">
                                <ArrowUpRight size={20} weight="bold" />
                            </a>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-blue-500/20 p-10 rounded-2xl transition-all duration-500 flex flex-col gap-6 min-h-[360px] relative overflow-hidden hover:translate-y-[-2px] hover:bg-white/[0.04]">
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <span className="w-max font-bold text-[10px] tracking-[0.15em] uppercase text-white/30 px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">Landing Page + Automação</span>

                        <h3 className="text-2xl font-bold text-white tracking-tight">Portal B2B com Onboarding</h3>

                        <p className="text-[13px] text-white/35 leading-relaxed max-w-md">
                            Landing page de alto impacto combinada com workflows automatizados de onboarding. Webhooks integram assinaturas, disparam contratos e criam faturas no ERP.
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.04]">
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-2xl font-bold text-blue-400">3x</p>
                                    <p className="text-[11px] text-white/25 mt-0.5">taxa de conversão</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-400">40h</p>
                                    <p className="text-[11px] text-white/25 mt-0.5">economizadas/sem</p>
                                </div>
                            </div>
                            <a href="#" className="text-white/20 hover:text-blue-400 transition-colors">
                                <ArrowUpRight size={20} weight="bold" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
