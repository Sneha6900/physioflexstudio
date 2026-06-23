import { create } from "zustand";

export interface PainPoint {
  id: string;
  area: string; // e.g., "neck", "shoulder", "lower_back", etc.
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  duration: string; // e.g., "1 week", "2 months"
  type: "sharp" | "dull" | "burning" | "throbbing";
  hasInjury: boolean;
  injuryDescription: string;
  additionalNotes: string;
}

export interface ClientAssessment {
  painPoints: PainPoint[];
  recommendedExercises: string[];
  treatmentPlan: string;
  severity: "low" | "moderate" | "high";
  completedAt?: string;
}

export interface ClientAssessmentState {
  assessment: ClientAssessment | null;
  currentStep: "select-areas" | "pain-details" | "results" | null;
  selectedAreas: string[];
  currentPainDetails: Partial<PainPoint> | null;
  setCurrentStep: (step: "select-areas" | "pain-details" | "results" | null) => void;
  addSelectedArea: (area: string) => void;
  removeSelectedArea: (area: string) => void;
  setPainDetails: (painPoint: PainPoint) => void;
  completeAssessment: (assessment: ClientAssessment) => void;
  resetAssessment: () => void;
}

export const useClientAssessment = create<ClientAssessmentState>((set) => ({
  assessment: null,
  currentStep: null,
  selectedAreas: [],
  currentPainDetails: null,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  addSelectedArea: (area) =>
    set((state) => {
      if (state.selectedAreas.length < 3 && !state.selectedAreas.includes(area)) {
        return { selectedAreas: [...state.selectedAreas, area] };
      }
      return state;
    }),
  
  removeSelectedArea: (area) =>
    set((state) => ({
      selectedAreas: state.selectedAreas.filter((a) => a !== area),
    })),
  
  setPainDetails: (painPoint) =>
    set((state) => {
      const updatedPoints = state.assessment?.painPoints || [];
      const existingIndex = updatedPoints.findIndex((p) => p.area === painPoint.area);
      
      if (existingIndex >= 0) {
        updatedPoints[existingIndex] = painPoint;
      } else {
        updatedPoints.push(painPoint);
      }
      
      return {
        assessment: state.assessment
          ? { ...state.assessment, painPoints: updatedPoints }
          : { painPoints: updatedPoints, recommendedExercises: [], treatmentPlan: "", severity: "moderate" },
      };
    }),
  
  completeAssessment: (assessment) => set({ assessment, currentStep: "results" }),
  
  resetAssessment: () =>
    set({
      assessment: null,
      currentStep: null,
      selectedAreas: [],
      currentPainDetails: null,
    }),
}));
