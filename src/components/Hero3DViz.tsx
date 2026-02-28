"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Seeded random to avoid hydration mismatch ── */
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

/* ── Code Editor Window ── */
function CodeEditor({
    position,
    scale = 1,
    speed = 1,
}: {
    position: [number, number, number];
    scale?: number;
    speed?: number;
}) {
    const ref = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() * speed;
        ref.current.rotation.x = Math.sin(t * 0.15) * 0.03;
        ref.current.rotation.y = Math.sin(t * 0.1) * 0.06;
    });

    const codeLines = [
        { width: 1.4, x: -0.15, color: "#06b6d4", glow: 0.8 },
        { width: 0.9, x: -0.4, color: "#1e293b", glow: 0.15 },
        { width: 1.6, x: -0.05, color: "#06b6d4", glow: 0.5 },
        { width: 0.7, x: -0.5, color: "#1e293b", glow: 0.1 },
        { width: 1.2, x: -0.25, color: "#3b82f6", glow: 0.6 },
    ];

    return (
        <Float speed={1.2 * speed} rotationIntensity={0.15} floatIntensity={0.6}>
            <group ref={ref} position={position} scale={scale}>
                {/* Main window body */}
                <mesh>
                    <boxGeometry args={[3.2, 2.2, 0.06]} />
                    <meshStandardMaterial color="#080810" transparent opacity={0.92} roughness={0.15} metalness={0.7} />
                </mesh>
                {/* Top bar */}
                <mesh position={[0, 0.95, 0.04]}>
                    <boxGeometry args={[3.2, 0.28, 0.01]} />
                    <meshStandardMaterial color="#0c0c18" transparent opacity={0.95} />
                </mesh>
                {/* Traffic light dots */}
                {[
                    { x: -1.3, color: "#ef4444" },
                    { x: -1.12, color: "#eab308" },
                    { x: -0.94, color: "#22c55e" },
                ].map((dot, i) => (
                    <mesh key={i} position={[dot.x, 0.95, 0.06]}>
                        <circleGeometry args={[0.05, 16]} />
                        <meshStandardMaterial color={dot.color} emissive={dot.color} emissiveIntensity={0.8} />
                    </mesh>
                ))}
                {/* Code lines */}
                {codeLines.map((line, i) => (
                    <mesh key={i} position={[line.x, 0.55 - i * 0.25, 0.04]}>
                        <boxGeometry args={[line.width, 0.065, 0.005]} />
                        <meshStandardMaterial
                            color={line.color}
                            emissive={line.color}
                            emissiveIntensity={line.glow}
                            transparent
                            opacity={0.75}
                        />
                    </mesh>
                ))}
                {/* Subtle outline glow */}
                <mesh>
                    <boxGeometry args={[3.24, 2.24, 0.07]} />
                    <meshStandardMaterial
                        color="#06b6d4"
                        wireframe
                        transparent
                        opacity={0.08}
                        emissive="#06b6d4"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            </group>
        </Float>
    );
}

/* ── Automation Gear ── */
function Gear({
    position,
    scale = 1,
    speed = 1,
}: {
    position: [number, number, number];
    scale?: number;
    speed?: number;
}) {
    const ref = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (!ref.current) return;
        ref.current.rotation.z += 0.004 * speed;
    });

    return (
        <Float speed={1.8 * speed} rotationIntensity={0.1} floatIntensity={0.8}>
            <group ref={ref} position={position} scale={scale}>
                {/* Outer ring */}
                <mesh>
                    <torusGeometry args={[0.8, 0.12, 6, 6]} />
                    <meshStandardMaterial
                        color="#06b6d4"
                        wireframe
                        transparent
                        opacity={0.35}
                        emissive="#06b6d4"
                        emissiveIntensity={0.5}
                    />
                </mesh>
                {/* Inner hub */}
                <mesh>
                    <circleGeometry args={[0.3, 6]} />
                    <meshStandardMaterial
                        color="#06b6d4"
                        transparent
                        opacity={0.12}
                        emissive="#06b6d4"
                        emissiveIntensity={0.3}
                    />
                </mesh>
                {/* Spokes */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <mesh key={i} position={[Math.cos(rad) * 0.5, Math.sin(rad) * 0.5, 0]} rotation={[0, 0, rad]}>
                            <boxGeometry args={[0.4, 0.04, 0.02]} />
                            <meshStandardMaterial color="#06b6d4" transparent opacity={0.2} emissive="#06b6d4" emissiveIntensity={0.3} />
                        </mesh>
                    );
                })}
            </group>
        </Float>
    );
}

/* ── WhatsApp Chat Bubble ── */
function ChatBubble({
    position,
    scale = 1,
    speed = 1,
}: {
    position: [number, number, number];
    scale?: number;
    speed?: number;
}) {
    const ref = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() * speed;
        ref.current.rotation.y = Math.sin(t * 0.2) * 0.08;
        ref.current.rotation.x = Math.sin(t * 0.15) * 0.03;
    });

    return (
        <Float speed={2 * speed} rotationIntensity={0.08} floatIntensity={1.2}>
            <group ref={ref} position={position} scale={scale}>
                {/* Bubble body - rounded box */}
                <mesh>
                    <boxGeometry args={[1.4, 0.7, 0.04]} />
                    <meshStandardMaterial color="#0a1a0f" transparent opacity={0.85} roughness={0.2} metalness={0.5} />
                </mesh>
                {/* Green border */}
                <mesh>
                    <boxGeometry args={[1.44, 0.74, 0.05]} />
                    <meshStandardMaterial
                        color="#22c55e"
                        wireframe
                        transparent
                        opacity={0.25}
                        emissive="#22c55e"
                        emissiveIntensity={0.4}
                    />
                </mesh>
                {/* Message lines */}
                <mesh position={[-0.15, 0.1, 0.03]}>
                    <boxGeometry args={[0.7, 0.05, 0.005]} />
                    <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.7} transparent opacity={0.6} />
                </mesh>
                <mesh position={[0.05, -0.1, 0.03]}>
                    <boxGeometry args={[0.9, 0.05, 0.005]} />
                    <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.4} transparent opacity={0.35} />
                </mesh>
            </group>
        </Float>
    );
}

/* ── Floating Particles (seeded) ── */
function Particles({ count = 25 }: { count?: number }) {
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (seededRandom(i + 42) - 0.5) * 8;
        }
        return arr;
    }, [count]);

    const ref = useRef<THREE.Points>(null!);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#06b6d4" transparent opacity={0.4} sizeAttenuation />
        </points>
    );
}

/* ── Scene ── */
function Scene() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight position={[2, 4, 3]} intensity={0.3} />
            <pointLight position={[-2, 1, 3]} intensity={0.5} color="#06b6d4" />
            <pointLight position={[2, -1, -1]} intensity={0.2} color="#3b82f6" />
            <pointLight position={[-1, -2, 2]} intensity={0.15} color="#22c55e" />

            {/* Central code editor — main focal point, sharp */}
            <CodeEditor position={[0, 0.1, 0]} scale={0.85} speed={0.5} />

            {/* Gear — upper right, slightly behind (smaller = further) */}
            <Gear position={[2.2, 1.4, -0.8]} scale={0.55} speed={0.7} />

            {/* Small gear — top left, further back (blurrier via smaller scale) */}
            <Gear position={[-1.8, 1.6, -1.2]} scale={0.3} speed={1.2} />

            {/* Chat bubble — lower right, closer */}
            <ChatBubble position={[1.8, -1.5, 0.3]} scale={0.7} speed={0.6} />

            {/* Particles */}
            <Particles count={25} />
        </>
    );
}

/* ── Export ── */
export default function Hero3DViz() {
    return (
        <div className="w-full h-[420px] lg:h-[520px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-blue-500/[0.02] rounded-3xl blur-xl pointer-events-none"></div>

            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 50 }}
                style={{ background: "transparent" }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
