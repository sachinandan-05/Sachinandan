"use client";

import { motion } from "framer-motion";
import { FaGithub as Github } from "react-icons/fa";
import { FiExternalLink as ExternalLink } from "react-icons/fi";
import { useState, useEffect } from "react";
import ProjectReactions from "./ProjectReactions";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
  featured?: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API with caching
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', {
          cache: 'force-cache', // Use standard cache option for client-side
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
          setError(null);
        } else {
          setError(data.error || 'Failed to load projects');
        }
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        setError(error.message || 'Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Gradient colors for projects (cycling through)
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-rose-500",
  ];

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
        <p className="text-gray-400 text-lg">Some of my recent work</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-400">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="mx-auto max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">⚠️ Connection Error</h3>
            <p className="text-gray-300 mb-4">{error}</p>
            <div className="bg-black/30 rounded-lg p-4 text-left text-sm">
              <p className="text-yellow-400 font-semibold mb-2">💡 Quick Fix:</p>
              <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                <li>Go to <a href="https://cloud.mongodb.com" target="_blank" rel="noopener" className="text-blue-400 hover:underline">MongoDB Atlas</a></li>
                <li>Click "Network Access" in the left sidebar</li>
                <li>Click "Add IP Address" → "Allow Access from Anywhere"</li>
                <li>Refresh this page</li>
              </ol>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No projects found. Add some from the admin dashboard!</p>
          <a 
            href="/admin" 
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all"
          >
            Go to Admin
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all"
            >
              {/* Image/Icon Section */}
              {project.image ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                  <span className="text-6xl">🚀</span>
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>

                {/* Tags */}
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                {/* Reactions */}
                <div className="pt-4 border-t border-white/10">
                  <ProjectReactions projectId={project._id} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="https://github.com/sachinandan-05"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full hover:bg-white/5 transition-all"
        >
          View More on GitHub
          <ExternalLink size={18} />
        </a>
      </motion.div>
    </section>
  );
}
