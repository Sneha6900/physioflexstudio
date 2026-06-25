import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  MapPin,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import {
  expertStats,
  featuredSpecialists,
  getExpertFocusAreas,
  timeSlots,
} from "@/lib/expert-display";
import type { Specialist } from "@/lib/specialists";
import { studios } from "@/lib/studios";
import { cn } from "@/lib/utils";

function ExpertCard({
  expert,
  selected,
  onSelect,
  layout = "horizontal",
}: {
  expert: Specialist;
  selected: boolean;
  onSelect: () => void;
  layout?: "horizontal" | "vertical";
}) {
  const focusAreas = getExpertFocusAreas(expert.spec);
  const isHorizontal = layout === "horizontal";

  return (
    <motion.article
      layout
      className={cn(
        "group overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-soft)] transition-all duration-300",
        isHorizontal ? "flex w-full flex-col sm:flex-row" : "w-[min(88vw,340px)] shrink-0 snap-center",
        selected
          ? "border-[#91ddcf]/60 ring-2 ring-[#91ddcf]/25"
          : "border-border hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className={cn("text-left", isHorizontal ? "flex min-w-0 flex-1 flex-col sm:flex-row" : "w-full")}
      >
        <div
          className={cn(
            "relative shrink-0 self-stretch overflow-hidden bg-secondary",
            isHorizontal
              ? "aspect-[4/5] w-full sm:aspect-auto sm:w-[min(36%,10rem)] sm:min-h-[160px] md:w-[min(38%,11rem)]"
              : "h-[200px] w-full sm:h-[230px]",
          )}
        >
          <img
            src={expert.img}
            alt={expert.name}
            loading="lazy"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              isHorizontal ? "absolute inset-0 size-full" : "size-full",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[0.7rem] font-semibold text-white backdrop-blur-sm">
            <Star className="size-3 fill-[#91ddcf] text-[#91ddcf]" />
            {expert.rating}
            <span className="font-normal text-white/75">({expert.reviews})</span>
          </span>
        </div>

        <div className={cn("flex min-w-0 flex-1 flex-col", isHorizontal ? "p-3 sm:p-4" : "p-4")}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#5ba99a]">
            {expert.spec}
          </p>
          <h3 className="mt-0.5 text-base font-semibold leading-tight text-foreground">
            {expert.name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5">
              <Award className="size-3 text-primary" />
              {expert.years} yrs
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5">
              <CalendarCheck className="size-3 text-primary" />
              {expert.sessions.toLocaleString()}+ sessions
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5">
              <BadgeCheck className="size-3 text-primary" />
              {expert.available}
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1">
            {focusAreas.slice(0, 4).map((area) => (
              <span
                key={area}
                className="rounded-full border border-border bg-background px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground"
              >
                {area}
              </span>
            ))}
          </div>

          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {expert.bio}
          </p>
        </div>
      </button>

      <div
        className={cn(
          "flex shrink-0 gap-2 border-border p-3",
          isHorizontal
            ? "flex-row border-t sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:px-3"
            : "border-t",
        )}
      >
        <Button variant="outline" size="sm" className="h-11 min-h-11 flex-1 rounded-full text-xs sm:flex-none sm:text-sm" asChild>
          <LeavingHomeLink to="/specialists/$id" params={{ id: expert.id }} homeSection="experts">
            View Profile
          </LeavingHomeLink>
        </Button>
        <Button
          size="sm"
          type="button"
          className="h-11 min-h-11 flex-1 rounded-full bg-[#91ddcf] text-xs font-semibold text-[#0f1f1c] hover:bg-[#91ddcf]/90 sm:flex-none sm:text-sm"
          onClick={onSelect}
        >
          Book Session
        </Button>
      </div>
    </motion.article>
  );
}

function BookingPanel({
  expert,
  studioId,
  setStudioId,
  slot,
  setSlot,
}: {
  expert: Specialist;
  studioId: string;
  setStudioId: (id: string) => void;
  slot: string;
  setSlot: (s: string) => void;
}) {
  const nextSlot = timeSlots.find((t) => t.recommended);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border bg-gradient-to-br from-[#91ddcf]/15 via-background to-[#e8c5e5]/10 px-4 py-3">
        <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
          <Sparkles className="size-3" />
          Premium Scheduling
        </div>
        <h3 className="mt-1 text-sm font-semibold text-foreground">Book your recovery session</h3>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex gap-3 rounded-xl border border-border bg-secondary/50 p-3">
          <img
            src={expert.img}
            alt={expert.name}
            loading="lazy"
            decoding="async"
            className="size-12 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{expert.name}</p>
            <p className="text-xs text-primary">{expert.spec}</p>
            <div className="mt-1 flex flex-wrap gap-2 text-[0.65rem] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="size-3 fill-accent text-accent" />
                {expert.rating}
              </span>
              <span>{expert.years} years</span>
              <span>{expert.sessions.toLocaleString()}+ sessions</span>
            </div>
          </div>
        </div>

        {nextSlot && (
          <div className="rounded-xl border border-[#91ddcf]/30 bg-[#91ddcf]/10 px-3 py-2">
            <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-[#5ba99a]">
              Next available session
            </p>
            <p className="mt-0.5 text-xs font-semibold text-foreground">
              {expert.available === "Today" ? "Today" : "Tomorrow"} · {nextSlot.time}
              {nextSlot.label ? ` · ${nextSlot.label}` : ""}
            </p>
          </div>
        )}

        <div>
          <label className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            <MapPin className="size-3" />
            Choose studio
          </label>
          <div className="mt-2 grid gap-2">
            {studios
              .filter((s) => expert.studios.includes(s.shortName))
              .map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStudioId(s.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all duration-300",
                    studioId === s.id
                      ? "border-[#91ddcf] bg-[#91ddcf]/10 shadow-sm"
                      : "border-border bg-background hover:border-[#91ddcf]/40",
                  )}
                >
                  <img src={s.image} alt="" loading="lazy" decoding="async" className="size-10 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground">{s.shortName}</p>
                    <p className="text-[0.65rem] text-muted-foreground">
                      {s.distance} · {s.travelTime}
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            Select time
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {timeSlots.map((t) => (
              <button
                key={t.time}
                type="button"
                onClick={() => setSlot(t.time)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
                  slot === t.time
                    ? "bg-[#91ddcf] text-[#0f1f1c]"
                    : "border border-border bg-background text-muted-foreground hover:border-[#91ddcf]/40",
                )}
              >
                {t.time}
                {t.label && (
                  <span className="ml-1 text-[0.6rem] font-semibold uppercase opacity-80">
                    {t.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-2 pt-1">
          <Button
            className="w-full rounded-full bg-[#91ddcf] py-4 text-sm font-semibold text-[#0f1f1c] hover:bg-[#91ddcf]/90"
            asChild
          >
            <LeavingHomeLink to="/specialists/$id" params={{ id: expert.id }} homeSection="experts">
              Confirm with {expert.name.split(" ")[1]}
              <ChevronRight className="size-3.5" />
            </LeavingHomeLink>
          </Button>
          <p className="flex items-center justify-center gap-1 text-center text-[0.65rem] text-muted-foreground">
            <User className="size-3" />
            Free reschedule up to 24 hours before your session
          </p>
        </div>
      </div>
    </div>
  );
}

export function Experts() {
  const [selectedId, setSelectedId] = useState(featuredSpecialists[0].id);
  const [studioId, setStudioId] = useState(studios[0].id);
  const [slot, setSlot] = useState(timeSlots[1].time);

  const active =
    featuredSpecialists.find((e) => e.id === selectedId) ?? featuredSpecialists[0];

  return (
    <section id="experts" className="bg-background">
      <div className="border-b border-border bg-gradient-to-b from-[#91ddcf]/8 via-background to-background">
        <div className="section-shell !pb-6 !pt-8 sm:!pb-8">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  <BadgeCheck className="size-3.5" />
                  Licensed recovery specialists
                </span>
                <h2 className="type-section mt-2 text-balance text-foreground">
                  Meet The Experts Behind Your Recovery
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Licensed physiotherapists dedicated to helping you move better and live pain-free.
                </p>
              </div>

              <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {expertStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-card px-3 py-2.5 text-center shadow-[var(--shadow-soft)]"
                  >
                    <p className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[0.65rem] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="section-shell !pt-6 !pb-10">
        {/* Desktop: 3 stacked cards + booking panel */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-5">
          <div className="flex flex-col gap-3">
            {featuredSpecialists.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                selected={active.id === expert.id}
                onSelect={() => setSelectedId(expert.id)}
                layout="horizontal"
              />
            ))}

            <LeavingHomeLink
              to="/specialists/"
              homeSection="experts"
              className="group mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5ba99a] transition-colors hover:text-[#91ddcf]"
            >
              View All Experts
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </LeavingHomeLink>
          </div>

          <Reveal delay={0.1}>
            <div className="sticky top-20">
              <BookingPanel
                expert={active}
                studioId={studioId}
                setStudioId={setStudioId}
                slot={slot}
                setSlot={setSlot}
              />
            </div>
          </Reveal>
        </div>

        {/* Tablet: 2 cards per row */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
          {featuredSpecialists.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              selected={active.id === expert.id}
              onSelect={() => setSelectedId(expert.id)}
              layout="vertical"
            />
          ))}
        </div>

        {/* Mobile: single-card carousel */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {featuredSpecialists.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              selected={active.id === expert.id}
              onSelect={() => setSelectedId(expert.id)}
              layout="vertical"
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center md:mt-5 lg:hidden">
          <LeavingHomeLink
            to="/specialists/"
            homeSection="experts"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#5ba99a] transition-colors hover:text-[#91ddcf]"
          >
            View All Experts
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </LeavingHomeLink>
        </div>

        {/* Tablet / mobile booking panel */}
        <div className="mt-5 lg:hidden">
          <BookingPanel
            expert={active}
            studioId={studioId}
            setStudioId={setStudioId}
            slot={slot}
            setSlot={setSlot}
          />
        </div>
      </div>
    </section>
  );
}
