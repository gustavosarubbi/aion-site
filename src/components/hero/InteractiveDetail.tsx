"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSignal } from "./SignalContext";

export function InteractiveDetail({
    children,
    decay = 0.095,
    offsetMs = 0,
    reducedDetail = false,
}: {
    children: (pulse: number) => React.ReactNode;
    decay?: number;
    offsetMs?: number;
    reducedDetail?: boolean;
}) {
    const [pulse, setPulse] = useState(0);
    const pulseRef = useRef(0);
    const renderedPulseRef = useRef(0);
    const lastRenderAtRef = useRef(0);
    const timeoutRef = useRef<number | null>(null);
    const randomLagRef = useRef(((offsetMs * 17 + 11) % 26));
    const signal = useSignal();

    const triggerPulse = useCallback((strength: number) => {
        const next = Math.max(pulseRef.current, strength);
        pulseRef.current = next;
        renderedPulseRef.current = next;
        setPulse(next);
    }, []);

    useEffect(() => {
        const unsub = signal.onPulse(() => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                triggerPulse(0.82);
            }, offsetMs + randomLagRef.current);
        });
        return unsub;
    }, [offsetMs, signal, triggerPulse]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    useFrame((_, delta) => {
        if (pulseRef.current <= 0) return;
        const next = THREE.MathUtils.damp(pulseRef.current, 0, decay * 38, delta);
        pulseRef.current = next;
        const now = performance.now();
        const minRenderGapMs = reducedDetail ? 64 : 32;
        const canRender = now - lastRenderAtRef.current >= minRenderGapMs;

        if (((Math.abs(next - renderedPulseRef.current) > 0.02) && canRender) || next < 0.01) {
            renderedPulseRef.current = next;
            setPulse(next < 0.01 ? 0 : next);
            lastRenderAtRef.current = now;
        }
    });

    return (
        <group
            onClick={() => {
                triggerPulse(1);
                signal.pulseAll();
            }}
        >
            {children(pulse)}
        </group>
    );
}
