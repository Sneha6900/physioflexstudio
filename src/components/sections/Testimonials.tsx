import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";

const testimonials = [
  {
    quote:
      "I'd given up on my lower back. Eight weeks on PhysioFlex and I'm back to lifting — the AI plan actually adapted as I improved.",
    name: "Rohan Desai",
    role: "Marathon runner",
    rating: 5,
  },
  {
    quote:
      "After my knee surgery the assisted sessions were everything. My specialist made each movement feel safe and intentional.",
    name: "Lakshmi Menon",
    role: "Post-surgery recovery",
    rating: 5,
  },
  {
    quote:
      "The progress dashboard kept me honest. Watching my mobility score climb every week was strangely addictive.",
    name: "Aditya Verma",
    role: "Software engineer",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Real recoveries"
          title="Trusted by people who move for a living"
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={itemVariants}
              className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid size-11 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
}