import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Activity, History } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const stats = [
  { label: "Pain Reduction", value: "−64%", up: false },
  { label: "Flexibility", value: "+27%", up: true },
  { label: "Recovery Progress", value: "88%", up: true },
  { label: "Mobility Growth", value: "+38%", up: true },
  { label: "Posture", value: "+45%", up: true },
];

const history = [
  { date: "Jun 21", label: "Spinal Mobility Flow", tag: "Assisted" },
  { date: "Jun 18", label: "Assisted session · Dr. Karan", tag: "Assisted" },
  { date: "Jun 15", label: "Hip Flexor Release", tag: "Assisted" },
];

const points = [30, 38, 35, 48, 52, 60, 58, 70, 78, 88];

function Sparkline() {
  const w = 520;
  const h = 180;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / (max - min)) * (h - 20) - 10]);
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="prog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill="url(#prog)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}

export function Progress() {
  return (
    <section id="progress" className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Progress tracking"
          title="See every gain, week after week"
          description="A living dashboard that proves your recovery is working."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Recovery Progress</div>
                <div className="font-display text-3xl font-bold text-foreground">88%</div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-semibold text-primary">
                <ArrowUpRight className="size-4" /> On track
              </span>
            </div>
            <div className="mt-6">
              <Sparkline />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Week 1</span>
              <span>Week 10</span>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2 font-display font-semibold text-foreground">
              <History className="size-5 text-primary" /> Session history
            </div>
            <ul className="mt-5 space-y-3">
              {history.map((h) => (
                <li key={h.label} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                    <Activity className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{h.label}</div>
                    <div className="text-xs text-muted-foreground">{h.date}</div>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">{h.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-foreground">{s.value}</span>
                {s.up ? (
                  <ArrowUpRight className="size-4 text-primary" />
                ) : (
                  <ArrowDownRight className="size-4 text-primary" />
                )}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
