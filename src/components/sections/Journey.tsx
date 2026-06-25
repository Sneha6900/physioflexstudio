import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BrainCircuit,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardList,
  HandHeart,
  LineChart,
  Lock,
  MapPin,
  Target,
  User,
} from "lucide-react";
import { PainAreaSelector } from "@/components/site/PainAreaSelector";
import { Button } from "@/components/ui/button";
import type { BodyPart } from "@/lib/journey-body";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: 1,
    title: "Select Pain Area",
    description: "Tell us where you feel discomfort.",
    icon: ClipboardList,
  },
  {
    n: 2,
    title: "Describe Your Symptoms",
    description: "Help us understand your condition.",
    icon: Activity,
  },
  {
    n: 3,
    title: "Expert Evaluation",
    description: "Our specialists review your assessment.",
    icon: BrainCircuit,
  },
  {
    n: 4,
    title: "Personalized Recovery Plan",
    description: "Receive a tailored treatment roadmap.",
    icon: Target,
  },
  {
    n: 5,
    title: "Choose Your Recovery Mode",
    description: "Select guided or assisted recovery.",
    icon: HandHeart,
  },
  {
    n: 6,
    title: "Book Expert Assistance",
    description: "Schedule with a licensed specialist.",
    icon: CalendarCheck,
  },
  {
    n: 7,
    title: "Track Progress",
    description: "Monitor gains week after week.",
    icon: LineChart,
  },
];

function StepButton({
  step,
  index,
  active,
  onSelect,
  compact = false,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const isDone = index < active;
  const isUpcoming = index > active;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex shrink-0 items-center gap-2 rounded-xl text-left transition-all duration-200",
        compact ? "min-w-[9.5rem] snap-start px-3 py-2.5" : "w-full px-2.5 py-2",
        active ? "bg-[#91ddcf]/15" : "hover:bg-background/60",
      )}
    >
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold",
          active && "border-[#91ddcf] bg-[#91ddcf] text-[#0f1f1c]",
          isDone && "border-[#91ddcf]/50 bg-[#91ddcf]/15 text-[#5ba99a]",
          isUpcoming && "border-border bg-muted/80 text-muted-foreground",
        )}
      >
        {isDone ? <Check className="size-3.5" /> : step.n}
      </span>
      <span
        className={cn(
          "min-w-0 text-sm font-medium leading-snug",
          compact && "line-clamp-2",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {step.title}
      </span>
    </button>
  );
}

export function Journey() {
  const [active, setActive] = useState(0);
  const [parts, setParts] = useState<BodyPart[]>(["Lower Back"]);

  const progressPct = Math.round(((active + 1) / steps.length) * 100);

  return (
    <section id="journey" className="relative snap-start bg-[#f7f9f2]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(145,221,207,0.12),transparent_55%)]" />

      <div className="section-shell relative !max-w-7xl">
        <div className="flex flex-col gap-4 sm:gap-5 lg:min-h-[calc(100svh-5rem)] lg:gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-xl">
              <p className="type-label font-semibold uppercase text-[#5ba99a]">Your journey</p>
              <h2 className="type-section mt-1 text-balance text-foreground">
                From pain point to peak mobility
              </h2>
            </div>
            <Button variant="heroOutline" size="sm" className="h-11 shrink-0 rounded-full px-4" asChild>
              <Link to="/physio/login">
                <Lock className="size-4" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile / tablet: horizontal step strip */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {steps.map((s, i) => (
                <StepButton
                  key={s.n}
                  step={s}
                  index={i}
                  active={i === active}
                  onSelect={() => setActive(i)}
                  compact
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-5">
            {/* Desktop timeline */}
            <div className="hidden min-h-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-2 shadow-[var(--shadow-soft)] lg:flex">
              <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto">
                {steps.map((s, i) => (
                  <li key={s.n}>
                    <StepButton
                      step={s}
                      index={i}
                      active={i === active}
                      onSelect={() => setActive(i)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive panel */}
            <div className="relative flex min-h-[min(28rem,70svh)] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[var(--shadow-card)] lg:min-h-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#91ddcf]/6 via-transparent to-[#e8c5e5]/8" />

              <div className="relative flex min-h-0 flex-1 flex-col p-3 sm:p-4">
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StepContent index={active} parts={parts} setParts={setParts} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 shrink-0 border-t border-border/80 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="type-label shrink-0 font-medium text-muted-foreground">
                      {active + 1}/{steps.length}
                    </span>
                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#91ddcf] to-[#5ba99a]"
                        initial={false}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                    <span className="type-label shrink-0 font-medium text-[#5ba99a]">
                      {progressPct}%
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <Button
                      variant="heroOutline"
                      size="sm"
                      className="h-11 min-w-[5.5rem] rounded-full px-4"
                      disabled={active === 0}
                      onClick={() => setActive((a) => Math.max(0, a - 1))}
                    >
                      Back
                    </Button>
                    <Button
                      variant="hero"
                      size="sm"
                      className="group h-11 min-w-[5.5rem] rounded-full px-4"
                      disabled={active === steps.length - 1}
                      onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                    >
                      Continue
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainAreaStep({
  parts,
  setParts,
}: {
  parts: BodyPart[];
  setParts: (p: BodyPart[]) => void;
}) {
  return <PainAreaSelector selected={parts} onChange={setParts} compact showHelp />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="type-subsection text-foreground">{title}</h3>
        {subtitle && <p className="type-body mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function StepContent({
  index,
  parts,
  setParts,
}: {
  index: number;
  parts: BodyPart[];
  setParts: (p: BodyPart[]) => void;
}) {
  if (index === 0) {
    return <PainAreaStep parts={parts} setParts={setParts} />;
  }

  if (index === 1) {
    const metrics = [
      { label: "Pain intensity", value: 70, tag: "Moderate" },
      { label: "Stiffness level", value: 55, tag: "Medium" },
      { label: "Mobility limitation", value: 40, tag: "Mild" },
    ];
    return (
      <Panel title="Tell us how it feels" subtitle="Describe severity, stiffness, and daily impact.">
        <div className="space-y-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="mb-1.5 flex flex-wrap justify-between gap-2 text-sm">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-semibold text-[#5ba99a]">{m.tag}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#91ddcf] to-[#5ba99a]"
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-muted-foreground">
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
      <Panel title="Clinicians are reviewing your inputs" subtitle="Evidence-based evaluation in progress.">
        <div className="space-y-2">
          {factors.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/20 px-3 py-2.5"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#91ddcf]/15 text-[#5ba99a]">
                <Check className="size-4" />
              </span>
              <span className="min-w-0 flex-1 text-sm text-muted-foreground">{f}</span>
              <span className="text-xs font-semibold uppercase text-[#5ba99a]">Processed</span>
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
        <div className="grid gap-2 sm:grid-cols-2">
          {plan.map((p) => (
            <div
              key={p}
              className="rounded-xl border border-border bg-muted/20 p-3 text-sm font-medium text-foreground"
            >
              <Target className="mb-1.5 size-4 text-[#5ba99a]" />
              {p}
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (index === 4) {
    return (
      <Panel title="Choose your recovery mode">
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <span className="grid size-10 place-items-center rounded-xl bg-[#91ddcf]/15 text-[#5ba99a]">
            <HandHeart className="size-5" />
          </span>
          <h4 className="mt-3 text-base font-semibold text-foreground">Assisted Recovery</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Clinical supervision, post-surgery support, or expert guided rehabilitation.
          </p>
          <ul className="mt-3 space-y-1.5">
            {["Certified specialists", "Hands-on guidance", "Safe supervised sessions"].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-3.5 shrink-0 text-[#5ba99a]" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    );
  }

  if (index === 5) {
    return (
      <Panel title="Book expert assistance">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field icon={MapPin} label="Studio" value="Indiranagar, Bangalore" />
          <Field icon={User} label="Specialist" value="Dr. Arjun Mehta" />
          <Field icon={CalendarCheck} label="Date" value="Sat, 28 Jun" />
          <Field icon={Activity} label="Time slot" value="10:30 AM" />
        </div>
        <Button variant="hero" className="mt-4 h-11 w-full rounded-full">
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
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-muted/20 p-3 sm:p-4">
            <div className="text-xl font-bold text-[#5ba99a] sm:text-2xl">{s.value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
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
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#91ddcf]/15 text-[#5ba99a]">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="truncate text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}
