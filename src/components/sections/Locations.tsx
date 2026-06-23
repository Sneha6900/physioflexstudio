import { motion } from "motion/react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import studioImg from "@/assets/studio.jpg";

const locations = [
  {
    name: "PhysioFlex Indiranagar",
    address: "100 Ft Road, Indiranagar, Bengaluru 560038",
    hours: "6 AM – 10 PM",
    map: "https://www.google.com/maps?q=Indiranagar+Bangalore&output=embed",
  },
  {
    name: "PhysioFlex Koramangala",
    address: "80 Ft Road, 4th Block, Koramangala, Bengaluru 560034",
    hours: "6 AM – 10 PM",
    map: "https://www.google.com/maps?q=Koramangala+Bangalore&output=embed",
  },
  {
    name: "PhysioFlex Whitefield",
    address: "ITPL Main Road, Whitefield, Bengaluru 560066",
    hours: "6 AM – 9 PM",
    map: "https://www.google.com/maps?q=Whitefield+Bangalore&output=embed",
  },
];

export function Locations() {
  return (
    <section id="locations" className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Studios"
          title="Recover at a PhysioFlex studio near you"
          description="Premium recovery spaces across Bangalore, designed for movement and calm."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {locations.map((l, i) => (
            <motion.div
              key={l.name}
              variants={itemVariants}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {i === 0 ? (
                  <img
                    src={studioImg}
                    alt={l.name}
                    loading="lazy"
                    width={1536}
                    height={1024}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <iframe
                    title={l.name}
                    src={l.map}
                    loading="lazy"
                    className="h-full w-full grayscale-[0.2]"
                    style={{ border: 0 }}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground">{l.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {l.address}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4 text-primary" /> {l.hours}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(l.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  <Navigation className="size-4" /> Get directions
                </a>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}