"use client";

import { motion } from "framer-motion";

const montserrat = { fontFamily: "var(--font-montserrat)" } as const;

/* ── Inline SVG logos for brands that fail via CDN ── */
function AzureLogo() {
    return (
        <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
            <path d="M5.483 0L1.006 8.602 0 20.77h4.503L12.209 0zm1.885 3.403L11.753 16.56l-5.635 5.477H24z" />
        </svg>
    );
}

function AWSLogo() {
    return (
        <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
            <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.152c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415a3.48 3.48 0 0 1 1.005-.136c.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.152a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.878.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.335.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.224-.024-.527.271-.352 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.384.608zM22.792 14.961c-.336-.43-2.22-.207-3.074-.104-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.152.319-.79 1.03-2.57.695-2.992z" />
        </svg>
    );
}

function InfinitePayLogo() {
    return (
        <svg viewBox="0 0 120 24" fill="white" className="h-4 w-auto">
            <path d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            <path d="M16 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            <path d="M12 8c0-1.1-.45-2.09-1.17-2.83l-1.41 1.41A2 2 0 0 1 10 8c0 1.1-.45 2.09-1.17 2.83l1.41 1.41A3.97 3.97 0 0 0 12 8z" />
            <path d="M12 16c0 1.1.45 2.09 1.17 2.83l1.41-1.41A2 2 0 0 1 14 16c0-1.1.45-2.09 1.17-2.83l-1.41-1.41A3.97 3.97 0 0 0 12 16z" />
        </svg>
    );
}

type GatewayItem = {
    name: string;
    logo?: string;
    CustomIcon?: React.ComponentType;
};

const gateways: GatewayItem[] = [
    { name: "n8n.io", logo: "https://cdn.simpleicons.org/n8n/fff" },
    { name: "WhatsApp Business", logo: "https://cdn.simpleicons.org/whatsapp/fff" },
    { name: "Mercado Pago", logo: "https://cdn.simpleicons.org/mercadopago/fff" },
    { name: "InfinitePay", CustomIcon: InfinitePayLogo },
    { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe/fff" },
    { name: "Microsoft Azure", CustomIcon: AzureLogo },
    { name: "Amazon AWS", CustomIcon: AWSLogo },
    { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify/fff" },
    { name: "Meta Business", logo: "https://cdn.simpleicons.org/meta/fff" },
];

const marqueeItems = [...gateways, ...gateways];

export default function GatewayCarousel() {
    return (
        <div className="relative w-full py-10 md:py-14 bg-black overflow-hidden flex flex-col items-center group">
            {/* Top & Bottom Animated Borders */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-30" />

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase mb-10 text-center px-6"
            >
                Tecnologias de ponta integradas para acelerar seu lucro
            </motion.p>

            <div className="w-full relative flex overflow-x-hidden">
                {/* High-end Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex shrink-0 gap-12 md:gap-16 items-center pl-12 md:pl-16"
                    animate={{
                        x: ['0%', '-50%']
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((item, idx) => {
                        const isEven = idx % 2 === 0;
                        const accentColor = isEven ? "bg-blue-500/40" : "bg-cyan-500/40";

                        return (
                            <div key={idx} className="flex items-center gap-12 md:gap-16">
                                <div
                                    className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-all duration-500 group/item cursor-default"
                                >
                                    {item.CustomIcon ? (
                                        <item.CustomIcon />
                                    ) : (
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="h-5 w-auto object-contain opacity-90 group-hover/item:opacity-100 transition-opacity"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    )}
                                    <span
                                        style={montserrat}
                                        className="text-white/80 font-medium tracking-[0.2em] text-[10px] md:text-xs whitespace-nowrap uppercase"
                                    >
                                        {item.name}
                                    </span>
                                </div>
                                {/* Vertical Separator */}
                                <div className={`w-px h-6 rotate-[15deg] ${accentColor} shadow-[0_0_8px_rgba(59,130,246,0.1)]`} />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
