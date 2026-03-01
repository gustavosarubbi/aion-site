"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CLUSTER_CENTER = new THREE.Vector3(4.5, 0, 0);

export function OrbitingProps({ radius = 4.2, speed = 0.12, count = 14 }) {
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
