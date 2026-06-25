import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, HelpCircle, X } from "lucide-react";
import { BodySilhouette } from "@/components/site/BodySilhouette";
import { areaMeta, bodyParts, togglePainAreaSelection, type BodyPart } from "@/lib/journey-body";
import { cn } from "@/lib/utils";

function BodyAreaChip({
  area,
  selected,
  onToggle,
}: {
  area: BodyPart;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onToggle}
      className={cn(
        "relative flex min-h-11 items-center justify-center rounded-xl border px-2.5 py-2.5 text-xs font-semibold leading-tight transition-all duration-250 sm:text-sm",
        selected
          ? "border-destructive/45 bg-destructive/12 text-foreground"
          : "border-border/80 bg-card text-muted-foreground hover:border-accent/60 hover:bg-secondary",
      )}
      whileTap={{ scale: 0.98 }}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#EF4444] text-white shadow-sm"
        >
          <Check className="size-3" strokeWidth={3} />
        </motion.span>
      )}
      {area}
    </motion.button>
  );
}

function SelectedAreasPanel({
  parts,
  onRemove,
}: {
  parts: BodyPart[];
  onRemove: (part: BodyPart) => void;
}) {
  return (
    <motion.div layout className="shrink-0 rounded-xl border border-border/80 bg-background/90 p-3">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Selected Areas
      </h4>
      {parts.length === 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Select up to 3 areas on the body map or from the list below.
        </p>
      ) : (
        <ul className="mt-2 flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {parts.map((part) => (
              <motion.li
                key={part}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="inline-flex items-center gap-1 rounded-full border border-[#FECACA] bg-[#FEF2F2] py-1 pl-3 pr-1.5 text-xs font-semibold text-foreground">
                  {part}
                  <button
                    type="button"
                    onClick={() => onRemove(part)}
                    className="grid size-6 place-items-center rounded-full text-[#EF4444] transition-colors hover:bg-[#FECACA]/40"
                    aria-label={`Remove ${part}`}
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
      {parts.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center text-xs">
          {parts.length === 1 ? (
            <>
              <div>
                <p className="text-muted-foreground">Pain</p>
                <p className="mt-0.5 font-semibold text-forest">
                  {areaMeta[parts[0]].painLevel}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Impact</p>
                <p className="mt-0.5 font-semibold text-forest">{areaMeta[parts[0]].impact}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Recovery</p>
                <p className="mt-0.5 font-semibold text-forest">{areaMeta[parts[0]].recovery}</p>
              </div>
            </>
          ) : (
            parts.map((part) => {
              const meta = areaMeta[part];
              return (
                <div key={`${part}-meta`} className="col-span-3 text-left text-muted-foreground">
                  <span className="font-semibold text-foreground">{part}</span>
                  <span className="mx-1">·</span>
                  {meta.painLevel} pain · {meta.recovery} recovery
                </div>
              );
            })
          )}
        </div>
      )}
    </motion.div>
  );
}

type PainAreaSelectorProps = {
  selected: BodyPart[];
  onChange: (parts: BodyPart[]) => void;
  compact?: boolean;
  showHelp?: boolean;
  title?: string;
  description?: string;
};

export function PainAreaSelector({
  selected,
  onChange,
  compact = false,
  showHelp = true,
  title = "Where does it hurt?",
  description = "Tap up to 3 areas on the body map or select below",
}: PainAreaSelectorProps) {
  const [limitMessage, setLimitMessage] = useState(false);

  const showLimitMessage = () => {
    setLimitMessage(true);
    window.setTimeout(() => setLimitMessage(false), 3500);
  };

  const handleToggle = (area: BodyPart) => {
    const { next, limitReached } = togglePainAreaSelection(selected, area);
    if (limitReached) {
      showLimitMessage();
      return;
    }
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="type-subsection text-foreground">{title}</h3>
          <p className="type-body mt-0.5 text-muted-foreground">{description}</p>
        </div>
        {showHelp && (
          <button
            type="button"
            title="Not sure? Pick the closest area — we'll guide you."
            className="touch-target grid size-11 shrink-0 place-items-center rounded-xl border border-[#e8c5e5]/50 bg-[#e8c5e5]/15 text-[#9d4a7a]"
          >
            <HelpCircle className="size-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {limitMessage && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs text-foreground"
            role="status"
          >
            You can select up to 3 pain areas. Deselect one to choose another.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
        <div
          className={cn(
            "flex items-stretch justify-center rounded-xl border border-border/60 bg-[#F7F9F2] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
            compact
              ? "min-h-[min(14rem,38svh)] sm:min-h-[min(16rem,42svh)]"
              : "min-h-[min(18rem,45svh)] sm:min-h-[22rem]",
          )}
        >
          <BodySilhouette
            compact={compact}
            selected={selected}
            onToggle={handleToggle}
            onSelectionLimit={showLimitMessage}
            onClearAll={() => onChange([])}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
            {bodyParts.map((area) => (
              <BodyAreaChip
                key={area}
                area={area}
                selected={selected.includes(area)}
                onToggle={() => handleToggle(area)}
              />
            ))}
          </div>
          <SelectedAreasPanel parts={selected} onRemove={handleToggle} />
        </div>
      </div>
    </div>
  );
}
