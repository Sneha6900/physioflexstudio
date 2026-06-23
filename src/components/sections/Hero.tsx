import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BodySilhouette, type BodyPart } from "@/components/site/BodySilhouette";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const [part, setPart] = useState<BodyPart | null>("Lower Back");

  return (
    <section id="top" className="relative overflow-hidden surface-dark">
      {/* faint editorial grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-40">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Mobility &amp; recovery, intelligently guided
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
          >
            Move Better.
            <br />
            <span className="ink-underline">Recover Faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/65"
          >
            AI-powered mobility assessment, personalized recovery plans, guided exercises,
            expert-assisted recovery sessions, and measurable progress tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/assessment">
                Start Assessment
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#exercises">Explore Recovery Programs</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex gap-8"
          >
            {[
              { v: "50k+", l: "Recoveries guided" },
              { v: "4.9★", l: "Average rating" },
              { v: "92%", l: "Mobility improved" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-offwhite">{s.v}</div>
                <div className="text-xs text-white/50">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* interactive panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <img
              src={heroImg}
              alt="Athlete performing a mobility stretch"
              width={1024}
              height={1536}
              className="h-full max-h-[34rem] w-full rounded-[1.5rem] object-cover"
            />
            <div className="flex flex-col justify-between rounded-[1.5rem] bg-charcoal/60 p-4">
              <div className="relative mx-auto h-72 w-full">
                <BodySilhouette selected={part} onSelect={setPart} />
              </div>
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <div className="text-xs uppercase tracking-widest text-white/45">Selected area</div>
                <div className="mt-1 font-display text-xl font-bold text-accent">
                  {part ?? "Tap a point"}
                </div>
                <p className="mt-1 text-xs text-white/50">Hover or tap a point to begin.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}