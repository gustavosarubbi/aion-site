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

    const reducedMotion = prefersReducedMotion || performanceTier === "low";
    const visualLowMode = mobileOptimized || reducedMotion;
    const visualMediumMode = !visualLowMode && performanceTier === "medium";
    const isCompactDesktop = !mobileOptimized && viewportWidth <= 1100;
    const isNarrowDesktop = !mobileOptimized && viewportWidth <= 1366;
    const isMidDesktop = !mobileOptimized && viewportWidth > 1366 && viewportWidth <= 1700;
    const isWideDesktop = !mobileOptimized && viewportWidth > 1700;
    const desktopScale = mobileOptimized ? 1.05 : isCompactDesktop ? 1.05 : isNarrowDesktop ? 1.15 : isMidDesktop ? 1.3 : 1.45;
    // clusterOffsetX coordinates with CLUSTER_CENTER.x = 4.5.
    // Normalized to keep the scene comfortably within the camera frustum at all resolutions.
    const clusterOffsetX = mobileOptimized ? -4.5 : isCompactDesktop ? -4.0 : isNarrowDesktop ? -3.9 : isMidDesktop ? -3.7 : -3.5;
    const clusterOffsetY = mobileOptimized ? 0.35 : isCompactDesktop ? 0.55 : isNarrowDesktop ? 0.65 : 0.88;
    const orbitCount = mobileOptimized ? 4 : visualLowMode ? 4 : visualMediumMode ? (isWideDesktop ? 11 : 8) : (isWideDesktop ? 14 : 10);
    const orbitRadius = mobileOptimized ? 3.4 : isCompactDesktop ? 4.0 : isNarrowDesktop ? 4.4 : isMidDesktop ? 4.6 : 4.8;
    // Camera Z: increased further to accommodate larger cards and higher position
    const desktopCameraZ = isCompactDesktop ? 21.5 : isWideDesktop ? 21.0 : isMidDesktop ? 20.5 : 21.0;

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
            labelPosition: "top" as const,
            labelOffset: [0.14, 2.18, 0.15] as [number, number, number],
            labelConnector: {
                start: [0.04, 1.27, 0.15] as [number, number, number],
                mid: [0.2, 1.74, 0.15] as [number, number, number],
                end: [0.14, 2.18, 0.15] as [number, number, number],
            },
            labelScale: isCompactDesktop ? 1.0 : isNarrowDesktop ? 1.08 : 1.15,
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
            labelPosition: "top" as const,
            labelOffset: [0.66, 2.12, 0.15] as [number, number, number],
            labelConnector: {
                start: [0.14, 1.25, 0.15] as [number, number, number],
                mid: [0.48, 1.72, 0.15] as [number, number, number],
                end: [0.66, 2.12, 0.15] as [number, number, number],
            },
            labelScale: isCompactDesktop ? 1.0 : isNarrowDesktop ? 1.08 : 1.15,
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
            labelPosition: "top" as const,
            labelOffset: [-0.66, 2.08, 0.15] as [number, number, number],
            labelConnector: {
                start: [-0.08, 1.24, 0.15] as [number, number, number],
                mid: [-0.38, 1.68, 0.15] as [number, number, number],
                end: [-0.66, 2.08, 0.15] as [number, number, number],
            },
            labelScale: isCompactDesktop ? 1.0 : isNarrowDesktop ? 1.08 : 1.15,
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
                fov={mobileOptimized ? 27 : 36}
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
                radius={orbitRadius}
                speed={mobileOptimized ? 0.05 : visualLowMode ? 0.06 : visualMediumMode ? 0.1 : 0.14}
                reducedMotion={visualLowMode}
                centerOffsetX={clusterOffsetX}
                centerOffsetY={clusterOffsetY}
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
                    position={mobileOptimized ? [-0.14, 0.88, -2.1] : isCompactDesktop ? [-0.72, 0.9, -2.9] : isNarrowDesktop ? [-0.88, 1.0, -3.2] : isMidDesktop ? [-1.1, 1.14, -3.6] : [-1.42, 1.28, -4.0]}
                    initialRotation={mobileOptimized ? [-0.08, -0.38, 0.06] : [-0.1, -0.48, 0.1]}
                    color="#3b82f6"
                    type="code"
                    title="Automação Inteligente"
                    onRef={(r) => {
                        codeCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.1 : 0.14}
                    delay={1}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 1.0 : 1.0 * desktopScale}
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
                    position={mobileOptimized ? [0.84, 0.0, -1.15] : isCompactDesktop ? [0.76, -0.04, -1.18] : isNarrowDesktop ? [1.0, 0.0, -1.28] : isMidDesktop ? [1.44, 0.06, -1.5] : [1.84, 0.12, -1.82]}
                    initialRotation={mobileOptimized ? [0.04, 0.22, -0.04] : [0.05, 0.28, -0.05]}
                    color="#22d3ee"
                    type="flow"
                    title="Conversão Digital"
                    onRef={(r) => {
                        flowCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.1 : 0.16}
                    delay={2}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 0.98 : 0.88 * desktopScale}
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
                    position={mobileOptimized ? [-1.0, -0.78, 0.96] : isCompactDesktop ? [-0.68, -0.66, 0.82] : isNarrowDesktop ? [-0.8, -0.74, 0.94] : isMidDesktop ? [-1.0, -0.84, 1.14] : [-1.24, -0.96, 1.48]}
                    initialRotation={mobileOptimized ? [-0.04, -0.08, 0.02] : [-0.05, -0.1, 0.02]}
                    color="#60a5fa"
                    type="preview"
                    title="Web Design"
                    onRef={(r) => {
                        previewCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.08 : 0.12}
                    delay={0}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? 0.96 : 0.84 * desktopScale}
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
