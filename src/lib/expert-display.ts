import type { Specialist } from "@/lib/specialists";
import { specialists } from "@/lib/specialists";

export type ExpertBadge = "verified" | "available-today" | "top-rated";

export const expertStats = [
  { target: 5000, suffix: "+", label: "Successful Sessions", useGrouping: true },
  { target: 95, suffix: "%", label: "Client Satisfaction" },
  { target: 15, suffix: "+", label: "Certified Specialists" },
  { target: 4.9, suffix: "★", label: "Average Client Rating", decimals: 1 },
] as const;

export const trustPoints = [
  "Licensed Physiotherapists",
  "Evidence-Based Care",
  "Personalized Treatment Plans",
  "Trusted By Thousands",
];

/** Top 3 specialists shown on the home Experts section */
export const featuredSpecialists: Specialist[] = [...specialists]
  .sort((a, b) => b.rating - a.rating || b.sessions - a.sessions)
  .slice(0, 3);

const focusBySpec: Record<string, string[]> = {
  "Sports Rehabilitation": ["Neck Care", "Back Care", "Sports Rehabilitation", "Mobility Coaching"],
  "Mobility Coaching": ["Neck Care", "Back Care", "Mobility Coaching", "Senior Wellness"],
  "Post-Surgery": ["Post-Surgery Rehabilitation", "Back Care", "Joint Stiffness", "Mobility Coaching"],
  "Posture Correction": ["Neck Care", "Back Care", "Posture Correction", "Senior Wellness"],
};

export function getExpertFocusAreas(spec: string) {
  return focusBySpec[spec] ?? ["Neck Care", "Back Care", "Mobility Coaching"];
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
