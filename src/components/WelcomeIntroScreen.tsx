import React, { useState, useEffect } from 'react';
import {
  Scale,
  ArrowRight,
  BookOpen,
  Shield,
  Award,
  Sparkles,
  Building,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import indianSupremeCourt from '../assets/indian-supreme-court.jpg';

interface WelcomeIntroScreenProps {
  onStartPortal: () => void;
}

export const WelcomeIntroScreen: React.FC<WelcomeIntroScreenProps> = ({ onStartPortal }) => {
  const { settings } = useSettings();
  const isDark = settings.darkMode;

  // Phase 1: Loading (1.4s), Phase 2: Reveal intro, Phase 3: Transitioning out
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    // 1.2s loading effect before smoothly showing the welcome intro
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Staged reveal sequence
      const t1 = setTimeout(() => setAnimStep(1), 80);   // Step 1: Background & Icon
      const t2 = setTimeout(() => setAnimStep(2), 350);  // Step 2: JUSTICIA Title
      const t3 = setTimeout(() => setAnimStep(3), 650);  // Step 3: Subtitle
      const t4 = setTimeout(() => setAnimStep(4), 950);  // Step 4: Description
      const t5 = setTimeout(() => setAnimStep(5), 1250); // Step 5: START PORTAL Button

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [isLoading]);

  const handleStart = () => {
    setIsTransitioningOut(true);
    setTimeout(() => {
      onStartPortal();
    }, 650);
  };

  return (
    <div
      id="justicia-welcome-screen-root"
      className={`fixed inset-0 z-50 overflow-hidden select-none flex flex-col items-center justify-between transition-all duration-700 ${
        isDark ? 'bg-[#38231F] text-[#F5F1E3]' : 'bg-[#F5F1E3] text-[#302522]'
      } ${
        isTransitioningOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Cinematic Background Layer: Supreme Court Pillars & Constitutional Seal Motif */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          animStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft gradient backdrop */}
        <div className={`absolute inset-0 bg-radial ${
          isDark ? 'from-[#5B4742]/60 via-[#38231F] to-[#241815]' : 'from-[#F7E8DB]/70 via-[#F5F1E3] to-[#E8E1C8]'
        }`} />

        {/* Indian Supreme Court Background Image */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
          isDark ? 'opacity-25' : 'opacity-35'
        }`}>
          <img
            src={indianSupremeCourt}
            alt="Supreme Court of India"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Soft Vignette Overlay */}
        <div className={`absolute inset-0 pointer-events-none bg-radial ${
          isDark ? 'from-transparent via-[#38231F]/40 to-[#1D100E]/85' : 'from-transparent via-[#F5F1E3]/30 to-[#E8E1C8]/70'
        }`} />
      </div>

      {/* Top Subtle Seal Header */}
      <header
        className={`w-full max-w-6xl px-6 py-6 flex items-center justify-between z-20 transition-all duration-700 ${
          animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-md ${
            isDark ? 'bg-[#4A2F2B] border-[#C96F5D]/60' : 'bg-[#FFFCF5] border-[#A94F43]/40'
          }`}>
            <Scale className="w-4 h-4 text-[#A94F43]" />
          </div>
          <span className={`text-xs font-semibold tracking-widest uppercase ${
            isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
          }`}>
            Official Law & Jurisprudence Portal
          </span>
        </div>

        <div className={`flex items-center gap-2 text-xs font-medium tracking-wide border px-3 py-1 rounded-full backdrop-blur-md ${
          isDark
            ? 'text-[#F5F1E3] bg-[#4A2F2B]/90 border-[#C96F5D]/40'
            : 'text-[#A94F43] bg-[#FFFCF5]/90 border-[#A94F43]/30'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>India Legal Grid • Live</span>
        </div>
      </header>

      {/* 2. Main Center Content Experience */}
      <main className="flex-1 w-full max-w-4xl px-4 flex flex-col items-center justify-center text-center relative z-20">
        {/* Initial Loading Animation Stage (1 to 2 seconds) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
            {/* Animated Emblem / Scales Container */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl border border-[#A94F43]/30 animate-ping opacity-25" />
              <div className="absolute inset-0 rounded-2xl border-2 border-[#A94F43]/40 border-t-[#A94F43] animate-spin" />
              <div className={`w-16 h-16 rounded-xl border flex items-center justify-center shadow-xl ${
                isDark ? 'bg-[#4A2F2B] border-[#C96F5D]/50' : 'bg-[#FFFCF5] border-[#A94F43]/50'
              }`}>
                <Scale className="w-8 h-8 text-[#A94F43] animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-[#A94F43] font-semibold uppercase">
              <span>Initializing Legal Intelligence...</span>
            </div>
          </div>
        ) : (
          /* Staged Welcome Intro Reveal */
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
            {/* Step 2: Scales Emblem */}
            <div
              className={`transition-all duration-500 ease-out transform ${
                animStep >= 1
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-75 translate-y-4'
              }`}
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#A94F43]/20 via-[#C96F5D]/25 to-[#A94F43]/20 rounded-3xl blur-md opacity-60" />
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 shadow-2xl flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-b from-[#5B4742] to-[#38231F] border-[#C96F5D]/60'
                    : 'bg-gradient-to-b from-[#FFFCF5] to-[#F5F1E3] border-[#A94F43]'
                }`}>
                  <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-[#A94F43] drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Step 3: JUSTICIA Title */}
            <h1
              className={`font-playfair text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-transparent bg-clip-text px-6 pb-2 inline-block overflow-visible transition-all duration-700 ease-out ${
                isDark
                  ? 'bg-gradient-to-b from-[#F5F1E3] via-[#E4D8C5] to-[#C96F5D]'
                  : 'bg-gradient-to-b from-[#38231F] via-[#302522] to-[#A94F43]'
              } ${
                animStep >= 2
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-5 blur-xs'
              }`}
            >
              JUSTICIA
            </h1>

            {/* Step 4: LAW & CONSTITUTION PORTAL OF INDIA */}
            <div
              className={`mt-3 sm:mt-4 flex flex-col items-center gap-1.5 transition-all duration-600 ease-out ${
                animStep >= 3
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <p className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] ${
                isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
              }`}>
                LAW & CONSTITUTION PORTAL OF INDIA
              </p>
              <p className={`text-sm sm:text-base max-w-xl ${
                isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
              }`}>
                Constitutional Governance • Legal Research • Judicial Insight
              </p>
            </div>

            {/* Step 5: Short Professional Description */}
            <div
              className={`mt-8 transition-all duration-700 ease-out ${
                animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className={`max-w-xl text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#E4D8C5]' : 'text-[#76665C]'
              }`}>
                Explore the Republic’s legal architecture with constitutional clarity, statutory depth, and court-system intelligence.
              </p>
            </div>

            {/* Step 6: START PORTAL → Button */}
            <div
              className={`mt-8 transition-all duration-700 ease-out ${
                animStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <button
                onClick={handleStart}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-[#A94F43] text-[#F5F1E3] hover:bg-[#C96F5D] shadow-[#A94F43]/25'
                    : 'bg-[#A94F43] text-[#FFFFFF] hover:bg-[#873B32] shadow-[#A94F43]/20'
                }`}
              >
                Start Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
