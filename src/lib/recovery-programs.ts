import programHipMobility from "@/assets/program-hip-mobility.webp";
import programBackRecovery from "@/assets/program-back-recovery.webp";
import programShoulderRehab from "@/assets/program-shoulder-rehab.webp";
import programBalanceTraining from "@/assets/program-balance-training.webp";
import programKneeRecovery from "@/assets/program-knee-recovery.webp";
import programAssistedStretch from "@/assets/program-assisted-stretch.webp";

export const programImages = {
  hip: programHipMobility,
  back: programBackRecovery,
  shoulder: programShoulderRehab,
  balance: programBalanceTraining,
  knee: programKneeRecovery,
  stretch: programAssistedStretch,
} as const;

export type RecoveryProgram = {
  img: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  area: string;
  duration: string;
  benefit: string;
  category: "hip" | "back" | "shoulder";
  description: string;
};

export const featuredRecoveryPrograms: RecoveryProgram[] = [
  {
    img: programHipMobility,
    title: "Hip Mobility Program",
    level: "Beginner",
    area: "Hip",
    duration: "10 min",
    benefit: "Therapist-guided hip stretches to ease stiffness and restore comfortable movement.",
    category: "hip",
    description:
      "One-on-one hip mobility work with your physiotherapist — ideal for adults managing joint tightness or lower-body discomfort.",
  },
  {
    img: programBackRecovery,
    title: "Back Pain Recovery",
    level: "Beginner",
    area: "Lower Back",
    duration: "12 min",
    benefit: "Gentle spinal mobility exercises for lasting relief from back and neck tension.",
    category: "back",
    description:
      "Supervised spinal mobility session focused on safe, gradual improvement for chronic back pain and posture recovery.",
  },
  {
    img: programShoulderRehab,
    title: "Shoulder Rehabilitation",
    level: "Intermediate",
    area: "Shoulder",
    duration: "10 min",
    benefit: "Resistance-band shoulder therapy to rebuild strength and improve daily posture.",
    category: "shoulder",
    description:
      "Guided shoulder rehabilitation using bands under therapist supervision — designed for adults recovering from strain or injury.",
  },
  {
    img: programBalanceTraining,
    title: "Senior Movement Program",
    level: "Beginner",
    area: "Balance",
    duration: "15 min",
    benefit: "Balance and stability training for safe, confident movement in everyday life.",
    category: "hip",
    description:
      "Therapist-led balance and mobility work for seniors — building confidence, preventing falls, and improving independence.",
  },
  {
    img: programKneeRecovery,
    title: "Post-Surgery Recovery",
    level: "Beginner",
    area: "Knee",
    duration: "14 min",
    benefit: "Gradual knee rehabilitation with supervised exercises for post-operative healing.",
    category: "hip",
    description:
      "Structured post-surgery knee recovery with hands-on therapist support — paced for safe mobility gains after joint procedures.",
  },
  {
    img: programAssistedStretch,
    title: "Assisted Stretching Session",
    level: "Beginner",
    area: "Full Body",
    duration: "12 min",
    benefit: "Personalized assisted stretching in a calm, premium clinic environment.",
    category: "back",
    description:
      "One-on-one assisted stretching for adults 40+ — easing muscle tension and improving flexibility with professional care.",
  },
];

export const homeRecoveryPrograms: RecoveryProgram[] = [
  {
    img: programBalanceTraining,
    title: "Senior Movement Program",
    level: "Beginner",
    area: "Balance",
    duration: "15 min",
    benefit: "Balance and stability training for safe, confident movement in everyday life.",
    category: "hip",
    description:
      "Therapist-led balance and mobility work for seniors — building confidence, preventing falls, and improving independence.",
  },
  {
    img: programKneeRecovery,
    title: "Post-Surgery Recovery",
    level: "Beginner",
    area: "Knee",
    duration: "14 min",
    benefit: "Gradual knee rehabilitation with supervised exercises for post-operative healing.",
    category: "hip",
    description:
      "Structured post-surgery knee recovery with hands-on therapist support — paced for safe mobility gains after joint procedures.",
  },
  {
    img: programAssistedStretch,
    title: "Assisted Stretching Session",
    level: "Beginner",
    area: "Full Body",
    duration: "12 min",
    benefit: "Personalized assisted stretching in a calm, premium clinic environment.",
    category: "back",
    description:
      "One-on-one assisted stretching for adults 40+ — easing muscle tension and improving flexibility with professional care.",
  },
];

export const allRecoveryPrograms: RecoveryProgram[] = [
  ...featuredRecoveryPrograms,
  {
    img: programBackRecovery,
    title: "Cat-Cow Mobilization",
    level: "Beginner",
    area: "Lower Back",
    duration: "4 min",
    benefit: "Restores gentle spinal flexion and extension with therapist guidance.",
    category: "back",
    description:
      "Slow, controlled spinal articulation — a foundational recovery exercise for back pain and morning stiffness.",
  },
  {
    img: programBackRecovery,
    title: "Bird-Dog Hold",
    level: "Intermediate",
    area: "Lower Back",
    duration: "6 min",
    benefit: "Builds deep core stability while protecting the lumbar spine.",
    category: "back",
    description:
      "Supervised core stability work that strengthens the back without aggravating existing pain or mobility limits.",
  },
  {
    img: programBackRecovery,
    title: "Dead Bug Series",
    level: "Beginner",
    area: "Lower Back",
    duration: "5 min",
    benefit: "Teaches anti-rotation control and spinal neutrality for daily activities.",
    category: "back",
    description:
      "Low-impact core rehabilitation exercise — ideal for adults rebuilding strength after back injury or prolonged discomfort.",
  },
  {
    img: programHipMobility,
    title: "90/90 Hip Switches",
    level: "Intermediate",
    area: "Hip",
    duration: "6 min",
    benefit: "Improves hip rotation and reduces lower-body restriction.",
    category: "hip",
    description:
      "Guided hip mobility drill for adults with tight hips — improves rotation safely under physiotherapist supervision.",
  },
  {
    img: programShoulderRehab,
    title: "Wall Slides",
    level: "Beginner",
    area: "Shoulder",
    duration: "4 min",
    benefit: "Restores comfortable overhead range of motion.",
    category: "shoulder",
    description:
      "Gentle shoulder mobility exercise for adults recovering from stiffness, strain, or postural neck-and-shoulder pain.",
  },
  {
    img: programAssistedStretch,
    title: "Couch Stretch",
    level: "Beginner",
    area: "Hip",
    duration: "4 min",
    benefit: "Releases tight hip flexors and eases anterior chain tension.",
    category: "hip",
    description:
      "Assisted passive stretch targeting chronically tight hip flexors — a common contributor to lower back discomfort in adults 40+.",
  },
  {
    img: programShoulderRehab,
    title: "Band Pull-Aparts",
    level: "Beginner",
    area: "Shoulder",
    duration: "5 min",
    benefit: "Strengthens upper back and rotator cuff for better posture.",
    category: "shoulder",
    description:
      "Therapeutic postural strengthening — activates the upper back and improves shoulder blade stability for desk workers and seniors.",
  },
  {
    img: programBalanceTraining,
    title: "Cossack Squat",
    level: "Advanced",
    area: "Hip",
    duration: "5 min",
    benefit: "Builds lateral hip mobility with therapist-supported progression.",
    category: "hip",
    description:
      "Advanced guided mobility pattern for patients ready to progress — combines lateral range with controlled stability work.",
  },
  {
    img: programShoulderRehab,
    title: "Scapular CARs",
    level: "Intermediate",
    area: "Shoulder",
    duration: "6 min",
    benefit: "Improves controlled shoulder mobility and joint health.",
    category: "shoulder",
    description:
      "Supervised controlled articular rotations for shoulder recovery — restoring smooth, pain-free movement patterns.",
  },
  {
    img: programKneeRecovery,
    title: "Glute Bridge Series",
    level: "Beginner",
    area: "Lower Back",
    duration: "5 min",
    benefit: "Activates glutes and reduces strain on the lumbar spine.",
    category: "back",
    description:
      "Essential glute activation sequence for back pain recovery — reduces lower back load and supports hip extension.",
  },
];
