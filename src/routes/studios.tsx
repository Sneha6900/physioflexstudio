import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { studios, type Studio } from "@/lib/studios";
import { Stagger, itemVariants } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Users, Check, Navigation, Phone } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Our Studios — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Visit our premium physiotherapy and assisted stretching studios in Bangalore. Whitefield, Indiranagar, and Koramangala.",
      },
    ],
  }),
  component: StudiosPage,
});

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

function StudiosPage() {
  return (
    <PageShell crumbs={navCrumbs.studios?.() || [{ label: "Home", to: "/" }, { label: "Studios" }]}>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="type-label font-semibold uppercase tracking-[0.2em] text-forest">
            Our Locations
          </span>
          <h1 className="type-page mt-4 text-foreground">Premium Mobility Spaces</h1>
          <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">
            Calm, modern spaces designed for physical evaluation and one-on-one assisted stretching.
          </p>
        </motion.div>

        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio: Studio) => (
            <motion.article
              key={studio.id}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={studio.image}
                  alt={`${studio.name} interior`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  {studio.badge && (
                    <span className={`type-label rounded-full px-3 py-1 font-semibold ${badgeStyle(studio.badge)}`}>
                      {studio.badge}
                    </span>
                  )}
                  <span className="type-label flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 font-semibold text-white">
                    <Star className="size-3.5 fill-accent text-accent" />
                    {studio.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex-1">
                  <h3 className="type-card-title text-foreground">{studio.name}</h3>
                  <p className="type-caption mt-1 flex items-center gap-1.5 font-medium text-forest">
                    <MapPin className="size-3.5 shrink-0" />
                    {studio.distance} · {studio.travelTime}
                  </p>
                  <p className="type-body mt-2 text-muted-foreground">{studio.address}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {studio.highlights.map((h: string) => (
                      <span
                        key={h}
                        className="type-badge inline-flex items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 font-semibold text-forest"
                      >
                        <Check className="size-3" strokeWidth={2.5} />
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-forest" />
                      <span>{studio.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-forest" />
                      <span>{studio.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-full" asChild>
                    <a href={studio.directionsUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="mr-2 size-4" /> Directions
                    </a>
                  </Button>
                  <Button className="flex-1 rounded-full" asChild>
                    <a href={`tel:${studio.phone.replace(/\s+/g, "")}`}>
                      <Phone className="mr-2 size-4" /> Call
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </PageShell>
  );
}
