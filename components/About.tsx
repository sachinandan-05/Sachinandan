"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward, FaCoffee } from "react-icons/fa";

export default function About() {
  const highlights = [
    {
      icon: FaGraduationCap,
      title: "IIIT Bhopal",
      description: "BTech in CSE (2022-2026)",
    },
    {
      icon: FaAward,
      title: "Top 4%",
      description: "CodeChef Ranking",
    },
    {
      icon: FaBriefcase,
      title: "99% Uptime",
      description: "Production Systems",
    },
    {
      icon: FaCoffee,
      title: "10,000+ Users",
      description: "Systems Delivered",
    },
  ];

  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400 text-lg">Get to know me better</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed">
              Hi! I'm <span className="text-white font-semibold">Sachinandan Yadav</span>, a{" "}
              <span className="text-blue-400">Full Stack Developer</span> and{" "}
              <span className="text-purple-400">Computer Science student</span> at IIIT Bhopal,
              passionate about building scalable and efficient systems.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              I specialize in developing production-ready backend systems with Node.js, Express.js, and modern web technologies.
              With experience in building systems that handle 10,000+ active users and achieving 99% uptime,
              I focus on performance optimization, security, and delivering robust features.
            </p>

            <p className="text-gray-400 leading-relaxed">
              As a top 4% coder on CodeChef, I bring strong algorithmic problem-solving skills to my development work.
              I've successfully reduced API response times by 25% and optimized database query performance by 30% in production environments.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Let's Work Together
            </a>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <item.icon className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
