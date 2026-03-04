"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";

export function CardFrame({
    color,
    reducedMotion = false,
    reducedDetail = false,
}: {
    color: string;
    reducedMotion?: boolean;
    reducedDetail?: boolean;
}) {
    const gridRef = useRef<THREE.Mesh>(null!);
    const borderMatRef = useRef<THREE.MeshStandardMaterial>(null!);

    useFrame((state) => {
        if (reducedMotion) return;

        if (gridRef.current) {
            gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    return (
        <group>
            {/* Premium Volumetric Glass Border - Sharp & Minimal */}
            <group scale={1.005}>
                {/* Main Volumetric Shell */}
                <RoundedBox args={[3.94, 2.54, 0.13]} radius={0.18} smoothness={reducedDetail ? 8 : 12}>
                    <meshStandardMaterial
                        ref={borderMatRef}
                        color={color}
                        transparent
                        opacity={0.24}
                        emissive={color}
                        emissiveIntensity={0.6}
                        metalness={1}
                        roughness={0.1}
                    />
                    <Edges color={color} threshold={15} lineWidth={1.8} />
                </RoundedBox>

                {/* Exterior Light Catching Edge - Razor Thin */}
                {!reducedDetail && (
                    <group scale={1.007}>
                        <Edges color={color} threshold={10} lineWidth={1.0} />
                    </group>
                )}
            </group>

            {/* Premium Grid Pattern Surface */}
            <mesh ref={gridRef} position={[0, 0, 0.045]}>
                <planeGeometry args={[3.8, 2.4]} />
                <meshStandardMaterial
                    color="#000000"
                    transparent
                    opacity={0.4}
                    roughness={1}
                />
                {/* Micro-grid effect using Edges or a simple repetition could be here, 
                    but we'll use a nested mesh for simplicity in this structure */}
                <mesh position={[0, 0, 0.001]}>
                    <planeGeometry args={[3.7, 2.3]} />
                    <meshStandardMaterial
                        color={color}
                        transparent
                        opacity={0.03}
                        wireframe
                        wireframeLinewidth={0.5}
                    />
                </mesh>
            </mesh>

            {/* Header Area */}
            <group position={[0, 0.98, 0.08]} renderOrder={10}>
                <mesh>
                    <planeGeometry args={[3.6, 0.3]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.03} metalness={1} roughness={0} />
                </mesh>
                <mesh position={[0, -0.15, 0.001]}>
                    <planeGeometry args={[3.6, 0.01]} />
                    <meshBasicMaterial color={color} transparent opacity={0.14} />
                </mesh>
            </group>

            {/* Window Buttons */}
            {(["#67e8f9", "#38bdf8", "#60a5fa"] as const).map((c, i) => (
                <mesh key={i} position={[-1.5 + i * 0.2, 0.95, 0.075]}>
                    <sphereGeometry args={[0.055, reducedDetail ? 10 : 16, reducedDetail ? 10 : 16]} />
                    <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} />
                </mesh>
            ))}
            <mesh position={[0.4, 0.95, 0.07]}>
                <boxGeometry args={[1.2, 0.04, 0.02]} />
                <meshStandardMaterial color="#9ca3af" emissive="#52525b" emissiveIntensity={0.15} transparent opacity={0.42} />
            </mesh>

            {/* Technical Detail: Scanner Line / Pulse */}
            <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[3.6, 0.02]} />
                <meshBasicMaterial color={color} transparent opacity={0.06} />
            </mesh>
        </group>
    );
}
