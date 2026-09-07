'use client';

import React, { useState } from 'react';
import { Worksheet } from '../types/worksheet';
import { X, Printer, CheckCircle, HelpCircle, Sparkles, Award, Lightbulb } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import confetti from 'canvas-confetti';

interface WorksheetModalProps {
  worksheet: Worksheet | null;
  onClose: () => void;
  onPrint: (worksheet: Worksheet) => void;
  onSolved: (worksheet: Worksheet) => void;
}

export const WorksheetModal: React.FC<WorksheetModalProps> = ({
  worksheet,
  onClose,
  onPrint,
  onSolved,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [studentName, setStudentName] = useState('');

  if (!worksheet) return null;

  const handleSelectOption = (qId: string, option: string, isCorrect: boolean) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: option }));
    if (isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playPop();
    }
  };

  const toggleHint = (qId: string) => {
    sounds.playBanana();
    setShowHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleComplete = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });
    onSolved(worksheet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border-4 border-yellow-300 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 px-6 py-4 flex items-center justify-between border-b-2 border-yellow-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <div>
              <span className="text-xs uppercase tracking-wider font-black text-amber-900">
                Φύλλο Εργασίας Δημοτικού
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {worksheet.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 transition-transform active:scale-95 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Header Metadata Ribbon */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-yellow-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">Όνομα Μαθητή:</span>
              <input
                type="text"
                placeholder="Γράψε το ονοματάκι σου..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-yellow-300 bg-white text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="text-xs font-bold text-amber-900 bg-yellow-200/80 px-3 py-1.5 rounded-xl">
              👩‍🏫 Επιμέλεια: <strong>Θεοδοσία Δεμενίδου</strong>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-900">
            <div className="flex items-center gap-2 font-black text-sm mb-1 text-sky-950">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Οδηγίες Δασκάλας:</span>
            </div>
            <p className="text-sm font-medium leading-relaxed">
              {worksheet.content.instructions}
            </p>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            {worksheet.content.questions.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = Boolean(selected);
              const isCorrect = selected === q.answer;

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    isAnswered 
                      ? (isCorrect ? 'border-emerald-300 bg-emerald-50/40' : 'border-amber-300 bg-amber-50/30')
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm">
                        {idx + 1}
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-base">
                        {q.prompt}
                      </h4>
                    </div>

                    {q.hint && (
                      <button
                        onClick={() => toggleHint(q.id)}
                        className="flex items-center gap-1 text-xs font-extrabold text-amber-700 bg-amber-100 hover:bg-yellow-200 px-2.5 py-1 rounded-xl transition-all"
                        title="Ζήτα βοήθεια από τη Νανο-Μπανάνα!"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Βοήθεια 🍌</span>
                      </button>
                    )}
                  </div>

                  {/* Hint Accordion */}
                  {showHints[q.id] && q.hint && (
                    <div className="mb-4 p-3 rounded-xl bg-yellow-100/80 border border-yellow-300 text-amber-900 text-xs font-semibold flex items-center gap-2 animate-bounce-soft">
                      <span>🍌 <strong>Συμβουλή Nano Banana:</strong></span>
                      <span>{q.hint}</span>
                    </div>
                  )}

                  {/* Options List */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {q.options.map((option) => {
                        const isOptionSelected = selected === option;
                        const isThisCorrect = option === q.answer;

                        let btnClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';
                        if (isOptionSelected) {
                          btnClass = isThisCorrect 
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm font-black' 
                            : 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
                        }

                        return (
                          <button
                            key={option}
                            onClick={() => handleSelectOption(q.id, option, isThisCorrect)}
                            className={`p-3 rounded-xl border-2 text-left text-sm font-semibold transition-all active:scale-98 flex items-center justify-between ${btnClass}`}
                          >
                            <span>{option}</span>
                            {isOptionSelected && (
                              <span>{isThisCorrect ? '✅ Μπράβο!' : '❌ Ξαναπροσπάθησε'}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fun Fact Banner */}
          {worksheet.content.funFact && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 flex items-center gap-3">
              <span className="text-3xl animate-wiggle">🍌</span>
              <div>
                <div className="text-xs font-black text-amber-800 uppercase tracking-wider">
                  Το ήξερες αυτό;
                </div>
                <div className="text-sm font-bold text-amber-950">
                  {worksheet.content.funFact}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              sounds.playPop();
              onPrint(worksheet);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-sm border border-slate-300 shadow-sm transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            <span>Εκτύπωση σε Χαρτί A4</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="px-4 py-2.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm transition-all"
            >
              Κλείσιμο
            </button>
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md transition-all active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>Έλυσα το Φύλλο! 🎉</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
