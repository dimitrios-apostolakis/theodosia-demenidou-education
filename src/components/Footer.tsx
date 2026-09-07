'use client';

import React from 'react';
import { Heart, Sparkles, BookOpen, Mail, ShieldCheck, Printer } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-gradient-to-b from-transparent to-yellow-100/70 border-t-2 border-yellow-200/80 pt-12 pb-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Teacher Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-xl shadow-sm">
                👩‍🏫
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  Θεοδοσία Δεμενίδου
                </h3>
                <p className="text-xs font-bold text-amber-800">
                  Εκπαιδευτικός Πρωτοβάθμιας Εκπαίδευσης
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-md">
              Καλωσήρθατε στην εκπαιδευτική μας κοινότητα! Στόχος μας είναι να προσφέρουμε δωρεάν, 
              ποιοτικό και ελκυστικό εκπαιδευτικό υλικό, φύλλα εργασίας και ασκήσεις για τα παιδιά 
              όλων των τάξεων του Ελληνικού Δημοτικού Σχολείου.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Όλα τα φύλλα εργασίας διατίθενται δωρεάν για εκτύπωση και χρήση στην τάξη & στο σπίτι.</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-3">
              Τάξεις Δημοτικού
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-600">
              <li><a href="#" className="hover:text-amber-600 transition-colors">🐣 Α' Δημοτικού - Πρώτη Γραφή</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">🦊 Β' Δημοτικού - Προπαίδεια</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">🦁 Γ' Δημοτικού - Μυθολογία</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">🐬 Δ' Δημοτικού - Γεωγραφία</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">🦉 Ε' Δημοτικού - Κλάσματα</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">🦅 Στ' Δημοτικού - Ιστορία 1821</a></li>
            </ul>
          </div>

          {/* Column 3: Guide for Parents */}
          <div>
            <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-3">
              Για Γονείς & Συναδέλφους
            </h4>
            <div className="space-y-2 text-xs text-slate-600 font-semibold leading-relaxed">
              <p className="flex items-start gap-1.5">
                <Printer className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Πατήστε το κουμπί <strong>"Εκτύπωση"</strong> σε οποιοδήποτε φύλλο για αυτόματη διάταξη σε χαρτί A4.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Χρησιμοποιήστε τον <strong>Έξυπνο Βοηθό Μελέτης AI</strong> για άμεση επεξήγηση και μαθηματικά τρικ στα παιδιά.</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright ribbon */}
        <div className="pt-8 border-t border-yellow-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Μαθαίνουμε Μαζί • Θεοδοσία Δεμενίδου.</span>
            <span>Με επιμέλεια & φροντίδα για την εκπαίδευση.</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Εκπαιδευτική Πλατφόρμα Πρωτοβάθμιας Εκπαίδευσης</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
