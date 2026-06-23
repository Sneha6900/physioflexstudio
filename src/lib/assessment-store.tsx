import { useSyncExternalStore } from "react";

export type PainArea =
  | "Neck"
  | "Shoulder"
  | "Upper Back"
  | "Lower Back"
  | "Hip"
  | "Knee"
  | "Ankle"
  | "Wrist"
  | "Other";

export type Journey = "self" | "expert";

export type AssessmentData = {
  area: PainArea | null;
  painLevel: number;
  duration: string;
  stiffness: number;
  previousInjury: "Yes" | "No" | null;
  mobility: "Low" | "Medium" | "High" | null;
  ageGroup: string;
  journey: Journey | null;
  specialistId: string | null;
  booking: { studio: string; date: string; time: string } | null;
  completed: boolean;
};

const KEY = "physioflex-assessment-v1";

const defaultData: AssessmentData = {
  area: null,
  painLevel: 5,
  duration: "",
  stiffness: 4,
  previousInjury: null,
  mobility: null,
  ageGroup: "",
  journey: null,
  specialistId: null,
  booking: null,
  completed: false,
};

let state: AssessmentData = { ...defaultData };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    }
  } catch {
    /* ignore */
  }
}

export function hydrateAssessment() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      state = { ...defaultData, ...(JSON.parse(raw) as Partial<AssessmentData>) };
      emit();
    }
  } catch {
    /* ignore */
  }
}

export function setAssessment(patch: Partial<AssessmentData>) {
  state = { ...state, ...patch };
  persist();
  emit();
}

export function resetAssessment() {
  state = { ...defaultData };
  persist();
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useAssessment(): AssessmentData {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => defaultData,
  );
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export type Scores = {
  painSeverity: number;
  mobilityScore: number;
  flexibilityScore: number;
  recoveryIndex: number;
  weeks: number;
};

export function computeScores(d: AssessmentData): Scores {
  const sev = d.painLevel; // 1-10
  const stiff = d.stiffness; // 1-10
  const mobPenalty = d.mobility === "High" ? 42 : d.mobility === "Medium" ? 26 : 12;
  const injuryPenalty = d.previousInjury === "Yes" ? 10 : 0;

  const painSeverity = clamp(sev * 10);
  const mobilityScore = clamp(100 - mobPenalty - sev * 2.5);
  const flexibilityScore = clamp(100 - stiff * 6 - mobPenalty * 0.5);
  const recoveryIndex = clamp(
    100 - sev * 4 - stiff * 3 - mobPenalty * 0.7 - injuryPenalty,
  );
  const weeks = Math.max(2, Math.round(sev * 0.8 + (mobPenalty / 10) + (injuryPenalty / 5)));

  return { painSeverity, mobilityScore, flexibilityScore, recoveryIndex, weeks };
}

export function aiInsight(d: AssessmentData): string {
  const area = (d.area ?? "the affected area").toLowerCase();
  const sevWord = d.painLevel >= 7 ? "significant" : d.painLevel >= 4 ? "moderate" : "mild";
  const mobWord =
    d.mobility === "High" ? "severely reduced" : d.mobility === "Medium" ? "reduced" : "slightly limited";
  return `Based on your assessment, ${sevWord} ${area} discomfort and ${mobWord} range of motion were detected${
    d.previousInjury === "Yes" ? ", compounded by a prior injury in this region" : ""
  }. Your personalized plan prioritizes controlled mobility, targeted stretching, and progressive loading to restore function safely.`;
}