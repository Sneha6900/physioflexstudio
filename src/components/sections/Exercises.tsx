import { motion } from "motion/react";
import { Clock, Flame, Play, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import exHip from "@/assets/ex-hip.jpg";
import exBack from "@/assets/ex-back.jpg";
import exShoulder from "@/assets/ex-shoulder.jpg";

const exercises = [
  {
    img: exHip,
    title: "Deep Hip Flexor Release",
    level: "Beginner",
    area: "Hip",
    duration: "8 min",
    benefit: "Improves hip mobility and reduces lower-body stiffness.",
  },
  {
    img: exShoulder,
    title: "Spinal Mobility Flow",
    level: "Intermediate",
    area: "Lower Back",
    duration: "12 min",
    benefit: "Restores spinal range of motion and eases back tension.",
  },
  {
    img: exShoulder,
    title: "Shoulder Band Activation",
    level: "Advanced",
    area: "Shoulder",
    duration: "10 min",
    benefit: "Builds shoulder stability and corrects posture.",
  },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-primary",
  Intermediate: "bg-chart-4/20 text-foreground",
  Advanced: "bg-charcoal text-offwhite",
};

export function Exercises() {
  return (
    <section id="exercises" className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Recovery programs"
          title="Guided exercises, beautifully delivered"
          description="Each routine is hand-built for your body — with clear targets, timing and benefits."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {exercises.map((e) => (
            <motion.article
              key={e.title}
              variants={itemVariants}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${levelColor[e.level]}`}
                >
                  {e.level}
                </span>
                <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-accent text-charcoal opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Play className="size-5 fill-charcoal" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.benefit}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Target className="size-4 text-primary" /> {e.area}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4 text-primary" /> {e.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="size-4 text-primary" /> {e.level}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>

        <div className="mt-12 text-center">
          <Link to="/programs">
            <Button variant="dark" size="xl" className="rounded-full">
              Explore all programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}