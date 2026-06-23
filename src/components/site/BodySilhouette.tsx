import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type BodyPart =
  | "Neck"
  | "Shoulder"
  | "Upper Back"
  | "Lower Back"
  | "Hip"
  | "Knee"
  | "Ankle"
  | "Wrist";

export const bodyParts: BodyPart[] = [
  "Neck",
  "Shoulder",
  "Upper Back",
  "Lower Back",
  "Hip",
  "Knee",
  "Ankle",
  "Wrist",
];

const hotspots: Record<BodyPart, { x: number; y: number }> = {
  Neck: { x: 100, y: 70 },
  Shoulder: { x: 52, y: 104 },
  "Upper Back": { x: 100, y: 120 },
  "Lower Back": { x: 100, y: 184 },
  Hip: { x: 78, y: 214 },
  Knee: { x: 84, y: 320 },
  Ankle: { x: 84, y: 404 },
  Wrist: { x: 44, y: 196 },
};

export function BodySilhouette({
  selected,
  onSelect,
  className,
}: {
  selected?: BodyPart | null;
  onSelect?: (part: BodyPart) => void;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 460"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Interactive body map"
    >
      <defs>
        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.74 0.14 165)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="oklch(0.49 0.082 168)" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      <g
        fill="url(#bodyFill)"
        stroke="oklch(0.74 0.14 165 / 0.45)"
        strokeWidth="1.2"
      >
        <circle cx="100" cy="40" r="26" />
        <rect x="90" y="62" width="20" height="22" rx="8" />
        <rect x="62" y="90" width="76" height="122" rx="30" />
        <rect x="38" y="96" width="22" height="112" rx="11" />
        <rect x="140" y="96" width="22" height="112" rx="11" />
        <rect x="66" y="198" width="68" height="44" rx="20" />
        <rect x="72" y="232" width="24" height="184" rx="12" />
        <rect x="104" y="232" width="24" height="184" rx="12" />
      </g>

      {bodyParts.map((part) => {
        const { x, y } = hotspots[part];
        const isActive = selected === part;
        return (
          <g
            key={part}
            className="cursor-pointer"
            onClick={() => onSelect?.(part)}
            role="button"
            aria-label={part}
          >
            {isActive && (
              <motion.circle
                cx={x}
                cy={y}
                r="16"
                fill="oklch(0.74 0.14 165 / 0.25)"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <circle cx={x} cy={y} r="14" fill="transparent" />
            <circle
              cx={x}
              cy={y}
              r={isActive ? 8 : 6}
              className="transition-all duration-300"
              fill={isActive ? "oklch(0.74 0.14 165)" : "oklch(1 0 0 / 0.9)"}
              stroke="oklch(0.74 0.14 165)"
              strokeWidth="2"
            />
          </g>
        );
      })}
    </svg>
  );
}