import { motion } from "motion/react";
import { CalendarCheck, Check, Clock, MapPin, Navigation, Phone, Star, Users } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { StudioWhyChoose } from "@/components/sections/StudioWhyChoose";
import { Button } from "@/components/ui/button";
import { studios, type Studio } from "@/lib/studios";
import { cn } from "@/lib/utils";

function badgeStyle(badge: Studio["badge"]) {
  switch (badge) {
    case "Most Popular":
      return "bg-accent text-accent-foreground";
    case "Premium Studio":
      return "bg-brand-lilac text-foreground";
    case "Best Rated":
      return "bg-brand-pink/90 text-foreground";
    case "New Location":
      return "bg-foreground text-background";
    default:
      return "bg-secondary text-foreground";
  }
}

function StudioCard({ studio }: { studio: Studio }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={studio.image}
          alt={`${studio.name} — premium physiotherapy studio interior`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-brand-lilac/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {studio.badge && (
            <span
              className={cn(
                "type-label rounded-full px-3 py-1 font-semibold shadow-sm backdrop-blur-sm",
                badgeStyle(studio.badge),
              )}
            >
              {studio.badge}
            </span>
          )}
          <span className="type-label flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 font-semibold text-white backdrop-blur-md">
            <Star className="size-3.5 fill-accent text-accent" />
            {studio.rating}
          </span>
        </div>

        <span className="type-label absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-semibold text-white backdrop-blur-md">
          {studio.availability}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h3 className="type-card-title text-foreground">{studio.name}</h3>
          <p className="type-caption mt-1 flex items-center gap-1.5 font-medium text-forest">
            <MapPin className="size-3.5 shrink-0" />
            {studio.distance} · {studio.travelTime}
          </p>
          <p className="type-body mt-1.5 text-pretty text-muted-foreground">{studio.address}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {studio.highlights.map((h) => (
            <span
              key={h}
              className="type-badge inline-flex items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 font-semibold text-forest"
            >
              <Check className="size-3" strokeWidth={2.5} />
              {h}
            </span>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-2 type-label text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Clock className="size-3.5 text-forest" />
            {studio.hours}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Users className="size-3.5 text-forest" />
            {studio.capacity}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {studio.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="type-badge rounded-full border border-border bg-background px-2.5 py-1 font-medium text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <Button
            type="button"
            aria-disabled="true"
            tabIndex={-1}
            className="type-button h-11 w-full cursor-default rounded-full bg-accent font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-all group-hover:brightness-105 hover:bg-accent/90"
          >
            <CalendarCheck className="size-4" />
            Book Session
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              aria-disabled="true"
              tabIndex={-1}
              className="type-button h-10 cursor-default rounded-full border-border transition-colors group-hover:border-accent/40"
            >
              <Phone className="size-4" />
              Call Studio
            </Button>
            <Button
              type="button"
              variant="outline"
              aria-disabled="true"
              tabIndex={-1}
              className="type-button h-10 cursor-default rounded-full border-border transition-colors group-hover:border-accent/40"
            >
              <Navigation className="size-4" />
              Directions
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Locations() {
  return (
    <section id="locations" className="bg-secondary/30">
      <div className="border-b border-border bg-gradient-to-b from-[#e8c5e5]/10 via-background to-transparent">
        <div className="section-shell !pb-8 !pt-10 sm:!pb-10 sm:!pt-12">
          <Reveal>
            <span className="type-label inline-flex items-center gap-2 font-semibold uppercase tracking-[0.16em] text-primary">
              <MapPin className="size-3.5" />
              Premium recovery studios
            </span>
            <h2 className="type-section mt-3 max-w-2xl text-balance text-foreground">
              Find A PhysioFlex Studio Near You
            </h2>
            <p className="type-body mt-2 max-w-xl text-muted-foreground">
              Premium physiotherapy and rehabilitation environments — designed for comfort,
              movement, and healing.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-shell !pt-8">
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </Stagger>

        <StudioWhyChoose />
      </div>
    </section>
  );
}
