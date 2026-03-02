"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CLUSTER_CENTER = new THREE.Vector3(4.5, 0, 0);

function seededUnit(index: number, channel: number) {
    const x = Math.sin((index + 1) * 12.9898 + (channel + 1) * 78.233) * 43758.5453;
    return x - Math.floor(x);
}

export function OrbitingProps({
    radius = 5.0,
    speed = 0.15,
    count = 12,
    reducedMotion = false,
}: {
    radius?: number;
    speed?: number;
    count?: number;
    reducedMotion?: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null!);
    const props = useMemo(() => {
        const types = ["octahedron", "dodecahedron", "tetrahedron"];
        const colors = ["#06b6d4", "#3b82f6", "#a855f7", "#0ea5e9", "#8b5cf6", "#22d3ee"];
        return [...Array(count)].map((_, i) => ({
            phase: (i / count) * Math.PI * 2 + (seededUnit(i, 1) - 0.5) * 0.5,
            offset: (i / count) * Math.PI * 2 + seededUnit(i, 2) * 0.6,
            size: 0.08 + seededUnit(i, 3) * 0.10,
            type: types[i % types.length],
            color: colors[i % colors.length],
            speedMult: 0.3 + (i % 4) * 0.2 + seededUnit(i, 4) * 0.3,
            wobble: seededUnit(i, 5) * 1.2,
            orbitRadius: radius * (0.75 + (i % 3) * 0.12 + seededUnit(i, 6) * 0.1),
            vertDir: i % 2 === 0 ? 1 : -1,
        }));
    }, [count, radius]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (!groupRef.current) return;
        groupRef.current.children.forEach((child, i) => {
            const p = props[i];
            const angle = t * p.speedMult + p.phase;
            child.position.x = CLUSTER_CENTER.x + Math.cos(angle) * p.orbitRadius;
            child.position.z = CLUSTER_CENTER.z + Math.sin(angle) * p.orbitRadius * 0.65;
            child.position.y = CLUSTER_CENTER.y + Math.sin(t * 0.35 + p.offset) * 2.2 * p.vertDir;
            if (!reducedMotion) {
                child.rotation.x += 0.012;
                child.rotation.y += 0.009;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {props.map((p, i) => (
                <mesh key={i}>
                    {p.type === "octahedron" && <octahedronGeometry args={[p.size, 0]} />}
                    {p.type === "dodecahedron" && <dodecahedronGeometry args={[p.size, 0]} />}
                    {p.type === "tetrahedron" && <tetrahedronGeometry args={[p.size, 0]} />}
                    <meshBasicMaterial color={p.color} wireframe transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    );
}
