"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCodeCompare } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 width-full left-0 right-0 z-50 backdrop-blur-lg bg-black/80 border-b border-white/10"
      >
        <div className="max-w-full mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 text-lg font-bold cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <FaCodeCompare className="text-white text-xl" />
                </div>
                <span className="hidden sm:inline text-white font-bold text-[28px] font-[Poppins]">
                  sachii <span className="text-[34px] font-[Poppins] text-[#6710cbff]">.</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="px-4 py-2 text-sm text-[#a78bfa] hover:text-white transition-colors rounded-md hover:bg-white/5 cursor-pointer inline-block">
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
                <button className="px-4 py-2 text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors rounded-full flex items-center gap-1">
                  Work
                  <MdKeyboardArrowDown className={`transition-transform ${workDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {workDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
                    >
                      {workItems.map((item) => (
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

            {/* Right Section - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social Icons */}
              <a
                href="https://github.com/sachinandan-05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sachinandan-yadav-660115243/"
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
            <div className="lg:hidden flex items-center gap-3">
              {/* Quick Access Button - Mobile */}
              <button
                onClick={() => setQuickAccessOpen(true)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
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
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
            >
              <div className="bg-gradient-to-b from-zinc-900 to-black border-t border-white/10 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                </div>

                <div className="px-6 pb-8 pt-4">
                  {/* Main Navigation */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {navItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsOpen(false)}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <p className="text-purple-400 font-semibold text-base">{item.name}</p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  {/* Work Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => setMobileWorkDropdown(!mobileWorkDropdown)}
                      className="w-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-4 flex items-center justify-between hover:bg-blue-600/30 transition-all"
                    >
                      <span className="text-blue-400 font-semibold text-base">Work</span>
                      <MdKeyboardArrowDown 
                        className={`text-blue-400 transition-transform duration-200 ${mobileWorkDropdown ? 'rotate-180' : ''}`}
                        size={24}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {mobileWorkDropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-3 space-y-2"
                        >
                          {workItems.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <motion.div
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileWorkDropdown(false);
                                }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all cursor-pointer"
                              >
                                <p className="text-gray-300 text-sm">{item.name}</p>
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Connect</p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/sachinandan-05"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        <FaGithub size={20} className="text-gray-300" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sachinandan-yadav-660115243/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        <FaLinkedin size={20} className="text-blue-400" />
                      </a>
                      <a
                        href="mailto:sachinandan.priv05@gmail.com"
                        className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        <MdEmail size={20} className="text-purple-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick Access Modal Placeholder */}
      {quickAccessOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setQuickAccessOpen(false)}
        >
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Quick Access</h3>
            <p className="text-gray-400">Quick access functionality goes here...</p>
          </div>
        </div>
      )}
    </>
  );
}