"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TechConnection({ startRef, endRef, color }: { startRef: RefObject<THREE.Group | null>; endRef: RefObject<THREE.Group | null>; color: string }) {
    const lineRef = useRef<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> | null>(null);
    const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null>(null);
    const startPosRef = useRef(new THREE.Vector3());
    const endPosRef = useRef(new THREE.Vector3());
    const midPointRef = useRef(new THREE.Vector3());
    const curveRef = useRef(new THREE.QuadraticBezierCurve3(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()));

    useFrame(() => {
        if (!startRef.current || !endRef.current || !lineRef.current) return;

        const startPos = startPosRef.current;
        const endPos = endPosRef.current;
        startRef.current.getWorldPosition(startPos);
        endRef.current.getWorldPosition(endPos);

        const midPoint = midPointRef.current;
        midPoint.lerpVectors(startPos, endPos, 0.5);
        midPoint.y += 0.5;

        const curve = curveRef.current;
        curve.v0.copy(startPos);
        curve.v1.copy(midPoint);
        curve.v2.copy(endPos);
        const points = curve.getPoints(32);

        const geometry = lineRef.current.geometry;
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
            <line
                ref={(node) => {
                    lineRef.current = node as unknown as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
                }}
            >
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
