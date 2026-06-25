import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Clock, Dumbbell, HandHeart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { navCrumbs } from "@/lib/navigation";
import { BodyModel3D } from "@/components/site/BodyModel3D";
import {
  clinicalInsight,
  computeScores,
  setAssessment,
  useAssessment,
  type PainArea,
  type PainMarker,
} from "@/lib/assessment-store";
import { getExercises, getStretches, dailyGoals } from "@/lib/exercises";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Clinical Mobility Assessment — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Complete our clinically-led mobility assessment: identify your pain points, share your profile, and receive a physiotherapist-informed recovery program.",
      },
      { property: "og:title", content: "Clinical Mobility Assessment — PhysioFlex Studio" },
      {
        property: "og:description",
        content:
          "Clinically-informed pain assessment and a personalized recovery plan designed by physiotherapists.",
      },
    ],
  }),
  component: AssessmentPage,
});

const durationOptions = ["< 1 week", "1–3 weeks", "1–3 months", "3–6 months", "6+ months"];
const ageGroups = ["Under 18", "18–29", "30–44", "45–59", "60+"];
const mobilityOptions = ["Low", "Medium", "High"] as const;

function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const data = useAssessment();
  const navigate = useNavigate();

  const markers = data.markers;
  const selectedMarker = markers.find((marker) => marker.id === selectedMarkerId) ?? null;
  const currentArea = data.area ?? markers[0]?.part ?? null;

  useEffect(() => {
    if (step === 2 && !selectedMarkerId && markers.length > 0) {
      setSelectedMarkerId(markers[0].id);
    }
  }, [step, selectedMarkerId, markers]);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <FlowShell step={step} crumbs={navCrumbs.assessment()}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4 }}
        >
          {step === 0 && <StepProfile onNext={next} />}
          {step === 1 && (
            <StepMarkers
              markers={markers}
              selectedMarkerId={selectedMarkerId}
              onSelectMarker={setSelectedMarkerId}
              onAddMarker={(part) => {
                const existing = markers.find((marker) => marker.part === part);
                if (existing) {
                  setSelectedMarkerId(existing.id);
                  return;
                }
                if (markers.length >= 3) return;
                const nextId = markers.reduce((max, marker) => Math.max(max, marker.id), 0) + 1;
                const nextMarker: PainMarker = {
                  id: nextId,
                  part,
                  painLevel: 6,
                  duration: "1–3 weeks",
                  stiffness: 5,
                  mobility: "Medium",
                  notes: "",
                };
                setAssessment({ markers: [...markers, nextMarker], area: part });
                setSelectedMarkerId(nextId);
              }}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 2 && (
            <StepMarkerDetails
              marker={selectedMarker}
              markers={markers}
              selectedMarkerId={selectedMarkerId}
              onSelect={setSelectedMarkerId}
              onUpdate={(id, patch) =>
                setAssessment({
                  markers: markers.map((marker) =>
                    marker.id === id ? { ...marker, ...patch } : marker,
                  ),
                })
              }
              onRemove={(id) => {
                const remaining = markers.filter((marker) => marker.id !== id);
                setAssessment({ markers: remaining, area: remaining[0]?.part ?? null });
                setSelectedMarkerId(remaining[0]?.id ?? null);
              }}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && <StepPlan area={currentArea} onBack={back} />}
        </motion.div>
      </AnimatePresence>
    </FlowShell>
  );
}

function StepProfile({ onNext }: { onNext: () => void }) {
  const data = useAssessment();
  const valid = Boolean(
    data.profile.name.trim() && data.profile.age && data.profile.occupation.trim(),
  );

  return (
    <div>
      <Heading
        eyebrow="Step 1"
        title="Start with your profile"
        sub="Share your clinical background and daily movement habits so our team can personalize the plan."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Full name</span>
            <input
              type="text"
              value={data.profile.name}
              onChange={(e) =>
                setAssessment({ profile: { ...data.profile, name: e.target.value } })
              }
              placeholder="Your name"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted"
            />
          </label>
        </Card>
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Age</span>
            <input
              type="number"
              min={12}
              value={data.profile.age ?? ""}
              onChange={(e) =>
                setAssessment({ profile: { ...data.profile, age: Number(e.target.value) || null } })
              }
              placeholder="Years"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted"
            />
          </label>
        </Card>
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Occupation</span>
            <input
              type="text"
              value={data.profile.occupation}
              onChange={(e) =>
                setAssessment({ profile: { ...data.profile, occupation: e.target.value } })
              }
              placeholder="e.g. desk worker, athlete, parent"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted"
            />
          </label>
        </Card>
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Daily sitting</span>
            <input
              type="number"
              min={0}
              value={data.profile.sittingHours ?? ""}
              onChange={(e) =>
                setAssessment({
                  profile: { ...data.profile, sittingHours: Number(e.target.value) || null },
                })
              }
              placeholder="Hours per day"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted"
            />
          </label>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Medical history</span>
            <textarea
              value={data.profile.medicalHistory}
              onChange={(e) =>
                setAssessment({ profile: { ...data.profile, medicalHistory: e.target.value } })
              }
              rows={4}
              placeholder="Any prior conditions or treatments"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted resize-none"
            />
          </label>
        </Card>
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Previous injuries</span>
            <textarea
              value={data.profile.previousInjuries}
              onChange={(e) =>
                setAssessment({ profile: { ...data.profile, previousInjuries: e.target.value } })
              }
              rows={4}
              placeholder="Injuries, surgeries or recurring aches"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted resize-none"
            />
          </label>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <label className="block space-y-3">
            <span className="text-sm font-semibold text-muted-foreground">Emergency contact</span>
            <input
              type="text"
              value={data.profile.emergencyContact}
              onChange={(e) =>
                setAssessment({ profile: { ...data.profile, emergencyContact: e.target.value } })
              }
              placeholder="Name or phone"
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted"
            />
          </label>
        </Card>
      </div>

      <FooterNav
        right={
          <Button variant="hero" className="rounded-full" disabled={!valid} onClick={onNext}>
            Continue <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}

function StepMarkers({
  markers,
  selectedMarkerId,
  onSelectMarker,
  onAddMarker,
  onNext,
  onBack,
}: {
  markers: PainMarker[];
  selectedMarkerId: number | null;
  onSelectMarker: (id: number | null) => void;
  onAddMarker: (part: PainArea) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = markers.length > 0;

  return (
    <div>
      <Heading
        eyebrow="Step 2"
        title="Map your pain points"
        sub="Tap the body model to place up to three markers for your main areas of discomfort."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <BodyModel3D
          markers={markers}
          selectedMarkerId={selectedMarkerId}
          onPartClick={(part) => onAddMarker(part)}
          className="lg:col-span-1"
        />
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Pain marker summary</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Each marker captures a separate pain point for your personalized program.
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                {markers.length}/3
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {markers.length ? (
                markers.map((marker) => (
                  <button
                    key={marker.id}
                    type="button"
                    onClick={() => onSelectMarker(marker.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-3xl border px-4 py-4 text-left transition",
                      selectedMarker?.id === marker.id
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <div>
                      <p className="font-semibold text-foreground">{marker.part}</p>
                      <p className="text-sm text-muted-foreground">
                        Pain level {marker.painLevel}, {marker.mobility} mobility
                      </p>
                    </div>
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                      Marker {marker.id}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tap an area on the model to add your first marker.
                </p>
              )}
            </div>
          </Card>

          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-sm font-semibold text-foreground">Marker workflow</div>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>1. Place markers on the model.</li>
              <li>2. Select a marker to enter pain details.</li>
              <li>3. Generate a clinician-led recovery plan tailored to your markers.</li>
            </ol>
          </div>
        </div>
      </div>

      <FooterNav
        left={
          <Button variant="heroOutline" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        }
        right={
          <Button variant="hero" className="rounded-full" disabled={!canContinue} onClick={onNext}>
            Continue <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}

function StepMarkerDetails({
  marker,
  markers,
  selectedMarkerId,
  onSelect,
  onUpdate,
  onRemove,
  onNext,
  onBack,
}: {
  marker: PainMarker | null;
  markers: PainMarker[];
  selectedMarkerId: number | null;
  onSelect: (id: number | null) => void;
  onUpdate: (id: number, patch: Partial<PainMarker>) => void;
  onRemove: (id: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = markers.length > 0;

  return (
    <div>
      <Heading
        eyebrow="Step 3"
        title="Capture marker details"
        sub="Describe pain intensity, stiffness, mobility, and how each point affects your movement."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {marker ? (
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{marker.part}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Marker {marker.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(marker.id)}
                  className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-destructive"
                >
                  Remove
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <Slider
                  label="Pain level"
                  value={marker.painLevel}
                  onChange={(value) => onUpdate(marker.id, { painLevel: value })}
                  hint={["Mild", "Severe"]}
                />
                <Slider
                  label="Stiffness"
                  value={marker.stiffness}
                  onChange={(value) => onUpdate(marker.id, { stiffness: value })}
                  hint={["Flexible", "Very stiff"]}
                />
                <Choices
                  label="Mobility"
                  options={mobilityOptions}
                  value={marker.mobility}
                  onChange={(value) =>
                    onUpdate(marker.id, { mobility: value as "Low" | "Medium" | "High" })
                  }
                />
                <Choices
                  label="Duration"
                  options={durationOptions}
                  value={marker.duration}
                  onChange={(value) => onUpdate(marker.id, { duration: value })}
                />
                <label className="block">
                  <span className="text-sm font-semibold text-muted-foreground">Notes</span>
                  <textarea
                    value={marker.notes}
                    onChange={(e) => onUpdate(marker.id, { notes: e.target.value })}
                    rows={4}
                    placeholder="Share how this area feels during daily movement."
                    className="mt-2 w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-muted resize-none"
                  />
                </label>
              </div>
            </Card>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              Select a marker to add detailed pain information.
            </div>
          )}
        </div>

        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Markers</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose which marker to update before continuing.
              </p>
            </div>
            <div className="grid gap-3">
              {markers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "flex items-center justify-between rounded-3xl border px-4 py-3 text-left transition",
                    item.id === selectedMarkerId
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.part}</p>
                    <p className="text-sm text-muted-foreground">
                      Level {item.painLevel}, {item.mobility} mobility
                    </p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {item.id}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <FooterNav
        left={
          <Button variant="heroOutline" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        }
        right={
          <Button variant="hero" className="rounded-full" disabled={!canContinue} onClick={onNext}>
            Continue <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}

function StepPlan({ area, onBack }: { area: PainArea | null; onBack: () => void }) {
  const data = useAssessment();
  const scores = computeScores(data);
  const insight = clinicalInsight(data);
  const exercises = getExercises(area);
  const stretches = getStretches(area);
  const navigate = useNavigate();

  return (
    <div>
      <Heading
        eyebrow="Step 4"
        title="Your personalized recovery plan"
        sub={`A focused program for your ${(area ?? "movement").toLowerCase()} — estimated ${scores.weeks}-week timeline.`}
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MiniStat icon={Dumbbell} label="Exercises" value={`${exercises.length} prescribed`} />
        <MiniStat icon={Target} label="Daily goals" value={`${dailyGoals.length} per day`} />
        <MiniStat icon={Clock} label="Timeline" value={`~${scores.weeks} weeks`} />
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6">
        <p className="text-sm font-semibold text-foreground">Clinical insight</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{insight}</p>
      </div>

      <h3 className="mt-12 font-display text-xl font-bold text-foreground">
        Recommended exercises
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {exercises.map((ex) => (
          <div
            key={ex.name}
            className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={ex.thumb}
                alt={ex.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-11 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur">
                  <PlayIcon />
                </span>
              </span>
              <span className="absolute right-2 top-2 rounded-full bg-foreground/80 text-background">
                {ex.duration}
              </span>
            </div>
            <div className="p-4">
              <h4 className="font-display text-base font-bold text-foreground">{ex.name}</h4>
              <span className="mt-1 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                {ex.difficulty}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ex.benefits}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-bold text-foreground">Stretching routine</h3>
          <ul className="mt-4 space-y-3">
            {stretches.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Check className="size-4 text-accent" /> {s.name}
                </span>
                <span className="text-muted-foreground">{s.duration}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-bold text-foreground">Daily goals</h3>
          <ul className="mt-4 space-y-3">
            {dailyGoals.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="size-4 text-accent" /> {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-14 text-center font-display text-2xl font-bold text-foreground">
        Recommended recovery path
      </h3>
      <div className="mx-auto mt-6 max-w-4xl">
        <div className="rounded-3xl border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Expert Assisted Recovery</p>
          <p className="mt-3">
            We recommend specialist-led rehabilitation for the most reliable, clinically supported
            recovery.
          </p>
          <Button
            variant="hero"
            className="mt-4 rounded-full"
            onClick={() => {
              setAssessment({ journey: "expert" });
              navigate({ to: "/specialists" });
            }}
          >
            Book a Specialist
          </Button>
        </div>
      </div>

      <FooterNav
        left={
          <Button variant="heroOutline" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        }
      />
    </div>
  );
}

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </span>
      <h1 className="type-page mt-4 text-foreground">{title}</h1>
      <p className="type-body mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-border bg-card p-6">{children}</div>;
}

function FooterNav({ left, right }: { left?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mt-12 flex items-center justify-between gap-3">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint: [string, string];
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">{label}</span>
        <span className="font-display text-2xl font-bold text-accent">{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-[oklch(0.74_0.14_165)]"
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{hint[0]}</span>
        <span>{hint[1]}</span>
      </div>
    </div>
  );
}

function Choices({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              value === o
                ? "border-accent bg-accent text-charcoal"
                : "border-border bg-muted/50 text-muted-foreground hover:border-accent/50",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Ring({
  label,
  value,
  accent,
  invert,
}: {
  label: string;
  value: number;
  accent?: boolean;
  invert?: boolean;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const stroke = invert
    ? "oklch(0.7 0.19 25)"
    : accent
      ? "oklch(0.74 0.14 165)"
      : "oklch(0.6 0.1 168)";
  return (
    <div className="grid place-items-center rounded-[2rem] border border-border bg-card p-6">
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-foreground">
          {value}
        </span>
      </div>
      <span className="mt-3 text-center text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold text-foreground">{v}</dd>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Dumbbell;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
      <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon className="size-6" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-display text-lg font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
}

function ModeCard({
  icon: Icon,
  title,
  desc,
  points,
  cta,
  highlight,
  onClick,
}: {
  icon: typeof User;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[2rem] border p-7 transition-all hover:-translate-y-1",
        highlight
          ? "border-accent/40 bg-accent/[0.07]"
          : "border-border bg-card hover:border-accent/40",
      )}
    >
      <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon className="size-6" />
      </span>
      <h4 className="mt-5 font-display text-xl font-bold text-foreground">{title}</h4>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-accent" /> {p}
          </li>
        ))}
      </ul>
      <Button
        variant={highlight ? "hero" : "heroOutline"}
        className="mt-6 w-full rounded-full"
        onClick={onClick}
      >
        {cta} <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
