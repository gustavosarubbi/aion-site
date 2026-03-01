"use client";

import { useRef, useMemo, useState, useEffect, Suspense, createContext, useContext, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, PerspectiveCamera, Stars, Edges, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

const CLUSTER_CENTER = new THREE.Vector3(4.5, 0, 0);

/* ── Global Signal Bus ── */
type SignalBus = {
    pulseAll: () => void;
    onPulse: (cb: () => void) => () => void;
};
const SignalContext = createContext<SignalBus | null>(null);

function SignalProvider({ children }: { children: React.ReactNode }) {
    const listenersRef = useRef<Set<() => void>>(new Set());
    const pulseAll = useCallback(() => { listenersRef.current.forEach(cb => cb()); }, []);
    const onPulse = useCallback((cb: () => void) => { listenersRef.current.add(cb); return () => listenersRef.current.delete(cb); }, []);
    return <SignalContext.Provider value={{ pulseAll, onPulse }}>{children}</SignalContext.Provider>;
}
function useSignal() { return useContext(SignalContext)!; }

/* ── Orbiting Props (Web Design Themed) ── */
function OrbitingProps({ radius = 4.2, speed = 0.12, count = 14 }) {
    const groupRef = useRef<THREE.Group>(null!);
    const props = useMemo(() => {
        const types = ["octahedron", "dodecahedron", "tetrahedron"];
        const colors = ["#06b6d4", "#3b82f6", "#a855f7", "#0ea5e9", "#8b5cf6", "#22d3ee"];
        return [...Array(count)].map((_, i) => ({
            phase: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 1.2,
            offset: Math.random() * Math.PI * 2,
            size: 0.12 + Math.random() * 0.14,
            type: types[i % types.length],
            color: colors[i % colors.length],
            speedMult: 0.4 + Math.random() * 0.8,
            wobble: Math.random() * 1.5,
            orbitRadius: radius * (0.7 + Math.random() * 0.6)
        }));
    }, [count, radius]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (!groupRef.current) return;
        groupRef.current.children.forEach((child, i) => {
            const p = props[i];
            const angle = t * p.speedMult + p.phase;
            child.position.x = CLUSTER_CENTER.x + Math.cos(angle) * (p.orbitRadius + Math.sin(t * 0.3 + p.wobble) * 0.8);
            child.position.z = CLUSTER_CENTER.z + Math.sin(angle) * p.orbitRadius * 0.7;
            child.position.y = CLUSTER_CENTER.y + Math.sin(t * 0.5 + p.offset) * 2.5;
            child.rotation.x += 0.015;
            child.rotation.y += 0.012;
            child.rotation.z += 0.008;
        });
    });

    return (
        <group ref={groupRef}>
            {props.map((p, i) => (
                <mesh key={i}>
                    {p.type === "octahedron" && <octahedronGeometry args={[p.size, 0]} />}
                    {p.type === "dodecahedron" && <dodecahedronGeometry args={[p.size, 0]} />}
                    {p.type === "tetrahedron" && <tetrahedronGeometry args={[p.size, 0]} />}
                    <meshBasicMaterial color={p.color} wireframe transparent opacity={0.35} />
                </mesh>
            ))}
        </group>
    );
}

/* ── Orbital Rings (Solid & Glowing) ── */
function OrbitalRings({ radius = 4.1 }) {
    const rings = useMemo(() => {
        return [
            { rotation: [Math.PI / 2 + (8 * Math.PI / 180), 0, 0] as [number, number, number], speed: 0.1, color: "#06b6d4", key: "horizontal", customRadius: 4.5 },
            { rotation: [0, Math.PI / 2, 0] as [number, number, number], speed: 0.15, color: "#3b82f6", key: "vertical", customRadius: 3.5, offsetX: 0 }
        ];
    }, []);

    return (
        <group position={CLUSTER_CENTER}>
            {rings.map((ring) => {
                const { key, customRadius, offsetX, ...rest } = ring as any;
                return (
                    <group key={key} position={[offsetX || 0, 0, 0]}>
                        <RingElement {...rest} radius={customRadius} />
                    </group>
                );
            })}
        </group>
    );
}

function RingElement({ radius, rotation, speed, color }: any) {
    const ref = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    });

    return (
        <group ref={ref} rotation={rotation}>
            {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const segLen = 0.8;
                return (
                    <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
                        <boxGeometry args={[segLen, 0.015, 0.015]} />
                        <meshBasicMaterial color={color} transparent opacity={i % 3 === 0 ? 0.5 : 0.15} />
                    </mesh>
                );
            })}
        </group>
    );
}

/* ── Interactive Detail ── */
function InteractiveDetail({ children }: { children: (pulse: number) => React.ReactNode }) {
    const [pulse, setPulse] = useState(0);
    const signal = useSignal();
    const { gl } = useThree();

    useEffect(() => {
        const unsub = signal.onPulse(() => {
            setPulse(p => Math.min(p + 0.5, 1));
        });
        return unsub;
    }, [signal]);

    useFrame(() => {
        if (pulse > 0) setPulse(p => Math.max(0, p - 0.08));
    });

    return (
        <group
            onClick={(e) => {
                e.stopPropagation();
                setPulse(1);
                signal.pulseAll();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                gl.domElement.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
                gl.domElement.style.cursor = "auto";
            }}
        >
            {children(pulse)}
        </group>
    );
}

/* ── Card Content Components ── */
function CodeCardContent() {
    return (
        <group position={[-1.2, 0.3, 0.15]}>
            <mesh position={[-0.15, -0.66, 0]}>
                <boxGeometry args={[0.08, 1.6, 0.04]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.15} />
            </mesh>
            {[...Array(7)].map((_, i) => (
                <mesh key={`ln${i}`} position={[-0.15, -i * 0.22, 0]}>
                    <boxGeometry args={[0.06, 0.04, 0.04]} />
                    <meshStandardMaterial color="#94a3b8" emissive="#94a3b8" emissiveIntensity={0.8} />
                </mesh>
            ))}
            {[
                { w: 1.2, color: "#f43f5e", indent: 0 },
                { w: 0.8, color: "#67e8f9", indent: 0.2 },
                { w: 1.8, color: "#fbbf24", indent: 0.2 },
                { w: 1.4, color: "#67e8f9", indent: 0.4 },
                { w: 0.6, color: "#c084fc", indent: 0.4 },
                { w: 1.0, color: "#67e8f9", indent: 0.2 },
                { w: 0.5, color: "#f43f5e", indent: 0 },
            ].map((line, i) => (
                <InteractiveDetail key={i}>
                    {(pulse) => (
                        <mesh position={[line.w / 2 + line.indent + 0.1, -i * 0.22, 0]}>
                            <boxGeometry args={[line.w, 0.06 + pulse * 0.08, 0.04 + pulse * 0.05]} />
                            <meshStandardMaterial color={line.color} emissive={line.color} emissiveIntensity={1.5 + pulse * 6} />
                        </mesh>
                    )}
                </InteractiveDetail>
            ))}
            <mesh position={[0.55, -1 * 0.22, 0.01]}>
                <boxGeometry args={[0.02, 0.12, 0.04]} />
                <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

function PreviewCardContent() {
    return (
        <group position={[0, -0.1, 0.15]}>
            <mesh position={[0, 0.55, 0]}>
                <boxGeometry args={[2.6, 0.12, 0.04]} />
                <meshPhysicalMaterial color="#475569" metalness={0.3} roughness={0.3} />
            </mesh>
            <InteractiveDetail>
                {(pulse) => (
                    <mesh position={[-1.1, 0.55, 0.025 + pulse * 0.06]}>
                        <circleGeometry args={[0.03 + pulse * 0.02, 16]} />
                        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2 + pulse * 5} />
                    </mesh>
                )}
            </InteractiveDetail>

            <mesh position={[-1.45, -0.05, 0]}>
                <boxGeometry args={[0.3, 1.0, 0.04]} />
                <meshPhysicalMaterial color="#475569" metalness={0.2} roughness={0.4} transparent opacity={0.8} />
            </mesh>
            {[0.25, 0.05, -0.15, -0.35].map((y, i) => (
                <InteractiveDetail key={i}>
                    {(pulse) => (
                        <mesh position={[-1.45, y, 0.025 + pulse * 0.04]}>
                            <boxGeometry args={[0.18 + pulse * 0.08, 0.06, 0.04]} />
                            <meshStandardMaterial
                                color={i === 0 ? "#22d3ee" : "#cbd5e1"}
                                emissive={i === 0 ? "#22d3ee" : "#cbd5e1"}
                                emissiveIntensity={i === 0 ? 2 + pulse * 5 : 0.8 + pulse * 4}
                            />
                        </mesh>
                    )}
                </InteractiveDetail>
            ))}
            <mesh position={[0.15, 0.2, 0]}>
                <boxGeometry args={[2.2, 0.5, 0.04]} />
                <meshPhysicalMaterial color="#334155" metalness={0.4} roughness={0.3} transparent opacity={0.7} />
            </mesh>
            <InteractiveDetail>
                {(pulse) => (
                    <group position={[0.15, 0.2, 0.04]}>
                        <mesh>
                            <circleGeometry args={[0.14 + pulse * 0.05, 32]} />
                            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.4 + pulse * 0.5} emissive="#e2e8f0" emissiveIntensity={0.8 + pulse * 4} />
                        </mesh>
                        <mesh position={[0.02, 0, 0.015]} rotation={[0, 0, -Math.PI / 2]}>
                            <cylinderGeometry args={[0.07 + pulse * 0.02, 0.07 + pulse * 0.02, 0.015, 3]} />
                            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.5 + pulse * 7} />
                        </mesh>
                    </group>
                )}
            </InteractiveDetail>
            {[-0.55, 0.15, 0.85].map((x, i) => (
                <InteractiveDetail key={`b${i}`}>
                    {(pulse) => (
                        <group position={[x, -0.4, pulse * 0.06]}>
                            <mesh>
                                <boxGeometry args={[0.6, 0.35, 0.04]} />
                                <meshPhysicalMaterial color="#475569" metalness={0.2} roughness={0.5} transparent opacity={0.7} />
                            </mesh>
                            <mesh position={[0, 0.13, 0.01]}>
                                <boxGeometry args={[0.5, 0.025, 0.04]} />
                                <meshStandardMaterial color={["#22d3ee", "#c084fc", "#34d399"][i]} emissive={["#22d3ee", "#c084fc", "#34d399"][i]} emissiveIntensity={1.5 + pulse * 4} />
                            </mesh>
                            <mesh position={[0, 0, 0.01]}>
                                <boxGeometry args={[0.4, 0.04, 0.04]} />
                                <meshStandardMaterial color="#cbd5e1" emissive="#cbd5e1" emissiveIntensity={0.7} />
                            </mesh>
                        </group>
                    )}
                </InteractiveDetail>
            ))}
        </group>
    );
}

function FlowCardContent({ baseColor }: { baseColor: string }) {
    return (
        <group position={[0, -0.3, 0.15]}>
            <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[2.8, 0.04, 0.04]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
            </mesh>
            {[
                { x: -1.0, h: 0.8, color: "#38bdf8" },
                { x: -0.4, h: 1.4, color: "#0ea5e9" },
                { x: 0.2, h: 0.6, color: "#3b82f6" },
                { x: 0.8, h: 1.8, color: "#0ea5e9" },
            ].map((bar, i) => (
                <InteractiveDetail key={i}>
                    {(pulse) => (
                        <group position={[bar.x, -0.2 + (bar.h + pulse * 0.4) / 2, 0.02]}>
                            <mesh>
                                <boxGeometry args={[0.3, bar.h + pulse * 0.4, 0.06]} />
                                <meshPhysicalMaterial color={bar.color} metalness={0.4} roughness={0.2} emissive={bar.color} emissiveIntensity={pulse * 4} clearcoat={1} transmission={0.2} />
                            </mesh>
                            <mesh position={[0, (bar.h + pulse * 0.4) / 2, 0.01]}>
                                <boxGeometry args={[0.3 + pulse * 0.1, 0.05, 0.08]} />
                                <meshStandardMaterial color={baseColor} emissive={baseColor} emissiveIntensity={2 + pulse * 7} />
                            </mesh>
                        </group>
                    )}
                </InteractiveDetail>
            ))}

            <InteractiveDetail>
                {(pulse) => (
                    <mesh position={[-0.1, 0.55, 0.04 + pulse * 0.06]} rotation={[0, 0, 0.25]}>
                        <boxGeometry args={[2.0, 0.015 + pulse * 0.03, 0.02]} />
                        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1 + pulse * 5} transparent opacity={0.5 + pulse * 0.5} />
                    </mesh>
                )}
            </InteractiveDetail>
        </group>
    );
}

/* ── Card Frame (Visuals only) ── */
function CardFrame({ color }: { color: string }) {
    return (
        <group>
            {/* Glowing Border Frame */}
            <group scale={1.002}>
                <RoundedBox args={[3.94, 2.54, 0.11]} radius={0.14} smoothness={10}>
                    <meshStandardMaterial color={color} transparent opacity={0.25} emissive={color} emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
                    <Edges color={color} threshold={15} />
                    <group scale={1.01}>
                        <Edges color={color} threshold={15} />
                    </group>
                </RoundedBox>
            </group>

            {/* Header Area */}
            <mesh position={[0, 0.95, 0.065]}>
                <planeGeometry args={[3.5, 0.35]} />
                <meshPhysicalMaterial color="#94a3b8" metalness={0.6} roughness={0.2} transparent opacity={0.4} />
            </mesh>

            {/* Window Buttons */}
            {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c, i) => (
                <mesh key={i} position={[-1.5 + i * 0.2, 0.95, 0.075]}>
                    <sphereGeometry args={[0.055, 16, 16]} />
                    <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} />
                </mesh>
            ))}
            <mesh position={[0.4, 0.95, 0.07]}>
                <boxGeometry args={[1.2, 0.04, 0.02]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.4} />
            </mesh>
        </group>
    );
}

/* ── UICard (Redesigned Interactions) ── */
const UICard = ({ position, initialRotation, color = "#06b6d4", type = "code", delay = 0, onRef, speed = 0.1, title, description }: any) => {
    const outerRef = useRef<THREE.Group>(null!);
    const innerRef = useRef<THREE.Group>(null!);

    const { gl } = useThree();

    const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
    const wobbleX = useMemo(() => 0.5 + Math.random() * 0.7, []);
    const wobbleZ = useMemo(() => 0.3 + Math.random() * 0.5, []);

    const [hovered, setHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clickPulse, setClickPulse] = useState(0);

    const isDragging = useRef(false);
    const dragDistance = useRef(0);
    const prevPointer = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const dragRot = useRef({ x: 0, y: 0 });

    const onPointerDown = useCallback((e: any) => {
        e.stopPropagation();
        isDragging.current = true;
        dragDistance.current = 0;
        prevPointer.current = { x: e.clientX, y: e.clientY };
        velocity.current = { x: 0, y: 0 };
        try { e.target.setPointerCapture(e.pointerId); } catch (err) { }
        gl.domElement.style.cursor = "grabbing";
    }, [gl]);

    const onPointerUp = useCallback((e: any) => {
        e.stopPropagation();
        isDragging.current = false;
        try { e.target.releasePointerCapture(e.pointerId); } catch (err) { }
        gl.domElement.style.cursor = hovered ? "grab" : "auto";
    }, [gl, hovered]);

    const onPointerMove = useCallback((e: any) => {
        if (!isDragging.current) return;
        e.stopPropagation();
        const dx = e.clientX - prevPointer.current.x;
        const dy = e.clientY - prevPointer.current.y;
        dragDistance.current += Math.sqrt(dx * dx + dy * dy);

        velocity.current.x = dy * 0.008;
        velocity.current.y = dx * 0.008;
        prevPointer.current = { x: e.clientX, y: e.clientY };
    }, []);

    const onClick = useCallback((e: any) => {
        e.stopPropagation();
        if (dragDistance.current < 5) {
            setIsOpen(true);
            setClickPulse(1);
        }
    }, []);

    useFrame((state) => {
        if (!outerRef.current || !innerRef.current) return;
        const t = state.clock.getElapsedTime() * speed + delay;

        // 1. Outer group: Ambient Float (Position)
        outerRef.current.position.y = position[1] + Math.sin(t * 1.3 + floatOffset) * 0.22 + Math.sin(t * 0.9) * 0.1;
        outerRef.current.position.x = position[0] + Math.cos(t * wobbleX + floatOffset) * 0.18;
        outerRef.current.position.z = (position[2] || 0) + Math.sin(t * wobbleZ) * 0.12;

        // Outer group: Ambient Wobble (Rotation) + Hover Tilt
        const targetRotX = initialRotation[0] + Math.sin(t * 0.5 + floatOffset) * 0.04 + (hovered ? 0.12 : 0);
        const targetRotY = initialRotation[1] + Math.cos(t * 0.45) * 0.04 + (hovered ? 0.12 : 0);
        outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, targetRotX, 0.08);
        outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, targetRotY, 0.08);
        outerRef.current.rotation.z = THREE.MathUtils.lerp(outerRef.current.rotation.z, Math.sin(t * 0.3 + floatOffset * 2) * 0.02, 0.1);

        // Scale Effects (Hover + Click Pulse)
        if (clickPulse > 0) setClickPulse(p => Math.max(0, p - 0.05));
        const s = hovered ? 1.06 : 1.0;
        const finalScale = s + clickPulse * 0.15;
        outerRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), 0.1);

        // 2. Inner group: User Drag Physics
        if (isDragging.current) {
            dragRot.current.x += velocity.current.x;
            dragRot.current.y += velocity.current.y;
            // Clear velocity so rotation stops exactly when mouse stops
            velocity.current.x = 0;
            velocity.current.y = 0;
        } else {
            // Spring dynamics: Magnetic pull back to (0,0)
            velocity.current.x *= 0.85;
            velocity.current.y *= 0.85;

            // Atração magnética para o centro
            velocity.current.x += (0 - dragRot.current.x) * 0.012;
            velocity.current.y += (0 - dragRot.current.y) * 0.012;

            dragRot.current.x += velocity.current.x;
            dragRot.current.y += velocity.current.y;

            // Smoothlerp final rest para não vibrar (jitter)
            dragRot.current.x = THREE.MathUtils.lerp(dragRot.current.x, 0, 0.04);
            dragRot.current.y = THREE.MathUtils.lerp(dragRot.current.y, 0, 0.04);
        }

        innerRef.current.rotation.x = dragRot.current.x;
        innerRef.current.rotation.y = dragRot.current.y;
    });

    return (
        <group ref={(r) => { outerRef.current = r!; if (r) onRef(r); }}>
            <group ref={innerRef}>
                {/* 
                  🌟 PREMIUM DARK GLASS BODY & UNIFIED HITBOX 🌟
                  This RoundedBox is the main card body AND the interaction surface.
                */}
                <RoundedBox
                    args={[3.8, 2.4, 0.12]}
                    radius={0.12}
                    smoothness={10}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); gl.domElement.style.cursor = isDragging.current ? "grabbing" : "grab"; }}
                    onPointerOut={(e) => { setHovered(false); if (!isDragging.current) gl.domElement.style.cursor = "auto"; }}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerMove={onPointerMove}
                    onClick={onClick}
                >
                    <meshPhysicalMaterial
                        color="#020617"
                        metalness={0.9}
                        roughness={0.15}
                        transparent
                        opacity={0.97}
                        reflectivity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </RoundedBox>

                <CardFrame color={color} />

                {type === "code" && <CodeCardContent />}
                {type === "preview" && <PreviewCardContent />}
                {type === "flow" && <FlowCardContent baseColor={color} />}

                {/* --- HTML TOOLTIP --- */}
                {title && (
                    <Html
                        position={[0, 1.6, 0.1]}
                        center
                        distanceFactor={10}
                        zIndexRange={[100, 0]}
                        className="pointer-events-none transition-all duration-300 transform"
                        style={{
                            opacity: hovered && !isOpen && !isDragging.current ? 1 : 0,
                            transform: `scale(${hovered && !isOpen && !isDragging.current ? 1 : 0.8})`
                        }}
                    >
                        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}></div>
                            {title}
                        </div>
                    </Html>
                )}

                {/* --- HTML DETAILS PANEL --- */}
                {title && description && (
                    <Html
                        position={isOpen ? [0, 0, 1.2] : [0, 0, 0.1]}
                        center
                        distanceFactor={10}
                        zIndexRange={[100, 0]}
                        className={`transition-all duration-[600ms] origin-center ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8 pointer-events-none'}`}
                    >
                        {isOpen && (
                            <div className="w-[320px] bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 text-left text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-auto">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}></span>
                                    {title}
                                </h3>
                                <p className="text-[15px] text-slate-300 leading-relaxed mb-6 font-medium">
                                    {description}
                                </p>
                                <div className="border-t border-slate-800/80 pt-4 flex justify-end">
                                    <button
                                        onPointerDown={(e) => { e.stopPropagation(); }}
                                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                        className="text-sm px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors font-semibold cursor-pointer text-white shadow-sm pointer-events-auto"
                                    >
                                        Fechar Detalhes
                                    </button>
                                </div>
                            </div>
                        )}
                    </Html>
                )}

            </group>
        </group>
    );
};

/* ── Scene ── */
function Scene() {
    const cardRefs = useRef<THREE.Group[]>([]);
    const onCardReady = (ref: THREE.Group) => {
        if (ref && !cardRefs.current.includes(ref)) cardRefs.current.push(ref);
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={28} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3b82f6" />
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={300} factor={4} saturation={0} fade speed={0.2} />

            <OrbitalRings radius={3.2} />
            <OrbitingProps count={6} radius={3.6} />

            <group position={[CLUSTER_CENTER.x, CLUSTER_CENTER.y, CLUSTER_CENTER.z]} rotation={[0, -0.1, 0]}>
                <UICard
                    position={[-1.5, 1.4, -4.0]} initialRotation={[-0.1, -0.5, 0.1]}
                    color="#3b82f6" type="code" title="Integração de APIs" description="Sistema arquitetado para alta coesão e baixo acoplamento. Integrar microserviços em nossa plataforma requer poucas linhas de código mantendo extrema segurança."
                    onRef={onCardReady} speed={0.14} delay={1} />
                <UICard
                    position={[2.0, -0.15, -1.8]} initialRotation={[0.05, 0.3, -0.05]}
                    color="#06b6d4" type="flow" title="Fluxo de Automação" description="Engenharia de dados intuitiva. Conecte processos, defina triggers (gatilhos) e deixe que nosso sistema execute fluxos de trabalho massivos instantaneamente."
                    onRef={onCardReady} speed={0.16} delay={2} />
                <UICard
                    position={[-1.3, -1.5, 1.5]} initialRotation={[-0.05, -0.1, 0.02]}
                    color="#ffffff" type="preview" title="Renderização Imediata" description="Engine 3D e interfaces de alta performance construídas diretamente em cima do WebGL e React, gerando previews fotorealistas sem latência."
                    onRef={onCardReady} speed={0.12} delay={0} />
            </group>
        </>
    );
}

export default function Hero3DViz() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-full h-full" />;

    return (
        <div className="w-full h-full relative overflow-visible flex items-center justify-center">
            <div className="absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="w-full h-full absolute inset-0 overflow-visible">
                <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
                    <Suspense fallback={null}>
                        <SignalProvider>
                            <Scene />
                        </SignalProvider>
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
