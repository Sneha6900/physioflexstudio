import { motion } from "motion/react";
import { Activity, Gauge, Move, ShieldCheck, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

function Ring({ value, label }: { value: number; label: string }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 140 140" className="size-36 -rotate-90" aria-hidden>
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
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
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
      <div className="section-shell">
        <SectionHeading
          eyebrow="Clinical assessment"
          title="Your condition, measured clinically"
          description="Objective clinical metrics—pain severity, mobility and posture—assessed by physiotherapists and presented clearly."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 rounded-[2rem] border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-secondary/70 to-background p-6">
              <Ring value={88} label="Recovery Index" />
              <div className="flex items-center gap-1.5 rounded-full bg-[#91ddcf]/15 px-3 py-1 text-xs font-semibold text-[#5ba99a]">
                <TrendingUp className="size-3.5" /> +12% this month
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-background p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-xl bg-secondary text-[#5ba99a]">
                      <m.icon className="size-4" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{m.tone}</span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1.5 text-sm font-medium text-foreground">{m.label}</div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-[#91ddcf]"
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
