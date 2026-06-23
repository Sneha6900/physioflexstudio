import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, Flame, Target, Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { getExercises } from "@/lib/exercises";
import exHip from "@/assets/ex-hip.jpg";
import exBack from "@/assets/ex-back.jpg";
import exShoulder from "@/assets/ex-shoulder.jpg";
import studio from "@/assets/studio.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "All Programs — PhysioFlex Studio" },
      {
        name: "description",
        content: "Browse all guided exercise programs designed for recovery and mobility.",
      },
    ],
  }),
  component: ProgramsIndex,
});

const allPrograms = [
  {
    title: "Deep Hip Flexor Release",
    level: "Beginner",
    area: "Hip",
    duration: "8 min",
    benefit: "Improves hip mobility and reduces lower-body stiffness.",
    img: exHip,
    category: "hip",
    description:
      "Targeted release sequence specifically designed to open up tight hip flexors, a common source of lower back pain.",
  },
  {
    title: "Spinal Mobility Flow",
    level: "Intermediate",
    area: "Lower Back",
    duration: "12 min",
    benefit: "Restores spinal range of motion and eases back tension.",
    img: exShoulder,
    category: "back",
    description:
      "Dynamic flow combining extension, flexion, and rotation to restore full spinal movement patterns.",
  },
  {
    title: "Shoulder Band Activation",
    level: "Advanced",
    area: "Shoulder",
    duration: "10 min",
    benefit: "Builds shoulder stability and corrects posture.",
    img: exShoulder,
    category: "shoulder",
    description:
      "Comprehensive shoulder strengthening routine focusing on rotator cuff and stabilizer activation.",
  },
  {
    title: "Cat-Cow Mobilization",
    level: "Beginner",
    area: "Lower Back",
    duration: "4 min",
    benefit: "Restores spinal flexion & extension",
    img: exBack,
    category: "back",
    description:
      "Gentle spinal articulation exercise that mobilizes the entire spine through flexion and extension.",
  },
  {
    title: "Bird-Dog Hold",
    level: "Intermediate",
    area: "Lower Back",
    duration: "6 min",
    benefit: "Builds deep core & spinal stability",
    img: studio,
    category: "back",
    description:
      "Foundational core stability exercise that teaches anti-rotation control and spinal neutrality.",
  },
  {
    title: "90/90 Hip Switches",
    level: "Intermediate",
    area: "Hip",
    duration: "6 min",
    benefit: "Improves internal & external rotation",
    img: exHip,
    category: "hip",
    description:
      "Advanced hip mobility drill that trains independent hip rotation in both directions.",
  },
  {
    title: "Wall Slides",
    level: "Beginner",
    area: "Shoulder",
    duration: "4 min",
    benefit: "Restores overhead range of motion",
    img: exShoulder,
    category: "shoulder",
    description:
      "Simple yet effective shoulder mobility exercise for improving overhead position.",
  },
  {
    title: "Couch Stretch",
    level: "Beginner",
    area: "Hip",
    duration: "4 min",
    benefit: "Releases hip flexors & quads",
    img: hero,
    category: "hip",
    description:
      "Deep passive stretch targeting chronically tight hip flexors and anterior chain.",
  },
  {
    title: "Band Pull-Aparts",
    level: "Beginner",
    area: "Shoulder",
    duration: "5 min",
    benefit: "Strengthens upper back & rotator cuff",
    img: studio,
    category: "shoulder",
    description:
      "Postural strengthening exercise that activates the upper back and improves shoulder blade stability.",
  },
  {
    title: "Cossack Squat",
    level: "Advanced",
    area: "Hip",
    duration: "5 min",
    benefit: "Builds lateral hip mobility & strength",
    img: exHip,
    category: "hip",
    description:
      "Challenging lateral mobility pattern that combines strength and flexibility in the frontal plane.",
  },
  {
    title: "Scapular CARs",
    level: "Intermediate",
    area: "Shoulder",
    duration: "6 min",
    benefit: "Improves controlled shoulder mobility",
    img: exShoulder,
    category: "shoulder",
    description:
      "Advanced shoulder mobility work using controlled articular rotations for maximum range.",
  },
  {
    title: "Glute Bridge Series",
    level: "Beginner",
    area: "Lower Back",
    duration: "5 min",
    benefit: "Activates glutes, offloads lumbar spine",
    img: hero,
    category: "back",
    description:
      "Essential glute activation sequence that reduces lower back strain and improves hip extension.",
  },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-primary",
  Intermediate: "bg-chart-4/20 text-foreground",
  Advanced: "bg-primary/15 text-primary",
};

const categoryColors: Record<string, string> = {
  all: "bg-primary text-primary-foreground",
  back: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  hip: "bg-green-500/20 text-green-700 dark:text-green-300",
  shoulder: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
};

function ProgramsIndex() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filtered = allPrograms.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.benefit.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || p.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">All Programs</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover our complete library of guided exercises, carefully designed for your recovery journey.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 space-y-4"
        >
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Body Area</p>
            <div className="flex flex-wrap gap-2">
              {["all", "back", "hip", "shoulder"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? `${categoryColors[cat]} shadow-md`
                      : "bg-border text-foreground hover:bg-border/80"
                  }`}
                >
                  {cat === "all" ? "All Areas" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Difficulty Level</p>
            <div className="flex flex-wrap gap-2">
              {["all", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-border text-foreground hover:bg-border/80"
                  }`}
                >
                  {level === "all" ? "All Levels" : level}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-sm text-muted-foreground"
        >
          Showing {filtered.length} program{filtered.length !== 1 ? "s" : ""}
        </motion.p>

        {/* Programs Grid */}
        {filtered.length > 0 ? (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((program) => (
              <motion.article
                key={program.title}
                variants={itemVariants}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={program.img}
                    alt={program.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${levelColor[program.level]}`}
                  >
                    {program.level}
                  </span>
                  <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-accent text-charcoal opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ChevronRight className="size-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-foreground">{program.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{program.benefit}</p>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Target className="size-4 text-primary" /> {program.area}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4 text-primary" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame className="size-4 text-primary" /> {program.level}
                    </span>
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Start Program
                  </Button>
                </div>
              </motion.article>
            ))}
          </Stagger>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-card/50 p-12 text-center"
          >
            <p className="text-lg text-muted-foreground">
              No programs found matching your criteria. Try adjusting your filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
