'use client';

import React, { useState } from 'react';
import { Download, Sparkles, Check, Image as ImageIcon, Eye } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface LogoVariant {
  id: string;
  name: string;
  shortLabel: string;
  icon: string;
  src: string;
  description: string;
  dimensions: string;
  usage: string;
}

const variants: LogoVariant[] = [
  {
    id: 'primary',
    name: 'Κύριο Έμβλημα (Primary Crest)',
    shortLabel: 'Έμβλημα 🦉',
    icon: '🦉',
    src: '/logo-primary.svg',
    description: 'Επίσημο έμβλημα με τη Σοφή Κουκουβάγια, το ανοιχτό βιβλίο, δάφνινο στεφάνι και χρυσή κορδέλα.',
    dimensions: '512 × 512 px (Vector SVG)',
    usage: 'Ιστοσελίδα, επίσημα εξώφυλλα & εκπαιδευτικές παρουσιάσεις',
  },
  {
    id: 'badge',
    name: 'Σφραγίδα Εκπαιδευτικού (School Seal)',
    shortLabel: 'Σφραγίδα 📜',
    icon: '📜',
    src: '/logo-badge.svg',
    description: 'Κυκλική σφραγίδα με την ένδειξη «Θεοδοσία Δεμενίδου • Εκπαιδευτικό Υλικό Δημοτικού».',
    dimensions: '400 × 400 px (Vector SVG)',
    usage: 'Εκτύπωση στην κορυφή φύλλων εργασίας & διαγωνισμάτων',
  },
  {
    id: 'horizontal',
    name: 'Οριζόντιο Λογότυπο (Horizontal Banner)',
    shortLabel: 'Οριζόντιο 🏷️',
    icon: '🏷️',
    src: '/logo-horizontal.svg',
    description: 'Πλήρες οριζόντιο λογότυπο με το έμβλημα και τα επίσημα στοιχεία τίτλου και εκπαιδευτικού.',
    dimensions: '800 × 200 px (Vector SVG)',
    usage: 'Επικεφαλίδες εγγράφων, banners, επιστολόχαρτα & site header',
  },
  {
    id: 'avatar',
    name: 'Εικονίδιο / Favicon (App Icon)',
    shortLabel: 'Εικονίδιο 📱',
    icon: '📱',
    src: '/icon.svg',
    description: 'Τετράγωνο στρογγυλεμένο εικονίδιο εφαρμογής για καρτέλες περιηγητή και κινητά τηλέφωνα.',
    dimensions: '192 × 192 px (Vector SVG)',
    usage: 'Favicon, εικονίδιο οθόνης κινητού (PWA) & avatar προφίλ',
  },
];

export const HeroLogoShowcase: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>(variants[0]);
  const [downloaded, setDownloaded] = useState(false);

  const handleSelect = (v: LogoVariant) => {
    sounds.playPop();
    setActiveVariant(v);
  };

  const handleDownload = () => {
    sounds.playChime();
    setDownloaded(true);
    const link = document.createElement('a');
    link.href = activeVariant.src;
    link.download = `${activeVariant.id}-logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="mb-8 max-w-2xl mx-auto">
      {/* Interactive Variant Tabs */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 p-1 bg-indigo-100/70 backdrop-blur-xs rounded-2xl border border-indigo-200 mb-4 max-w-full overflow-x-auto scrollbar-none">
        {variants.map((v) => {
          const isSelected = activeVariant.id === v.id;
          return (
            <button
              key={v.id}
              onClick={() => handleSelect(v)}
              className={`px-2.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-white text-indigo-900 shadow-xs scale-[1.02] border border-indigo-200'
                  : 'text-indigo-700 hover:text-indigo-950 hover:bg-white/50'
              }`}
            >
              <span>{v.icon}</span>
              <span>{v.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Logo Card Showcase */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 border-2 border-indigo-100 shadow-lg hover:shadow-xl transition-all relative overflow-hidden flex flex-col sm:flex-row items-center gap-5 text-left">
        
        {/* Logo Image Preview Frame */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-tr from-slate-50 to-indigo-50/60 p-2 flex items-center justify-center shrink-0 border border-indigo-100 shadow-inner group">
          <img
            src={activeVariant.src}
            alt={activeVariant.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-md transform group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 right-2 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
            SVG
          </span>
        </div>

        {/* Variant Info Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
              {activeVariant.dimensions}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-xs font-bold text-emerald-600">Vector HD</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-1 truncate">
            {activeVariant.name}
          </h3>

          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
            {activeVariant.description}
          </p>

          <div className="bg-indigo-50/70 rounded-xl p-2.5 border border-indigo-100/80 mb-3 text-[11px] font-semibold text-indigo-900 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate"><strong>Χρήση:</strong> {activeVariant.usage}</span>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xs transition-all active:scale-95"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Αποθηκεύτηκε!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Λήψη SVG Αρχείου</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
