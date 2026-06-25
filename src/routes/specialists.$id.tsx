import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { Award, CalendarCheck, Check, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { navCrumbs } from "@/lib/navigation";
import { setAssessment } from "@/lib/assessment-store";
import { getSpecialist, nextDays } from "@/lib/specialists";

export const Route = createFileRoute("/specialists/$id")({
  head: ({ params }) => {
    const s = getSpecialist(params.id);
    return {
      meta: [
        { title: `${s?.name ?? "Specialist"} — PhysioFlex Studio` },
        {
          name: "description",
          content: s?.bio ?? "Certified recovery specialist at PhysioFlex Studio.",
        },
        ...(s ? [{ property: "og:image", content: s.img }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const s = getSpecialist(params.id);
    if (!s) throw notFound();
    return { id: params.id };
  },
  component: SpecialistProfile,
  notFoundComponent: () => (
    <FlowShell>
      <div className="grid place-items-center py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Specialist not found</h1>
        <Button variant="hero" className="mt-6 rounded-full" asChild>
          <Link to="/specialists/">Back to experts</Link>
        </Button>
      </div>
    </FlowShell>
  ),
  errorComponent: () => (
    <FlowShell>
      <div className="grid place-items-center py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Something went wrong</h1>
        <Button variant="hero" className="mt-6 rounded-full" asChild>
          <Link to="/specialists/">Back to experts</Link>
        </Button>
      </div>
    </FlowShell>
  ),
});

function SpecialistProfile() {
  const { id } = Route.useParams();
  const s = getSpecialist(id)!;
  const navigate = useNavigate();
  const days = nextDays(5);

  return (
    <FlowShell step={4} crumbs={navCrumbs.expert(s.name)}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* left: photo + key facts */}
        <div>
          <div className="overflow-hidden rounded-[2rem] border border-border">
            <img
              src={s.img}
              alt={s.name}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Fact icon={Star} value={s.rating.toFixed(1)} label="Rating" />
            <Fact icon={Award} value={`${s.years}y`} label="Experience" />
            <Fact icon={CalendarCheck} value={`${s.sessions}+`} label="Sessions" />
          </div>
        </div>

        {/* right: details */}
        <div>
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {s.spec}
          </span>
          <h1 className="type-page mt-4 text-foreground">{s.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="size-4 fill-accent text-accent" /> {s.rating} · {s.reviews} reviews
          </div>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{s.bio}</p>

          <h2 className="mt-8 font-display text-lg font-bold text-foreground">Certifications</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.certifications.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
              >
                <Check className="size-4 text-accent" /> {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-lg font-bold text-foreground">Availability</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {days.map((d) => (
              <div
                key={d.iso}
                className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-center"
              >
                <div className="text-xs text-muted-foreground">{d.dow}</div>
                <div className="font-display font-bold text-foreground">{d.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 text-accent" /> Available at {s.studios.join(" & ")} studios
          </p>

          <Button
            variant="hero"
            size="lg"
            className="mt-8 rounded-full"
            onClick={() => {
              setAssessment({ specialistId: s.id, journey: "expert" });
              navigate({ to: "/booking" });
            }}
          >
            Book Session with {s.name.split(" ")[1]}
          </Button>
        </div>
      </div>

      {/* reviews */}
      <h2 className="mt-14 font-display text-2xl font-bold text-foreground">Reviews & ratings</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {s.reviewList.map((r) => (
          <div key={r.name} className="rounded-3xl border border-border bg-card p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < r.rating ? "size-4 fill-accent text-accent" : "size-4 text-muted"}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
            <div className="mt-4 text-sm font-semibold text-foreground">{r.name}</div>
          </div>
        ))}
      </div>
    </FlowShell>
  );
}

function Fact({ icon: Icon, value, label }: { icon: typeof Star; value: string; label: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-4">
      <Icon className="size-5 text-accent" />
      <div className="mt-2 font-display text-lg font-bold text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
