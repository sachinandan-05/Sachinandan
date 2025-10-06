"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ReactionCounts {
  clap: number;
  love: number;
  fire: number;
  thinking: number;
}

interface ProjectReactionsProps {
  projectId: string;
}

const REACTIONS = [
  { emoji: "👏", key: "clap", label: "Clap" },
  { emoji: "😍", key: "love", label: "Love" },
  { emoji: "🔥", key: "fire", label: "Fire" },
  { emoji: "🤔", key: "thinking", label: "Thinking" },
];

export default function ProjectReactions({ projectId }: ProjectReactionsProps) {
  const [reactions, setReactions] = useState<ReactionCounts>({
    clap: 0,
    love: 0,
    fire: 0,
    thinking: 0,
  });

  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});
  const [showAnimation, setShowAnimation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load reactions from API and localStorage for user preferences
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        // Fetch live counts from API
        const response = await fetch(`/api/reactions/${projectId}`);
        const data = await response.json();
        
        if (data.success) {
          setReactions(data.data);
        }
        
        // Load user's personal reactions from localStorage
        const storedUserReactions = localStorage.getItem(`user-reactions-${projectId}`);
        if (storedUserReactions) {
          setUserReactions(JSON.parse(storedUserReactions));
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReactions();

    // Poll for updates every 5 seconds to keep counts fresh
    const interval = setInterval(fetchReactions, 5000);
    
    return () => clearInterval(interval);
  }, [projectId]);

  // Handle reaction click
  const handleReaction = async (key: string) => {
    const hasReacted = userReactions[key];
    const action = hasReacted ? 'remove' : 'add';

    // Optimistically update UI
    const newReactions = {
      ...reactions,
      [key]: hasReacted 
        ? Math.max(reactions[key as keyof ReactionCounts] - 1, 0)
        : reactions[key as keyof ReactionCounts] + 1,
    };

    const newUserReactions = {
      ...userReactions,
      [key]: !hasReacted,
    };

    setReactions(newReactions);
    setUserReactions(newUserReactions);
    
    // Save user preference to localStorage
    localStorage.setItem(`user-reactions-${projectId}`, JSON.stringify(newUserReactions));

    // Show animation
    if (!hasReacted) {
      setShowAnimation(key);
      setTimeout(() => setShowAnimation(null), 600);
    }

    // Send to API
    try {
      const response = await fetch(`/api/reactions/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: key, action }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update with actual counts from server
        setReactions(data.data);
      } else {
        // Revert on error
        setReactions(reactions);
        setUserReactions(userReactions);
        localStorage.setItem(`user-reactions-${projectId}`, JSON.stringify(userReactions));
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      // Revert on error
      setReactions(reactions);
      setUserReactions(userReactions);
      localStorage.setItem(`user-reactions-${projectId}`, JSON.stringify(userReactions));
    }
  };

  // Show loading skeleton while fetching initial data
  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 shadow-lg animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-4 bg-gray-700 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 shadow-lg">
        {/* Reaction Buttons */}
        {REACTIONS.map((reaction, index) => {
          const count = reactions[reaction.key as keyof ReactionCounts];
          const hasReacted = userReactions[reaction.key];
          const isAnimating = showAnimation === reaction.key;

          return (
            <motion.button
              key={reaction.key}
              onClick={() => handleReaction(reaction.key)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Emoji with sparkle animation */}
              <div className="relative flex flex-col items-center gap-1">
                <motion.div
                  className={`text-3xl transition-all ${
                    hasReacted ? "scale-110" : "grayscale-[50%] opacity-70"
                  }`}
                  animate={
                    isAnimating
                      ? {
                          scale: [1, 1.3, 1],
                          rotate: [0, -10, 10, -10, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {reaction.emoji}
                  
                  {/* Sparkle effect on click */}
                  {isAnimating && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                          initial={{ scale: 0, x: 0, y: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            x: Math.cos((i * Math.PI) / 3) * 20,
                            y: Math.sin((i * Math.PI) / 3) * 20,
                          }}
                          transition={{ duration: 0.6 }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>

                {/* Count */}
                <motion.span
                  key={count}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  className={`text-sm font-semibold px-2 py-0.5 rounded-full transition-all ${
                    hasReacted
                      ? "bg-purple-500/30 text-purple-300"
                      : "bg-gray-700/50 text-gray-400"
                  }`}
                >
                  {count}
                </motion.span>
              </div>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {hasReacted ? `Remove ${reaction.label}` : `Add ${reaction.label}`}
              </div>
            </motion.button>
          );
        })}

        {/* Stats Icon */}
        <div className="ml-2 pl-2 border-l border-white/10">
          <button
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            title="View statistics"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </div>

        {/* Total Count Badge */}
        <div className="ml-1">
          <div className="px-3 py-1.5 bg-gray-700/50 rounded-full">
            <span className="text-sm font-semibold text-gray-300">
              {Object.values(reactions).reduce((a, b) => a + b, 0)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
