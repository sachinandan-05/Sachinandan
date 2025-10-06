"use client";

import { motion } from "framer-motion";
import { FaFileAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdSecurity, MdSpeed, MdCloud } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import {
  SiPython,
  SiDjango,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiRedux,
  SiAmazon,
  SiFigma,
  SiDocker,


} from "react-icons/si";
import { div } from "framer-motion/client";
import { useState, useEffect } from "react";

interface HeroData {
  name: string;
  title: string;
  description: string;
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData>({
    name: "Sachinandan Yadav",
    title: "Full Stack Developer",
    description: "I craft scalable backend systems and beautiful user interfaces. Passionate about building products that make a difference with clean, modern technologies.",
    image: "/image.jpeg",
    social: {
      github: "https://github.com/sachinandan-05",
      linkedin: "https://www.linkedin.com/in/sachinandan-yadav-660115243/",
      twitter: "",
      email: "sachinandan.priv05@gmail.com",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        const data = await response.json();
        if (data.success && data.data) {
          setHeroData(data.data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);
  const techStack = [
    { icon: SiPython, name: "Python" },
    { icon: SiDjango, name: "Django" },
    { icon: SiJavascript, name: "JavaScript" },
    { icon: SiReact, name: "React" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiRedux, name: "Redux" },
    { icon: SiAmazon, name: "AWS" },
    { icon: SiFigma, name: "Figma" },
    { icon: SiDocker, name: "Docker" },
    
  ];

  const backendFeatures = [
    {
      number: "1",
      title: "Architecture",
      description: "Modular, layered architecture ensuring maintainability and reusability.",
    },
    {
      number: "2",
      title: "Data Flow",
      description: "Efficient API and database interaction with clean request/response handling.",
    },
    {
      number: "3",
      title: "Security",
      description: "Authentication, authorization, and data encryption to protect sensitive information.",
    },
  ];

  const devopsFeatures = [
    {
      number: "1",
      title: "Infrastructure as Code",
      description: "Declarative configurations using tools like Terraform or CloudFormation.",
    },
    {
      number: "2",
      title: "CI/CD Pipelines",
      description: "Automated testing, build, and deployment for rapid delivery cycles.",
    },
    {
      number: "3",
      title: "Monitoring",
      description: "Real-time tracking and logging for performance insights and issue resolution.",
    },
  ];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-300">Available for new opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Hey, I'm{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {heroData.name.split(' ')[0]}
                </span>
                <span className="inline-block ml-2">👋</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-gray-300">
                {heroData.title}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  <a href="/contact">
                   Let's Talk</a>
                 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <a
                href="/latestResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <FaFileAlt size={18} />
                View Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 pt-4"
            >
              {[
                { icon: FaGithub, href: heroData.social.github, show: !!heroData.social.github },
                { icon: FaLinkedin, href: heroData.social.linkedin, show: !!heroData.social.linkedin },
                { icon: FaTwitter, href: heroData.social.twitter, show: !!heroData.social.twitter },
              ].filter(social => social.show).map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image with decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border border-white/5 rounded-full"></div>
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-full h-full border border-white/10 rounded-full"></div>
              </div>
              
              {/* Main image container */}
              <div className="relative z-10 w-full aspect-square flex items-center justify-center p-8">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full"
                >
                  {/* Gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
                  
                  {/* Image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={heroData.image || "/image.jpeg"}
                      alt={heroData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating tech icons */}
              {[
                { icon: SiReact, position: "top-10 right-10", delay: 0 },
                { icon: SiPython, position: "bottom-10 left-10", delay: 0.2 },
                { icon: SiNodedotjs, position: "top-1/2 right-0", delay: 0.4 },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + tech.delay }}
                  className={`absolute ${tech.position} w-16 h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300`}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <tech.icon size={28} className="text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
         {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-32 space-y-8"
        >
          <div className="space-y-3">
            <p className="text-sm text-gray-500 tracking-wide">
              current favorite tech stack/tools:
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9 + index * 0.05 }}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                title={tech.name}
              >
                <tech.icon size={32} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards - Secure, Scalable, High Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="bg-gradient-to-br from-[#1a1f2e] to-[#252b3d] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <MdSecurity size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Prioritizing data protection, authentication, and fault tolerance to ensure safe and steady performance.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="bg-gradient-to-br from-[#1a1f2e] to-[#252b3d] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <BiCodeAlt size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Scalable Architecture</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Designing systems that grow effortlessly—whether it's handling 10 or 10 million requests.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
            className="bg-gradient-to-br from-[#1a1f2e] to-[#252b3d] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <MdSpeed size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">High Performance</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Optimized for speed and efficiency to deliver seamless experiences behind the scenes.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tagline Section - Coffee to Code */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-32 mb-20 text-center"
        >
          <div className="relative inline-block">
            {/* Quote mark */}
            <span className="absolute -left-16 -top-8 text-8xl text-white/10 font-serif">"</span>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className="text-gray-400 italic">Development: Turning</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Coffee
              </span>
              <span className="text-gray-300"> into </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Code
              </span>
              <br />
              <span className="text-gray-400 italic">then </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Magic
              </span>
              <span className="text-gray-300">.</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Backend and DevOps Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="grid lg:grid-cols-2 gap-12 mt-20"
        >
          {/* Backend Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
                Backend (Secure & Performant)
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold">
                Resilient, Modular & High-Performance Architecture.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Build robust systems with clean logic, optimized for speed, scalability, and security.
              </p>
            </div>

            <div className="space-y-4">
              {backendFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <span className="text-6xl font-bold text-white/10 group-hover:text-purple-500/30 transition-colors">
                        {feature.number}
                      </span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DevOps Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                DevOps (Reliable & Automated)
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold">
                Automated, Scalable & CD Pipelines.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Streamlining infrastructure and CI/CD workflows to support seamless development.
              </p>
            </div>

            <div className="space-y-4">
              {devopsFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <span className="text-6xl font-bold text-white/10 group-hover:text-blue-500/30 transition-colors">
                        {feature.number}
                      </span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

       
      </div>

      {/* Scroll indicator */}
      
    </section>
  );
}