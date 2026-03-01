"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CLUSTER_CENTER } from "./OrbitingProps";

export function OrbitalRings({ radius = 4.1 }) {
    const rings = useMemo(() => {
        return [
            { rotation: [Math.PI / 2 + (8 * Math.PI / 180), 0, 0] as [number, number, number], speed: 0.1, color: "#06b6d4", key: "horizontal", customRadius: 3.8 },
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
