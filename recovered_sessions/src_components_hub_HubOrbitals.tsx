"use client";

interface HubOrbitalsProps {
  shouldAnimate?: boolean;
  liteMode?: boolean;
}

export function HubOrbitals({ shouldAnimate = true, liteMode = false }: HubOrbitalsProps) {
  const durA = liteMode ? 40 : 28;
  const durB = liteMode ? 32 : 22;
  const durC = liteMode ? 48 : 34;

  return (
    <div className="absolute inset-0 pointer-events-none [transform:translateZ(22px)]">
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
        <g>
          <g>
            {shouldAnimate && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur={`${durA}s`}
                repeatCount="indefinite"
              />
            )}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(34, 211, 238, 0.24)"
              strokeWidth="0.16"
              strokeDasharray="16 140"
            />
          </g>

          <g>
            {shouldAnimate && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="-360 50 50"
                dur={`${durB}s`}
                repeatCount="indefinite"
              />
            )}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(59, 130, 246, 0.24)"
              strokeWidth="0.14"
              strokeDasharray="10 120"
            />
          </g>

          <g>
            {shouldAnimate && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur={`${durC}s`}
                repeatCount="indefinite"
              />
            )}
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="rgba(34, 211, 238, 0.2)"
              strokeWidth="0.14"
              strokeDasharray="6 80"
            />
          </g>

          <circle cx="50" cy="50" r="47.4" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="0.1" />
        </g>
      </svg>
    </div>
  );
}
