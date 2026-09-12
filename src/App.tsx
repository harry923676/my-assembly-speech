/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  IndianEvent,
  AssemblySpeech,
  SyncedTimeData,
  ChildProfile,
} from './types.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { WeekendSpeechCard } from './components/WeekendSpeechCard.tsx';
import { SpeechDisplay } from './components/SpeechDisplay.tsx';
import { UpcomingCalendar } from './components/UpcomingCalendar.tsx';
import { PracticeModal } from './components/PracticeModal.tsx';
import { ProfileSettings } from './components/ProfileSettings.tsx';
import { SavedSpeeches } from './components/SavedSpeeches.tsx';
import { PrintView } from './components/PrintView.tsx';
import { FALLBACK_SPEECHES } from './data/fallbackSpeeches.ts';
import { rankEventsForDate } from './data/indianEvents.ts';
import { Sparkles, Calendar, Mic, Wifi, ShieldAlert, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'favorites' | 'practice' | 'profile'>('home');
  const [isParentMode, setIsParentMode] = useState<boolean>(false);

  // Internet Time Sync State
  const [syncedTime, setSyncedTime] = useState<SyncedTimeData | null>(null);
  const [isRefreshingTime, setIsRefreshingTime] = useState(false);

  // Event Engine State
  const [recommendedEvent, setRecommendedEvent] = useState<IndianEvent | null>(null);
  const [alternativeEvents, setAlternativeEvents] = useState<IndianEvent[]>([]);
  const [allEvents, setAllEvents] = useState<IndianEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IndianEvent | null>(null);

  // Child Profile State
  const [profile, setProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem('my_assembly_speech_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      childName: '',
      schoolName: '',
      classLevel: 'Class 2',
      preferredLanguage: 'English',
      speechDuration: '2 minutes',
      speechStyle: 'Simple & Educational',
      region: 'All India',
    };
  });

  // Generated Speech State
  const [currentSpeech, setCurrentSpeech] = useState<AssemblySpeech | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Favorites & History
  const [favorites, setFavorites] = useState<AssemblySpeech[]>(() => {
    try {
      const saved = localStorage.getItem('my_assembly_speech_favorites');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Modals
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const [practiceInitialMode, setPracticeInitialMode] = useState<'listen' | 'practice'>('practice');
  const [printSpeech, setPrintSpeech] = useState<AssemblySpeech | null>(null);

  // Save profile changes
  const handleUpdateProfile = (newProfile: ChildProfile) => {
    setProfile(newProfile);
    localStorage.setItem('my_assembly_speech_profile', JSON.stringify(newProfile));
  };

  // Save favorites changes
  const toggleFavorite = (speech: AssemblySpeech) => {
    const exists = favorites.some((f) => f.id === speech.id || f.eventTitle === speech.eventTitle);
    let updated: AssemblySpeech[];
    if (exists) {
      updated = favorites.filter((f) => f.id !== speech.id && f.eventTitle !== speech.eventTitle);
    } else {
      updated = [speech, ...favorites];
    }
    setFavorites(updated);
    localStorage.setItem('my_assembly_speech_favorites', JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('my_assembly_speech_favorites', JSON.stringify(updated));
  };

  // 1. Fetch live internet time
  const fetchInternetTime = useCallback(async (force = false) => {
    try {
      setIsRefreshingTime(true);
      const res = await fetch(`/api/time${force ? '?force=true' : ''}`);
      if (res.ok) {
        const data: SyncedTimeData = await res.json();
        setSyncedTime(data);
        return;
      }
    } catch (err) {
      console.warn('Could not fetch internet time from backend, using device time fallback:', err);
    } finally {
      setIsRefreshingTime(false);
    }

    // Client-side IST fallback
    const now = new Date();
    const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const istStr = istNow.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const displayDate = istNow.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeStr =
      istNow.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }) + ' IST';
    const day = istNow.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7 || 7;
    const nextSat = new Date(istNow.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
    const nextSatStr = nextSat.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const nextSatDisplay = nextSat.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    setSyncedTime({
      iso: istNow.toISOString(),
      dateStr: istStr,
      displayDate,
      timeStr,
      dayName: istNow.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long' }),
      dayOfWeek: day,
      timezone: 'Asia/Kolkata (IST, UTC+5:30)',
      nextWeekendAssembly: {
        dateStr: nextSatStr,
        displayDate: nextSatDisplay,
        dayName: 'Saturday',
        daysRemaining: daysUntilSaturday,
      },
      networkSynced: false,
      source: 'Device Time (Asia/Kolkata)',
      syncedAt: Date.now(),
    });
  }, []);

  // 2. Fetch upcoming events based on synced time
  const fetchUpcomingEvents = useCallback(async () => {
    try {
      const res = await fetch('/api/events/upcoming');
      if (res.ok) {
        const data = await res.json();
        setRecommendedEvent(data.recommended);
        setAlternativeEvents(data.alternatives || []);
        setAllEvents(data.allEvents || []);
        if (!selectedEvent && data.recommended) {
          setSelectedEvent(data.recommended);
        }
        return;
      }
    } catch (err) {
      console.warn('Could not fetch upcoming events from backend, using local ranked calendar:', err);
    }

    try {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const ranked = rankEventsForDate(todayStr, now.getFullYear());
      setRecommendedEvent(ranked.recommended);
      setAlternativeEvents(ranked.alternatives || []);
      setAllEvents(ranked.allScored || []);
      if (!selectedEvent && ranked.recommended) {
        setSelectedEvent(ranked.recommended);
      }
    } catch (e) {
      console.warn('Fallback calendar error:', e);
    }
  }, [selectedEvent]);

  // Initial load and periodic live refresh
  useEffect(() => {
    fetchInternetTime(false);
    fetchUpcomingEvents();

    const liveRefreshTimer = setInterval(() => {
      fetchInternetTime(true);
      fetchUpcomingEvents();
    }, 60 * 1000);

    return () => clearInterval(liveRefreshTimer);
  }, [fetchInternetTime, fetchUpcomingEvents]);

  // 3. Generate Speech API caller
  const generateSpeechForEvent = async (event: IndianEvent, customProfile?: ChildProfile) => {
    setIsGenerating(true);
    setErrorMsg(null);
    setSelectedEvent(event);

    const activeProf = customProfile || profile;

    try {
      const res = await fetch('/api/speech/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          eventTitle: event.title,
          eventCategory: event.category,
          eventDate: event.dateStr,
          classLevel: activeProf.classLevel,
          language: activeProf.preferredLanguage,
          duration: activeProf.speechDuration,
          style: activeProf.speechStyle,
          childName: activeProf.childName,
          schoolName: activeProf.schoolName,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate speech');
      }

      const speechData: AssemblySpeech = await res.json();
      setCurrentSpeech(speechData);
      setActiveTab('home');
    } catch (err: any) {
      console.error('Speech generation error:', err);
      // Client-side fallback from verified library
      const fallback = FALLBACK_SPEECHES[event.title] || FALLBACK_SPEECHES['National Science Day'];
      const defaultSpeech: AssemblySpeech = {
        id: `local-fallback-${Date.now()}`,
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category,
        eventDate: event.dateStr,
        classLevel: activeProf.classLevel,
        language: activeProf.preferredLanguage,
        duration: activeProf.speechDuration,
        style: activeProf.speechStyle,
        title: fallback.title || `${event.title} Assembly Speech`,
        speechText: fallback.speechText || `Respected Principal, teachers, and friends. Today I speak on ${event.title}.`,
        cleanText: (fallback.speechText || '').replace(/\[.*?\]/g, '').trim(),
        wordCount: fallback.wordCount || 210,
        estimatedSeconds: fallback.estimatedSeconds || 105,
        whyThisTopic: fallback.whyThisTopic || `${event.title} is observed this week across India.`,
        difficultWords: fallback.difficultWords || [],
        threeKeyFacts: fallback.threeKeyFacts || [],
        teacherQuestions: fallback.teacherQuestions || [],
        speakingTips: fallback.speakingTips || [],
        moralLesson: fallback.moralLesson || 'Learning and responsibility.',
        openingOptions: fallback.openingOptions || {
          traditional: 'Respected Principal, teachers, and friends.',
          question: 'Have you ever wondered about this special day?',
          surpriseFact: 'Did you know how important this day is for India?',
        },
        sources: fallback.sources || [],
        createdAt: new Date().toISOString(),
      };
      setCurrentSpeech(defaultSpeech);
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate speech once recommended event is discovered on first load
  useEffect(() => {
    if (recommendedEvent && !currentSpeech && !isGenerating) {
      generateSpeechForEvent(recommendedEvent);
    }
  }, [recommendedEvent]);

  // "Surprise Me" action
  const handleSurpriseMe = () => {
    if (allEvents.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allEvents.length);
    const surpriseEvent = allEvents[randomIndex];
    generateSpeechForEvent(surpriseEvent);
  };

  // Modify speech (easier, 1min, 3min, confident)
  const handleModifySpeech = async (action: 'easier' | '1min' | '3min' | 'confident') => {
    if (!currentSpeech || isModifying) return;
    setIsModifying(true);
    try {
      const res = await fetch('/api/speech/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          currentSpeech,
        }),
      });

      if (res.ok) {
        const modified: AssemblySpeech = await res.json();
        setCurrentSpeech(modified);
      }
    } catch (err) {
      console.error('Modify speech error:', err);
    } finally {
      setIsModifying(false);
    }
  };

  // Ask AI about speech
  const handleAskAI = async (question: string): Promise<string> => {
    try {
      const res = await fetch('/api/speech/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          speechContext: currentSpeech?.speechText || '',
          classLevel: profile.classLevel,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.answer || 'Keep practicing, you will do great!';
      }
    } catch (err) {
      console.warn('Ask AI error:', err);
    }
    return 'Speak with a bright smile, take steady breaths, and look at your friends!';
  };

  const isCurrentFavorite = currentSpeech
    ? favorites.some((f) => f.id === currentSpeech.id || f.eventTitle === currentSpeech.eventTitle)
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-800 font-sans selection:bg-amber-200">
      {/* Global Header with Live Internet Time Sync */}
      <Header
        syncedTime={syncedTime}
        onRefreshTime={() => fetchInternetTime(true)}
        isRefreshingTime={isRefreshingTime}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isParentMode={isParentMode}
        setIsParentMode={setIsParentMode}
        childName={profile.childName}
        classLevel={profile.classLevel}
        savedCount={favorites.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Parent Mode Indicator Banner (when active) */}
        {isParentMode && (
          <div className="mb-6 p-3 rounded-2xl bg-stone-900 text-white flex items-center justify-between text-xs sm:text-sm shadow-sm border border-stone-700">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-stone-900 font-bold px-2 py-0.5 rounded text-xs">
                PARENT MODE ACTIVE
              </span>
              <span className="text-stone-300 hidden sm:inline">
                Viewing content verifications, speech sources, curriculum alignment & age guidelines.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
            >
              Adjust Child Grade & Speed
            </button>
          </div>
        )}

        {/* TAB 1: HOME & WEEKEND SPEECH */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Top Spotlight: This Weekend's Speech Recommendation */}
            <WeekendSpeechCard
              recommendedEvent={recommendedEvent}
              alternativeEvents={alternativeEvents}
              syncedTime={syncedTime}
              onSelectEvent={(ev) => generateSpeechForEvent(ev)}
              onSurpriseMe={handleSurpriseMe}
              isGenerating={isGenerating}
              selectedEventId={selectedEvent?.id}
            />

            {/* The Speech Content Display */}
            {isGenerating ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 shadow-sm space-y-4">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-xl font-bold text-stone-900">
                  Crafting School Assembly Speech...
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                  Adapting vocabulary for {profile.classLevel} in {profile.preferredLanguage}, inserting delivery markers, and preparing key facts.
                </p>
              </div>
            ) : currentSpeech ? (
              <SpeechDisplay
                speech={currentSpeech}
                isFavorite={isCurrentFavorite}
                onToggleFavorite={toggleFavorite}
                onStartPractice={(sp) => {
                  setPracticeInitialMode('practice');
                  setPracticeModalOpen(true);
                }}
                onPlayAudio={(sp) => {
                  setPracticeInitialMode('listen');
                  setPracticeModalOpen(true);
                }}
                onPrint={(sp) => setPrintSpeech(sp)}
                onModifySpeech={handleModifySpeech}
                isModifying={isModifying}
                onAskAI={handleAskAI}
              />
            ) : null}
          </div>
        )}

        {/* TAB 2: UPCOMING CALENDAR */}
        {activeTab === 'calendar' && (
          <UpcomingCalendar
            events={allEvents}
            onSelectEvent={(ev) => {
              generateSpeechForEvent(ev);
              setActiveTab('home');
            }}
            isGenerating={isGenerating}
            selectedEventId={selectedEvent?.id}
          />
        )}

        {/* TAB 3: FAVORITES */}
        {activeTab === 'favorites' && (
          <SavedSpeeches
            favorites={favorites}
            onSelectSpeech={(sp) => {
              setCurrentSpeech(sp);
              setActiveTab('home');
            }}
            onRemoveFavorite={removeFavorite}
            onPrint={(sp) => setPrintSpeech(sp)}
          />
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <ProfileSettings
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Practice Modal (TTS, Teleprompter, Memory, Flashcards) */}
      {currentSpeech && practiceModalOpen && (
        <PracticeModal
          speech={currentSpeech}
          isOpen={practiceModalOpen}
          onClose={() => setPracticeModalOpen(false)}
          initialMode={practiceInitialMode}
        />
      )}

      {/* Print View Modal */}
      {printSpeech && (
        <PrintView
          speech={printSpeech}
          onClose={() => setPrintSpeech(null)}
        />
      )}

      {/* Global Footer with Pawan Paji Developer Stamp */}
      <Footer syncedTime={syncedTime} />
    </div>
  );
}
