"use client";

import { motion, AnimatePresence } from "framer-motion";
import {  FaCodeCompare } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";
import QuickAccessModal from "./QuickAccessModal";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [workDropdown, setWorkDropdown] = useState(false);
  const [skillsDropdown, setSkillsDropdown] = useState(false);
  const [mobileWorkDropdown, setMobileWorkDropdown] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  // Keyboard shortcut for Quick Access (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setQuickAccessOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

              <FaCodeCompare color="#6710cbff" />
              <span className="text-white font-bold text-[28px] font-[Poppins]">sachii <p className="inline text-[34px] font-[Poppins] text-[#6710cbff]">.</p></span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="px-4 text-[#733eb0ff] py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5 cursor-pointer inline-block">
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
                        <span className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-[#733eb0ff]">
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
            <button 
              onClick={() => setQuickAccessOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all"
            >
              <FiGrid size={16} />
              Quick Access
              <kbd className="px-1.5 py-0.5 text-xs bg-black/50 rounded border border-white/10">⌘K</kbd>
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Quick Access Button - Mobile */}
            <button
              onClick={() => setQuickAccessOpen(true)}
              className="p-2.5 bg-[#2a3b4f] hover:bg-[#324152] rounded-lg transition-all"
              aria-label="Quick Access"
            >
              <FiGrid size={20} className="text-gray-300" />
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Menu"
            >
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
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
                      className="block text-gray-300 hover:text-white hover:bg-white/5 transition-colors py-3 px-3 rounded-md cursor-pointer"
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}

                {/* Work Dropdown Button */}
                <div className="pt-1">
                  <button
                    onClick={() => setMobileWorkDropdown(!mobileWorkDropdown)}
                    className="w-full flex items-center justify-between text-gray-300 hover:text-white hover:bg-white/5 transition-colors py-3 px-3 rounded-md"
                  >
                    <span>Work</span>
                    <MdKeyboardArrowDown 
                      className={`transition-transform duration-200 ${mobileWorkDropdown ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </button>
                  
                  {/* Work Dropdown Items */}
                  <AnimatePresence>
                    {mobileWorkDropdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-white/5 rounded-lg mt-2 border border-white/10"
                      >
                        {workItems.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <span
                              onClick={() => {
                                setIsOpen(false);
                                setMobileWorkDropdown(false);
                              }}
                              className="block text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors py-3 px-4 cursor-pointer"
                            >
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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

      {/* Quick Access Modal */}
      <QuickAccessModal 
        isOpen={quickAccessOpen} 
        onClose={() => setQuickAccessOpen(false)} 
      />
    </motion.nav>
  );
}
