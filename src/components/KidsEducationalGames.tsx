'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle2, XCircle, Trophy, Flame, Star, ArrowRight } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import { speakInGreek, stopSpeaking } from '../lib/speechSynthesis';
import confetti from 'canvas-confetti';

export type GameCategory = 'ancient-roots' | 'mythology' | 'spelling-math';

interface GameQuestion {
  id: string;
  ancientRoot?: string;
  rootMeaning?: string;
  rootIcon?: string;
  question: string;
  options: string[];
  answer: string;
  funFact: string;
  explanation: string;
}

const ancientRootsQuestions: GameQuestion[] = [
  {
    id: 'ar-1',
    ancientRoot: 'ἵππος',
    rootMeaning: 'άλογο',
    rootIcon: '🐎',
    question: 'Ποιο μεγάλο ζώο που κολυμπά στα ποτάμια της Αφρικής πήρε το όνομά του από τον αρχαίο «ἵππο»;',
    options: ['Ιπποπόταμος', 'Ρινόκερος', 'Κροκόδειλος', 'Καμηλοπάρδαλη'],
    answer: 'Ιπποπόταμος',
    funFact: 'ἵππος (άλογο) + ποταμός = το άλογο του ποταμού!',
    explanation: 'Οι αρχαίοι Έλληνες όταν είδαν για πρώτη φορά το ζώο στον Νείλο, τους θύμισε ένα τεράστιο άλογο που ζει στο νερό! Από τον ίππο έχουμε επίσης την ιππασία και τον ιππόδρομο!'
  },
  {
    id: 'ar-2',
    ancientRoot: 'ὕδωρ',
    rootMeaning: 'νερό',
    rootIcon: '💧',
    question: 'Πού πηγαίνουμε για να δούμε ψάρια και θαλάσσια πλάσματα να κολυμπούν μέσα σε μεγάλες γυάλινες δεξαμενές;',
    options: ['Ενυδρείο', 'Ζωολογικός Κήπος', 'Μουσείο', 'Βοτανικός Κήπος'],
    answer: 'Ενυδρείο',
    funFact: 'εν (μέσα) + ὕδωρ (νερό) = αυτό που είναι μέσα στο νερό!',
    explanation: 'Το «ενυδρείο» σημαίνει το σπίτι μέσα στο νερό! Από το αρχαίο ὕδωρ προέρχονται επίσης το υδροπλάνο, ο υδραυλικός και η ενυδάτωση!'
  },
  {
    id: 'ar-3',
    ancientRoot: 'ἥλιος',
    rootMeaning: 'ο ήλιος',
    rootIcon: '☀️',
    question: 'Ποιο πανέμορφο κίτρινο λουλούδι γυρίζει το κεφάλι του ακολουθώντας τον ήλιο στον ουρανό;',
    options: ['Ηλιοτρόπιο', 'Τριαντάφυλλο', 'Μαργαρίτα', 'Τουλίπα'],
    answer: 'Ηλιοτρόπιο',
    funFact: 'ἥλιος + τρέπω (γυρίζω) = αυτό που γυρίζει προς τον ήλιο!',
    explanation: 'Το αρχαίο ρήμα «τρέπω» σημαίνει γυρίζω ή στρέφω. Το ηλιοτρόπιο κυριολεκτικά στρέφεται όλη μέρα προς το φως του ήλιου!'
  },
  {
    id: 'ar-4',
    ancientRoot: 'γῆ',
    rootMeaning: 'γη, χώμα, πλανήτης',
    rootIcon: '🌍',
    question: 'Ποιο σχολικό μάθημα μας μαθαίνει τα βουνά, τα ποτάμια, τις θάλασσες και τις χώρες του κόσμου;',
    options: ['Γεωγραφία', 'Ιστορία', 'Μαθηματικά', 'Μουσική'],
    answer: 'Γεωγραφία',
    funFact: 'γῆ + γράφω = περιγράφω και αποτυπώνω τη Γη!',
    explanation: 'Γεωγραφία σημαίνει «γράφω για τη Γη»! Από τη γῆ γεννήθηκε και ο γεωργός (γη + έργο/δουλειά) και η γεωλογία!'
  },
  {
    id: 'ar-5',
    ancientRoot: 'βίβλος',
    rootMeaning: 'πάπυρος, βιβλίο',
    rootIcon: '📖',
    question: 'Πώς ονομάζεται ο ήσυχος χώρος του σχολείου όπου μπορούμε να διαβάσουμε και να δανειστούμε βιβλία;',
    options: ['Βιβλιοθήκη', 'Κυλικείο', 'Γυμναστήριο', 'Εργαστήριο'],
    answer: 'Βιβλιοθήκη',
    funFact: 'βίβλος (βιβλίο) + θήκη (χώρος φύλαξης)!',
    explanation: 'Η «θήκη» στην αρχαία γλώσσα είναι το μέρος όπου φυλάμε με ασφάλεια κάτι πολύτιμο. Άρα βιβλιοθήκη είναι το σπίτι των βιβλίων!'
  },
  {
    id: 'ar-6',
    ancientRoot: 'φίλος',
    rootMeaning: 'αγαπημένος, αυτός που νοιάζεται',
    rootIcon: '🐕',
    question: 'Πώς λέγεται ο άνθρωπος που αγαπά, φροντίζει και προστατεύει με όλη του την καρδιά τα ζώα;',
    options: ['Φιλόζωος', 'Κτηνίατρος', 'Βοσκός', 'Ιχθυοπώλης'],
    answer: 'Φιλόζωος',
    funFact: 'φίλος (αυτός που αγαπά) + ζῶον!',
    explanation: 'Από το «φίλος» έχουμε επίσης τη λέξη «φιλοξενία» (αγάπη και φροντίδα για τους ξένους επισκέπτες) και τη «φιλομάθεια» (αγάπη για τη μάθηση)!'
  },
  {
    id: 'ar-7',
    ancientRoot: 'δῆμος',
    rootMeaning: 'ο λαός, οι πολίτες',
    rootIcon: '🏛️',
    question: 'Ποιο σπουδαίο πολίτευμα γεννήθηκε στην Αρχαία Αθήνα όπου αποφασίζουν ελεύθερα όλοι οι πολίτες;',
    options: ['Δημοκρατία', 'Μοναρχία', 'Αυτοκρατορία', 'Ολιγαρχία'],
    answer: 'Δημοκρατία',
    funFact: 'δῆμος (λαός) + κράτος (δύναμη, εξουσία)!',
    explanation: 'Στη Δημοκρατία η δύναμη ανήκει στον λαό! Είναι το πολίτευμα που δίδαξε η Αθήνα σε ολόκληρο τον κόσμο μέχρι σήμερα.'
  },
  {
    id: 'ar-8',
    ancientRoot: 'τηλε-',
    rootMeaning: 'μακριά, από απόσταση',
    rootIcon: '🔭',
    question: 'Με ποιο επιστημονικό όργανο κοιτάμε τα αστέρια και τους πλανήτες που βρίσκονται πάρα πολύ μακριά στο σύμπαν;',
    options: ['Τηλεσκόπιο', 'Μικροσκόπιο', 'Μεγεθυντικός φακός', 'Πυξίδα'],
    answer: 'Τηλεσκόπιο',
    funFact: 'τηλε- (μακριά) + σκοπῶ (κοιτάζω, παρατηρώ)!',
    explanation: 'Το αρχαίο «τηλε-» σημαίνει μακριά! Έτσι έχουμε το τηλέφωνο (φωνή από μακριά), την τηλεόραση (εικόνα από μακριά) και τον τηλέγραφο!'
  },
  {
    id: 'ar-9',
    ancientRoot: 'χρόνος',
    rootMeaning: 'η ώρα, η διάρκεια',
    rootIcon: '⏱️',
    question: 'Ποιο ειδικό ρολόι χρησιμοποιεί ο γυμναστής για να μετρήσει με ακρίβεια πόσο γρήγορα τρέξαμε;',
    options: ['Χρονόμετρο', 'Θερμόμετρο', 'Βαρόμετρο', 'Ζυγαριά'],
    answer: 'Χρονόμετρο',
    funFact: 'χρόνος + μέτρον (μετρώ)!',
    explanation: 'Το χρονόμετρο μετράει το χρόνο με ακρίβεια δευτερολέπτου. Από το χρόνο έχουμε και τη χρονολογία και το χρονοδιάγραμμα!'
  },
  {
    id: 'ar-10',
    ancientRoot: 'γράφω',
    rootMeaning: 'χαράσσω, σημειώνω',
    rootIcon: '📷',
    question: 'Πώς ονομάζεται η τέχνη όπου αποτυπώνουμε μια εικόνα χρησιμοποιώντας το φως;',
    options: ['Φωτογραφία', 'Ζωγραφική', 'Γλυπτική', 'Χαρακτική'],
    answer: 'Φωτογραφία',
    funFact: 'φῶς + γράφω = ζωγραφίζω / γράφω με το φως!',
    explanation: 'Η φωτογραφία κυριολεκτικά σημαίνει «γράφω με τη βοήθεια του φωτός». Μια μαγική αρχαία ελληνική σύνθεση που χρησιμοποιεί όλος ο πλανήτης!'
  }
];

const mythologyQuestions: GameQuestion[] = [
  {
    id: 'my-1',
    rootIcon: '⚡',
    question: 'Ποιος ήταν ο πανίσχυρος βασιλιάς των θεών στον Όλυμπο που κρατούσε τον αστραφτερό κεραυνό;',
    options: ['Δίας (Ζευς)', 'Ποσειδώνας', 'Άρης', 'Ήφαιστος'],
    answer: 'Δίας (Ζευς)',
    funFact: 'Ο Δίας προστάτευε τους ξένους και τους ικέτες (Ξένιος Ζευς)!',
    explanation: 'Ο Δίας κυβερνούσε τους θεούς από την ψηλότερη κορυφή του Ολύμπου, τον Μύτικα, και έστελνε τη βροχή και τις αστραπές στη γη.'
  },
  {
    id: 'my-2',
    rootIcon: '🦉',
    question: 'Ποια ήταν η θεά της σοφίας και της μάθησης που είχε για ιερό πουλί την κουκουβάγια;',
    options: ['Αθηνά', 'Ήρα', 'Αφροδίτη', 'Άρτεμις'],
    answer: 'Αθηνά',
    funFact: 'Η κουκουβάγια ήταν το σύμβολο της σοφίας της Αθηνάς!',
    explanation: 'Η θεά Αθηνά χάρισε στην πόλη της Αθήνας το δέντρο της ελιάς, κερδίζοντας την αγάπη των κατοίκων. Είναι και το σύμβολο του Σοφούλη μας!'
  },
  {
    id: 'my-3',
    rootIcon: '🔱',
    question: 'Ποιος θεός κυβερνούσε τα βάθη των θαλασσών και κουνούσε την τρίαινα για να σηκώσει κύματα;',
    options: ['Ποσειδώνας', 'Ερμής', 'Απόλλωνας', 'Διόνυσος'],
    answer: 'Ποσειδώνας',
    funFact: 'Ο Ποσειδώνας δημιούργησε και το πρώτο άλογο κατά τον μύθο!',
    explanation: 'Ο Ποσειδώνας ζούσε σε ένα χρυσό παλάτι στον βυθό του Αιγαίου και προστάτευε τους ναυτικούς στα ταξίδια τους.'
  },
  {
    id: 'my-4',
    rootIcon: '🪽',
    question: 'Ποιος θεός φορούσε χρυσά φτερωτά σανδάλια και μετέφερε αστραπιαία τα μηνύματα των θεών;',
    options: ['Ερμής', 'Άρης', 'Ήλιος', 'Έρωτας'],
    answer: 'Ερμής',
    funFact: 'Ο Ερμής κρατούσε το κηρύκειο, ένα ραβδί με δύο φίδια!',
    explanation: 'Ο Ερμής ήταν ο ταχύτερος θεός, προστάτης των ταξιδιωτών, των γραμμάτων και του εμπορίου.'
  },
  {
    id: 'my-5',
    rootIcon: '🎵',
    question: 'Ποιος ήταν ο θεός της μουσικής, της ποίησης και του φωτός που μάγευε με τη χρυσή λύρα του;',
    options: ['Απόλλωνας', 'Ήφαιστος', 'Κρόνος', 'Πλούτωνας'],
    answer: 'Απόλλωνας',
    funFact: 'Ο Απόλλωνας οδηγούσε το άρμα του Ήλιου στον ουρανό!',
    explanation: 'Ο Απόλλωνας λατρευόταν στο μαντείο των Δελφών και προστάτευε τις 9 Μούσες των τεχνών.'
  },
  {
    id: 'my-6',
    rootIcon: '🏹',
    question: 'Ποια ήταν η θεά των δασών και του κυνηγιού που κρατούσε ασημένιο τόξο και προστάτευε τα ελαφάκια;',
    options: ['Άρτεμις', 'Δήμητρα', 'Εστία', 'Περσεφόνη'],
    answer: 'Άρτεμις',
    funFact: 'Η Άρτεμις ήταν η δίδυμη αδελφή του θεού Απόλλωνα!',
    explanation: 'Η Άρτεμις αγαπούσε την ελευθερία, τη φύση, τα γάργαρα ποτάμια και όλα τα άγρια ζωάκια του δάσους.'
  },
  {
    id: 'my-7',
    rootIcon: '🔨',
    question: 'Ποιος ήταν ο ικανός τεχνίτης θεός που έφτιαχνε στο καμίνι του τα όπλα και τα παλάτια των θεών;',
    options: ['Ήφαιστος', 'Άρης', 'Δίας', 'Πλούτωνας'],
    answer: 'Ήφαιστος',
    funFact: 'Το εργαστήριο του Ηφαίστου βρισκόταν στα βάθη των ηφαιστείων!',
    explanation: 'Ο Ήφαιστος ήταν ο θεός της φωτιάς και της μεταλλουργίας. Με το σφυρί του έφτιαχνε αριστουργήματα από χρυσό, ασήμι και χαλκό!'
  }
];

const spellingMathQuestions: GameQuestion[] = [
  {
    id: 'sm-1',
    rootIcon: '🐕',
    question: 'Ποια είναι η σωστή ορθογραφία: «Ο ... είναι ο πιο πιστός φίλος του ανθρώπου»;',
    options: ['σκύλος (με υ)', 'σκίλος (με ι)', 'σκύλλος (με δύο λ)', 'σκείλος (με ει)'],
    answer: 'σκύλος (με υ)',
    funFact: 'Ο σκύλος γράφεται πάντα με ύψιλον (υ) και ένα λάμδα (λ)!',
    explanation: 'Θυμήσου τον κανόνα: ο σκύλος, του σκύλου! Γράφεται πάντα με «υ».'
  },
  {
    id: 'sm-2',
    rootIcon: '🧮',
    question: 'Πόσο κάνει στην προπαίδεια: 8 x 8 = ;',
    options: ['64', '56', '72', '68'],
    answer: '64',
    funFact: '8 x 8 = 64! Ένας από τους πιο διάσημους αριθμούς της προπαίδειας!',
    explanation: 'Σκέψου: 8 x 7 = 56, και προσθέτουμε άλλα 8, φτάνουμε ακριβώς στο 64!'
  },
  {
    id: 'sm-3',
    rootIcon: '⚽',
    question: 'Ποιο είναι το σωστό ρήμα: «Τα παιδιά ... ποδόσφαιρο στην αυλή του σχολείου»;',
    options: ['παίζουν (με αι)', 'πέζουν (με ε)', 'πήζουν (με η)', 'πείζουν (με ει)'],
    answer: 'παίζουν (με αι)',
    funFact: 'Το ρήμα παίζω γράφεται πάντα με άλφα-γιώτα (αι)!',
    explanation: 'Όλες οι λέξεις της οικογένειας (παιχνίδι, παίκτης, παιχνιδιάρης) γράφονται με «αι»!'
  },
  {
    id: 'sm-4',
    rootIcon: '🍎',
    question: 'Αν ένα κόκκινο μήλο κοστίζει 50 λεπτά, πόσα λεπτά κοστίζουν 4 μήλα;',
    options: ['200 λεπτά (2 ευρώ)', '150 λεπτά', '100 λεπτά', '250 λεπτά'],
    answer: '200 λεπτά (2 ευρώ)',
    funFact: '4 φορές το 50 κάνει 200 λεπτά, δηλαδή 2 ευρώ!',
    explanation: '50 + 50 = 100 λεπτά (1 ευρώ) για τα δύο, άρα για 4 μήλα έχουμε 200 λεπτά (2 ευρώ)!'
  },
  {
    id: 'sm-5',
    rootIcon: '✏️',
    question: 'Ποιο είναι το σωστό ουδέτερο άρθρο: «... θρανίο της τάξης είναι καθαρό»;',
    options: ['Το', 'Τον', 'Του', 'Των'],
    answer: 'Το',
    funFact: 'Τα ουδέτερα ονόματα παίρνουν το άρθρο «το» στον ενικό!',
    explanation: 'Το θρανίο, το βιβλίο, το μολύβι. Το άρθρο «τον» χρησιμοποιείται για τα αρσενικά (π.χ. τον δάσκαλο)!'
  },
  {
    id: 'sm-6',
    rootIcon: '🔢',
    question: 'Πόσο κάνει: 50 + 75 = ;',
    options: ['125', '115', '135', '120'],
    answer: '125',
    funFact: '50 + 50 = 100, συν άλλα 25 μας κάνει 125!',
    explanation: 'Έξοχος νοερός υπολογισμός! Τα μαθηματικά γίνονται παιχνίδι όταν σπας τους αριθμούς.'
  }
];

interface KidsEducationalGamesProps {
  onUnlockSticker?: (stickerId: string) => void;
}

export const KidsEducationalGames: React.FC<KidsEducationalGamesProps> = ({
  onUnlockSticker,
}) => {
  const [activeCategory, setActiveCategory] = useState<GameCategory>('ancient-roots');
  const [questionIndices, setQuestionIndices] = useState<Record<GameCategory, number>>({
    'ancient-roots': 0,
    'mythology': 0,
    'spelling-math': 0,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getQuestions = () => {
    switch (activeCategory) {
      case 'ancient-roots':
        return ancientRootsQuestions;
      case 'mythology':
        return mythologyQuestions;
      case 'spelling-math':
        return spellingMathQuestions;
    }
  };

  const currentQuestions = getQuestions();
  const currentIndex = questionIndices[activeCategory] % currentQuestions.length;
  const currentQ = currentQuestions[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isSolved) return;
    setSelectedOption(opt);

    if (opt === currentQ.answer) {
      setIsSolved(true);
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B']
      });

      if (activeCategory === 'ancient-roots' && onUnlockSticker) {
        onUnlockSticker('stk-9');
      }
      if (newStreak >= 3 && onUnlockSticker) {
        onUnlockSticker('stk-10');
      }
    } else {
      sounds.playPop();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    stopSpeaking();
    setIsSpeaking(false);
    setSelectedOption(null);
    setIsSolved(false);

    setQuestionIndices((prev) => ({
      ...prev,
      [activeCategory]: (prev[activeCategory] + 1) % currentQuestions.length,
    }));
  };

  const handleSwitchCategory = (cat: GameCategory) => {
    sounds.playPop();
    stopSpeaking();
    setIsSpeaking(false);
    setSelectedOption(null);
    setIsSolved(false);
    setActiveCategory(cat);
  };

  const handleVoiceRead = () => {
    sounds.playPop();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = currentQ.ancientRoot 
      ? `Αρχαία λέξη: ${currentQ.ancientRoot}, σημαίνει ${currentQ.rootMeaning}. Ερώτηση: ${currentQ.question}`
      : `Ερώτηση: ${currentQ.question}`;

    setIsSpeaking(true);
    speakInGreek(textToSpeak, () => {
      setIsSpeaking(false);
    });
  };

  const getPlayerTitle = () => {
    if (score >= 60) return { title: '🏛️ Σοφός Μύστης της Γνώσης', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    if (score >= 30) return { title: '🔍 Ακούραστος Ερευνητής', color: 'text-indigo-700 bg-indigo-100 border-indigo-300' };
    return { title: '🌱 Μικρός Εξερευνητής', color: 'text-blue-700 bg-blue-100 border-blue-300' };
  };

  const playerBadge = getPlayerTitle();

  return (
    <section id="games-section" className="my-8 sm:my-10 relative scroll-mt-24">
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-5 sm:p-8 shadow-xl border-2 sm:border-4 border-indigo-400/40 overflow-hidden">
        
        <div className="absolute -top-6 -right-6 text-7xl sm:text-8xl opacity-10 pointer-events-none select-none">
          🏛️
        </div>
        <div className="absolute -bottom-8 -left-8 text-7xl sm:text-8xl opacity-10 pointer-events-none select-none">
          🦉
        </div>

        {/* Top Header & Stats */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-indigo-700/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Παιδική Ζώνη Εκπαιδευτικών Παιχνιδιών</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>🎮 Παιχνίδια & Αρχαία Ελληνικά</span>
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium mt-1">
              Ανακάλυψε τις αρχαίες ρίζες των σημερινών λέξεων, τους 12 Θεούς του Ολύμπου και διασκέδασε!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 bg-indigo-950/70 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-indigo-600/50 shadow-inner">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-black border border-amber-500/30">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{score} Πόντοι</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 text-xs sm:text-sm font-black border border-rose-500/30">
              <Flame className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>Σερί: {streak}</span>
            </div>

            <div className={`px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-black border ${playerBadge.color}`}>
              {playerBadge.title}
            </div>
          </div>
        </div>

        {/* Game Modes Category Switcher */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-5 pb-4">
          <button
            onClick={() => handleSwitchCategory('ancient-roots')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all active:scale-95 shadow-xs ${
              activeCategory === 'ancient-roots'
                ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-400/30 scale-102'
                : 'bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 border border-indigo-600/60'
            }`}
          >
            <span className="text-base sm:text-lg">🏛️</span>
            <span>Αρχαία Ελληνικά & Ετυμολογία</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20">
              {ancientRootsQuestions.length}
            </span>
          </button>

          <button
            onClick={() => handleSwitchCategory('mythology')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all active:scale-95 shadow-xs ${
              activeCategory === 'mythology'
                ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-400/30 scale-102'
                : 'bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 border border-indigo-600/60'
            }`}
          >
            <span className="text-base sm:text-lg">⚡</span>
            <span>Οι 12 Θεοί του Ολύμπου</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20">
              {mythologyQuestions.length}
            </span>
          </button>

          <button
            onClick={() => handleSwitchCategory('spelling-math')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all active:scale-95 shadow-xs ${
              activeCategory === 'spelling-math'
                ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-400/30 scale-102'
                : 'bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 border border-indigo-600/60'
            }`}
          >
            <span className="text-base sm:text-lg">🧮</span>
            <span>Ορθογραφία & Μαθηματικά</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20">
              {spellingMathQuestions.length}
            </span>
          </button>
        </div>

        {/* Question Card Arena */}
        <div className="relative z-10 bg-white rounded-3xl p-5 sm:p-7 text-slate-900 shadow-2xl border-2 border-indigo-100 mt-2">
          
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-900 text-xs font-black border border-indigo-200">
                Ερώτηση {currentIndex + 1} / {currentQuestions.length}
              </span>
              {currentQ.rootIcon && (
                <span className="text-xl sm:text-2xl animate-bounce-soft">{currentQ.rootIcon}</span>
              )}
            </div>

            <button
              onClick={handleVoiceRead}
              title={isSpeaking ? "Διακοπή ανάγνωσης" : "Άκουσε την ερώτηση στα Ελληνικά"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                isSpeaking 
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 border-slate-200'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-rose-600' : 'text-indigo-600'}`} />
              <span className="hidden sm:inline">{isSpeaking ? 'Διακοπή' : 'Άκουσε το 🔊'}</span>
            </button>
          </div>

          {currentQ.ancientRoot && (
            <div className="mb-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/40 text-amber-950 font-black text-xl flex items-center justify-center shrink-0 border border-amber-300 shadow-2xs">
                  🏛️
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                    Αρχαία Ελληνική Ρίζα
                  </div>
                  <div className="text-base sm:text-xl font-black text-amber-950 flex items-center gap-2">
                    <span className="text-indigo-900 font-serif">«{currentQ.ancientRoot}»</span>
                    <span className="text-xs sm:text-sm font-semibold text-amber-800 font-sans">
                      (σημαίνει: {currentQ.rootMeaning})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-base sm:text-xl font-black text-slate-900 leading-snug mb-5">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.answer;

              let style = 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200 text-slate-800 hover:border-indigo-300';
              if (isSelected) {
                if (isCorrect) {
                  style = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-md scale-101 ring-2 ring-emerald-300';
                } else {
                  style = 'bg-rose-100 text-rose-900 border-rose-400 font-bold';
                }
              } else if (isSolved && isCorrect) {
                style = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isSolved}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left font-extrabold text-xs sm:text-base flex items-center justify-between gap-2 transition-all active:scale-98 ${style}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-black/5 flex items-center justify-center text-xs font-black shrink-0">
                      {['Α', 'Β', 'Γ', 'Δ'][i]}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isSelected && (
                    <span className="shrink-0">
                      {isCorrect ? <CheckCircle2 className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-rose-600" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isSolved && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 animate-slide-up mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                  🦉
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-xs font-black text-emerald-900 uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Μπράβο! Το Μυστικό του Σοφούλη:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-emerald-950 mt-1">
                    {currentQ.funFact}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs font-bold text-slate-500">
              {streak > 0 && <span>🔥 Συνέχισε έτσι! Σερί: <strong>{streak}</strong> σωστές!</span>}
            </div>

            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>{isSolved ? 'Επόμενη Πρόκληση' : 'Παράλειψη / Επόμενη'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
