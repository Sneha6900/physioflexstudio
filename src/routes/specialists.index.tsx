import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Award, CalendarCheck, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { setAssessment, useAssessment } from "@/lib/assessment-store";
import { specialists } from "@/lib/specialists";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/specialists/")({
  head: () => ({
    meta: [
      { title: "Certified Recovery Specialists — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Browse certified recovery specialists. Filter by rating, experience and specialization, then book a studio session in Bangalore.",
      },
    ],
  }),
  component: SpecialistsPage,
});

const specs = ["All", "Sports Recovery", "Mobility Coaching", "Post-Surgery", "Posture Correction"];
const sorts = ["Rating", "Experience", "Sessions"] as const;

function SpecialistsPage() {
  const data = useAssessment();
  const navigate = useNavigate();
  const [spec, setSpec] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Rating");

  const filtered = useMemo(() => {
    let list = specialists.filter((e) => spec === "All" || e.spec === spec);
    list = [...list].sort((a, b) =>
      sort === "Rating" ? b.rating - a.rating : sort === "Experience" ? b.years - a.years : b.sessions - a.sessions,
    );
    return list;
  }, [spec, sort]);

  return (
    <FlowShell step={4}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Expert Assisted Recovery
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose your specialist
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Certified recovery specialists for your {(data.area ?? "recovery").toLowerCase()} — hands-on, supervised and safe.
          </p>
        </div>
      </div>

      {/* filters */}
      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {specs.map((s) => (
            <button
              key={s}
              onClick={() => setSpec(s)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                spec === s ? "bg-accent text-charcoal" : "bg-muted/50 text-muted-foreground hover:text-foreground",
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
                sort === s ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <motion.div
            layout
            key={e.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={e.img}
                alt={e.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                <Star className="size-3.5 fill-accent text-accent" /> {e.rating}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-semibold text-charcoal">
                {e.available}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold text-foreground">{e.name}</h3>
              <p className="text-sm text-accent">{e.spec}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Award className="size-4 text-accent" /> {e.years} yrs
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarCheck className="size-4 text-accent" /> {e.sessions}+ sessions
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 text-accent" /> {e.reviews} reviews
                </span>
              </div>
              <Button variant="heroOutline" className="mt-5 w-full rounded-full" asChild>
                <Link to="/specialists/$id" params={{ id: e.id }}>
                  View Profile <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </FlowShell>
  );
}