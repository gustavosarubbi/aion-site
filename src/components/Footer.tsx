import { InstagramLogo, LinkedinLogo, XLogo, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
    return (
        <footer className="cv-auto w-full relative z-10 bg-[#020305] mt-0 text-white/30" style={{ containIntrinsicSize: "460px" }}>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-28">
                <div className="flex flex-col gap-5 max-w-xs">
                    <div className="text-xl font-black tracking-tighter text-white">
                        AION<span className="text-cyan-400">.</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/25">
                        Web design premium, chatbots de WhatsApp e automação de processos para empresas que querem escalar com inteligência.
                    </p>
                </div>

                <div className="flex flex-col gap-5 w-full md:w-auto">
                    <p className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Redes</p>
                    <div className="flex flex-col gap-3">
                        <a href="#" className="flex items-center gap-3 text-[13px] hover:text-cyan-400 transition-colors font-medium">
                            <InstagramLogo size={16} weight="duotone" /> Instagram
                        </a>
                        <a href="#" className="flex items-center gap-3 text-[13px] hover:text-cyan-400 transition-colors font-medium">
                            <LinkedinLogo size={16} weight="duotone" /> LinkedIn
                        </a>
                        <a href="#" className="flex items-center gap-3 text-[13px] hover:text-cyan-400 transition-colors font-medium">
                            <XLogo size={16} weight="duotone" /> Twitter / X
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-full md:w-auto">
                    <p className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Contato</p>
                    <div className="flex flex-col gap-3">
                        <a href="mailto:hello@aion.com" className="flex items-center gap-3 text-[13px] hover:text-cyan-400 transition-colors font-medium">
                            <EnvelopeSimple size={16} weight="duotone" /> hello@aiondigital.com
                        </a>
                        <a href="tel:+551100000000" className="flex items-center gap-3 text-[13px] hover:text-cyan-400 transition-colors font-medium">
                            <Phone size={16} weight="duotone" /> +55 11 99999-9999
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/[0.04]">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-white/15 font-medium">&copy; 2026 AION Digital.</p>
                    <div className="flex gap-4 text-[11px] font-medium text-white/15">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
