'use client';

import React from 'react';
import { Grade } from '../types/worksheet';
import { sounds } from '../lib/soundEffects';

interface GradeSelectorProps {
  selectedGrade: Grade;
  onSelectGrade: (grade: Grade) => void;
  gradeCounts: Record<string, number>;
}

interface GradeInfo {
  id: Grade;
  name: string;
  subname: string;
  emoji: string;
  accent: string;
  bgActive: string;
  borderActive: string;
}

export const gradesList: GradeInfo[] = [
  {
    id: 'all',
    name: 'Όλες οι Τάξεις',
    subname: 'Από Α\' έως Στ\'',
    emoji: '🌈',
    accent: 'text-amber-600',
    bgActive: 'bg-amber-100 text-amber-900 border-amber-400',
    borderActive: 'border-amber-400 ring-2 ring-amber-300',
  },
  {
    id: 'A',
    name: 'Α\' Δημοτικού',
    subname: 'Τα Πρωτάκια',
    emoji: '🐣',
    accent: 'text-sky-600',
    bgActive: 'bg-sky-100 text-sky-900 border-sky-400',
    borderActive: 'border-sky-400 ring-2 ring-sky-300',
  },
  {
    id: 'B',
    name: 'Β\' Δημοτικού',
    subname: 'Μικροί Εξερευνητές',
    emoji: '🦊',
    accent: 'text-emerald-600',
    bgActive: 'bg-emerald-100 text-emerald-900 border-emerald-400',
    borderActive: 'border-emerald-400 ring-2 ring-emerald-300',
  },
  {
    id: 'C',
    name: 'Γ\' Δημοτικού',
    subname: 'Οι Εφευρέτες',
    emoji: '🦁',
    accent: 'text-amber-700',
    bgActive: 'bg-orange-100 text-orange-900 border-orange-400',
    borderActive: 'border-orange-400 ring-2 ring-orange-300',
  },
  {
    id: 'D',
    name: 'Δ\' Δημοτικού',
    subname: 'Οι Ταξιδιώτες',
    emoji: '🐬',
    accent: 'text-blue-700',
    bgActive: 'bg-blue-100 text-blue-900 border-blue-400',
    borderActive: 'border-blue-400 ring-2 ring-blue-300',
  },
  {
    id: 'E',
    name: 'Ε\' Δημοτικού',
    subname: 'Οι Επιστήμονες',
    emoji: '🦉',
    accent: 'text-purple-700',
    bgActive: 'bg-purple-100 text-purple-900 border-purple-400',
    borderActive: 'border-purple-400 ring-2 ring-purple-300',
  },
  {
    id: 'ST',
    name: 'Στ\' Δημοτικού',
    subname: 'Οι Απόφοιτοι',
    emoji: '🦅',
    accent: 'text-rose-700',
    bgActive: 'bg-rose-100 text-rose-900 border-rose-400',
    borderActive: 'border-rose-400 ring-2 ring-rose-300',
  },
];

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onSelectGrade,
  gradeCounts,
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <span>🎒 Επίλεξε την Τάξη σου:</span>
        </h2>
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          6 Σχολικές Τάξεις
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {gradesList.map((g) => {
          const isSelected = selectedGrade === g.id;
          const count = g.id === 'all' 
            ? Object.values(gradeCounts).reduce((a, b) => a + b, 0)
            : (gradeCounts[g.id] || 0);

          return (
            <button
              key={g.id}
              onClick={() => {
                sounds.playPop();
                onSelectGrade(g.id);
              }}
              className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border-2 ${
                isSelected
                  ? `${g.bgActive} ${g.borderActive} shadow-md scale-[1.03] z-10`
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300 text-slate-700 shadow-2xs hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl transform group-hover:scale-110 transition-transform">
                  {g.emoji}
                </span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/80 text-slate-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </div>
              <div>
                <div className="font-black text-sm leading-tight text-slate-900">
                  {g.name}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">
                  {g.subname}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
