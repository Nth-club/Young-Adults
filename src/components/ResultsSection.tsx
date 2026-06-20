import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Trophy, ZoomIn, X } from 'lucide-react';
import { translations, LanguageType } from '../data';
import { images } from "../images";

export const resultsData = [
  {
    id: 1,
    name: "Sardor Toshmatov",
    course: "IELTS",
    score: "Band 7.5",
    image: images.results.cert1
  },
  {
    id: 2,
    name: "Malika Yusupova",
    course: "CEFR",
    score: "C1 Level",
    image: images.results.cert2
  },
  {
    id: 3,
    name: "Jasur Karimov",
    course: "Frontend Development",
    score: "Certificate",
    image: images.results.cert3
  },
  {
    id: 4,
    name: "Nilufar Raximova",
    course: "Ona Tili",
    score: "National Certificate",
    image: images.results.cert4
  },
  {
    id: 5,
    name: "Bobur Aliyev",
    course: "IELTS",
    score: "Band 8.0",
    image: images.results.cert5
  },
  {
    id: 6,
    name: "Shahnoza Mirzayeva",
    course: "Backend Development",
    score: "Certificate",
    image: images.results.cert6
  }
];

interface ResultsSectionProps {
  lang: LanguageType;
}

const backInUp = {
  initial: { y: 80, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 65, damping: 16 }
  },
  exit: {
    y: -50,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

const filterCourses = [
  "All",
  "IELTS",
  "CEFR",
  "Frontend Development",
  "Backend Development",
  "Ona Tili",
  "Foundation"
];

// Fallback visual error handler for images that allows recovery or retry
function SafeCertificateImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        onClick={onClick}
        className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex flex-col items-center justify-center text-[#6366F1] dark:text-[#818CF8] cursor-pointer relative group"
      >
        <Award size={48} className="animate-pulse mb-2" />
        <span className="text-xs font-mono opacity-80 uppercase tracking-wider">Review Certificate</span>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={32} className="text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-pointer group" onClick={onClick}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ZoomIn size={32} className="text-white" />
      </div>
    </div>
  );
}

export function ResultsSection({ lang }: ResultsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  const t = translations[lang] as any;
  const rt = t.results || {
    label: "[ 03 ] Our Results",
    title: "Student Achievements",
    subtitle: "Real results from our students",
    filterAll: "All"
  };

  const filteredData = activeFilter === "All" 
    ? resultsData 
    : resultsData.filter(r => r.course === activeFilter);

  return (
    <section
      id="results"
      className="py-24 md:py-32 px-6 md:px-16 border-t border-gray-100 dark:border-white/5 relative bg-white dark:bg-[#1D1F29] transition-colors"
    >
      {/* Decorative radial lighting accents in background */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.02] dark:bg-indigo-500/[0.01] rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          variants={backInUp}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: false, amount: 0.15 }}
          className="w-full max-w-7xl mx-auto"
        >
          {/* Label + Title + Subtitle Block */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6366F1] dark:text-[#818CF8] bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full inline-block mb-6 select-none shadow-sm">
              {rt.label}
            </span>
            <h2 className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] font-serif font-bold tracking-tight text-[#1D1F29] dark:text-white leading-[1.05] mb-4">
              {rt.title}
            </h2>
            <p className="text-[15px] text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto">
              {rt.subtitle}
            </p>
          </div>

          {/* Filter pills row (No <form> tags used) */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" id="results-filter-pills">
            {filterCourses.map((course) => {
              const isSelected = activeFilter === course;
              const displayLabel = course === "All" ? rt.filterAll : course;
              return (
                <button
                  key={course}
                  onClick={() => setActiveFilter(course)}
                  className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
                    isSelected 
                      ? 'bg-[#6366F1] dark:bg-[#818CF8] text-white border-[#6366F1] dark:border-[#818CF8]'
                      : 'bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1D1F29] dark:hover:text-white'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>

          {/* Grid display with pop layout motion reorder */}
          <motion.div 
            id="results-students-grid" 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((result) => (
                <motion.div
                  key={result.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="glass-card group overflow-hidden rounded-2xl flex flex-col justify-between"
                  id={`result-card-${result.id}`}
                >
                  {/* Image Area */}
                  <div className="relative h-[200px] overflow-hidden rounded-t-2xl">
                    <SafeCertificateImage 
                      src={result.image} 
                      alt={`Certificate of ${result.name}`}
                      onClick={() => setLightboxImg(result.image)}
                    />

                    {/* Course Badge (Absolute top-right) */}
                    <div className="absolute top-3 right-3 select-none pointer-events-none glass-card bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[11px] font-mono font-bold text-[#6366F1] dark:text-[#818CF8]">
                      {result.course}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col text-left">
                    <h4 className="font-bold text-[16px] text-[#1D1F29] dark:text-white group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                      {result.name}
                    </h4>

                    {/* Trophy Score Badge */}
                    <div className="inline-flex items-center gap-1.5 mt-1">
                      <Trophy size={14} className="text-yellow-500 shrink-0" />
                      <span className="text-[13px] font-mono text-[#6B7280] dark:text-[#9CA3AF] font-semibold">
                        {result.score}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <p className="text-[12px] text-[#6B7280]/70 dark:text-[#9CA3AF]/70 mt-3 font-mono uppercase tracking-wider">
                      Course: {result.course}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal (AnimatePresence) */}
      <AnimatePresence>
        {lightboxImg && (
          <div 
            id="certificate-lightbox-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImg(null)}
          >
            {/* Modal Container */}
            <motion.div
              id="certificate-lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fallback support for Lightbox Image error */}
              <LightboxImageWithFallback src={lightboxImg} />

              {/* Close Button (Circle Glassmorphism) */}
              <button
                id="lightbox-close-btn"
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer glass-card bg-black/50 text-white hover:bg-black/80 transition-all border border-white/20 shadow-lg"
                onClick={() => setLightboxImg(null)}
              >
                <X size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Fallback decorator for image renderer on modal container
function LightboxImageWithFallback({ src }: { src: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-[85vw] h-[55vh] md:w-[600px] md:h-[400px] bg-gradient-to-br from-[#1E202C] to-[#161720] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-2xl">
        <Award size={72} className="text-[#818CF8] animate-pulse mb-4" />
        <h3 className="text-white text-xl font-bold mb-2">Young Adults Achievement</h3>
        <p className="text-gray-400 text-sm max-w-md">The original certificate document could not be retrieved from the server. Rest assured, our student has officially completed this course curriculum.</p>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt="Certificate Zoomed Preview" 
      className="max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl border border-white/10"
      onError={() => setHasError(true)}
    />
  );
}
