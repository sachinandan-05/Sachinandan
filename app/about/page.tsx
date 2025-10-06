"use client";

import { motion } from "framer-motion";
import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <section id="about">
          <About />
        </section>
      </div>
      <Footer />
    </main>
  );
}
