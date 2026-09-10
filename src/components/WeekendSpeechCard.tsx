import React from 'react';
import { IndianEvent, SyncedTimeData } from '../types.ts';
import { Sparkles, Calendar, ArrowRight, Dices, Award, CheckCircle, Info } from 'lucide-react';

interface WeekendSpeechCardProps {
  recommendedEvent: IndianEvent | null;
  alternativeEvents: IndianEvent[];
  syncedTime: SyncedTimeData | null;
  onSelectEvent: (event: IndianEvent) => void;
  onSurpriseMe: () => void;
  isGenerating: boolean;
  selectedEventId?: string;
}

export const WeekendSpeechCard: React.FC<WeekendSpeechCardProps> = ({
  recommendedEvent,
  alternativeEvents,
  syncedTime,
  onSelectEvent,
  onSurpriseMe,
  isGenerating,
  selectedEventId,
}) => {
  if (!recommendedEvent) return null;

  const isSelected = selectedEventId === recommendedEvent.id;

  return (
    <div className="bg-linear-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-orange-500/15 relative overflow-hidden border border-amber-300/30">
      {/* Background soft pattern */}
      <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-6 top-6 text-7xl opacity-20 select-none pointer-events-none">
        {recommendedEvent.categoryIcon}
      </div>

      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 border border-white/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            This Weekend's Speech Recommendation
          </span>
          <span className="bg-amber-900/40 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-100">
            {recommendedEvent.category}
          </span>
        </div>

        {syncedTime?.nextWeekendAssembly && (
          <div className="text-xs font-medium text-amber-100 flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-amber-200" />
            <span>Assembly: {syncedTime.nextWeekendAssembly.displayDate}</span>
          </div>
        )}
      </div>

      {/* Main Title & Description */}
      <div className="max-w-2xl relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-xs mb-1">
          {recommendedEvent.title}
        </h2>
        {recommendedEvent.hindiTitle && (
          <p className="text-sm font-medium text-amber-100 mb-2">
            {recommendedEvent.hindiTitle}
          </p>
        )}

        <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-4">
          {recommendedEvent.description}
        </p>

        {/* Why this topic was selected */}
        <div className="bg-black/20 backdrop-blur-xs rounded-2xl p-3.5 border border-white/20 mb-5 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-50">
            <span className="font-bold text-white block mb-0.5">Why we picked this for school assembly:</span>
            {recommendedEvent.importance ||
              `${recommendedEvent.title} is observed close to this weekend in India, providing a rich educational opportunity for students.`}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="generate-weekend-speech-btn"
            onClick={() => onSelectEvent(recommendedEvent)}
            disabled={isGenerating}
            className="bg-white text-orange-900 hover:bg-amber-50 font-bold px-5 py-2.5 rounded-2xl shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isGenerating && isSelected ? (
              <>
                <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                <span>Writing Speech...</span>
              </>
            ) : (
              <>
                <span>Use This Topic & Generate Speech</span>
                <ArrowRight className="w-4 h-4 text-orange-600" />
              </>
            )}
          </button>

          <button
            id="surprise-me-topic-btn"
            onClick={onSurpriseMe}
            disabled={isGenerating}
            className="bg-white/15 hover:bg-white/25 text-white font-medium px-4 py-2.5 rounded-2xl border border-white/25 transition active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Dices className="w-4 h-4 text-amber-200" />
            <span>Surprise Me 🎲</span>
          </button>
        </div>
      </div>

      {/* Alternative Topics Bar */}
      {alternativeEvents.length > 0 && (
        <div className="mt-6 pt-5 border-t border-white/20 relative z-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-200 mb-2 flex items-center gap-1.5">
            <span>Other Good Topics for Coming Days:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {alternativeEvents.map((alt) => (
              <button
                key={alt.id}
                id={`alt-topic-${alt.id}`}
                onClick={() => onSelectEvent(alt)}
                className="bg-white/10 hover:bg-white/20 border border-white/15 p-2.5 rounded-xl text-left transition flex items-center justify-between group cursor-pointer"
              >
                <div className="truncate mr-2">
                  <div className="text-xs font-bold text-white group-hover:text-amber-100 truncate">
                    {alt.categoryIcon} {alt.title}
                  </div>
                  <div className="text-[11px] text-amber-200/80">
                    {alt.dayAndMonth} • {alt.category}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
