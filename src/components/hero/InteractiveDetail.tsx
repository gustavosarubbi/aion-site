"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSignal } from "./SignalContext";

export function InteractiveDetail({
    children,
    decay = 0.095,
    offsetMs = 0,
}: {
    children: (pulse: number) => React.ReactNode;
    decay?: number;
    offsetMs?: number;
}) {
    const [pulse, setPulse] = useState(0);
    const pulseRef = useRef(0);
    const renderedPulseRef = useRef(0);
    const timeoutRef = useRef<number | null>(null);
    const randomLagRef = useRef(Math.random() * 26);
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
        if (Math.abs(next - renderedPulseRef.current) > 0.02 || next < 0.01) {
            renderedPulseRef.current = next;
            setPulse(next < 0.01 ? 0 : next);
        }
    });

    return (
        <group
            onClick={(e) => {
                triggerPulse(1);
                signal.pulseAll();
            }}
        >
            {children(pulse)}
        </group>
    );
}
