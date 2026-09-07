'use client';

import React from 'react';
import { Search, Sparkles, BookOpen, Star, Award, Heart, Compass } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickSearchTag: (tag: string) => void;
  totalWorksheets: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onQuickSearchTag,
  totalWorksheets,
}) => {
  const popularTags = ['Προπαίδεια', 'Αλφαβήτα', 'Κλάσματα', '12 Θεοί Ολύμπου', 'Ποσοστά', 'Φως & Σκιά'];

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-8 pb-10 sm:pb-16 bg-gradient-to-b from-indigo-50/50 via-slate-50/30 to-transparent w-full max-w-full">
      {/* Decorative floating educational icons */}
      <div className="absolute top-4 left-2 sm:left-8 text-3xl sm:text-4xl animate-float pointer-events-none opacity-80 select-none">
        ✏️
      </div>
      <div className="absolute top-6 right-2 sm:right-12 text-3xl sm:text-4xl animate-float-delayed pointer-events-none opacity-80 select-none">
        📖
      </div>
      <div className="absolute bottom-4 left-1/4 text-3xl animate-float-slow pointer-events-none opacity-70 select-none hidden md:block">
        🎨
      </div>
      <div className="absolute top-24 right-1/4 text-3xl animate-wiggle pointer-events-none opacity-70 select-none hidden md:block">
        📐
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Welcome Teacher Pill */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-950 text-xs sm:text-sm font-bold shadow-xs mb-4 sm:mb-6 animate-bounce-soft max-w-full">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 shrink-0" />
          <span className="truncate">Εκπαιδευτικός ιστότοπος της <strong>Θεοδοσίας Δεμενίδου</strong></span>
          <span className="hidden sm:inline">✨</span>
        </div>

        {/* Main Catchy Title */}
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-snug sm:leading-none mb-4 sm:mb-6">
          Ένας Χώρος Γεμάτος <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Γνώση & Δημιουργία
          </span> για το Δημοτικό!
        </h1>

        {/* Friendly Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8">
          Ανακαλύψτε, κατεβάστε και εκτυπώστε δωρεάν χρήσιμα φύλλα εργασίας, ασκήσεις 
          και εκπαιδευτικό υλικό για όλες τις τάξεις από την <strong>Α' μέχρι τη Στ' Δημοτικού</strong>.
        </p>

        {/* Kid-Friendly Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-4 sm:mb-6">
          <div className="relative flex items-center shadow-md rounded-3xl bg-white border-2 sm:border-3 border-indigo-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition-all p-1.5 sm:p-2">
            <div className="pl-2 sm:pl-3 pr-1 sm:pr-2 text-indigo-500">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ψάξε μάθημα, θέμα ή άσκηση..."
              className="w-full py-2 px-1 sm:px-2 text-slate-800 placeholder-slate-400 text-xs sm:text-base font-semibold focus:outline-none bg-transparent min-w-0"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 shrink-0"
              >
                ✕
              </button>
            )}
            <div className="pr-1 sm:pr-2 shrink-0">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-2xl bg-indigo-50 text-indigo-800 text-[10px] sm:text-xs font-bold border border-indigo-200">
                {totalWorksheets} Φύλλα
              </span>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-bold text-slate-600">
          <span className="text-indigo-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" /> Δημοφιλή:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sounds.playPop();
                onQuickSearchTag(tag);
              }}
              className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/90 hover:bg-indigo-50 text-slate-700 border border-slate-200 shadow-2xs hover:scale-105 transition-all active:scale-95 text-[11px] sm:text-xs"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Features Micro-Badges */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          <div className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center gap-1.5 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-base sm:text-xl">🖨️</span> Εκτύπωση A4
          </div>
          <div className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-blue-200 shadow-2xs flex items-center justify-center gap-1.5 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-base sm:text-xl">🎒</span> 6 Τάξεις
          </div>
          <div className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-indigo-200 shadow-2xs flex items-center justify-center gap-1.5 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-base sm:text-xl">🦉</span> Βοηθός Μελέτης AI
          </div>
          <div className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-purple-200 shadow-2xs flex items-center justify-center gap-1.5 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-base sm:text-xl">⭐</span> Αυτοκόλλητα
          </div>
        </div>

      </div>
    </section>
  );
};
