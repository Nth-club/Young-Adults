import React, { useState } from 'react';
import { motion } from 'motion/react';

// Fallback logo in case the main png is missing
function SkeletonLogoIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#6366F1] dark:text-[#818CF8]">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" className="opacity-20" />
      <path d="M50 15L85 32.5L50 50L15 32.5L50 15Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M25 45V68C25 74 36.1929 80 50 80C63.8071 80 75 74 75 68V45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="65" r="3" fill="currentColor" />
    </svg>
  );
}

export function LoadingSkeleton() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      id="loading-skeleton-overlay"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1D1F29]"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        {/* 1. Logo pulse */}
        <motion.div
          id="skeleton-logo-container"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20"
        >
          {imgError ? (
            <SkeletonLogoIcon />
          ) : (
            <img
              src="/static/assets/logo.png"
              alt="Young Adults"
              className="w-20 h-20 object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        {/* 2. Skeleton header bar */}
        <div 
          id="skeleton-header-bar"
          className="w-full max-w-4xl h-14 bg-gray-100 dark:bg-gray-800/40 rounded-2xl relative overflow-hidden animate-shimmer"
        />

        {/* 3. Skeleton hero (two columns) */}
        <div id="skeleton-grid-hero" className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-4">
          <div className="flex flex-col gap-4">
            <div className="w-3/4 h-8 bg-gray-100 dark:bg-gray-800/40 rounded-xl relative overflow-hidden animate-shimmer" />
            <div className="w-1/2 h-6 bg-gray-100 dark:bg-gray-800/40 rounded-xl relative overflow-hidden animate-shimmer" />
            <div className="w-32 h-12 bg-gray-100 dark:bg-gray-800/40 rounded-full relative overflow-hidden animate-shimmer mt-2" />
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800/40 relative overflow-hidden animate-shimmer" />
          </div>
        </div>

        {/* 4. Skeleton cards row */}
        <div id="skeleton-cards-block" className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="w-full h-24 bg-gray-100 dark:bg-gray-800/40 rounded-2xl relative overflow-hidden animate-shimmer"
            />
          ))}
        </div>

        {/* 5. Loading text (Gradient Animation) */}
        <motion.p
          id="skeleton-loading-text"
          className="font-bold text-2xl tracking-tight text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(90deg, #6366F1, #818CF8, #6366F1)",
            backgroundSize: "200% auto",
          }}
          animate={{
            backgroundPosition: ["0% center", "200% center"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Young Adults
        </motion.p>
      </div>
    </motion.div>
  );
}
