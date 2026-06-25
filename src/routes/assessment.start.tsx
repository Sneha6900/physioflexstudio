import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PainAreaSelector } from "@/components/site/PainAreaSelector";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { useClientAssessment } from "@/lib/client-assessment-store";
import {
  bodyPartToSlug,
  bodyParts,
  slugToBodyPart,
  type BodyPart,
} from "@/lib/journey-body";

export const Route = createFileRoute("/assessment/start")({
  component: AssessmentStartPage,
  meta: () => [
    {
      title: "Start Assessment — PhysioFlex Studio",
      description: "Select your pain areas to get started with assessment",
    },
  ],
});

function toBodyParts(areas: string[]): BodyPart[] {
  return areas
    .map((a) => {
      const bySlug = slugToBodyPart(a);
      if (bySlug) return bySlug;
      return bodyParts.includes(a as BodyPart) ? (a as BodyPart) : null;
    })
    .filter((p): p is BodyPart => p !== null);
}

function AssessmentStartPage() {
  const navigate = useNavigate();
  const { selectedAreas, setCurrentStep } = useClientAssessment();

  const selectedParts = useMemo(() => toBodyParts(selectedAreas), [selectedAreas]);

  const handleChange = (parts: BodyPart[]) => {
    useClientAssessment.setState({ selectedAreas: parts });
  };

  const handleContinue = () => {
    if (selectedParts.length > 0) {
      setCurrentStep("pain-details");
      navigate({ to: `/assessment/pain-details/${bodyPartToSlug(selectedParts[0])}` });
    }
  };

  return (
    <PageShell crumbs={navCrumbs.assessmentStart()} showFooter={false}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="type-page mb-2 text-foreground">Start Your Assessment</h1>
          <p className="type-body text-muted-foreground">
            Select up to 3 pain areas on your body to help us understand your condition
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8">
          <PainAreaSelector
            selected={selectedParts}
            onChange={handleChange}
            showHelp={false}
            title="Select your pain areas"
            description="Tap the body illustration or choose regions below — up to 3 areas"
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/dashboard" })}
              className="h-11 min-h-11 flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={selectedParts.length === 0}
              className="h-11 min-h-11 flex-1 rounded-lg"
            >
              Continue ({selectedParts.length}/3)
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[#91ddcf]/25 bg-[#91ddcf]/10 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Many patients feel pain in more than
            one area — for example neck and shoulder, or lower back and hip. Select all regions
            that apply.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
