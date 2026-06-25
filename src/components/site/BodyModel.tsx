import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface BodyPartConfig {
  id: string;
  name: string;
  label: string;
  color: string;
}

const BODY_PARTS: BodyPartConfig[] = [
  { id: "head", name: "Head/Neck", label: "Head/Neck", color: "#ef4444" },
  { id: "shoulder", name: "Shoulder", label: "Shoulders", color: "#f97316" },
  { id: "chest", name: "Chest", label: "Chest", color: "#eab308" },
  { id: "upper_back", name: "Upper Back", label: "Upper Back", color: "#f97316" },
  { id: "arm", name: "Arms", label: "Arms", color: "#eab308" },
  { id: "elbow", name: "Elbow", label: "Elbow", color: "#eab308" },
  { id: "forearm", name: "Forearm", label: "Forearm", color: "#eab308" },
  { id: "wrist", name: "Wrist", label: "Wrist", color: "#84cc16" },
  { id: "hand", name: "Hand", label: "Hand", color: "#84cc16" },
  { id: "abdomen", name: "Abdomen", label: "Abdomen", color: "#06b6d4" },
  { id: "lower_back", name: "Lower Back", label: "Lower Back", color: "#f97316" },
  { id: "hip", name: "Hip", label: "Hip", color: "#06b6d4" },
  { id: "thigh", name: "Thigh", label: "Thigh", color: "#06b6d4" },
  { id: "knee", name: "Knee", label: "Knee", color: "#8b5cf6" },
  { id: "calf", name: "Calf", label: "Calf", color: "#8b5cf6" },
  { id: "ankle", name: "Ankle", label: "Ankle", color: "#8b5cf6" },
  { id: "foot", name: "Foot", label: "Foot", color: "#8b5cf6" },
];

interface BodyModelProps {
  selectedAreas: string[];
  onAreaSelect: (area: string) => void;
  onAreaDeselect: (area: string) => void;
  maxSelections?: number;
  viewMode?: "front" | "back";
  onViewChange?: (view: "front" | "back") => void;
}

export function BodyModel({
  selectedAreas,
  onAreaSelect,
  onAreaDeselect,
  maxSelections = 3,
  viewMode = "front",
  onViewChange,
}: BodyModelProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleAreaClick = (areaId: string) => {
    if (selectedAreas.includes(areaId)) {
      onAreaDeselect(areaId);
    } else if (selectedAreas.length < maxSelections) {
      onAreaSelect(areaId);
    }
  };

  const getBodyPartColor = (areaId: string) => {
    if (selectedAreas.includes(areaId)) return "#ef4444";
    if (hoveredArea === areaId) return "#fbbf24";
    return "#d1d5db";
  };

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onViewChange?.("front")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "front"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          Front View
        </button>
        <button
          onClick={() => onViewChange?.("back")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "back"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          Back View
        </button>
      </div>

      {/* Body SVG */}
      <div className="flex justify-center py-4 sm:py-8">
        <svg
          viewBox="0 0 200 600"
          className="h-auto w-full max-w-[min(100%,16rem)] drop-shadow-lg sm:max-w-[18rem] md:max-w-[15rem]"
          preserveAspectRatio="xMidYMid meet"
        >
          {viewMode === "front" ? (
            <>
              {/* Head */}
              <circle
                cx="100"
                cy="40"
                r="25"
                fill={getBodyPartColor("head")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors hover:opacity-80"
                onClick={() => handleAreaClick("head")}
                onMouseEnter={() => setHoveredArea("head")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Neck */}
              <rect
                x="90"
                y="62"
                width="20"
                height="15"
                fill={getBodyPartColor("neck")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("head")}
                onMouseEnter={() => setHoveredArea("head")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Shoulders & Chest */}
              <path
                d="M 60 75 L 140 75 L 135 130 L 65 130 Z"
                fill={getBodyPartColor("shoulder")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("shoulder")}
                onMouseEnter={() => setHoveredArea("shoulder")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Upper Body */}
              <path
                d="M 65 130 L 135 130 L 130 220 L 70 220 Z"
                fill={getBodyPartColor("chest")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("chest")}
                onMouseEnter={() => setHoveredArea("chest")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Left Arm */}
              <path
                d="M 65 135 L 40 200 L 45 210 L 70 140 Z"
                fill={getBodyPartColor("arm")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("arm")}
                onMouseEnter={() => setHoveredArea("arm")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Right Arm */}
              <path
                d="M 135 135 L 160 200 L 155 210 L 130 140 Z"
                fill={getBodyPartColor("arm")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("arm")}
                onMouseEnter={() => setHoveredArea("arm")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Abdomen */}
              <path
                d="M 70 220 L 130 220 L 125 280 L 75 280 Z"
                fill={getBodyPartColor("abdomen")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("abdomen")}
                onMouseEnter={() => setHoveredArea("abdomen")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Left Thigh */}
              <path
                d="M 75 280 L 90 380 L 85 385 L 70 285 Z"
                fill={getBodyPartColor("thigh")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("thigh")}
                onMouseEnter={() => setHoveredArea("thigh")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Right Thigh */}
              <path
                d="M 125 280 L 110 380 L 115 385 L 130 285 Z"
                fill={getBodyPartColor("thigh")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("thigh")}
                onMouseEnter={() => setHoveredArea("thigh")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Left Calf */}
              <path
                d="M 85 385 L 80 470 L 85 475 L 90 390 Z"
                fill={getBodyPartColor("calf")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("calf")}
                onMouseEnter={() => setHoveredArea("calf")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Right Calf */}
              <path
                d="M 115 385 L 120 470 L 115 475 L 110 390 Z"
                fill={getBodyPartColor("calf")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("calf")}
                onMouseEnter={() => setHoveredArea("calf")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Left Foot */}
              <rect
                x="75"
                y="470"
                width="10"
                height="20"
                fill={getBodyPartColor("foot")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("foot")}
                onMouseEnter={() => setHoveredArea("foot")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Right Foot */}
              <rect
                x="115"
                y="470"
                width="10"
                height="20"
                fill={getBodyPartColor("foot")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("foot")}
                onMouseEnter={() => setHoveredArea("foot")}
                onMouseLeave={() => setHoveredArea(null)}
              />
            </>
          ) : (
            <>
              {/* Back View Head */}
              <circle
                cx="100"
                cy="40"
                r="25"
                fill={getBodyPartColor("head")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("head")}
                onMouseEnter={() => setHoveredArea("head")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Back View Upper Back */}
              <path
                d="M 60 75 L 140 75 L 135 180 L 65 180 Z"
                fill={getBodyPartColor("upper_back")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("upper_back")}
                onMouseEnter={() => setHoveredArea("upper_back")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Lower Back */}
              <path
                d="M 70 180 L 130 180 L 125 280 L 75 280 Z"
                fill={getBodyPartColor("lower_back")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("lower_back")}
                onMouseEnter={() => setHoveredArea("lower_back")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              {/* Back Legs */}
              <path
                d="M 75 280 L 90 380 L 85 385 L 70 285 Z"
                fill={getBodyPartColor("thigh")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("thigh")}
                onMouseEnter={() => setHoveredArea("thigh")}
                onMouseLeave={() => setHoveredArea(null)}
              />

              <path
                d="M 125 280 L 110 380 L 115 385 L 130 285 Z"
                fill={getBodyPartColor("thigh")}
                stroke="#333"
                strokeWidth="2"
                className="cursor-pointer transition-colors"
                onClick={() => handleAreaClick("thigh")}
                onMouseEnter={() => setHoveredArea("thigh")}
                onMouseLeave={() => setHoveredArea(null)}
              />
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3">
        {selectedAreas.map((area) => {
          const part = BODY_PARTS.find((p) => p.id === area);
          return (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-900 dark:text-red-200"
            >
              {part?.label}
            </motion.div>
          );
        })}
      </div>

      {/* Selection Counter */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-semibold">{selectedAreas.length}</span> /{" "}
          <span>{maxSelections}</span>
        </p>
        {selectedAreas.length === 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Click on body parts to select pain areas
          </p>
        )}
      </div>
    </div>
  );
}
