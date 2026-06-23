import { motion } from "motion/react";
import { Activity, Gauge, Move, ShieldCheck, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

function Ring({ value, label }: { value: number; label: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 160 160" className="size-44 -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--secondary)" strokeWidth="14" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-4xl font-bold text-foreground">{value}</div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

const metrics = [
  { icon: Move, label: "Mobility Score", value: 82, tone: "82 / 100" },
  { icon: Activity, label: "Flexibility Score", value: 74, tone: "74 / 100" },
  { icon: ShieldCheck, label: "Posture Analysis", value: 68, tone: "Good" },
  { icon: Gauge, label: "Pain Severity", value: 28, tone: "Low" },
];

export function Assessment() {
  return (
    <section id="assessment" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Clinical assessment"
          title="Your condition, measured clinically"
          description="Objective clinical metrics—pain severity, mobility and posture—assessed by physiotherapists and presented clearly."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-6 rounded-[2.5rem] border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10 lg:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-secondary/60 p-8">
              <Ring value={88} label="Recovery Index" />
              <div className="flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-primary">
                <TrendingUp className="size-4" /> +12% this month
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-background p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                      <m.icon className="size-5" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">{m.tone}</span>
                  </div>
                  <div className="mt-6">
                    <div className="mb-2 text-sm font-medium text-foreground">{m.label}</div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}