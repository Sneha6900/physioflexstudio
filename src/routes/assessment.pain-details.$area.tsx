import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useClientAssessment } from "@/lib/client-assessment-store";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import { bodyPartToSlug, slugToBodyPart } from "@/lib/journey-body";

export const Route = createFileRoute("/assessment/pain-details/$area")({
  component: PainDetailsPage,
  meta: () => [
    {
      title: "Pain Details — PhysioFlex Studio",
      description: "Provide details about your pain",
    },
  ],
});

function PainDetailsPage() {
  const navigate = useNavigate();
  const { area: areaParam } = Route.useParams();
  const { selectedAreas, setPainDetails } = useClientAssessment();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const areaName = slugToBodyPart(areaParam) ?? decodeURIComponent(areaParam);
  const currentIndex = selectedAreas.findIndex(
    (a) => a === areaName || decodeURIComponent(a) === areaName,
  );
  const isLastArea = currentIndex === selectedAreas.length - 1;
  const nextArea = !isLastArea ? selectedAreas[currentIndex + 1] : null;

  const [formData, setFormData] = useState({
    level: 5,
    duration: "",
    type: "",
    hasInjury: false,
    injuryDescription: "",
    additionalNotes: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.type) newErrors.type = "Pain type is required";
    if (formData.hasInjury && !formData.injuryDescription.trim()) {
      newErrors.injuryDescription = "Please describe the injury";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setPainDetails({
        id: areaName,
        area: areaName,
        level: formData.level as any,
        duration: formData.duration,
        type: formData.type as any,
        hasInjury: formData.hasInjury,
        injuryDescription: formData.injuryDescription,
        additionalNotes: formData.additionalNotes,
      });

      if (isLastArea) {
        navigate({ to: "/assessment/results" });
      } else {
        navigate({ to: `/assessment/pain-details/${bodyPartToSlug(nextArea)}` });
      }
    }
  };

  const getBodyPartDisplayName = (areaId: string) =>
    slugToBodyPart(areaId) ?? decodeURIComponent(areaId);

  return (
    <PageShell
      crumbs={navCrumbs.assessmentPainDetails(getBodyPartDisplayName(areaParam))}
      showFooter={false}
    >
      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {selectedAreas.map((a, i) => (
              <div
                key={a}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= currentIndex ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {getBodyPartDisplayName(areaParam)} Pain Details
            </h1>
            <p className="text-muted-foreground">
              Area {currentIndex + 1} of {selectedAreas.length}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-card border border-border p-6 md:p-8 space-y-6">
          {/* Pain Level Slider */}
          <div>
            <Label className="mb-3 block">Pain Level: {formData.level}/10</Label>
            <Slider
              value={[formData.level]}
              onValueChange={(value) =>
                handleInputChange("level", value[0])
              }
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration">How long have you had this pain? *</Label>
            <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
              <SelectTrigger id="duration" className={errors.duration ? "border-red-500" : ""}>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-week">Less than 1 week</SelectItem>
                <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                <SelectItem value="1-3-months">1-3 months</SelectItem>
                <SelectItem value="3-6-months">3-6 months</SelectItem>
                <SelectItem value="6-12-months">6-12 months</SelectItem>
                <SelectItem value="more-than-year">More than 1 year</SelectItem>
              </SelectContent>
            </Select>
            {errors.duration && (
              <p className="text-xs text-red-500 mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Pain Type */}
          <div>
            <Label htmlFor="type">Type of pain *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger id="type" className={errors.type ? "border-red-500" : ""}>
                <SelectValue placeholder="Select pain type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sharp">Sharp (stabbing)</SelectItem>
                <SelectItem value="dull">Dull (aching)</SelectItem>
                <SelectItem value="burning">Burning</SelectItem>
                <SelectItem value="throbbing">Throbbing (pulsing)</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-xs text-red-500 mt-1">{errors.type}</p>
            )}
          </div>

          {/* Injury */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={formData.hasInjury}
                onCheckedChange={(checked) =>
                  handleInputChange("hasInjury", checked)
                }
              />
              <span className="text-sm font-medium text-foreground">
                Is this related to an injury?
              </span>
            </label>

            {formData.hasInjury && (
              <div>
                <Label htmlFor="injury">Describe the injury *</Label>
                <Textarea
                  id="injury"
                  placeholder="E.g., fell while exercising, sports injury, car accident..."
                  value={formData.injuryDescription}
                  onChange={(e) =>
                    handleInputChange("injuryDescription", e.target.value)
                  }
                  className={`min-h-[80px] ${
                    errors.injuryDescription ? "border-red-500" : ""
                  }`}
                />
                {errors.injuryDescription && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.injuryDescription}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any other relevant information about your pain..."
              value={formData.additionalNotes}
              onChange={(e) =>
                handleInputChange("additionalNotes", e.target.value)
              }
              className="min-h-[80px]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/assessment/start" })}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button onClick={handleContinue} className="flex-1 rounded-lg">
              {isLastArea ? "View Results" : "Next Area"}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
