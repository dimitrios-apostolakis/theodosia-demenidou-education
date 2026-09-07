'use client';

import React from 'react';
import { Subject } from '../types/worksheet';
import { sounds } from '../lib/soundEffects';

interface SubjectFilterProps {
  selectedSubject: Subject;
  onSelectSubject: (sub: Subject) => void;
  subjectCounts: Record<string, number>;
}

interface SubjectItem {
  id: Subject;
  label: string;
  icon: string;
  activeClass: string;
}

export const subjectsList: SubjectItem[] = [
  { id: 'all', label: 'Όλα τα Μαθήματα', icon: '✨', activeClass: 'bg-slate-800 text-white border-slate-800' },
  { id: 'language', label: 'Γλώσσα & Ορθογραφία', icon: '📚', activeClass: 'bg-blue-600 text-white border-blue-600' },
  { id: 'math', label: 'Μαθηματικά & Γεωμετρία', icon: '🔢', activeClass: 'bg-amber-600 text-white border-amber-600' },
  { id: 'history', label: 'Ιστορία & Μυθολογία', icon: '🏛️', activeClass: 'bg-emerald-600 text-white border-emerald-600' },
  { id: 'geography', label: 'Μελέτη & Γεωγραφία', icon: '🌍', activeClass: 'bg-teal-600 text-white border-teal-600' },
  { id: 'science', label: 'Φυσικά & Πειράματα', icon: '🔬', activeClass: 'bg-purple-600 text-white border-purple-600' },
  { id: 'art', label: 'Εικαστικά & Δημιουργία', icon: '🎨', activeClass: 'bg-pink-600 text-white border-pink-600' },
];

export const SubjectFilter: React.FC<SubjectFilterProps> = ({
  selectedSubject,
  onSelectSubject,
  subjectCounts,
}) => {
  return (
    <div className="py-2 mb-6 w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
        {subjectsList.map((sub) => {
          const isSelected = selectedSubject === sub.id;
          const count = sub.id === 'all'
            ? Object.values(subjectCounts).reduce((a, b) => a + b, 0)
            : (subjectCounts[sub.id] || 0);

          return (
            <button
              key={sub.id}
              onClick={() => {
                sounds.playPop();
                onSelectSubject(sub.id);
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? `${sub.activeClass} shadow-xs scale-105`
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs hover:scale-[1.02]'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.label}</span>
              <span className={`ml-0.5 sm:ml-1 text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-md ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
