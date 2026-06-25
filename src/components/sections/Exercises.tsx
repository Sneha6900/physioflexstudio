import { motion } from "motion/react";
import { Clock, ShieldCheck, Target } from "lucide-react";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { homeRecoveryPrograms } from "@/lib/recovery-programs";

const levelColor: Record<string, string> = {
  Beginner: "bg-[#91ddcf]/20 text-[#5ba99a]",
  Intermediate: "bg-[#e8c5e5]/40 text-foreground",
  Advanced: "bg-primary/15 text-primary",
};

export function Exercises() {
  return (
    <section id="exercises" className="bg-secondary/40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Recovery programs"
          title="Physiotherapy programs for every stage of healing"
          description="Therapist-guided routines for adults 40+ — focused on mobility, pain relief, and confident recovery, not gym workouts."
        />

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {homeRecoveryPrograms.map((e) => (
            <motion.article
              key={e.title}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/8 to-accent/8 sm:h-52">
                <img
                  src={e.img}
                  alt={`${e.title} — physiotherapist-guided recovery session`}
                  loading="lazy"
                  className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold backdrop-blur-sm ${levelColor[e.level]}`}
                >
                  {e.level}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="type-card-title text-foreground">{e.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.benefit}</p>
                <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl border border-border bg-secondary/40 p-2.5 text-center sm:grid-cols-3">
                  <div>
                    <Target className="mx-auto size-3.5 text-[#5ba99a]" />
                    <p className="mt-1 text-[0.65rem] font-semibold text-foreground">{e.area}</p>
                    <p className="text-[0.6rem] text-muted-foreground">Focus</p>
                  </div>
                  <div>
                    <Clock className="mx-auto size-3.5 text-[#5ba99a]" />
                    <p className="mt-1 text-[0.65rem] font-semibold text-foreground">{e.duration}</p>
                    <p className="text-[0.6rem] text-muted-foreground">Duration</p>
                  </div>
                  <div>
                    <ShieldCheck className="mx-auto size-3.5 text-[#5ba99a]" />
                    <p className="mt-1 text-[0.65rem] font-semibold text-foreground">Guided</p>
                    <p className="text-[0.6rem] text-muted-foreground">Care</p>
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
