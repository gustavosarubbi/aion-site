"use client";

import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { Integration, ConnectionPath } from "./types";

interface ConnectionLinesProps {
  paths: ConnectionPath[];
  integrations: Integration[];
  hoveredCard: number | null;
  shouldAnimate?: boolean;
  className?: string;
  style?: CSSProperties;
  centerMaskRadius?: number;
}

type ParsedPath = {
  id: number;
  sx: number;
  sy: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  ex: number;
  ey: number;
};

function parsePath(path: string, id: number): ParsedPath | null {
  const numbers = path.match(/-?\d*\.?\d+/g)?.map(Number);
  if (!numbers || numbers.length < 8) return null;

  const [sx, sy, c1x, c1y, c2x, c2y, ex, ey] = numbers;
  return { id, sx, sy, c1x, c1y, c2x, c2y, ex, ey };
}

function drawCubic(ctx: CanvasRenderingContext2D, path: ParsedPath) {
  ctx.beginPath();
  ctx.moveTo(path.sx, path.sy);
  ctx.bezierCurveTo(path.c1x, path.c1y, path.c2x, path.c2y, path.ex, path.ey);
}

export function ConnectionLines({
  paths,
  integrations,
  hoveredCard,
  shouldAnimate = true,
  className = "absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[5] hidden lg:block overflow-visible opacity-90",
  style,
  centerMaskRadius = 120,
}: ConnectionLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const staticBufferRef = useRef<HTMLCanvasElement | null>(null);

  const parsedPaths = useMemo(
    () => paths.map((line) => parsePath(line.path, line.id)).filter((line): line is ParsedPath => line !== null),
    [paths]
  );

  const origin = useMemo(
    () => (paths.length > 0 ? { x: paths[0].hx, y: paths[0].hy } : null),
    [paths]
  );
  const maskId = "hub-core-occlusion-mask";
  const wireMask = origin ? `url(#${maskId})` : undefined;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const ensureStaticBuffer = (widthPx: number, heightPx: number) => {
      if (!staticBufferRef.current) {
        staticBufferRef.current = document.createElement("canvas");
      }
      const staticCanvas = staticBufferRef.current;
      if (staticCanvas.width !== widthPx || staticCanvas.height !== heightPx) {
        staticCanvas.width = widthPx;
        staticCanvas.height = heightPx;
      }
      return staticCanvas;
    };

    const applyCenterCutout = (ctx: CanvasRenderingContext2D) => {
      if (!origin) return;
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, centerMaskRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.restore();
    };

    const rebuildStaticLayer = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      const widthPx = Math.max(1, Math.round(width * dpr));
      const heightPx = Math.max(1, Math.round(height * dpr));

      canvas.width = widthPx;
      canvas.height = heightPx;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const staticCanvas = ensureStaticBuffer(widthPx, heightPx);
      const staticCtx = staticCanvas.getContext("2d");
      if (!staticCtx) return;

      staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticCtx.clearRect(0, 0, width, height);

      for (const line of parsedPaths) {
        const integration = integrations[line.id];
        if (!integration) continue;

        drawCubic(staticCtx, line);
        staticCtx.strokeStyle = "rgba(34, 211, 238, 0.12)";
        staticCtx.lineWidth = 1.45;
        staticCtx.stroke();

        drawCubic(staticCtx, line);
        staticCtx.strokeStyle = `${integration.accent}38`;
        staticCtx.lineWidth = 0.45;
        staticCtx.stroke();
      }

      applyCenterCutout(staticCtx);
    };

    const paintFrame = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      const staticCanvas = staticBufferRef.current;
      if (!staticCanvas) return;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.drawImage(staticCanvas, 0, 0, staticCanvas.width / dpr, staticCanvas.height / dpr);
    };

    rebuildStaticLayer();
    paintFrame();

    const resizeObserver = new ResizeObserver(() => {
      rebuildStaticLayer();
      paintFrame();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [centerMaskRadius, integrations, origin, parsedPaths]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <svg width="100%" height="100%" style={{ overflow: "visible" }} className="absolute inset-0">
        <defs>
          <filter id="glow-circuit" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {origin && (
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect x={-2000} y={-2000} width={6000} height={6000} fill="white" />
              <circle cx={origin.x} cy={origin.y} r={centerMaskRadius} fill="black" />
            </mask>
          )}
        </defs>

        {paths.map((line) => {
          const item = integrations[line.id];
          const isActive = hoveredCard === line.id;
          if (!item) return null;

          return (
            <g key={line.id}>
              <g mask={wireMask}>
                <circle r="2" fill={item.accent} filter="url(#glow-circuit)">
                  <animateMotion
                    path={line.path}
                    dur={`${8 + line.id * 0.7}s`}
                    begin={`${line.id * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.25;0.95;0.25" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle r="0.9" fill="rgba(255,255,255,0.9)">
                  <animateMotion
                    path={line.path}
                    dur={`${8 + line.id * 0.7}s`}
                    begin={`${line.id * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {isActive && (
                <path
                  d={line.path}
                  fill="none"
                  stroke={item.accent}
                  strokeWidth="2.4"
                  style={{ filter: "url(#glow-circuit)" }}
                  mask={wireMask}
                />
              )}

              {isActive && shouldAnimate && (
                <>
                  <path
                    d={line.path}
                    fill="none"
                    stroke={item.accent}
                    strokeWidth="1.4"
                    strokeOpacity="0.95"
                    filter="url(#glow-circuit)"
                    mask={wireMask}
                  />
                  <path
                    d={line.path}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeDasharray="14 110"
                    strokeDashoffset={124}
                    filter="url(#glow-circuit)"
                    mask={wireMask}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="124;0"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                  </path>
                </>
              )}

              {isActive ? (
                <>
                  <circle cx={line.cx} cy={line.cy} r="4" fill={item.accent} filter="url(#glow-circuit)" />
                  {shouldAnimate && (
                    <circle cx={line.cx} cy={line.cy} r="6" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.8" opacity="0.6">
                      <animate attributeName="r" values="6;12;6" dur="0.9s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="0.9s" repeatCount="indefinite" />
                    </circle>
                  )}
                </>
              ) : (
                <path
                  d={`M ${line.cx - 3} ${line.cy} A 3 3 0 0 0 ${line.cx + 3} ${line.cy}`}
                  fill={item.accent}
                  opacity="0.8"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
