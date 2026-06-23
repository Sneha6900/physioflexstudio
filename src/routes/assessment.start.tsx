import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BodyModel } from "@/components/site/BodyModel";
import { useClientAssessment } from "@/lib/client-assessment-store";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/assessment/start")({
  component: AssessmentStartPage,
  meta: () => [
    {
      title: "Start Assessment - PhysioFlex",
      description: "Select your pain areas to get started with assessment",
    },
  ],
});

function AssessmentStartPage() {
  const navigate = useNavigate();
  const {
    selectedAreas,
    addSelectedArea,
    removeSelectedArea,
    setCurrentStep,
  } = useClientAssessment();
  const [viewMode, setViewMode] = useState<"front" | "back">("front");

  const handleContinue = () => {
    if (selectedAreas.length > 0) {
      setCurrentStep("pain-details");
      navigate({ to: `/assessment/pain-details/${selectedAreas[0]}` });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Start Your Assessment
          </h1>
          <p className="text-muted-foreground">
            Select up to 3 pain areas on your body to help us understand your condition
          </p>
        </div>

        {/* Body Model */}
        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          <BodyModel
            selectedAreas={selectedAreas}
            onAreaSelect={addSelectedArea}
            onAreaDeselect={removeSelectedArea}
            maxSelections={3}
            viewMode={viewMode}
            onViewChange={setViewMode}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/dashboard" })}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={selectedAreas.length === 0}
              className="flex-1 rounded-lg"
            >
              Continue ({selectedAreas.length}/3)
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4 dark:bg-blue-900/30 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Tip:</strong> Select your primary pain areas. You can view both front and back of your body to accurately locate pain points.
          </p>
        </div>
      </div>
    </div>
  );
}
