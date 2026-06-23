import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { PainArea, PainMarker } from "@/lib/assessment-store";

const hotspots: Record<PainArea, { x: number; y: number }> = {
  Neck: { x: 100, y: 48 },
  Shoulder: { x: 58, y: 90 },
  "Upper Back": { x: 100, y: 124 },
  "Lower Back": { x: 100, y: 190 },
  Hip: { x: 80, y: 238 },
  Knee: { x: 84, y: 310 },
  Ankle: { x: 84, y: 390 },
  Wrist: { x: 144, y: 170 },
};

const markerLabels = ["1", "2", "3"];

export function BodyModel3D({
  markers,
  selectedMarkerId,
  onPartClick,
  className,
}: {
  markers: PainMarker[];
  selectedMarkerId: number | null;
  onPartClick: (part: PainArea) => void;
  className?: string;
}) {
  const selected = markers.find((marker) => marker.id === selectedMarkerId);

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-soft)]", className)}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">3D body model</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap a painful area to add or select a marker. You can place up to three markers.
          </p>
        </div>
        <div className="rounded-3xl bg-secondary px-4 py-3 text-xs font-semibold text-muted-foreground">
          {markers.length}/3 markers
        </div>
      </div>
      <div className="relative mx-auto h-[30rem] w-full max-w-[26rem]">
        <svg viewBox="0 0 220 460" className="h-full w-full">
          <defs>
            <linearGradient id="modelShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.05 210)" stopOpacity="0.76" />
              <stop offset="100%" stopColor="oklch(0.63 0.06 180)" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="modelBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.65 0.15 170)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.45 0.08 170)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <g fill="url(#modelBody)" stroke="oklch(0.74 0.14 165 / 0.35)" strokeWidth="1.2">
            <ellipse cx="110" cy="90" rx="42" ry="28" />
            <path d="M68 108 C58 160 64 200 70 228 C52 268 48 338 78 378 L142 378 C172 338 168 268 150 228 C156 200 162 160 152 108 Z" />
            <ellipse cx="110" cy="400" rx="52" ry="18" />
          </g>
          <ellipse cx="110" cy="86" rx="40" ry="26" fill="url(#modelShine)" opacity="0.35" />
          <ellipse cx="110" cy="410" rx="48" ry="16" fill="url(#modelShine)" opacity="0.18" />

          {Object.entries(hotspots).map(([part, spot], index) => {
            const marker = markers.find((m) => m.part === part);
            const isSelected = marker?.id === selectedMarkerId;

            return (
              <g key={part} className="cursor-pointer" onClick={() => onPartClick(part as PainArea)}>
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r="18"
                  fill={marker ? "oklch(0.05 0.71 43 / 0.18)" : "transparent"}
                  stroke={isSelected ? "var(--accent)" : "oklch(0.74 0.14 165 / 0.22)"}
                  strokeWidth={isSelected ? 3 : 2}
                />
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r="10"
                  fill={marker ? "var(--accent)" : "oklch(1 0 0 / 0.95)"}
                />
                {marker && (
                  <text
                    x={spot.x}
                    y={spot.y + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="var(--background)"
                  >
                    {marker.id}
                  </text>
                )}
                {!marker && (
                  <text
                    x={spot.x}
                    y={spot.y + 4}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="var(--muted-foreground)"
                  >
                    {index + 1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {selected ? (
        <div className="mt-6 rounded-3xl border border-border bg-background p-4">
          <div className="text-sm font-semibold text-foreground">Selected marker</div>
          <p className="mt-2 text-sm text-muted-foreground">{selected.part}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-3 py-1">Pain level {selected.painLevel}</span>
            <span className="rounded-full bg-secondary px-3 py-1">Mobility {selected.mobility}</span>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-border bg-background p-4 text-sm text-muted-foreground">
          Tap a body area to place a marker. Each marker captures a separate pain point.
        </div>
      )}
    </div>
  );
}
