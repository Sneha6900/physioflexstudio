import type { BodyPart } from "@/lib/journey-body";
import bodyBase from "@/assets/body-layers/body-base.webp";
import neckLayer from "@/assets/body-layers/neck-layer.webp";
import shoulderLayer from "@/assets/body-layers/shoulder-layer.webp";
import upperBackLayer from "@/assets/body-layers/upper-back-layer.webp";
import midBackLayer from "@/assets/body-layers/mid-back-layer.webp";
import lowerBackLayer from "@/assets/body-layers/lower-back-layer.webp";
import hipLayer from "@/assets/body-layers/hip-layer.webp";
import kneeLayer from "@/assets/body-layers/knee-layer.webp";
import ankleLayer from "@/assets/body-layers/ankle-layer.webp";
import wristLayer from "@/assets/body-layers/wrist-layer.webp";
import elbowLayer from "@/assets/body-layers/elbow-layer.webp";

export const bodyBaseImage = bodyBase;

export const bodyLayerImages: Record<BodyPart, string> = {
  Neck: neckLayer,
  Shoulder: shoulderLayer,
  "Upper Back": upperBackLayer,
  "Mid Back": midBackLayer,
  "Lower Back": lowerBackLayer,
  Hip: hipLayer,
  Knee: kneeLayer,
  Ankle: ankleLayer,
  Wrist: wristLayer,
  Elbow: elbowLayer,
};

/** Precise landmark positions (% of image, center point) from anatomical segmentation. */
export type BodyLandmark = {
  id: string;
  part: BodyPart;
  label: string;
  left: number;
  top: number;
};

export const bodyLandmarks: BodyLandmark[] = [
  { id: "neck-front", part: "Neck", label: "Neck", left: 30.16, top: 8.6 },
  { id: "neck-back", part: "Neck", label: "Neck", left: 69.5, top: 9.2 },
  { id: "shoulder-front-l", part: "Shoulder", label: "Left Shoulder", left: 24.27, top: 20.82 },
  { id: "shoulder-front-r", part: "Shoulder", label: "Right Shoulder", left: 32.86, top: 19.19 },
  { id: "shoulder-back-l", part: "Shoulder", label: "Left Shoulder", left: 62.5, top: 19.5 },
  { id: "shoulder-back-r", part: "Shoulder", label: "Right Shoulder", left: 77.5, top: 19.5 },
  { id: "elbow-front-l", part: "Elbow", label: "Left Elbow", left: 21.48, top: 33.66 },
  { id: "elbow-front-r", part: "Elbow", label: "Right Elbow", left: 35.77, top: 31.41 },
  { id: "elbow-back-l", part: "Elbow", label: "Left Elbow", left: 62.0, top: 31.5 },
  { id: "elbow-back-r", part: "Elbow", label: "Right Elbow", left: 82.5, top: 31.5 },
  { id: "wrist-front-l", part: "Wrist", label: "Left Wrist", left: 20.24, top: 42.14 },
  { id: "wrist-front-r", part: "Wrist", label: "Right Wrist", left: 35.22, top: 41.98 },
  { id: "wrist-back-l", part: "Wrist", label: "Left Wrist", left: 62.5, top: 42.0 },
  { id: "wrist-back-r", part: "Wrist", label: "Right Wrist", left: 82.0, top: 42.0 },
  { id: "hip-front-l", part: "Hip", label: "Left Hip", left: 24.92, top: 48.13 },
  { id: "hip-front-r", part: "Hip", label: "Right Hip", left: 33.44, top: 47.99 },
  { id: "hip-back-l", part: "Hip", label: "Left Hip", left: 66.5, top: 48.0 },
  { id: "hip-back-r", part: "Hip", label: "Right Hip", left: 77.5, top: 48.0 },
  { id: "knee-front-l", part: "Knee", label: "Left Knee", left: 25.46, top: 64.55 },
  { id: "knee-front-r", part: "Knee", label: "Right Knee", left: 34.05, top: 64.49 },
  { id: "knee-back-l", part: "Knee", label: "Left Knee", left: 66.5, top: 64.5 },
  { id: "knee-back-r", part: "Knee", label: "Right Knee", left: 77.5, top: 64.5 },
  { id: "ankle-front-l", part: "Ankle", label: "Left Ankle", left: 25.52, top: 85.98 },
  { id: "ankle-front-r", part: "Ankle", label: "Right Ankle", left: 35.04, top: 85.75 },
  { id: "ankle-back-l", part: "Ankle", label: "Left Ankle", left: 66.5, top: 86.0 },
  { id: "ankle-back-r", part: "Ankle", label: "Right Ankle", left: 77.5, top: 86.0 },
  { id: "upper-back", part: "Upper Back", label: "Upper Back", left: 69.74, top: 20.4 },
  { id: "mid-back", part: "Mid Back", label: "Mid Back", left: 70.07, top: 31.67 },
  { id: "lower-back", part: "Lower Back", label: "Lower Back", left: 69.15, top: 45.08 },
];

/** One clinical marker per body part — shown when that part is selected. */
export const primaryLandmarks: Record<BodyPart, { left: number; top: number }> = {
  Neck: { left: 69.5, top: 9.2 },
  Shoulder: { left: 77.5, top: 19.5 },
  "Upper Back": { left: 69.74, top: 20.4 },
  "Mid Back": { left: 70.07, top: 31.67 },
  "Lower Back": { left: 69.15, top: 45.08 },
  Hip: { left: 29.18, top: 48.06 },
  Knee: { left: 29.76, top: 64.52 },
  Ankle: { left: 30.28, top: 85.87 },
  Wrist: { left: 27.73, top: 42.06 },
  Elbow: { left: 28.63, top: 32.54 },
};

/** Invisible tap targets (% bounding box). */
export type InteractionZone = {
  id: string;
  part: BodyPart;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const W = 1536;
const H = 1024;

function box(
  id: string,
  part: BodyPart,
  label: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): InteractionZone {
  return {
    id,
    part,
    label,
    x: (x1 / W) * 100,
    y: (y1 / H) * 100,
    w: ((x2 - x1) / W) * 100,
    h: ((y2 - y1) / H) * 100,
  };
}

export const bodyInteractionZones: InteractionZone[] = [
  box("neck-front", "Neck", "Neck", 355, 55, 495, 125),
  box("neck-back", "Neck", "Neck", 1005, 55, 1145, 125),
  box("shoulder-front-l", "Shoulder", "Left Shoulder", 300, 155, 400, 235),
  box("shoulder-front-r", "Shoulder", "Right Shoulder", 465, 155, 565, 235),
  box("shoulder-back-l", "Shoulder", "Left Shoulder", 925, 155, 1010, 235),
  box("shoulder-back-r", "Shoulder", "Right Shoulder", 1120, 155, 1210, 235),
  box("elbow-front-l", "Elbow", "Left Elbow", 245, 285, 340, 365),
  box("elbow-front-r", "Elbow", "Right Elbow", 515, 285, 590, 365),
  box("elbow-back-l", "Elbow", "Left Elbow", 930, 285, 1025, 365),
  box("elbow-back-r", "Elbow", "Right Elbow", 1200, 285, 1280, 365),
  box("wrist-front-l", "Wrist", "Left Wrist", 235, 395, 330, 465),
  box("wrist-front-r", "Wrist", "Right Wrist", 520, 395, 590, 465),
  box("wrist-back-l", "Wrist", "Left Wrist", 930, 395, 1025, 465),
  box("wrist-back-r", "Wrist", "Right Wrist", 1205, 395, 1280, 465),
  box("hip-front-l", "Hip", "Left Hip", 325, 455, 420, 565),
  box("hip-front-r", "Hip", "Right Hip", 465, 455, 585, 565),
  box("hip-back-l", "Hip", "Left Hip", 1000, 455, 1090, 565),
  box("hip-back-r", "Hip", "Right Hip", 1130, 455, 1260, 565),
  box("knee-front-l", "Knee", "Left Knee", 335, 615, 430, 715),
  box("knee-front-r", "Knee", "Right Knee", 465, 615, 585, 715),
  box("knee-back-l", "Knee", "Left Knee", 1005, 615, 1095, 715),
  box("knee-back-r", "Knee", "Right Knee", 1130, 615, 1260, 715),
  box("ankle-front-l", "Ankle", "Left Ankle", 340, 835, 430, 920),
  box("ankle-front-r", "Ankle", "Right Ankle", 465, 835, 585, 920),
  box("ankle-back-l", "Ankle", "Left Ankle", 1010, 835, 1095, 920),
  box("ankle-back-r", "Ankle", "Right Ankle", 1130, 835, 1260, 920),
  box("upper-back", "Upper Back", "Upper Back", 970, 125, 1190, 265),
  box("mid-back", "Mid Back", "Mid Back", 970, 265, 1190, 395),
  box("lower-back", "Lower Back", "Lower Back", 970, 395, 1190, 530),
];
