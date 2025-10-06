"use client";

import { motion } from "framer-motion";
import TechStack from "@/components/TechStack";
import Skills from "@/components/Skills";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SkillsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <section id="skills">
          <TechStack />
          <Skills />
        </section>
      </div>
      <Footer />
    </main>
  );
}
