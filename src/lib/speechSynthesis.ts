// Greek Text-to-Speech synthesizer for Nano Banana mascot

export function speakInGreek(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'el-GR';
  utterance.pitch = 1.25; // Cheerful, slightly higher pitch for friendly banana buddy
  utterance.rate = 0.95;  // Clear, friendly pace for kids

  // Find Greek voice if present
  const voices = window.speechSynthesis.getVoices();
  const greekVoice = voices.find((v) => v.lang.includes('el') || v.lang.includes('GR'));
  if (greekVoice) {
    utterance.voice = greekVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
