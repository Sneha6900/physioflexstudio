import { programImages } from "@/lib/recovery-programs";
import type { PainArea } from "@/lib/assessment-store";

export type Exercise = {
  name: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  benefits: string;
  thumb: string;
};

type Bucket = "back" | "hip" | "shoulder" | "general";

const pool: Record<Bucket, Exercise[]> = {
  back: [
    {
      name: "Cat-Cow Mobilization",
      duration: "4 min",
      difficulty: "Beginner",
      benefits: "Restores spinal flexion & extension",
      thumb: programImages.back,
    },
    {
      name: "Bird-Dog Hold",
      duration: "6 min",
      difficulty: "Intermediate",
      benefits: "Builds deep core & spinal stability",
      thumb: programImages.back,
    },
    {
      name: "Glute Bridge Series",
      duration: "5 min",
      difficulty: "Beginner",
      benefits: "Activates glutes, offloads lumbar spine",
      thumb: programImages.knee,
    },
    {
      name: "McGill Curl-Up",
      duration: "5 min",
      difficulty: "Intermediate",
      benefits: "Strengthens core without spinal load",
      thumb: programImages.back,
    },
  ],
  hip: [
    {
      name: "90/90 Hip Switches",
      duration: "6 min",
      difficulty: "Intermediate",
      benefits: "Improves internal & external rotation",
      thumb: programImages.hip,
    },
    {
      name: "Couch Stretch",
      duration: "4 min",
      difficulty: "Beginner",
      benefits: "Releases hip flexors & quads",
      thumb: programImages.stretch,
    },
    {
      name: "Banded Hip Hinge",
      duration: "5 min",
      difficulty: "Beginner",
      benefits: "Reinforces healthy hinge pattern",
      thumb: programImages.hip,
    },
    {
      name: "Cossack Squat",
      duration: "5 min",
      difficulty: "Advanced",
      benefits: "Builds lateral hip mobility & strength",
      thumb: programImages.balance,
    },
  ],
  shoulder: [
    {
      name: "Wall Slides",
      duration: "4 min",
      difficulty: "Beginner",
      benefits: "Restores overhead range of motion",
      thumb: programImages.shoulder,
    },
    {
      name: "Band Pull-Aparts",
      duration: "5 min",
      difficulty: "Beginner",
      benefits: "Strengthens upper back & rotator cuff",
      thumb: programImages.shoulder,
    },
    {
      name: "Scapular CARs",
      duration: "6 min",
      difficulty: "Intermediate",
      benefits: "Improves controlled shoulder mobility",
      thumb: programImages.shoulder,
    },
    {
      name: "Prone Y-T-W Raises",
      duration: "5 min",
      difficulty: "Intermediate",
      benefits: "Activates posterior shoulder stabilizers",
      thumb: programImages.shoulder,
    },
  ],
  general: [
    {
      name: "Full-Body Flow",
      duration: "8 min",
      difficulty: "Beginner",
      benefits: "Gentle mobility for every joint",
      thumb: programImages.stretch,
    },
    {
      name: "Joint CARs Circuit",
      duration: "6 min",
      difficulty: "Intermediate",
      benefits: "Controlled articular rotations head to toe",
      thumb: programImages.stretch,
    },
    {
      name: "Dynamic Stretch Set",
      duration: "5 min",
      difficulty: "Beginner",
      benefits: "Primes tissues & improves circulation",
      thumb: programImages.stretch,
    },
    {
      name: "Stability & Balance",
      duration: "6 min",
      difficulty: "Intermediate",
      benefits: "Builds proprioception & control",
      thumb: programImages.balance,
    },
  ],
};

function bucket(area: PainArea | null): Bucket {
  if (!area) return "general";
  if (area === "Lower Back" || area === "Upper Back" || area === "Neck") return "back";
  if (area === "Hip" || area === "Knee" || area === "Ankle") return "hip";
  if (area === "Shoulder" || area === "Wrist") return "shoulder";
  return "general";
}

export function getExercises(area: PainArea | null): Exercise[] {
  return pool[bucket(area)];
}

export function getStretches(area: PainArea | null): { name: string; duration: string }[] {
  const b = bucket(area);
  const map: Record<Bucket, { name: string; duration: string }[]> = {
    back: [
      { name: "Child's Pose", duration: "60s" },
      { name: "Seated Spinal Twist", duration: "45s each" },
      { name: "Knee-to-Chest", duration: "45s each" },
    ],
    hip: [
      { name: "Pigeon Pose", duration: "60s each" },
      { name: "Figure-4 Stretch", duration: "45s each" },
      { name: "Deep Squat Hold", duration: "60s" },
    ],
    shoulder: [
      { name: "Cross-Body Stretch", duration: "45s each" },
      { name: "Doorway Pec Stretch", duration: "60s" },
      { name: "Thread the Needle", duration: "45s each" },
    ],
    general: [
      { name: "Standing Forward Fold", duration: "60s" },
      { name: "World's Greatest Stretch", duration: "45s each" },
      { name: "Neck Releases", duration: "30s each" },
    ],
  };
  return map[b];
}

export const dailyGoals = [
  "Complete your guided mobility routine",
  "Hit 6,000 steps of light movement",
  "Hold 3 prescribed stretches (2 min total)",
  "Log your intensity & stiffness score",
];
