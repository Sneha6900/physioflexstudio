import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { HomeScrollRestore } from "@/components/site/HomeScrollRestore";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Assessment } from "@/components/sections/Assessment";
import { Exercises } from "@/components/sections/Exercises";
import { Experts } from "@/components/sections/Experts";
import { Progress } from "@/components/sections/Progress";
import { Locations } from "@/components/sections/Locations";
import { FinalCta } from "@/components/sections/FinalCta";
import heroBg from "@/assets/hero-physio-clinic.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhysioFlex Studio — Regain Mobility. Reduce Pain." },
      {
        name: "description",
        content:
          "Professional physiotherapy for adults 40+. Pain relief, assisted stretching, posture correction, and mobility recovery — designed for neck pain, back pain, and joint stiffness.",
      },
      { property: "og:title", content: "PhysioFlex Studio — Regain Mobility. Reduce Pain." },
      {
        property: "og:description",
        content:
          "A trusted mobility and recovery studio helping adults move confidently again with licensed physiotherapists and evidence-based treatment.",
      },
    ],
    links: [{ rel: "preload", as: "image", href: heroBg, type: "image/webp" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <HomeScrollRestore />
      <Nav hero />
      <main>
        <Hero />
        <Journey />
        <Assessment />
        <Exercises />
        <Experts />
        <Progress />
        <Locations />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
