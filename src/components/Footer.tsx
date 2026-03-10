import { InstagramLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

export default function Footer() {
    return (
        <footer className="w-full relative z-10 bg-black py-20 border-t border-white/[0.05]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 lg:col-span-1 space-y-6">
                        <div style={montserrat} className="text-2xl font-bold tracking-tighter text-white">
                            QODEC<span className="text-blue-500">.</span>
                        </div>
                        <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                            Arquitetando ecossistemas digitais de alta performance para o mercado high-ticket.
                        </p>
                    </div>

                    {/* Soluções */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Soluções</h4>
                        <ul className="space-y-4">
                            <li><a href="#engenharia" className="text-sm text-white/30 hover:text-white transition-colors">Engenharia de Elite</a></li>
                            <li><a href="#sistemas" className="text-sm text-white/30 hover:text-white transition-colors">Sistemas de Próxima Geração</a></li>
                            <li><a href="#diagnostico" className="text-sm text-white/30 hover:text-white transition-colors">Diagnóstico Estratégico</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Conectar</h4>
                        <div className="flex flex-col gap-4">
                            <a href="#" className="flex items-center gap-3 text-sm text-white/30 hover:text-blue-400 transition-colors">
                                <InstagramLogo size={18} weight="duotone" /> @qodec.digital
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm text-white/30 hover:text-blue-400 transition-colors">
                                <LinkedinLogo size={18} weight="duotone" /> LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Contato */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Contato</h4>
                        <a href="mailto:contato@qodec.digital" className="flex items-center gap-3 text-sm text-white/30 hover:text-blue-400 transition-colors">
                            <EnvelopeSimple size={18} weight="duotone" /> contato@qodec.digital
                        </a>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-white/20 font-medium tracking-widest uppercase">
                        &copy; 2026 QODEC DIGITAL &bull; ENGENHARIA PARA ESCALA
                    </p>
                    <div className="flex gap-8 text-[11px] text-white/20 font-medium tracking-widest uppercase">
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
