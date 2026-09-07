'use client';

import React, { useState, useRef } from 'react';
import { Worksheet, Grade, Subject } from '../types/worksheet';
import { X, Upload, FileText, CheckCircle, Trash2, Plus, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import confetti from 'canvas-confetti';

interface TeacherUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorksheet: (worksheet: Worksheet) => void;
  customWorksheets: Worksheet[];
  onDeleteCustomWorksheet: (id: string) => void;
}

export const TeacherUploadModal: React.FC<TeacherUploadModalProps> = ({
  isOpen,
  onClose,
  onAddWorksheet,
  customWorksheets,
  onDeleteCustomWorksheet,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'ST'>('A');
  const [subject, setSubject] = useState<'language' | 'math' | 'history' | 'geography' | 'science' | 'art'>('language');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [tagsInput, setTagsInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState<string | undefined>();
  const [qPrompt, setQPrompt] = useState('');
  const [qOptions, setQOptions] = useState('');
  const [qAnswer, setQAnswer] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64(reader.result as string);
      sounds.playSuccess();
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Παρακαλώ συμπληρώστε τον τίτλο και την περιγραφή του φύλλου.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const questions = [];
    if (qPrompt.trim()) {
      questions.push({
        id: `q-custom-1`,
        prompt: qPrompt.trim(),
        type: 'multiple-choice' as const,
        options: qOptions ? qOptions.split(',').map((o) => o.trim()) : undefined,
        answer: qAnswer.trim() || undefined,
        hint: 'Διάβασε προσεκτικά την ερώτηση της δασκάλας σου!',
      });
    } else {
      // Default placeholder question if uploading direct PDF file
      questions.push({
        id: `q-custom-auto`,
        prompt: 'Ολοκλήρωσες τις ασκήσεις του φύλλου;',
        type: 'multiple-choice' as const,
        options: ['Ναι, τα έλυσα όλα!', 'Χρειάζομαι λίγη βοήθεια'],
        answer: 'Ναι, τα έλυσα όλα!',
        hint: 'Ζήτησε βοήθεια από την κυρία Θεοδοσία αν δυσκολευτείς!',
      });
    }

    const newSheet: Worksheet = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      grade,
      subject,
      description: description.trim(),
      difficulty,
      durationMinutes: Number(durationMinutes) || 20,
      tags: tags.length > 0 ? tags : ['Νέο Φύλλο', 'Εκπαιδευτικό'],
      fileData: fileBase64,
      downloadUrl: fileName ? `#uploaded-${fileName}` : undefined,
      solvedCount: 0,
      likes: 1,
      content: {
        instructions: instructions.trim() || 'Μελέτησε προσεκτικά το εκπαιδευτικό υλικό και λύσε τις ασκήσεις.',
        questions,
        funFact: 'Η γνώση είναι το πιο φωτεινό αστέρι στο σύμπαν!',
        badgeEarned: '🌟 Επιμελής Μαθητής',
      },
      createdAt: new Date().toISOString().split('T')[0],
      teacherNotes: 'Αναρτήθηκε από την κ. Θεοδοσία Δεμενίδου',
      isCustomUploaded: true,
    };

    onAddWorksheet(newSheet);
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Reset fields
    setTitle('');
    setDescription('');
    setInstructions('');
    setTagsInput('');
    setFileName('');
    setFileBase64(undefined);
    setQPrompt('');
    setQOptions('');
    setQAnswer('');

    setActiveTab('manage');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 px-6 py-4 flex items-center justify-between border-b-2 border-amber-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm border border-yellow-300">
              👩‍🏫
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Πύλη Εκπαιδευτικού: Θεοδοσία Δεμενίδου
              </h2>
              <p className="text-xs font-extrabold text-amber-950">
                Ανάρτηση, διαμοιρασμός & διαχείριση φύλλων εργασίας & PDF
              </p>
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

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-4 font-extrabold text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-amber-500 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Νέα Ανάρτηση Υλικού</span>
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-2.5 px-4 font-extrabold text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'manage'
                ? 'border-amber-500 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Αναρτημένα Υλικά ({customWorksheets.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {activeTab === 'upload' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* File Upload Zone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 rounded-2xl p-5 text-center cursor-pointer transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  className="hidden"
                />
                <div className="text-3xl mb-1">📄</div>
                <div className="font-extrabold text-sm text-slate-800">
                  {fileName ? (
                    <span className="text-emerald-700 flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Επιλέχθηκε: {fileName}
                    </span>
                  ) : (
                    'Κάντε κλικ για επιλογή αρχείου PDF ή φύλλου εργασίας'
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Υποστηρίζει αρχεία PDF, εικόνες ασκήσεων και έγγραφα Word
                </p>
              </div>

              {/* Title & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Τίτλος Φύλλου Εργασίας *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="π.χ. Επανάληψη στα Ρήματα & Ορθογραφία"
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Τάξη *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-bold bg-white"
                  >
                    <option value="A">Α' Δημοτικού</option>
                    <option value="B">Β' Δημοτικού</option>
                    <option value="C">Γ' Δημοτικού</option>
                    <option value="D">Δ' Δημοτικού</option>
                    <option value="E">Ε' Δημοτικού</option>
                    <option value="ST">Στ' Δημοτικού</option>
                  </select>
                </div>
              </div>

              {/* Subject & Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Μάθημα *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as any)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-bold bg-white"
                  >
                    <option value="language">Γλώσσα & Ορθογραφία</option>
                    <option value="math">Μαθηματικά & Γεωμετρία</option>
                    <option value="history">Ιστορία & Μυθολογία</option>
                    <option value="geography">Γεωγραφία & Μελέτη</option>
                    <option value="science">Φυσικά & Πειράματα</option>
                    <option value="art">Εικαστικά</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Δυσκολία
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value) as any)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-bold bg-white"
                  >
                    <option value={1}>⭐ Εύκολο</option>
                    <option value={2}>⭐⭐ Μέτριο</option>
                    <option value={3}>⭐⭐⭐ Για δυνατούς λύτες</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Εκτιμώμενος Χρόνος
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Σύντομη Περιγραφή για τους Μαθητές *
                </label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="π.χ. Ένα διασκεδαστικό φύλλο εργασίας για να εξασκηθούμε στα ρήματα σε -ίζω και -ώνω!"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-semibold"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Οδηγίες Δασκάλας
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="π.χ. Διαβάστε προσεκτικά τις προτάσεις και συμπληρώστε με μολύβι."
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-semibold"
                />
              </div>

              {/* Optional Interactive Question */}
              <div className="p-3.5 bg-yellow-50/70 border border-yellow-200 rounded-2xl space-y-2">
                <div className="text-xs font-black text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Προαιρετική Διαδραστική Ερώτηση (για online λύση στην ιστοσελίδα)</span>
                </div>
                <input
                  type="text"
                  value={qPrompt}
                  onChange={(e) => setQPrompt(e.target.value)}
                  placeholder="Ερώτηση (π.χ. Πώς γράφεται το 'τρέχω';)"
                  className="w-full py-1.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={qOptions}
                    onChange={(e) => setQOptions(e.target.value)}
                    placeholder="Επιλογές με κόμμα (π.χ. τρέχω, τρέχο, τρέχω)"
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  />
                  <input
                    type="text"
                    value={qAnswer}
                    onChange={(e) => setQAnswer(e.target.value)}
                    placeholder="Σωστή απάντηση (π.χ. τρέχω)"
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Ετικέτες (χωρισμένες με κόμμα)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="π.χ. Ορθογραφία, Ρήματα, Επανάληψη"
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-semibold"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-slate-900" />
                  <span>Ανάρτηση Υλικού στην Εκπαιδευτική Πύλη 🚀</span>
                </button>
              </div>

            </form>
          ) : (
            <div className="space-y-3">
              {customWorksheets.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <div className="text-4xl mb-2">📂</div>
                  <p className="font-bold text-sm">Δεν υπάρχουν ακόμη αναρτημένα υλικά.</p>
                  <p className="text-xs mt-1">Αναρτήστε το πρώτο σας PDF ή φύλλο εργασίας από την πρώτη καρτέλα!</p>
                </div>
              ) : (
                customWorksheets.map((sheet) => (
                  <div 
                    key={sheet.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-extrabold text-sm text-slate-800">
                        {sheet.title}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-semibold">
                        <span>Τάξη {sheet.grade}</span>
                        <span>•</span>
                        <span>{sheet.subject}</span>
                        <span>•</span>
                        <span>{sheet.createdAt}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playPop();
                        onDeleteCustomWorksheet(sheet.id);
                      }}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                      title="Διαγραφή υλικού"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
