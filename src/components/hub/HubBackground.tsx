"use client";

export function HubBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="absolute w-[95%] h-[95%] rounded-full bg-cyan-500/5 blur-[120px]" />
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="opacity-15">
        <defs>
          <pattern id="tech-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#22d3ee" strokeWidth="0.1" />
          </pattern>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#tech-grid)" />
      </svg>
    </div>
  );
}
