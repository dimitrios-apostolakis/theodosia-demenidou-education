'use client';

import React from 'react';
import { Sticker } from '../types/worksheet';
import { X, Award, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface StickerAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  stickers: Sticker[];
}

export const StickerAlbumModal: React.FC<StickerAlbumModalProps> = ({
  isOpen,
  onClose,
  stickers,
}) => {
  if (!isOpen) return null;

  const unlockedCount = stickers.filter((s) => s.unlocked).length;
  const progressPercent = Math.round((unlockedCount / stickers.length) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-purple-400 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between text-white border-b-2 border-purple-700">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner">
              🏆
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black leading-tight">
                Το Άλμπουμ με τα Αυτοκόλλητά μου
              </h2>
              <p className="text-xs font-bold text-purple-200">
                Σύλλεξε όλα τα μαγικά μετάλλια λύνοντας φύλλα εργασίας!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-purple-50 p-4 border-b border-purple-200">
          <div className="flex items-center justify-between text-xs font-black text-purple-900 mb-1.5">
            <span>Πρόοδος Συλλογής:</span>
            <span>{unlockedCount} από {stickers.length} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-purple-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stickers.map((stk) => (
              <div
                key={stk.id}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between transition-all ${
                  stk.unlocked
                    ? 'bg-gradient-to-b from-yellow-50 to-white border-amber-300 shadow-md transform hover:scale-105'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="relative mb-2">
                  <span className={`text-4xl inline-block ${stk.unlocked ? 'animate-bounce-soft' : 'filter grayscale'}`}>
                    {stk.icon}
                  </span>
                  {!stk.unlocked && (
                    <span className="absolute -top-1 -right-1 bg-slate-700 text-white p-1 rounded-full text-[10px]">
                      <Lock className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="font-black text-xs text-slate-800 mb-1">
                  {stk.name}
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-tight mb-2">
                  {stk.description}
                </p>

                <div>
                  {stk.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Ξεκλειδώθηκε
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">
                      Κλειδωμένο
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="px-6 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-sm transition-all"
          >
            Συνέχεια στο Παιχνίδι! 🚀
          </button>
        </div>

      </div>
    </div>
  );
};
