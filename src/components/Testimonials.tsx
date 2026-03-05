import { Quotes } from "@phosphor-icons/react/dist/ssr";

export default function Testimonials() {
    const reviews = [
        {
            name: "Ricardo M.",
            role: "CEO",
            text: "O site que a AION entregou é absurdamente bonito e converte. O bot do WhatsApp atende nossos leads antes de acordarmos. 40h/semana economizadas no time comercial.",
            company: "TechFlow"
        },
        {
            name: "Helena S.",
            role: "Head de Marketing",
            text: "Automatizar nossa captação com chatbot e landing page integradas foi game-changer. A qualidade do design superou todas as agências que já contratamos.",
            company: "Vortex Digital"
        },
        {
            name: "Carlos F.",
            role: "Fundador",
            text: "Precisávamos de um site profissional e um bot que qualificasse leads. A AION entregou os dois em tempo recorde. Nosso CAC caiu 60%.",
            company: "Nova Capital"
        }
    ];

    return (
        <section className="cv-auto relative z-10 w-full py-16 md:py-32 bg-gradient-to-b from-[#000000] via-[#030610] to-[#000000]" style={{ containIntrinsicSize: "860px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col items-center gap-4 text-center mb-20">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Clientes</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">Quem confia na AION.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-cyan-500/15 p-8 rounded-2xl flex flex-col gap-5 transition-all duration-500 hover:translate-y-[-2px] hover:bg-white/[0.04]">
                            <Quotes size={22} weight="fill" className="text-cyan-500/20" />
                            <p className="text-white/45 text-[13px] leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
                            <div className="mt-auto pt-5 border-t border-white/[0.04]">
                                <p className="text-white font-bold text-sm">{rev.name}</p>
                                <p className="text-white/25 text-xs mt-0.5">{rev.role}, {rev.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
