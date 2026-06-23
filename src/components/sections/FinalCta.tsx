import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] surface-dark border border-border px-6 py-20 text-center shadow-[var(--shadow-soft)] sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(0.49 0.082 168) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.49 0.082 168) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-6xl"
          >
            Move Better. <span className="ink-underline">Feel Better.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
          >
            Clinical assessment, hands-on assisted stretching, and physiotherapist supervision —
            start with a consultation focused on pain relief and mobility improvement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button variant="hero" size="xl" className="group rounded-full" asChild>
              <Link to="/specialists">
                Talk to a specialist
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="rounded-full" asChild>
              <Link to="/physio/login">Physio login</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
