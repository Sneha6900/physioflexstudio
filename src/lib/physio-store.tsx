import { useSyncExternalStore } from "react";
import e1 from "@/assets/expert-1.webp";
import e2 from "@/assets/expert-2.webp";
import e3 from "@/assets/expert-3.webp";
import e4 from "@/assets/expert-4.webp";

export type PhysioProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  reviews: number;
  years: number;
  specializations: string[];
  certifications: string[];
  bio: string;
  studioLocations: string[];
};

export type PhysioSessionStatus = "assigned" | "accepted" | "completed";

export type PhysioSession = {
  id: string;
  client: string;
  area: string;
  painZones: string[];
  summary: string;
  date: string;
  time: string;
  studio: string;
  status: PhysioSessionStatus;
  rating?: number;
  review?: string;
};

export type PhysioMetrics = {
  dailyTarget: number;
  weeklyTarget: number;
  completedToday: number;
  completedWeek: number;
  acceptanceRate: number;
  averageRating: number;
  sessionsAccepted: number;
};

export type PhysioState = {
  user: PhysioProfile | null;
  availability: boolean;
  sessions: PhysioSession[];
  metrics: PhysioMetrics;
};

const KEY = "physioflex-physio-store-v1";

const physioAccounts: PhysioProfile[] = [
  {
    id: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    email: "arjun@physioflex.com",
    avatar: e1,
    rating: 4.9,
    reviews: 312,
    years: 8,
    specializations: ["Sports Rehabilitation", "Mobility", "Manual Therapy"],
    certifications: [
      "MPT Sports Medicine",
      "Certified Strength & Conditioning Specialist",
      "Dry Needling Level 2",
    ],
    bio: "Former national-level athlete turned sports physiotherapist. Arjun helps active clients heal faster while preserving performance.",
    studioLocations: ["Indiranagar Studio", "Koramangala Studio"],
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    email: "priya@physioflex.com",
    avatar: e2,
    rating: 4.8,
    reviews: 248,
    years: 6,
    specializations: ["Mobility Coaching", "Posture", "Desk Discomfort"],
    certifications: ["MPT Musculoskeletal", "FMS Certified", "Yoga Therapy Diploma"],
    bio: "Priya builds sustainable mobility routines for desk professionals and older adults with a gentle, structured approach.",
    studioLocations: ["Whitefield Studio", "Indiranagar Studio"],
  },
  {
    id: "karan-rao",
    name: "Dr. Karan Rao",
    email: "karan@physioflex.com",
    avatar: e3,
    rating: 5.0,
    reviews: 401,
    years: 11,
    specializations: ["Post-Surgery", "Rehab", "Manual Therapy"],
    certifications: [
      "MPT Orthopaedics",
      "Post-Surgical Rehab Specialist",
      "Manual Therapy Certified",
    ],
    bio: "Karan guides post-operative clients through safe progress with precise progress checkpoints and hands-on supervision.",
    studioLocations: ["Koramangala Studio", "Whitefield Studio"],
  },
  {
    id: "sneha-iyer",
    name: "Dr. Sneha Iyer",
    email: "sneha@physioflex.com",
    avatar: e4,
    rating: 4.7,
    reviews: 186,
    years: 5,
    specializations: ["Posture Correction", "Ergonomics", "Core Stability"],
    certifications: [
      "MPT Musculoskeletal",
      "Postural Restoration Trained",
      "Ergonomics Consultant",
    ],
    bio: "Sneha helps clients undo postural strain through practical corrective exercise and long-term movement coaching.",
    studioLocations: ["Indiranagar Studio", "Whitefield Studio"],
  },
];

const defaultSessions: PhysioSession[] = [
  {
    id: "S-1023",
    client: "Maya R.",
    area: "Lower Back",
    painZones: ["Lower Back", "Hip"],
    summary: "Moderate lumbar discomfort with stiffness after long sitting, limited forward flexion.",
    date: "2026-07-03",
    time: "9:30 AM",
    studio: "Indiranagar Studio",
    status: "assigned",
  },
  {
    id: "S-1024",
    client: "Rohan S.",
    area: "Shoulder",
    painZones: ["Right Shoulder", "Upper Back"],
    summary: "Persistent shoulder tightness with overhead discomfort and reduced rotation.",
    date: "2026-07-03",
    time: "11:00 AM",
    studio: "Koramangala Studio",
    status: "accepted",
  },
  {
    id: "S-1021",
    client: "Neha T.",
    area: "Knee",
    painZones: ["Right Knee", "Quadriceps"],
    summary: "Post-activity aching with reduced knee flexion and solitary gait compensation.",
    date: "2026-07-02",
    time: "5:30 PM",
    studio: "Whitefield Studio",
    status: "completed",
    rating: 5,
    review:
      "Karan helped me feel stable again. I left the studio more confident in my knee mechanics.",
  },
  {
    id: "S-1022",
    client: "Aisha P.",
    area: "Neck",
    painZones: ["Neck", "Upper Back"],
    summary: "Stiff neck tension with tension headaches after long hours on laptop work.",
    date: "2026-07-02",
    time: "2:00 PM",
    studio: "Indiranagar Studio",
    status: "completed",
    rating: 4,
    review:
      "Priya guided my neck mobility drills perfectly. I felt immediate relief in my posture.",
  },
];

const defaultState: PhysioState = {
  user: null,
  availability: true,
  sessions: defaultSessions,
  metrics: {
    dailyTarget: 5,
    weeklyTarget: 28,
    completedToday: 2,
    completedWeek: 13,
    acceptanceRate: 92,
    averageRating: 4.9,
    sessionsAccepted: 8,
  },
};

let state: PhysioState = { ...defaultState };
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function persist() {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    }
  } catch {
    // ignore storage failures
  }
}

export function hydratePhysio() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      state = { ...defaultState, ...(JSON.parse(raw) as Partial<PhysioState>) };
      emit();
    }
  } catch {
    // ignore invalid data
  }
}

export function loginPhysio(email: string, password: string) {
  const user = physioAccounts.find((profile) => profile.email === email.toLowerCase());
  if (!user) return null;
  state = { ...state, user };
  persist();
  emit();
  return user;
}

export function logoutPhysio() {
  state = { ...state, user: null };
  persist();
  emit();
}

export function toggleAvailability() {
  state = { ...state, availability: !state.availability };
  persist();
  emit();
}

export function acceptSession(sessionId: string) {
  state = {
    ...state,
    sessions: state.sessions.map((session) =>
      session.id === sessionId && session.status === "assigned"
        ? { ...session, status: "accepted" }
        : session,
    ),
    metrics: {
      ...state.metrics,
      sessionsAccepted: state.metrics.sessionsAccepted + 1,
      acceptanceRate: Math.min(100, state.metrics.acceptanceRate + 1),
    },
  };
  persist();
  emit();
}

export function completeSession(sessionId: string) {
  state = {
    ...state,
    sessions: state.sessions.map((session) =>
      session.id === sessionId && session.status === "accepted"
        ? {
            ...session,
            status: "completed",
            rating: 5,
            review: "Delivered a structured session with strong follow-up guidance.",
          }
        : session,
    ),
    metrics: {
      ...state.metrics,
      completedToday: state.metrics.completedToday + 1,
      completedWeek: state.metrics.completedWeek + 1,
      averageRating:
        Math.round(
          ((state.metrics.averageRating * state.metrics.completedWeek + 5) /
            (state.metrics.completedWeek + 1)) *
            10,
        ) / 10,
    },
  };
  persist();
  emit();
}

export function updateProfile(patch: Partial<PhysioProfile>) {
  if (!state.user) return;
  state = { ...state, user: { ...state.user, ...patch } };
  persist();
  emit();
}

export function subscribePhysio(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePhysio() {
  return useSyncExternalStore(
    subscribePhysio,
    () => state,
    () => defaultState,
  );
}

export const physioAccountsList = physioAccounts;
