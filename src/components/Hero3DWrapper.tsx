"use client";

import dynamic from "next/dynamic";

type Hero3DVizProps = {
    quality?: "desktop" | "mobile";
};

const Hero3DViz = dynamic<Hero3DVizProps>(() => import("@/components/Hero3DViz"), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] lg:h-[550px]" />,
});

export default function Hero3DWrapper() {
    return (
        <>
            <div className="hidden md:block w-full h-full">
                <Hero3DViz quality="desktop" />
            </div>

            <div className="md:hidden relative w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(56,189,248,0.14),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_65%,rgba(59,130,246,0.12),transparent_58%)]" />
                <div className="absolute inset-x-0 top-[28%] h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
            </div>
        </>
    );
}
