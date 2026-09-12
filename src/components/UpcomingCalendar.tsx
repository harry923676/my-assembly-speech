import React, { useState, useMemo } from 'react';
import { IndianEvent, ScoreBreakdown, ChildProfile, LanguageCode, SpeechDuration, ClassLevel } from '../types.ts';
import {
  Search,
  Calendar as CalendarIcon,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  MapPin,
  ExternalLink,
  BookOpen,
  Mic,
  Clock,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react';

interface UpcomingCalendarProps {
  events: IndianEvent[];
  onSelectEvent: (event: IndianEvent, customProfile?: Partial<ChildProfile>) => void;
  isGenerating: boolean;
  selectedEventId?: string;
  currentProfile?: ChildProfile;
}

const MONTH_DATA = [
  { num: 1, key: 'Jan', name: 'January', hindiSeason: 'पौष – माघ (Shishir / Winter)' },
  { num: 2, key: 'Feb', name: 'February', hindiSeason: 'माघ – फाल्गुन (Vasant / Early Spring)' },
  { num: 3, key: 'Mar', name: 'March', hindiSeason: 'फाल्गुन – चैत्र (Vasant / Spring)' },
  { num: 4, key: 'Apr', name: 'April', hindiSeason: 'चैत्र – वैशाख (Grishma / Summer)' },
  { num: 5, key: 'May', name: 'May', hindiSeason: 'वैशाख – ज्येष्ठ (Grishma / Peak Summer)' },
  { num: 6, key: 'Jun', name: 'June', hindiSeason: 'ज्येष्ठ – आषाढ़ (Varsha / Monsoon Arrival)' },
  { num: 7, key: 'Jul', name: 'July', hindiSeason: 'आषाढ़ – श्रावण (Varsha / Active Monsoon)' },
  { num: 8, key: 'Aug', name: 'August', hindiSeason: 'श्रावण – भाद्रपद (Varsha / Monsoon)' },
  { num: 9, key: 'Sep', name: 'September', hindiSeason: 'भाद्रपद – आश्विन (Sharad / Early Autumn)' },
  { num: 10, key: 'Oct', name: 'October', hindiSeason: 'आश्विन – कार्तिक (Sharad / Festive Autumn)' },
  { num: 11, key: 'Nov', name: 'November', hindiSeason: 'कार्तिक – मार्गशीर्ष (Hemant / Pre-Winter)' },
  { num: 12, key: 'Dec', name: 'December', hindiSeason: 'मार्गशीर्ष – पौष (Hemant / Winter)' },
];

export const UpcomingCalendar: React.FC<UpcomingCalendarProps> = ({
  events,
  onSelectEvent,
  isGenerating,
  selectedEventId,
  currentProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState<'All' | 1 | 2 | 3 | 4>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All'); // 'All' or 'Jan', 'Feb', ...
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(new Set());
  const [inspectedBreakdown, setInspectedBreakdown] = useState<{ event: IndianEvent; breakdown: ScoreBreakdown } | null>(null);

  // Per-card speech generation preferences state
  const [speechOptions, setSpeechOptions] = useState<Record<string, {
    language: LanguageCode;
    duration: SpeechDuration;
    classLevel: ClassLevel;
  }>>({});

  const quarters = [
    { label: 'All Quarters', value: 'All' as const },
    { label: 'Q1 (Jan–Mar)', value: 1 as const },
    { label: 'Q2 (Apr–Jun)', value: 2 as const },
    { label: 'Q3 (Jul–Sep)', value: 3 as const },
    { label: 'Q4 (Oct–Dec)', value: 4 as const },
  ];

  const categories = [
    { label: 'All Categories', value: 'All', icon: '✨' },
    { label: 'National Days', value: 'National Days', icon: '🇮🇳' },
    { label: 'Freedom Fighters', value: 'Freedom Fighters', icon: '⚔️' },
    { label: 'Scientists & Maths', value: 'Scientists', icon: '🔬' },
    { label: 'Festivals & Harvest', value: 'Festivals', icon: '🪔' },
    { label: 'Environment', value: 'Environment', icon: '🌱' },
    { label: 'Constitution & Law', value: 'Constitution & Democracy', icon: '⚖️' },
    { label: 'Poets & Writers', value: 'Poets', icon: '🪶' },
    { label: 'Children\'s Topics', value: 'Children\'s Topics', icon: '🎈' },
    { label: 'Defence', value: 'Defence', icon: '🎖️' },
    { label: 'Social Reformers', value: 'Social Reformers', icon: '📖' },
  ];

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand all or collapse all in current view
  const toggleExpandAll = (allIds: string[]) => {
    const allExpanded = allIds.every((id) => expandedEventIds.has(id));
    if (allExpanded) {
      setExpandedEventIds(new Set());
    } else {
      setExpandedEventIds(new Set(allIds));
    }
  };

  // Get option state for a card, defaulting to child profile
  const getCardSpeechOption = (eventId: string) => {
    return speechOptions[eventId] || {
      language: currentProfile?.preferredLanguage || 'English',
      duration: currentProfile?.speechDuration || '2 minutes',
      classLevel: currentProfile?.classLevel || 'Class 2',
    };
  };

  const updateCardSpeechOption = (
    eventId: string,
    updates: Partial<{ language: LanguageCode; duration: SpeechDuration; classLevel: ClassLevel }>
  ) => {
    setSpeechOptions((prev) => ({
      ...prev,
      [eventId]: {
        ...getCardSpeechOption(eventId),
        ...updates,
      },
    }));
  };

  // 1. Calculate count per month for the badge counts
  const monthCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MONTH_DATA.forEach((m) => {
      counts[m.key] = 0;
    });

    events.forEach((ev) => {
      const monthNum = parseInt(ev.dateStr.split('-')[1], 10);
      const mDef = MONTH_DATA.find((m) => m.num === monthNum);
      if (mDef) {
        counts[mDef.key] = (counts[mDef.key] || 0) + 1;
      }
    });
    return counts;
  }, [events]);

  // 2. Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesHindi = (ev.hindiTitle || ev.hindi_name || '').toLowerCase().includes(q);
        const matchesDesc = ev.description.toLowerCase().includes(q);
        const matchesThemes = ev.speech_themes?.some((t) => t.toLowerCase().includes(q)) ?? false;
        const matchesState = ev.state_region?.toLowerCase().includes(q) ?? false;
        const matchesSubcat = ev.subcategory?.toLowerCase().includes(q) ?? false;
        if (!matchesTitle && !matchesHindi && !matchesDesc && !matchesThemes && !matchesState && !matchesSubcat) {
          return false;
        }
      }

      // Quarter filter
      if (selectedQuarter !== 'All') {
        const day = ev.day_of_year;
        if (day) {
          if (selectedQuarter === 1 && (day < 1 || day > 90)) return false;
          if (selectedQuarter === 2 && (day < 91 || day > 181)) return false;
          if (selectedQuarter === 3 && (day < 182 || day > 273)) return false;
          if (selectedQuarter === 4 && (day < 274 || day > 366)) return false;
        } else {
          const monthNum = parseInt(ev.dateStr.split('-')[1], 10);
          if (selectedQuarter === 1 && (monthNum < 1 || monthNum > 3)) return false;
          if (selectedQuarter === 2 && (monthNum < 4 || monthNum > 6)) return false;
          if (selectedQuarter === 3 && (monthNum < 7 || monthNum > 9)) return false;
          if (selectedQuarter === 4 && (monthNum < 10 || monthNum > 12)) return false;
        }
      }

      // Month filter
      if (selectedMonth !== 'All') {
        const mDef = MONTH_DATA.find((m) => m.key === selectedMonth);
        if (mDef) {
          const evMonthNum = parseInt(ev.dateStr.split('-')[1], 10);
          if (evMonthNum !== mDef.num) return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Scientists') {
          if (
            ev.category !== 'Scientists' &&
            ev.category !== 'Mathematicians' &&
            ev.category !== 'Science' &&
            ev.category !== 'Science & Technology'
          ) {
            return false;
          }
        } else if (selectedCategory === 'Festivals') {
          if (
            ev.category !== 'Festivals' &&
            ev.category !== 'Regional Festivals' &&
            ev.category !== 'Harvest Festivals' &&
            ev.category !== 'Festival'
          ) {
            return false;
          }
        } else if (ev.category !== selectedCategory) {
          return false;
        }
      }

      // Tier filter
      if (selectedTier !== 'All') {
        if (selectedTier === 'Tier 1' && !ev.source_tier?.includes('Tier 1')) return false;
        if (selectedTier === 'Tier 2' && !ev.source_tier?.includes('Tier 2')) return false;
      }

      return true;
    });
  }, [events, searchQuery, selectedQuarter, selectedMonth, selectedCategory, selectedTier]);

  const calendarYear = new Date().getFullYear();
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, IndianEvent[]> = {};
    filteredEvents.forEach((event) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(event.dateStr)) return;
      grouped[event.dateStr] = [...(grouped[event.dateStr] || []), event];
    });
    Object.values(grouped).forEach((dateEvents) => {
      dateEvents.sort((a, b) => a.title.localeCompare(b.title));
    });
    return grouped;
  }, [filteredEvents]);

  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];
  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(`${selectedDate}T00:00:00Z`),
      )
    : '';
  const monthWiseGroups: { monthMeta: typeof MONTH_DATA[number]; events: IndianEvent[] }[] = [];
  const allFilteredIds: string[] = [];
  const isAllExpanded = false;

  return (
    <div className="space-y-6">
      {/* Calendar Header & Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-700" />
                <span>365-Day Indian Calendar Engine</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Govt of India Verified</span>
              </span>
              <span className="bg-stone-100 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                Panchang & Gazetted Dates
              </span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-amber-600" />
              <span>Month-wise School Assembly Calendar</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Explore national days, freedom leaders, scientists, and festivals month-by-month. Expand any event to generate a ready-to-deliver speech.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              id="calendar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Raman, Diwali, ISRO, themes..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Month Selector Ribbon */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
              <span>Browse by Month:</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                Click a highlighted date to view events
              </span>
              {selectedMonth !== 'All' && (
                <button
                  onClick={() => setSelectedMonth('All')}
                  className="text-[11px] font-medium text-stone-500 hover:text-stone-800 bg-stone-100 px-2 py-1 rounded-lg cursor-pointer"
                >
                  Show All Months
                </button>
              )}
            </div>
          </div>

          {/* Month buttons horizontal scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <button
              onClick={() => {
                setSelectedMonth('All');
                setSelectedQuarter('All');
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer flex items-center gap-1.5 ${
                selectedMonth === 'All'
                  ? 'bg-amber-700 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>All Months</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedMonth === 'All' ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                {events.length}
              </span>
            </button>

            {MONTH_DATA.map((m) => {
              const count = monthCounts[m.key] || 0;
              const isCurrentMonth = m.key === 'Sep'; // System date is September 2026
              const isSelected = selectedMonth === m.key;

              return (
                <button
                  key={m.key}
                  onClick={() => {
                    setSelectedMonth(m.key);
                    // Also sync quarter
                    const qNum = m.num <= 3 ? 1 : m.num <= 6 ? 2 : m.num <= 9 ? 3 : 4;
                    setSelectedQuarter(qNum as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : isCurrentMonth
                      ? 'bg-amber-50 text-amber-900 border border-amber-300 font-semibold'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{m.name}</span>
                  {isCurrentMonth && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" title="Current Month" />
                  )}
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Quarter & Category Filters */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Quarter buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <span className="text-stone-400 font-medium mr-1 text-[11px]">Quarter:</span>
            {quarters.map((q) => (
              <button
                key={q.label}
                onClick={() => {
                  setSelectedQuarter(q.value);
                  if (q.value !== 'All') {
                    // Check if current month is in that quarter, if not reset month to All
                    const qMonths = q.value === 1 ? [1,2,3] : q.value === 2 ? [4,5,6] : q.value === 3 ? [7,8,9] : [10,11,12];
                    const currentMDef = MONTH_DATA.find(m => m.key === selectedMonth);
                    if (currentMDef && !qMonths.includes(currentMDef.num)) {
                      setSelectedMonth('All');
                    }
                  }
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer text-xs ${
                  selectedQuarter === q.value
                    ? 'bg-stone-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Quick Clear */}
          {(searchQuery || selectedCategory !== 'All' || selectedQuarter !== 'All' || selectedMonth !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedQuarter('All');
                setSelectedMonth('All');
                setSelectedCategory('All');
                setSelectedTier('All');
              }}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.value
                  ? 'bg-amber-900 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Showing count stats */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Showing <strong className="text-stone-800">{filteredEvents.length}</strong> events
          {selectedMonth !== 'All' ? ` in ${MONTH_DATA.find((m) => m.key === selectedMonth)?.name}` : ''}
          {selectedQuarter !== 'All' && selectedMonth === 'All' ? ` in Q${selectedQuarter}` : ''}
          {selectedCategory !== 'All' ? ` for "${selectedCategory}"` : ''}
        </span>
        <span className="text-[11px] text-stone-400 hidden sm:inline">
          Click any card or &quot;Expand&quot; to customize &amp; generate a morning assembly speech.
        </span>
      </div>

      {/* Month grids: event dates are the only interactive/highlighted dates. */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {MONTH_DATA.map((month) => {
          if (selectedMonth !== 'All' && selectedMonth !== month.key) return null;
          const firstWeekday = new Date(Date.UTC(calendarYear, month.num - 1, 1)).getUTCDay();
          const daysInMonth = new Date(Date.UTC(calendarYear, month.num, 0)).getUTCDate();

          return (
            <section key={month.key} className="bg-white rounded-3xl border border-stone-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-stone-900">{month.name}</h4>
                  <p className="text-[11px] text-stone-500">{month.hindiSeason}</p>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
                  {Object.keys(eventsByDate).filter((date) => date.startsWith(`${calendarYear}-${String(month.num).padStart(2, '0')}-`)).length} highlighted dates
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <span key={day} className="text-[10px] font-bold text-stone-400 py-1">{day}</span>
                ))}
                {Array.from({ length: firstWeekday }).map((_, index) => <span key={`blank-${index}`} />)}
                {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
                  const dateKey = `${calendarYear}-${String(month.num).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dateEvents = eventsByDate[dateKey] || [];
                  const hasEvents = dateEvents.length > 0;
                  const isSelected = selectedDate === dateKey;

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      disabled={!hasEvents}
                      onClick={() => hasEvents && setSelectedDate(isSelected ? null : dateKey)}
                      className={`relative min-h-12 rounded-xl border p-1.5 text-left transition ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white shadow-md ring-2 ring-amber-200'
                          : hasEvents
                          ? 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-stone-900 cursor-pointer'
                          : 'border-transparent bg-stone-50/60 text-stone-300 cursor-default'
                      }`}
                      aria-label={hasEvents ? `${dateKey}, ${dateEvents.length} events` : dateKey}
                    >
                      <span className="text-xs font-bold">{day}</span>
                      {hasEvents && (
                        <span className={`absolute bottom-1 left-1.5 right-1.5 text-[9px] font-semibold truncate ${isSelected ? 'text-amber-100' : 'text-amber-800'}`}>
                          {dateEvents.length} event{dateEvents.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {selectedDate && (
        <section className="bg-white rounded-3xl border-2 border-amber-300 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Events on this date</p>
              <h4 className="text-xl font-bold text-stone-900">{selectedDateLabel}</h4>
            </div>
            <button type="button" onClick={() => setSelectedDate(null)} className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg bg-stone-100 cursor-pointer">
              Close
            </button>
          </div>

          <div className="space-y-3">
            {selectedDateEvents.map((item) => {
              const isExpanded = expandedEventIds.has(item.id);
              const cardOpts = getCardSpeechOption(item.id);
              return (
                <div key={item.id} className={`rounded-2xl border p-4 ${isExpanded ? 'border-amber-400 bg-amber-50/50' : 'border-stone-200 bg-stone-50/60'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{item.categoryIcon || '🇮🇳'}</span>
                        <span className="text-[11px] font-semibold text-stone-500">{item.category}</span>
                      </div>
                      <h5 className="font-bold text-stone-900">{item.title}</h5>
                    </div>
                    <button type="button" onClick={() => toggleExpand(item.id)} className="shrink-0 text-xs font-semibold text-amber-800 bg-white border border-amber-200 px-3 py-1.5 rounded-xl cursor-pointer">
                      {isExpanded ? 'Hide' : 'Expand'} <span aria-hidden="true">{isExpanded ? '⌃' : '⌄'}</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-amber-200 space-y-3">
                      <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                      <p className="text-xs text-stone-600"><strong className="text-amber-800">Why this matters:</strong> {item.importance}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-amber-200 rounded-xl p-3">
                        <p className="text-xs text-stone-600">Would you like to generate a speech on this topic?</p>
                        <button
                          type="button"
                          onClick={() => onSelectEvent(item, { preferredLanguage: cardOpts.language, speechDuration: cardOpts.duration, classLevel: cardOpts.classLevel })}
                          disabled={isGenerating}
                          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Generate Speech <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {false && (<>
      {/* Month-Wise Events View */}
      {monthWiseGroups.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 space-y-3">
          <CalendarIcon className="w-10 h-10 text-stone-300 mx-auto" />
          <p className="text-stone-600 text-sm font-medium">No events found matching your search and filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedQuarter('All');
              setSelectedMonth('All');
              setSelectedCategory('All');
              setSelectedTier('All');
            }}
            className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
          >
            Clear all filters &amp; show full 365-day calendar
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {monthWiseGroups.map((group) => {
            const isCurrentMonth = group.monthMeta.key === 'Sep';

            return (
              <section key={group.monthMeta.key} className="space-y-4">
                {/* Month Group Header */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isCurrentMonth
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-stone-800 text-white'
                    }`}>
                      {group.monthMeta.num}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                        <span>{group.monthMeta.name}</span>
                        {isCurrentMonth && (
                          <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                            Current Month
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">
                        {group.monthMeta.hindiSeason} • {group.events.length} Assembly Topics
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                    {group.events.length} {group.events.length === 1 ? 'Event' : 'Events'}
                  </span>
                </div>

                {/* Event Cards Grid for this Month */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.events.map((item) => {
                    const isExpanded = expandedEventIds.has(item.id);
                    const isSelected = selectedEventId === item.id;
                    const score = item.score ?? 0;
                    const breakdown = item.scoreBreakdown || item.score_breakdown;
                    const cardOpts = getCardSpeechOption(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`bg-white rounded-3xl border transition-all flex flex-col justify-between shadow-xs ${
                          isExpanded
                            ? 'col-span-1 md:col-span-2 lg:col-span-3 border-amber-400 ring-2 ring-amber-100 p-6'
                            : isSelected
                            ? 'border-amber-500 ring-2 ring-amber-200 p-5 hover:shadow-md'
                            : 'border-stone-200 hover:border-amber-300 p-5 hover:shadow-md'
                        }`}
                      >
                        <div>
                          {/* Card Header: Date + Category + Day of Year */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                {item.dayAndMonth}
                              </span>
                              {item.day_of_year && (
                                <span className="text-[10px] text-stone-400 font-mono">
                                  Day {item.day_of_year}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {score > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    breakdown && setInspectedBreakdown({ event: item, breakdown });
                                  }}
                                  title="Click to view full scoring formula breakdown"
                                  className="bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition cursor-pointer"
                                >
                                  <span>Score: {score}</span>
                                  <Info className="w-2.5 h-2.5 opacity-60" />
                                </button>
                              )}
                              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                                <span>{item.categoryIcon || '🇮🇳'}</span>
                                <span className="truncate max-w-[110px]">{item.category}</span>
                              </span>
                            </div>
                          </div>

                          {/* Event Title & Subtitle */}
                          <div className="mb-2">
                            <h4 className="font-bold text-stone-900 text-base mb-1 leading-snug">
                              {item.title}
                            </h4>
                            {(item.hindiTitle || item.hindi_name) && (
                              <p className="text-xs font-medium text-amber-800">
                                {item.hindiTitle || item.hindi_name}
                              </p>
                            )}
                          </div>

                          {/* State / Region & Age */}
                          <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px]">
                            {item.state_region && (
                              <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-stone-400" />
                                <span>{item.state_region}</span>
                              </span>
                            )}
                            {item.age_suitability && (
                              <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                                Ages: {item.age_suitability}
                              </span>
                            )}
                            {item.source_tier?.includes('Tier 1') && (
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                <ShieldCheck className="w-2.5 h-2.5" />
                                <span>Tier 1 Govt</span>
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          <p className={`text-xs text-stone-600 leading-relaxed mb-3 ${
                            isExpanded ? '' : 'line-clamp-2'
                          }`}>
                            {item.description}
                          </p>

                          {/* Speech Themes Pills */}
                          {item.speech_themes && item.speech_themes.length > 0 && (
                            <div className="mb-4 space-y-1">
                              <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                                Assembly Speech Themes:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {(isExpanded ? item.speech_themes : item.speech_themes.slice(0, 3)).map((th, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-amber-50/70 text-amber-900 border border-amber-200/60 text-[10px] px-2 py-0.5 rounded-md truncate max-w-[240px]"
                                  >
                                    • {th}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* EXPANDED SECTION: Deep Details + Speech Generation Prompt Box */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-stone-200 space-y-5 animate-in fade-in duration-200">
                              {/* Source attribution & info */}
                              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <span className="text-stone-400 font-medium block mb-0.5">Official Verification Source:</span>
                                  <span className="font-semibold text-stone-800">{item.source || item.sourceName}</span>
                                </div>
                                <div>
                                  <span className="text-stone-400 font-medium block mb-0.5">Date Calculation Rule:</span>
                                  <span className="font-semibold text-stone-800">
                                    {item.date_rule === 'LUNAR'
                                      ? 'Hindu Panchang (Tithi / Nakshatra dynamic)'
                                      : item.date_rule === 'LUNAR_OR_SOLAR'
                                      ? 'Indian Solar / Lunar Calendar'
                                      : 'Indian National Calendar Gazetted Schedule'}
                                  </span>
                                </div>
                                {item.source_url && (
                                  <div className="sm:col-span-2">
                                    <a
                                      href={item.source_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-amber-700 hover:text-amber-800 flex items-center gap-1 font-medium underline text-[11px]"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span>View Official Reference on India.gov.in / Ministry Portal</span>
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* PROMPT FOR SPEECH GENERATION (Required by user) */}
                              <div className="bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 space-y-4 shadow-xs">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                      <Mic className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
                                        <span>Ready for Morning Assembly?</span>
                                        <Sparkles className="w-4 h-4 text-amber-600" />
                                      </h5>
                                      <p className="text-xs text-stone-600">
                                        Would you like to generate a personalized morning assembly speech for &quot;{item.title}&quot;?
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-amber-800 bg-amber-100/70 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
                                      ✨ AI-Crafted + Verified
                                    </span>
                                  </div>
                                </div>

                                {/* Customization Controls right inside expanded card */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-200/60">
                                  {/* 1. Language */}
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-stone-700 block">
                                      Speech Language:
                                    </label>
                                    <div className="grid grid-cols-3 gap-1">
                                      {(['English', 'Hindi', 'Hinglish'] as LanguageCode[]).map((lang) => (
                                        <button
                                          key={lang}
                                          type="button"
                                          onClick={() => updateCardSpeechOption(item.id, { language: lang })}
                                          className={`py-1 text-[11px] rounded-lg font-medium transition cursor-pointer text-center ${
                                            cardOpts.language === lang
                                              ? 'bg-amber-600 text-white shadow-xs font-semibold'
                                              : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100'
                                          }`}
                                        >
                                          {lang === 'Hindi' ? 'हिंदी' : lang}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 2. Duration */}
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-stone-700 block">
                                      Duration:
                                    </label>
                                    <div className="grid grid-cols-3 gap-1">
                                      {(['1 minute', '2 minutes', '3 minutes'] as SpeechDuration[]).map((dur) => (
                                        <button
                                          key={dur}
                                          type="button"
                                          onClick={() => updateCardSpeechOption(item.id, { duration: dur })}
                                          className={`py-1 text-[11px] rounded-lg font-medium transition cursor-pointer text-center ${
                                            cardOpts.duration === dur
                                              ? 'bg-amber-600 text-white shadow-xs font-semibold'
                                              : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100'
                                          }`}
                                        >
                                          {dur.replace(' minutes', 'm').replace(' minute', 'm')}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 3. Class Level */}
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-stone-700 block">
                                      Grade Level:
                                    </label>
                                    <select
                                      value={cardOpts.classLevel}
                                      onChange={(e) =>
                                        updateCardSpeechOption(item.id, { classLevel: e.target.value as ClassLevel })
                                      }
                                      className="w-full bg-white text-stone-800 border border-amber-200 rounded-lg py-1 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                                    >
                                      <option value="Class 1">Class 1 (Ages 6–7)</option>
                                      <option value="Class 2">Class 2 (Ages 7–8)</option>
                                      <option value="Class 3">Class 3 (Ages 8–9)</option>
                                      <option value="Class 4">Class 4 (Ages 9–10)</option>
                                      <option value="Class 5">Class 5 (Ages 10–11)</option>
                                      <option value="Class 6+">Class 6+ (Ages 11+)</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Main Prompt Action Buttons */}
                                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <span className="text-[11px] text-stone-500">
                                    Includes pronunciation guide, 3 key facts, teacher questions &amp; speech cards.
                                  </span>

                                  <button
                                    id={`generate-expanded-${item.id}`}
                                    onClick={() => {
                                      onSelectEvent(item, {
                                        preferredLanguage: cardOpts.language,
                                        speechDuration: cardOpts.duration,
                                        classLevel: cardOpts.classLevel,
                                      });
                                    }}
                                    disabled={isGenerating}
                                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg"
                                  >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Generate Assembly Speech Now</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card Footer: Expand/Collapse button + Fast Generate */}
                        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-stone-100 transition cursor-pointer"
                          >
                            {isExpanded ? (
                              <>
                                <span>Hide Details</span>
                                <ChevronUp className="w-3.5 h-3.5" />
                              </>
                            ) : (
                              <>
                                <span>Expand Details &amp; Speech</span>
                                <ChevronDown className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>

                          {!isExpanded && (
                            <button
                              id={`select-event-${item.id}`}
                              onClick={() => onSelectEvent(item)}
                              disabled={isGenerating}
                              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer disabled:opacity-50 shrink-0 shadow-xs"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Generate Speech</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
      </>)}

      {/* Score Breakdown Modal */}
      {inspectedBreakdown && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h4 className="font-bold text-stone-900 text-base">
                  Scoring Formula Breakdown
                </h4>
                <p className="text-xs text-stone-500 truncate max-w-[280px]">
                  {inspectedBreakdown.event.title}
                </p>
              </div>
              <span className="text-xl font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-2xl border border-amber-200">
                {inspectedBreakdown.breakdown.finalScore} pts
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Calculated using the Indian General Awareness Multi-Parameter Formula:
              <br />
              <code className="text-[10px] bg-stone-100 px-1 py-0.5 rounded text-amber-900 font-mono">
                FinalScore = Importance×30 + Proximity×20 + Age×20 + Edu×10 + National×10 + CatDiv×5 + StateDiv×5 - Penalty
              </code>
            </p>

            <div className="space-y-2 text-xs divide-y divide-stone-100">
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Event Importance (×30 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.eventImportance} / 30</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Date Proximity (×20 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.dateProximity} / 20</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Age Suitability (×20 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.ageSuitability} / 20</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Educational Value (×10 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.educationalValue} / 10</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">National Relevance (×10 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.nationalRelevance} / 10</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Category Diversity (×5 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.categoryDiversity} / 5</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">State Diversity (×5 max):</span>
                <strong className="text-stone-900">{inspectedBreakdown.breakdown.stateDiversity} / 5</strong>
              </div>
              {inspectedBreakdown.breakdown.previouslyUsedPenalty > 0 && (
                <div className="flex justify-between py-1 text-red-600 font-semibold">
                  <span>Previously Used Penalty:</span>
                  <span>-{inspectedBreakdown.breakdown.previouslyUsedPenalty}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedBreakdown(null)}
                className="bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-stone-800 transition cursor-pointer"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
