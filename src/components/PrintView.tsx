import React from 'react';
import { AssemblySpeech } from '../types.ts';
import { Printer, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

interface PrintViewProps {
  speech: AssemblySpeech;
  onClose: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ speech, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-100 p-4 sm:p-8">
      {/* Top Action Bar (hidden on print) */}
      <div className="max-w-2xl mx-auto mb-4 flex items-center justify-between print:hidden">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>

        <button
          onClick={() => window.print()}
          className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-stone-200 text-stone-900 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="border-b-2 border-stone-800 pb-4 mb-6 text-center">
          <div className="text-xs uppercase font-extrabold tracking-widest text-amber-700 mb-1">
            🇮🇳 School Morning Assembly Speech Card
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
            {speech.title}
          </h1>
          <div className="flex justify-center items-center gap-3 mt-2 text-xs font-semibold text-stone-600">
            <span>Class: {speech.classLevel}</span>
            <span>•</span>
            <span>Target Duration: {speech.duration}</span>
            <span>•</span>
            <span>Language: {speech.language}</span>
          </div>
        </div>

        {/* Speech Text */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 border-b border-stone-200 pb-1">
            Speech
          </div>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-stone-800 font-serif">
            {speech.cleanText.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* 3 Things to Remember */}
        {speech.threeKeyFacts && speech.threeKeyFacts.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
              💡 3 Things to Remember:
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-stone-800 font-medium">
              {speech.threeKeyFacts.map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Difficult Words Pronunciation */}
        {speech.difficultWords && speech.difficultWords.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              🗣️ Word Pronunciation Guide:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {speech.difficultWords.map((dw, idx) => (
                <div key={idx}>
                  <span className="font-bold text-stone-900">{dw.word}</span>:{' '}
                  <span className="font-mono text-amber-800 font-medium">"{dw.pronunciation}"</span> — {dw.meaning}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Stamp on Print */}
        <div className="pt-4 border-t-2 border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <div className="font-bold text-stone-800">
            Good Luck! Stand straight, smile, and speak with confidence! 🌟
          </div>
          <div className="flex items-center gap-1 font-medium text-stone-700">
            <span>Developer Stamp:</span>
            <span className="font-bold text-amber-800">Pawan Paji</span>
          </div>
        </div>
      </div>
    </div>
  );
};
