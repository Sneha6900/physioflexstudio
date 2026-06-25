import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, ShieldCheck, Target, Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { itemVariants, Stagger } from "@/components/site/Reveal";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { allRecoveryPrograms } from "@/lib/recovery-programs";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "All Programs — PhysioFlex Studio" },
      {
        name: "description",
        content: "Browse therapist-guided recovery programs for mobility, pain relief, and rehabilitation.",
      },
    ],
  }),
  component: ProgramsIndex,
});

const allPrograms = allRecoveryPrograms;

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
    <PageShell crumbs={navCrumbs.programs()}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="type-section text-foreground">All Programs</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Therapist-guided recovery programs for all ages — mobility, pain relief, and rehabilitation.
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
                      <ShieldCheck className="size-4 text-primary" /> Guided
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
    </PageShell>
  );
}
