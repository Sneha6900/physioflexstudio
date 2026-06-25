import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ClientProfile {
  id?: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  city: string;
  occupation: string;
  height: number; // cm
  weight: number; // kg
  medicalHistory: string[];
  previousInjuries: string[];
  lifestyle: "sedentary" | "active" | "athlete";
  existingConditions: string;
}

export interface ClientAuthState {
  isLoggedIn: boolean;
  signUpMethod: "email" | "phone" | "google" | null;
  profile: ClientProfile | null;
  setSignUpMethod: (method: "email" | "phone" | "google") => void;
  setProfile: (profile: ClientProfile) => void;
  logout: () => void;
}

const defaultProfile: ClientProfile = {
  name: "",
  age: 0,
  gender: "other",
  phone: "",
  email: "",
  city: "",
  occupation: "",
  height: 0,
  weight: 0,
  medicalHistory: [],
  previousInjuries: [],
  lifestyle: "active",
  existingConditions: "",
};

export const useClientAuth = create<ClientAuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      signUpMethod: null,
      profile: null,
      setSignUpMethod: (method) => set({ signUpMethod: method }),
      setProfile: (profile) => set({ profile, isLoggedIn: true, signUpMethod: null }),
      logout: () =>
        set({
          isLoggedIn: false,
          signUpMethod: null,
          profile: null,
        }),
    }),
    {
      name: "client-auth-store",
    },
  ),
);
