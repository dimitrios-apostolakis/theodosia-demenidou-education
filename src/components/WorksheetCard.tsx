'use client';

import React, { useState } from 'react';
import { Worksheet } from '../types/worksheet';
import { Printer, Eye, CheckCircle2, Clock, Star, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import confetti from 'canvas-confetti';

interface WorksheetCardProps {
  worksheet: Worksheet;
  onPreview: (worksheet: Worksheet) => void;
  onPrint: (worksheet: Worksheet) => void;
  onSolveComplete: (worksheet: Worksheet) => void;
  isSolved: boolean;
}

export const WorksheetCard: React.FC<WorksheetCardProps> = ({
  worksheet,
  onPreview,
  onPrint,
  onSolveComplete,
  isSolved,
}) => {
  const [likes, setLikes] = useState(worksheet.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const gradeBadgeMap: Record<string, { label: string; color: string }> = {
    A: { label: "Α' Δημοτικού", color: 'bg-sky-100 text-sky-800 border-sky-300' },
    B: { label: "Β' Δημοτικού", color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    C: { label: "Γ' Δημοτικού", color: 'bg-orange-100 text-orange-800 border-orange-300' },
    D: { label: "Δ' Δημοτικού", color: 'bg-blue-100 text-blue-800 border-blue-300' },
    E: { label: "Ε' Δημοτικού", color: 'bg-purple-100 text-purple-800 border-purple-300' },
    ST: { label: "Στ' Δημοτικού", color: 'bg-rose-100 text-rose-800 border-rose-300' },
  };

  const subjectIconMap: Record<string, string> = {
    language: '📚 Γλώσσα',
    math: '🔢 Μαθηματικά',
    history: '🏛️ Ιστορία',
    geography: '🌍 Μελέτη',
    science: '🔬 Φυσική',
    art: '🎨 Εικαστικά',
  };

  const triggerLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const triggerSolved = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FACC15', '#38BDF8', '#C084FC', '#4ADE80', '#FB7185']
    });
    onSolveComplete(worksheet);
  };

  const difficultyStars = '⭐'.repeat(worksheet.difficulty);

  return (
    <div className={`kid-card rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border-2 ${
      isSolved ? 'border-emerald-400 bg-emerald-50/30' : 'border-yellow-200/90'
    }`}>
      {/* Card Header: Badges & Like Button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${gradeBadgeMap[worksheet.grade]?.color || 'bg-slate-100 text-slate-700'}`}>
              {gradeBadgeMap[worksheet.grade]?.label || worksheet.grade}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {subjectIconMap[worksheet.subject] || worksheet.subject}
            </span>
          </div>

          <button
            onClick={triggerLike}
            className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-bold ${
              hasLiked ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
            }`}
            title="Μου αρέσει!"
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{likes}</span>
          </button>
        </div>

        {/* Card Title */}
        <h3 
          onClick={() => {
            sounds.playChime();
            onPreview(worksheet);
          }}
          className="text-lg font-black text-slate-800 hover:text-amber-600 transition-colors cursor-pointer leading-snug mb-2"
        >
          {worksheet.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4 line-clamp-2">
          {worksheet.description}
        </p>
      </div>

      {/* Meta Bar: Difficulty, Duration, Tags */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <span>Δυσκολία:</span>
            <span title={`Επίπεδο ${worksheet.difficulty}/3`}>{difficultyStars}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>~{worksheet.durationMinutes} λεπτά</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Preview & Solve */}
          <button
            onClick={() => {
              sounds.playChime();
              onPreview(worksheet);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs sm:text-sm transition-all active:scale-95 border border-indigo-200"
          >
            <Eye className="w-4 h-4 text-indigo-600" />
            <span>Προεπισκόπηση</span>
          </button>

          {/* Print / Download */}
          <button
            onClick={() => {
              sounds.playPop();
              onPrint(worksheet);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs sm:text-sm transition-all active:scale-95 border border-amber-300 shadow-2xs"
          >
            <Printer className="w-4 h-4 text-amber-800" />
            <span>Εκτύπωση</span>
          </button>
        </div>

        {/* Solved Status & Trigger Button */}
        <button
          onClick={triggerSolved}
          className={`w-full py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 border ${
            isSolved
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
              : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-400'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isSolved ? 'text-white' : 'text-emerald-500'}`} />
          <span>{isSolved ? 'Το έλυσες! Συγχαρητήρια! ⭐' : 'Έλυσα το φύλλο! (Κέρδισε Αστέρι)'}</span>
        </button>
      </div>
    </div>
  );
};
