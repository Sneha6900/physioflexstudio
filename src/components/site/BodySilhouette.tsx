import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  bodyParts,
  MAX_PAIN_AREA_SELECTIONS,
  togglePainAreaSelection,
  type BodyPart,
} from "@/lib/journey-body";
import {
  bodyBaseImage,
  bodyInteractionZones,
  bodyLayerImages,
  primaryLandmarks,
} from "@/lib/body-map";

export type { BodyPart };
export { bodyParts, MAX_PAIN_AREA_SELECTIONS, togglePainAreaSelection };

/** 8–12px clinical pain marker — visible only when region is selected. */
function PainMarker({ compact }: { compact?: boolean }) {
  return (
    <span
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full border border-[#EF4444] bg-[#EF4444] shadow-[0_1px_3px_rgba(15,23,42,0.14),0_0_5px_rgba(239,68,68,0.22)]",
          compact ? "size-2.5" : "size-3",
        )}
      >
        <span className="size-1 rounded-full bg-white" />
      </span>
    </span>
  );
}

/** Soft anatomical tint — no blur, no oversized glow. */
function RegionTint({ part, mode }: { part: BodyPart; mode: "selected" | "hover" }) {
  return (
    <motion.img
      src={bodyLayerImages[part]}
      alt=""
      aria-hidden
      draggable={false}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center",
        mode === "selected" ? "body-map-tint-selected" : "body-map-tint-hover",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: mode === "selected" ? 0.17 : 0.12 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}

function InvisibleZone({
  label,
  part,
  zone,
  onToggle,
  onHover,
}: {
  label: string;
  part: BodyPart;
  zone: { x: number; y: number; w: number; h: number };
  onToggle: () => void;
  onHover: (hovering: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onToggle}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className="absolute z-10 cursor-pointer touch-manipulation rounded-[30%] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#91DDCF]/50"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.w}%`,
        height: `${zone.h}%`,
      }}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
}

export function BodySilhouette({
  selected = [],
  onToggle,
  onSelectionLimit,
  onClearAll,
  className,
  compact = false,
}: {
  selected?: BodyPart[];
  onToggle?: (part: BodyPart) => void;
  onSelectionLimit?: () => void;
  onClearAll?: () => void;
  className?: string;
  compact?: boolean;
}) {
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleToggle = (part: BodyPart) => {
    const { limitReached } = togglePainAreaSelection(selected, part);
    if (limitReached) {
      onSelectionLimit?.();
      return;
    }
    onToggle?.(part);
  };

  const hoverPart = hoveredPart && !selected.includes(hoveredPart) ? hoveredPart : null;

  const sizeClass = compact ? "max-h-[min(42svh,280px)] sm:max-h-[min(38svh,240px)]" : "max-h-full";

  const statusText =
    selected.length > 0
      ? `Selected areas (${selected.length}/${MAX_PAIN_AREA_SELECTIONS}) · ${selected.join(", ")}`
      : (hoveredLabel ?? "Tap up to 3 areas on the body map");

  return (
    <div className={cn("relative flex h-full min-h-0 w-full flex-col", className)}>
      <div className="relative mx-auto flex h-full min-h-0 w-full items-center justify-center">
        <div
          className={cn(
            "relative w-fit max-w-full overflow-hidden rounded-md bg-[#F7F9F2]",
            compact && "max-h-[min(42svh,280px)] sm:max-h-[min(38svh,240px)]",
          )}
        >
          <img
            src={bodyBaseImage}
            alt="Anatomical body map showing front and back views"
            loading="lazy"
            decoding="async"
            className={cn(
              "relative z-0 block w-auto max-w-full select-none object-contain",
              sizeClass,
            )}
            draggable={false}
          />

          <div className="pointer-events-none absolute inset-0 z-[1]">
            <AnimatePresence>
              {bodyParts.map((part) => {
                if (!selected.includes(part)) return null;
                return <RegionTint key={`sel-${part}`} part={part} mode="selected" />;
              })}
              {hoverPart && <RegionTint key={`hover-${hoverPart}`} part={hoverPart} mode="hover" />}
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2]">
            <AnimatePresence>
              {selected.map((part) => {
                const pos = primaryLandmarks[part];
                return (
                  <span
                    key={part}
                    className="absolute"
                    style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                  >
                    <PainMarker compact={compact} />
                  </span>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 z-[3]">
            {bodyInteractionZones.map((z) => (
              <InvisibleZone
                key={z.id}
                label={z.label}
                part={z.part}
                zone={z}
                onToggle={() => handleToggle(z.part)}
                onHover={(h) => {
                  setHoveredPart(h ? z.part : null);
                  setHoveredLabel(h ? z.label : null);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-2 text-center text-xs font-medium text-muted-foreground">
        {selected.length > 0 ? (
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="text-[#EF4444]">{statusText}</span>
            {onClearAll && (
              <button
                type="button"
                onClick={onClearAll}
                className="font-semibold text-[#EF4444] underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            )}
          </p>
        ) : (
          <p>{statusText}</p>
        )}
      </div>
    </div>
  );
}
