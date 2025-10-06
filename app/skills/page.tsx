"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { 
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFramer,
  SiPython, SiDjango, SiFlask, SiFastapi, SiPostgresql, SiMongodb, 
  SiRedis, SiDocker, SiAmazon, SiGithubactions, SiKubernetes,
  SiTerraform, SiHelm, SiPrometheus, SiGrafana, SiNginx, SiAnsible,
  SiCelery, SiGo, SiCplusplus, SiJavascript, SiNodedotjs, SiExpress,
  SiGraphql, SiMysql
} from "react-icons/si";
import { FaVuejs } from "react-icons/fa";

interface Skill {
  name: string;
  description: string;
  icon: any;
  category: string;
}

export default function SkillsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const skills: Skill[] = [
    // Frontend
    { name: "TypeScript", description: "7 years of experience", icon: SiTypescript, category: "Frontend" },
    { name: "React", description: "Since 2018 (4 years)", icon: SiReact, category: "Frontend" },
    { name: "Vue.js", description: "1 year experience", icon: FaVuejs, category: "Frontend" },
    { name: "Tailwind CSS", description: "4 years with SCSS", icon: SiTailwindcss, category: "Frontend" },
    { name: "Framer Motion", description: "Animation library", icon: SiFramer, category: "Frontend" },
    { name: "Next.js", description: "Modern web framework", icon: SiNextdotjs, category: "Frontend" },
    
    // Backend
    { name: "Python", description: "6+ years experience", icon: SiPython, category: "Backend" },
    { name: "Node.js", description: "Backend runtime", icon: SiNodedotjs, category: "Backend" },
    { name: "Express.js", description: "Web framework", icon: SiExpress, category: "Backend" },
    { name: "FastAPI", description: "High-performance APIs", icon: SiFastapi, category: "Backend" },
    { name: "Django", description: "5+ years full-stack", icon: SiDjango, category: "Backend" },
    { name: "Flask", description: "Lightweight framework", icon: SiFlask, category: "Backend" },
    { name: "Go", description: "System programming", icon: SiGo, category: "Backend" },
    { name: "GraphQL", description: "API query language", icon: SiGraphql, category: "Backend" },
    { name: "C++", description: "Programming language", icon: SiCplusplus, category: "Backend" },
    
    // Database
    { name: "PostgreSQL", description: "Relational database", icon: SiPostgresql, category: "Database" },
    { name: "MongoDB", description: "NoSQL database", icon: SiMongodb, category: "Database" },
    { name: "MySQL", description: "Database management", icon: SiMysql, category: "Database" },
    { name: "Redis", description: "Caching & sessions", icon: SiRedis, category: "Database" },
    { name: "Celery", description: "Task queue", icon: SiCelery, category: "Database" },
    
    // DevOps
    { name: "Docker", description: "Containerization", icon: SiDocker, category: "DevOps" },
    { name: "Kubernetes", description: "Orchestration", icon: SiKubernetes, category: "DevOps" },
    { name: "AWS", description: "EC2, RDS, Lambda, S3", icon: SiAmazon, category: "DevOps" },
    { name: "Terraform", description: "Infrastructure as Code", icon: SiTerraform, category: "DevOps" },
    { name: "GitHub Actions", description: "CI/CD automation", icon: SiGithubactions, category: "DevOps" },
    { name: "Helm", description: "Kubernetes package manager", icon: SiHelm, category: "DevOps" },
    { name: "Prometheus", description: "Monitoring", icon: SiPrometheus, category: "DevOps" },
    { name: "Grafana", description: "Analytics & monitoring", icon: SiGrafana, category: "DevOps" },
    { name: "NGINX", description: "Web server", icon: SiNginx, category: "DevOps" },
    { name: "Ansible", description: "Automation", icon: SiAnsible, category: "DevOps" },
  ];

  const categories = [
    { 
      id: "frontend", 
      title: "Front-End Developer",
      items: ["TypeScript", "React", "Vue.js", "Tailwind CSS", "Framer Motion", "Next.js"]
    },
    { 
      id: "backend", 
      title: "Backend-End Developer",
      items: ["Python", "FastAPI", "Django", "Flask", "Go", "Node.js", "Express.js", "GraphQL", "C++"]
    },
    { 
      id: "database", 
      title: "Database & Cache",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Celery"]
    },
    { 
      id: "devops", 
      title: "DevOps Engineer",
      items: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Helm", "Prometheus", "Grafana", "NGINX", "Ansible"]
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <p className="text-blue-400 text-sm mb-4 font-medium">Work</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Skills and Tools
              </h1>
              <p className="text-gray-400 text-lg">
                A look at all the programming languages, libraries, and tools I've worked with.
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16 border-l-2 border-gray-700 pl-6"
            >
              <p className="text-gray-300 mb-4">
                I'm a Full-Stack Developer currently pursuing{" "}
                <span className="font-semibold text-white">BTech in Computer Science Engineering at IIIT Bhopal</span>.
                I've worked with multiple programming languages and tech stacks, specializing in both Back-End and Front-End development.
              </p>
              <p className="text-gray-300">
                My expertise spans across{" "}
                <span className="font-semibold text-white">Backend Development with Node.js, Express.js, GraphQL</span>,{" "}
                <span className="font-semibold text-white">Frontend Development with React.js and Next.js</span>, and{" "}
                <span className="font-semibold text-white">Cloud & DevOps with AWS and Docker</span>.
              </p>
            </motion.div>

            {/* Front-End Developer Section */}
            <motion.section
              id="frontend"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Front-End Developer</h2>
              
              <div className="mb-8">
                <p className="text-gray-300 mb-4">
                  I specialize in building{" "}
                  <span className="font-semibold text-white">responsive, performant web applications</span>{" "}
                  with clean, modern UI/UX design.
                </p>
                <p className="text-gray-300 mb-4">
                  My frontend work includes developing:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Interactive web applications with React.js and Next.js</li>
                  <li>Real-time data visualizations and dashboards</li>
                  <li>Responsive designs with Tailwind CSS and Bootstrap</li>
                  <li>Component libraries and design systems</li>
                  <li>Landing pages and marketing websites</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Here are the{" "}
                  <span className="font-semibold text-white">frontend technologies</span> I'm proficient with:
                </p>
              </div>

              {/* JavaScript & TypeScript */}
              <div id="typescript" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">JavaScript & TypeScript</h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">JavaScript</span> and{" "}
                  <span className="font-semibold text-white">TypeScript</span> are my primary programming languages for web development.
                </p>
                <p className="text-gray-300">
                  I use TypeScript for building type-safe applications, especially in large-scale projects where code quality and maintainability are critical.
                </p>
              </div>

              {/* React */}
              <div id="react" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">React.js</h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">React</span> is my go-to library for building modern,{" "}
                  interactive user interfaces.
                </p>
                <p className="text-gray-300">
                  I've built multiple production applications with React, including{" "}
                  <span className="font-semibold text-white">real-time dashboards, analytics platforms, and content management systems</span>.
                </p>
              </div>

              {/* Next.js */}
              <div id="nextjs" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Next.js</h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">Next.js</span> is my preferred framework for building{" "}
                  full-stack React applications with server-side rendering and API routes.
                </p>
                <p className="text-gray-300">
                  Used it to develop projects like{" "}
                  <span className="font-semibold text-white">HarmonyAI (Personal Health Assistant) and Learning Management System</span>.
                </p>
              </div>

              {/* Tailwind CSS */}
              <div id="tailwind" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Tailwind CSS & Bootstrap</h3>
                <p className="text-gray-300 mb-2">
                  For styling, I primarily use{" "}
                  <span className="font-semibold text-white">Tailwind CSS</span> for its utility-first approach and{" "}
                  <span className="font-semibold text-white">Bootstrap</span> for rapid prototyping.
                </p>
                <p className="text-gray-300">
                  Both frameworks help me build{" "}
                  <span className="font-semibold text-white">responsive, mobile-first designs</span> efficiently.
                </p>
              </div>

              {/* HTML & CSS */}
              <div id="htmlcss" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">HTML & CSS</h3>
                <p className="text-gray-300">
                  Strong foundation in{" "}
                  <span className="font-semibold text-white">semantic HTML and modern CSS</span>, including Flexbox, Grid, and CSS animations for creating pixel-perfect designs.
                </p>
              </div>
            </motion.section>

            <hr className="border-gray-800 my-12" />

            {/* Backend Developer Section */}
            <motion.section
              id="backend"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Backend-End Developer</h2>
              
              <div className="mb-8">
                <p className="text-gray-300 mb-4">
                  I specialize in building{" "}
                  <span className="font-semibold text-white">scalable backend services, RESTful APIs, and microservices architectures</span>{" "}
                  with a focus on performance, security, and maintainability.
                </p>
                <p className="text-gray-300 mb-4">
                  At{" "}
                  <span className="font-semibold text-white">ExoSystem</span>, I developed backend services handling{" "}
                  <span className="font-semibold text-white">10,000+ active users</span> with 99% uptime. My backend expertise includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>RESTful APIs and GraphQL for efficient data management</li>
                  <li>JWT authentication and secure authorization systems</li>
                  <li>Microservices architecture with Node.js and Express.js</li>
                  <li>Database optimization (MySQL, PostgreSQL, MongoDB, Redis)</li>
                  <li>Real-time features and WebSocket implementations</li>
                  <li>AWS deployment (EC2, SES, S3) with 99% uptime</li>
                  <li>API response optimization (achieved 25% reduction in response times)</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  I've also published{" "}
                  <span className="font-semibold text-white">sachii-safe-logger</span> on npm, a secure logging utility for Node.js applications.
                </p>
              </div>

              {/* Node.js & Express */}
              <div id="nodejs" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Node.js & Express.js</h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">Node.js with Express.js</span> is my primary backend stack.
                  I've built production-ready APIs handling thousands of users.
                </p>
                <p className="text-gray-300">
                  Used in projects like{" "}
                  <span className="font-semibold text-white">Campaign Management System (newsletter platform with AWS SES integration)</span>{" "}
                  and{" "}
                  <span className="font-semibold text-white">HarmonyAI (AI health assistant with real-time chat)</span>.
                </p>
              </div>

              {/* GraphQL */}
              <div id="graphql" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">GraphQL</h3>
                <p className="text-gray-300 mb-2">
                  Implemented{" "}
                  <span className="font-semibold text-white">GraphQL APIs</span> for efficient data management at ExoSystem,{" "}
                  reducing API response times by 25%.
                </p>
                <p className="text-gray-300">
                  GraphQL's query flexibility and type safety make it ideal for complex data requirements.
                </p>
              </div>

              {/* Python Frameworks */}
              <div id="python" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Python, Django, Flask</h3>
                <p className="text-gray-300 mb-2">
                  Proficient in{" "}
                  <span className="font-semibold text-white">Python</span> with frameworks like{" "}
                  <span className="font-semibold text-white">Django and Flask</span> for rapid backend development.
                </p>
                <p className="text-gray-300">
                  Used for building automation scripts, API services, and web applications.
                </p>
              </div>

              {/* Go & C++ */}
              <div id="go" className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Go & C++</h3>
                <p className="text-gray-300">
                  Experience with{" "}
                  <span className="font-semibold text-white">Go</span> for high-performance services and{" "}
                  <span className="font-semibold text-white">C++</span> for system-level programming and algorithmic problem-solving.
                </p>
              </div>
            </motion.section>

            <hr className="border-gray-800 my-12" />

            {/* DevOps Section */}
            <motion.section
              id="devops"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">DevOps Engineer</h2>
              
              <div className="mb-8">
                <p className="text-gray-300 mb-4">
                  I have hands-on experience with{" "}
                  <span className="font-semibold text-white">cloud infrastructure, containerization, and CI/CD pipelines</span>{" "}
                  for deploying and maintaining production systems.
                </p>
                <p className="text-gray-300">
                  At ExoSystem, I utilized{" "}
                  <span className="font-semibold text-white">AWS services (EC2, SES, S3)</span> for deployment,{" "}
                  achieving <span className="font-semibold text-white">99% uptime</span> for production systems.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Cloud Platforms</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• AWS (EC2, SES, S3)</li>
                    <li>• Production Deployment</li>
                    <li>• Cloud Infrastructure Management</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Containerization</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Docker</li>
                    <li>• Container Orchestration</li>
                    <li>• Microservices Deployment</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Version Control & CI/CD</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Git & GitHub</li>
                    <li>• CI/CD Pipelines</li>
                    <li>• Automated Testing & Deployment</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Database Management</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Database Optimization</li>
                    <li>• Query Performance (30% improvement)</li>
                    <li>• MySQL, PostgreSQL, MongoDB, Redis</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <hr className="border-gray-800 my-12" />

            {/* Summary Section */}
            <motion.section
              id="summary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Detail and Summary</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Programming Languages</h3>
                  <p className="text-gray-300">
                    JavaScript, TypeScript, Go, Python, C++, SQL
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Backend Development</h3>
                  <p className="text-gray-300">
                    Node.js, Express.js, RESTful APIs, GraphQL, Microservices Architecture, JWT Authentication,
                    Django, Flask, WebSockets, API Documentation
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Database Management</h3>
                  <p className="text-gray-300">
                    MySQL, PostgreSQL, MongoDB, Redis, Database Optimization, Query Performance Tuning,
                    Data Modeling, Indexing Strategies
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Web Technologies</h3>
                  <p className="text-gray-300">
                    HTML, CSS, React.js, Next.js, Bootstrap, Tailwind CSS, Responsive Design,
                    Component-Driven Development
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Cloud & DevOps</h3>
                  <p className="text-gray-300">
                    AWS (EC2, SES, S3), Docker, Git, GitHub, CI/CD Pipelines, Production Deployment,
                    Infrastructure Management, 99% Uptime Achievement
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Tools & Frameworks</h3>
                  <p className="text-gray-300">
                    Postman, VS Code, Version Control (Git), API Testing, Debugging,
                    Performance Optimization, Code Quality Tools
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-32"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6">Table of Contents</h3>
                
                <nav className="space-y-6">
                  {/* Front-End Developer */}
                  <div>
                    <button
                      onClick={() => scrollToSection('frontend')}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left"
                    >
                      Front-End Developer
                    </button>
                    <ul className="mt-2 space-y-2 ml-4">
                      {["JavaScript & TypeScript", "React.js", "Next.js", "Tailwind CSS & Bootstrap", "HTML & CSS"].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => scrollToSection(item.toLowerCase().replace(/[^a-z]/g, ''))}
                            className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Backend-End Developer */}
                  <div>
                    <button
                      onClick={() => scrollToSection('backend')}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left"
                    >
                      Backend-End Developer
                    </button>
                    <ul className="mt-2 space-y-2 ml-4">
                      {["Node.js & Express.js", "GraphQL", "Python, Django, Flask", "Go & C++"].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => scrollToSection(item.toLowerCase().replace(/[^a-z]/g, ''))}
                            className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DevOps Engineer */}
                  <div>
                    <button
                      onClick={() => scrollToSection('devops')}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left"
                    >
                      Cloud & DevOps
                    </button>
                  </div>

                  {/* Detail and Summary */}
                  <div>
                    <button
                      onClick={() => scrollToSection('summary')}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left"
                    >
                      Detail and Summary
                    </button>
                    <ul className="mt-2 space-y-2 ml-4">
                      {["Programming Languages", "Backend Development", "Database Management", "Web Technologies", "Cloud & DevOps", "Tools & Frameworks"].map((item) => (
                        <li key={item}>
                          <span className="text-gray-400 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
