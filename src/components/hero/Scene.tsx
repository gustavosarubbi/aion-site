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
    const [viewportWidth, setViewportWidth] = useState(1600);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setPrefersReducedMotion(mq.matches);
        onChange();
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const onResize = () => setViewportWidth(window.innerWidth);
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const desktopProgress = mobileOptimized ? 0 : Math.max(0, Math.min(1, (viewportWidth - 1000) / 920));
    const reducedMotion = prefersReducedMotion || performanceTier === "low";
    const visualLowMode = mobileOptimized || reducedMotion;
    const visualMediumMode = !visualLowMode && performanceTier === "medium";
    const isWideDesktop = viewportWidth >= 1600;

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    const lerp3 = (a: number[], b: number[], t: number) => [Math.round(lerp(a[0], b[0], t) * 1000) / 1000, Math.round(lerp(a[1], b[1], t) * 1000) / 1000, Math.round(lerp(a[2], b[2], t) * 1000) / 1000] as [number, number, number];

    // responsiveProgress: 0 at 1366px, 1 at 1920px
    const responsiveProgress = Math.max(0, Math.min(1, (viewportWidth - 1366) / 554));

    // SCALE: 1.65 (xl) -> 1.48 (2xl/GitHub)
    const desktopScale = mobileOptimized ? 1.05 : lerp(1.65, 1.85, responsiveProgress);

    // CAMERA: 56.0 (xl) -> 42.0 (2xl/GitHub)
    const desktopCameraZ = lerp(56.0, 42.0, responsiveProgress);

    const orbitCount = mobileOptimized ? 4 : visualLowMode ? 4 : visualMediumMode ? (isWideDesktop ? 11 : 8) : (isWideDesktop ? 14 : 10);
    const orbitRadius = mobileOptimized ? 3.4 : lerp(4.0, 4.6, desktopProgress);

    const clusterOffsetX = mobileOptimized ? -4.5 : -4.5;
    const clusterOffsetY = mobileOptimized ? 0.35 : lerp(1.2, 1.8, responsiveProgress);

    const codeLabel = mobileOptimized
        ? {
            labelPosition: "top" as const,
            labelOffset: [0.08, 2.05, 0.15] as [number, number, number],
            labelConnector: {
                start: [0.02, 1.27, 0.15] as [number, number, number],
                mid: [0.12, 1.66, 0.15] as [number, number, number],
                end: [0.08, 2.05, 0.15] as [number, number, number],
            },
            labelScale: 0.84,
            labelCompact: true,
            labelDistanceFactor: 8,
        }
        : {
            labelPosition: "right" as const,
            labelOffset: [2.47, 0.5, 0.15] as [number, number, number],
            labelConnector: {
                start: [2.0, 0.4, 0.15] as [number, number, number],
                mid: [2.2, 0.45, 0.15] as [number, number, number],
                end: [2.47, 0.5, 0.15] as [number, number, number],
            },
            labelScale: lerp(1.42, 1.65, desktopProgress),
            labelCompact: true,
            labelDistanceFactor: 9.2,
        };

    const flowLabel = mobileOptimized
        ? {
            labelPosition: "top" as const,
            labelOffset: [0.66, 1.95, 0.15] as [number, number, number],
            labelConnector: {
                start: [0.16, 1.23, 0.15] as [number, number, number],
                mid: [0.46, 1.62, 0.15] as [number, number, number],
                end: [0.66, 1.95, 0.15] as [number, number, number],
            },
            labelScale: 0.84,
            labelCompact: true,
            labelDistanceFactor: 8,
        }
        : {
            labelPosition: "bottom" as const,
            labelOffset: [0.0, -1.63, 0.15] as [number, number, number],
            labelConnector: {
                start: [0.0, -1.29, 0.15] as [number, number, number],
                mid: [0.15, -1.44, 0.15] as [number, number, number],
                end: [0.0, -1.63, 0.15] as [number, number, number],
            },
            labelScale: lerp(1.42, 1.65, desktopProgress),
            labelCompact: true,
            labelDistanceFactor: 9.2,
        };

    const previewLabel = mobileOptimized
        ? {
            labelPosition: "top" as const,
            labelOffset: [-0.68, 1.9, 0.15] as [number, number, number],
            labelConnector: {
                start: [-0.06, 1.2, 0.15] as [number, number, number],
                mid: [-0.36, 1.56, 0.15] as [number, number, number],
                end: [-0.68, 1.9, 0.15] as [number, number, number],
            },
            labelScale: 0.84,
            labelCompact: true,
            labelDistanceFactor: 8,
        }
        : {
            labelPosition: responsiveProgress < 0.75 ? ("left" as const) : ("top" as const),
            labelOffset: lerp3([-1.4, 1.9, 0.15], [-1.42, 1.59, 0.15], responsiveProgress),
            labelConnector: {
                start: lerp3([-1.0, 1.45, 0.15], [-1.42, 1.29, 0.15], responsiveProgress),
                mid: lerp3([-1.1, 1.7, 0.15], [-1.48, 1.44, 0.15], responsiveProgress),
                end: lerp3([-1.4, 1.9, 0.15], [-1.42, 1.59, 0.15], responsiveProgress),
            },
            labelScale: lerp(0.9, 1.15, desktopProgress),
            labelCompact: true,
            labelDistanceFactor: 9.2,
        };

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[
                    0,
                    mobileOptimized ? 0.1 : 0,
                    mobileOptimized
                        ? visualLowMode
                            ? 15.2
                            : visualMediumMode
                                ? 14.8
                                : 14.4
                        : visualLowMode
                            ? 18.4
                            : visualMediumMode
                                ? 17.8
                                : desktopCameraZ,
                ]}
                fov={mobileOptimized ? 27 : 44}
            />
            <ambientLight intensity={mobileOptimized ? 0.45 : visualLowMode ? 0.42 : visualMediumMode ? 0.46 : 0.5} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={mobileOptimized ? 0.68 : visualLowMode ? 0.72 : visualMediumMode ? 0.86 : 1}
                color="#06b6d4"
            />
            <pointLight
                position={[-10, -5, -10]}
                intensity={mobileOptimized ? 0.26 : visualLowMode ? 0.3 : visualMediumMode ? 0.4 : 0.5}
                color="#3b82f6"
            />
            {!visualLowMode && !visualMediumMode && <Environment preset="night" />}
            <Stars
                radius={100}
                depth={50}
                count={mobileOptimized ? 44 : visualLowMode ? 64 : visualMediumMode ? 140 : 240}
                factor={mobileOptimized ? 1.5 : visualLowMode ? 1.8 : visualMediumMode ? 2.8 : 3.6}
                saturation={0}
                fade
                speed={mobileOptimized ? 0.008 : visualLowMode ? 0.01 : visualMediumMode ? 0.02 : 0.04}
            />

            <OrbitingProps
                count={orbitCount}
                radius={mobileOptimized ? 3.4 : lerp(4.4, 5.8, desktopProgress)}
                speed={mobileOptimized ? 0.05 : visualLowMode ? 0.06 : visualMediumMode ? 0.1 : 0.14}
                reducedMotion={visualLowMode}
                centerOffsetX={clusterOffsetX}
                centerOffsetY={clusterOffsetY}
                zMultiplier={1.5}
            />

            <group
                position={[
                    CLUSTER_CENTER.x + clusterOffsetX,
                    CLUSTER_CENTER.y + clusterOffsetY,
                    CLUSTER_CENTER.z,
                ]}
                rotation={[0, -0.1, 0]}
            >
                <UICard
                    id="code-card"
                    position={mobileOptimized ? [-0.14, 0.88, -2.1] : lerp3([-3.8, 2.7, -7.5], [-2.4, 2.8, -4.5], responsiveProgress)}
                    initialRotation={mobileOptimized ? [-0.08, -0.38, 0.06] : [-0.1, -0.48, 0.1]}
                    color="#3b82f6"
                    type="code"
                    title="SISTEMAS IA"
                    onRef={(r) => {
                        codeCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.1 : 0.14}
                    delay={1}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 1.0 : lerp(1.50, 1.15, responsiveProgress) * desktopScale}
                    labelPosition={codeLabel.labelPosition}
                    labelOffset={codeLabel.labelOffset}
                    labelConnector={codeLabel.labelConnector}
                    labelScale={codeLabel.labelScale}
                    labelCompact={codeLabel.labelCompact}
                    labelDistanceFactor={codeLabel.labelDistanceFactor}
                    qualityTier={performanceTier}
                />

                <UICard
                    id="flow-card"
                    position={mobileOptimized ? [0.84, 0.0, -1.15] : lerp3([4.2, 0.8, -4.5], [3.15, 0.12, -2.4], responsiveProgress)}
                    initialRotation={mobileOptimized ? [0.04, 0.22, -0.04] : [0.05, 0.28, -0.05]}
                    color="#22d3ee"
                    type="flow"
                    title="ALTA CONVERSÃO"
                    onRef={(r) => {
                        flowCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.1 : 0.16}
                    delay={2}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 0.98 : lerp(1.15, 1.05, responsiveProgress) * desktopScale}
                    labelPosition={flowLabel.labelPosition}
                    labelOffset={flowLabel.labelOffset}
                    labelConnector={flowLabel.labelConnector}
                    labelScale={flowLabel.labelScale}
                    labelCompact={flowLabel.labelCompact}
                    labelDistanceFactor={flowLabel.labelDistanceFactor}
                    qualityTier={performanceTier}
                />

                <UICard
                    id="preview-card"
                    position={mobileOptimized ? [-1.3, -1.15, 0.5] : lerp3([-0.6, -2.8, 3.5], [-1.15, -2.5, 2.85], responsiveProgress)}
                    initialRotation={mobileOptimized ? [0.1, 0.34, -0.02] : [0.12, 0.42, -0.04]}
                    color="#38bdf8"
                    type="preview"
                    title="DESIGN PREMIUM"
                    onRef={(r) => {
                        previewCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.08 : 0.12}
                    delay={0}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 0.96 : lerp(0.90, 0.88, responsiveProgress) * desktopScale}
                    labelPosition={previewLabel.labelPosition}
                    labelOffset={previewLabel.labelOffset}
                    labelConnector={previewLabel.labelConnector}
                    labelScale={previewLabel.labelScale}
                    labelCompact={previewLabel.labelCompact}
                    labelDistanceFactor={previewLabel.labelDistanceFactor}
                    qualityTier={performanceTier}
                />
            </group>
        </>
    );
}
