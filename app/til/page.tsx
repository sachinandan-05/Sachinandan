"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

interface TIL {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  officialDocsUrl?: string;
  createdAt: string;
}

export default function TILPage() {
  const [tils, setTils] = useState<TIL[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTILs();
  }, []);

  const fetchTILs = async () => {
    try {
      const response = await fetch("/api/til");
      if (response.ok) {
        const result = await response.json();
        // Handle both array and object responses
        const data = Array.isArray(result) ? result : (result.data || []);
        setTils(data);
      }
    } catch (error) {
      console.error("Error fetching TILs:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Group TILs by date
  const groupedTILs = tils.reduce((acc, til) => {
    const date = formatDate(til.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(til);
    return acc;
  }, {} as Record<string, TIL[]>);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Today I Learned
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Short notes on front-end, backend and devops related topics.
              </p>
            </div>
            
            {/* Decorative Icon */}
            <div className="hidden lg:block">
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-20"
              >
                {/* TIL Icon - Simplified lightbulb/learning icon */}
                <circle cx="50" cy="100" r="25" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="2" />
                <line x1="50" y1="50" x2="50" y2="75" stroke="currentColor" strokeWidth="2" />
                <line x1="100" y1="50" x2="100" y2="75" stroke="currentColor" strokeWidth="2" />
                <path d="M 50 30 Q 75 10 100 30" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && tils.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No TILs yet. Check back soon!</p>
          </motion.div>
        )}

        {/* Timeline */}
        {!loading && tils.length > 0 && (
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-0 md:left-[180px] top-0 bottom-0 w-px bg-gray-800"></div>

            {/* TIL Items */}
            {Object.entries(groupedTILs).map(([date, dateTILs], dateIndex) => (
              <div key={date}>
                {dateTILs.map((til, tilIndex) => (
                  <motion.div
                    key={til._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: tilIndex * 0.1 }}
                    className="relative mb-12 md:mb-16"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                      {/* Date */}
                      <div className="md:w-[180px] flex-shrink-0">
                        <p className="text-gray-400 text-sm md:text-base">
                          {tilIndex === 0 ? date : ""}
                        </p>
                      </div>

                      {/* Timeline Dot */}
                      <div className="absolute left-[-4px] md:left-[176px] top-1 w-2 h-2 rounded-full bg-white"></div>

                      {/* Content */}
                      <div className="flex-1 ml-8 md:ml-0">
                        <div className="mb-6">
                          <h2 className="text-2xl md:text-3xl font-bold mb-4">{til.title}</h2>
                          
                          {/* Tags */}
                          {til.tags && til.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {til.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-gray-300 mb-6 leading-relaxed">{til.content}</p>

                          {/* Code Snippet */}
                          {til.codeSnippet && (
                            <div className="relative group">
                              <div className="bg-[#1e293b] rounded-lg p-6 overflow-x-auto border border-white/10">
                                <button
                                  onClick={() => copyToClipboard(til.codeSnippet!, til._id)}
                                  className="absolute top-4 right-4 p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                                  title="Copy code"
                                >
                                  {copiedId === til._id ? (
                                    <span className="text-green-400 text-xs">✓</span>
                                  ) : (
                                    <FaCopy className="text-gray-400 text-sm" />
                                  )}
                                </button>
                                <pre className="text-sm">
                                  <code className="text-gray-300">{til.codeSnippet}</code>
                                </pre>
                                {til.codeLanguage && (
                                  <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-white/10">
                                    <span className="text-xs text-gray-500">{til.codeLanguage}</span>
                                    <span className="text-xs text-gray-500">
                                      Lines: {til.codeSnippet.split("\n").length}
                                    </span>
                                    <span className="text-xs text-gray-500">UTF-8</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Official Docs Link */}
                          {til.officialDocsUrl && (
                            <div className="mt-6">
                              <a
                                href={til.officialDocsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <span>Official Docs</span>
                                <FaExternalLinkAlt className="text-xs" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
