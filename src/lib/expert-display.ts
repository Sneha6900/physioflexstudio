import type { Specialist } from "@/lib/specialists";
import { specialists } from "@/lib/specialists";

export type ExpertBadge = "verified" | "available-today" | "top-rated";

export const expertStats = [
  { value: "5,000+", label: "Successful Sessions" },
  { value: "95%", label: "Recovery Satisfaction" },
  { value: "15+", label: "Certified Specialists" },
  { value: "4.9★", label: "Average Client Rating" },
];

export const trustPoints = [
  "Licensed Physiotherapists",
  "Evidence-Based Recovery",
  "Personalized Treatment Plans",
  "Trusted By Thousands",
];

/** Top 3 specialists shown on the home Experts section */
export const featuredSpecialists: Specialist[] = [...specialists]
  .sort((a, b) => b.rating - a.rating || b.sessions - a.sessions)
  .slice(0, 3);

const focusBySpec: Record<string, string[]> = {
  "Sports Recovery": ["Neck Pain", "Back Pain", "Sports Recovery", "Mobility Coaching"],
  "Mobility Coaching": ["Neck Pain", "Back Pain", "Mobility Coaching", "Senior Wellness"],
  "Post-Surgery": ["Post-Surgery Recovery", "Back Pain", "Joint Stiffness", "Mobility Coaching"],
  "Posture Correction": ["Neck Pain", "Back Pain", "Posture Correction", "Senior Wellness"],
};

export function getExpertFocusAreas(spec: string) {
  return focusBySpec[spec] ?? ["Neck Pain", "Back Pain", "Mobility Coaching"];
}

export function getExpertBadges(expert: Specialist): ExpertBadge[] {
  const badges: ExpertBadge[] = ["verified"];
  if (expert.available === "Today") badges.push("available-today");
  if (expert.rating >= 4.9) badges.push("top-rated");
  return badges;
}

export const badgeLabels: Record<ExpertBadge, string> = {
  verified: "Verified",
  "available-today": "Available Today",
  "top-rated": "Top Rated",
};

export const timeSlots = [
  { time: "9:00 AM", recommended: false },
  { time: "10:30 AM", recommended: true, label: "Recommended" },
  { time: "1:00 PM", recommended: false },
  { time: "4:30 PM", recommended: false, label: "Tomorrow" },
  { time: "6:00 PM", recommended: false },
];
