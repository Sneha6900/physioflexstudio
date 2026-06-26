import { motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  LineChart,
  Sparkles,
  Target,
} from "lucide-react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { AnatomyInfographic } from "@/components/showcase/AnatomyInfographic";

const appSteps = [
  {
    step: "Step 1",
    title: "Pain Assessment",
    description:
      "Patients identify discomfort areas using the PhysioFlex mobile application.",
    icon: Activity,
  },
  {
    step: "Step 2",
    title: "Clinical Review",
    description:
      "Licensed physiotherapists review symptoms with mobility indicators.",
    icon: BrainCircuit,
  },
  {
    step: "Step 3",
    title: "Recovery Planning",
    description:
      "A personalized rehabilitation program is generated for each patient.",
    icon: Target,
  },
  {
    step: "Step 4",
    title: "Progress Monitoring",
    description:
      "Recovery metrics and improvements are tracked inside the application.",
    icon: LineChart,
  },
] as const;

function StepCard({ item }: { item: (typeof appSteps)[number] }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="app-journey-step group glass-card relative rounded-2xl transition-all duration-300 lg:hover:-translate-y-0.5 lg:hover:border-accent/28 lg:hover:shadow-[var(--shadow-card)]"
    >
      <div className="app-journey-step-inner relative flex items-center gap-2.5">
        <span className="brand-icon-surface inline-grid size-8 shrink-0 place-items-center rounded-lg">
          <Icon className="size-4" strokeWidth={1.65} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="type-label font-semibold uppercase tracking-[0.12em] text-forest">
            {item.step}
          </p>
          <h3 className="type-card-title mt-0.5 font-bold text-foreground">
            {item.title}
          </h3>
          <p className="type-body mt-0.5 text-pretty text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="app-journey-section relative overflow-x-clip bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,color-mix(in_srgb,var(--accent)_10%,transparent)_0%,transparent_50%),radial-gradient(ellipse_at_82%_100%,color-mix(in_srgb,var(--forest)_6%,transparent)_0%,transparent_45%)]"
        aria-hidden
      />

      <div className="app-journey-shell relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="app-journey-grid">
          <Reveal className="app-journey-header-wrap">
            <div className="app-journey-header text-center lg:text-left">
              <span className="type-badge brand-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.16em]">
                <Sparkles className="size-3" />
                How the app works
              </span>
              <h2 className="type-section mt-2 text-balance font-bold tracking-tight text-foreground sm:mt-2.5">
                From pain assessment to measurable recovery
              </h2>
              <p className="type-body mx-auto mt-2 max-w-xl text-muted-foreground sm:mt-2.5 lg:mx-0">
                PhysioFlex guides patients through clinical assessment, expert review, and ongoing
                progress — all inside one thoughtfully designed mobile application.
              </p>
            </div>
          </Reveal>

          <div className="app-journey-visual flex min-w-0 items-center justify-center">
            <AnatomyInfographic />
          </div>

          <Stagger className="app-journey-steps flex flex-col gap-1.5 sm:gap-2">
            {appSteps.map((item) => (
              <StepCard key={item.title} item={item} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
