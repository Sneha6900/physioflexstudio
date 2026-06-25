import {
  Activity,
  ArrowRight,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-physio-clinic.webp";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed Physiotherapists", detail: "Expert-led recovery" },
  { icon: ClipboardList, label: "Personalized Recovery Plans", detail: "Tailored to your needs" },
  { icon: Activity, label: "Joint & Mobility Specialists", detail: "Back, neck & joints" },
  { icon: BookOpen, label: "Evidence-Based Treatment", detail: "Clinically proven care" },
  { icon: Users, label: "Trusted By 5,000+ Clients", detail: "Adults 40 and over" },
];

function TrustPill({
  icon: Icon,
  label,
  detail,
  compact = false,
  className,
}: {
  icon: typeof ShieldCheck;
  label: string;
  detail: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hero-glass flex shrink-0 items-center gap-2 rounded-xl",
        compact ? "px-2.5 py-2" : "gap-2.5 rounded-2xl px-3 py-2.5 sm:px-3.5 sm:py-2.5",
        className,
      )}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-lg bg-white/10 text-[#91ddcf]",
          compact ? "size-7" : "size-8 sm:size-9 rounded-xl",
        )}
      >
        <Icon className={compact ? "size-3" : "size-3.5 sm:size-4"} />
      </span>
      <div className="min-w-0">
        <div
          className={cn(
            "font-bold leading-tight text-white",
            compact ? "text-[0.65rem] sm:text-xs" : "text-[0.7rem] sm:text-xs",
          )}
        >
          {label}
        </div>
        {!compact && (
          <div className="text-[0.6rem] text-white/55 sm:text-[0.65rem]">{detail}</div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] max-h-[100dvh] flex-col overflow-hidden supports-[height:100dvh]:min-h-[100dvh] supports-[height:100dvh]:max-h-[100dvh]"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <img
          src={heroBg}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full scale-105 object-cover object-[62%_center] sm:object-[68%_center] lg:object-[72%_center]"
        />
      </motion.div>

      {/* Gradient overlay — left text legibility, right shows clinic scene */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(90deg, rgba(6,10,9,0.92) 0%, rgba(6,10,9,0.72) 28%, rgba(6,10,9,0.35) 52%, rgba(6,10,9,0.12) 72%, rgba(6,10,9,0.38) 100%), linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_18%_50%,rgba(145,221,207,0.07)_0%,transparent_50%)]"
        aria-hidden
      />

      {/* Main layout — grid keeps everything inside one viewport */}
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center overflow-hidden px-4 pb-2 pt-[calc(var(--site-nav-height)+0.25rem)] sm:px-6 sm:pb-3 sm:pt-[calc(var(--site-nav-height)+0.5rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,15.5rem)] lg:items-center lg:gap-8 lg:pb-4 lg:pt-[calc(var(--site-nav-height)+0.75rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)]">
        {/* Left: headline + CTAs */}
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-glass mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:mb-3 sm:gap-2 sm:px-3 sm:py-1.5"
          >
            <span className="size-1.5 rounded-full bg-[#91ddcf]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-[0.65rem] sm:tracking-[0.2em]">
              Physiotherapy for Adults 40+
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="type-hero text-white"
          >
            <span className="hero-highlight-teal">Regain</span> Mobility.
            <br />
            Reduce <span className="hero-highlight-pink">Pain</span>.
            <br />
            <span className="hero-highlight-lilac">Enjoy</span> Life Again.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="type-body mt-2 max-w-md text-white/80 sm:mt-3"
          >
            Professional physiotherapy for neck pain, back pain, joint stiffness, and mobility
            limitations — designed for adults who want to move confidently again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:gap-2.5"
          >
            <LeavingHomeLink
              to="/assessment/start"
              className="group inline-flex h-11 min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#91ddcf] px-5 text-sm font-semibold text-[#0f1f1c] shadow-[0_10px_28px_-12px_rgba(145,221,207,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:px-6"
            >
              Book Your Assessment
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 sm:size-4" />
            </LeavingHomeLink>
            <a
              href="#exercises"
              className="inline-flex h-11 min-h-11 items-center justify-center rounded-full border border-white/35 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/55 hover:bg-white/10 sm:px-6"
            >
              Explore Recovery Programs
            </a>
          </motion.div>
        </div>

        {/* Desktop: compact trust column (no absolute positioning) */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="hidden min-h-0 flex-col gap-2 lg:flex"
        >
          {trustBadges.map((badge) => (
            <TrustPill key={badge.label} {...badge} />
          ))}
        </motion.div>
      </div>

      {/* Mobile & tablet: horizontal trust strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24 }}
        className="relative z-10 shrink-0 px-4 pb-3 sm:px-6 sm:pb-4 lg:hidden"
      >
        <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trustBadges.map((badge) => (
            <TrustPill key={badge.label} {...badge} compact />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
