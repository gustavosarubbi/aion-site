"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import { OrbitalRings } from "./OrbitalRings";
import { CLUSTER_CENTER } from "./OrbitingProps";
import { UICard } from "./UICard";

export function Scene({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
    const codeCardRef = useRef<THREE.Group>(null!);
    const flowCardRef = useRef<THREE.Group>(null!);
    const previewCardRef = useRef<THREE.Group>(null!);

    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [adaptiveReducedMotion, setAdaptiveReducedMotion] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const fpsTracker = useRef({ frames: 0, elapsed: 0 });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setPrefersReducedMotion(mq.matches);
        onChange();
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useFrame((_, delta) => {
        fpsTracker.current.frames += 1;
        fpsTracker.current.elapsed += delta;
        if (fpsTracker.current.elapsed < 1.2) return;

        const fps = fpsTracker.current.frames / fpsTracker.current.elapsed;
        fpsTracker.current.frames = 0;
        fpsTracker.current.elapsed = 0;

        setAdaptiveReducedMotion((current) => {
            if (!current && fps < 45) return true;
            if (current && fps > 55) return false;
            return current;
        });
    });

    const reducedMotion = adaptiveReducedMotion || prefersReducedMotion;

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={28} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3b82f6" />
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={reducedMotion ? 220 : 320} factor={reducedMotion ? 3.2 : 4} saturation={0} fade speed={reducedMotion ? 0.02 : 0.05} />

            <OrbitalRings radius={3.2} />

            <group position={[CLUSTER_CENTER.x, CLUSTER_CENTER.y, CLUSTER_CENTER.z]} rotation={[0, -0.1, 0]}>
                <UICard
                    id="code-card"
                    position={[-1.5, 1.4, -4.0]} initialRotation={[-0.1, -0.5, 0.1]}
                    color="#3b82f6" type="code" title="Automação Inteligente"
                    onRef={(r) => { (codeCardRef as any).current = r; }} speed={0.14} delay={1}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={0.95}
                />

                <UICard
                    id="flow-card"
                    position={[2.0, 0.2, -1.8]} initialRotation={[0.05, 0.3, -0.05]}
                    color="#06b6d4" type="flow" title="ChatBots Modernos"
                    onRef={(r) => { (flowCardRef as any).current = r; }} speed={0.16} delay={2}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={0.84}
                />

                <UICard
                    id="preview-card"
                    position={[-1.3, -1.0, 1.5]} initialRotation={[-0.05, -0.1, 0.02]}
                    color="#ffffff" type="preview" title="Web Design"
                    onRef={(r) => { (previewCardRef as any).current = r; }} speed={0.12} delay={0}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    labelPosition="right"
                    baseScale={0.8}
                />
            </group>
        </>
    );
}
