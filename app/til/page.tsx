"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FaLightbulb } from "react-icons/fa";

export default function TILPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 mb-6"
            >
              <FaLightbulb className="text-3xl text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
              Today I Learned
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of quick learnings, tips, and insights from my daily coding journey. 
              Coming soon!
            </p>
          </div>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
