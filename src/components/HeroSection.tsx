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
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-yellow-100/60 via-amber-50/40 to-transparent">
      {/* Decorative floating stickers / elements */}
      <div className="absolute top-6 left-8 text-4xl animate-float pointer-events-none opacity-80 select-none">
        🚀
      </div>
      <div className="absolute top-12 right-12 text-4xl animate-float-delayed pointer-events-none opacity-80 select-none">
        ⭐
      </div>
      <div className="absolute bottom-4 left-1/4 text-3xl animate-float-slow pointer-events-none opacity-70 select-none hidden md:block">
        🎨
      </div>
      <div className="absolute top-24 right-1/4 text-3xl animate-wiggle pointer-events-none opacity-70 select-none hidden md:block">
        📚
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Welcome Teacher Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/70 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-sm mb-6 animate-bounce-soft">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Καλώς ήρθατε στην εκπαιδευτική φωλιά της <strong>Θεοδοσίας Δεμενίδου</strong>!</span>
          <span className="hidden sm:inline">✨</span>
        </div>

        {/* Main Catchy Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight sm:leading-none mb-6">
          Το Πιο Μαγικό Ταξίδι <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
            Γνώσης & Δημιουργίας
          </span> για το Δημοτικό!
        </h1>

        {/* Friendly Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-8">
          Ανακαλύψτε, κατεβάστε και εκτυπώστε δωρεάν τα πιο διασκεδαστικά φύλλα εργασίας, ασκήσεις, 
          παιχνίδια και τεστ για όλες τις τάξεις από την <strong>Α' μέχρι τη Στ' Δημοτικού</strong>.
        </p>

        {/* Big Kid-Friendly Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center shadow-lg rounded-3xl bg-white border-3 border-yellow-300 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-yellow-200/60 transition-all p-2">
            <div className="pl-3 pr-2 text-amber-500">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ψάξε μάθημα, θέμα ή άσκηση (π.χ. προπαίδεια, κλάσματα, ιστορία)..."
              className="w-full py-2.5 px-2 text-slate-800 placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Καθαρισμός
              </button>
            )}
            <div className="pr-2">
              <span className="inline-flex items-center px-3 py-1 rounded-2xl bg-amber-100 text-amber-800 text-xs font-bold">
                {totalWorksheets} Φύλλα
              </span>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <span className="text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Δημοφιλή:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sounds.playPop();
                onQuickSearchTag(tag);
              }}
              className="px-3 py-1 rounded-full bg-white/80 hover:bg-yellow-200 text-slate-700 border border-yellow-200 shadow-2xs hover:scale-105 transition-all active:scale-95"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Features Micro-Badges */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-2xs flex items-center justify-center gap-2 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-xl">🖨️</span> 100% Έτοιμα για Εκτύπωση
          </div>
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-2xs flex items-center justify-center gap-2 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-xl">🎒</span> Όλες οι 6 Τάξεις
          </div>
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-2xs flex items-center justify-center gap-2 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-xl">🍌</span> Βοηθός Nano Banana
          </div>
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-center gap-2 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="text-xl">⭐</span> Συλλογή Αυτοκόλλητων
          </div>
        </div>

      </div>
    </section>
  );
};
