import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BrainCircuit,
  CalendarCheck,
  ClipboardList,
  Dumbbell,
  QrCode,
  Route,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Tell Us Your Pain",
    description:
      "Open the app and answer a few AI-powered questions about your pain and mobility.",
    icon: ClipboardList,
  },
  {
    title: "Get Your Recovery Plan",
    description:
      "AI analyzes your responses and recommends exercises plus the best physiotherapist for you.",
    icon: BrainCircuit,
  },
  {
    title: "Book Your Session",
    description:
      "Reserve a session with your recommended physiotherapist at your preferred PhysioFlex Studio.",
    icon: CalendarCheck,
  },
  {
    title: "Visit & Scan QR",
    description:
      "At the studio, scan a QR code to check in and load your personalized exercise program.",
    icon: QrCode,
  },
  {
    title: "Train With Your Physiotherapist",
    description:
      "Your physiotherapist guides you through recommended exercises while tracking progress.",
    icon: Dumbbell,
  },
  {
    title: "Recovery Complete",
    description:
      "Your session is saved and AI updates future recommendations based on your improvement.",
    icon: BadgeCheck,
  },
] as const;

function StepIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="brand-icon-surface relative z-10 grid size-11 place-items-center rounded-2xl shadow-[var(--shadow-soft)] sm:size-12">
      <Icon className="size-5" strokeWidth={1.65} />
    </span>
  );
}

function DesktopStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <motion.div variants={itemVariants} className="group relative min-w-0 flex-1" role="listitem">
      <div
        className={cn(
          "glass-card relative flex h-full flex-col items-center rounded-[1.5rem] border border-border/80 px-3 pb-5 pt-8 text-center",
          "transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:border-accent/35 lg:hover:shadow-[var(--shadow-card)]",
        )}
      >
        <span className="absolute -top-3.5 left-1/2 z-20 grid size-7 -translate-x-1/2 place-items-center rounded-full border border-accent/25 bg-elevated type-label font-bold text-forest shadow-[var(--shadow-soft)]">
          {index + 1}
        </span>

        <StepIcon icon={step.icon} />

        <h3 className="type-card-title mt-3 font-bold leading-snug tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="type-caption mt-1.5 text-pretty text-muted-foreground">{step.description}</p>
      </div>
    </motion.div>
  );
}

function MobileStep({
  step,
  index,
  total,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <motion.div variants={itemVariants} className="relative flex gap-4" role="listitem">
      <div className="flex flex-col items-center">
        <span className="relative z-10 grid size-8 place-items-center rounded-full border border-accent/25 bg-elevated type-label font-bold text-forest shadow-[var(--shadow-soft)]">
          {index + 1}
        </span>
        {!isLast && (
          <div
            className="mt-2 min-h-[2.5rem] w-px flex-1 bg-gradient-to-b from-accent/70 via-border to-border"
            aria-hidden
          />
        )}
      </div>

      <div
        className={cn(
          "glass-card mb-4 flex min-w-0 flex-1 gap-3 rounded-2xl border border-border/80 p-4",
          !isLast && "mb-5",
        )}
      >
        <StepIcon icon={step.icon} />
        <div className="min-w-0 flex-1">
          <h3 className="type-card-title font-bold leading-snug text-foreground">{step.title}</h3>
          <p className="type-caption mt-1 text-pretty text-muted-foreground">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="platform-journey-section relative overflow-x-clip bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="How it works"
          title={<>Your path from pain to recovery</>}
          description="Six simple steps — from AI assessment to in-studio care — designed to make recovery clear, personal, and effortless."
        />

        <div className="relative mt-10 hidden lg:block xl:mt-12">
          <div
            className="pointer-events-none absolute left-[8.3%] right-[8.3%] top-[3.25rem] h-0.5 rounded-full bg-gradient-to-r from-accent/80 via-forest/80 to-accent/80"
            aria-hidden
          />

          <Stagger className="relative flex list-none gap-4 xl:gap-5" role="list">
            {steps.map((step, index) => (
              <DesktopStep key={step.title} step={step} index={index} />
            ))}
          </Stagger>
        </div>

        <Stagger className="relative mt-8 list-none lg:hidden" role="list">
          {steps.map((step, index) => (
            <MobileStep key={step.title} step={step} index={index} total={steps.length} />
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-8 flex justify-center lg:mt-10">
          <span className="brand-badge type-label inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold uppercase tracking-[0.14em]">
            <Route className="size-3.5" />
            End-to-end PhysioFlex journey
          </span>
        </Reveal>
      </div>
    </section>
  );
}
