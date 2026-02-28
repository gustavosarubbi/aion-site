"use client";

import dynamic from "next/dynamic";

const Hero3DViz = dynamic(() => import("@/components/Hero3DViz"), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] lg:h-[550px]" />,
});

export default function Hero3DWrapper() {
    return <Hero3DViz />;
}
