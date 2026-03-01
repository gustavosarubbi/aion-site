"use client";

import { RoundedBox, Edges } from "@react-three/drei";

export function CardFrame({ color }: { color: string }) {
    return (
        <group>
            {/* Glowing Border Frame */}
            <group scale={1.002}>
                <RoundedBox args={[3.94, 2.54, 0.13]} radius={0.18} smoothness={12}>
                    <meshStandardMaterial color={color} transparent opacity={0.15} emissive={color} emissiveIntensity={0.6} metalness={1} roughness={0} />
                    <Edges color={color} threshold={15} />
                    <group scale={1.005}>
                        <Edges color={color} threshold={10} />
                    </group>
                </RoundedBox>
            </group>

            {/* Header Area */}
            <group position={[0, 0.98, 0.08]} renderOrder={10}>
                <mesh>
                    <planeGeometry args={[3.6, 0.3]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.03} metalness={1} roughness={0} />
                </mesh>
                <mesh position={[0, -0.15, 0.001]}>
                    <planeGeometry args={[3.6, 0.01]} />
                    <meshBasicMaterial color={color} transparent opacity={0.2} />
                </mesh>
            </group>

            {/* Window Buttons */}
            {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c, i) => (
                <mesh key={i} position={[-1.5 + i * 0.2, 0.95, 0.075]}>
                    <sphereGeometry args={[0.055, 16, 16]} />
                    <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} />
                </mesh>
            ))}
            <mesh position={[0.4, 0.95, 0.07]}>
                <boxGeometry args={[1.2, 0.04, 0.02]} />
                <meshStandardMaterial color="#9ca3af" emissive="#52525b" emissiveIntensity={0.15} transparent opacity={0.42} />
            </mesh>
        </group>
    );
}
