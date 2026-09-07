'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Award, Upload, Menu, X, BookOpen, Layers } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface NavbarProps {
  onOpenUpload: () => void;
  onOpenStickers: () => void;
  unlockedStickersCount: number;
  totalStickersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUpload,
  onOpenStickers,
  unlockedStickersCount,
  totalStickersCount,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playPop();
    }
  };

  const handleMobileAction = (action: () => void) => {
    sounds.playChime();
    setIsMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-indigo-100 shadow-xs transition-all w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <a 
          href="#" 
          onClick={() => sounds.playPop()}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus:outline-none min-w-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border-2 border-indigo-200 shrink-0 transform group-hover:scale-105 transition-transform bg-indigo-900 flex items-center justify-center p-1">
            <img src="/icon.svg" alt="Μαθαίνουμε Μαζί Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-black text-base sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent truncate">
                Μαθαίνουμε Μαζί
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 hidden sm:inline-block shrink-0" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 truncate flex items-center gap-1.5">
              <span>Θεοδοσία Δεμενίδου</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400 hidden sm:inline-block"></span>
              <span className="text-indigo-600 font-extrabold hidden sm:inline-block">Δημοτικό Σχολείο</span>
            </p>
          </div>
        </a>

        {/* Desktop Controls (md and above) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          
          {/* Audio Effects Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Ενεργοποίηση Ήχων" : "Σίγαση Ήχων"}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-transform active:scale-95 shadow-2xs flex items-center gap-1.5"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
            <span className="text-xs font-extrabold">
              {isMuted ? "Ήχοι Off" : "Ήχοι On"}
            </span>
          </button>

          {/* Sticker Album Counter */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenStickers();
            }}
            title="Το Άλμπουμ των Επιτευγμάτων"
            className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all active:scale-95 shadow-2xs flex items-center gap-2 group"
          >
            <Award className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform shrink-0" />
            <div className="flex items-center gap-1 text-xs font-black">
              <span>Αυτοκόλλητα: {unlockedStickersCount}/{totalStickersCount}</span>
              <span className="text-amber-500 text-xs">⭐</span>
            </div>
          </button>

          {/* Teacher Upload Portal Button */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenUpload();
            }}
            title="Πύλη Εκπαιδευτικού: Θεοδοσία Δεμενίδου"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black text-sm shadow-xs hover:shadow-md transition-all active:scale-95 border border-indigo-700 flex items-center gap-2 shrink-0"
          >
            <Upload className="w-4 h-4 text-white shrink-0" />
            <span>Ανάρτηση Υλικού</span>
          </button>

        </div>

        {/* Mobile Right Controls: Audio + Menu Button */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          
          {/* Quick Sound Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Ενεργοποίηση Ήχων" : "Σίγαση Ήχων"}
            className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              sounds.playPop();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Μενού Επιλογών"
            className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center transition-all active:scale-95 shadow-2xs"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Slide-Down Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-indigo-100 px-4 py-5 space-y-3 shadow-xl animate-slide-up">
          
          {/* Teacher Upload Action Button */}
          <button
            onClick={() => handleMobileAction(onOpenUpload)}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-sm shadow-sm flex items-center justify-center gap-2 active:scale-98"
          >
            <Upload className="w-4 h-4" />
            <span>Πύλη Εκπαιδευτικού (+ Ανάρτηση Υλικού)</span>
          </button>

          {/* Stickers Album Action Button */}
          <button
            onClick={() => handleMobileAction(onOpenStickers)}
            className="w-full py-2.5 px-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 font-extrabold text-sm flex items-center justify-between active:scale-98"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Το Άλμπουμ των Αυτοκόλλητων</span>
            </div>
            <span className="bg-purple-200/80 px-2.5 py-0.5 rounded-full text-xs font-black text-purple-900">
              {unlockedStickersCount}/{totalStickersCount} ⭐
            </span>
          </button>

          {/* Subtitle / Teacher Attribution */}
          <div className="pt-2 border-t border-slate-100 text-center text-xs font-semibold text-slate-500">
            Εκπαιδευτικό Υλικό & Φύλλα Εργασίας • <strong>Θεοδοσία Δεμενίδου</strong>
          </div>

        </div>
      )}
    </header>
  );
};
