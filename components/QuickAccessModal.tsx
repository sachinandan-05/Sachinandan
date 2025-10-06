"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdDarkMode, MdLightMode } from "react-icons/md";
import { FaEye, FaEyeSlash, FaKeyboard } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

interface QuickAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Activity {
  type: string;
  project: string;
  action: string;
  time: string;
  emoji: string;
  reactions?: string;
}

export default function QuickAccessModal({ isOpen, onClose }: QuickAccessModalProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch recent activities when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/activities");
        if (response.ok) {
          const data = await response.json();
          setRecentActivities(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Poll for new activities every 10 seconds while modal is open
    const interval = setInterval(fetchActivities, 10000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Toggle Dark Mode (Cmd/Ctrl + D)
      if (e.key === "d" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDarkMode(prev => !prev);
        return;
      }

      // Toggle Focus Mode (Cmd/Ctrl + F)
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setFocusMode(prev => !prev);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const shortcuts = [
    { label: "Open Quick Access", keys: ["⌘"] },
    { label: "Close Quick Access", keys: ["⌘", "Esc"] },
    { label: "Toggle Dark Mode", keys: ["d"] },
    { label: "Toggle Focus", keys: ["f"] }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-start justify-center pt-20 px-4"
          >
            <div className="bg-[#1a2332] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Action Center</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <MdClose size={24} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - TIP & Action Buttons */}
                  <div className="space-y-6">
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {/* Dark Mode Toggle */}
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-[#2a3b4f] hover:bg-[#324152] rounded-xl p-6 transition-all group"
                      >
                        <div className="flex flex-col items-start gap-3">
                          {darkMode ? (
                            <MdDarkMode className="text-blue-400 text-3xl" />
                          ) : (
                            <MdLightMode className="text-yellow-400 text-3xl" />
                          )}
                          <span className="text-gray-300 text-sm font-medium">
                            Dark Mode: {darkMode ? "On" : "Off"}
                          </span>
                        </div>
                      </button>

                      {/* Focus Mode Toggle */}
                      <button
                        onClick={() => setFocusMode(!focusMode)}
                        className="bg-[#2a3b4f] hover:bg-[#324152] rounded-xl p-6 transition-all group"
                      >
                        <div className="flex flex-col items-start gap-3">
                          {focusMode ? (
                            <FaEye className="text-green-400 text-3xl" />
                          ) : (
                            <FaEyeSlash className="text-gray-400 text-3xl" />
                          )}
                          <span className="text-gray-300 text-sm font-medium">
                            Focus: {focusMode ? "On" : "Off"}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* TIP: Shortcuts */}
                    <div className="bg-[#0f1620] rounded-xl p-6 border border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <FaKeyboard className="text-blue-400 text-xl" />
                        <h3 className="text-lg font-bold text-white">TIP: Shortcuts</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-6">
                        Navigate the site with ease using keyboard shortcuts.
                      </p>

                      <div className="space-y-3">
                        {shortcuts.map((shortcut, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2"
                          >
                            <span className="text-gray-400 text-sm">{shortcut.label}</span>
                            <div className="flex items-center gap-2">
                              {shortcut.keys.map((key, i) => (
                                <span key={i}>
                                  {i > 0 && shortcut.keys.length > 1 && shortcut.label.includes("Close") && (
                                    <span className="text-gray-500 mx-1">or</span>
                                  )}
                                  <kbd className="px-2 py-1 text-xs bg-[#2a3b4f] text-gray-300 rounded border border-white/10 font-mono">
                                    {key}
                                  </kbd>
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Recent Activities */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Recent Activities</h3>
                      {loading && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          Updating...
                        </div>
                      )}
                    </div>

                    {/* Loading State */}
                    {loading && recentActivities.length === 0 && (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!loading && recentActivities.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500 text-sm">No recent activities yet</p>
                        <p className="text-gray-600 text-xs mt-2">
                          Reactions will appear here when users interact with your projects
                        </p>
                      </div>
                    )}

                    {/* Activities List */}
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={`${activity.project}-${activity.emoji}-${index}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#0f1620] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">
                              {activity.type}
                            </span>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <p className="text-gray-300 text-sm leading-relaxed">
                                the{" "}
                                <span className="text-blue-400 font-medium">
                                  {activity.project}
                                </span>{" "}
                                project {activity.action}{" "}
                                <span className="text-xl">{activity.emoji}</span>
                              </p>
                              {activity.reactions && (
                                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                                  {activity.reactions} {activity.emoji}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                        Quick Links
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/projects" onClick={onClose}>
                          <span className="block px-4 py-3 bg-[#2a3b4f] hover:bg-[#324152] rounded-lg text-sm text-gray-300 hover:text-white transition-all text-center cursor-pointer">
                            Projects
                          </span>
                        </Link>
                        <Link href="/blog" onClick={onClose}>
                          <span className="block px-4 py-3 bg-[#2a3b4f] hover:bg-[#324152] rounded-lg text-sm text-gray-300 hover:text-white transition-all text-center cursor-pointer">
                            Blog
                          </span>
                        </Link>
                        <Link href="/contact" onClick={onClose}>
                          <span className="block px-4 py-3 bg-[#2a3b4f] hover:bg-[#324152] rounded-lg text-sm text-gray-300 hover:text-white transition-all text-center cursor-pointer">
                            Contact
                          </span>
                        </Link>
                        <Link href="/admin" onClick={onClose}>
                          <span className="block px-4 py-3 bg-[#2a3b4f] hover:bg-[#324152] rounded-lg text-sm text-gray-300 hover:text-white transition-all text-center cursor-pointer">
                            Admin
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
