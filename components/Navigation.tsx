"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [workDropdown, setWorkDropdown] = useState(false);
  const [skillsDropdown, setSkillsDropdown] = useState(false);

  const navItems = [
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "T.I.L", href: "/til" },
  ];

  const workItems = [
    { name: "Contact", href: "/contact" },
    { name: "Experience", href: "/about" },
    { name: "Skills & Tools", href: "/skills" },
    { name: "Studio", href: "/studio" },
  ];

  const skillsItems = [
    { name: "Skills & Tools", href: "/skills" },
    { name: "Experience", href: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 width-full left-0 right-0 z-50  items-center backdrop-blur-lg bg-black/80 border-b border-white/10"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 text-lg font-bold cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-white font-bold">Sachinandan.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5 cursor-pointer inline-block">
                  {item.name}
                </span>
              </Link>
            ))}

            {/* Work Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWorkDropdown(true)}
              onMouseLeave={() => setWorkDropdown(false)}
            >
              <button className="px-4 py-2 text-sm text-blue-800  transition-colors rounded-md  flex items-center gap-1">
                Work ""
                
              </button>
              
            </div>

            {/* Skills & Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSkillsDropdown(true)}
              onMouseLeave={() => setSkillsDropdown(false)}
            >
              <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5 flex items-center gap-1">
                Skills & Tools
                <MdKeyboardArrowDown className={`transition-transform ${skillsDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {skillsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
                  >
                    {skillsItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about">
              <span className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5 cursor-pointer inline-block">
                Experience
              </span>
            </Link>
            <Link href="/studio">
              <span className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5 cursor-pointer inline-block">
                Studio
              </span>
            </Link>
            <Link href="/contact">
              <span className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5 cursor-pointer inline-block">
                Contact
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Social Icons */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://github.com/sachinandan-05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={18} />
            </a>

            {/* Quick Access Button */}
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all">
              <FiGrid size={16} />
              Quick Access
              <kbd className="px-1.5 py-0.5 text-xs bg-black/50 rounded border border-white/10">⌘</kbd>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2"
          >
            {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-300 hover:text-white hover:bg-white/5 transition-colors py-2 px-3 rounded-md cursor-pointer"
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}

                {/* Work Items */}
                <div className="pt-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Work</div>
                  
                </div>

                {/* Social Links */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-4 px-3">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="https://github.com/sachinandan-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="mailto:sachinandan.priv05@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <MdEmail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
