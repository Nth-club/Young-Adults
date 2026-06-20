/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  BookOpen,
  Languages,
  GraduationCap,
  FileText,
  Layers,
  Server,
  Code2,
  MapPin,
  Phone,
  ArrowRight,
  ChevronDown,
  Sun,
  Moon,
  X,
  Menu,
  Instagram,
  Youtube,
  Send,
  CheckCircle,
  HelpCircle,
  ArrowUp,
  Facebook
} from "lucide-react";
import { translations, LanguageType } from "./data";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ResultsSection } from "./components/ResultsSection";
import { api } from "./services/api";

import { images } from "./images";

// Animated fallback for header and footer logo if image is not uploaded yet
function LogoIcon({ className = "h-8 w-auto text-indigo-500" }: { className?: string }) {
  return (
    <img
      src={images.logo}
      alt="Logo"
      className={className}
    />
  );
}

// Inline component for custom header logo
function HeaderLogo() {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return (
      <div className="flex items-center gap-2">
        <LogoIcon className="h-8 w-8 text-[#6366F1] dark:text-[#818CF8]" />
        <span className="font-serif font-black text-base md:text-lg tracking-tight uppercase text-[#1D1F29] dark:text-[#F9FAFB]">
          Young <br></br> Adults
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 font-serif">
      <img
        src={images.logo}
        alt="Young Adults Logo"
        onError={() => setHasError(true)}
        className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
      {/* Visual text display alongside image just in case */}
      <span className="font-serif font-black text-base md:text-lg tracking-tight uppercase text-[#1D1F29] dark:text-[#F9FAFB] md:block hidden">
        Young <br></br>Adults
      </span>
    </div>
  );
}

// Inline component for custom footer logo
function FooterLogo() {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return (
      <div className="flex items-center gap-2 font-serif">
        <LogoIcon className="h-6 w-6 text-[#6366F1] dark:text-[#818CF8]" />
        <span className="font-serif font-black text-base tracking-tight uppercase text-[#1D1F29] dark:text-[#F9FAFB]">
          Young Adults
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 font-serif">
      <img
        src={images.logo}
        alt="Young Adults Logo"
        onError={() => setHasError(true)}
        className="h-8 w-auto object-contain"
      />
      <span className="font-serif font-black text-base md:text-lg tracking-tight uppercase text-[#1D1F29] dark:text-[#F9FAFB] md:block hidden">
        Young <br></br>Adults
      </span>
    </div>
  );
}

// Dynamic course icon utility
function CourseIcon({ iconName, className = "h-7 w-7 text-[#6366F1] dark:text-[#818CF8]" }: { iconName: string; className?: string }) {
  switch (iconName) {
    case 'Monitor':
      return <Monitor className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Languages':
      return <Languages className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    default:
      return <GraduationCap className={className} />;
  }
}

// Custom employee photo with robust fallback using initials
function EmployeePhoto({ src, name }: { src: string; name: string }) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  if (hasError) {
    return (
      <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#4F46E5] dark:from-[#818CF8] dark:to-[#6366F1] text-white font-bold font-mono text-xl shadow-inner uppercase tracking-wider">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#6366F1]/30 dark:border-[#818CF8]/30 shadow-md transform transition-all duration-300 group-hover:scale-105"
    />
  );
}

// Animation configurations: Left/Right/Up Back-In, Stagger, and Header FadeInDown
const backInLeft = {
  initial: { x: -120, opacity: 0, scale: 0.92 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 18, duration: 0.8 }
  },
  exit: {
    x: -120,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

const backInRight = {
  initial: { x: 120, opacity: 0, scale: 0.92 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 18, duration: 0.8 }
  },
  exit: {
    x: 120,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

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

const fadeInDown = {
  initial: { y: -60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

export default function App() {
  // 1. Loading Skeleton state
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Persistent Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('ya-theme') as 'light' | 'dark') || 'light';
  });

  const [lang, setLang] = useState<LanguageType>('uz');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Custom states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState('grammar');

  // Interactive Form State (Consultation / Signup)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to Top state & effect
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page title updates per section
  useEffect(() => {
    const formattedSection = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    document.title = `Young Adults — ${formattedSection}`;
  }, [activeSection]);

  const t = translations[lang];

  // Apply theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ya-theme', theme);
  }, [theme]);

  // Set up intersection observer for active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'courses', 'results', 'staff', 'services'];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.35, // Trigger when 35% of the section is visible
          rootMargin: "-20% 0px -20% 0px"
        }
      );
      
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((item) => {
        if (item) {
          item.observer.unobserve(item.el);
        }
      });
    };
  }, [lang]);

  // Handle local navigation smooth scrolling
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill modal with any custom selected options if needed
  const openSignUpModal = (courseName?: string, branchName?: string) => {
    if (courseName) setSelectedCourse(courseName);
    if (branchName) setSelectedBranch(branchName);
    setIsFormSubmitted(false);
    setFormError("");
    setIsModalOpen(true);
  };

  // Submit sign-up handler (without <form> element to strictly follow instructions)
  const handleFormSubmit = async () => {
    if (!fullName.trim() || !phone.trim() || !selectedCourse || !selectedBranch) {
      setFormError(lang === 'uz' ? "Iltimos, barcha maydonlarni to'ldiring!" : lang === 'ru' ? "Пожалуйста, заполните все поля!" : "Please fill in all fields!");
      return;
    }

    // Phone validation regex for Uzbekistan (+998...)
    const phoneRegex = /^\+998\d{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      setFormError(lang === 'uz' ? "Telefon raqami noto'g'ri (Masalan: +998901234567)" : lang === 'ru' ? "Неверный номер телефона (Пример: +998901234567)" : "Invalid phone number (Example: +998901234567)");
      return;
    }

    setFormError("");
    setIsSubmitting(true);
    try {
      await api.submitRegistration({
        name: fullName,
        phone: cleanPhone,
        course: selectedCourse,
        branch: selectedBranch
      });
      setIsFormSubmitted(true);
    } catch (err) {
      setFormError(lang === 'uz' ? "Yuborishda xatolik yuz berdi. Qayta urinib ko'ring." : lang === 'ru' ? "Ошибка отправки. Попробуйте еще раз." : "Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setPhone("");
    setSelectedCourse("");
    setSelectedBranch("");
    setIsFormSubmitted(false);
    setIsSubmitting(false);
  };

  const selectedBranchData = t.location.branches.find(b => b.id === selectedBranchId) || t.location.branches[0];

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingSkeleton key="skeleton" />
      ) : (
        <motion.div
          key="applet-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen font-sans bg-white text-[#1D1F29] dark:bg-[#1D1F29] dark:text-[#F9FAFB] transition-colors duration-300 relative overflow-x-hidden selection:bg-[#6366F1]/30"
        >
      
      {/* SECTION 0: HEADER */}
      <motion.header
        variants={fadeInDown}
        initial="initial"
        animate="animate"
        className="fixed top-0 left-0 right-0 h-[72px] z-50 bg-white/70 dark:bg-[#1D1F29]/70 backdrop-blur-md flex items-center justify-between px-6 md:px-16 border-b border-gray-100 dark:border-white/5"
      >
        <div id="header-logo" className="cursor-pointer" onClick={() => scrollToSection('home')}>
          <HeaderLogo />
        </div>

        {/* Center Navigation (hidden on mobile) */}
        <nav className="hidden md:flex gap-8 items-center font-medium text-sm">
          {[
            { label: t.nav.home, id: 'home' },
            { label: t.nav.about, id: 'about' },
            { label: t.nav.courses, id: 'courses' },
            { label: t.nav.results, id: 'results' },
            { label: t.nav.employees, id: 'staff' },
            { label: t.nav.services, id: 'services' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer transition-colors duration-200 hover:text-[#6366F1] dark:hover:text-[#818CF8] relative py-1 ${
                  isActive
                    ? 'text-[#6366F1] dark:text-[#818CF8] font-semibold'
                    : 'text-[#6B7280] dark:text-[#9CA3AF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6366F1] dark:bg-[#818CF8]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls Layout */}
        <div className="flex gap-4 items-center">
          {/* Sign Up Button (Desktop Only) */}
          <motion.button
            id="register-accent-header"
            onClick={() => openSignUpModal()}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:block cursor-pointer bg-[#6366F1] hover:bg-[#4F46E5] dark:bg-[#818CF8] dark:hover:bg-[#6366F1] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md"
          >
            {t.signup}
          </motion.button>

          {/* Language Switcher */}
          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10" id="lang-switcher">
            {(['en', 'uz', 'ru'] as LanguageType[]).map((langOption) => (
              <button
                key={langOption}
                id={`lang-btn-${langOption}`}
                onClick={() => setLang(langOption)}
                className={`cursor-pointer transition-all duration-200 text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-full ${
                  lang === langOption
                    ? 'bg-[#6366F1] dark:bg-[#818CF8] text-white shadow-sm'
                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1D1F29] dark:hover:text-white'
                }`}
              >
                {langOption.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            id="theme-toggle-btn"
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full glass-card border border-black/15 dark:border-white/15 shadow-sm text-[#1D1F29] dark:text-[#F9FAFB]"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </motion.button>

          {/* Hamburger (Mobile Menu Toggle) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden cursor-pointer flex flex-col justify-center items-center gap-[6px] w-7 h-8 p-1 z-50 text-[#1D1F29] dark:text-[#F9FAFB]"
          >
            <span
              className={`h-[2px] bg-current rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[4px]' : 'w-6'
              }`}
            />
            <span
              className={`h-[2px] bg-current rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[4px]' : 'w-5 self-end'
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu (AnimatePresence) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-card border-b border-white/30 dark:border-white/10 md:hidden flex flex-col p-6 space-y-5 shadow-2xl bg-white/95 dark:bg-[#1D1F29]/95"
          >
            <div className="flex flex-col gap-4 font-medium text-base">
              {[
                { label: t.nav.home, id: 'home' },
                { label: t.nav.about, id: 'about' },
                { label: t.nav.courses, id: 'courses' },
                { label: t.nav.results, id: 'results' },
                { label: t.nav.employees, id: 'staff' },
                { label: t.nav.services, id: 'services' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 border-b border-black/5 dark:border-white/5 ${
                    activeSection === item.id
                      ? 'text-[#6366F1] dark:text-[#818CF8] font-bold font-sans'
                      : 'text-[#6B7280] dark:text-[#9CA3AF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Actions block */}
            <div className="pt-2 flex flex-col gap-4">
              <button
                id="sign-up-mobile-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSignUpModal();
                }}
                className="w-full bg-[#6366F1] dark:bg-[#818CF8] text-white py-3 rounded-xl font-bold font-sans text-center text-sm shadow-md transition-all active:scale-[0.98]"
              >
                {t.signup}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-[90px] md:pt-[72px] pb-16 px-6 md:px-16 relative overflow-hidden"
      >
        {/* Decorative ambient blobs (strictly stylized colors matching the guide rules) */}
        <div className="absolute top-1/4 right-[5%] w-80 h-80 bg-gradient-to-tr from-indigo-500/20 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-gradient-to-tr from-[#6366F1]/10 to-[#818CF8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
          
          {/* Hero Left Content */}
          <motion.div
            variants={backInLeft}
            initial="initial"
            animate="animate"
            className="flex-1 text-left flex flex-col items-start"
          >
            {/* Pill badge */}
            <span
              id="hero-academic-pill"
              className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/40 dark:border-indigo-900/40 text-[#6366F1] dark:text-[#818CF8] font-mono text-[11px] uppercase tracking-[0.25em] mb-6 inline-flex items-center gap-2 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] dark:bg-[#818CF8] animate-pulse" />
              [ 01 ] {lang === 'uz' ? "Young Adults Ta'lim Markazi" : lang === 'ru' ? "Образовательный Центр Young Adults" : "Young Adults Education Center"}
            </span>

            {/* Big Motto with lang change animation */}
            <AnimatePresence mode="popLayout" key={lang}>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-[2.6rem] sm:text-[3.5rem] md:text-[4.8rem] lg:text-[5.5rem] font-serif font-black tracking-tight leading-[0.95] text-[#1D1F29] dark:text-white max-w-3xl whitespace-pre-line"
              >
                {t.hero.motto.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-[#6366F1] dark:text-[#818CF8] italic font-serif font-semibold">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </motion.h1>
            </AnimatePresence>

            {/* CTA Register button */}
            <motion.button
              id="hero-register-now-cta"
              onClick={() => openSignUpModal()}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer mt-8 px-8 py-4 rounded-2xl bg-[#6366F1] hover:bg-[#4F46E5] dark:bg-[#818CF8] dark:hover:bg-[#6366F1] text-white font-bold text-lg inline-flex items-center gap-2 shadow-xl transition-colors duration-300 animate-bounce"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            {/* Stats Integrated directly under Hero per Editorial Guidelines */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5 w-full grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              {t.about.stats.map((stat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="text-3xl lg:text-4xl font-serif font-black text-[#1D1F29] dark:text-white transition-all duration-300 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Right Column: Logo Flip Continuous */}
          <motion.div
            variants={backInRight}
            initial="initial"
            animate="animate"
            className="flex-1 flex justify-center items-center relative"
          >
            {/* Spinning/pulsing background rings */}
            <div className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border border-indigo-500/5 dark:border-[#818CF8]/5 animate-ping opacity-25 pointer-events-none" />
            <div className="absolute w-[260px] h-[260px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-indigo-500/10 dark:border-[#818CF8]/10 animate-spin opacity-40 pointer-events-none" />

            {/* Floating glowing circles */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-12 w-6 h-6 rounded-full bg-[#6366F1]/20 blur-sm pointer-events-none"
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 right-12 w-10 h-10 rounded-full bg-[#818CF8]/30 blur-sm pointer-events-none"
            />

            {/* Logo continuous 3D rotation frame */}
            <div style={{ perspective: 1000 }} className="relative">
              <motion.div
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                className="w-[240px] h-[240px] md:w-[380px] md:h-[380px] flex items-center justify-center p-4"
              >
                {/* Visual SVG elements as primary gorgeous fallback element */}
                <div className="relative w-full h-full flex items-center justify-center rounded-2xl glass-card border border-white/30 dark:border-white/15 bg-white/20 dark:bg-white/5 shadow-2xl p-6 select-none">
                  <LogoIcon className="w-4/5 h-4/5 text-[#6366F1] dark:text-[#818CF8]" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down animated chevron indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block cursor-pointer" onClick={() => scrollToSection('about')}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-[#6366F1] dark:hover:text-[#818CF8] transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest mb-1">Scroll Down</span>
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section
        id="about"
        className="py-24 md:py-32 px-6 md:px-16 border-t border-gray-100 dark:border-white/5 relative bg-[#FFFFFF] dark:bg-[#1D1F29]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            variants={backInUp}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false, amount: 0.15 }}
            className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16"
          >
            {/* About Left Text block */}
            <div className="flex-1 text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6366F1] dark:text-[#818CF8] bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full inline-block mb-6 select-none">
                [ 02 ] {t.about.label}
              </span>
              <h2 className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] font-serif font-bold tracking-tight text-[#1D1F29] dark:text-white leading-[1.05] mb-6">
                {t.about.title}
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#6B7280] dark:text-[#9CA3AF] max-w-lg mb-8 font-sans">
                {t.about.description}
              </p>
              
              {/* Internal prompt CTA or quick register */}
              <button
                id="about-cta-register"
                onClick={() => openSignUpModal()}
                className="cursor-pointer text-sm font-bold font-mono tracking-wider text-[#6366F1] dark:text-[#818CF8] hover:underline flex items-center gap-2 group"
              >
                Learn More About Admission Process 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* About Right Stats grid */}
            <div className="flex-1 w-full">
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-6"
              >
                {t.about.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={backInUp}
                    whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.4)" }}
                    className="bg-white/60 dark:bg-[#1C1E2A]/60 backdrop-blur-xl border border-gray-150 dark:border-white/10 p-8 rounded-2xl flex flex-col justify-center items-center text-center transition-all duration-300 shadow-sm"
                  >
                    <span className="text-[2.8rem] md:text-[3.6rem] font-serif font-black text-[#6366F1] dark:text-[#818CF8] leading-none mb-3">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6B7280] dark:text-[#9CA3AF] font-bold">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION 3: COURSES */}
      <section
        id="courses"
        className="py-24 md:py-32 px-6 md:px-16 border-t border-gray-100 dark:border-white/5 relative bg-gray-50/50 dark:bg-[#161720] transition-colors"
      >
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
            {/* Header centered */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6366F1] dark:text-[#818CF8] bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full inline-block mb-6 select-none">
                [ 03 ] {t.courses.label}
              </span>
              <h2 className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] font-serif font-bold tracking-tight text-[#1D1F29] dark:text-white leading-[1.05]">
                {t.courses.title}
              </h2>
            </div>

            {/* Courses grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {t.courses.items.map((course) => (
                <motion.div
                  key={course.id}
                  id={`course-card-${course.id}`}
                  variants={backInUp}
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(99, 102, 241, 0.5)"
                  }}
                  onClick={() => openSignUpModal(course.name)}
                  className="group cursor-pointer bg-white/70 dark:bg-[#1E202C]/70 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-start text-left transition-all duration-300 border border-gray-200 dark:border-white/5 shadow-sm"
                >
                  {/* Top Icon Block */}
                  <div className="p-3 rounded-2xl bg-[#6366F1]/5 dark:bg-[#818CF8]/5 text-[#6366F1] dark:text-[#818CF8] mb-5 group-hover:bg-[#6366F1] group-hover:text-white dark:group-hover:bg-[#818CF8] transition-colors duration-300">
                    <CourseIcon iconName={course.icon} />
                  </div>

                  <h3 className="font-serif font-bold text-[18px] mb-2 text-[#1D1F29] dark:text-white group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                    {course.name}
                  </h3>
                  
                  <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] leading-[1.7] font-sans flex-grow">
                    {course.desc}
                  </p>

                  {/* Enroll button in Editorial Monospace format */}
                  <div className="w-full flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                    <span className="text-[10px] font-mono text-[#6366F1] dark:text-[#818CF8] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                      {lang === 'uz' ? "RO'YXATDAN O'TISH →" : lang === 'ru' ? "ЗАПИСАТЬСЯ →" : "ENROLL NOW →"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION: RESULTS */}
      <ResultsSection lang={lang} />

      {/* SECTION 4: EMPLOYEES / STAFF */}
      <section
        id="staff"
        className="py-24 md:py-32 px-6 md:px-16 border-t border-gray-100 dark:border-white/5 relative bg-white dark:bg-[#1D1F29] transition-colors"
      >
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
            {/* Staff title Centered */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6366F1] dark:text-[#818CF8] bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full inline-block mb-6 select-none">
                [ 04 ] {t.employees.label}
              </span>
              <h2 className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] font-serif font-bold tracking-tight text-[#1D1F29] dark:text-white leading-[1.05]">
                {t.employees.title}
              </h2>
            </div>

            {/* Employees list grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-16"
            >
              {t.employees.items.map((worker, i) => (
                <motion.div
                  key={i}
                  variants={backInUp}
                  whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.5)" }}
                  className="group bg-white/70 dark:bg-[#1E202C]/70 backdrop-blur-xl p-5 flex flex-col justify-center items-center text-center transition-all duration-300 border border-gray-150 dark:border-white/5 rounded-2xl shadow-sm"
                >
                  <EmployeePhoto src={worker.photo} name={worker.name} />

                  <h4 className="font-serif font-bold text-[15px] mt-4 text-[#1D1F29] dark:text-white group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors leading-tight">
                    {worker.name}
                  </h4>
                  
                  <span className="text-[10px] font-mono tracking-wider text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 w-full truncate block uppercase">
                    {worker.role}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION 5: SERVICES */}
      <section
        id="services"
        className="py-24 md:py-32 px-6 md:px-16 border-t border-gray-100 dark:border-white/5 relative bg-gray-50/50 dark:bg-[#161720] transition-colors"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            variants={backInUp}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false, amount: 0.15 }}
            className="w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-start gap-12"
          >
            {/* Left side label+title */}
            <div className="xl:flex-1 text-left xl:sticky xl:top-[120px] max-w-xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6366F1] dark:text-[#818CF8] bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full inline-block mb-6 select-none">
                [ 05 ] {t.services.label}
              </span>
              <h2 className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] font-serif font-bold tracking-tight text-[#1D1F29] dark:text-white leading-[1.05]">
                {t.services.title}
              </h2>
              {/* Additional design element */}
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF] text-sm font-sans max-w-sm hidden xl:block leading-relaxed">
                We believe in providing more than just theoretical knowledge. We deliver tailored workflows, flexible timetables, and career coaching to jumpstart success.<br></br><br></br>
                Biz nafaqat nazariy bilimlarni berishga ishonamiz. Biz muvaffaqiyatga erishish uchun moslashtirilgan ish jarayonlari, moslashuvchan jadvallar va karyera bo'yicha murabbiylikni taqdim etamiz.<br></br><br></br>
                Мы верим в предоставление не только теоретических знаний. Мы предлагаем индивидуально разработанные рабочие процессы, гибкий график и карьерное консультирование для быстрого достижения успеха.<br></br><br></br>
              </p>
            </div>

            {/* Right side course/service cards */}
            <div className="xl:flex-1 w-full">
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {t.services.items.map((srv, index) => {
                  const numberLabel = `[ 0${index + 1} ]`;
                  return (
                    <motion.div
                      key={index}
                      variants={backInUp}
                      whileHover={{
                        y: -3,
                        borderLeftColor: "rgba(99, 102, 241, 1)",
                        paddingLeft: "1.25rem"
                      }}
                      className="bg-white/70 dark:bg-[#1E202C]/70 backdrop-blur-xl p-6 flex flex-col items-start text-left border-l-[3px] border-l-transparent border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm transition-all duration-300"
                    >
                      <span className="font-mono text-[10px] font-bold tracking-widest text-[#6366F1] dark:text-[#818CF8] mb-2.5">
                        {numberLabel}
                      </span>
                      
                      <h3 className="font-serif font-bold text-[16px] text-[#1D1F29] dark:text-white mb-2">
                        {srv.name}
                      </h3>
                      
                      <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] leading-[1.6] font-sans flex-grow">
                        {srv.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION 6: OUR LOCATION */}
      <section
        id="location"
        className="py-24 md:py-32 px-6 md:px-16 border-t border-gray-100 dark:border-white/5 relative bg-white dark:bg-[#1D1F29] transition-colors"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            variants={backInUp}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false, amount: 0.12 }}
            className="w-full max-w-7xl mx-auto text-left"
          >
            {/* Header */}
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6366F1] dark:text-[#818CF8] bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full inline-block mb-6 select-none">
              [ 06 ] {t.location.label}
            </span>
            <h2 className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] font-serif font-bold tracking-tight text-[#1D1F29] dark:text-white leading-[1.05] mb-12">
              {t.location.title}
            </h2>

            {/* Layout: Info block + Interactive Map block */}
            <div className="flex flex-col gap-10">
              
              {/* Branch Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.location.branches.map((branch) => {
                  const isSelected = selectedBranchId === branch.id;
                  return (
                    <div
                      key={branch.id}
                      id={`branch-card-${branch.id}`}
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`cursor-pointer p-6 flex flex-col items-start transition-all duration-300 border rounded-2xl ${
                        isSelected
                          ? 'bg-white/90 dark:bg-[#1E202C]/95 border-[#6366F1] dark:border-[#818CF8] shadow-md'
                          : 'bg-white/50 dark:bg-[#1E202C]/50 border-gray-200 dark:border-white/5 opacity-80 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      <MapPin size={24} className="text-[#6366F1] dark:text-[#818CF8] mb-4" />
                      
                      <h3 className="font-serif font-bold text-[18px] text-[#1D1F29] dark:text-white mb-3">
                        {branch.name}
                      </h3>
                      
                      <div className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] leading-[1.6] flex items-start font-sans">
                        <MapPin size={14} className="inline mr-2 mt-0.5 text-[#6366F1]/60 dark:text-[#818CF8]/60 flex-shrink-0" />
                        <span>{branch.address}</span>
                      </div>

                      <div className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] mt-2 flex items-center font-sans">
                        <Phone size={13} className="inline mr-2 text-[#6366F1]/60 dark:text-[#818CF8]/60" />
                        <span>{branch.phone}</span>
                      </div>

                      {/* Info Directions action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent card click reactivation
                          window.open(branch.mapUrl, '_blank');
                        }}
                        className="cursor-pointer text-[10px] font-mono uppercase tracking-wider text-[#6366F1] dark:text-[#818CF8] mt-6 border border-[#6366F1]/20 rounded-full px-4 py-2 hover:bg-[#6366F1] hover:text-white dark:hover:bg-[#818CF8] hover:border-transparent transition-all duration-200"
                      >
                        {lang === 'uz' ? "Yo'nalish olish" : lang === 'ru' ? "Карта проезда" : "Get Directions"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Map Holder */}
              <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#1D1F29]/5 relative shadow-inner">
                {/* Embed standard live google map based on selected node */}
                <iframe
                  id="embed-branch-map"
                  title="Branch location map"
                  src={selectedBranchData.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl dark:opacity-85"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION 7: FOOTER */}
      <footer className="py-12 px-6 md:px-16 border-t border-black/10 dark:border-white/10 bg-[#FFFFFF] dark:bg-[#1D1F29] relative z-10 transition-colors">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo container Footer */}
          <div id="footer-logo-block" className="cursor-pointer flex items-center gap-2" onClick={() => scrollToSection('home')}>
            <FooterLogo />
          </div>

          {/* Center Copyright text */}
          <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] font-mono tracking-wide text-center">
            {t.footer}
          </p>

          {/* Social icons row */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/youngadultsstudy/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card border border-black/10 dark:border-white/10 flex items-center justify-center text-[#1D1F29] dark:text-[#F9FAFB] hover:bg-[#6366F1] dark:hover:bg-[#818CF8] hover:text-white transition-all duration-300"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/youngadultsstudyteam"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card border border-black/10 dark:border-white/10 flex items-center justify-center text-[#1D1F29] dark:text-[#F9FAFB] hover:bg-[#6366F1] dark:hover:bg-[#818CF8] hover:text-white transition-all duration-300"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://t.me/youngadultsstudy"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card border border-black/10 dark:border-white/10 flex items-center justify-center text-[#1D1F29] dark:text-[#F9FAFB] hover:bg-[#6366F1] dark:hover:bg-[#818CF8] hover:text-white transition-all duration-300"
            >
              <Send size={15} />
            </a>
          </div>
        </div>
      </footer>

      {/* SIGN UP MODAL (strictly div triggers, no <form> element to align to rules) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Modal Glass Overlay */}
            <motion.div
              id="modal-backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAndResetModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body card */}
            <motion.div
              id="signup-dialog-card"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-[92vw] max-w-[450px] bg-white/95 dark:bg-[#1D1F29]/95 border border-white/25 dark:border-white/10 rounded-3xl p-8 z-[101] shadow-2xl glass-effect"
            >
              {/* Close Button */}
              <button
                id="modal-close-trigger"
                onClick={closeAndResetModal}
                className="cursor-pointer absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1D1F29] dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>

              {/* Modal Success state */}
              {isFormSubmitted ? (
                <div className="text-center py-6 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle size={64} className="text-emerald-500 mb-6" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold font-sans text-primary mb-3">
                    {lang === 'uz' ? "Muvaffaqiyatli jo'natildi!" : lang === 'ru' ? "Успешно отправлено!" : "Success!"}
                  </h3>
                  
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-8 max-w-sm font-sans">
                    {t.modal.successMsg}
                  </p>

                  <button
                    id="success-completion-close"
                    onClick={closeAndResetModal}
                    className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-bold font-sans py-3 px-8 rounded-2xl w-full shadow-lg transition-transform duration-200 active:scale-95"
                  >
                    {t.modal.close}
                  </button>
                </div>
              ) : (
                /* Modal Inputs State */
                <div className="text-left">
                  <h3 className="text-2xl font-bold font-sans text-primary select-none pr-6">
                    {t.modal.title}
                  </h3>
                  
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2 mb-6 font-sans leading-relaxed select-none">
                    {t.modal.subtitle}
                  </p>

                  <div className="space-y-4 font-sans text-sm">
                    {/* Input name */}
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 select-none uppercase">
                        {t.modal.fullName}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.modal.fullNamePl}
                        className="w-full bg-white/75 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 placeholder-gray-400 dark:placeholder-gray-500 text-primary focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:ring-2 focus:ring-[#6366F1]/20 dark:focus:ring-[#818CF8]/20 focus:outline-none transition-all shadow-inner"
                      />
                    </div>

                    {/* Input phone */}
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 select-none uppercase">
                        {t.modal.phone}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || val === "+" || /^\+?[0-9]*$/.test(val)) {
                            setPhone(val);
                          }
                        }}
                        placeholder="+998901234567"
                        className="w-full bg-white/75 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 placeholder-gray-400 dark:placeholder-gray-500 text-primary focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:ring-2 focus:ring-[#6366F1]/20 dark:focus:ring-[#818CF8]/20 focus:outline-none transition-all shadow-inner"
                      />
                    </div>

                    {/* Select Course dropdown */}
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 select-none uppercase">
                        {t.modal.course}
                      </label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full bg-white/75 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-primary focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:outline-none transition-all cursor-pointer shadow-inner"
                      >
                        <option value="" className="text-secondary select-all bg-white dark:bg-[#1D1F29]">
                          {lang === 'uz' ? "-- Kursni Tanlang --" : lang === 'ru' ? "-- Выберите Курс --" : "-- Select a Course --"}
                        </option>
                        {t.courses.items.map((course) => (
                          <option key={course.id} value={course.name} className="bg-white dark:bg-[#1D1F29]">
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select Branch dropdown */}
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 select-none uppercase">
                        {t.modal.branch}
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full bg-white/75 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-primary focus:border-[#6366F1] dark:focus:border-[#818CF8] focus:outline-none transition-all cursor-pointer shadow-inner"
                      >
                        <option value="" className="text-secondary bg-white dark:bg-[#1D1F29]">
                          {lang === 'uz' ? "-- Filialni Tanlang --" : lang === 'ru' ? "-- Выберите Филиал --" : "-- Select a Campus --"}
                        </option>
                        {t.location.branches.map((b) => (
                          <option key={b.id} value={b.name} className="bg-white dark:bg-[#1D1F29]">
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Error display */}
                    {formError && (
                      <p className="text-red-500 text-xs font-sans font-medium mt-1 select-none">
                        ⚠️ {formError}
                      </p>
                    )}

                    {/* Submit Registration button */}
                    <button
                      id="modal-submit-registration"
                      onClick={handleFormSubmit}
                      disabled={isSubmitting}
                      className={`cursor-pointer bg-[#6366F1] hover:bg-[#4F46E5] dark:bg-[#818CF8] dark:hover:bg-[#6366F1] text-white font-bold font-sans py-3.5 px-6 rounded-2xl w-full text-center shadow-lg transition-transform duration-200 active:scale-95 mt-6 block ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (lang === 'uz' ? "Yuborilmoqda..." : lang === 'ru' ? "Отправка..." : "Submitting...") : t.modal.submit}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

          {/* Scroll to Top Trigger */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                id="scroll-to-top-trigger"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-[#6366F1] hover:bg-[#4F46E5] dark:bg-[#818CF8] dark:hover:bg-[#6366F1] text-white shadow-2xl z-40 border border-white/20 hover:scale-105 transition-all"
              >
                <ArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
