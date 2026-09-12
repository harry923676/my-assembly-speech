import React, { useState, useEffect, useRef } from 'react';
import { SyncedTimeData } from '../types.ts';
import { Wifi, RefreshCw, Sparkles, User, Calendar, Star, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  syncedTime: SyncedTimeData | null;
  onRefreshTime: () => void;
  isRefreshingTime: boolean;
  activeTab: 'home' | 'calendar' | 'favorites' | 'practice' | 'profile';
  setActiveTab: (tab: 'home' | 'calendar' | 'favorites' | 'practice' | 'profile') => void;
  isParentMode: boolean;
  setIsParentMode: (val: boolean) => void;
  childName?: string;
  classLevel?: string;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  syncedTime,
  onRefreshTime,
  isRefreshingTime,
  activeTab,
  setActiveTab,
  isParentMode,
  setIsParentMode,
  childName,
  classLevel,
  savedCount = 0,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems: {
    id: 'home' | 'calendar' | 'favorites' | 'profile';
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    buttonId: string;
  }[] = [
    {
      id: 'home',
      label: 'Speech',
      description: 'Assembly Speech Generator, delivery markers & practice studio',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      badge: 'Today',
      buttonId: 'nav-menu-item-speech',
    },
    {
      id: 'calendar',
      label: 'Events Calendar',
      description: 'Upcoming Indian national days, lunar festivals & assembly countdown',
      icon: <Calendar className="w-5 h-5 text-orange-600" />,
      badge: 'IST Sync',
      buttonId: 'nav-menu-item-calendar',
    },
    {
      id: 'favorites',
      label: 'Saved',
      description: 'Bookmarked speeches, prepared drafts & printable cue cards',
      icon: <Star className="w-5 h-5 text-amber-500" />,
      badge: savedCount > 0 ? `${savedCount} saved` : undefined,
      buttonId: 'nav-menu-item-saved',
    },
    {
      id: 'profile',
      label: 'Child Profile',
      description: `Class 1–5 settings for ${childName || 'Student'} (${classLevel || 'Class 2'}), pacing & language`,
      icon: <User className="w-5 h-5 text-stone-700" />,
      badge: classLevel || 'Class 2',
      buttonId: 'nav-menu-item-profile',
    },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-200/70 sticky top-0 z-40 shadow-xs">
      {/* Top Internet Time Sync Bar */}
      <div className="bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-3 py-1.5 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold tracking-wide flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 inline" />
              Live Internet Time Synced:
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-md font-mono font-medium animate-pulse">
              {syncedTime ? syncedTime.displayDate : 'Syncing time...'}
            </span>
            {syncedTime && (
              <span className="bg-amber-900/40 px-2 py-0.5 rounded-md font-mono hidden sm:inline text-amber-100 animate-pulse">
                {syncedTime.timeStr}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {syncedTime?.nextWeekendAssembly && (
              <span className="hidden md:flex items-center gap-1 text-amber-100">
                <span className="text-amber-200 font-medium">Next Assembly:</span>
                <span className="bg-white/15 px-1.5 py-0.5 rounded text-white font-medium">
                  {syncedTime.nextWeekendAssembly.displayDate} (
                  {syncedTime.nextWeekendAssembly.daysRemaining === 0
                    ? 'Today!'
                    : `in ${syncedTime.nextWeekendAssembly.daysRemaining} days`}
                  )
                </span>
              </span>
            )}

            <button
              id="refresh-internet-time-btn"
              onClick={onRefreshTime}
              disabled={isRefreshingTime}
              title="Resync with Internet Time Server"
              className="hover:bg-white/20 px-2 py-0.5 rounded transition flex items-center gap-1 text-white/90 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshingTime ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            {/* Parent Mode Toggle */}
            <div className="flex items-center bg-black/20 rounded-full p-0.5 border border-white/20">
              <button
                id="mode-child-toggle"
                onClick={() => setIsParentMode(false)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                  !isParentMode ? 'bg-white text-orange-800 shadow-xs' : 'text-amber-100 hover:text-white'
                }`}
              >
                Child View
              </button>
              <button
                id="mode-parent-toggle"
                onClick={() => setIsParentMode(true)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                  isParentMode ? 'bg-white text-orange-800 shadow-xs' : 'text-amber-100 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                Parent View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => {
            setActiveTab('home');
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition">
            <span className="text-xl">🎤</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg md:text-xl text-stone-900 tracking-tight flex items-center gap-1.5">
                My Assembly Speech
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200">
                India
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Automatic School Assembly Speech Generator for Kids (Class 1–5)
            </p>
          </div>
        </div>

        {/* Navigation & Three Horizontal Type Menu */}
        <div className="flex items-center gap-2" ref={menuRef}>
          {/* Horizontal Type Menu Bar (visible on md screens & up) */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1 rounded-2xl border border-stone-200/80">
            <button
              id="nav-tab-home"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white text-amber-900 font-bold shadow-xs border border-amber-300/80'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Speech</span>
            </button>

            <button
              id="nav-tab-calendar"
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-white text-amber-900 font-bold shadow-xs border border-amber-300/80'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Events Calendar</span>
            </button>

            <button
              id="nav-tab-favorites"
              onClick={() => setActiveTab('favorites')}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-white text-amber-900 font-bold shadow-xs border border-amber-300/80'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-profile"
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-amber-900 font-bold shadow-xs border border-amber-300/80'
                  : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
              }`}
            >
              <User className="w-4 h-4 text-stone-700" />
              <span>{childName ? `${childName} (${classLevel || 'Class 2'})` : 'Child Profile'}</span>
            </button>
          </nav>

          {/* THREE HORIZONTAL TYPE MENU BUTTON (Three horizontal lines icon / hamburger) */}
          <div className="relative">
            <button
              id="three-horizontal-menu-btn"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-label="Three horizontal type menu"
              title="Three Horizontal Menu - Access Speech, Events Calendar, Saved & Child Profile"
              className={`px-3 py-2 rounded-2xl font-medium text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer border ${
                isMenuOpen
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300/50'
                  : 'bg-white hover:bg-amber-50/80 text-stone-700 border-amber-200 shadow-xs'
              }`}
            >
              {/* Three Horizontal Bars Icon */}
              <div className="flex flex-col justify-center items-center gap-1 w-4.5 h-4.5" aria-hidden="true">
                <span
                  className={`w-4 h-0.5 rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'bg-white rotate-45 translate-y-1.5' : 'bg-stone-800'
                  }`}
                />
                <span
                  className={`w-4 h-0.5 rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'opacity-0' : 'bg-stone-800'
                  }`}
                />
                <span
                  className={`w-4 h-0.5 rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'bg-white -rotate-45 -translate-y-1.5' : 'bg-stone-800'
                  }`}
                />
              </div>
              <span className="font-semibold text-xs tracking-tight">
                Menu
              </span>
              {savedCount > 0 && (
                <span className={`w-2 h-2 rounded-full ${isMenuOpen ? 'bg-white' : 'bg-amber-500'}`} />
              )}
            </button>

            {/* THREE HORIZONTAL TYPE MENU DROPDOWN PANEL */}
            {isMenuOpen && (
              <div
                id="three-horizontal-menu-dropdown"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-amber-200 p-3 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
              >
                <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📋</span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Assembly Navigation Menu
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Select any section below
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                    4 Sections
                  </span>
                </div>

                {/* The 4 Core Sections: Speech, Events Calendar, Saved, Child Profile */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      (item.id === 'home' && activeTab === 'home') ||
                      (item.id === 'calendar' && activeTab === 'calendar') ||
                      (item.id === 'favorites' && activeTab === 'favorites') ||
                      (item.id === 'profile' && activeTab === 'profile');

                    return (
                      <button
                        key={item.id}
                        id={item.buttonId}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl transition flex items-start gap-3 cursor-pointer group ${
                          isActive
                            ? 'bg-amber-50/90 border border-amber-300/80 shadow-xs'
                            : 'hover:bg-stone-50 border border-transparent'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-xl mt-0.5 shrink-0 transition ${
                            isActive
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-stone-100 text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`font-semibold text-sm ${
                                isActive ? 'text-amber-950 font-bold' : 'text-stone-900 group-hover:text-amber-800'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="self-center pl-1 text-stone-400 group-hover:text-amber-600 transition">
                          {isActive ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Footer inside the Menu */}
                <div className="mt-2 pt-2 border-t border-stone-100 px-3 py-1.5 bg-stone-50 rounded-2xl flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    IST Time Synced
                  </span>
                  <button
                    onClick={() => {
                      setIsParentMode(!isParentMode);
                      setIsMenuOpen(false);
                    }}
                    className="text-[11px] font-semibold text-orange-700 hover:text-orange-900 underline cursor-pointer"
                  >
                    Switch to {isParentMode ? 'Child View' : 'Parent View'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Sub-Navigation Bar for Mobile & Tablet (incorporates all 4 sections horizontally) */}
      <div className="lg:hidden border-t border-amber-100 bg-amber-50/50 px-3 py-1.5 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1 min-w-[340px]">
          <button
            id="mobile-h-tab-speech"
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeTab === 'home'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Speech</span>
          </button>

          <button
            id="mobile-h-tab-calendar"
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>

          <button
            id="mobile-h-tab-saved"
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="text-[10px] bg-white/30 text-current px-1.5 rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            id="mobile-h-tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};

