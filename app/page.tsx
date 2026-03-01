import Header from "@/components/Header";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Logos from "@/components/Logos";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Bienvenue sur le portfolio de Julien Clavier : projets web, stack technique et contact.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <About />
      <Projects />
      <Logos />
      <Contact />
    </div>
  );
}
