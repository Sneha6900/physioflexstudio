import { Brain, ClipboardCheck, HandHeart, LineChart } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { motion } from "motion/react";

const items = [
  { icon: ClipboardCheck, label: "Personalized Clinical Plans" },
  { icon: Brain, label: "Clinician Mobility Assessment" },
  { icon: HandHeart, label: "Expert Assisted Sessions" },
  { icon: LineChart, label: "Progress Tracking" },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Reveal>
          <p className="type-label text-center font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            One seamless care ecosystem
          </p>
        </Reveal>
        <Stagger className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((it) => (
            <motion.div
              key={it.label}
              variants={itemVariants}
              className="flex items-center gap-2.5 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <it.icon className="size-4" />
              </span>
              <span className="type-caption font-semibold leading-tight text-foreground">
                {it.label}
              </span>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
