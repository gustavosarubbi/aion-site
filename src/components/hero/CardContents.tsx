"use client";

import { InteractiveDetail } from "./InteractiveDetail";

export function CodeCardContent() {
    return (
        <group position={[-1.2, 0.5, 0.15]}>
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
                <InteractiveDetail key={i} offsetMs={i * 34}>
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

export function PreviewCardContent() {
    return (
        <group position={[0, -0.1, 0.15]}>
            {/* Main Content Area / Hero Section Mockup */}
            <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[3.0, 0.6, 0.04]} />
                <meshPhysicalMaterial color="#1e293b" metalness={0.4} roughness={0.2} transparent opacity={0.6} />
            </mesh>

            <InteractiveDetail offsetMs={18}>
                {(pulse) => (
                    <group position={[-0.8, 0.45, 0.03]}>
                        <mesh>
                            <boxGeometry args={[1.0 + pulse * 0.1, 0.12, 0.01]} />
                            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5 + pulse * 4} />
                        </mesh>
                        <mesh position={[0, -0.18, 0]}>
                            <boxGeometry args={[0.8, 0.06, 0.01]} />
                            <meshStandardMaterial color="#94a3b8" transparent opacity={0.8} />
                        </mesh>
                    </group>
                )}
            </InteractiveDetail>

            {/* Sidebar / Navigation Mockup */}
            <mesh position={[-1.25, -0.35, 0]}>
                <boxGeometry args={[0.5, 0.8, 0.04]} />
                <meshPhysicalMaterial color="#334155" metalness={0.2} roughness={0.4} transparent opacity={0.4} />
            </mesh>
            {[0, -0.2, -0.4].map((y, i) => (
                <mesh key={i} position={[-1.25, y, 0.03]}>
                    <boxGeometry args={[0.3, 0.04, 0.01]} />
                    <meshStandardMaterial color={i === 0 ? "#38bdf8" : "#64748b"} />
                </mesh>
            ))}

            {/* Content Cards Mockup */}
            {[0.2, 1.0].map((x, i) => (
                <InteractiveDetail key={i} offsetMs={i * 40 + 60}>
                    {(pulse) => (
                        <group position={[x, -0.3, 0.02]}>
                            <mesh>
                                <boxGeometry args={[0.7, 0.9, 0.04]} />
                                <meshPhysicalMaterial color="#1e293b" metalness={0.3} roughness={0.3} transparent opacity={0.8} />
                            </mesh>
                            <mesh position={[0, 0.25, 0.025 + pulse * 0.04]}>
                                <circleGeometry args={[0.12, 32]} />
                                <meshStandardMaterial color={i === 0 ? "#818cf8" : "#34d399"} emissive={i === 0 ? "#818cf8" : "#34d399"} emissiveIntensity={0.8 + pulse * 5} />
                            </mesh>
                            <mesh position={[0, -0.1, 0.02]}>
                                <boxGeometry args={[0.5, 0.04, 0.01]} />
                                <meshStandardMaterial color="#94a3b8" />
                            </mesh>
                            <mesh position={[0, -0.25, 0.02]}>
                                <boxGeometry args={[0.4, 0.03, 0.01]} />
                                <meshStandardMaterial color="#64748b" />
                            </mesh>
                        </group>
                    )}
                </InteractiveDetail>
            ))}
        </group>
    );
}

export function FlowCardContent({ baseColor }: { baseColor: string }) {
    return (
        <group position={[0, -0.4, 0.15]}>
            <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[2.8, 0.04, 0.04]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
            </mesh>
            {[
                { x: -1.0, h: 0.6, color: "#38bdf8" },
                { x: -0.4, h: 0.9, color: "#0ea5e9" },
                { x: 0.2, h: 0.4, color: "#3b82f6" },
                { x: 0.8, h: 1.1, color: "#0ea5e9" },
            ].map((bar, i) => (
                <InteractiveDetail key={i} offsetMs={i * 36 + 24}>
                    {(pulse) => (
                        <group position={[bar.x, -0.2 + (bar.h + pulse * 0.25) / 2, 0.02]}>
                            <mesh>
                                <boxGeometry args={[0.3, bar.h + pulse * 0.25, 0.06]} />
                                <meshPhysicalMaterial color={bar.color} metalness={0.4} roughness={0.2} emissive={bar.color} emissiveIntensity={pulse * 4} clearcoat={1} transmission={0.2} />
                            </mesh>
                            <mesh position={[0, (bar.h + pulse * 0.25) / 2, 0.01]}>
                                <boxGeometry args={[0.3 + pulse * 0.1, 0.05, 0.08]} />
                                <meshStandardMaterial color={baseColor} emissive={baseColor} emissiveIntensity={2 + pulse * 7} />
                            </mesh>
                        </group>
                    )}
                </InteractiveDetail>
            ))}

            <InteractiveDetail offsetMs={200}>
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
