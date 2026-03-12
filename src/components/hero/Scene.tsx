"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { PerspectiveCamera, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import { OrbitingProps, CLUSTER_CENTER } from "./OrbitingProps";
import { UICard } from "./UICard";

type SceneProps = {
  mobileOptimized?: boolean;
  onAnyCardDraggingChange?: (isDragging: boolean) => void;
};

type PerformanceTier = "high" | "medium" | "low";
type Vec3 = [number, number, number];
type MobileBand = "phone" | "tablet" | "laptop";
type MobileLayout = {
    cameraY: number;
    cameraZ: number;
    fov: number;
    cardScaleBoost: number;
    orbitRadius: number;
    clusterOffsetY: number;
    positions: {
        code: Vec3;
        flow: Vec3;
        preview: Vec3;
    };
    scaleMultipliers: {
        code: number;
        flow: number;
        preview: number;
    };
};

const DESKTOP_MIN_WIDTH = 1280;
const DESKTOP_BASELINE_WIDTH = 1366;
const DESKTOP_MAX_WIDTH = 1920;
const MID_DESKTOP_STANDARD_MAX = 1536;
const MID_DESKTOP_STANDARD_LOCK = 1378;
const MID_DESKTOP_START = 1536;
const MID_DESKTOP_END = 1650;
const CODE_CARD_DESKTOP_ANCHOR_WIDTH = MID_DESKTOP_STANDARD_LOCK;
const DESKTOP_SCALE_REDUCTION = 0.80; // Reducing desktop card sizes by 20%

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
    Math.round(lerp(a[0], b[0], t) * 1000) / 1000,
    Math.round(lerp(a[1], b[1], t) * 1000) / 1000,
    Math.round(lerp(a[2], b[2], t) * 1000) / 1000,
];

function getViewportBands(mobileOptimized: boolean, viewportWidth: number) {
    const isPhoneBand = mobileOptimized && viewportWidth < 768;
    const isTabletBand = mobileOptimized && viewportWidth >= 768 && viewportWidth < 1024;
    const isLaptopBand = mobileOptimized && viewportWidth >= 1024;

    return {
        isPhoneBand,
        isTabletBand,
        isLaptopBand,
        phoneProgress: clamp01((viewportWidth - 320) / 447),
        tabletProgress: clamp01((viewportWidth - 768) / 255),
        laptopProgress: clamp01((viewportWidth - 1024) / 255),
        desktopProgress: mobileOptimized ? 0 : clamp01((viewportWidth - DESKTOP_MIN_WIDTH) / (DESKTOP_MAX_WIDTH - DESKTOP_MIN_WIDTH)),
    };
}

function getDesktopAnchors(mobileOptimized: boolean, viewportWidth: number) {
    const responsiveProgress = clamp01((viewportWidth - DESKTOP_MIN_WIDTH) / (DESKTOP_MAX_WIDTH - DESKTOP_MIN_WIDTH));
    const desktopAnchorProgress = mobileOptimized ? 0 : clamp01((viewportWidth - DESKTOP_BASELINE_WIDTH) / (DESKTOP_MAX_WIDTH - DESKTOP_BASELINE_WIDTH));
    const desktopAnchorEase = desktopAnchorProgress * desktopAnchorProgress * (3 - 2 * desktopAnchorProgress);
    const preAnchorProgress = mobileOptimized ? 0 : clamp01((viewportWidth - DESKTOP_MIN_WIDTH) / (DESKTOP_BASELINE_WIDTH - DESKTOP_MIN_WIDTH));

    const isMidDesktopBand = !mobileOptimized && viewportWidth >= MID_DESKTOP_START && viewportWidth <= MID_DESKTOP_END;
    const midDesktopProgress = isMidDesktopBand ? clamp01((viewportWidth - MID_DESKTOP_START) / (MID_DESKTOP_END - MID_DESKTOP_START)) : 0;
    const midDesktopBump = isMidDesktopBand ? Math.sin(Math.PI * midDesktopProgress) : 0;

    const scaleBoost1366 = mobileOptimized
        ? 0
        : viewportWidth < DESKTOP_BASELINE_WIDTH
            ? lerp(0.14, 0.18, preAnchorProgress)
            : lerp(0.18, 0.0, desktopAnchorEase) + 0.02 * midDesktopBump;

    const cameraPull1366 = mobileOptimized
        ? 0
        : viewportWidth < DESKTOP_BASELINE_WIDTH
            ? lerp(1.6, 2.2, preAnchorProgress)
            : lerp(2.2, 0.0, desktopAnchorEase) + 0.35 * midDesktopBump;

    const dropBoost1366 = mobileOptimized
        ? 0
        : viewportWidth < DESKTOP_BASELINE_WIDTH
            ? lerp(0.48, 0.58, preAnchorProgress)
            : lerp(0.58, 0.0, desktopAnchorEase) + 0.08 * midDesktopBump;

    return {
        responsiveProgress,
        scaleBoost1366,
        cameraPull1366,
        dropBoost1366,
        premiumLabelFocus1366: mobileOptimized ? 0 : clamp01(1 - Math.abs(viewportWidth - DESKTOP_BASELINE_WIDTH) / 48),
        desktopLift: lerp(0.45, 0.0, responsiveProgress),
    };
}

function getMobileLayout(band: MobileBand, progress: number): MobileLayout {
    if (band === "laptop") {
        return {
            cameraY: lerp(0.16, 0.22, progress),
            cameraZ: lerp(15.4, 14.8, progress),
            fov: 33,
            cardScaleBoost: lerp(1.4, 1.55, progress),
            orbitRadius: lerp(2.4, 2.7, progress),
            clusterOffsetY: lerp(0.18, 0.26, progress),
            positions: {
                code: [0.0, 0.52, 0.62],
                flow: [3.6, -0.6, -0.44],
                preview: [-3.6, -0.7, -0.5],
            },
            scaleMultipliers: {
                code: 1.10,
                flow: 1.08,
                preview: 1.08,
            },
        };
    }

    if (band === "tablet") {
        return {
            cameraY: lerp(0.12, 0.18, progress),
            cameraZ: lerp(15.8, 15.2, progress),
            fov: 32,
            cardScaleBoost: lerp(1.35, 1.5, progress),
            orbitRadius: lerp(2.1, 2.4, progress),
            clusterOffsetY: lerp(0.12, 0.2, progress),
            positions: {
                code: [0.0, 0.44, 0.56],
                flow: [3.4, -0.7, -0.4],
                preview: [-3.4, -0.8, -0.46],
            },
            scaleMultipliers: {
                code: 1.08,
                flow: 1.06,
                preview: 1.06,
            },
        };
    }

    return {
        cameraY: lerp(0.08, 0.14, progress),
        cameraZ: lerp(15.2, 14.7, progress),
        fov: 31,
        cardScaleBoost: lerp(1.45, 1.6, progress),
        orbitRadius: lerp(2.1, 2.6, progress),
        clusterOffsetY: lerp(0.06, 0.14, progress),
        positions: {
            code: [0.0, 0.46, 0.5],
            flow: [lerp(3.1, 3.5, progress), -0.55, -0.32],
            preview: [lerp(-3.1, -3.5, progress), -0.65, -0.38],
        },
        scaleMultipliers: {
            code: 1.2,
            flow: 1.04,
            preview: 1.04,
        },
    };
}

export function Scene({ mobileOptimized = false, onAnyCardDraggingChange }: SceneProps) {
    const codeCardRef = useRef<THREE.Group>(null!);
    const flowCardRef = useRef<THREE.Group>(null!);
    const previewCardRef = useRef<THREE.Group>(null!);

const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  
  // Wrapper for dragging state changes with callback
  const handleDraggingCardChange = useCallback((id: string | null) => {
    setDraggingCardId(id);
    onAnyCardDraggingChange?.(id !== null);
  }, [onAnyCardDraggingChange]);
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

    const normalizedDesktopWidth = viewportWidth;

    const {
        isPhoneBand,
        isTabletBand,
        isLaptopBand,
        phoneProgress,
        tabletProgress,
        laptopProgress,
        desktopProgress,
    } = getViewportBands(mobileOptimized, normalizedDesktopWidth);

    const mobileBand: MobileBand = isLaptopBand ? "laptop" : isTabletBand ? "tablet" : "phone";
    const mobileProgress = mobileBand === "laptop" ? laptopProgress : mobileBand === "tablet" ? tabletProgress : phoneProgress;
    const mobileLayout = getMobileLayout(mobileBand, mobileProgress);

    const reducedMotion = prefersReducedMotion || performanceTier === "low";
    const visualLowMode = reducedMotion || isPhoneBand;
    const visualMediumMode = !visualLowMode && (performanceTier === "medium" || mobileOptimized);
    const isWideDesktop = normalizedDesktopWidth >= 1600;

    const {
        responsiveProgress,
        scaleBoost1366,
        cameraPull1366,
        dropBoost1366,
        premiumLabelFocus1366,
        desktopLift,
    } = getDesktopAnchors(mobileOptimized, normalizedDesktopWidth);

    const codeCardAnchor = getDesktopAnchors(false, CODE_CARD_DESKTOP_ANCHOR_WIDTH);

    // SCALE: tuned for xl+ while keeping continuity with tablet/laptop stacks
    const desktopScale = mobileOptimized
        ? 1.05
        : lerp(2.1, 2.4, responsiveProgress) * (1 + scaleBoost1366) * DESKTOP_SCALE_REDUCTION;

    const codeCardDesktopScale = lerp(1.65, 1.35, responsiveProgress)
        * (lerp(2.1, 2.4, responsiveProgress) * (1 + scaleBoost1366))
        * lerp(1.0, 0.92, responsiveProgress)
        * DESKTOP_SCALE_REDUCTION;

    const codeCardDesktopPosition = (() => {
        const [x, , z] = lerp3([-3.8, 2.3, -8.5], [-2.6, 2.5, -5.5], responsiveProgress);
        return [x, Math.round(lerp(2.3, 2.5, responsiveProgress) * 1000) / 1000, z] as Vec3;
    })();

    // CAMERA: 56.0 (xl) -> 42.0 (2xl/GitHub)
    const desktopCameraZ = lerp(56.0, 42.0, responsiveProgress) - cameraPull1366;

    const mobileCardScaleBoost = mobileLayout.cardScaleBoost;

    const orbitCount = mobileOptimized
        ? isLaptopBand
            ? 4
            : isTabletBand
                ? 3
                : 3
        : visualLowMode
            ? 4
            : visualMediumMode
                ? (isWideDesktop ? 11 : 8)
                : (isWideDesktop ? 14 : 10);

    const orbitRadius = mobileOptimized ? mobileLayout.orbitRadius : lerp(2.8, 3.4, desktopProgress);

    const clusterOffsetX = -4.5;
    const clusterOffsetY = mobileOptimized
        ? mobileLayout.clusterOffsetY
        : lerp(0.0, 0.6, responsiveProgress) + desktopLift - dropBoost1366;

    const codeLabel = mobileOptimized
        ? {
            labelPosition: "top" as const,
            labelOffset: isLaptopBand
                ? [0, 1.62, 0.15] as [number, number, number]
                : isTabletBand
                    ? [0, 1.56, 0.15] as [number, number, number]
                    : [0, lerp(1.3, 1.48, mobileProgress), 0.15] as [number, number, number],
            labelConnector: {
                start: [0.02, 1.27, 0.15] as [number, number, number],
                mid: [0.12, 1.66, 0.15] as [number, number, number],
                end: isLaptopBand
                    ? [0.14, 2.2, 0.15] as [number, number, number]
                    : isTabletBand
                        ? [0.1, 2.12, 0.15] as [number, number, number]
                        : [0.08, lerp(1.8, 2.02, mobileProgress), 0.15] as [number, number, number],
            },
            labelScale: isLaptopBand ? 1.45 : isTabletBand ? 1.35 : lerp(0.85, 1.15, mobileProgress),
            labelCompact: true,
            labelDistanceFactor: isLaptopBand ? 8.2 : isTabletBand ? 7.8 : 7.4,
        }
        : {
            labelPosition: "right" as const,
            labelOffset: [2.47, 0.45, 0.15] as [number, number, number],
            labelConnector: {
                start: [2.0, 0.45, 0.15] as [number, number, number],
                mid: [2.2, 0.45, 0.15] as [number, number, number],
                end: [2.47, 0.45, 0.15] as [number, number, number],
            },
            labelScale: lerp(1.75, 1.85, desktopProgress),
            labelCompact: true,
            labelDistanceFactor: 9.2,
        };

    const flowLabel = mobileOptimized
        ? {
            labelPosition: "top" as const,
            labelOffset: isLaptopBand
                ? [0, 1.6, 0.15] as [number, number, number]
                : isTabletBand
                    ? [0, 1.54, 0.15] as [number, number, number]
                    : [0, lerp(1.28, 1.46, mobileProgress), 0.15] as [number, number, number],
            labelConnector: {
                start: [0.16, 1.23, 0.15] as [number, number, number],
                mid: [0.46, 1.62, 0.15] as [number, number, number],
                end: isLaptopBand
                    ? [0.74, 2.12, 0.15] as [number, number, number]
                    : isTabletBand
                        ? [0.7, 2.02, 0.15] as [number, number, number]
                        : [0.66, lerp(1.75, 1.95, mobileProgress), 0.15] as [number, number, number],
            },
            labelScale: isLaptopBand ? 1.45 : isTabletBand ? 1.35 : lerp(0.85, 1.15, mobileProgress),
            labelCompact: true,
            labelDistanceFactor: isLaptopBand ? 8.2 : isTabletBand ? 7.8 : 7.4,
        }
        : {
            labelPosition: "bottom" as const,
            labelOffset: [0.0, -1.63, 0.15] as [number, number, number],
            labelConnector: {
                start: [0.0, -1.29, 0.15] as [number, number, number],
                mid: [0.0, -1.45, 0.15] as [number, number, number],
                end: [0.0, -1.63, 0.15] as [number, number, number],
            },
            labelScale: lerp(1.75, 1.85, desktopProgress),
            labelCompact: true,
            labelDistanceFactor: 9.2,
        };

    const previewLabel = mobileOptimized
        ? {
            labelPosition: "top" as const,
            labelOffset: isLaptopBand
                ? [0, 1.52, 0.15] as [number, number, number]
                : isTabletBand
                    ? [0, 1.46, 0.15] as [number, number, number]
                    : [0, lerp(1.22, 1.38, mobileProgress), 0.15] as [number, number, number],
            labelConnector: {
                start: [-0.06, 1.2, 0.15] as [number, number, number],
                mid: [-0.36, 1.56, 0.15] as [number, number, number],
                end: isLaptopBand
                    ? [-0.78, 2.06, 0.15] as [number, number, number]
                    : isTabletBand
                        ? [-0.72, 1.98, 0.15] as [number, number, number]
                        : [-0.68, lerp(1.7, 1.9, mobileProgress), 0.15] as [number, number, number],
            },
            labelScale: isLaptopBand ? 1.42 : isTabletBand ? 1.32 : lerp(0.82, 1.12, mobileProgress),
            labelCompact: true,
            labelDistanceFactor: isLaptopBand ? 8.0 : isTabletBand ? 7.6 : 7.2,
        }
        : {
            labelPosition: "left" as const,
            labelOffset: lerp3([-1.54, 1.71, 0.15], [-1.4, 1.6, 0.15], responsiveProgress),
            labelConnector: {
                start: lerp3([-1.22, 1.27, 0.15], [-1.42, 1.33, 0.15], responsiveProgress),
                mid: lerp3([-1.38, 1.5, 0.15], [-1.42, 1.5, 0.15], responsiveProgress),
                end: lerp3([-1.54, 1.71, 0.15], [-1.4, 1.6, 0.15], responsiveProgress),
            },
            labelScale: lerp(0.9, 1.35, desktopProgress),
            labelCompact: true,
            labelDistanceFactor: 9.2,
        };
    const premiumLabelScale = previewLabel.labelScale * (1 + 0.18 * premiumLabelFocus1366);

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[
                    0,
                    mobileOptimized
                        ? mobileLayout.cameraY
                        : 0,
                    mobileOptimized
                        ? mobileLayout.cameraZ
                        : visualLowMode
                            ? 18.4
                            : visualMediumMode
                                ? 17.8
                                : desktopCameraZ,
                ]}
                fov={mobileOptimized ? mobileLayout.fov : 44}
            />
            <ambientLight intensity={mobileOptimized ? (isLaptopBand ? 0.48 : isTabletBand ? 0.45 : 0.42) : visualLowMode ? 0.42 : visualMediumMode ? 0.46 : 0.5} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={mobileOptimized ? (isLaptopBand ? 0.72 : isTabletBand ? 0.67 : 0.62) : visualLowMode ? 0.72 : visualMediumMode ? 0.86 : 0.45}
                color="#379cfd"
            />
            <pointLight
                position={[-10, -5, -10]}
                intensity={mobileOptimized ? (isLaptopBand ? 0.27 : isTabletBand ? 0.24 : 0.2) : visualLowMode ? 0.3 : visualMediumMode ? 0.4 : 0.20}
                color="#1a5fa8"
            />
            {!visualLowMode && !visualMediumMode && <Environment preset="night" />}
            <Stars
                radius={100}
                depth={50}
                count={
                    mobileOptimized
                        ? isLaptopBand
                            ? 56
                            : isTabletBand
                                ? 42
                                : 28
                        : visualLowMode
                            ? 64
                            : visualMediumMode
                                ? 140
                                : 240
                }
                factor={mobileOptimized ? (isLaptopBand ? 1.8 : isTabletBand ? 1.55 : 1.3) : visualLowMode ? 1.8 : visualMediumMode ? 2.8 : 3.6}
                saturation={0}
                fade
                speed={mobileOptimized ? (isLaptopBand ? 0.011 : isTabletBand ? 0.009 : 0.007) : visualLowMode ? 0.01 : visualMediumMode ? 0.02 : 0.04}
            />

            <OrbitingProps
                count={orbitCount}
                radius={mobileOptimized ? orbitRadius : lerp(4.5, 5.2, desktopProgress)}
                speed={mobileOptimized ? (isLaptopBand ? 0.066 : isTabletBand ? 0.054 : 0.042) : visualLowMode ? 0.06 : visualMediumMode ? 0.1 : 0.14}
                reducedMotion={visualLowMode}
                centerOffsetX={clusterOffsetX}
                centerOffsetY={clusterOffsetY}
                zMultiplier={mobileOptimized ? 0.95 : 1.5}
                sizeMultiplier={mobileOptimized ? (isLaptopBand ? 0.95 : isTabletBand ? 1 : 1.08) : lerp(1.8, 1.0, desktopProgress)}
                verticalAmplitude={mobileOptimized ? (isLaptopBand ? 1.1 : isTabletBand ? 0.95 : 0.82) : 1.6}
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
                    position={
                        mobileOptimized
                            ? mobileLayout.positions.code
                            : codeCardDesktopPosition
                    }
                    initialRotation={mobileOptimized ? [0.02, -0.22, 0.05] : [-0.1, -0.48, 0.1]}
                    color="#379cfd"
                    type="code"
                    title="SISTEMAS IA"
                    onRef={(r) => {
                        codeCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.075 : 0.14}
                    delay={1}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    draggingCardId={draggingCardId}
                    onDraggingCardChange={handleDraggingCardChange}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? mobileLayout.scaleMultipliers.code * mobileCardScaleBoost : codeCardDesktopScale}
                    labelPosition={codeLabel.labelPosition}
                    labelOffset={codeLabel.labelOffset}
                    labelConnector={codeLabel.labelConnector}
                    labelScale={codeLabel.labelScale}
                    labelCompact={codeLabel.labelCompact}
                    labelDistanceFactor={codeLabel.labelDistanceFactor}
qualityTier={performanceTier}
        showConnector={!mobileOptimized}
        mobileOptimized={mobileOptimized}
      />

      <UICard
        id="flow-card"
                    position={
                        mobileOptimized
                            ? mobileLayout.positions.flow
                            : lerp3([4.2, -0.4, -4.5], [2.9, -0.85, -2.4], responsiveProgress)
                    }
                    initialRotation={mobileOptimized ? [0.03, 0.18, -0.03] : [0.05, 0.28, -0.05]}
                    color="#379cfd"
                    type="flow"
                    title="ALTA CONVERSÃO"
                    onRef={(r) => {
                        flowCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.078 : 0.16}
                    delay={2}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    draggingCardId={draggingCardId}
                    onDraggingCardChange={handleDraggingCardChange}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? mobileLayout.scaleMultipliers.flow * mobileCardScaleBoost : lerp(1.15, 1.15, responsiveProgress) * desktopScale}
                    labelPosition={flowLabel.labelPosition}
                    labelOffset={flowLabel.labelOffset}
                    labelConnector={flowLabel.labelConnector}
                    labelScale={flowLabel.labelScale}
                    labelCompact={flowLabel.labelCompact}
                    labelDistanceFactor={flowLabel.labelDistanceFactor}
qualityTier={performanceTier}
        showConnector={!mobileOptimized}
        mobileOptimized={mobileOptimized}
      />

      <UICard
        id="preview-card"
                    position={
                        mobileOptimized
                            ? mobileLayout.positions.preview
                            : lerp3([-0.6, -3.4, 3.5], [-1.15, -3.2, 2.85], responsiveProgress)
                    }
                    initialRotation={mobileOptimized ? [0.06, 0.04, -0.01] : [0.12, 0.42, -0.04]}
                    color="#5db8ff"
                    type="preview"
                    title="DESIGN ELITE"
                    onRef={(r) => {
                        previewCardRef.current = r;
                    }}
                    speed={mobileOptimized ? 0.06 : 0.12}
                    delay={0}
                    activeCardId={activeCardId}
                    onActiveCardChange={setActiveCardId}
                    draggingCardId={draggingCardId}
                    onDraggingCardChange={handleDraggingCardChange}
                    reducedMotion={reducedMotion}
                    baseScale={mobileOptimized ? mobileLayout.scaleMultipliers.preview * mobileCardScaleBoost : lerp(0.90, 0.88, responsiveProgress) * desktopScale}
                    labelPosition={previewLabel.labelPosition}
                    labelOffset={previewLabel.labelOffset}
                    labelConnector={previewLabel.labelConnector}
                    labelScale={premiumLabelScale}
                    labelCompact={previewLabel.labelCompact}
labelDistanceFactor={previewLabel.labelDistanceFactor}
        qualityTier={performanceTier}
        showConnector={!mobileOptimized}
        mobileOptimized={mobileOptimized}
      />
            </group>
        </>
    );
}
