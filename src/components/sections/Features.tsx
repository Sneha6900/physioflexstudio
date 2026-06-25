import { motion } from "motion/react";
import { Activity, BrainCircuit, CalendarHeart, Dumbbell, Gauge, ScanLine } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

type PreviewType = "body-map" | "report" | "stretch" | "calendar" | "ring" | "chart";

const cards: {
  icon: typeof ScanLine;
  title: string;
  desc: string;
  className: string;
  feature?: boolean;
  preview: PreviewType;
}[] = [
  {
    icon: ScanLine,
    title: "Pain Assessment",
    desc: "Pinpoint discomfort on an interactive body map and capture intensity, duration and stiffness.",
    className: "md:col-span-2",
    feature: true,
    preview: "body-map",
  },
  {
    icon: BrainCircuit,
    title: "Clinical Assessment & Plan",
    desc: "Physiotherapists interpret pain, posture and mobility to design a safe, personalized plan.",
    className: "md:col-span-1",
    preview: "report",
  },
  {
    icon: Dumbbell,
    title: "Tailored Assisted Stretching",
    desc: "Hands-on stretches supervised by licensed physiotherapists to improve flexibility and posture.",
    className: "md:col-span-1",
    preview: "stretch",
  },
  {
    icon: CalendarHeart,
    title: "Physiotherapist-Supervised Sessions",
    desc: "Book one-on-one assisted stretching sessions for safe pain relief and recovery.",
    className: "md:col-span-2",
    feature: true,
    preview: "calendar",
  },
  {
    icon: Gauge,
    title: "Mobility Tracking",
    desc: "Quantify range of motion and flexibility gains over time.",
    className: "md:col-span-1",
    preview: "ring",
  },
  {
    icon: Activity,
    title: "Progress Reports",
    desc: "Clear, weekly recovery reports that show exactly how far you've come.",
    className: "md:col-span-2",
    preview: "chart",
  },
];

function CardPreview({ type }: { type: PreviewType }) {
  const shell =
    "mt-4 flex h-[5.5rem] items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/80 to-background";

  if (type === "body-map") {
    return (
      <div className={cn(shell, "relative px-4")}>
        <svg viewBox="0 0 60 100" className="h-16 text-muted-foreground/25" aria-hidden>
          <ellipse cx="30" cy="14" rx="9" ry="10" fill="currentColor" />
          <rect x="22" y="24" width="16" height="28" rx="6" fill="currentColor" />
          <rect x="14" y="28" width="8" height="22" rx="4" fill="currentColor" />
          <rect x="38" y="28" width="8" height="22" rx="4" fill="currentColor" />
          <rect x="20" y="52" width="9" height="30" rx="4" fill="currentColor" />
          <rect x="31" y="52" width="9" height="30" rx="4" fill="currentColor" />
        </svg>
        <span className="absolute left-1/2 top-[52%] size-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-accent/25" />
        <span className="type-caption absolute bottom-2 right-3 rounded-full bg-background/90 px-2 py-0.5 font-semibold text-forest">
          Lower Back
        </span>
      </div>
    );
  }

  if (type === "report") {
    return (
      <div className={cn(shell, "flex-col gap-1.5 px-4 py-3")}>
        {[
          { label: "Mobility", w: "72%" },
          { label: "Pain level", w: "38%" },
          { label: "Posture", w: "61%" },
        ].map((row) => (
          <div key={row.label} className="flex w-full items-center gap-2">
            <span className="type-caption w-14 shrink-0 text-muted-foreground">{row.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent" style={{ width: row.w }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "stretch") {
    return (
      <div className={cn(shell, "gap-3 px-4")}>
        <div className="flex size-10 items-end justify-center rounded-xl bg-accent/15">
          <div className="mb-1 h-5 w-5 rounded-full bg-accent/40" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-1.5 w-4/5 rounded-full bg-muted" />
          <span className="type-caption inline-block rounded-full bg-[#e8c5e5]/40 px-2 py-0.5 font-semibold text-foreground">
            Guided stretch
          </span>
        </div>
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className={cn(shell, "grid grid-cols-7 gap-1 p-3")}>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-md",
              i === 9 ? "bg-accent ring-2 ring-accent/30" : "bg-muted/70",
            )}
          />
        ))}
      </div>
    );
  }

  if (type === "ring") {
    return (
      <div className={cn(shell, "relative")}>
        <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r="26" fill="none" stroke="var(--muted)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="163.36"
            strokeDashoffset="32.67"
          />
        </svg>
        <span className="absolute type-caption font-bold text-foreground">82%</span>
      </div>
    );
  }

  return (
    <div className={cn(shell, "items-end gap-1 px-4 pb-3 pt-4")}>
      {[35, 48, 42, 62, 58, 74, 88].map((h, i) => (
        <div
          key={i}
          className="w-full max-w-[1.25rem] rounded-t-md bg-gradient-to-t from-forest to-accent"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-background">
      <div className="section-shell">
        <SectionHeading
          eyebrow="The platform"
          title={<>Everything your recovery needs, in one place</>}
          description="A complete toolkit that turns pain into a precise, measurable recovery plan."
        />

        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={itemVariants}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[2rem] border p-5 transition-all duration-300 sm:p-6",
                c.feature
                  ? "surface-dark border-border shadow-[var(--shadow-soft)] hover:border-accent/35"
                  : "card-premium bg-card hover:border-accent/30",
                c.className,
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl",
                    c.feature ? "bg-primary/10 text-primary" : "bg-accent/12 text-forest",
                  )}
                >
                  <c.icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="type-card-title text-foreground">{c.title}</h3>
                  <p className="type-body mt-1 text-pretty text-muted-foreground">{c.desc}</p>
                </div>
              </div>
              <CardPreview type={c.preview} />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
