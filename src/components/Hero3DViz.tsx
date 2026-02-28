"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── UI Card Component ── */
function UICard({
    position,
    rotation,
    color = "#ffffff",
    title = "Interface",
    type = "code",
    delay = 0,
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    color?: string;
    title?: string;
    type?: "code" | "preview" | "flow";
    delay?: number;
}) {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() + delay;
        groupRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.15;
        groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.05;
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={groupRef} position={position} rotation={rotation}>
                {/* Main Card Body (Premium Glass) */}
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

                {/* Border Beam Logic (Animated) */}
                <RoundedBox args={[3.84, 2.44, 0.11]} radius={0.13} smoothness={10}>
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        transparent
                        opacity={0.15}
                        emissive={color}
                        emissiveIntensity={0.8}
                    />
                </RoundedBox>

                {/* Header Bar */}
                <mesh position={[0, 0.95, 0.06]}>
                    <planeGeometry args={[3.5, 0.35]} />
                    <meshStandardMaterial color="#02040a" transparent opacity={0.8} />
                </mesh>

                {/* Window buttons */}
                {[-1.5, -1.3, -1.1].map((x, i) => (
                    <mesh key={i} position={[x, 0.95, 0.07]}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial
                            color={["#ff5f57", "#febc2e", "#28c840"][i]}
                            emissive={["#ff5f57", "#febc2e", "#28c840"][i]}
                            emissiveIntensity={1.2}
                        />
                    </mesh>
                ))}

                <mesh position={[0.4, 0.95, 0.07]}>
                    <planeGeometry args={[1.2, 0.04]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
                </mesh>

                {/* Type specific content */}
                {type === "code" && (
                    <group position={[-1.4, 0.4, 0.07]}>
                        {[1.2, 0.8, 1.8, 0.6, 1.4, 1.0, 0.5, 1.6].map((w, i) => (
                            <mesh key={i} position={[w / 2, -i * 0.2, 0]}>
                                <planeGeometry args={[w, 0.05]} />
                                <meshStandardMaterial
                                    color={i % 4 === 0 ? color : "#1e40af"}
                                    emissive={i % 4 === 0 ? color : "#1e40af"}
                                    emissiveIntensity={i % 4 === 0 ? 1 : 0.2}
                                    transparent
                                    opacity={0.8}
                                />
                            </mesh>
                        ))}
                    </group>
                )}

                {type === "preview" && (
                    <group position={[0, -0.2, 0.07]}>
                        <mesh position={[0, 0.5, 0]}>
                            <planeGeometry args={[2.5, 0.4]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                        </mesh>
                        <mesh position={[0, -0.1, 0]}>
                            <planeGeometry args={[2.5, 0.6]} />
                            <meshStandardMaterial color="#0f172a" transparent opacity={0.9} />
                        </mesh>
                        <mesh position={[-0.8, -0.1, 0.01]}>
                            <planeGeometry args={[0.6, 0.3]} />
                            <meshStandardMaterial color={color} transparent opacity={0.2} />
                        </mesh>
                        <mesh position={[0, -0.1, 0.01]}>
                            <planeGeometry args={[0.6, 0.3]} />
                            <meshStandardMaterial color={color} transparent opacity={0.2} />
                        </mesh>
                        <mesh position={[0.8, -0.1, 0.01]}>
                            <planeGeometry args={[0.6, 0.3]} />
                            <meshStandardMaterial color={color} transparent opacity={0.2} />
                        </mesh>
                    </group>
                )}

                {type === "flow" && (
                    <group position={[0, -0.1, 0.07]}>
                        <mesh position={[-1.2, 0, 0]}>
                            <boxGeometry args={[0.6, 0.6, 0.02]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
                        </mesh>
                        <mesh position={[1.2, 0, 0]}>
                            <boxGeometry args={[0.6, 0.6, 0.02]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
                        </mesh>
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[1.8, 0.01]} />
                            <meshStandardMaterial color={color} transparent opacity={0.4} />
                        </mesh>
                        <mesh position={[0, 0.5, 0]}>
                            <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
                            <meshStandardMaterial color={color} transparent opacity={0.2} />
                        </mesh>
                    </group>
                )}
            </group>
        </Float>
    );
}

/* ── Scene ── */
function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3b82f6" />
            <Environment preset="night" />

            <group position={[0.5, 0, 0]} rotation={[0, -0.1, 0]}>
                {/* Background Card */}
                <UICard
                    position={[-1.5, 1.2, -4]}
                    rotation={[-0.1, -0.5, 0.1]}
                    color="#3b82f6"
                    type="code"
                    title="API_Config.ts"
                    delay={1}
                />

                {/* Middle Card */}
                <UICard
                    position={[2, -0.2, -2]}
                    rotation={[0.05, 0.3, -0.05]}
                    color="#06b6d4"
                    type="flow"
                    title="Automation_Flow"
                    delay={2}
                />

                {/* Foreground Card */}
                <UICard
                    position={[-1.8, -1.8, 1]}
                    rotation={[-0.05, -0.1, 0.02]}
                    color="#ffffff"
                    type="preview"
                    title="Live_Preview"
                    delay={0}
                />
            </group>

            {/* Ambient Nebula Particles */}
            <group>
                {[...Array(40)].map((_, i) => (
                    <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10]}>
                        <sphereGeometry args={[0.02, 6, 6]} />
                        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={4} transparent opacity={0.4} />
                    </mesh>
                ))}
            </group>
        </>
    );
}

export default function Hero3DViz() {
    return (
        <div className="w-full h-full relative pointer-events-none select-none overflow-visible">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] rounded-full blur-[120px]" />

            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
                style={{ background: "transparent", pointerEvents: "none" }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
