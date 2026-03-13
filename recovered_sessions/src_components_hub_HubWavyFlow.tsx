"use client";

type PulseTrack = {
  pathD: string;
  duration: number;
  delay: number;
};

const TRACKS: PulseTrack[] = [
  { pathD: "M 97.432 57.365 C 76.528 74.337 66.46 42.715 50 50", duration: 20, delay: 0 },
  { pathD: "M 88.065 79.242 C 69.769 80.086 67.027 55.837 50 50", duration: 22, delay: 0.5 },
  { pathD: "M 47.686 97.944 C 35.732 83.052 56.146 66.918 50 50", duration: 18, delay: 1 },
  { pathD: "M 17.64 85.452 C 14.358 55.065 43.164 66.652 50 50", duration: 19, delay: 1.5 },
  { pathD: "M 2.374 44.02 C 22.338 26.961 34.65 59.4 50 50", duration: 21, delay: 2 },
  { pathD: "M 14.294 17.92 C 37.853 16.111 32.006 49.554 50 50", duration: 22, delay: 2.5 },
  { pathD: "M 49.419 2.004 C 73.946 23.119 39.671 35.259 50 50", duration: 18, delay: 3 },
  { pathD: "M 82.891 15.04 C 83.661 37.235 54.489 32.569 50 50", duration: 20, delay: 3.5 },
];

export function HubWavyFlow({ shouldAnimate = true }: { shouldAnimate?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none [transform-style:preserve-3d]">
      <svg viewBox="0 0 100 100" className="w-full h-full [transform:translateZ(15px)]">
        {TRACKS.map((track, idx) => (
          <g key={`track-${idx}`}>
            <path
              d={track.pathD}
              fill="none"
              stroke="rgba(34, 211, 238, 0.22)"
              strokeWidth="0.22"
            />

            <path
              d={track.pathD}
              fill="none"
              stroke="#fff"
              strokeWidth="0.42"
              strokeDasharray="8 190"
              strokeDashoffset={shouldAnimate ? 198 : 0}
              opacity="0.78"
            >
              {shouldAnimate && (
                <animate
                  attributeName="stroke-dashoffset"
                  values="198;0"
                  dur={`${track.duration}s`}
                  begin={`${track.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>
        ))}
      </svg>
    </div>
  );
}
