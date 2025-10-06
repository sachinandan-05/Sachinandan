"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const workLinks = [
    { name: "Contact", href: "/contact" },
    { name: "Experience", href: "/experience" },
    { name: "Services", href: "/services", badge: "SOON" },
    { name: "Skills and Tools", href: "/skills" },
    { name: "Studio", href: "/studio" },
  ];

  const learnLinks = [
    { name: "Docs", href: "/docs" },
    { name: "Personal Blog", href: "/blog" },
    { name: "T.I.L", href: "/til", badge: "NEW" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* About Me Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-300">About Me</h3>
            <div className="space-y-3">
              <p className="text-gray-400 leading-relaxed">
                I'm <span className="text-white font-semibold">Sachinandan Yadav</span>, A{" "}
                <span className="text-white font-semibold">Technical Lead & Sr. DevOps Engineer</span>
              </p>
              <p className="text-gray-400 leading-relaxed">
                who loves intuitive, clean and modern technologies developement and design.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <motion.a
                href="https://x.com/sachinandan_05"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                aria-label="Twitter"
              >
                <FaXTwitter size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/sachinandan-05"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Work Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-300">Work</h3>
            <ul className="space-y-3">
              {workLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-white/10 border border-white/20 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Learn Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-300">Learn</h3>
            <ul className="space-y-3">
              {learnLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-white/10 border border-white/20 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear}, Sachinandan.com
          </p>
          <a
            href="https://github.com/sachinandan-05/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            see the recent update on GitHub
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
