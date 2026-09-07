'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Grade, Subject, Worksheet, Sticker } from '../types/worksheet';
import { initialWorksheets, initialStickers } from '../data/sampleWorksheets';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { GradeSelector } from '../components/GradeSelector';
import { SubjectFilter } from '../components/SubjectFilter';
import { WorksheetCard } from '../components/WorksheetCard';
import { WorksheetModal } from '../components/WorksheetModal';
import { TeacherUploadModal } from '../components/TeacherUploadModal';
import { StickerAlbumModal } from '../components/StickerAlbumModal';
import { NanoBananaAssistant } from '../components/NanoBananaAssistant';
import { DailyQuizBanner } from '../components/DailyQuizBanner';
import { Footer } from '../components/Footer';
import { printWorksheetDirect } from '../lib/pdfGenerator';
import { sounds } from '../lib/soundEffects';
import { Sparkles, BookOpen, Search, Filter, Layers } from 'lucide-react';

export default function HomePage() {
  // State
  const [selectedGrade, setSelectedGrade] = useState<Grade>('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customWorksheets, setCustomWorksheets] = useState<Worksheet[]>([]);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>(initialStickers);
  
  // Modals
  const [previewWorksheet, setPreviewWorksheet] = useState<Worksheet | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isStickersOpen, setIsStickersOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem('theodosia_custom_worksheets');
      if (savedCustom) {
        setCustomWorksheets(JSON.parse(savedCustom));
      }
      const savedSolved = localStorage.getItem('theodosia_solved_ids');
      if (savedSolved) {
        setSolvedIds(JSON.parse(savedSolved));
      }
      const savedStickers = localStorage.getItem('theodosia_stickers');
      if (savedStickers) {
        setStickers(JSON.parse(savedStickers));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  const saveCustomWorksheets = (updated: Worksheet[]) => {
    setCustomWorksheets(updated);
    try {
      localStorage.setItem('theodosia_custom_worksheets', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const unlockSticker = (stickerId: string) => {
    setStickers((prev) => {
      const next = prev.map((s) => (s.id === stickerId ? { ...s, unlocked: true } : s));
      // Check if 5 are unlocked -> unlock gold medal
      const unlockedCount = next.filter((s) => s.unlocked && s.id !== 'stk-8').length;
      if (unlockedCount >= 5) {
        const withMedal = next.map((s) => (s.id === 'stk-8' ? { ...s, unlocked: true } : s));
        try {
          localStorage.setItem('theodosia_stickers', JSON.stringify(withMedal));
        } catch {}
        return withMedal;
      }
      try {
        localStorage.setItem('theodosia_stickers', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Combine initial + custom
  const allWorksheets = useMemo(() => {
    return [...customWorksheets, ...initialWorksheets];
  }, [customWorksheets]);

  // Counts for filters
  const gradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allWorksheets.forEach((w) => {
      counts[w.grade] = (counts[w.grade] || 0) + 1;
    });
    return counts;
  }, [allWorksheets]);

  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allWorksheets.forEach((w) => {
      counts[w.subject] = (counts[w.subject] || 0) + 1;
    });
    return counts;
  }, [allWorksheets]);

  // Filtered worksheets
  const filteredWorksheets = useMemo(() => {
    return allWorksheets.filter((w) => {
      // Grade filter
      if (selectedGrade !== 'all' && w.grade !== selectedGrade) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'all' && w.subject !== selectedSubject) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = w.title.toLowerCase().includes(q);
        const matchDesc = w.description.toLowerCase().includes(q);
        const matchTags = w.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [allWorksheets, selectedGrade, selectedSubject, searchQuery]);

  // Actions
  const handleAddWorksheet = (newSheet: Worksheet) => {
    const updated = [newSheet, ...customWorksheets];
    saveCustomWorksheets(updated);
  };

  const handleDeleteCustomWorksheet = (id: string) => {
    const updated = customWorksheets.filter((w) => w.id !== id);
    saveCustomWorksheets(updated);
  };

  const handlePrint = (worksheet: Worksheet) => {
    unlockSticker('stk-7'); // Super printer sticker
    printWorksheetDirect(worksheet);
  };

  const handleSolveComplete = (worksheet: Worksheet) => {
    if (!solvedIds.includes(worksheet.id)) {
      const nextSolved = [...solvedIds, worksheet.id];
      setSolvedIds(nextSolved);
      try {
        localStorage.setItem('theodosia_solved_ids', JSON.stringify(nextSolved));
      } catch {}

      // Unlock subject-specific sticker
      if (worksheet.subject === 'language') unlockSticker('stk-3');
      if (worksheet.subject === 'math') unlockSticker('stk-4');
      if (worksheet.subject === 'history' || worksheet.subject === 'geography') unlockSticker('stk-5');
      if (worksheet.subject === 'science') unlockSticker('stk-6');
    }
  };

  const unlockedStickersCount = stickers.filter((s) => s.unlocked).length;

  return (
    <div className="min-h-screen flex flex-col magic-pattern text-slate-800 w-full max-w-full overflow-x-hidden relative">
      {/* Navbar */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenStickers={() => setIsStickersOpen(true)}
        unlockedStickersCount={unlockedStickersCount}
        totalStickersCount={stickers.length}
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickSearchTag={(tag) => setSearchQuery(tag)}
        totalWorksheets={allWorksheets.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden -mt-4">
        
        {/* Grade Selector Islands */}
        <GradeSelector
          selectedGrade={selectedGrade}
          onSelectGrade={setSelectedGrade}
          gradeCounts={gradeCounts}
        />

        {/* Daily Mini-Quiz Banner */}
        <DailyQuizBanner />

        {/* Subject Filter Tabs */}
        <SubjectFilter
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          subjectCounts={subjectCounts}
        />

        {/* Header Ribbon for Active Filter State */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
            <h2 className="text-base sm:text-2xl font-black text-slate-900 truncate">
              {selectedGrade === 'all' ? 'Όλα τα Φύλλα Εργασίας' : `Φύλλα Εργασίας - ${selectedGrade}' Δημοτικού`}
            </h2>
            <span className="text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-100 text-amber-800 border border-yellow-300 shrink-0">
              {filteredWorksheets.length} διαθέσιμα
            </span>
          </div>

          {(selectedGrade !== 'all' || selectedSubject !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                sounds.playPop();
                setSelectedGrade('all');
                setSelectedSubject('all');
                setSearchQuery('');
              }}
              className="text-xs font-black text-rose-600 hover:text-rose-700 underline shrink-0 ml-2"
            >
              Καθαρισμός
            </button>
          )}
        </div>

        {/* Worksheets Grid */}
        {filteredWorksheets.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-3xl border-2 border-dashed border-yellow-300 p-8">
            <div className="text-5xl mb-3 animate-bounce-soft">🔍</div>
            <h3 className="text-lg font-black text-slate-800">
              Δε βρέθηκαν φύλλα εργασίας με αυτά τα κριτήρια!
            </h3>
            <p className="text-sm text-slate-500 font-semibold mt-1 mb-4">
              Δοκιμάστε να επιλέξετε άλλη τάξη ή να καθαρίσετε την αναζήτηση.
            </p>
            <button
              onClick={() => {
                setSelectedGrade('all');
                setSelectedSubject('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-sm transition-all"
            >
              Επαναφορά Όλων των Φίλτρων
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredWorksheets.map((worksheet) => (
              <WorksheetCard
                key={worksheet.id}
                worksheet={worksheet}
                onPreview={(ws) => setPreviewWorksheet(ws)}
                onPrint={handlePrint}
                onSolveComplete={handleSolveComplete}
                isSolved={solvedIds.includes(worksheet.id)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Nano Banana Assistant */}
      <NanoBananaAssistant
        onUnlockBananaSticker={() => unlockSticker('stk-2')}
      />

      {/* Modals */}
      <WorksheetModal
        worksheet={previewWorksheet}
        onClose={() => setPreviewWorksheet(null)}
        onPrint={handlePrint}
        onSolved={handleSolveComplete}
      />

      <TeacherUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddWorksheet={handleAddWorksheet}
        customWorksheets={customWorksheets}
        onDeleteCustomWorksheet={handleDeleteCustomWorksheet}
      />

      <StickerAlbumModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        stickers={stickers}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
