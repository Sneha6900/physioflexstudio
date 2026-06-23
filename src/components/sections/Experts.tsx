import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Award, CalendarCheck, Clock, MapPin, Star, User } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import e1 from "@/assets/expert-1.jpg";
import e2 from "@/assets/expert-2.jpg";
import e3 from "@/assets/expert-3.jpg";
import e4 from "@/assets/expert-4.jpg";

type Expert = {
  name: string;
  img: string;
  rating: number;
  sessions: number;
  years: number;
  spec: string;
  available: string;
};

const experts: Expert[] = [
  { name: "Dr. Arjun Mehta", img: e1, rating: 4.9, sessions: 1200, years: 8, spec: "Sports Recovery", available: "Today" },
  { name: "Dr. Priya Nair", img: e2, rating: 4.8, sessions: 980, years: 6, spec: "Mobility Coaching", available: "Tomorrow" },
  { name: "Dr. Karan Rao", img: e3, rating: 5.0, sessions: 1560, years: 11, spec: "Post-Surgery", available: "Today" },
  { name: "Dr. Sneha Iyer", img: e4, rating: 4.7, sessions: 740, years: 5, spec: "Posture Correction", available: "This week" },
];

const specs = ["All", "Sports Recovery", "Mobility Coaching", "Post-Surgery", "Posture Correction"];
const sorts = ["Rating", "Experience", "Sessions"] as const;

const studios = ["Indiranagar", "Koramangala", "Whitefield"];
const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "4:30 PM", "6:00 PM"];

export function Experts() {
  const [spec, setSpec] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Rating");
  const [selected, setSelected] = useState(0);
  const [studio, setStudio] = useState(studios[0]);
  const [slot, setSlot] = useState(slots[1]);

  const filtered = useMemo(() => {
    let list = experts.filter((e) => spec === "All" || e.spec === spec);
    list = [...list].sort((a, b) =>
      sort === "Rating" ? b.rating - a.rating : sort === "Experience" ? b.years - a.years : b.sessions - a.sessions,
    );
    return list;
  }, [spec, sort]);

  const active = filtered[selected] ?? filtered[0];

  return (
    <section id="experts" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Need extra support?"
          title="Recovery you never have to do alone"
          description="For elderly individuals, post-surgery recovery, or anyone requiring physical assistance, our certified specialists guide every movement safely and effectively."
        />

        {/* filters */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {specs.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSpec(s);
                    setSelected(0);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    spec === s
                      ? "bg-charcoal text-offwhite"
                      : "bg-secondary text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Sort by</span>
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                    sort === s ? "border-accent bg-accent/10 text-primary" : "border-border text-muted-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* expert grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((e, i) => (
              <motion.button
                layout
                key={e.name}
                onClick={() => setSelected(i)}
                className={cn(
                  "group overflow-hidden rounded-3xl border bg-card text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1",
                  active?.name === e.name ? "border-accent ring-2 ring-accent/30" : "border-border",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-charcoal/85 px-2.5 py-1 text-xs font-semibold text-offwhite backdrop-blur">
                    <Star className="size-3.5 fill-accent text-accent" /> {e.rating}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-semibold text-charcoal">
                    {e.available}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{e.name}</h3>
                  <p className="text-sm text-primary">{e.spec}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Award className="size-4 text-primary" /> {e.years} yrs
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck className="size-4 text-primary" /> {e.sessions}+ sessions
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* booking flow */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 rounded-3xl surface-dark p-7">
              <h3 className="font-display text-xl font-bold text-offwhite">Book a session</h3>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <img
                  src={active?.img}
                  alt={active?.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 font-display font-semibold text-offwhite">
                    {active?.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/55">
                    <Star className="size-3.5 fill-accent text-accent" /> {active?.rating} ·{" "}
                    {active?.spec}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs uppercase tracking-widest text-white/40">
                  <MapPin className="mr-1 inline size-3.5" /> Bangalore studio
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {studios.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStudio(s)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-sm transition-all",
                        studio === s ? "bg-accent text-charcoal" : "bg-white/5 text-white/70",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs uppercase tracking-widest text-white/40">
                  <Clock className="mr-1 inline size-3.5" /> Time slot
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlot(s)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-sm transition-all",
                        slot === s ? "bg-accent text-charcoal" : "bg-white/5 text-white/70",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="hero" className="mt-7 w-full rounded-full">
                Confirm with {active?.name?.split(" ")[1] ?? "specialist"}
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/40">
                <User className="size-3.5" /> Free reschedule up to 24h before
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}