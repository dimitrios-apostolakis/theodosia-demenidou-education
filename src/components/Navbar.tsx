'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Award, Upload, BookOpen } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-yellow-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href="#" 
          onClick={() => sounds.playPop()}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-200 flex items-center justify-center shadow-md transform group-hover:scale-105 group-hover:rotate-3 transition-transform border-2 border-yellow-400">
            <span className="text-2xl animate-wiggle">🍌</span>
            <span className="absolute -top-1 -right-1 text-xs">✨</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Το Μαγικό Σχολείο
              </span>
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow hidden sm:inline-block" />
            </div>
            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <span>Θεοδοσία Δεμενίδου</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-600 font-medium">Δημοτικό Σχολείο</span>
            </p>
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Audio Effects Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Ενεργοποίηση Ήχων" : "Σίγαση Ήχων"}
            className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-yellow-300 transition-transform active:scale-95 shadow-sm flex items-center gap-1"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-amber-600 animate-pulse-soft" />}
            <span className="text-xs font-bold hidden md:inline">
              {isMuted ? "Ήχοι Off" : "Ήχοι On"}
            </span>
          </button>

          {/* Sticker Album Counter */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenStickers();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all active:scale-95 shadow-sm group"
          >
            <Award className="w-5 h-5 text-purple-600 group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-purple-500 hidden sm:block">
                Αυτοκολλητα
              </div>
              <div className="text-xs font-extrabold flex items-center gap-1">
                <span>{unlockedStickersCount}/{totalStickersCount}</span>
                <span className="text-amber-500">⭐</span>
              </div>
            </div>
          </button>

          {/* Teacher Upload Portal Button */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenUpload();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 border border-yellow-300"
          >
            <Upload className="w-4 h-4 text-slate-900" />
            <span className="hidden sm:inline">Ανάρτηση Υλικού</span>
            <span className="sm:hidden">Ανάρτηση</span>
          </button>

        </div>
      </div>
    </header>
  );
};
