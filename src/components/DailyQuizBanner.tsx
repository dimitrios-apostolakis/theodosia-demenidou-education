'use client';

import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, RefreshCw, BookOpen } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import confetti from 'canvas-confetti';

const dailyChallenges = [
  {
    question: 'Πόσο κάνει 6 x 7 στην προπαίδεια;',
    options: ['36', '42', '48', '40'],
    answer: '42',
    explanation: '6 x 7 = 42! Εξαιρετικός υπολογισμός στα Μαθηματικά!'
  },
  {
    question: 'Ποιο είναι το αντίθετο της λέξης "φωτεινός";',
    options: ['σκοτεινός', 'λαμπερός', 'άσπρος', 'ζεστός'],
    answer: 'σκοτεινός',
    explanation: 'Το αντίθετο του φωτεινού είναι ο σκοτεινός! Πολύ σωστά!'
  },
  {
    question: 'Σε ποια ήπειρο βρίσκεται η Ελλάδα;',
    options: ['Ασία', 'Ευρώπη', 'Αφρική', 'Αμερική'],
    answer: 'Ευρώπη',
    explanation: 'Η Ελλάδα βρίσκεται στη νοτιοανατολική Ευρώπη!'
  }
];

export const DailyQuizBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const challenge = dailyChallenges[currentIndex];

  const handleSelect = (option: string) => {
    if (solved) return;
    setSelectedOption(option);
    if (option === challenge.answer) {
      setSolved(true);
      sounds.playFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#38BDF8', '#4ADE80']
      });
    } else {
      sounds.playPop();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setSelectedOption(null);
    setSolved(false);
    setCurrentIndex((prev) => (prev + 1) % dailyChallenges.length);
  };

  return (
    <div className="my-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-100/70 border-2 border-indigo-200 shadow-xs relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-xs border border-indigo-200 shrink-0">
            🦉
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-indigo-900 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Σχολική Πρόκληση της Ημέρας!</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {challenge.question}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {challenge.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === challenge.answer;

            let btnStyle = 'bg-white hover:bg-indigo-50/50 text-slate-800 border-indigo-200';
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-emerald-600 text-white border-emerald-700 font-black shadow-xs'
                : 'bg-rose-100 text-rose-800 border-rose-300';
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all active:scale-95 ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-indigo-900 border border-indigo-200 transition-all ml-auto md:ml-0"
            title="Επόμενη ερώτηση"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {solved && (
        <div className="mt-3 text-xs font-extrabold text-emerald-800 bg-white/90 py-1.5 px-3 rounded-xl inline-flex items-center gap-1.5 animate-bounce-soft border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{challenge.explanation}</span>
        </div>
      )}
    </div>
  );
};
