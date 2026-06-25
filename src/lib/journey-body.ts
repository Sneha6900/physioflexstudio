import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Circle,
  Footprints,
  Hand,
  Move,
  PersonStanding,
  Scan,
  Target,
} from "lucide-react";

export type BodyPart =
  | "Neck"
  | "Shoulder"
  | "Upper Back"
  | "Mid Back"
  | "Lower Back"
  | "Hip"
  | "Knee"
  | "Ankle"
  | "Wrist"
  | "Elbow";

export const MAX_PAIN_AREA_SELECTIONS = 3;

export function togglePainAreaSelection(
  selected: BodyPart[],
  part: BodyPart,
): { next: BodyPart[]; limitReached: boolean } {
  if (selected.includes(part)) {
    return { next: selected.filter((p) => p !== part), limitReached: false };
  }
  if (selected.length >= MAX_PAIN_AREA_SELECTIONS) {
    return { next: selected, limitReached: true };
  }
  return { next: [...selected, part], limitReached: false };
}

export function bodyPartToSlug(part: BodyPart): string {
  return encodeURIComponent(part);
}

export function slugToBodyPart(slug: string): BodyPart | null {
  try {
    const decoded = decodeURIComponent(slug) as BodyPart;
    return bodyParts.includes(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

export const bodyParts: BodyPart[] = [
  "Neck",
  "Shoulder",
  "Upper Back",
  "Mid Back",
  "Lower Back",
  "Hip",
  "Knee",
  "Ankle",
  "Wrist",
  "Elbow",
];

/** Percentage positions relative to the anatomical image bounds (top/left = center). */
export type BodyZone = {
  top: number;
  left: number;
  w: number;
  h: number;
};

export type BodyHotspot = {
  zones: BodyZone[];
};

export const bodyHotspots: Record<BodyPart, BodyHotspot> = {
  Neck: {
    zones: [
      { top: 9.5, left: 27.5, w: 7, h: 5 },
      { top: 9.5, left: 72.5, w: 7, h: 5 },
    ],
  },
  Shoulder: {
    zones: [
      { top: 17.5, left: 19.5, w: 8, h: 6 },
      { top: 17.5, left: 35.5, w: 8, h: 6 },
      { top: 17.5, left: 64.5, w: 8, h: 6 },
      { top: 17.5, left: 80.5, w: 8, h: 6 },
    ],
  },
  "Upper Back": {
    zones: [{ top: 24, left: 72.5, w: 11, h: 7 }],
  },
  "Mid Back": {
    zones: [{ top: 33.5, left: 72.5, w: 11, h: 7 }],
  },
  "Lower Back": {
    zones: [{ top: 43, left: 72.5, w: 11, h: 8 }],
  },
  Hip: {
    zones: [
      { top: 47.5, left: 27.5, w: 10, h: 6 },
      { top: 47.5, left: 72.5, w: 10, h: 6 },
    ],
  },
  Knee: {
    zones: [
      { top: 64, left: 27.5, w: 8, h: 7 },
      { top: 64, left: 72.5, w: 8, h: 7 },
    ],
  },
  Ankle: {
    zones: [
      { top: 83, left: 27.5, w: 7, h: 5 },
      { top: 83, left: 72.5, w: 7, h: 5 },
    ],
  },
  Wrist: {
    zones: [
      { top: 41, left: 12.5, w: 6, h: 5 },
      { top: 41, left: 42.5, w: 6, h: 5 },
    ],
  },
  Elbow: {
    zones: [
      { top: 31, left: 14.5, w: 6, h: 6 },
      { top: 31, left: 40.5, w: 6, h: 6 },
      { top: 31, left: 59.5, w: 6, h: 6 },
      { top: 31, left: 85.5, w: 6, h: 6 },
    ],
  },
};

export type AreaMeta = {
  icon: LucideIcon;
  painLevel: string;
  painTone: string;
  impact: string;
  impactTone: string;
  recovery: string;
  movements: string[];
};

export const areaMeta: Record<BodyPart, AreaMeta> = {
  Neck: {
    icon: Circle,
    painLevel: "Moderate",
    painTone: "text-amber-700 bg-amber-100",
    impact: "Medium",
    impactTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    recovery: "2–3 Weeks",
    movements: ["Turning head", "Looking up"],
  },
  Shoulder: {
    icon: Move,
    painLevel: "Moderate",
    painTone: "text-amber-700 bg-amber-100",
    impact: "High",
    impactTone: "text-[#9d4a7a] bg-[#f19ed2]/25",
    recovery: "3–5 Weeks",
    movements: ["Reaching overhead", "Lifting"],
  },
  "Upper Back": {
    icon: Scan,
    painLevel: "Mild",
    painTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    impact: "Medium",
    impactTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    recovery: "2–4 Weeks",
    movements: ["Sitting upright", "Deep breathing"],
  },
  "Mid Back": {
    icon: Scan,
    painLevel: "Moderate",
    painTone: "text-amber-700 bg-amber-100",
    impact: "Medium",
    impactTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    recovery: "3–4 Weeks",
    movements: ["Twisting", "Bending"],
  },
  "Lower Back": {
    icon: Target,
    painLevel: "Moderate",
    painTone: "text-amber-700 bg-amber-100",
    impact: "High",
    impactTone: "text-[#9d4a7a] bg-[#f19ed2]/25",
    recovery: "2–4 Weeks",
    movements: ["Bending", "Sitting", "Standing"],
  },
  Hip: {
    icon: PersonStanding,
    painLevel: "Moderate",
    painTone: "text-amber-700 bg-amber-100",
    impact: "High",
    impactTone: "text-[#9d4a7a] bg-[#f19ed2]/25",
    recovery: "4–6 Weeks",
    movements: ["Walking", "Stairs", "Squatting"],
  },
  Knee: {
    icon: Activity,
    painLevel: "Moderate",
    painTone: "text-amber-700 bg-amber-100",
    impact: "High",
    impactTone: "text-[#9d4a7a] bg-[#f19ed2]/25",
    recovery: "3–6 Weeks",
    movements: ["Walking", "Kneeling", "Stairs"],
  },
  Ankle: {
    icon: Footprints,
    painLevel: "Mild",
    painTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    impact: "Medium",
    impactTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    recovery: "2–3 Weeks",
    movements: ["Walking", "Balance"],
  },
  Wrist: {
    icon: Hand,
    painLevel: "Mild",
    painTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    impact: "Low",
    impactTone: "text-muted-foreground bg-secondary",
    recovery: "1–3 Weeks",
    movements: ["Typing", "Gripping"],
  },
  Elbow: {
    icon: Move,
    painLevel: "Mild",
    painTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    impact: "Medium",
    impactTone: "text-[#5ba99a] bg-[#91ddcf]/20",
    recovery: "2–3 Weeks",
    movements: ["Lifting", "Pulling"],
  },
};
