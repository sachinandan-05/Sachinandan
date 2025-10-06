"use client";

import { motion } from "framer-motion";
import { FaHeart, FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { MdEmail, MdCode } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/sachinandan-05", label: "GitHub", color: "hover:text-gray-300" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/sachinandan-yadav-660115243/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: MdCode, href: "https://leetcode.com/u/sachinandan_05/", label: "LeetCode", color: "hover:text-orange-400" },
    { icon: MdEmail, href: "mailto:sachinandan.priv05@gmail.com", label: "Email", color: "hover:text-purple-400" },
  ];

  const footerLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 via-purple-500/50 to-transparent"></div>
      
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section - Larger */}
          <div className="md:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Sachinandan Yadav
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Full Stack Developer & Backend Engineer passionate about building scalable systems and beautiful user experiences.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Currently at IIIT Bhopal</span>
              </div>
            </motion.div>

            {/* Newsletter/CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <p className="text-sm text-gray-400 mb-3">Let's work together</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Get in touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <h4 className="font-bold text-lg mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <h4 className="font-bold text-lg mb-6 text-white">Connect With Me</h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`group flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all">
                    <social.icon size={18} />
                  </div>
                  <span className="text-sm font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Email Direct */}
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-xl">
              <p className="text-xs text-gray-400 mb-2">Email me directly</p>
              <a
                href="mailto:sachinandan.priv05@gmail.com"
                className="text-sm text-white hover:text-blue-400 transition-colors break-all"
              >
                sachinandan.priv05@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <p className="text-gray-400 flex items-center gap-2">
              © {currentYear} Sachinandan Yadav. All rights reserved.
            </p>
            <span className="hidden sm:block text-gray-600">•</span>
            <p className="text-gray-400 flex items-center gap-2">
              Made with <FaHeart size={14} className="text-red-500 animate-pulse" /> and lots of ☕
            </p>
          </div>

          {/* Back to Top Button */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sachinandan-05/Sachinandan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
            >
              <FaGithub size={16} className="group-hover:rotate-12 transition-transform" />
              View Source
            </a>
            <button
              onClick={scrollToTop}
              className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 group"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Tech Stack Badge */}
       
      </div>
    </footer>
  );
}