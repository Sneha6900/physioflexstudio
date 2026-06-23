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

export type Gender = "Female" | "Male" | "Other" | "Prefer not to say";

export type Profile = {
  name: string;
  age: number | null;
  gender: Gender;
  height: number | null;
  weight: number | null;
  occupation: string;
  sittingHours: number | null;
  medicalHistory: string;
  previousInjuries: string;
  emergencyContact: string;
};

export type PainMarker = {
  id: number;
  part: PainArea | null;
  painLevel: number;
  duration: string;
  stiffness: number;
  mobility: "Low" | "Medium" | "High";
  notes: string;
};

export type AssessmentData = {
  profile: Profile;
  markers: PainMarker[];
  area: PainArea | null;
  customPainArea?: string;
  customPainDescription?: string;
  painLevel: number;
  duration: string;
  stiffness: number;
  previousInjury: "Yes" | "No" | null;
  mobility: "Low" | "Medium" | "High" | null;
  ageGroup: string;
  journey: Journey | null;
  specialistId: string | null;
  booking: { studio: string; date: string; time: string; bookingId: string } | null;
  completed: boolean;
};

const KEY = "physioflex-assessment-v1";

const defaultData: AssessmentData = {
  profile: {
    name: "",
    age: null,
    gender: "Prefer not to say",
    height: null,
    weight: null,
    occupation: "",
    sittingHours: null,
    medicalHistory: "",
    previousInjuries: "",
    emergencyContact: "",
  },
  markers: [],
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

const mobilityPenalty = (mobility: "Low" | "Medium" | "High") =>
  mobility === "High" ? 42 : mobility === "Medium" ? 26 : 12;

const mobilityLabel = (mobility: "Low" | "Medium" | "High") =>
  mobility === "High" ? "severely reduced" : mobility === "Medium" ? "reduced" : "slightly limited";

export type Scores = {
  painSeverity: number;
  mobilityScore: number;
  flexibilityScore: number;
  recoveryIndex: number;
  weeks: number;
};

export function computeScores(d: AssessmentData): Scores {
  const markers = d.markers.length ? d.markers : [{ painLevel: 5, stiffness: 5, mobility: "Medium" as const }];
  const avgPain = markers.reduce((sum, m) => sum + m.painLevel, 0) / markers.length;
  const avgStiffness = markers.reduce((sum, m) => sum + m.stiffness, 0) / markers.length;
  const worstMobility = markers.reduce<"Low" | "Medium" | "High">((worst, m) => {
    const order = { Low: 0, Medium: 1, High: 2 };
    return order[m.mobility] > order[worst] ? m.mobility : worst;
  }, "Low");
  const injuryPenalty = d.profile.previousInjuries.trim() ? 8 : 0;

  const painSeverity = clamp(avgPain * 10);
  const mobilityScore = clamp(100 - mobilityPenalty(worstMobility) - avgPain * 2.5);
  const flexibilityScore = clamp(100 - avgStiffness * 6 - mobilityPenalty(worstMobility) * 0.5);
  const recoveryIndex = clamp(
    100 - avgPain * 4 - avgStiffness * 3 - mobilityPenalty(worstMobility) * 0.7 - injuryPenalty,
  );
  const weeks = Math.max(2, Math.round(avgPain * 0.8 + mobilityPenalty(worstMobility) / 10 + injuryPenalty / 5));

  return { painSeverity, mobilityScore, flexibilityScore, recoveryIndex, weeks };
}

export function clinicalInsight(d: AssessmentData): string {
  if (!d.markers.length) {
    return "Complete your pain markers to unlock a personalized clinical summary focused on mobility and pain relief.";
  }

  const [first] = d.markers;
  const area = (first.part ?? "the affected area").toLowerCase();
  const sevWord = first.painLevel >= 7 ? "significant" : first.painLevel >= 4 ? "moderate" : "mild";
  const mobWord = mobilityLabel(first.mobility);

  return `Based on your assessment, ${sevWord} ${area} discomfort and ${mobWord} range of motion were observed. Your recovery program prioritizes targeted assisted stretching, posture correction, and progressive mobility work to relieve pain safely.`;
}