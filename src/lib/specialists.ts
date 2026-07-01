import type { PainArea, PainMarker } from "@/lib/assessment-store";
import e1 from "@/assets/expert-1.webp";
import e2 from "@/assets/expert-2.webp";
import e3 from "@/assets/expert-3.webp";
import e4 from "@/assets/expert-4.webp";

export type Review = { name: string; rating: number; text: string };

export type Specialist = {
  id: string;
  name: string;
  img: string;
  rating: number;
  reviews: number;
  sessions: number;
  years: number;
  spec: string;
  available: string;
  bio: string;
  certifications: string[];
  studios: string[];
  reviewList: Review[];
};

export const specialists: Specialist[] = [
  {
    id: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    img: e1,
    rating: 4.9,
    reviews: 312,
    sessions: 1200,
    years: 8,
    spec: "Sports Rehabilitation",
    available: "Today",
    bio: "Sports physiotherapist specializing in returning athletes and active individuals to peak performance using movement science and data-driven tracking.",
    certifications: [
      "MPT Sports Medicine",
      "Certified Strength & Conditioning Specialist",
      "Dry Needling Level 2",
    ],
    studios: ["Indiranagar", "Koramangala"],
    reviewList: [
      {
        name: "Rohan S.",
        rating: 5,
        text: "Got me back to running freely in 6 weeks. Incredible attention to detail.",
      },
      {
        name: "Meera K.",
        rating: 5,
        text: "Truly understands athletes. The progress tracking kept me motivated.",
      },
      {
        name: "Aditya P.",
        rating: 4,
        text: "Professional and structured sessions. Highly recommend.",
      },
    ],
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    img: e2,
    rating: 4.8,
    reviews: 248,
    sessions: 980,
    years: 6,
    spec: "Mobility Coaching",
    available: "Tomorrow",
    bio: "Specialist in functional mobility for desk professionals and seniors. Designs gentle, sustainable routines to restore range of motion.",
    certifications: ["MPT Musculoskeletal", "FMS Certified", "Yoga Therapy Diploma"],
    studios: ["Whitefield", "Indiranagar"],
    reviewList: [
      {
        name: "Sanjana R.",
        rating: 5,
        text: "My neck and shoulder mobility transformed. Patient and encouraging.",
      },
      {
        name: "Vikram T.",
        rating: 5,
        text: "Finally fixed my desk posture issues. Worth every session.",
      },
      {
        name: "Latha M.",
        rating: 4,
        text: "Gentle and effective for my age. Felt safe throughout.",
      },
    ],
  },
  {
    id: "karan-rao",
    name: "Dr. Karan Rao",
    img: e3,
    rating: 5.0,
    reviews: 401,
    sessions: 1560,
    years: 11,
    spec: "Post-Surgery",
    available: "Today",
    bio: "Rehabilitation specialist with 11+ years guiding safe recovery milestones after knee, hip, and spinal surgeries.",
    certifications: [
      "MPT Orthopaedics",
      "Post-Surgical Rehab Specialist",
      "Manual Therapy Certified",
    ],
    studios: ["Koramangala", "Whitefield"],
    reviewList: [
      {
        name: "Deepak N.",
        rating: 5,
        text: "Post knee-replacement rehabilitation was smooth thanks to Karan. A true expert.",
      },
      { name: "Anita G.", rating: 5, text: "Careful, knowledgeable and reassuring at every step." },
      {
        name: "Suresh B.",
        rating: 5,
        text: "Best rehab experience. Hit every milestone ahead of schedule.",
      },
    ],
  },
  {
    id: "sneha-iyer",
    name: "Dr. Sneha Iyer",
    img: e4,
    rating: 4.7,
    reviews: 186,
    sessions: 740,
    years: 5,
    spec: "Posture Correction",
    available: "This week",
    bio: "Corrects posture and alignment issues through targeted exercise, ergonomic coaching, and building healthy movement habits.",
    certifications: [
      "MPT Musculoskeletal",
      "Postural Restoration Trained",
      "Ergonomics Consultant",
    ],
    studios: ["Indiranagar", "Whitefield"],
    reviewList: [
      {
        name: "Nikhil A.",
        rating: 5,
        text: "My rounded shoulders are gone. Practical advice that actually sticks.",
      },
      { name: "Pooja D.", rating: 4, text: "Great for posture. Friendly and motivating sessions." },
      {
        name: "Rahul V.",
        rating: 5,
        text: "Back stiffness from sitting all day is finally manageable.",
      },
    ],
  },
];

export function getSpecialist(id: string | null | undefined) {
  return specialists.find((s) => s.id === id);
}

export function recommendSpecialistForAssessment(
  area: PainArea | null,
  markers: PainMarker[],
  age: number | null,
) {
  const defaultSpecialist = specialists[0];
  if (!area) return defaultSpecialist;

  const lowMobility = markers.some((marker) => marker.mobility === "Low");
  const highPain = markers.some((marker) => marker.painLevel >= 8);

  if (area === "Lower Back" || area === "Hip" || area === "Knee" || area === "Ankle") {
    return specialists.find((s) => s.id === "karan-rao") ?? defaultSpecialist;
  }

  if (area === "Neck" || area === "Shoulder" || area === "Upper Back") {
    return lowMobility || highPain
      ? (specialists.find((s) => s.id === "priya-nair") ?? defaultSpecialist)
      : (specialists.find((s) => s.id === "arjun-mehta") ?? defaultSpecialist);
  }

  if (area === "Wrist") {
    return specialists.find((s) => s.id === "arjun-mehta") ?? defaultSpecialist;
  }

  return specialists.find((s) => s.id === "sneha-iyer") ?? defaultSpecialist;
}

export const studioLocations = [
  "Indiranagar Studio",
  "Koramangala Studio",
  "Whitefield Studio",
  "HSR Layout Studio",
];

export const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "4:30 PM", "6:00 PM"];

export function nextDays(count: number) {
  const days: { iso: string; label: string; dow: string }[] = [];
  const base = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return days;
}
