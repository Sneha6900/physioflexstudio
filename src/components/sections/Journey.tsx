import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BrainCircuit,
  CalendarCheck,
  Check,
  ClipboardList,
  HandHeart,
  LineChart,
  MapPin,
  Target,
  User,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BodySilhouette, bodyParts, type BodyPart } from "@/components/site/BodySilhouette";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  { n: 1, title: "Select Pain Area", icon: ClipboardList },
  { n: 2, title: "Describe Pain Details", icon: Activity },
  { n: 3, title: "Clinical Evaluation", icon: BrainCircuit },
  { n: 4, title: "Personalized Recovery Plan", icon: Target },
  { n: 5, title: "Choose Your Recovery Mode", icon: HandHeart },
  { n: 6, title: "Book Expert Assistance", icon: CalendarCheck },
  { n: 7, title: "Track Progress", icon: LineChart },
];

export function Journey() {
  const [active, setActive] = useState(0);
  const [part, setPart] = useState<BodyPart | null>("Lower Back");

  return (
    <section id="journey" className="surface-dark relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Your journey"
          title="From pain point to peak mobility"
          description="A guided, clinically-informed path that adapts at every step — explore how it works."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Stepper */}
          <div className="relative">
            <div className="absolute left-[1.35rem] top-3 bottom-3 w-px bg-border" />
            <div
              className="absolute left-[1.35rem] top-3 w-px bg-accent transition-all duration-500"
              style={{ height: `${(active / (steps.length - 1)) * 100}%` }}
            />
            <ul className="space-y-2">
              {steps.map((s, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => setActive(i)}
                      className={cn(
                        "group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all",
                        isActive ? "bg-background shadow-[var(--shadow-soft)]" : "hover:bg-background/60",
                      )}
                    >
                      <span
                        className={cn(
                          "z-10 grid size-11 shrink-0 place-items-center rounded-full border transition-all",
                          isActive
                            ? "border-accent bg-accent text-charcoal"
                            : isDone
                              ? "border-accent/60 bg-accent/15 text-accent"
                              : "border-border bg-muted text-muted-foreground",
                        )}
                      >
                        {isDone ? <Check className="size-5" /> : <s.icon className="size-5" />}
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                          Step {s.n}
                        </span>
                        <span
                          className={cn(
                            "block font-display text-base font-semibold",
                            isActive ? "text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {s.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panel */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <StepContent index={active} part={part} setPart={setPart} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="heroOutline"
                size="sm"
                className="rounded-full"
                disabled={active === 0}
                onClick={() => setActive((a) => Math.max(0, a - 1))}
              >
                Back
              </Button>
              <span className="text-xs text-muted-foreground">
                {active + 1} / {steps.length}
              </span>
              <Button
                variant="hero"
                size="sm"
                className="rounded-full"
                disabled={active === steps.length - 1}
                onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button variant="hero" size="xl" className="rounded-full" asChild>
            <Link to="/physio/login">Login</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function StepContent({
  index,
  part,
  setPart,
}: {
  index: number;
  part: BodyPart | null;
  setPart: (p: BodyPart) => void;
}) {
  if (index === 0) {
    return (
      <Panel title="Where does it hurt?">
        <div className="grid items-center gap-6 sm:grid-cols-[140px_1fr]">
          <div className="mx-auto h-64 w-32">
            <BodySilhouette selected={part} onSelect={setPart} />
          </div>
          <div className="flex flex-wrap gap-2 self-start">
            {bodyParts.map((b) => (
              <button
                key={b}
                onClick={() => setPart(b)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  part === b
                    ? "border-accent bg-accent text-charcoal"
                    : "border-border bg-background text-muted-foreground hover:border-accent/50",
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </Panel>
    );
  }

  if (index === 1) {
    const metrics = [
      { label: "Pain intensity", value: 70, tag: "Moderate" },
      { label: "Stiffness level", value: 55, tag: "Medium" },
      { label: "Mobility limitation", value: 40, tag: "Mild" },
    ];
    return (
      <Panel title="Tell us how it feels">
        <div className="space-y-5">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-semibold text-accent">{m.tag}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
          <div className="flex gap-3 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Duration:</span> 3+ weeks · worsens when
            sitting
          </div>
        </div>
      </Panel>
    );
  }

  if (index === 2) {
    const factors = [
      "Pain location",
      "Severity scoring",
      "Mobility restrictions",
      "Recovery requirements",
    ];
    return (
      <Panel title="Clinicians are reviewing your inputs">
        <div className="space-y-3">
          {factors.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-4"
            >
              <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="size-4" />
              </span>
              <span className="text-sm text-muted-foreground">{f}</span>
              <span className="ml-auto text-xs font-medium text-accent">Processed</span>
            </motion.div>
          ))}
        </div>
      </Panel>
    );
  }

  if (index === 3) {
    const plan = [
      "Recommended exercises",
      "Stretching routines",
      "Recovery suggestions",
      "Daily mobility goals",
    ];
    return (
      <Panel title="Your personalized recovery plan">
        <div className="grid gap-3 sm:grid-cols-2">
          {plan.map((p) => (
            <div
              key={p}
              className="rounded-2xl border border-border bg-muted/40 p-4 text-sm font-medium text-foreground"
            >
              <Target className="mb-2 size-5 text-accent" />
              {p}
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (index === 4) {
    const mode = {
      icon: HandHeart,
      title: "Assisted Recovery",
      for: "Designed for anyone who needs clinical supervision, post-surgery support, or expert guided rehabilitation.",
      points: ["Certified specialists", "Hands-on guidance", "Safe supervised sessions"],
    };
    return (
      <Panel title="Choose your recovery mode">
        <div className="grid gap-4 sm:grid-cols-1">
          <div className="rounded-2xl border border-border bg-muted/40 p-5 transition-colors hover:border-accent/50">
            <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <mode.icon className="size-5" />
            </span>
            <h4 className="mt-4 font-display text-lg font-bold text-foreground">{mode.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{mode.for}</p>
            <ul className="mt-3 space-y-2">
              {mode.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-accent" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    );
  }

  if (index === 5) {
    return (
      <Panel title="Book expert assistance">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field icon={MapPin} label="Studio" value="Indiranagar, Bangalore" />
          <Field icon={User} label="Specialist" value="Dr. Arjun Mehta" />
          <Field icon={CalendarCheck} label="Date" value="Sat, 28 Jun" />
          <Field icon={Activity} label="Time slot" value="10:30 AM" />
        </div>
        <Button variant="hero" className="mt-5 w-full rounded-full">
          Confirm Booking
        </Button>
      </Panel>
    );
  }

  const stats = [
    { label: "Pain reduction", value: "−64%" },
    { label: "Mobility improvement", value: "+38%" },
    { label: "Flexibility growth", value: "+27%" },
    { label: "Posture correction", value: "+45%" },
  ];
  return (
    <Panel title="Track your progress">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-muted/40 p-5">
            <div className="font-display text-3xl font-bold text-accent">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-4">
      <span className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent">
        <Icon className="size-4" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}