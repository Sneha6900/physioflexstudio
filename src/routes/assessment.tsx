import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Clock,
  Dumbbell,
  HandHeart,
  Loader2,
  Lightbulb,
  Target,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { BodySilhouette, type BodyPart } from "@/components/site/BodySilhouette";
import {
  aiInsight,
  computeScores,
  setAssessment,
  useAssessment,
  type PainArea,
} from "@/lib/assessment-store";
import { getExercises, getStretches, dailyGoals } from "@/lib/exercises";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "AI Mobility Assessment — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Complete your AI-powered mobility assessment: select your pain area, describe your symptoms, and receive a personalized recovery plan.",
      },
      { property: "og:title", content: "AI Mobility Assessment — PhysioFlex Studio" },
      {
        property: "og:description",
        content: "Intelligent pain assessment and a personalized recovery plan in minutes.",
      },
    ],
  }),
  component: AssessmentPage,
});

const areas: PainArea[] = [
  "Neck",
  "Shoulder",
  "Upper Back",
  "Lower Back",
  "Hip",
  "Knee",
  "Ankle",
  "Wrist",
  "Other",
];

const durations = ["< 1 week", "1–3 weeks", "1–3 months", "3–6 months", "6+ months"];
const ageGroups = ["Under 18", "18–29", "30–44", "45–59", "60+"];

function AssessmentPage() {
  const [step, setStep] = useState(0);
  const data = useAssessment();
  const navigate = useNavigate();
  const isCustomPain = data.area === "Other";

  const next = () => {
    if (step === 0 && isCustomPain) {
      setStep(1); // Show custom pain form
    } else {
      setStep((s) => Math.min(isCustomPain ? 4 : 3, s + 1));
    }
  };
  
  const back = () => {
    if (step === 1 && isCustomPain) {
      setStep(0); // Back from custom pain form
    } else {
      setStep((s) => Math.max(0, s - 1));
    }
  };

  return (
    <FlowShell step={step}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4 }}
        >
          {step === 0 && <StepArea onNext={next} />}
          {step === 1 && isCustomPain && <StepCustomPain onNext={next} onBack={back} />}
          {step === 1 && !isCustomPain && <StepDetails onNext={next} onBack={back} />}
          {step === 2 && isCustomPain && <StepDetails onNext={next} onBack={back} />}
          {step === 2 && !isCustomPain && <StepAnalysis onNext={next} onBack={back} />}
          {step === 3 && isCustomPain && <StepAnalysis onNext={next} onBack={back} />}
          {step === 3 && !isCustomPain && (
            <StepPlan
              onBack={back}
              onChoose={(j) => {
                setAssessment({ journey: j });
                navigate({ to: j === "self" ? "/recovery" : "/specialists" });
              }}
            />
          )}
          {step === 4 && isCustomPain && (
            <StepPlan
              onBack={back}
              onChoose={(j) => {
                setAssessment({ journey: j });
                navigate({ to: j === "self" ? "/recovery" : "/specialists" });
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </FlowShell>
  );
}

/* ---------------- Step 1: Pain area ---------------- */
function StepArea({ onNext }: { onNext: () => void }) {
  const data = useAssessment();
  const silhouettePart = (areas.includes(data.area as PainArea) && data.area !== "Other"
    ? data.area
    : null) as BodyPart | null;

  return (
    <div>
      <Heading
        eyebrow="Step 1"
        title="Where does it hurt?"
        sub="Tap the area on the body map or pick from the list. We'll tailor everything around it."
      />
      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[300px_1fr]">
        <div className="mx-auto h-[26rem] w-44 rounded-[2rem] border border-border bg-card p-4">
          <BodySilhouette
            selected={silhouettePart}
            onSelect={(p) => setAssessment({ area: p })}
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-3">
            {areas.map((a) => (
              <button
                key={a}
                onClick={() => setAssessment({ area: a })}
                className={cn(
                  "rounded-2xl border px-5 py-3 text-sm font-semibold transition-all",
                  data.area === a
                    ? "border-accent bg-accent text-charcoal"
                    : "border-border bg-muted/50 text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-muted/50 p-5">
            <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent">
              <Activity className="size-6" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected area</div>
              <div className="font-display text-2xl font-bold text-accent">
                {data.area ?? "None yet"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav
        right={
          <Button variant="hero" className="rounded-full" disabled={!data.area} onClick={onNext}>
            Continue <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}

/* ---------------- Step 1b: Custom pain description (for "Other") ---------------- */
function StepCustomPain({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const data = useAssessment();
  const [bodyPart, setBodyPart] = useState(data.customPainArea || "");
  const [description, setDescription] = useState(data.customPainDescription || "");
  const valid = bodyPart.trim() && description.trim();

  const handleContinue = () => {
    setAssessment({
      customPainArea: bodyPart.trim(),
      customPainDescription: description.trim(),
    });
    onNext();
  };

  return (
    <div>
      <Heading
        eyebrow="Step 1"
        title="Describe your discomfort"
        sub="Tell us about the specific body part and what you're experiencing."
      />
      <div className="mt-10 space-y-6 max-w-2xl">
        <Card>
          <label className="block">
            <div className="text-sm font-semibold text-foreground mb-2">Affected Body Part</div>
            <input
              type="text"
              placeholder="e.g., Left elbow, Right knee, Lower back"
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:bg-muted transition-all"
            />
          </label>
        </Card>

        <Card>
          <label className="block">
            <div className="text-sm font-semibold text-foreground mb-2">Describe Your Discomfort</div>
            <textarea
              placeholder="Describe the pain, stiffness, or discomfort you're experiencing. Include when it started, what activities trigger it, and how it affects your daily life."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:bg-muted transition-all resize-none"
            />
          </label>
        </Card>

        <div className="rounded-2xl border border-accent/20 bg-accent/10 p-4">
          <div className="flex gap-3">
            <Lightbulb className="size-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/90">
              <p className="font-semibold">Pro tip:</p>
              <p className="mt-1">The more detailed your description, the better our AI can personalize your recovery plan.</p>
            </div>
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
          <Button variant="hero" className="rounded-full" disabled={!valid} onClick={handleContinue}>
            Continue <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}

/* ---------------- Step 2: Pain details ---------------- */
function StepDetails({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const data = useAssessment();
  const valid = data.duration && data.previousInjury && data.mobility && data.ageGroup;

  return (
    <div>
      <Heading
        eyebrow="Step 2"
        title="Tell us how it feels"
        sub="A few details help our AI calibrate your recovery plan precisely."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <Slider
            label="Pain level"
            value={data.painLevel}
            onChange={(v) => setAssessment({ painLevel: v })}
            hint={["No pain", "Severe"]}
          />
        </Card>
        <Card>
          <Slider
            label="Stiffness level"
            value={data.stiffness}
            onChange={(v) => setAssessment({ stiffness: v })}
            hint={["Supple", "Very stiff"]}
          />
        </Card>
        <Card>
          <Choices
            label="Duration of pain"
            options={durations}
            value={data.duration}
            onChange={(v) => setAssessment({ duration: v })}
          />
        </Card>
        <Card>
          <Choices
            label="Age group"
            options={ageGroups}
            value={data.ageGroup}
            onChange={(v) => setAssessment({ ageGroup: v })}
          />
        </Card>
        <Card>
          <Choices
            label="Previous injury in this area?"
            options={["No", "Yes"]}
            value={data.previousInjury ?? ""}
            onChange={(v) => setAssessment({ previousInjury: v as "Yes" | "No" })}
          />
        </Card>
        <Card>
          <Choices
            label="Mobility limitation"
            options={["Low", "Medium", "High"]}
            value={data.mobility ?? ""}
            onChange={(v) => setAssessment({ mobility: v as "Low" | "Medium" | "High" })}
          />
        </Card>
      </div>
      <FooterNav
        left={
          <Button variant="heroOutline" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        }
        right={
          <Button variant="hero" className="rounded-full" disabled={!valid} onClick={onNext}>
            Continue <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}

/* ---------------- Step 3: AI analysis ---------------- */
function StepAnalysis({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const data = useAssessment();
  const [loading, setLoading] = useState(true);
  const scores = computeScores(data);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  const factors = ["Pain location", "Severity scoring", "Mobility restrictions", "Recovery requirements"];

  return (
    <div>
      <Heading
        eyebrow="Step 3"
        title="AI recovery analysis"
        sub="Our model is interpreting your inputs against thousands of recovery patterns."
      />

      {loading ? (
        <div className="mt-12 grid place-items-center rounded-[2rem] border border-border bg-card py-20">
          <Loader2 className="size-10 animate-spin text-accent" />
          <p className="mt-5 font-display text-lg font-semibold text-foreground">
            Analyzing your assessment…
          </p>
          <div className="mt-6 w-full max-w-sm space-y-2 px-6">
            {factors.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.35 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="size-4 text-accent" /> {f}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Ring label="Recovery Index" value={scores.recoveryIndex} accent />
            <Ring label="Mobility Score" value={scores.mobilityScore} />
            <Ring label="Flexibility Score" value={scores.flexibilityScore} />
            <Ring label="Pain Severity" value={scores.painSeverity} invert />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Assessment summary</div>
              <dl className="mt-4 space-y-3 text-sm">
                <Row k="Pain area" v={data.area === "Other" ? data.customPainArea || "—" : data.area ?? "—"} />
                {data.area === "Other" && data.customPainDescription && (
                  <Row k="Description" v={data.customPainDescription} />
                )}
                <Row k="Pain level" v={`${data.painLevel}/10`} />
                <Row k="Duration" v={data.duration || "—"} />
                <Row k="Mobility limitation" v={data.mobility ?? "—"} />
                <Row k="Previous injury" v={data.previousInjury ?? "—"} />
                <Row k="Est. recovery" v={`~${scores.weeks} weeks`} />
              </dl>
            </div>
            <div className="rounded-[2rem] border border-accent/30 bg-accent/[0.06] p-6">
              <div className="flex items-center gap-2 text-accent">
                <Lightbulb className="size-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">AI insights</span>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-foreground">{aiInsight(data)}</p>
            </div>
          </div>
        </motion.div>
      )}

      <FooterNav
        left={
          <Button variant="heroOutline" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        }
        right={
          <Button
            variant="hero"
            className="rounded-full"
            disabled={loading}
            onClick={onNext}
          >
            <BrainCircuit className="size-4" /> Generate Recovery Plan
          </Button>
        }
      />
    </div>
  );
}

/* ---------------- Step 4: Recovery plan ---------------- */
function StepPlan({
  onBack,
  onChoose,
}: {
  onBack: () => void;
  onChoose: (j: "self" | "expert") => void;
}) {
  const data = useAssessment();
  const scores = computeScores(data);
  const exercises = getExercises(data.area);
  const stretches = getStretches(data.area);

  return (
    <div>
      <Heading
        eyebrow="Step 4"
        title="Your personalized recovery plan"
        sub={`A focused program for your ${(data.area ?? "mobility").toLowerCase()} — estimated ${scores.weeks}-week timeline.`}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <MiniStat icon={Dumbbell} label="Exercises" value={`${exercises.length} prescribed`} />
        <MiniStat icon={Target} label="Daily goals" value={`${dailyGoals.length} per day`} />
        <MiniStat icon={Clock} label="Timeline" value={`~${scores.weeks} weeks`} />
      </div>

      <h3 className="mt-12 font-display text-xl font-bold text-foreground">Recommended exercises</h3>
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
        How would you like to recover?
      </h3>
      <div className="mx-auto mt-6 grid max-w-4xl gap-5 sm:grid-cols-2">
        <ModeCard
          icon={User}
          title="Self-Guided Recovery"
          desc="Follow your AI plan independently with guided videos, tracking and weekly reports."
          points={["AI-guided routines", "Video demonstrations", "Progress tracking"]}
          cta="Start Self-Guided"
          onClick={() => onChoose("self")}
        />
        <ModeCard
          icon={HandHeart}
          title="Expert Assisted Recovery"
          desc="Get hands-on guidance from certified specialists at a Bangalore studio near you."
          points={["Certified specialists", "Supervised sessions", "Studio booking"]}
          cta="Find a Specialist"
          highlight
          onClick={() => onChoose("expert")}
        />
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

/* ---------------- Shared bits ---------------- */
function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{sub}</p>
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