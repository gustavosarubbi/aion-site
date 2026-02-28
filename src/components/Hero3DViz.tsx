"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, PerspectiveCamera, Stars, Edges, Environment } from "@react-three/drei";
import * as THREE from "three";

const CLUSTER_CENTER = new THREE.Vector3(4.5, 0, 0);

/* ── Orbiting Props (Web Design Themed) ── */
function OrbitingProps({ radius = 4.2, speed = 0.12, count = 11 }) {
    const groupRef = useRef<THREE.Group>(null!);
    const props = useMemo(() => {
        const types = ["octahedron", "dodecahedron", "tetrahedron", "octahedron", "dodecahedron", "tetrahedron", "octahedron", "dodecahedron", "tetrahedron", "octahedron", "dodecahedron"];
        const colors = ["#06b6d4", "#3b82f6", "#a855f7", "#0ea5e9", "#8b5cf6", "#06b6d4", "#3b82f6", "#a855f7", "#0ea5e9", "#8b5cf6", "#22d3ee"];
        return [...Array(count)].map((_, i) => ({
            phase: (i / count) * Math.PI * 2,
            offset: Math.random() * Math.PI,
            size: 0.12 + Math.random() * 0.14,
            type: types[i % types.length],
            color: colors[i % colors.length],
            speedMult: 0.6 + Math.random() * 0.6,
            wobble: Math.random() * 0.5
        }));
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (!groupRef.current) return;
        groupRef.current.children.forEach((child, i) => {
            const p = props[i];
            const angle = t * p.speedMult + p.phase;
            child.position.x = CLUSTER_CENTER.x + Math.cos(angle) * (radius + Math.sin(t * 0.3 + p.wobble) * 0.8);
            child.position.z = CLUSTER_CENTER.z + Math.sin(angle) * radius * 0.7;
            child.position.y = CLUSTER_CENTER.y + Math.sin(t * 0.5 + p.offset) * 2.0;
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
            // Horizontal ring (tilted up 8deg)
            { rotation: [Math.PI / 2 + (8 * Math.PI / 180), 0, 0] as [number, number, number], speed: 0.1, color: "#06b6d4", key: "horizontal", customRadius: 4.5 },
            // Vertical ring (shifted slightly left)
            { rotation: [0, Math.PI / 2, 0] as [number, number, number], speed: 0.15, color: "#3b82f6", key: "vertical", customRadius: 3.5, offsetX: -0.8 }
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
            {/* Dashed ring segments */}
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

/* ── UICard (True Black & Sharp Lines) ── */
const UICard = ({ position, initialRotation, color = "#06b6d4", type = "code", delay = 0, onRef, speed = 0.1 }: any) => {
    const localRef = useRef<THREE.Group>(null!);
    const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
    const wobbleX = useMemo(() => 0.5 + Math.random() * 0.7, []);
    const wobbleZ = useMemo(() => 0.3 + Math.random() * 0.5, []);

    useFrame((state) => {
        if (!localRef.current) return;
        const t = state.clock.getElapsedTime() * speed + delay;
        // Organic float
        localRef.current.position.y = position[1] + Math.sin(t * 1.3 + floatOffset) * 0.22 + Math.sin(t * 0.9) * 0.1;
        localRef.current.position.x = position[0] + Math.cos(t * wobbleX + floatOffset) * 0.18;
        localRef.current.position.z = (position[2] || 0) + Math.sin(t * wobbleZ) * 0.12;
        localRef.current.rotation.x = initialRotation[0] + Math.sin(t * 0.5 + floatOffset) * 0.04;
        localRef.current.rotation.y = initialRotation[1] + Math.cos(t * 0.45) * 0.04;
        localRef.current.rotation.z = Math.sin(t * 0.3 + floatOffset * 2) * 0.02;
    });

    return (
        <group ref={(ref) => { localRef.current = ref!; if (ref) onRef(ref); }} position={position} rotation={initialRotation}>
            {/* Main Card Body (Premium Glass - Original Metallic Reference) */}
            <RoundedBox args={[3.8, 2.4, 0.1]} radius={0.12} smoothness={10}>
                <meshPhysicalMaterial
                    color="#0a1020"
                    metalness={0.9}
                    roughness={0.05}
                    transparent
                    opacity={0.9}
                    reflectivity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>

            {/* Border Beam Logic (Wireframe glow + Clean Edges) */}
            <RoundedBox args={[3.84, 2.44, 0.11]} radius={0.13} smoothness={10}>
                <meshStandardMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.15}
                    emissive={color}
                    emissiveIntensity={0.8}
                />
                <Edges color={color} threshold={15} />
            </RoundedBox>

            {/* Header Bar - High Contrast Bright Frosted Glass */}
            <mesh position={[0, 0.95, 0.051]}>
                <planeGeometry args={[3.5, 0.35]} />
                <meshPhysicalMaterial
                    color="#94a3b8"
                    metalness={0.4}
                    roughness={0.2}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Window buttons */}
            {[-1.5, -1.3, -1.1].map((x, i) => (
                <mesh key={i} position={[x, 0.95, 0.06]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial
                        color={["#ff5f57", "#febc2e", "#28c840"][i]}
                        emissive={["#ff5f57", "#febc2e", "#28c840"][i]}
                        emissiveIntensity={1.2}
                    />
                </mesh>
            ))}

            <mesh position={[0.4, 0.95, 0.06]}>
                <boxGeometry args={[1.2, 0.04, 0.02]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
            </mesh>

            {/* Type specific content */}
            {type === "code" && (
                <group position={[-1.2, 0.3, 0.07]}>
                    {/* Line numbers gutter */}
                    {[...Array(7)].map((_, i) => (
                        <mesh key={`ln${i}`} position={[-0.15, -i * 0.22, 0]}>
                            <boxGeometry args={[0.12, 0.04, 0.04]} />
                            <meshStandardMaterial color="#94a3b8" emissive="#94a3b8" emissiveIntensity={0.8} />
                        </mesh>
                    ))}
                    {/* Simulated Code Lines */}
                    {[
                        { w: 1.2, color: "#f43f5e", indent: 0 },
                        { w: 0.8, color: "#67e8f9", indent: 0.2 },
                        { w: 1.8, color: "#fbbf24", indent: 0.2 },
                        { w: 1.4, color: "#67e8f9", indent: 0.4 },
                        { w: 0.6, color: "#c084fc", indent: 0.4 },
                        { w: 1.0, color: "#67e8f9", indent: 0.2 },
                        { w: 0.5, color: "#f43f5e", indent: 0 },
                    ].map((line, i) => (
                        <mesh key={i} position={[line.w / 2 + line.indent + 0.1, -i * 0.22, 0]}>
                            <boxGeometry args={[line.w, 0.06, 0.04]} />
                            <meshStandardMaterial
                                color={line.color}
                                emissive={line.color}
                                emissiveIntensity={1.5}
                            />
                        </mesh>
                    ))}
                    {/* Cursor blink line */}
                    <mesh position={[0.55, -1 * 0.22, 0.01]}>
                        <boxGeometry args={[0.02, 0.12, 0.04]} />
                        <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={2} />
                    </mesh>
                </group>
            )}

            {type === "preview" && (
                <group position={[0, -0.1, 0.07]}>
                    {/* URL Bar */}
                    <mesh position={[0, 0.55, 0]}>
                        <boxGeometry args={[2.6, 0.12, 0.04]} />
                        <meshPhysicalMaterial color="#475569" metalness={0.3} roughness={0.3} />
                    </mesh>
                    {/* URL dot */}
                    <mesh position={[-1.1, 0.55, 0.02]}>
                        <circleGeometry args={[0.03, 16]} />
                        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2} />
                    </mesh>

                    {/* Sidebar Navigation */}
                    <mesh position={[-1.45, -0.05, 0]}>
                        <boxGeometry args={[0.3, 1.0, 0.04]} />
                        <meshPhysicalMaterial color="#475569" metalness={0.2} roughness={0.4} transparent opacity={0.8} />
                    </mesh>
                    {/* Sidebar nav items */}
                    {[0.25, 0.05, -0.15, -0.35].map((y, i) => (
                        <mesh key={i} position={[-1.45, y, 0.02]}>
                            <boxGeometry args={[0.18, 0.06, 0.04]} />
                            <meshStandardMaterial color={i === 0 ? "#22d3ee" : "#cbd5e1"} emissive={i === 0 ? "#22d3ee" : "#cbd5e1"} emissiveIntensity={i === 0 ? 2 : 0.8} />
                        </mesh>
                    ))}

                    {/* Main content area - Hero image placeholder */}
                    <mesh position={[0.15, 0.2, 0]}>
                        <boxGeometry args={[2.2, 0.5, 0.04]} />
                        <meshPhysicalMaterial color="#334155" metalness={0.4} roughness={0.3} transparent opacity={0.7} />
                    </mesh>
                    {/* Play button on hero */}
                    <mesh position={[0.15, 0.2, 0.03]}>
                        <circleGeometry args={[0.14, 32]} />
                        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.4} emissive="#e2e8f0" emissiveIntensity={0.8} />
                    </mesh>
                    <mesh position={[0.17, 0.2, 0.04]} rotation={[0, 0, -Math.PI / 2]}>
                        <cylinderGeometry args={[0.07, 0.07, 0.02, 3]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.5} />
                    </mesh>

                    {/* Content cards grid */}
                    {[-0.55, 0.15, 0.85].map((x, i) => (
                        <group key={i} position={[x, -0.4, 0]}>
                            <mesh>
                                <boxGeometry args={[0.6, 0.35, 0.04]} />
                                <meshPhysicalMaterial color="#475569" metalness={0.2} roughness={0.5} transparent opacity={0.7} />
                            </mesh>
                            {/* Card accent line */}
                            <mesh position={[0, 0.13, 0.01]}>
                                <boxGeometry args={[0.5, 0.025, 0.04]} />
                                <meshStandardMaterial color={["#22d3ee", "#c084fc", "#34d399"][i]} emissive={["#22d3ee", "#c084fc", "#34d399"][i]} emissiveIntensity={1.5} />
                            </mesh>
                            {/* Card text lines */}
                            <mesh position={[0, 0, 0.01]}>
                                <boxGeometry args={[0.4, 0.04, 0.04]} />
                                <meshStandardMaterial color="#cbd5e1" emissive="#cbd5e1" emissiveIntensity={0.7} />
                            </mesh>
                            <mesh position={[-0.05, -0.08, 0.01]}>
                                <boxGeometry args={[0.3, 0.03, 0.04]} />
                                <meshStandardMaterial color="#94a3b8" emissive="#94a3b8" emissiveIntensity={0.5} />
                            </mesh>
                        </group>
                    ))}
                </group>
            )}

            {type === "flow" && (
                <group position={[0, -0.3, 0.07]}>
                    {/* 3D Bar Chart Base Line */}
                    <mesh position={[0, -0.2, 0]}>
                        <boxGeometry args={[2.8, 0.04, 0.04]} />
                        <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
                    </mesh>
                    {/* Axis label ticks */}
                    {[-1.0, -0.4, 0.2, 0.8].map((x, i) => (
                        <mesh key={`tick${i}`} position={[x, -0.28, 0]}>
                            <boxGeometry args={[0.02, 0.08, 0.02]} />
                            <meshStandardMaterial color="#64748b" transparent opacity={0.6} />
                        </mesh>
                    ))}

                    {/* 3D Bars */}
                    {[
                        { x: -1.0, h: 0.8, color: "#38bdf8" },
                        { x: -0.4, h: 1.4, color: "#0ea5e9" },
                        { x: 0.2, h: 0.6, color: "#3b82f6" },
                        { x: 0.8, h: 1.8, color: "#0ea5e9" },
                    ].map((bar, i) => (
                        <group key={i} position={[bar.x, -0.2 + bar.h / 2, 0.02]}>
                            {/* Main Bar */}
                            <mesh>
                                <boxGeometry args={[0.3, bar.h, 0.06]} />
                                <meshPhysicalMaterial color={bar.color} metalness={0.4} roughness={0.2} clearcoat={1} transmission={0.2} />
                            </mesh>
                            {/* Glowing Top Cap */}
                            <mesh position={[0, bar.h / 2, 0.01]}>
                                <boxGeometry args={[0.3, 0.04, 0.08]} />
                                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
                            </mesh>
                        </group>
                    ))}
                    {/* Trend line connecting tops */}
                    <mesh position={[-0.1, 0.55, 0.04]} rotation={[0, 0, 0.25]}>
                        <boxGeometry args={[2.0, 0.015, 0.02]} />
                        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} transparent opacity={0.5} />
                    </mesh>
                </group>
            )}
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

            {/* Main Content Cluster (Centered) */}
            <group position={[CLUSTER_CENTER.x, CLUSTER_CENTER.y, CLUSTER_CENTER.z]} rotation={[0, -0.1, 0]}>
                {/* Background Card (Code) - pushed further back and up */}
                <UICard
                    position={[-1.5, 1.4, -4.0]}
                    initialRotation={[-0.1, -0.5, 0.1]}
                    color="#3b82f6"
                    type="code"
                    title="API_Config.ts"
                    onRef={onCardReady}
                    speed={0.14}
                    delay={1}
                />

                {/* Middle Card (Flow) - offset to the right */}
                <UICard
                    position={[2.0, -0.15, -1.8]}
                    initialRotation={[0.05, 0.3, -0.05]}
                    color="#06b6d4"
                    type="flow"
                    title="Automation_Flow"
                    delay={2}
                    onRef={onCardReady}
                    speed={0.16}
                />

                {/* Foreground Card (Preview) - closer to camera */}
                <UICard
                    position={[-1.3, -1.5, 1.5]}
                    initialRotation={[-0.05, -0.1, 0.02]}
                    color="#ffffff"
                    type="preview"
                    title="Live_Preview"
                    delay={0}
                    onRef={onCardReady}
                    speed={0.12}
                />
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
            {/* Focal Glow */}
            <div className="absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="w-full h-full absolute inset-0 overflow-visible">
                <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
