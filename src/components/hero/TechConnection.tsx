"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TechConnection({ startRef, endRef, color }: { startRef: React.RefObject<THREE.Group>, endRef: React.RefObject<THREE.Group>, color: string }) {
    const lineRef = useRef<THREE.Line>(null!);
    const pointsRef = useRef<THREE.Points>(null!);

    useFrame(() => {
        if (!startRef.current || !endRef.current || !lineRef.current) return;

        const startPos = new THREE.Vector3();
        const endPos = new THREE.Vector3();
        startRef.current.getWorldPosition(startPos);
        endRef.current.getWorldPosition(endPos);

        const midPoint = new THREE.Vector3().lerpVectors(startPos, endPos, 0.5);
        midPoint.y += 0.5; // Curved effect

        const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
        const points = curve.getPoints(32);

        const geometry = lineRef.current.geometry as THREE.BufferGeometry;
        const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        if (pointsRef.current) {
            const pointsGeo = pointsRef.current.geometry as THREE.BufferGeometry;
            const nodePositions = new Float32Array([startPos.x, startPos.y, startPos.z, endPos.x, endPos.y, endPos.z]);
            pointsGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        }
    });

    return (
        <group>
            <line ref={lineRef as any}>
                <bufferGeometry />
                <lineBasicMaterial color={color} transparent opacity={0.65} blending={THREE.AdditiveBlending} />
            </line>
            <points ref={pointsRef}>
                <bufferGeometry />
                <pointsMaterial color={color} size={0.16} transparent opacity={1} blending={THREE.AdditiveBlending} />
            </points>
            <line>
                <bufferGeometry />
                <lineBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </line>
        </group>
    );
}
