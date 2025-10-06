"use client";

import { motion } from "framer-motion";
import { FaCode, FaCloud } from "react-icons/fa";

export default function Skills() {
  const skills = [
    {
      title: "Backend Development",
      subtitle: "Production-Ready & Scalable",
      description: "Node.js, Express.js & Modern Backend Technologies.",
      details: "Building robust backend systems with proven track record of 99% uptime and serving 10,000+ users.",
      icon: FaCode,
      features: [
        { label: "REST & GraphQL APIs", desc: "Built secure REST APIs with JWT authentication and GraphQL for efficient data management, reducing API response times by 25%." },
        { label: "Database Optimization", desc: "MySQL, PostgreSQL, MongoDB, and Redis expertise with query optimization achieving 30% performance improvement." },
        { label: "Scalable Systems", desc: "Production-ready systems serving 10,000+ active users with 99% uptime and comprehensive testing protocols." },
        { label: "Microservices", desc: "Node.js and Express.js backend services with clean architecture and async processing for high performance." },
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Cloud & DevOps",
      subtitle: "AWS & Modern Deployment",
      description: "Cloud Infrastructure & Deployment Automation.",
      details: "Leveraging AWS services, Docker, and modern DevOps practices for scalable production deployments.",
      icon: FaCloud,
      features: [
        { label: "AWS Services", desc: "Expertise in AWS EC2, SES, S3 for deployment, email automation, and cloud storage with production-ready implementations." },
        { label: "Docker & Containerization", desc: "Container orchestration and deployment with Docker for consistent development and production environments." },
        { label: "CI/CD & Git", desc: "Version control with Git/GitHub and automated deployment pipelines for rapid delivery cycles." },
        { label: "Performance Monitoring", desc: "Redis caching implementation and real-time performance tracking for optimized system scalability." },
      ],
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Expertise</h2>
        <p className="text-gray-400 text-lg">Building with modern technologies and best practices</p>
      </motion.div>

      <div className="space-y-20">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12 hover:bg-white/10 transition-all">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${skill.gradient}`}>
                  <skill.icon size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">{skill.title}</h3>
                  <p className={`text-xl font-semibold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent mb-2`}>
                    {skill.subtitle}
                  </p>
                  <p className="text-gray-400 mb-2">{skill.description}</p>
                  <p className="text-gray-500 text-sm">{skill.details}</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {skill.features.map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className={`w-1 rounded-full bg-gradient-to-b ${skill.gradient} flex-shrink-0`} />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.label}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
