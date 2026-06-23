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
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.49 0.082 168) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.49 0.082 168) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-40">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Physiotherapist-led assisted stretching & mobility
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Move Better.
            <br />
            <span className="ink-underline">Feel Better.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Clinically-led mobility assessment, physiotherapist-supervised assisted stretching,
            posture correction, and measurable mobility gains focused on pain relief and flexibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/physio/login">
                Login
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#exercises">Explore Recovery Programs</a>
            </Button>
          </motion.div>

          {/* Stats removed per product decision */}
        </div>

        {/* interactive panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
            <img
              src={heroImg}
              alt="Client receiving physiotherapist-assisted stretch"
              width={1024}
              height={1536}
              className="h-full max-h-[34rem] w-full rounded-[1.5rem] object-cover"
            />
            <div className="flex flex-col justify-between rounded-[1.5rem] bg-muted/50 p-4">
              <div className="relative mx-auto h-72 w-full">
                <BodySilhouette selected={part} onSelect={setPart} />
              </div>
              <div className="rounded-2xl bg-background p-4 text-center shadow-[var(--shadow-soft)]">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected area</div>
                <div className="mt-1 font-display text-xl font-bold text-primary">
                  {part ?? "Tap a point"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Hover or tap a point to begin.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
