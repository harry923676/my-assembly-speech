import React, { useState, useMemo } from 'react';
import { IndianEvent } from '../types.ts';
import { Search, Calendar as CalendarIcon, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

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
    return events
      .filter((ev) => {
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
      })
      .sort((a, b) => new Date(a.dateStr + 'T00:00:00Z').getTime() - new Date(b.dateStr + 'T00:00:00Z').getTime());
  }, [events, searchQuery, selectedCategory]);

  const monthGroups = useMemo(() => {
    const groups = new Map<number, { month: string; items: IndianEvent[] }>();

    filteredEvents.forEach((event) => {
      const eventDate = new Date(event.dateStr + 'T00:00:00Z');
      const monthIndex = eventDate.getUTCMonth();
      const monthName = eventDate.toLocaleString('en-US', {
        month: 'long',
        timeZone: 'UTC',
      });

      if (!groups.has(monthIndex)) {
        groups.set(monthIndex, { month: monthName, items: [] });
      }

      groups.get(monthIndex)!.items.push(event);
    });

    return Array.from(groups.entries())
      .map(([monthIndex, group]) => ({ monthIndex, month: group.month, items: group.items }))
      .sort((a, b) => a.monthIndex - b.monthIndex);
  }, [filteredEvents]);

  return (
    <div className="space-y-6">
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

      {monthGroups.length === 0 && (
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

      <div className="space-y-5">
        {monthGroups.map(({ month, items }) => (
          <div key={month} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-200 bg-amber-50/70 flex items-center justify-between">
              <h4 className="text-base font-bold text-stone-900">{month}</h4>
              <span className="text-xs font-semibold text-amber-800 bg-white px-2 py-1 rounded-full border border-amber-200">
                {items.length} event{items.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="p-4 space-y-3">
              {items.map((item) => {
                const isSelected = selectedEventId === item.id;
                const isExpanded = expandedEventId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-3 transition-all ${
                      isSelected ? 'border-amber-400 bg-amber-50/60' : 'border-stone-200 bg-stone-50/60'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedEventId(isExpanded ? null : item.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="bg-white border border-stone-200 text-[11px] font-bold px-2 py-0.5 rounded-full text-stone-700">
                              {item.dayAndMonth}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {item.categoryIcon} {item.category}
                            </span>
                          </div>
                          <h5 className="font-bold text-stone-900 text-sm sm:text-base truncate pr-2">{item.title}</h5>
                          {item.hindiTitle && (
                            <p className="text-[11px] text-amber-800 font-medium mt-0.5">{item.hindiTitle}</p>
                          )}
                        </div>

                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-stone-200 shrink-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-700" /> : <ChevronDown className="w-4 h-4 text-stone-700" />}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-3 border-t border-stone-200 pt-3 space-y-3">
                        <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>

                        <div className="bg-white rounded-xl border border-amber-200 p-2.5 text-[11px] text-stone-700">
                          <span className="font-semibold text-amber-800 block mb-1">Why this talk matters:</span>
                          {item.importance}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                          <span className="text-[11px] text-stone-500 truncate">Source: {item.sourceName.split(',')[0]}</span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedEventId(null)}
                              className="px-3 py-1.5 text-xs font-medium text-stone-600 bg-stone-200 hover:bg-stone-300 rounded-xl cursor-pointer"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setExpandedEventId(item.id);
                                onSelectEvent(item);
                              }}
                              disabled={isGenerating}
                              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-50"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Generate Speech</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
