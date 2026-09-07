'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Award, Upload } from 'lucide-react';
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

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playPop();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-yellow-200 shadow-xs transition-all w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <a 
          href="#" 
          onClick={() => sounds.playPop()}
          className="flex items-center gap-2 sm:gap-3 group shrink-0 focus:outline-none min-w-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-200 flex items-center justify-center shadow-xs border-2 border-yellow-400 shrink-0 transform group-hover:scale-105 transition-transform">
            <span className="text-xl sm:text-2xl animate-wiggle">🍌</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-black text-base sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-amber-600 via-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
                Το Μαγικό Σχολείο
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 hidden sm:inline-block shrink-0" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 truncate flex items-center gap-1">
              <span>Θεοδοσία Δεμενίδου</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 hidden sm:inline-block"></span>
              <span className="text-emerald-600 font-extrabold hidden sm:inline-block">Δημοτικό Σχολείο</span>
            </p>
          </div>
        </a>

        {/* Action Controls - Sleek, Compact & Zero-Wrap on Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Audio Effects Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Ενεργοποίηση Ήχων" : "Σίγαση Ήχων"}
            className="w-9 h-9 sm:w-auto sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-yellow-300 transition-transform active:scale-95 shadow-2xs flex items-center justify-center gap-1.5"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
            <span className="text-xs font-extrabold hidden md:inline">
              {isMuted ? "Ήχοι Off" : "Ήχοι On"}
            </span>
          </button>

          {/* Sticker Album Counter */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenStickers();
            }}
            title="Το Άλμπουμ με τα Αυτοκόλλητα"
            className="h-9 px-2.5 sm:px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all active:scale-95 shadow-2xs flex items-center gap-1 sm:gap-1.5 group"
          >
            <Award className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform shrink-0" />
            <div className="flex items-center gap-1 text-xs font-black">
              <span>{unlockedStickersCount}/{totalStickersCount}</span>
              <span className="text-amber-500 text-[10px] sm:text-xs">⭐</span>
            </div>
          </button>

          {/* Teacher Upload Portal Button */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenUpload();
            }}
            title="Πύλη Εκπαιδευτικού: Θεοδοσία Δεμενίδου"
            className="h-9 px-2.5 sm:px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-black text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 border border-yellow-300 flex items-center gap-1.5 shrink-0"
          >
            <Upload className="w-3.5 h-3.5 text-slate-900 shrink-0" />
            <span className="hidden sm:inline">Ανάρτηση Υλικού</span>
            <span className="sm:hidden font-extrabold">+ Υλικό</span>
          </button>

        </div>
      </div>
    </header>
  );
};
