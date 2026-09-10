import React, { useState, useMemo } from 'react';
import { IndianEvent, EventCategory } from '../types.ts';
import { Search, Calendar as CalendarIcon, ArrowRight, Filter, Sparkles } from 'lucide-react';

interface UpcomingCalendarProps {
  events: IndianEvent[];
  onSelectEvent: (event: IndianEvent) => void;
  isGenerating: boolean;
  selectedEventId?: string;
}

export const UpcomingCalendar: React.FC<UpcomingCalendarProps> = ({
  events,
  onSelectEvent,
  isGenerating,
  selectedEventId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ label: string; value: string; icon: string }> = [
    { label: 'All Events', value: 'All', icon: '✨' },
    { label: 'National', value: 'National', icon: '🇮🇳' },
    { label: 'Festivals', value: 'Festival', icon: '🪔' },
    { label: 'Science & Space', value: 'Science', icon: '🔬' },
    { label: 'Education', value: 'Education', icon: '📚' },
    { label: 'Personalities', value: 'Personality', icon: '👤' },
    { label: 'Environment', value: 'Environment', icon: '🌱' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.hindiTitle && ev.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Science'
          ? ev.category === 'Science' || ev.category === 'Space'
          : ev.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Calendar Header & Search */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-amber-600" />
              <span>Indian School Assembly Event Calendar</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Explore national days, lunar festivals, scientific milestones, and inspiring personalities.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              id="calendar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Diwali, Gandhi, Space..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.value
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((item) => {
          const isSelected = selectedEventId === item.id;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                isSelected ? 'border-amber-500 ring-2 ring-amber-200' : 'border-stone-200 hover:border-amber-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.dayAndMonth}
                  </span>
                  <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                    <span>{item.categoryIcon}</span>
                    <span>{item.category}</span>
                  </span>
                </div>

                <h4 className="font-bold text-stone-900 text-base mb-1 leading-snug">
                  {item.title}
                </h4>

                {item.hindiTitle && (
                  <p className="text-xs font-medium text-amber-800 mb-2">
                    {item.hindiTitle}
                  </p>
                )}

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 truncate mr-2">
                  {item.sourceName.split(',')[0]}
                </span>

                <button
                  id={`select-event-${item.id}`}
                  onClick={() => onSelectEvent(item)}
                  disabled={isGenerating}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Generate</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
          <p className="text-stone-500 text-sm">No events found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 text-xs font-bold text-amber-700 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
