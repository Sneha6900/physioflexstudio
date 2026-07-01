import { motion } from "motion/react";
import { Clock, ShieldCheck, Target } from "lucide-react";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { homeRecoveryPrograms } from "@/lib/recovery-programs";

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/20 text-forest",
  Intermediate: "bg-[#e8c5e5]/40 text-foreground",
  Advanced: "bg-primary/15 text-primary",
};

export function Exercises() {
  return (
    <section id="exercises" className="bg-secondary/40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Programs"
          title="Physiotherapy programs for every stage of healing"
          description="Therapist-guided routines for all ages — focused on mobility, relief, and confident progress, not gym workouts."
        />

        <Stagger className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {homeRecoveryPrograms.map((e) => (
            <motion.article
              key={e.title}
              variants={itemVariants}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative h-48 shrink-0 overflow-hidden bg-gradient-to-br from-primary/8 to-accent/8 sm:h-52">
                <img
                   src={e.img}
                   alt={`${e.title} — physiotherapist-guided session`}
                  loading="lazy"
                  className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                <span
                  className={`type-badge absolute left-3 top-3 rounded-full px-2.5 py-0.5 font-semibold backdrop-blur-sm ${levelColor[e.level]}`}
                >
                  {e.level}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <h3 className="type-card-title text-foreground">{e.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {e.benefit}
                </p>
                <div className="program-meta-row mt-4 rounded-xl border border-border bg-secondary/40">
                  <div className="program-meta-item">
                    <Target className="program-meta-icon mx-auto text-forest" />
                    <p className="program-meta-value truncate" title={e.area}>
                      {e.area}
                    </p>
                    <p className="program-meta-label">Focus</p>
                  </div>
                  <div className="program-meta-item">
                    <Clock className="program-meta-icon mx-auto text-forest" />
                    <p className="program-meta-value truncate" title={e.duration}>
                      {e.duration}
                    </p>
                    <p className="program-meta-label">Duration</p>
                  </div>
                  <div className="program-meta-item">
                    <ShieldCheck className="program-meta-icon mx-auto text-forest" />
                    <p className="program-meta-value">Guided</p>
                    <p className="program-meta-label">Care</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>

        <div className="mt-8 text-center">
          <LeavingHomeLink to="/programs" homeSection="exercises">
            <Button variant="dark" size="lg" className="rounded-full">
              Explore all programs
            </Button>
          </LeavingHomeLink>
        </div>
      </div>
    </section>
  );
}
