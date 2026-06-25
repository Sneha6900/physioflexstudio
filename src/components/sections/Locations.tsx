import { motion } from "motion/react";
import {
  CalendarCheck,
  Check,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { studioWhyChoose, studios, type Studio } from "@/lib/studios";
import { cn } from "@/lib/utils";

function badgeStyle(badge: Studio["badge"]) {
  switch (badge) {
    case "Most Popular":
      return "bg-[#91ddcf] text-[#0f1f1c]";
    case "Premium Studio":
      return "bg-[#e8c5e5] text-[#1a1a1a]";
    case "Best Rated":
      return "bg-[#f19ed2]/90 text-[#1a1a1a]";
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#91ddcf]/10 via-transparent to-[#e8c5e5]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {studio.badge && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm",
                badgeStyle(studio.badge),
              )}
            >
              {studio.badge}
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <Star className="size-3.5 fill-[#91ddcf] text-[#91ddcf]" />
            {studio.rating}
          </span>
        </div>

        <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {studio.availability}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h3 className="type-card-title text-foreground">{studio.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#5ba99a]">
            <MapPin className="size-3.5 shrink-0" />
            {studio.distance} · {studio.travelTime}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{studio.address}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {studio.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 rounded-full bg-[#91ddcf]/12 px-2.5 py-1 text-[0.65rem] font-semibold text-[#5ba99a]"
            >
              <Check className="size-3" strokeWidth={2.5} />
              {h}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Clock className="size-3.5 text-[#5ba99a]" />
            {studio.hours}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Users className="size-3.5 text-[#5ba99a]" />
            {studio.capacity}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {studio.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[0.65rem] font-medium text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <Button
            className="h-11 w-full rounded-full bg-[#91ddcf] text-sm font-semibold text-[#0f1f1c] shadow-[0_10px_28px_-12px_rgba(145,221,207,0.65)] transition-all group-hover:brightness-105 hover:bg-[#91ddcf]/90"
            asChild
          >
            <LeavingHomeLink to="/specialists/" homeSection="locations">
              <CalendarCheck className="size-4" />
              Book Session
            </LeavingHomeLink>
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-10 rounded-full border-border text-sm transition-colors group-hover:border-[#91ddcf]/40"
              asChild
            >
              <a href={`tel:${studio.phone.replace(/\s/g, "")}`}>
                <Phone className="size-4" />
                Call Studio
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-full border-border text-sm transition-colors group-hover:border-[#91ddcf]/40"
              asChild
            >
              <a href={studio.directionsUrl} target="_blank" rel="noreferrer">
                <Navigation className="size-4" />
                Directions
              </a>
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

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-[2rem] border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-8">
            <h3 className="type-section text-center text-foreground">Why Choose Our Studios?</h3>
            <p className="type-body mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              Every PhysioFlex Studio location is built for people who want professional care in a
              space that feels warm, modern, and trustworthy.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {studioWhyChoose.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-gradient-to-br from-background to-secondary/40 p-5 transition-shadow hover:shadow-[var(--shadow-soft)]"
                >
                  <h4 className="type-card-title text-foreground">{item.title}</h4>
                  <p className="type-body mt-2 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
