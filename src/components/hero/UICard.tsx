"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Html, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { Code2, Bot, Globe } from "lucide-react";
import { useSignal } from "./SignalContext";
import { CardFrame } from "./CardFrame";
import { CodeCardContent, PreviewCardContent, FlowCardContent } from "./CardContents";

function hashSeed(seed: string, channel: number) {
    let hash = 2166136261 ^ channel;

    for (let i = 0; i < seed.length; i += 1) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
}

function seededRange(seed: string, channel: number, min: number, max: number) {
    return min + hashSeed(seed, channel) * (max - min);
}

export type CardType = "code" | "flow" | "preview";

export type UICardProps = {
    id: string;
    position: [number, number, number];
    initialRotation: [number, number, number];
    color?: string;
    type?: CardType;
    delay?: number;
    onRef: (ref: THREE.Group) => void;
    speed?: number;
    title?: string;
    activeCardId: string | null;
    onActiveCardChange: (id: string | null) => void;
    reducedMotion: boolean;
    labelPosition?: "top" | "right";
    baseScale?: number;
    qualityTier?: "high" | "medium" | "low";
};

export const UICard = ({
    id,
    position,
    initialRotation,
    color = "#06b6d4",
    type = "code",
    delay = 0,
    onRef,
    speed = 0.1,
    title,
    activeCardId,
    onActiveCardChange,
    reducedMotion,
    labelPosition = "top",
    baseScale = 1,
    qualityTier = "high",
}: UICardProps) => {
    const outerRef = useRef<THREE.Group>(null!);
    const innerRef = useRef<THREE.Group>(null!);
    const bodyMaterialRef = useRef<(THREE.Material & { opacity: number }) | null>(null);
    const dimmerMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

    const scaleVector = useRef(new THREE.Vector3(1, 1, 1));
    const clickTimelineRef = useRef(0);
    const signal = useSignal();

    const floatOffset = useMemo(() => seededRange(id, 1, 0, Math.PI * 2), [id]);
    const wobbleX = useMemo(() => seededRange(id, 2, 0.5, 1.2), [id]);
    const wobbleZ = useMemo(() => seededRange(id, 3, 0.3, 0.8), [id]);

    const [hovered, setHovered] = useState(false);
    const [dragging, setDragging] = useState(false);
    const lowQuality = qualityTier === "low";
    const mediumQuality = qualityTier === "medium";
    const motionScalar = lowQuality ? 0.58 : mediumQuality ? 0.78 : 1;

    const isDragging = useRef(false);
    const dragDistance = useRef(0);
    const prevPointer = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const dragRot = useRef({ x: 0, y: 0 });
    const pointerTilt = useRef({ x: 0, y: 0 });
    const pointerTiltTarget = useRef({ x: 0, y: 0 });

    const isSecondary = activeCardId !== null && activeCardId !== id;

    useEffect(() => {
        return () => {
            if (typeof document !== "undefined") document.body.style.cursor = "auto";
        };
    }, []);

    const setCursor = useCallback((cursor: string) => {
        if (typeof document !== "undefined") document.body.style.cursor = cursor;
    }, []);

    const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        isDragging.current = true;
        setDragging(true);
        dragDistance.current = 0;
        prevPointer.current = { x: e.clientX, y: e.clientY };
        velocity.current = { x: 0, y: 0 };
        const target = e.target as Element | null;
        target?.setPointerCapture?.(e.pointerId);
        onActiveCardChange(id);
        setCursor("grabbing");
    }, [id, onActiveCardChange, setCursor]);

    const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        isDragging.current = false;
        setDragging(false);
        const target = e.target as Element | null;
        target?.releasePointerCapture?.(e.pointerId);
        onActiveCardChange(null);
        if (hovered) {
            setCursor("grab");
            return;
        }
        setCursor("auto");
    }, [hovered, onActiveCardChange, setCursor]);

    const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
        if (isDragging.current) {
            e.stopPropagation();
            const dx = e.clientX - prevPointer.current.x;
            const dy = e.clientY - prevPointer.current.y;
            dragDistance.current += Math.sqrt(dx * dx + dy * dy);

            velocity.current.x = dy * 0.01;
            velocity.current.y = dx * 0.01;
            prevPointer.current = { x: e.clientX, y: e.clientY };
            return;
        }

        if (reducedMotion || lowQuality) return;

        if (e.uv) {
            pointerTiltTarget.current.x = (0.5 - e.uv.y) * 0.09;
            pointerTiltTarget.current.y = (e.uv.x - 0.5) * 0.09;
        }
    }, [lowQuality, reducedMotion]);

    const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (dragDistance.current >= 8) return;
        clickTimelineRef.current = 1;
        signal.pulseAll();
    }, [signal]);

    useFrame((state, delta) => {
        if (!outerRef.current || !innerRef.current) return;
        const t = state.clock.getElapsedTime() * speed * (reducedMotion ? 0.9 : 1) + delay;

        const targetX =
            position[0] + Math.cos(t * wobbleX + floatOffset) * (reducedMotion ? 0.13 : 0.18) * motionScalar;
        const targetY =
            position[1] +
            (Math.sin(t * 1.3 + floatOffset) * (reducedMotion ? 0.16 : 0.22) +
                Math.sin(t * 0.9) * (reducedMotion ? 0.06 : 0.1)) *
            motionScalar;
        const targetZ =
            (position[2] || 0) +
            Math.sin(t * wobbleZ) * (reducedMotion ? 0.08 : 0.12) * motionScalar +
            (isSecondary ? -0.55 : 0);

        outerRef.current.position.x = THREE.MathUtils.damp(outerRef.current.position.x, targetX, 12, delta);
        outerRef.current.position.y = THREE.MathUtils.damp(outerRef.current.position.y, targetY, 12, delta);
        outerRef.current.position.z = THREE.MathUtils.damp(outerRef.current.position.z, targetZ, 15, delta);

        pointerTilt.current.x = THREE.MathUtils.damp(pointerTilt.current.x, pointerTiltTarget.current.x, 18, delta);
        pointerTilt.current.y = THREE.MathUtils.damp(pointerTilt.current.y, pointerTiltTarget.current.y, 18, delta);

        const targetRotX = initialRotation[0] + Math.sin(t * 0.5 + floatOffset) * 0.04 + pointerTilt.current.x;
        const targetRotY = initialRotation[1] + Math.cos(t * 0.45) * 0.04 + pointerTilt.current.y + (isSecondary ? -0.04 : 0);
        const targetRotZ = Math.sin(t * 0.3 + floatOffset * 2) * 0.02;

        outerRef.current.rotation.x = THREE.MathUtils.damp(outerRef.current.rotation.x, targetRotX, 12, delta);
        outerRef.current.rotation.y = THREE.MathUtils.damp(outerRef.current.rotation.y, targetRotY, 12, delta);
        outerRef.current.rotation.z = THREE.MathUtils.damp(outerRef.current.rotation.z, targetRotZ, 15, delta);

        if (clickTimelineRef.current > 0) {
            clickTimelineRef.current = Math.max(0, clickTimelineRef.current - delta * (reducedMotion ? 1.5 : 1.1));
        }
        const clickProgress = 1 - clickTimelineRef.current;
        const pressPhase = clickProgress < 0.2 ? Math.sin((clickProgress / 0.2) * Math.PI) : 0;

        const hoverScale = hovered ? 1.06 : 1;
        const backgroundScale = isSecondary ? 0.85 : 1;
        const finalScale = (hoverScale * backgroundScale + pressPhase * 0.05) * baseScale;
        scaleVector.current.set(finalScale, finalScale, finalScale);
        outerRef.current.scale.lerp(scaleVector.current, reducedMotion || lowQuality ? 0.22 : 0.35);

        if (isDragging.current) {
            dragRot.current.x += velocity.current.x;
            dragRot.current.y += velocity.current.y;
            velocity.current.x *= 0.88;
            velocity.current.y *= 0.88;
        } else {
            velocity.current.x *= reducedMotion ? 0.8 : 0.85;
            velocity.current.y *= reducedMotion ? 0.8 : 0.85;
            velocity.current.x += (0 - dragRot.current.x) * 0.015;
            velocity.current.y += (0 - dragRot.current.y) * 0.015;

            dragRot.current.x += velocity.current.x;
            dragRot.current.y += velocity.current.y;

            dragRot.current.x = THREE.MathUtils.damp(dragRot.current.x, 0, reducedMotion ? 12.0 : 15.0, delta);
            dragRot.current.y = THREE.MathUtils.damp(dragRot.current.y, 0, reducedMotion ? 12.0 : 15.0, delta);
        }

        dragRot.current.x = Math.atan2(Math.sin(dragRot.current.x), Math.cos(dragRot.current.x));
        dragRot.current.y = Math.atan2(Math.sin(dragRot.current.y), Math.cos(dragRot.current.y));

        innerRef.current.rotation.x = dragRot.current.x;
        innerRef.current.rotation.y = dragRot.current.y;

        if (bodyMaterialRef.current) {
            bodyMaterialRef.current.opacity = THREE.MathUtils.damp(
                bodyMaterialRef.current.opacity,
                isSecondary ? 0.86 : 0.97,
                8,
                delta,
            );
        }

        if (dimmerMaterialRef.current) {
            dimmerMaterialRef.current.opacity = THREE.MathUtils.damp(
                dimmerMaterialRef.current.opacity,
                isSecondary ? 0.28 : 0,
                10,
                delta,
            );
        }


    });

    return (
        <group ref={(r) => { outerRef.current = r!; if (r) onRef(r); }}>
            <group ref={innerRef}>
                <mesh
                    position={[0, 0, 0.3]}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHovered(true);
                        onActiveCardChange(id);
                        setCursor(isDragging.current ? "grabbing" : "grab");
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        setHovered(false);
                        pointerTiltTarget.current = { x: 0, y: 0 };
                        if (!isDragging.current) setCursor("auto");
                        if (activeCardId === id) onActiveCardChange(null);
                    }}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerMove={onPointerMove}
                    onClick={onClick}
                >
                    <planeGeometry args={[4.3, 2.9]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>

                <RoundedBox
                    args={[3.8, 2.4, 0.15]}
                    radius={0.16}
                    smoothness={lowQuality ? 6 : mediumQuality ? 10 : 12}
                >
                    {lowQuality ? (
                        <meshStandardMaterial
                            ref={bodyMaterialRef}
                            color="#02040a"
                            metalness={0.28}
                            roughness={0.5}
                            transparent
                            opacity={0.9}
                            emissive="#030712"
                            emissiveIntensity={0.12}
                        />
                    ) : (
                        <meshPhysicalMaterial
                            ref={bodyMaterialRef}
                            color="#02040a"
                            metalness={mediumQuality ? 0.65 : 0.9}
                            transparent={true}
                            opacity={0.96}
                            transmission={mediumQuality ? 0.3 : 0.6}
                            thickness={mediumQuality ? 0.8 : 1.8}
                            roughness={mediumQuality ? 0.18 : 0.08}
                            ior={1.45}
                            reflectivity={mediumQuality ? 0.58 : 0.9}
                            clearcoat={mediumQuality ? 0.7 : 1}
                            clearcoatRoughness={mediumQuality ? 0.06 : 0.02}
                            envMapIntensity={mediumQuality ? 0.85 : 1.4}
                        />
                    )}
                </RoundedBox>

                <CardFrame color={color} reducedMotion={reducedMotion || lowQuality} reducedDetail={lowQuality} />


                {type === "code" && <CodeCardContent reducedDetail={lowQuality} />}
                {type === "preview" && <PreviewCardContent reducedDetail={lowQuality} />}
                {type === "flow" && <FlowCardContent baseColor={color} reducedDetail={lowQuality} />}

                <mesh position={[0, 0, 0.1]} renderOrder={4}>
                    <planeGeometry args={[3.6, 2.2]} />
                    <meshBasicMaterial ref={dimmerMaterialRef} color="#020617" transparent opacity={0} depthWrite={false} />
                </mesh>

                {title && (
                    <Html
                        position={labelPosition === "right" ? [3.0, 0, 0.15] : [0, 2.4, 0.15]}
                        center={labelPosition !== "right"}
                        distanceFactor={10}
                        zIndexRange={[100, 0]}
                        className="pointer-events-none select-none"
                        style={{
                            opacity: dragging ? 0.2 : 1,
                            pointerEvents: 'none',
                        }}
                    >
                        <div style={{ transform: labelPosition === "right" ? 'translateX(0)' : 'translateX(-50%)' }}>
                            <div style={{
                                background: `linear-gradient(145deg, rgba(8,12,28,0.95), rgba(15,23,42,0.90))`,
                                border: `1px solid ${color}55`,
                                borderRadius: '6px',
                                padding: '8px 16px 8px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '9px',
                                whiteSpace: 'nowrap' as const,
                                boxShadow: `0 0 18px ${color}15, 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
                                position: 'relative' as const,
                                overflow: 'hidden',
                            }}>
                                {/* Top accent glow line */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '1px',
                                    background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
                                }} />
                                {/* Bottom accent glow line */}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: '20%', width: '60%', height: '1px',
                                    background: `linear-gradient(90deg, transparent, ${color}22, transparent)`,
                                }} />

                                {/* Icon */}
                                <div style={{ color: color, opacity: 0.9, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                    {type === "code" && <Code2 size={13} strokeWidth={2} />}
                                    {type === "flow" && <Bot size={13} strokeWidth={2} />}
                                    {type === "preview" && <Globe size={13} strokeWidth={2} />}
                                </div>

                                {/* Title */}
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase' as const,
                                    color: 'rgba(255,255,255,0.92)',
                                }}>
                                    {title}
                                </span>

                                {/* Status dot */}
                                <div style={{
                                    width: '5px', height: '5px', borderRadius: '50%',
                                    backgroundColor: color,
                                    boxShadow: `0 0 6px ${color}, 0 0 12px ${color}66`,
                                    flexShrink: 0,
                                    animation: 'pulse 2s ease-in-out infinite',
                                }} />
                            </div>
                        </div>
                    </Html>
                )}

                <QuadraticBezierLine
                    start={labelPosition === "right" ? [1.9, 0, 0.15] : [0, 1.27, 0.15]}
                    end={labelPosition === "right" ? [3.0, 0, 0.15] : [0, 2.4, 0.15]}
                    mid={labelPosition === "right" ? [2.4, 0.25, 0.15] : [0.35, 1.85, 0.15]}
                    color={color}
                    transparent
                    opacity={0.6}
                    lineWidth={1.8}
                />

                {/* Pulse orb traveling along the bezier */}
                <PulseOrb
                    start={labelPosition === "right" ? [1.9, 0, 0.15] : [0, 1.27, 0.15]}
                    end={labelPosition === "right" ? [3.0, 0, 0.15] : [0, 2.4, 0.15]}
                    mid={labelPosition === "right" ? [2.4, 0.25, 0.15] : [0.35, 1.85, 0.15]}
                    color={color}
                />


            </group>
        </group>
    );
};

// Pulse orb that travels along a quadratic bezier curve
function PulseOrb({ start, end, mid, color }: { start: [number, number, number]; end: [number, number, number]; mid: [number, number, number]; color: string }) {
    const ref = useRef<THREE.Mesh>(null!);
    const glowRef = useRef<THREE.Mesh>(null!);
    const curve = useMemo(() => {
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3(...mid),
            new THREE.Vector3(...end)
        );
    }, [start, mid, end]);

    useFrame((state) => {
        if (!ref.current) return;
        // Faster pulse speed: 0.65 instead of 0.25
        const raw = (state.clock.getElapsedTime() * 0.65) % 2;
        const t = raw <= 1 ? raw : 2 - raw; // ping-pong 0→1→0
        const point = curve.getPoint(t);
        ref.current.position.copy(point);
        if (glowRef.current) glowRef.current.position.copy(point);
    });

    return (
        <group>
            <mesh ref={ref}>
                <sphereGeometry args={[0.03, 12, 12]} />
                <meshBasicMaterial color={color} />
                <pointLight distance={0.6} intensity={1.5} color={color} />
            </mesh>
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.09, 12, 12]} />
                <meshBasicMaterial color={color} transparent opacity={0.25} />
            </mesh>
        </group>
    );
}
