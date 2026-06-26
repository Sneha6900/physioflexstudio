import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Award, Check, DoorOpen, HeartHandshake, Sparkles, Zap } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { studioWhyChoose, type StudioWhyChooseItem } from "@/lib/studios";
import { cn } from "@/lib/utils";

type IllustrationKind = "clinic" | "consultation" | "expert" | "lounge" | "equipment";

const whyChooseConfig: Record<
  string,
  {
    icon: LucideIcon;
    accent: string;
    illustration: IllustrationKind;
  }
> = {
  "Modern Recovery Spaces": {
    icon: Sparkles,
    accent: "from-[#91ddcf]/14 to-[#91ddcf]/3",
    illustration: "clinic",
  },
  "Private Consultation Rooms": {
    icon: DoorOpen,
    accent: "from-[#e8c5e5]/22 to-[#e8c5e5]/5",
    illustration: "consultation",
  },
  "Certified Physiotherapists": {
    icon: Award,
    accent: "from-[#91ddcf]/12 to-transparent",
    illustration: "expert",
  },
  "Comfortable Environment": {
    icon: HeartHandshake,
    accent: "from-[#f19ed2]/14 to-transparent",
    illustration: "lounge",
  },
  "State-of-the-Art Equipment": {
    icon: Zap,
    accent: "from-[#5ba99a]/12 to-transparent",
    illustration: "equipment",
  },
};

function BentoIllustration({ kind }: { kind: IllustrationKind }) {
  const paths: Record<IllustrationKind, ReactNode> = {
    clinic: (
      <>
        <rect x="12" y="28" width="56" height="40" rx="4" />
        <path d="M20 68V48h16v20M44 68V40h12v28" />
        <circle cx="52" cy="32" r="6" />
      </>
    ),
    consultation: (
      <>
        <rect x="16" y="24" width="48" height="44" rx="6" />
        <path d="M28 44h24M28 52h16" />
        <circle cx="56" cy="36" r="4" />
      </>
    ),
    expert: (
      <>
        <circle cx="40" cy="30" r="10" />
        <path d="M24 68c0-12 8-18 16-18s16 6 16 18" />
        <path d="M58 36l8 6-8 6" />
      </>
    ),
    lounge: (
      <>
        <path d="M16 52h48v16H16z" />
        <path d="M20 52V40c0-6 6-10 12-10h16c6 0 12 4 12 10v12" />
        <path d="M32 68v-8M48 68v-8" />
      </>
    ),
    equipment: (
      <>
        <rect x="20" y="36" width="40" height="28" rx="4" />
        <path d="M28 36V28h24v8" />
        <circle cx="40" cy="50" r="8" />
        <path d="M36 50h8" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 80 80"
      className="studio-bento-illustration pointer-events-none absolute bottom-0 right-0 size-[4.25rem] text-forest opacity-[0.08] sm:size-[4.75rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[kind]}
    </svg>
  );
}

function WhyChooseCard({ item }: { item: StudioWhyChooseItem }) {
  const config = whyChooseConfig[item.title] ?? {
    icon: Sparkles,
    accent: "from-secondary/30 to-transparent",
    illustration: "clinic" as IllustrationKind,
  };
  const Icon = config.icon;

  return (
    <motion.article variants={itemVariants} className="studio-bento-card group relative h-full min-w-0">
      <div
        className={cn(
          "studio-bento-card-inner relative flex h-full flex-col rounded-[1.75rem] border border-[color:var(--glass-border)] p-5 transition-all duration-400 ease-out sm:rounded-[2rem] sm:p-6",
          "lg:hover:-translate-y-1 lg:hover:border-accent/30",
          "lg:hover:shadow-[0_16px_40px_-24px_rgba(91,169,154,0.3)]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br opacity-75 transition-opacity duration-400 group-hover:opacity-100",
            config.accent,
          )}
          aria-hidden
        />
        <BentoIllustration kind={config.illustration} />

        <div className="relative flex min-h-0 flex-1 flex-col">
          <span className="studio-bento-icon brand-icon-surface inline-grid size-10 place-items-center rounded-full shadow-[var(--shadow-soft)] backdrop-blur-md">
            <Icon className="size-5" strokeWidth={1.6} />
          </span>

          <h4 className="type-card-title mt-3 font-bold leading-snug tracking-tight text-foreground">
            {item.title}
          </h4>

          <p className="type-body mt-1.5 flex-1 text-pretty text-muted-foreground">
            {item.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {item.chips.map((chip) => (
              <li
                key={chip}
                className="studio-bento-chip glass-card type-badge inline-flex items-center gap-0.5 rounded-full border border-accent/12 px-2 py-0.5 font-medium leading-tight text-forest"
              >
                <Check className="size-2.5 shrink-0 opacity-65" strokeWidth={2.5} />
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export function StudioWhyChoose() {
  return (
    <section className="studio-bento-section relative mt-14 py-14 sm:mt-16 sm:py-16 lg:mt-20 lg:py-20" aria-labelledby="studio-why-heading">
      <div
        className="studio-bento-ambient pointer-events-none absolute inset-0"
        aria-hidden
      />

      <Reveal>
        <div className="studio-bento-header relative mx-auto max-w-2xl text-center">
          <span className="studio-bento-badge brand-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.16em]">
            <Sparkles className="size-3" />
            Studio Experience
          </span>
          <h3
            id="studio-why-heading"
            className="studio-bento-title mt-3 text-balance font-bold tracking-tight text-foreground"
          >
            Why Choose Our Studios?
          </h3>
          <p className="studio-bento-desc mx-auto mt-3 max-w-lg text-muted-foreground">
            Every PhysioFlex Studio location is built for people who want professional care in a
            space that feels warm, modern, and trustworthy.
          </p>
        </div>
      </Reveal>

      <Stagger className="studio-bento-grid relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:grid-cols-6 lg:gap-8">
        {studioWhyChoose.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "flex h-full min-w-0 lg:col-span-2",
              index === 3 && "lg:col-start-2",
            )}
          >
            <WhyChooseCard item={item} />
          </div>
        ))}
      </Stagger>
    </section>
  );
}
