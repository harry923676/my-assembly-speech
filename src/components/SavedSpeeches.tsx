import React from 'react';
import { AssemblySpeech } from '../types.ts';
import { Star, Trash2, ArrowRight, BookOpen, Clock, Printer } from 'lucide-react';

interface SavedSpeechesProps {
  favorites: AssemblySpeech[];
  onSelectSpeech: (speech: AssemblySpeech) => void;
  onRemoveFavorite: (id: string) => void;
  onPrint: (speech: AssemblySpeech) => void;
}

export const SavedSpeeches: React.FC<SavedSpeechesProps> = ({
  favorites,
  onSelectSpeech,
  onRemoveFavorite,
  onPrint,
}) => {
  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 shadow-sm max-w-lg mx-auto space-y-3">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-200">
          <Star className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-stone-900">No Saved Speeches Yet</h4>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          Whenever you generate a speech you love, tap the star icon ⭐ to save it here for easy weekly practice!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Saved Speeches ({favorites.length})</span>
          </h3>
          <p className="text-xs text-stone-500">
            Review, practice, or print your favorite morning assembly speeches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs hover:border-amber-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="bg-amber-100 text-amber-900 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                  {item.classLevel}
                </span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </span>
              </div>

              <h4 className="font-bold text-stone-900 text-base mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-amber-800 font-medium mb-2">
                {item.eventTitle} ({item.eventDate})
              </p>

              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                {item.cleanText}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => onRemoveFavorite(item.id)}
                title="Remove from favorites"
                className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPrint(item)}
                  title="Print"
                  className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-lg transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectSpeech(item)}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Open & Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
