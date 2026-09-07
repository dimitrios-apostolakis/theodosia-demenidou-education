'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, X, Volume2, Lightbulb, RefreshCw, Send, Star, HelpCircle, BookOpen } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import { speakInGreek, stopSpeaking } from '../lib/speechSynthesis';
import { studyRiddles, studyTongueTwisters } from '../data/sampleWorksheets';
import confetti from 'canvas-confetti';

interface StudyAssistantProps {
  onUnlockAssistantSticker?: () => void;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({
  onUnlockAssistantSticker,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'riddles' | 'twisters' | 'tricks'>('chat');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'Γεια σου φίλε μου! Είμαι ο Σοφούλης 🦉, ο έξυπνος βοηθός μελέτης της κυρίας Θεοδοσίας! Τι απορία έχεις σήμερα στα μαθήματά σου;'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);
  const [currentTwisterIndex, setCurrentTwisterIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubbleText, setBubbleText] = useState('Χρειάζεσαι βοήθεια στα μαθήματα; 🦉');

  useEffect(() => {
    const greetings = [
      'Χρειάζεσαι βοήθεια στα μαθήματα; 🦉',
      'Έχεις απορία στην προπαίδεια; 📐',
      'Ρώτησέ με για τη γραμματική! 📚',
      'Μαθαίνουμε παρέα με την κ. Θεοδοσία! ✏️',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % greetings.length;
      setBubbleText(greetings[i]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    sounds.playChime();
    setIsOpen(true);
    if (onUnlockAssistantSticker) {
      onUnlockAssistantSticker();
    }
  };

  const handleClose = () => {
    sounds.playPop();
    stopSpeaking();
    setIsSpeaking(false);
    setIsOpen(false);
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakInGreek(text, () => setIsSpeaking(false));
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    sounds.playPop();

    // Add user message
    const newMessages = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(newMessages);

    // AI smart pedagogical child-friendly response engine
    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('προπαιδεια') || lower.includes('πολλαπλασιασμ') || lower.includes('x') || lower.includes('*')) {
        reply = 'Η προπαίδεια είναι το κλειδί των μαθηματικών! 🦉 Θυμήσου: για την προπαίδεια του 9, αν ανοίξεις τα 10 δάχτυλά σου και λυγίσεις το 3ο δάχτυλο (3 x 9), μένουν 2 δάχτυλα αριστερά και 7 δεξιά = 27! Δοκίμασέ το!';
      } else if (lower.includes('θεοδοσια') || lower.includes('δασκαλα') || lower.includes('κυρια')) {
        reply = 'Η κυρία Θεοδοσία Δεμενίδου είναι η εκπαιδευτικός μας! Ετοιμάζει όλα αυτά τα φύλλα εργασίας με πολλή φροντίδα για να αγαπήσετε τη γνώση!';
      } else if (lower.includes('αινοιγμα') || lower.includes('αινιγμα')) {
        reply = 'Πήγαινε στην καρτέλα "Αινίγματα" 🧩 πάνω δεξιά για να εξασκήσεις το μυαλό σου με σχολικές σπαζοκεφαλιές!';
      } else if (lower.includes('κλασμα') || lower.includes('κλασματα')) {
        reply = 'Τα κλάσματα είναι μέρη ενός όλου! 🍕 Ο κάτω αριθμός (παρονομαστής) λέει σε πόσα ίσα κομμάτια κόψαμε κάτι, και ο πάνω (αριθμητής) πόσα κομμάτια πήραμε!';
      } else if (lower.includes('γεια') || lower.includes('καλημερα') || lower.includes('χαρηκα')) {
        reply = 'Γεια σου αγαπητέ μαθητή! 🌟 Είσαι έτοιμος να ανακαλύψουμε νέα πράγματα σήμερα στα φύλλα εργασίας;';
      } else if (lower.includes('διαστημα') || lower.includes('πλανητ')) {
        reply = 'Το διάστημα είναι γεμάτο επιστημονικά θαύματα! 🚀 Ο Ήλιος είναι ένα αστέρι τόσο μεγάλο που χωράει μέσα του πάνω από 1.000.000 πλανήτες σαν τη Γη μας!';
      } else if (lower.includes('ορθογραφια') || lower.includes('γραμματικη')) {
        reply = 'Στην ελληνική γραμματική, τα ουσιαστικά φανερώνουν πρόσωπο, ζώο ή πράγμα, ενώ τα ρήματα δείχνουν τι κάνει κάποιος! Ποια λέξη σε δυσκολεύει;';
      } else {
        reply = `Πολύ όμορφη ερώτηση! 📚 Κάθε μέρα μαθαίνουμε κάτι καινούργιο. Δοκίμασε να λύσεις ένα φύλλο εργασίας της κυρίας Θεοδοσίας ή ρώτησέ με για την προπαίδεια και την ορθογραφία!`;
      }

      setChatMessages([...newMessages, { sender: 'assistant', text: reply }]);
      sounds.playSuccess();
    }, 600);
  };

  const triggerCelebration = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#6366F1', '#38BDF8', '#4ADE80', '#FACC15']
    });
  };

  return (
    <>
      {/* Floating Mascot Button in Bottom-Right Corner - Constrained on Mobile */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end no-print pointer-events-none max-w-[calc(100vw-24px)]">
        
        {/* Playful Floating Speech Bubble */}
        {!isOpen && (
          <div 
            onClick={handleOpen}
            className="pointer-events-auto mb-2 px-3 py-1.5 rounded-2xl bg-white/95 border-2 border-indigo-300 text-indigo-950 text-[11px] sm:text-xs font-black shadow-md cursor-pointer transform hover:scale-102 transition-all flex items-center gap-1.5 max-w-[170px] sm:max-w-[210px]"
          >
            <span>💡</span>
            <span className="truncate">{bubbleText}</span>
          </div>
        )}

        {/* Mascot Avatar Button */}
        <button
          onClick={isOpen ? handleClose : handleOpen}
          className="pointer-events-auto relative w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-indigo-600 border-3 sm:border-4 border-indigo-300 shadow-lg flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all group"
          title="Άνοιξε τον βοηθό μελέτης Σοφούλη!"
        >
          <div className="text-2xl sm:text-3xl group-hover:rotate-6 transition-transform">
            🦉
          </div>
          <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white">
            AI
          </span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-900 text-indigo-200 text-[9px] sm:text-[10px] font-black tracking-tight shadow-xs pointer-events-none">
            Βοηθός Μελέτης
          </span>
        </button>
      </div>

      {/* Expanded Interactive Assistant Modal - Zero Overflow Bottom Sheet on Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 no-print max-w-[100vw]">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md shadow-2xl border-t-4 sm:border-4 border-indigo-500 overflow-hidden flex flex-col h-[85vh] sm:h-[600px] max-h-[90vh] animate-slide-up">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white/30 shrink-0">
                  🦉
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-sm sm:text-base leading-tight flex items-center gap-1 truncate">
                    <span>Σοφούλης</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-bold text-indigo-200 truncate">
                    Έξυπνος Βοηθός Μελέτης & Σχολικών Αποριών
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={triggerCelebration}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/20 hover:bg-white/30 text-amber-300 transition-all text-xs font-extrabold"
                  title="Επιβράβευση!"
                >
                  🎉
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Feature Tabs */}
            <div className="grid grid-cols-4 bg-indigo-50/80 p-1.5 gap-1 border-b border-indigo-200 text-xs font-black text-slate-700 shrink-0">
              <button
                onClick={() => { sounds.playPop(); setActiveTab('chat'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-white shadow-xs text-indigo-800' : 'hover:bg-white/50'}`}
              >
                💬 Απορίες
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('riddles'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'riddles' ? 'bg-white shadow-xs text-indigo-800' : 'hover:bg-white/50'}`}
              >
                🧩 Αινίγματα
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('twisters'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'twisters' ? 'bg-white shadow-xs text-indigo-800' : 'hover:bg-white/50'}`}
              >
                👅 Γλώσσα
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('tricks'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'tricks' ? 'bg-white shadow-xs text-indigo-800' : 'hover:bg-white/50'}`}
              >
                📐 Κόλπα
              </button>
            </div>

            {/* Body per Tab */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              
              {/* TAB 1: Educational Chat */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-full justify-between gap-2">
                  <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'assistant' && (
                          <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center text-sm shrink-0">
                            🦉
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold max-w-[85%] leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-tr-xs'
                              : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                          }`}
                        >
                          {msg.text}
                          {msg.sender === 'assistant' && (
                            <button
                              onClick={() => handleSpeak(msg.text)}
                              className="mt-2 flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200"
                              title="Άκουσε την απάντηση στα ελληνικά!"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Άκουσέ με!</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fast Question Chips */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[10px] sm:text-[11px] font-bold text-slate-600">
                      <button
                        onClick={() => { setInputText('Πες μου ένα κόλπο για την προπαίδεια!'); }}
                        className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 whitespace-nowrap border border-indigo-200 shrink-0"
                      >
                        ⚡ Προπαίδεια
                      </button>
                      <button
                        onClick={() => { setInputText('Πώς γράφεται το παιδί;'); }}
                        className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 whitespace-nowrap border border-indigo-200 shrink-0"
                      >
                        ✏️ Ορθογραφία
                      </button>
                      <button
                        onClick={() => { setInputText('Τι είναι τα ουσιαστικά;'); }}
                        className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 whitespace-nowrap border border-indigo-200 shrink-0"
                      >
                        📚 Γραμματική
                      </button>
                    </div>

                    {/* Input form */}
                    <form onSubmit={handleSendMessage} className="flex gap-1.5">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ρώτησε τον Σοφούλη για τα μαθήματα..."
                        className="flex-1 py-2 px-3 rounded-xl border-2 border-indigo-200 text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-white"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all active:scale-95 shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 2: Riddles */}
              {activeTab === 'riddles' && (
                <div className="space-y-4 text-center py-4">
                  <div className="text-4xl animate-bounce-soft">🧩</div>
                  <h4 className="text-sm font-black text-slate-800">
                    Σχολικό Αίνιγμα #{currentRiddleIndex + 1}
                  </h4>
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 text-slate-800 font-bold text-sm leading-relaxed">
                    "{studyRiddles[currentRiddleIndex].riddle}"
                  </div>

                  {showRiddleAnswer ? (
                    <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-sm animate-fade-in">
                      {studyRiddles[currentRiddleIndex].answer}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sounds.playFanfare();
                        setShowRiddleAnswer(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm transition-all"
                    >
                      Δες την Απάντηση! 🔍
                    </button>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setShowRiddleAnswer(false);
                        setCurrentRiddleIndex((prev) => (prev + 1) % studyRiddles.length);
                      }}
                      className="flex items-center justify-center gap-1.5 mx-auto text-xs font-bold text-slate-600 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Επόμενο Αίνιγμα!</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Tongue Twisters */}
              {activeTab === 'twisters' && (
                <div className="space-y-4 text-center py-4">
                  <div className="text-4xl animate-wiggle">👅</div>
                  <h4 className="text-sm font-black text-slate-800">
                    Γλωσσοδέτης Ορθοφωνίας #{currentTwisterIndex + 1}
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-indigo-200 text-slate-800 font-extrabold text-sm leading-relaxed">
                    "{studyTongueTwisters[currentTwisterIndex]}"
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Μπορείς να τον πεις 3 φορές καθαρά χωρίς λάθος;
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => handleSpeak(studyTongueTwisters[currentTwisterIndex])}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-indigo-100 text-indigo-900 font-extrabold text-xs hover:bg-indigo-200 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Άκουσέ τον!</span>
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setCurrentTwisterIndex((prev) => (prev + 1) % studyTongueTwisters.length);
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                    >
                      Επόμενος ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Math Tricks */}
              {activeTab === 'tricks' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                    <h5 className="font-black text-xs text-indigo-900 mb-1 flex items-center gap-1">
                      <span>🦉 Το Κόλπο του 9</span>
                    </h5>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      Σε κάθε αποτέλεσμα της προπαίδειας του 9, αν προσθέσεις τα ψηφία του, κάνουν ΠΑΝΤΑ 9! (π.χ. 9x3=27 $\rightarrow$ 2+7=9, 9x6=54 $\rightarrow$ 5+4=9).
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-300">
                    <h5 className="font-black text-xs text-sky-900 mb-1 flex items-center gap-1">
                      <span>⚡ Πολλαπλασιασμός με το 10</span>
                    </h5>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      Όταν πολλαπλασιάζεις οποιονδήποτε αριθμό με το 10, απλά κολλάς ένα μηδενικό (0) στο τέλος του! π.χ. 4 x 10 = 40!
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-300">
                    <h5 className="font-black text-xs text-purple-900 mb-1 flex items-center gap-1">
                      <span>🍕 Το Κόλπο του Μισού</span>
                    </h5>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      Για να βρεις γρήγορα το μισό ενός μεγάλου αριθμού (π.χ. 68), σπάσε τον σε δεκάδες και μονάδες: το μισό του 60 είναι 30, το μισό του 8 είναι 4, άρα 34!
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Footer Note */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center text-[10px] font-bold text-slate-500 flex items-center justify-center gap-1 shrink-0">
              <span>Εκπαιδευτικός Βοηθός Μελέτης</span>
              <span>•</span>
              <span className="text-indigo-600">Σχεδιασμένο για παιδιά Δημοτικού</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
