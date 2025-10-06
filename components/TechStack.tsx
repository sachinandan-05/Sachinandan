"use client";

import { motion } from "framer-motion";
import { 
  FaJsSquare, 
  FaNodeJs, 
  FaReact, 
  FaAws, 
  FaDocker, 
  FaPython
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiExpress, 
  SiMysql, 
  SiMongodb, 
  SiPostgresql, 
  SiRedis, 
  SiGraphql,
  SiGo
} from "react-icons/si";

export default function TechStack() {
  const techStack = [
    { name: "JavaScript", icon: <FaJsSquare />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
    { name: "Express.js", icon: <SiExpress />, color: "#FFFFFF" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
    { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
    { name: "AWS", icon: <FaAws />, color: "#FF9900" },
    { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "Go", icon: <SiGo />, color: "#00ADD8" },
    { name: "GraphQL", icon: <SiGraphql />, color: "#E10098" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-gray-400 mb-4">Current favorite tech stack/tools:</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-6"
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            variants={item}
            whileHover={{ scale: 1.1, y: -5 }}
            className="group relative"
          >
            <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl hover:bg-white/10 transition-all cursor-pointer">
              {tech.icon}
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <p className="text-sm text-gray-400">{tech.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-500 mt-16 text-sm"
      >
        Development: <span className="text-blue-400">Turning Coffee into Code then Magic.</span>
      </motion.p>
    </section>
  );
}
