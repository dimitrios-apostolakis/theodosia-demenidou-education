'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, X, Volume2, VolumeX, Lightbulb, RefreshCw, Send, Star, HelpCircle } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import { speakInGreek, stopSpeaking } from '../lib/speechSynthesis';
import { bananaRiddles, bananaTongueTwisters } from '../data/sampleWorksheets';
import confetti from 'canvas-confetti';

interface NanoBananaAssistantProps {
  onUnlockBananaSticker?: () => void;
}

export const NanoBananaAssistant: React.FC<NanoBananaAssistantProps> = ({
  onUnlockBananaSticker,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'riddles' | 'twisters' | 'tricks'>('chat');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'banana'; text: string }>>([
    {
      sender: 'banana',
      text: 'Γεια σου φίλε μου! Είμαι ο Nano Banana 🍌🤖, ο μαγικός έξυπνος βοηθός της κυρίας Θεοδοσίας! Τι θέλεις να μάθουμε σήμερα;'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);
  const [currentTwisterIndex, setCurrentTwisterIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubbleText, setBubbleText] = useState('Πάτα με για μαγικά αινίγματα!');

  useEffect(() => {
    const greetings = [
      'Πάτα με για αινίγματα! 🍌',
      'Βοήθεια στα μαθηματικά; ✨',
      'Έχω ένα μυστικό για σένα! 🚀',
      'Μαθαίνουμε παρέα! 💛',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % greetings.length;
      setBubbleText(greetings[i]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    sounds.playBanana();
    setIsOpen(true);
    if (onUnlockBananaSticker) {
      onUnlockBananaSticker();
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

    // AI smart child-friendly response engine
    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('προπαιδεια') || lower.includes('πολλαπλασιασμ') || lower.includes('x') || lower.includes('*')) {
        reply = 'Η προπαίδεια είναι το αγαπημένο μου παιχνίδι! 🍌 Θυμήσου: για την προπαίδεια του 9, αν ανοίξεις τα 10 δάχτυλά σου και λυγίσεις το 3ο δάχτυλο (3 x 9), μένουν 2 δάχτυλα αριστερά και 7 δεξιά = 27! Δοκίμασέ το!';
      } else if (lower.includes('θεοδοσια') || lower.includes('δασκαλα') || lower.includes('κυρια')) {
        reply = 'Η κυρία Θεοδοσία Δεμενίδου είναι η πιο γλυκιά δασκάλα του σχολείου μας! Ετοιμάζει όλα αυτά τα φύλλα εργασίας με πολλή αγάπη για να περνάτε τέλεια!';
      } else if (lower.includes('αινοιγμα') || lower.includes('αινιγμα')) {
        reply = 'Πήγαινε στην καρτέλα "Αινίγματα" 🧩 πάνω δεξιά για να σου πω τα πιο αστεία αινίγματα του κόσμου!';
      } else if (lower.includes('κλασμα') || lower.includes('κλασματα')) {
        reply = 'Τα κλάσματα είναι σαν νόστιμα κομμάτια πίτσας! 🍕 Ο κάτω αριθμός (παρονομαστής) λέει σε πόσα κομμάτια κόψαμε την πίτσα, και ο πάνω (αριθμητής) πόσα φάγαμε!';
      } else if (lower.includes('γεια') || lower.includes('καλημερα') || lower.includes('χαρηκα')) {
        reply = 'Γεια σου γλυκό μου αστέρι! 🌟 Είσαι έτοιμος να λύσουμε κανένα διασκεδαστικό φύλλο εργασίας σήμερα;';
      } else if (lower.includes('διαστημα') || lower.includes('πλανητ')) {
        reply = 'Το διάστημα είναι γεμάτο μυστήρια! 🚀 Ήξερες ότι ο Ήλιος είναι τόσο τεράστιος που χωράει μέσα του πάνω από 1.000.000 πλανήτες σαν τη Γη μας;';
      } else {
        reply = `Φανταστική ερώτηση! 🌟 Μαθαίνουμε κάθε μέρα κάτι καινούργιο! Αν θέλεις, δοκίμασε να λύσεις ένα από τα φύλλα εργασίας της κυρίας Θεοδοσίας ή πάτα το κουμπί για να σου πω ένα αίνιγμα!`;
      }

      setChatMessages([...newMessages, { sender: 'banana', text: reply }]);
      sounds.playSuccess();
    }, 600);
  };

  const triggerBananaParty = () => {
    sounds.playBanana();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#FDE047', '#FACC15', '#CA8A04', '#38BDF8', '#C084FC']
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
            className="pointer-events-auto mb-2 px-3 py-1.5 rounded-2xl bg-white/95 border-2 border-yellow-400 text-amber-900 text-[11px] sm:text-xs font-black shadow-md cursor-pointer transform hover:scale-102 transition-all flex items-center gap-1.5 max-w-[170px] sm:max-w-[210px]"
          >
            <span>✨</span>
            <span className="truncate">{bubbleText}</span>
          </div>
        )}

        {/* Mascot Avatar Button */}
        <button
          onClick={isOpen ? handleClose : handleOpen}
          className="pointer-events-auto relative w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-200 border-3 sm:border-4 border-yellow-400 shadow-lg flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all group"
          title="Άνοιξε τον βοηθό Nano Banana!"
        >
          <div className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform">
            🍌
          </div>
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white">
            AI
          </span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-900 text-yellow-300 text-[9px] sm:text-[10px] font-black tracking-tight shadow-xs pointer-events-none">
            Nano Banana
          </span>
        </button>
      </div>

      {/* Expanded Interactive Assistant Modal - Zero Overflow Bottom Sheet on Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 no-print max-w-[100vw]">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md shadow-2xl border-t-4 sm:border-4 border-yellow-400 overflow-hidden flex flex-col h-[85vh] sm:h-[600px] max-h-[90vh] animate-slide-up">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 p-3.5 sm:p-4 border-b-2 border-yellow-500 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-yellow-400 shrink-0">
                  🍌
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight flex items-center gap-1 truncate">
                    <span>Google's Nano Banana</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-extrabold text-amber-900 truncate">
                    Έξυπνος Μαθητικός Βοηθός • Greek AI Buddy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={triggerBananaParty}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/80 hover:bg-white text-amber-800 transition-all text-xs font-extrabold"
                  title="Banana Party Confetti!"
                >
                  🎉
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 sm:p-2 rounded-xl bg-white/80 hover:bg-white text-slate-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Feature Tabs */}
            <div className="grid grid-cols-4 bg-yellow-100/60 p-1.5 gap-1 border-b border-yellow-300 text-xs font-black text-slate-700 shrink-0">
              <button
                onClick={() => { sounds.playPop(); setActiveTab('chat'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-white shadow-xs text-amber-800' : 'hover:bg-white/50'}`}
              >
                💬 Συνομιλία
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('riddles'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'riddles' ? 'bg-white shadow-xs text-amber-800' : 'hover:bg-white/50'}`}
              >
                🧩 Αινίγματα
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('twisters'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'twisters' ? 'bg-white shadow-xs text-amber-800' : 'hover:bg-white/50'}`}
              >
                👅 Γλώσσα
              </button>
              <button
                onClick={() => { sounds.playPop(); setActiveTab('tricks'); }}
                className={`py-1.5 rounded-xl transition-all ${activeTab === 'tricks' ? 'bg-white shadow-xs text-amber-800' : 'hover:bg-white/50'}`}
              >
                🧮 Κόλπα
              </button>
            </div>

            {/* Body per Tab */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              
              {/* TAB 1: AI Chat */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-full justify-between gap-2">
                  <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'banana' && (
                          <div className="w-7 h-7 rounded-full bg-yellow-300 border border-yellow-400 flex items-center justify-center text-sm shrink-0">
                            🍌
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold max-w-[85%] leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-amber-500 text-white rounded-tr-xs'
                              : 'bg-yellow-50 border border-yellow-200 text-slate-800 rounded-tl-xs shadow-2xs'
                          }`}
                        >
                          {msg.text}
                          {msg.sender === 'banana' && (
                            <button
                              onClick={() => handleSpeak(msg.text)}
                              className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-yellow-200/70 hover:bg-yellow-200 px-2 py-0.5 rounded-md"
                              title="Άκουσε τον Nano Banana να σου μιλάει!"
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
                        className="px-2.5 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-amber-800 whitespace-nowrap border border-yellow-300 shrink-0"
                      >
                        ⚡ Προπαίδεια
                      </button>
                      <button
                        onClick={() => { setInputText('Πώς γράφεται το παιδί;'); }}
                        className="px-2.5 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-amber-800 whitespace-nowrap border border-yellow-300 shrink-0"
                      >
                        ✏️ Ορθογραφία
                      </button>
                      <button
                        onClick={() => { setInputText('Πες μου ένα μυστικό για τον Ήλιο!'); }}
                        className="px-2.5 py-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-amber-800 whitespace-nowrap border border-yellow-300 shrink-0"
                      >
                        🚀 Διάστημα
                      </button>
                    </div>

                    {/* Input form */}
                    <form onSubmit={handleSendMessage} className="flex gap-1.5">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ρώτησε τον Nano Banana..."
                        className="flex-1 py-2 px-3 rounded-xl border-2 border-yellow-300 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all active:scale-95 shrink-0"
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
                    Αίνιγμα #{currentRiddleIndex + 1}
                  </h4>
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-yellow-300 text-slate-800 font-bold text-sm leading-relaxed">
                    "{bananaRiddles[currentRiddleIndex].riddle}"
                  </div>

                  {showRiddleAnswer ? (
                    <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-sm animate-fade-in">
                      {bananaRiddles[currentRiddleIndex].answer}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sounds.playFanfare();
                        setShowRiddleAnswer(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm transition-all"
                    >
                      Δες την Απάντηση! 🔍
                    </button>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setShowRiddleAnswer(false);
                        setCurrentRiddleIndex((prev) => (prev + 1) % bananaRiddles.length);
                      }}
                      className="flex items-center justify-center gap-1.5 mx-auto text-xs font-bold text-slate-600 hover:text-amber-700 bg-slate-100 hover:bg-yellow-100 px-3 py-1.5 rounded-xl transition-all"
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
                    Γλωσσοδέτης #{currentTwisterIndex + 1}
                  </h4>
                  <div className="p-4 rounded-2xl bg-yellow-50 border-2 border-yellow-300 text-slate-800 font-extrabold text-sm leading-relaxed">
                    "{bananaTongueTwisters[currentTwisterIndex]}"
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Μπορείς να τον πεις 3 φορές γρήγορα χωρίς να μπερδευτείς;
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => handleSpeak(bananaTongueTwisters[currentTwisterIndex])}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-100 text-amber-900 font-extrabold text-xs hover:bg-amber-200 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Άκουσέ τον!</span>
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setCurrentTwisterIndex((prev) => (prev + 1) % bananaTongueTwisters.length);
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
                  <div className="p-3 rounded-2xl bg-amber-50 border border-yellow-300">
                    <h5 className="font-black text-xs text-amber-900 mb-1 flex items-center gap-1">
                      <span>🍌 Το Κόλπο του 9</span>
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
              <span>Google Gemini & Nano Banana Engine</span>
              <span>•</span>
              <span className="text-amber-600">Σχεδιασμένο για παιδιά Δημοτικού</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
