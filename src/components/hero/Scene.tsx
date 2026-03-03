"use client";

import { useRef, useState, useEffect } from "react";
import { PerspectiveCamera, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import { OrbitingProps, CLUSTER_CENTER } from "./OrbitingProps";
import { UICard } from "./UICard";

type SceneProps = {
    mobileOptimized?: boolean;
};

type PerformanceTier = "high" | "medium" | "low";

export function Scene({ mobileOptimized = false }: SceneProps) {
    const codeCardRef = useRef<THREE.Group>(null!);
    const flowCardRef = useRef<THREE.Group>(null!);
    const previewCardRef = useRef<THREE.Group>(null!);

    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [performanceTier] = useState<PerformanceTier>(() => {
        if (typeof navigator === "undefined") return mobileOptimized ? "low" : "medium";

        const cores = navigator.hardwareConcurrency ?? 8;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

        if (mobileOptimized || cores <= 4 || memory <= 4) return "low";
        if (cores <= 8 || memory <= 8) return "medium";
        return "high";
    });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setPrefersReducedMotion(mq.matches);
        onChange();
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const reducedMotion = prefersReducedMotion || performanceTier === "low";
    const visualLowMode = mobileOptimized || reducedMotion;
    const visualMediumMode = !visualLowMode && performanceTier === "medium";

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, visualLowMode ? 19.2 : visualMediumMode ? 18.5 : 18]} fov={28} />
            <ambientLight intensity={visualLowMode ? 0.42 : visualMediumMode ? 0.46 : 0.5} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={visualLowMode ? 0.72 : visualMediumMode ? 0.86 : 1}
                color="#06b6d4"
            />
            <pointLight position={[-10, -5, -10]} intensity={visualLowMode ? 0.3 : visualMediumMode ? 0.4 : 0.5} color="#3b82f6" />
            {!visualLowMode && !visualMediumMode && <Environment preset="night" />}
            <Stars
                radius={100}
                depth={50}
                count={visualLowMode ? 64 : visualMediumMode ? 140 : 240}
                factor={visualLowMode ? 1.8 : visualMediumMode ? 2.8 : 3.6}
                saturation={0}
                fade
                speed={visualLowMode ? 0.01 : visualMediumMode ? 0.02 : 0.04}
            />

            <OrbitingProps
                count={visualLowMode ? 4 : visualMediumMode ? 7 : 11}
                radius={visualLowMode ? 4.1 : visualMediumMode ? 4.5 : 5}
                speed={visualLowMode ? 0.06 : visualMediumMode ? 0.1 : 0.14}
                reducedMotion={visualLowMode}
            />

            <group
                position={[mobileOptimized ? CLUSTER_CENTER.x - 0.9 : CLUSTER_CENTER.x, CLUSTER_CENTER.y, CLUSTER_CENTER.z]}
                rotation={[0, -0.1, 0]}
            >
                {!mobileOptimized && (
                    <UICard
                        id="code-card"
                        position={[-1.5, 1.1, -4.0]}
                        initialRotation={[-0.1, -0.5, 0.1]}
                        color="#3b82f6"
                        type="code"
                        title="Automação Inteligente"
                        onRef={(r) => {
                            codeCardRef.current = r;
                        }}
                        speed={0.14}
                        delay={1}
                        activeCardId={activeCardId}
                        onActiveCardChange={setActiveCardId}
                        reducedMotion={reducedMotion}
                        baseScale={0.95}
                        qualityTier={performanceTier}
                    />
                )}

                <UICard
                    id="flow-card"
                    position={mobileOptimized ? [1.4, -0.1, -1.8] : [2.0, -0.1, -1.8]}
                    initialRotation={[0.05, 0.3, -0.05]}
                    color="#ffff00"
                    type="flow"
                    title="Conversão Digital"
                    onRef={(r) => {
                        flowCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.13 : 0.16}
                    delay={2}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 0.76 : 0.84}
                    qualityTier={performanceTier}
                />

                <UICard
                    id="preview-card"
                    position={mobileOptimized ? [-1.0, -1.2, 1.5] : [-1.3, -1.2, 1.5]}
                    initialRotation={[-0.05, -0.1, 0.02]}
                    color="#ff00ea"
                    type="preview"
                    title="Web Design"
                    onRef={(r) => {
                        previewCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.1 : 0.12}
                    delay={0}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    labelPosition="right"
                    baseScale={mobileOptimized ? 0.72 : 0.8}
                    qualityTier={performanceTier}
                />
            </group>
        </>
    );
}
