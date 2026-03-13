"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Html, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { Code2, Bot, Globe } from "lucide-react";
import { useSignal } from "./SignalContext";
import { CardFrame } from "./CardFrame";
import { CodeCardContent, PreviewCardContent, FlowCardContent } from "./CardContents";

function hashSeed(seed: string, channel: number) {
    let hash = 2166136261 ^ channel;

    for (let i = 0; i < seed.length; i += 1) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
}

function seededRange(seed: string, channel: number, min: number, max: number) {
    return min + hashSeed(seed, channel) * (max - min);
}

export type CardType = "code" | "flow" | "preview";

export type UICardProps = {
  id: string;
  position: [number, number, number];
  initialRotation: [number, number, number];
  color?: string;
  type?: CardType;
  delay?: number;
  onRef: (ref: THREE.Group) => void;
  speed?: number;
  title?: string;
  activeCardId: string | null;
  onActiveCardChange: (id: string | null) => void;
  draggingCardId: string | null;
  onDraggingCardChange: (id: string | null) => void;
  reducedMotion: boolean;
  labelPosition?: "top" | "right" | "bottom" | "left";
  labelOffset?: [number, number, number];
  labelConnector?: {
    start: [number, number, number];
    mid: [number, number, number];
    end: [number, number, number];
  };
  labelScale?: number;
  labelCompact?: boolean;
  labelDistanceFactor?: number;
  baseScale?: number;
  qualityTier?: "high" | "medium" | "low";
  showConnector?: boolean;
  onAnyCardDraggingChange?: (isDragging: boolean) => void;
  mobileOptimized?: boolean;
  sceneAnimating?: boolean;
};

export const UICard = ({
    id,
    position,
    initialRotation,
    color = "#06b6d4",
    type = "code",
    delay = 0,
    onRef,
    speed = 0.1,
    title,
    activeCardId,
    onActiveCardChange,
    draggingCardId,
    onDraggingCardChange,
    reducedMotion,
    labelPosition = "top",
    labelOffset,
    labelConnector,
    labelScale = 1,
    labelCompact = false,
    labelDistanceFactor = 10,
    baseScale = 1,
  qualityTier = "high",
  showConnector = true,
  mobileOptimized = false,
  sceneAnimating = true,
}: UICardProps) => {
  const outerRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Group>(null!);
  const bodyMaterialRef = useRef<(THREE.Material & { opacity: number }) | null>(null);

  const scaleVector = useRef(new THREE.Vector3(1, 1, 1));
  const clickTimelineRef = useRef(0);
  const signal = useSignal();

  // Smart Gesture Detection System
  type GestureMode = 'undecided' | 'scroll' | 'drag';
  const GESTURE_THRESHOLD = 15; // pixels to determine direction
  const gestureMode = useRef<GestureMode>('undecided');
  const gestureStartPos = useRef({ x: 0, y: 0 });
  const gestureDistance = useRef(0);
  const hasTriggeredHaptic = useRef(false);
  const lastPointerMoveAtRef = useRef(0);
  const lastFrameAtRef = useRef(0);
  const currentCursorRef = useRef<string>("auto");

    const floatOffset = useMemo(() => seededRange(id, 1, 0, Math.PI * 2), [id]);
    const wobbleX = useMemo(() => seededRange(id, 2, 0.5, 1.2), [id]);
    const wobbleZ = useMemo(() => seededRange(id, 3, 0.3, 0.8), [id]);

    const [hovered, setHovered] = useState(false);
    const [dragging, setDragging] = useState(false);
    const lowQuality = qualityTier === "low";
    const mediumQuality = qualityTier === "medium";
    const motionScalar = lowQuality ? 0.58 : mediumQuality ? 0.78 : 1;
    const shouldRunConnectorPulse = sceneAnimating && !reducedMotion && (hovered || activeCardId === id || dragging);
    const shouldAnimateCardDetails = sceneAnimating && !reducedMotion && (hovered || activeCardId === id || dragging);

    const isDragging = useRef(false);
    const dragDistance = useRef(0);
    const prevPointer = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const dragRot = useRef({ x: 0, y: 0 });
    const pointerTilt = useRef({ x: 0, y: 0 });
    const pointerTiltTarget = useRef({ x: 0, y: 0 });

    const isSecondary = activeCardId !== null && activeCardId !== id;

    const defaultLabelOffset: [number, number, number] =
        labelPosition === "right" ? [2.72, 0, 0.15] : labelPosition === "bottom" ? [0, -2.4, 0.15] : [0, 2.4, 0.15];
    const resolvedLabelOffset = labelOffset ?? defaultLabelOffset;

    const defaultConnector =
        labelPosition === "right"
            ? {
                start: [1.78, 0, 0.15] as [number, number, number],
                end: [2.72, 0, 0.15] as [number, number, number],
                mid: [2.24, 0.23, 0.15] as [number, number, number],
            }
            : {
                start: [0, 1.27, 0.15] as [number, number, number],
                end: [0, 2.4, 0.15] as [number, number, number],
                mid: [0.35, 1.85, 0.15] as [number, number, number],
            };

    const resolvedConnector = labelConnector ?? defaultConnector;
    const compactPadding = labelCompact ? "7px 14px 7px 12px" : "9px 17px 9px 15px";
    const compactGap = labelCompact ? "8px" : "10px";
    const compactFontSize = labelCompact ? "11px" : "12px";
    const compactTracking = labelCompact ? "0.11em" : "0.13em";
    const compactDot = labelCompact ? "5px" : "6px";

    // We now use precision CSS anchoring, so the 3D connector touches exactly the `end` point,
    // and the HTML label offsets itself away from this point automatically.
    const connectorMid: [number, number, number] = resolvedConnector.mid;
    const connectorEnd: [number, number, number] = resolvedConnector.end;

    const getLabelAnchorStyles = (): React.CSSProperties => {
        const gap = "0px";
        const base: React.CSSProperties = {
            position: 'absolute',
            transform: `scale(${labelScale})`,
            transition: 'transform 0.3s ease-out',
        };
        switch (labelPosition) {
            case "right":
                return { ...base, left: gap, top: '50%', transform: `translateY(-50%) scale(${labelScale})`, transformOrigin: "left center" };
            case "left":
                return { ...base, right: gap, top: '50%', transform: `translateY(-50%) scale(${labelScale})`, transformOrigin: "right center" };
            case "top":
                return { ...base, bottom: gap, left: '50%', transform: `translateX(-50%) scale(${labelScale})`, transformOrigin: "bottom center" };
            case "bottom":
                return { ...base, top: gap, left: '50%', transform: `translateX(-50%) scale(${labelScale})`, transformOrigin: "top center" };
            default:
                return base;
        }
    };

    useEffect(() => {
        return () => {
            if (typeof document !== "undefined") document.body.style.cursor = "auto";
        };
    }, []);

const setCursor = useCallback((cursor: string) => {
    if (currentCursorRef.current === cursor) return;
    currentCursorRef.current = cursor;
    if (typeof document !== "undefined") document.body.style.cursor = cursor;
  }, []);

  // Haptic feedback for premium UX
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

const releaseDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    gestureMode.current = 'undecided';
    setDragging(false);
    onActiveCardChange(null);
    onDraggingCardChange(null);
  }, [onActiveCardChange, onDraggingCardChange]);

  useEffect(() => {
    if (sceneAnimating) return;

    const resetFrame = window.requestAnimationFrame(() => {
      releaseDrag();
      setHovered(false);
      pointerTilt.current = { x: 0, y: 0 };
      pointerTiltTarget.current = { x: 0, y: 0 };
      velocity.current = { x: 0, y: 0 };
      dragRot.current = { x: 0, y: 0 };
      dragDistance.current = 0;
      gestureDistance.current = 0;
      gestureMode.current = 'undecided';
      hasTriggeredHaptic.current = false;
      if (activeCardId === id) {
        onActiveCardChange(null);
      }
      setCursor("auto");
    });

    return () => {
      window.cancelAnimationFrame(resetFrame);
    };
  }, [sceneAnimating, activeCardId, id, onActiveCardChange, releaseDrag, setCursor]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScrollRelease = () => {
      if (!isDragging.current) return;
      releaseDrag();
      setHovered(false);
      pointerTiltTarget.current = { x: 0, y: 0 };
      setCursor("auto");
    };

    window.addEventListener("scroll", handleScrollRelease, { passive: true });
    window.addEventListener("pointerup", handleScrollRelease, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollRelease);
      window.removeEventListener("pointerup", handleScrollRelease);
    };
  }, [releaseDrag, setCursor]);

const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!sceneAnimating) return;
    e.stopPropagation();
    
    // Initialize gesture detection (mobile only)
    gestureMode.current = mobileOptimized ? 'undecided' : 'drag';
    gestureStartPos.current = { x: e.clientX, y: e.clientY };
    gestureDistance.current = 0;
    hasTriggeredHaptic.current = false;
    dragDistance.current = 0;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    
    const target = e.target as Element | null;
    target?.setPointerCapture?.(e.pointerId);
    onActiveCardChange(id);
    
    // On desktop: start dragging immediately (old behavior)
    // On mobile: wait for gesture detection
    if (!mobileOptimized) {
      isDragging.current = true;
      setDragging(true);
      onDraggingCardChange(id);
      setCursor("grabbing");
    }
  }, [id, sceneAnimating, onActiveCardChange, onDraggingCardChange, setCursor, mobileOptimized]);

const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const target = e.target as Element | null;
    target?.releasePointerCapture?.(e.pointerId);
    
    // Premium haptic feedback on release
    if (isDragging.current) {
      triggerHaptic(5);
    }
    
    // Only reset drag state if we were actually dragging
    if (isDragging.current) {
      releaseDrag();
    }
    
    // Reset gesture mode
    gestureMode.current = 'undecided';
    
    // Set cursor based on hover state
    if (hovered) {
      setCursor("grab");
      return;
    }
    setCursor("auto");
  }, [hovered, releaseDrag, setCursor, triggerHaptic]);

    const onPointerCancel = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        const target = e.target as Element | null;
        target?.releasePointerCapture?.(e.pointerId);
        releaseDrag();
        setCursor("auto");
    }, [releaseDrag, setCursor]);

const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    const now = performance.now();
    const pointerInterval = mobileOptimized ? 24 : lowQuality ? 24 : mediumQuality ? 18 : 14;
    if (now - lastPointerMoveAtRef.current < pointerInterval) return;
    lastPointerMoveAtRef.current = now;

    if (!sceneAnimating && !isDragging.current) return;

    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;
    
    // Smart Gesture Detection: Only on mobile/touch devices
    if (mobileOptimized && gestureMode.current === 'undecided') {
      const totalDx = e.clientX - gestureStartPos.current.x;
      const totalDy = e.clientY - gestureStartPos.current.y;
      gestureDistance.current = Math.sqrt(totalDx * totalDx + totalDy * totalDy);
      
      // Wait until we have enough movement to decide
      if (gestureDistance.current > GESTURE_THRESHOLD) {
        // Determine gesture direction: vertical = scroll, horizontal = drag
        if (Math.abs(totalDy) > Math.abs(totalDx)) {
          // Vertical movement = scroll mode - let browser handle it
          gestureMode.current = 'scroll';
          // Don't capture, don't stop propagation - let page scroll
          return;
        } else {
          // Horizontal movement = drag mode - activate card rotation
          gestureMode.current = 'drag';
          isDragging.current = true;
          setDragging(true);
          onDraggingCardChange(id);
          setCursor("grabbing");
          
          // Premium haptic feedback when entering drag mode
          if (!hasTriggeredHaptic.current) {
            triggerHaptic(10);
            hasTriggeredHaptic.current = true;
          }
        }
      }
    }
    
    // If in scroll mode (mobile only), do nothing (let browser handle scrolling)
    if (mobileOptimized && gestureMode.current === 'scroll') {
      return;
    }
    
    // Handle drag mode (desktop starts immediately, mobile after threshold)
    if (isDragging.current) {
      e.stopPropagation();
      dragDistance.current += Math.sqrt(dx * dx + dy * dy);

      // Map physical drag pixels directly to rotation (1:1 direct manipulation)
      const sensitivity = 0.009;
      const nextRotX = dragRot.current.x + (dy * sensitivity);
      const nextRotY = dragRot.current.y + (dx * sensitivity);

      // Allow full 360-degree rotation in all directions
      dragRot.current.x = nextRotX;
      dragRot.current.y = nextRotY;

      // Preserve organic throw momentum when released
      velocity.current.x = dy * 0.015;
      velocity.current.y = dx * 0.015;

      prevPointer.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (reducedMotion || lowQuality) return;

    if (e.uv && e.uv.x !== undefined && e.uv.y !== undefined) {
      pointerTiltTarget.current.x = (0.5 - e.uv.y) * 0.09;
      pointerTiltTarget.current.y = (e.uv.x - 0.5) * 0.09;
    }
  }, [lowQuality, mediumQuality, reducedMotion, sceneAnimating, id, onDraggingCardChange, setCursor, triggerHaptic, mobileOptimized]);

    const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (dragDistance.current >= 8) return;
        clickTimelineRef.current = 1;
        signal.pulseAll();
    }, [signal]);

    useFrame((state) => {
        if (!outerRef.current || !innerRef.current) return;

        if (!sceneAnimating && !isDragging.current) return;

        const now = state.clock.getElapsedTime();
        const interacting = hovered || isDragging.current || activeCardId === id;
        const targetFps = lowQuality ? (interacting ? 28 : 20) : mediumQuality ? (interacting ? 40 : 30) : (interacting ? 60 : 45);
        const minStep = 1 / targetFps;
        const elapsed = now - lastFrameAtRef.current;
        if (elapsed < minStep) return;
        lastFrameAtRef.current = now;

  const frameDelta = Math.min(Math.max(elapsed, 1 / 120), 1 / 30);
    const t = now * speed * (reducedMotion ? 0.9 : 1) + delay;

        const targetX =
            position[0] + Math.cos(t * wobbleX + floatOffset) * (reducedMotion ? 0.13 : 0.18) * motionScalar;
        const targetY =
            position[1] +
            (Math.sin(t * 1.3 + floatOffset) * (reducedMotion ? 0.16 : 0.22) +
                Math.sin(t * 0.9) * (reducedMotion ? 0.06 : 0.1)) *
            motionScalar;
        const isActive = activeCardId === id;
        const targetZ =
            (position[2] || 0) +
            Math.sin(t * wobbleZ) * (reducedMotion ? 0.08 : 0.12) * motionScalar +
            (isActive ? 1.5 : isSecondary ? -1.0 : 0);

        outerRef.current.position.x = THREE.MathUtils.damp(outerRef.current.position.x, targetX, 12, frameDelta);
        outerRef.current.position.y = THREE.MathUtils.damp(outerRef.current.position.y, targetY, 12, frameDelta);
        outerRef.current.position.z = THREE.MathUtils.damp(outerRef.current.position.z, targetZ, 15, frameDelta);

        pointerTilt.current.x = THREE.MathUtils.damp(pointerTilt.current.x, pointerTiltTarget.current.x, 18, frameDelta);
        pointerTilt.current.y = THREE.MathUtils.damp(pointerTilt.current.y, pointerTiltTarget.current.y, 18, frameDelta);

        const targetRotX = initialRotation[0] + Math.sin(t * 0.5 + floatOffset) * 0.04 + pointerTilt.current.x;
        const targetRotY = initialRotation[1] + Math.cos(t * 0.45) * 0.04 + pointerTilt.current.y + (isSecondary ? -0.04 : 0);
        const targetRotZ = Math.sin(t * 0.3 + floatOffset * 2) * 0.02;

        outerRef.current.rotation.x = THREE.MathUtils.damp(outerRef.current.rotation.x, targetRotX, 12, frameDelta);
        outerRef.current.rotation.y = THREE.MathUtils.damp(outerRef.current.rotation.y, targetRotY, 12, frameDelta);
        outerRef.current.rotation.z = THREE.MathUtils.damp(outerRef.current.rotation.z, targetRotZ, 15, frameDelta);

        if (clickTimelineRef.current > 0) {
            clickTimelineRef.current = Math.max(0, clickTimelineRef.current - frameDelta * (reducedMotion ? 1.5 : 1.1));
        }
        const clickProgress = 1 - clickTimelineRef.current;
        const pressPhase = clickProgress < 0.2 ? Math.sin((clickProgress / 0.2) * Math.PI) : 0;

const hoverScale = hovered ? 1.06 : 1;
    const backgroundScale = isSecondary ? 0.85 : 1;
    
    // Premium interaction scale: subtle "breathing" when deciding, full scale when dragging
    const decidingScale = gestureMode.current === 'undecided' && gestureDistance.current > 5 ? 1.02 : 1;
    const dragScale = isDragging.current ? 1.06 : 1;
    
    const finalScale = (hoverScale * backgroundScale * decidingScale * dragScale + pressPhase * 0.05) * baseScale;
    scaleVector.current.set(finalScale, finalScale, finalScale);
    outerRef.current.scale.lerp(scaleVector.current, reducedMotion || lowQuality ? 0.22 : 0.35);

        if (isDragging.current) {
            // While dragging, direct 1:1 rotation is handled perfectly in onPointerMove.
            // Gradually bleed out the momentum so holding still doesn't release with huge velocity.
            velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, frameDelta * 15);
            velocity.current.y = THREE.MathUtils.lerp(velocity.current.y, 0, frameDelta * 15);
        } else {
            // Apply organic spring physics to snap back softly when released
            velocity.current.x *= reducedMotion ? 0.82 : 0.88;
            velocity.current.y *= reducedMotion ? 0.82 : 0.88;
            velocity.current.x += (0 - dragRot.current.x) * 0.035;
            velocity.current.y += (0 - dragRot.current.y) * 0.035;

            dragRot.current.x += velocity.current.x;
            dragRot.current.y += velocity.current.y;

            // Extra dampening to ensure absolute and smooth return to 0
            dragRot.current.x = THREE.MathUtils.damp(dragRot.current.x, 0, reducedMotion ? 12.0 : 16.0, frameDelta);
            dragRot.current.y = THREE.MathUtils.damp(dragRot.current.y, 0, reducedMotion ? 12.0 : 16.0, frameDelta);
        }

        innerRef.current.rotation.x = dragRot.current.x;
        innerRef.current.rotation.y = dragRot.current.y;

        if (bodyMaterialRef.current) {
bodyMaterialRef.current.opacity = THREE.MathUtils.damp(
        bodyMaterialRef.current.opacity,
        isSecondary ? 0.86 : 0.97,
        8,
        frameDelta,
      );
    }

  });

    return (
        <group ref={(r) => { outerRef.current = r!; if (r) onRef(r); }}>
            <group ref={innerRef}>
                <mesh
                    position={[0, 0, 0.3]}
                    onPointerEnter={(e) => {
                        if (!sceneAnimating) return;
                        if (draggingCardId !== null && draggingCardId !== id) return;
                        e.stopPropagation();
                        setHovered((prev) => (prev ? prev : true));
                        onActiveCardChange(id);
                        setCursor(isDragging.current ? "grabbing" : "grab");
                    }}
                    onPointerLeave={(e) => {
                        if (!sceneAnimating) return;
                        if (draggingCardId !== null && draggingCardId !== id) return;
                        e.stopPropagation();
                        setHovered((prev) => (prev ? false : prev));
                        pointerTiltTarget.current = { x: 0, y: 0 };
                        if (!isDragging.current) setCursor("auto");
                        if (activeCardId === id) onActiveCardChange(null);
                    }}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerCancel}
                    onPointerMove={onPointerMove}
                    onClick={onClick}
                >
                    <planeGeometry args={[4.3, 2.9]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>

                <RoundedBox
                    args={[3.8, 2.4, 0.15]}
                    radius={0.16}
                    smoothness={lowQuality ? 6 : mediumQuality ? 10 : 12}
                >
                    {lowQuality ? (
                        <meshStandardMaterial
                            ref={bodyMaterialRef}
                            color="#02040a"
                            metalness={0.28}
                            roughness={0.5}
                            transparent
                            opacity={0.9}
                            emissive="#030712"
                            emissiveIntensity={0.12}
                        />
                    ) : (
                        <meshPhysicalMaterial
                            ref={bodyMaterialRef}
                            color="#02040a"
                            metalness={mediumQuality ? 0.65 : 0.9}
                            transparent={true}
                            opacity={0.96}
                            transmission={mediumQuality ? 0.3 : 0.6}
                            thickness={mediumQuality ? 0.6 : 1.8}
                            roughness={mediumQuality ? 0.2 : 0.08}
                            ior={1.45}
                            reflectivity={mediumQuality ? 0.45 : 0.9}
                            clearcoat={mediumQuality ? 0.55 : 1}
                            clearcoatRoughness={mediumQuality ? 0.08 : 0.02}
                            envMapIntensity={mediumQuality ? 0.7 : 1.4}
                        />
                    )}
                </RoundedBox>

                <CardFrame
                    color={color}
                    reducedMotion={reducedMotion || lowQuality}
                    reducedDetail={lowQuality}
                    animate={sceneAnimating}
                />


{type === "code" && <CodeCardContent reducedDetail={lowQuality} animateDetails={shouldAnimateCardDetails} />}
      {type === "preview" && <PreviewCardContent reducedDetail={lowQuality} animateDetails={shouldAnimateCardDetails} />}
      {type === "flow" && <FlowCardContent baseColor={color} reducedDetail={lowQuality} animateDetails={shouldAnimateCardDetails} />}

      {title && (
                    <Html
                        position={resolvedLabelOffset}
                        center={true}
                        distanceFactor={labelDistanceFactor}
                        zIndexRange={[100, 0]}
                        className="pointer-events-none select-none"
                        style={{
                            opacity: dragging ? 0.2 : 1,
                            pointerEvents: 'none',
                        }}
                    >
                        <div style={{ position: 'relative', width: 0, height: 0 }}>
                            <div style={getLabelAnchorStyles()}>
                                <div style={{
                                    background: `linear-gradient(145deg, rgba(8,12,28,0.95), rgba(15,23,42,0.90))`,
                                    border: `1px solid ${color}55`,
                                    borderRadius: '6px',
                                    padding: compactPadding,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: compactGap,
                                    whiteSpace: 'nowrap' as const,
                                    boxShadow: `0 0 5px ${color}05, 0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)`,
                                    position: 'relative' as const,
                                    overflow: 'hidden',
                                }}>
                                    {/* Top accent glow line */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '1px',
                                        background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
                                    }} />
                                    {/* Bottom accent glow line */}
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: '20%', width: '60%', height: '1px',
                                        background: `linear-gradient(90deg, transparent, ${color}22, transparent)`,
                                    }} />

                                    {/* Icon */}
                                    <div style={{ color: color, opacity: 0.9, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                        {type === "code" && <Code2 size={13} strokeWidth={2} />}
                                        {type === "flow" && <Bot size={13} strokeWidth={2} />}
                                        {type === "preview" && <Globe size={13} strokeWidth={2} />}
                                    </div>

                                    {/* Title */}
                                    <span style={{
                                        fontSize: compactFontSize,
                                        fontWeight: 700,
                                        letterSpacing: compactTracking,
                                        textTransform: 'uppercase' as const,
                                        color: 'rgba(255,255,255,0.92)',
                                    }}>
                                        {title}
                                    </span>

                                    {/* Status dot */}
                                    <div style={{
                                        width: compactDot, height: compactDot, borderRadius: '50%',
                                        backgroundColor: color,
                                        boxShadow: `0 0 2px ${color}, 0 0 4px ${color}20`,
                                        flexShrink: 0,
                                        animation: shouldRunConnectorPulse ? 'pulse 2s ease-in-out infinite' : 'none',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </Html>
                )}

                {showConnector && (
                    <>
                        <QuadraticBezierLine
                            start={resolvedConnector.start}
                            end={connectorEnd}
                            mid={connectorMid}
                            color={color}
                            transparent
                            opacity={0.62}
                            lineWidth={2.2}
                            depthTest={false}
                            renderOrder={120}
                        />

                        {/* Pulse orb traveling along the bezier */}
                        {shouldRunConnectorPulse && (
                            <PulseOrb
                                start={resolvedConnector.start}
                                end={connectorEnd}
                                mid={connectorMid}
                                color={color}
                                qualityTier={qualityTier}
                                active={true}
                            />
                        )}
                    </>
                )}


            </group>
        </group>
    );
};


// High-intensity "Sparkle" pulse that travels along a curve
function PulseOrb({
    start,
    end,
    mid,
    color,
    qualityTier = "high",
    active = true,
}: {
    start: [number, number, number];
    end: [number, number, number];
    mid: [number, number, number];
    color: string;
    qualityTier?: "high" | "medium" | "low";
    active?: boolean;
}) {
    const lightRef = useRef<THREE.PointLight>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const lastUpdateRef = useRef(0);

    const curve = useMemo(() => {
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3(...mid),
            new THREE.Vector3(...end)
        );
    }, [start, mid, end]);

    useFrame((state) => {
        if (!meshRef.current || !active) return;

        const time = state.clock.getElapsedTime();
        const minStep = qualityTier === "low" ? 1 / 24 : qualityTier === "medium" ? 1 / 36 : 1 / 60;
        if (time - lastUpdateRef.current < minStep) return;
        lastUpdateRef.current = time;

        const raw = (time * 0.8) % 2;
        const t = raw <= 1 ? raw : 2 - raw;

        const point = curve.getPoint(t);
        meshRef.current.position.copy(point);

        if (lightRef.current && qualityTier === "high") {
            lightRef.current.position.copy(point);
            lightRef.current.intensity = 1.6 + Math.sin(time * 25) * 0.4;
        }

        // Random-ish scale jitter to break the "geometric sphere" look
        const s = 0.02 + Math.abs(Math.sin(time * 50)) * 0.015;
        meshRef.current.scale.set(s, s, s);
    });

    return (
        <group>
            {/* The "Spark" - tiny and jittery */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, qualityTier === "low" ? 6 : 8, qualityTier === "low" ? 6 : 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {qualityTier === "high" && active && (
                <pointLight
                    ref={lightRef}
                    distance={0.6}
                    intensity={1.8}
                    color={color}
                    decay={2}
                />
            )}
        </group>
    );
}
