import { Brain, ClipboardCheck, HandHeart, LineChart } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { motion } from "motion/react";

const items = [
  { icon: ClipboardCheck, label: "Personalized Recovery Plans" },
  { icon: Brain, label: "AI Mobility Analysis" },
  { icon: HandHeart, label: "Expert Assisted Sessions" },
  { icon: LineChart, label: "Progress Tracking" },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            One seamless recovery ecosystem
          </p>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((it) => (
            <motion.div
              key={it.label}
              variants={itemVariants}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <it.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold leading-tight text-foreground">
                {it.label}
              </span>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}