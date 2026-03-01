"use client";

import dynamic from "next/dynamic";

import ClickSpark from "@/components/ClickSpark";

const Hero3DViz = dynamic(() => import("@/components/Hero3DViz"), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] lg:h-[550px]" />,
});

export default function Hero3DWrapper() {
    return (
        <ClickSpark
            sparkColor="#06b6d4"
            sparkSize={12}
            sparkRadius={20}
            sparkCount={10}
            duration={500}
        >
            <Hero3DViz />
        </ClickSpark>
    );
}
