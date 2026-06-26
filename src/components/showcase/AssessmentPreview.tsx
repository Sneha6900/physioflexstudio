import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Activity, Gauge, Move, ShieldCheck, TrendingUp } from "lucide-react";
import { useCountUp } from "@/components/showcase/useCountUp";

function RecoveryRing({ active }: { active: boolean }) {
  const target = 88;
  const value = useCountUp(target, active);
  const r = 58;
  const c = 2 * Math.PI * r;
  const offset = c - (c * target) / 100;

  return (
    <div className="relative grid size-36 place-items-center">
      <svg viewBox="0 0 140 140" className="absolute size-full -rotate-90" aria-hidden>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--secondary)" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={active ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="relative z-10 flex w-[62%] flex-col items-center justify-center text-center">
        <div className="type-stat tabular-nums leading-none text-foreground">{value}</div>
        <div className="mt-1 text-[0.58rem] font-semibold leading-tight tracking-wide text-muted-foreground uppercase sm:text-[0.62rem]">
          <span className="block">Recovery</span>
          <span className="block">Index</span>
        </div>
      </div>
    </div>
  );
}

const metrics = [
  { icon: Move, label: "Mobility Score", value: 82, suffix: "/ 100" },
  { icon: Activity, label: "Flexibility Score", value: 74, suffix: "/ 100" },
  { icon: ShieldCheck, label: "Posture Analysis", value: 68, suffix: "%", displaySuffix: "Good" },
  { icon: Gauge, label: "Pain Severity", value: 28, suffix: "%", displaySuffix: "Low" },
] as const;

function MetricCard({
  metric,
  active,
}: {
  metric: (typeof metrics)[number];
  active: boolean;
}) {
  const count = useCountUp(metric.value, active);
  const tone =
    "displaySuffix" in metric && metric.displaySuffix
      ? active && count >= metric.value
        ? metric.displaySuffix
        : `${count}${metric.suffix}`
      : `${count}${metric.suffix}`;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-background p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-forest">
          <metric.icon className="size-4" />
        </span>
        <span className="type-label font-semibold tabular-nums text-muted-foreground">{tone}</span>
      </div>
      <div className="mt-4">
        <div className="mb-1 type-caption font-medium text-foreground">{metric.label}</div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={active ? { width: `${metric.value}%` } : { width: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

export function AssessmentPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="min-w-0 p-3 sm:p-6 lg:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="type-label font-semibold uppercase tracking-wider text-muted-foreground">
            Clinical Dashboard
          </div>
          <div className="type-subheading font-bold text-foreground">Assessment Overview</div>
        </div>
        <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 type-label font-semibold text-forest">
          Live
        </span>
      </div>

      <div className="grid gap-4 rounded-[1.5rem] border border-border bg-gradient-to-br from-secondary/50 to-background p-4 sm:grid-cols-[auto_1fr] sm:gap-5 sm:p-5">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-secondary/70 to-background p-5 sm:p-6">
          <RecoveryRing active={inView} />
          <div className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 type-label font-semibold text-forest">
            <TrendingUp className="size-3.5" /> +12% this month
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map((m) => (
            <MetricCard key={m.label} metric={m} active={inView} />
          ))}
        </div>
      </div>
    </div>
  );
}
