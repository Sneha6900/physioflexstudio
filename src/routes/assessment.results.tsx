import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { useClientAssessment } from "@/lib/client-assessment-store";
import { Lightbulb, Activity, AlertCircle, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/assessment/results")({
  component: AssessmentResultsPage,
  meta: () => [
    {
      title: "Assessment Results — PhysioFlex Studio",
      description: "Your assessment results and recommended exercises",
    },
  ],
});

const EXERCISE_RECOMMENDATIONS: Record<string, string[]> = {
  head: ["Neck stretches", "Cervical rotation exercises", "Shoulder shrugs", "Chin tucks"],
  shoulder: [
    "Shoulder rolls",
    "Pendulum exercises",
    "Cross-body shoulder stretch",
    "Scapular push-ups",
  ],
  chest: ["Chest stretches", "Wall push-ups", "Doorway stretches", "Breathing exercises"],
  upper_back: [
    "Thoracic spine rotation",
    "Prone Y-T-W exercises",
    "Reverse fly",
    "Back extensions",
  ],
  arm: ["Bicep curls", "Tricep dips", "Arm circles", "Resistance band exercises"],
  elbow: ["Elbow flexion/extension", "Pronation/supination", "Wrist curls", "Resistance band work"],
  forearm: [
    "Forearm pronation/supination",
    "Wrist stretches",
    "Resistance band work",
    "Functional gripping",
  ],
  wrist: [
    "Wrist circles",
    "Wrist flexor stretches",
    "Wrist extensor exercises",
    "Grip strengthening",
  ],
  hand: ["Finger flexion/extension", "Grip exercises", "Finger spreading", "Dexterity training"],
  abdomen: ["Core stabilization", "Planks", "Modified crunches", "Breathing exercises"],
  lower_back: [
    "Back extensions",
    "Pelvic tilts",
    "Bird dogs",
    "Hamstring stretches",
    "Core strengthening",
  ],
  hip: ["Hip flexor stretches", "Clamshells", "Hip circles", "Glute bridges"],
  thigh: ["Quad stretches", "Hamstring stretches", "Lunges", "Leg lifts", "Squats"],
  knee: ["Quad sets", "Straight leg raises", "Hamstring curls", "Knee extensions"],
  calf: ["Calf stretches", "Wall stretches", "Calf raises", "Towel scrunches"],
  ankle: ["Ankle circles", "Calf stretches", "Ankle alphabet", "Balance exercises"],
  foot: ["Foot stretches", "Towel scrunches", "Marble pickups", "Arch exercises"],
};

const TREATMENT_PLANS: Record<string, string> = {
  low: "Gentle exercises and stretching 3-4 times per week. Focus on mobility and flexibility.",
  moderate:
    "Regular physiotherapy sessions combined with home exercises. Gradual strengthening program recommended.",
  high: "Immediate professional assessment required. Frequent physiotherapy sessions (2-3 per week) with personalized treatment plan.",
};

function AssessmentResultsPage() {
  const navigate = useNavigate();
  const { assessment, selectedAreas, completeAssessment } = useClientAssessment();

  useEffect(() => {
    if (!assessment && selectedAreas.length === 0) {
      navigate({ to: "/assessment/start" });
    }
  }, []);

  if (!assessment) {
    return null;
  }

  const averagePainLevel =
    Math.round(
      assessment.painPoints.reduce((sum, p) => sum + p.level, 0) / assessment.painPoints.length,
    ) || 0;

  const severity = averagePainLevel <= 3 ? "low" : averagePainLevel <= 6 ? "moderate" : "high";

  const recommendedExercises = Array.from(
    new Set(assessment.painPoints.flatMap((p) => EXERCISE_RECOMMENDATIONS[p.area] || [])),
  ).slice(0, 8);

  const finalAssessment = {
    ...assessment,
    severity: severity as "low" | "moderate" | "high",
    recommendedExercises,
    treatmentPlan: TREATMENT_PLANS[severity],
  };

  const handleProceedToBooking = () => {
    completeAssessment(finalAssessment);
    navigate({ to: "/booking" });
  };

  return (
    <PageShell crumbs={navCrumbs.assessmentResults()} showFooter={false}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Assessment Complete
        </h1>
        <p className="text-muted-foreground mb-8">
          Based on your responses, here are the recommended exercises and treatment plan
        </p>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {/* Pain Areas */}
          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Areas Identified</p>
            <p className="font-display text-2xl font-bold text-foreground">
              {assessment.painPoints.length}
            </p>
          </div>

          {/* Average Pain Level */}
          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Average Intensity Level</p>
            <p className="font-display text-2xl font-bold text-foreground">{averagePainLevel}/10</p>
          </div>

          {/* Severity */}
          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Severity Level</p>
            <p
              className={`font-display text-2xl font-bold capitalize ${
                severity === "high"
                  ? "text-red-600"
                  : severity === "moderate"
                    ? "text-yellow-600"
                    : "text-green-600"
              }`}
            >
              {severity}
            </p>
          </div>
        </div>

        {/* Pain Points Details */}
        <div className="rounded-lg bg-card border border-border p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Selected Areas</h2>
          <div className="space-y-4">
            {assessment.painPoints.map((point, idx) => (
              <div key={point.area} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">
                    {idx + 1}. {point.area.replace(/_/g, " ").toUpperCase()}
                  </h3>
                  <span className="text-sm font-bold text-red-600">{point.level}/10</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Duration:</strong> {point.duration}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Type:</strong> {point.type}
                </p>
                {point.hasInjury && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Injury:</strong> {point.injuryDescription}
                  </p>
                )}
                {point.additionalNotes && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {point.additionalNotes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Plan */}
        <div className="mb-8 rounded-lg border border-primary/25 bg-primary/10 p-6">
          <div className="flex gap-4">
            <AlertCircle className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Recommended Treatment Plan</h3>
              <p className="text-sm text-muted-foreground">{finalAssessment.treatmentPlan}</p>
            </div>
          </div>
        </div>

        {/* Recommended Exercises */}
        <div className="rounded-lg bg-card border border-border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Recommended Exercises
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {recommendedExercises.map((exercise) => (
              <div
                key={exercise}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50"
              >
                <CheckCircle className="size-4 shrink-0 text-success" />
                <span className="text-sm text-foreground">{exercise}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-8 rounded-lg border border-warning/30 bg-warning/10 p-4">
          <div className="flex gap-3">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-warning" />
            <p className="text-sm text-foreground">
              These recommendations are based on your assessment. A qualified physiotherapist will
              provide a personalized treatment plan during your session.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/dashboard" })}
            className="flex-1 rounded-lg"
          >
            Save & Return
          </Button>
          <Button onClick={handleProceedToBooking} className="flex-1 rounded-lg">
            Book a Session
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
