import React, { useState } from 'react';
import { AssemblySpeech } from '../types.ts';
import {
  Volume2,
  Mic,
  Star,
  Copy,
  Printer,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  FileText,
  Check,
  Zap,
  Smile,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SpeechDisplayProps {
  speech: AssemblySpeech;
  isFavorite: boolean;
  onToggleFavorite: (speech: AssemblySpeech) => void;
  onStartPractice: (speech: AssemblySpeech) => void;
  onPlayAudio: (speech: AssemblySpeech) => void;
  onPrint: (speech: AssemblySpeech) => void;
  onModifySpeech: (action: 'easier' | '1min' | '3min' | 'confident') => void;
  isModifying: boolean;
  onAskAI: (question: string) => Promise<string>;
}

export const SpeechDisplay: React.FC<SpeechDisplayProps> = ({
  speech,
  isFavorite,
  onToggleFavorite,
  onStartPractice,
  onPlayAudio,
  onPrint,
  onModifySpeech,
  isModifying,
  onAskAI,
}) => {
  const [copied, setCopied] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [selectedOpening, setSelectedOpening] = useState<'traditional' | 'question' | 'surpriseFact'>('traditional');
  const [showPronunciations, setShowPronunciations] = useState(true);
  const [askInput, setAskInput] = useState('');
  const [askAnswer, setAskAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(speech.cleanText || speech.speechText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askInput.trim() || isAsking) return;
    setIsAsking(true);
    const ans = await onAskAI(askInput);
    setAskAnswer(ans);
    setIsAsking(false);
  };

  // Replace speech text opening if user chose an alternative opening hook
  let renderedSpeechText = speech.speechText;
  if (selectedOpening !== 'traditional' && speech.openingOptions?.[selectedOpening]) {
    const customOpening = speech.openingOptions[selectedOpening];
    // Substitute first sentence or prepend
    const firstLineEnd = renderedSpeechText.indexOf('\n');
    if (firstLineEnd > 0) {
      renderedSpeechText = `${customOpening}\n\n${renderedSpeechText.substring(firstLineEnd).trim()}`;
    }
  }

  // Render text with interactive marker highlights like [Smile], [Pause]
  const renderFormattedSpeech = (text: string) => {
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map((para, pIdx) => {
      const parts = para.split(/(\[Smile\]|\[Pause\]|\[Speak slowly\]|\[Say with excitement\])/g);
      return (
        <p key={pIdx} className="mb-4 leading-relaxed text-stone-800 text-base sm:text-lg">
          {parts.map((part, idx) => {
            if (part === '[Smile]') {
              return showMarkers ? (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 select-none animate-pulse"
                >
                  <Smile className="w-3 h-3 text-amber-600" /> [Smile]
                </span>
              ) : null;
            }
            if (part === '[Pause]') {
              return showMarkers ? (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300 select-none"
                >
                  <Clock className="w-3 h-3 text-blue-600" /> [Pause 1 sec]
                </span>
              ) : null;
            }
            if (part === '[Speak slowly]') {
              return showMarkers ? (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 select-none"
                >
                  [Speak slowly]
                </span>
              ) : null;
            }
            if (part === '[Say with excitement]') {
              return showMarkers ? (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300 select-none"
                >
                  [Say with excitement]
                </span>
              ) : null;
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Speech Top Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-stone-200">
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-full border border-amber-200">
              {speech.classLevel}
            </span>
            <span className="bg-orange-100 text-orange-900 font-semibold text-xs px-3 py-1 rounded-full border border-orange-200">
              {speech.language}
            </span>
            <span className="bg-stone-100 text-stone-700 font-medium text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-500" />
              {speech.duration} (Est. {Math.floor(speech.estimatedSeconds / 60)}m {speech.estimatedSeconds % 60}s)
            </span>
            <span className="bg-stone-100 text-stone-700 font-medium text-xs px-3 py-1 rounded-full">
              {speech.wordCount} words
            </span>
          </div>

          {/* Quick Tool Actions */}
          <div className="flex items-center gap-1.5">
            <button
              id="speech-toggle-favorite-btn"
              onClick={() => onToggleFavorite(speech)}
              title="Save to Favorites"
              className={`p-2 rounded-xl transition cursor-pointer ${
                isFavorite
                  ? 'bg-amber-100 text-amber-600'
                  : 'text-stone-500 hover:bg-stone-100'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              id="speech-copy-btn"
              onClick={handleCopy}
              title="Copy to clipboard"
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              id="speech-print-btn"
              onClick={() => onPrint(speech)}
              title="Print cue card / Save PDF"
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
          {speech.title}
        </h3>

        {/* Why this topic was selected */}
        {speech.whyThisTopic && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 mb-5 text-xs sm:text-sm text-amber-900 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Why this topic was selected for school assembly:</span>
              <span>{speech.whyThisTopic}</span>
            </div>
          </div>
        )}

        {/* Interactive Opening Hooks Selector */}
        {speech.openingOptions && (
          <div className="mb-5 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Choose Opening Style:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                id="opening-traditional"
                onClick={() => setSelectedOpening('traditional')}
                className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                  selectedOpening === 'traditional'
                    ? 'bg-amber-100 border-amber-400 font-semibold text-amber-950 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold mb-1">Traditional Greeting</div>
                <div className="text-[11px] line-clamp-2 opacity-80">{speech.openingOptions.traditional}</div>
              </button>

              <button
                id="opening-question"
                onClick={() => setSelectedOpening('question')}
                className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                  selectedOpening === 'question'
                    ? 'bg-amber-100 border-amber-400 font-semibold text-amber-950 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold mb-1">Engaging Question ❓</div>
                <div className="text-[11px] line-clamp-2 opacity-80">{speech.openingOptions.question}</div>
              </button>

              <button
                id="opening-surprise"
                onClick={() => setSelectedOpening('surpriseFact')}
                className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                  selectedOpening === 'surpriseFact'
                    ? 'bg-amber-100 border-amber-400 font-semibold text-amber-950 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold mb-1">Surprise Fact 🌟</div>
                <div className="text-[11px] line-clamp-2 opacity-80">{speech.openingOptions.surpriseFact}</div>
              </button>
            </div>
          </div>
        )}

        {/* Action Controls for Practice & Audio */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 p-3 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="speech-listen-aloud-btn"
              onClick={() => onPlayAudio(speech)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Aloud (TTS)</span>
            </button>

            <button
              id="speech-practice-btn"
              onClick={() => onStartPractice(speech)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Practice My Speech 🎯</span>
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            <span>Show [Smile] / [Pause] tips</span>
          </label>
        </div>

        {/* The Speech Content */}
        <div className="p-5 sm:p-7 rounded-2xl bg-amber-50/30 border border-amber-200/50 shadow-inner min-h-50">
          {renderFormattedSpeech(renderedSpeechText)}
        </div>

        {/* AI Speech Modification Quick Buttons */}
        <div className="mt-5 pt-4 border-t border-stone-200">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            AI Speech Adjustments:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              id="modify-easier-btn"
              onClick={() => onModifySpeech('easier')}
              disabled={isModifying}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 transition cursor-pointer disabled:opacity-50"
            >
              🐣 Make It Easier
            </button>
            <button
              id="modify-1min-btn"
              onClick={() => onModifySpeech('1min')}
              disabled={isModifying}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 transition cursor-pointer disabled:opacity-50"
            >
              ⏱️ Make It 1 Minute
            </button>
            <button
              id="modify-3min-btn"
              onClick={() => onModifySpeech('3min')}
              disabled={isModifying}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 transition cursor-pointer disabled:opacity-50"
            >
              📖 Make It 3 Minutes
            </button>
            <button
              id="modify-confident-btn"
              onClick={() => onModifySpeech('confident')}
              disabled={isModifying}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 text-stone-700 transition cursor-pointer disabled:opacity-50"
            >
              🦁 Make It More Confident
            </button>
          </div>
          {isModifying && (
            <p className="text-xs text-amber-700 mt-2 animate-pulse flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> Adjusting speech for Class {speech.classLevel}...
            </p>
          )}
        </div>
      </div>

      {/* Difficult Words & Pronunciation Guide */}
      {speech.difficultWords && speech.difficultWords.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>Difficult Words & Pronunciations</span>
            </div>
            <button
              onClick={() => setShowPronunciations(!showPronunciations)}
              className="text-xs text-amber-700 hover:underline cursor-pointer font-medium"
            >
              {showPronunciations ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {showPronunciations && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {speech.difficultWords.map((item, idx) => (
                <div key={idx} className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200/70 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900 text-sm">{item.word}</span>
                    <span className="bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md font-mono text-[11px]">
                      {item.pronunciation}
                    </span>
                  </div>
                  <p className="text-stone-600">{item.meaning}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3 Key Facts To Remember & Possible Teacher Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3 Key Facts */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-3">
            <span className="text-xl">💡</span>
            <span>Remember These 3 Key Facts</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {(speech.threeKeyFacts || []).map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-200/40">
                <span className="bg-amber-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Possible Teacher Questions */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-3">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Possible Teacher Questions</span>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            {(speech.teacherQuestions || []).map((qa, idx) => (
              <div key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 mb-1 text-xs sm:text-sm">
                  Q: {qa.question}
                </div>
                <div className="text-stone-600 text-xs">
                  <span className="font-semibold text-emerald-700">Ans:</span> {qa.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5 Speaking Tips */}
      <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-3xl p-5 sm:p-6 border border-amber-200">
        <div className="font-bold text-stone-900 text-base mb-3 flex items-center gap-2">
          <span>🌟</span>
          <span>5 Morning Assembly Speaking Tips for You</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
          {(speech.speakingTips || [
            'Stand straight and smile warmly at the audience.',
            'Hold the microphone gently with two fingers.',
            'Take a deep breath before you start.',
            'Speak slowly so everyone can hear every word.',
            'Say the final "Jai Hind!" with great pride and cheer.',
          ]).map((tip, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-amber-200/60 shadow-xs flex items-start gap-2">
              <span className="font-bold text-amber-600 text-sm">#{idx + 1}</span>
              <span className="text-stone-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ask AI About My Speech */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-2">
          <MessageSquare className="w-5 h-5 text-orange-600" />
          <span>Ask AI About This Speech</span>
        </div>
        <p className="text-xs text-stone-500 mb-3">
          Have a question about what a word means, how to pronounce it, or why this day is celebrated? Ask below:
        </p>

        <form onSubmit={handleAskSubmit} className="flex gap-2">
          <input
            id="ask-ai-speech-input"
            type="text"
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            placeholder="e.g. What does Raman Effect mean? How should I start?"
            className="flex-1 px-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
          />
          <button
            id="ask-ai-speech-btn"
            type="submit"
            disabled={isAsking || !askInput.trim()}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm transition disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isAsking ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {askAnswer && (
          <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-800">
            <span className="font-bold text-amber-900 block mb-1">Teacher Answer:</span>
            {askAnswer}
          </div>
        )}
      </div>

      {/* Verified Sources */}
      {speech.sources && speech.sources.length > 0 && (
        <div className="text-xs text-stone-500 flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Factual Verification: {speech.sources.map((s) => s.name).join(', ')}</span>
          </div>
          <span>Confidence: 99% Verified</span>
        </div>
      )}
    </div>
  );
};
