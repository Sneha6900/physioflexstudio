import { useRef } from "react";
import { useInView } from "motion/react";
import { Activity, ArrowUpRight, History } from "lucide-react";
import { useCountUp } from "@/components/showcase/useCountUp";

const points = [30, 38, 35, 48, 52, 60, 58, 70, 78, 88];

const history = [
  { date: "Jun 21", label: "Spinal Mobility Flow", tag: "Assisted" },
  { date: "Jun 18", label: "Assisted session · Dr. Karan", tag: "Assisted" },
  { date: "Jun 15", label: "Hip Flexor Release", tag: "Assisted" },
];

function RecoveryChart() {
  const w = 520;
  const h = 160;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / (max - min)) * (h - 20) - 10]);
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="showcase-prog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#showcase-prog)" />
      <path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {coords.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="var(--accent)"
          stroke="var(--card)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function ProgressPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const recoveryValue = useCountUp(88, inView);

  return (
    <div ref={ref} className="min-w-0 p-3 sm:p-6 lg:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="type-label font-semibold uppercase tracking-wider text-muted-foreground">
            Progress Dashboard
          </div>
          <div className="type-subheading font-bold text-foreground">Recovery Tracking</div>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 type-label font-semibold text-forest">
          <ArrowUpRight className="size-3.5" /> On track
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <div className="rounded-[1.5rem] border border-border bg-background p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="type-caption text-muted-foreground">Recovery Progress</div>
              <div className="type-stat tabular-nums text-foreground">{recoveryValue}%</div>
            </div>
          </div>
          <div className="mt-5">
            <RecoveryChart />
          </div>
          <div className="mt-1 flex justify-between type-caption text-muted-foreground">
            <span>Week 1</span>
            <span>Week 10</span>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border bg-background p-4 sm:p-5">
          <div className="flex items-center gap-2 type-caption font-semibold text-foreground">
            <History className="size-4 text-forest" /> Session history
          </div>
          <ul className="mt-4 space-y-2">
            {history.map((h) => (
              <li
                key={h.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-forest">
                  <Activity className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate type-caption font-semibold text-foreground">{h.label}</div>
                  <div className="type-label text-muted-foreground">{h.date}</div>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 type-caption font-medium text-muted-foreground">
                  {h.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
