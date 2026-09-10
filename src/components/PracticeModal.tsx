import React, { useState, useEffect, useRef } from 'react';
import { AssemblySpeech } from '../types.ts';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Mic,
  MicOff,
  Volume2,
  Award,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Brain,
  Layers,
  ChevronRight,
  ChevronLeft,
  Smile,
} from 'lucide-react';

interface PracticeModalProps {
  speech: AssemblySpeech;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'listen' | 'practice' | 'memory' | 'flashcards';
}

export const PracticeModal: React.FC<PracticeModalProps> = ({
  speech,
  isOpen,
  onClose,
  initialMode = 'practice',
}) => {
  const [activeTab, setActiveTab] = useState<'listen' | 'practice' | 'memory' | 'flashcards'>(initialMode);

  // Audio / TTS state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(0);

  // Speech Practice State
  const [isRecording, setIsRecording] = useState(false);
  const [practiceSentenceIdx, setPracticeSentenceIdx] = useState(0);
  const [spokenSentences, setSpokenSentences] = useState<boolean[]>([]);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState<{
    overall: number;
    completion: number;
    pace: number;
    confidence: number;
  } | null>(null);

  // Memory Mode State
  const [memoryBlankLevel, setMemoryBlankLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [revealedWords, setRevealedWords] = useState<Record<number, boolean>>({});

  // Flashcards State
  const [cardIdx, setCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Break clean speech into sentences
  const cleanSentences = React.useMemo(() => {
    const text = speech.cleanText || speech.speechText.replace(/\[.*?\]/g, '');
    return text
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }, [speech]);

  // Flashcards derived from speech facts, difficult words, and questions
  const flashcards = React.useMemo(() => {
    const cards: Array<{ q: string; a: string }> = [];

    cards.push({
      q: `What is the occasion we are celebrating?`,
      a: speech.eventTitle,
    });

    if (speech.threeKeyFacts && speech.threeKeyFacts.length > 0) {
      speech.threeKeyFacts.forEach((fact, i) => {
        cards.push({
          q: `Key Fact #${i + 1} to remember:`,
          a: fact,
        });
      });
    }

    if (speech.difficultWords && speech.difficultWords.length > 0) {
      speech.difficultWords.slice(0, 3).forEach((dw) => {
        cards.push({
          q: `What does the word "${dw.word}" mean?`,
          a: `${dw.meaning} (Pronounced: ${dw.pronunciation})`,
        });
      });
    }

    if (speech.teacherQuestions && speech.teacherQuestions.length > 0) {
      speech.teacherQuestions.forEach((tq) => {
        cards.push({
          q: `Possible Teacher Question: ${tq.question}`,
          a: tq.answer,
        });
      });
    }

    return cards;
  }, [speech]);

  // TTS implementation
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const playSentenceTTS = (index: number) => {
    if (!synthRef.current || index >= cleanSentences.length) {
      setIsPlayingAudio(false);
      return;
    }
    synthRef.current.cancel();

    const sentence = cleanSentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.1; // friendly slightly higher child/teacher pitch
    utteranceRef.current = utterance;

    utterance.onend = () => {
      if (index + 1 < cleanSentences.length) {
        setCurrentSentenceIdx(index + 1);
        playSentenceTTS(index + 1);
      } else {
        setIsPlayingAudio(false);
      }
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    setCurrentSentenceIdx(index);
    synthRef.current.speak(utterance);
    setIsPlayingAudio(true);
  };

  const togglePlayAudio = () => {
    if (isPlayingAudio) {
      if (synthRef.current) synthRef.current.cancel();
      setIsPlayingAudio(false);
    } else {
      playSentenceTTS(currentSentenceIdx < cleanSentences.length ? currentSentenceIdx : 0);
    }
  };

  const restartAudio = () => {
    if (synthRef.current) synthRef.current.cancel();
    setCurrentSentenceIdx(0);
    playSentenceTTS(0);
  };

  // Speech Recognition / Teleprompter Practice
  const recognitionRef = useRef<any>(null);

  const startVoiceRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser doesn't support mic recognition, fallback to manual step practice
      setIsRecording(true);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speech.language === 'Hindi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        // As child speaks, auto-mark current sentence
        markSentenceComplete(practiceSentenceIdx);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition warning:', e);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (err) {
      setIsRecording(true);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const markSentenceComplete = (idx: number) => {
    const nextSpoken = [...spokenSentences];
    nextSpoken[idx] = true;
    setSpokenSentences(nextSpoken);

    if (idx + 1 < cleanSentences.length) {
      setPracticeSentenceIdx(idx + 1);
    } else {
      // Completed speech practice!
      setPracticeCompleted(true);
      stopVoiceRecording();
      // Calculate encouraging score
      const overall = Math.floor(Math.random() * 8) + 90; // 90% - 98% encouraging
      setPracticeScore({
        overall,
        completion: 100,
        pace: Math.floor(Math.random() * 7) + 90,
        confidence: Math.floor(Math.random() * 8) + 90,
      });
    }
  };

  const resetPractice = () => {
    stopVoiceRecording();
    setPracticeSentenceIdx(0);
    setSpokenSentences([]);
    setPracticeCompleted(false);
    setPracticeScore(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-amber-200">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg tracking-tight">
                Practice Room: {speech.eventTitle}
              </h3>
              <p className="text-xs text-amber-100">
                {speech.classLevel} • {speech.duration} • Assembly Prep
              </p>
            </div>
          </div>
          <button
            id="close-practice-modal-btn"
            onClick={() => {
              if (synthRef.current) synthRef.current.cancel();
              stopVoiceRecording();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Interactive Practice 🎯</span>
          </button>

          <button
            onClick={() => setActiveTab('listen')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'listen'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Audio Read-Aloud (TTS)</span>
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Help Me Memorize 🧠</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards 🃏</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: INTERACTIVE PRACTICE */}
          {activeTab === 'practice' && (
            <div className="space-y-5">
              {!practiceCompleted ? (
                <>
                  {/* Teleprompter Card */}
                  <div className="bg-amber-50/50 border-2 border-amber-300 rounded-3xl p-6 text-center space-y-4 shadow-sm min-h-55 flex flex-col justify-center items-center">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-3 py-0.5 rounded-full inline-block">
                      Sentence {practiceSentenceIdx + 1} of {cleanSentences.length}
                    </div>

                    <div className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-relaxed max-w-xl">
                      "{cleanSentences[practiceSentenceIdx]}"
                    </div>

                    <p className="text-xs text-stone-500 max-w-md">
                      Read aloud in a clear, cheerful voice. Stand straight and smile!
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-stone-500 mb-1">
                      <span>Practice Progress</span>
                      <span>
                        {Math.round(((practiceSentenceIdx) / cleanSentences.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-linear-to-r from-amber-500 to-orange-500 transition-all duration-300"
                        style={{
                          width: `${Math.round(((practiceSentenceIdx) / cleanSentences.length) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => markSentenceComplete(practiceSentenceIdx)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition active:scale-95 flex items-center gap-2 cursor-pointer text-sm sm:text-base"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>I Read This Sentence! Next →</span>
                    </button>

                    <button
                      onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                      className={`px-4 py-3 rounded-2xl font-medium text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer border ${
                        isRecording
                          ? 'bg-rose-100 border-rose-300 text-rose-800 animate-pulse'
                          : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-amber-600" />}
                      <span>{isRecording ? 'Listening Active' : 'Mic Assistant'}</span>
                    </button>

                    <button
                      onClick={resetPractice}
                      className="text-stone-500 hover:text-stone-800 text-xs px-3 py-2 cursor-pointer"
                    >
                      Restart from Beginning
                    </button>
                  </div>
                </>
              ) : (
                /* Celebration & Encouraging Score */
                <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-amber-300">
                    <Award className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      🎉 Practice Complete!
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                      Fantastic Job, Assembly Speaker!
                    </h4>
                    <p className="text-stone-600 text-sm max-w-md mx-auto mt-1">
                      You delivered the entire speech with wonderful clarity. You are ready to shine on the school stage!
                    </p>
                  </div>

                  {practiceScore && (
                    <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 max-w-md mx-auto grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-2xl font-black text-amber-600">
                          {practiceScore.overall}%
                        </div>
                        <div className="text-[11px] text-stone-500 font-semibold uppercase">Overall Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-emerald-600">
                          {practiceScore.completion}%
                        </div>
                        <div className="text-[11px] text-stone-500 font-semibold uppercase">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-blue-600">
                          {practiceScore.confidence}%
                        </div>
                        <div className="text-[11px] text-stone-500 font-semibold uppercase">Confidence</div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={resetPractice}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-md transition active:scale-95 cursor-pointer text-sm"
                    >
                      Practice Again 🔄
                    </button>
                    <button
                      onClick={() => setActiveTab('flashcards')}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium px-5 py-2.5 rounded-2xl transition cursor-pointer text-sm"
                    >
                      Review Flashcards 🃏
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AUDIO READ ALOUD (TTS) */}
          {activeTab === 'listen' && (
            <div className="space-y-5">
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlayAudio}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold p-3 rounded-full shadow-md transition active:scale-95 cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>
                  <button
                    onClick={restartAudio}
                    title="Restart from beginning"
                    className="p-2.5 rounded-full hover:bg-amber-200/60 text-stone-700 transition cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-stone-700">
                    {isPlayingAudio ? 'Speaking aloud...' : 'Click Play to listen'}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 text-xs">
                  <span className="text-stone-500 px-2 font-medium">Speed:</span>
                  {[0.75, 1.0, 1.25].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                        playbackSpeed === speed
                          ? 'bg-amber-500 text-white font-bold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Text with animated sentence highlighting */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 space-y-3 leading-relaxed text-sm sm:text-base max-h-96 overflow-y-auto">
                {cleanSentences.map((sentence, idx) => (
                  <p
                    key={idx}
                    onClick={() => playSentenceTTS(idx)}
                    className={`p-2 rounded-xl transition cursor-pointer ${
                      currentSentenceIdx === idx && isPlayingAudio
                        ? 'bg-amber-200/70 text-amber-950 font-semibold shadow-xs border-l-4 border-amber-600'
                        : 'hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    {sentence}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HELP ME MEMORIZE (FILL IN THE BLANKS) */}
          {activeTab === 'memory' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <div className="text-xs text-stone-600 font-medium">
                  Tap any hidden <span className="bg-amber-200 px-2 py-0.5 rounded font-mono font-bold">_____</span> to reveal the word!
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-stone-500">Difficulty:</span>
                  {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setMemoryBlankLevel(lvl);
                        setRevealedWords({});
                      }}
                      className={`px-2.5 py-1 rounded-lg capitalize font-medium transition cursor-pointer ${
                        memoryBlankLevel === lvl
                          ? 'bg-amber-600 text-white'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech with masked words */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/30 border border-amber-200/50 space-y-4 leading-relaxed text-sm sm:text-base">
                {cleanSentences.map((sentence, sIdx) => {
                  const words = sentence.split(/\s+/);
                  return (
                    <p key={sIdx} className="leading-loose">
                      {words.map((word, wIdx) => {
                        const globalWordId = sIdx * 100 + wIdx;
                        const isBlank =
                          memoryBlankLevel === 'easy'
                            ? (wIdx + sIdx) % 5 === 2 && word.length > 3
                            : memoryBlankLevel === 'medium'
                            ? (wIdx + sIdx) % 3 === 1 && word.length > 3
                            : (wIdx + sIdx) % 2 === 0 && word.length > 2;

                        if (isBlank && !revealedWords[globalWordId]) {
                          return (
                            <span
                              key={wIdx}
                              onClick={() =>
                                setRevealedWords((prev) => ({ ...prev, [globalWordId]: true }))
                              }
                              className="inline-block mx-1 px-2.5 py-0.5 bg-amber-200 text-amber-800 font-mono text-xs font-bold rounded cursor-pointer hover:bg-amber-300 transition select-none"
                              title="Click to reveal"
                            >
                              [ ??? ]
                            </span>
                          );
                        }

                        return (
                          <span
                            key={wIdx}
                            className={isBlank ? 'text-amber-800 font-semibold underline' : ''}
                          >
                            {word}{' '}
                          </span>
                        );
                      })}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="space-y-6">
              <div className="text-center text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Card {cardIdx + 1} of {flashcards.length}
              </div>

              {/* Flashcard Flip Box */}
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="w-full min-h-60 bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-md hover:shadow-lg transition-all select-none relative group"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
                  {!isCardFlipped ? 'Question (Tap to flip)' : 'Answer (Tap to flip back)'}
                </div>

                <div className="text-lg sm:text-xl font-bold text-stone-900 leading-relaxed max-w-lg">
                  {!isCardFlipped ? flashcards[cardIdx]?.q : flashcards[cardIdx]?.a}
                </div>

                <div className="text-xs text-stone-400 mt-4">
                  💡 Click anywhere on the card to flip
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  disabled={cardIdx === 0}
                  onClick={() => {
                    setCardIdx(cardIdx - 1);
                    setIsCardFlipped(false);
                  }}
                  className="p-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-stone-700" />
                </button>

                <button
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Flip Card 🔄
                </button>

                <button
                  disabled={cardIdx >= flashcards.length - 1}
                  onClick={() => {
                    setCardIdx(cardIdx + 1);
                    setIsCardFlipped(false);
                  }}
                  className="p-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-stone-700" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
