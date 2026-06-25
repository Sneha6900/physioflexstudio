import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useClientAuth } from "@/lib/client-auth-store";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/login/user/profile")({
  component: ClientProfilePage,
  meta: () => [
    {
      title: "Complete Your Profile - PhysioFlex",
      description: "Set up your health profile",
    },
  ],
});

const MEDICAL_CONDITIONS = [
  "Arthritis",
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Migraine",
  "Thyroid",
  "Back Problems",
];

const PREVIOUS_INJURIES = [
  "Fracture",
  "ACL Tear",
  "Shoulder Dislocation",
  "Ligament Tear",
  "Muscle Strain",
  "Disk Herniation",
  "Sprain",
];

function ClientProfilePage() {
  const navigate = useNavigate();
  const { setProfile } = useClientAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    occupation: "",
    height: "",
    weight: "",
    lifestyle: "",
    medicalHistory: [] as string[],
    previousInjuries: [] as string[],
    existingConditions: "",
  });

  const handleInputChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCheckboxChange = (
    field: "medicalHistory" | "previousInjuries",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const validateStep = (stepNum: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.age || Number(formData.age) < 18)
        newErrors.age = "Age must be at least 18";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
    }

    if (stepNum === 2) {
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.occupation.trim())
        newErrors.occupation = "Occupation is required";
      if (!formData.height || Number(formData.height) <= 0)
        newErrors.height = "Height is required";
      if (!formData.weight || Number(formData.weight) <= 0)
        newErrors.weight = "Weight is required";
      if (!formData.lifestyle) newErrors.lifestyle = "Lifestyle is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) setStep((step + 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      setProfile({
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender as "male" | "female" | "other",
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        occupation: formData.occupation,
        height: Number(formData.height),
        weight: Number(formData.weight),
        lifestyle: formData.lifestyle as "sedentary" | "active" | "athlete",
        medicalHistory: formData.medicalHistory,
        previousInjuries: formData.previousInjuries,
        existingConditions: formData.existingConditions,
      });
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <PageShell crumbs={navCrumbs.loginProfile()} showFooter={false}>
      <div className="mx-auto max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full mx-1 transition-colors ${
                  s <= step ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Step {step} of 3: {step === 1
              ? "Personal Information"
              : step === 2
              ? "Health & Lifestyle"
              : "Medical History"}
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Personal Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="30"
                    value={formData.age}
                    onChange={(e) =>
                      handleInputChange("age", e.target.value)
                    }
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-xs text-red-500 mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger
                      id="gender"
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Health & Lifestyle
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    placeholder="Software Engineer"
                    value={formData.occupation}
                    onChange={(e) =>
                      handleInputChange("occupation", e.target.value)
                    }
                    className={errors.occupation ? "border-red-500" : ""}
                  />
                  {errors.occupation && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.occupation}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    className={errors.height ? "border-red-500" : ""}
                  />
                  {errors.height && (
                    <p className="text-xs text-red-500 mt-1">{errors.height}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                    className={errors.weight ? "border-red-500" : ""}
                  />
                  {errors.weight && (
                    <p className="text-xs text-red-500 mt-1">{errors.weight}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="lifestyle">Lifestyle *</Label>
                  <Select
                    value={formData.lifestyle}
                    onValueChange={(value) =>
                      handleInputChange("lifestyle", value)
                    }
                  >
                    <SelectTrigger
                      id="lifestyle"
                      className={errors.lifestyle ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select lifestyle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">
                        Sedentary (Desk job, minimal movement)
                      </SelectItem>
                      <SelectItem value="active">
                        Active (Regular movement, some exercise)
                      </SelectItem>
                      <SelectItem value="athlete">
                        Athlete (Regular intense exercise)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.lifestyle && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lifestyle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Medical History
              </h2>

              <div>
                <Label className="mb-3 block">Medical Conditions</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {MEDICAL_CONDITIONS.map((condition) => (
                    <label
                      key={condition}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.medicalHistory.includes(
                          condition
                        )}
                        onCheckedChange={() =>
                          handleCheckboxChange("medicalHistory", condition)
                        }
                      />
                      <span className="text-sm text-foreground">
                        {condition}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Previous Injuries</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {PREVIOUS_INJURIES.map((injury) => (
                    <label
                      key={injury}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.previousInjuries.includes(
                          injury
                        )}
                        onCheckedChange={() =>
                          handleCheckboxChange("previousInjuries", injury)
                        }
                      />
                      <span className="text-sm text-foreground">{injury}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="conditions">
                  Any Existing Pain or Conditions (Optional)
                </Label>
                <Textarea
                  id="conditions"
                  placeholder="Describe any current pain or conditions..."
                  value={formData.existingConditions}
                  onChange={(e) =>
                    handleInputChange("existingConditions", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4">
            <Button
              variant="outline"
              onClick={() =>
                step > 1
                  ? setStep((step - 1) as 1 | 2 | 3)
                  : navigate({ to: "/login" })
              }
              className="flex-1 rounded-lg"
            >
              {step === 1 ? "Back" : "Previous"}
            </Button>

            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1 rounded-lg">
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex-1 rounded-lg"
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
