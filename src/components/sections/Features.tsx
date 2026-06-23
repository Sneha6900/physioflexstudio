import { motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  CalendarHeart,
  Dumbbell,
  Gauge,
  ScanLine,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: ScanLine,
    title: "Pain Assessment",
    desc: "Pinpoint discomfort on an interactive body map and capture intensity, duration and stiffness for clinical review.",
    className: "md:col-span-2 md:row-span-1",
    feature: true,
  },
  {
    icon: BrainCircuit,
    title: "Clinical Assessment & Plan",
    desc: "Physiotherapists interpret pain, posture and mobility restrictions to design a safe, personalized plan.",
    className: "md:col-span-1",
  },
  {
    icon: Dumbbell,
    title: "Tailored Assisted Stretching",
    desc: "Hands-on assisted stretches and mobility work supervised by licensed physiotherapists to improve flexibility and posture.",
    className: "md:col-span-1",
  },
  {
    icon: CalendarHeart,
    title: "Physiotherapist-Supervised Sessions",
    desc: "Book one-on-one assisted stretching sessions delivered by qualified physiotherapists for safe pain relief and recovery.",
    className: "md:col-span-2",
    feature: true,
  },
  {
    icon: Gauge,
    title: "Mobility Tracking",
    desc: "Quantify range of motion and flexibility gains over time.",
    className: "md:col-span-1",
  },
  {
    icon: Activity,
    title: "Progress Reports",
    desc: "Clear, weekly recovery reports that show exactly how far you've come.",
    className: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="The platform"
          title={<>Everything your recovery needs, in one place</>}
          description="A complete toolkit that turns pain into a precise, measurable recovery plan."
        />

        <Stagger className="mt-14 grid auto-rows-[1fr] gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={itemVariants}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1",
                c.feature
                  ? "surface-dark border-border hover:border-accent/40 shadow-[var(--shadow-soft)]"
                  : "border-border bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)]",
                c.className,
              )}
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl",
                  c.feature ? "bg-primary/10 text-primary" : "bg-secondary text-primary",
                )}
              >
                <c.icon className="size-6" />
              </span>
              <h3
                className={cn(
                  "mt-5 font-display text-xl font-bold text-foreground",
                )}
              >
                {c.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed text-muted-foreground",
                )}
              >
                {c.desc}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}