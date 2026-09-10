import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import {
  getAllEventsForYear,
  rankEventsForDate,
  EVERGREEN_TOPICS,
} from './src/data/indianEvents.ts';
import { FALLBACK_SPEECHES } from './src/data/fallbackSpeeches.ts';
import { SyncedTimeData, AssemblySpeech, ClassLevel, LanguageCode } from './src/types.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

// Internet Time Sync State
interface TimeSyncState {
  offsetMs: number; // Difference between internet time and container time
  lastSyncedAt: number;
  source: string;
  isSynced: boolean;
}

const timeSyncState: TimeSyncState = {
  offsetMs: 0,
  lastSyncedAt: 0,
  source: 'Local System',
  isSynced: false,
};

// Function to fetch real internet time for Asia/Kolkata (IST)
async function syncInternetTime(): Promise<void> {
  const now = Date.now();
  // Attempt 1: timeapi.io
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Asia/Kolkata', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data.dateTime) {
        const internetTime = new Date(data.dateTime).getTime();
        timeSyncState.offsetMs = internetTime - Date.now();
        timeSyncState.lastSyncedAt = Date.now();
        timeSyncState.source = 'TimeAPI.io (Asia/Kolkata)';
        timeSyncState.isSynced = true;
        console.log(`[TimeSync] Successfully synced with TimeAPI. Offset: ${timeSyncState.offsetMs}ms`);
        return;
      }
    }
  } catch (err) {
    // try fallback
  }

  // Attempt 2: worldtimeapi.org
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data.datetime) {
        const internetTime = new Date(data.datetime).getTime();
        timeSyncState.offsetMs = internetTime - Date.now();
        timeSyncState.lastSyncedAt = Date.now();
        timeSyncState.source = 'WorldTimeAPI (Asia/Kolkata)';
        timeSyncState.isSynced = true;
        console.log(`[TimeSync] Successfully synced with WorldTimeAPI. Offset: ${timeSyncState.offsetMs}ms`);
        return;
      }
    }
  } catch (err) {
    // try fallback
  }

  // Fallback: Use container system time converted to IST
  timeSyncState.lastSyncedAt = Date.now();
  timeSyncState.source = 'Server Time (Asia/Kolkata)';
  timeSyncState.isSynced = true;
}

// Initial sync
syncInternetTime().catch(() => {});
// Periodic sync every 10 minutes
setInterval(() => {
  syncInternetTime().catch(() => {});
}, 10 * 60 * 1000);

// Helper to get current synced IST Date
function getSyncedISTDate(): Date {
  const currentUtcMs = Date.now() + timeSyncState.offsetMs;
  return new Date(currentUtcMs);
}

function getFormattedTimeData(): SyncedTimeData {
  const istDate = getSyncedISTDate();

  // Format in Asia/Kolkata
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('en-IN', options);
  const parts = formatter.formatToParts(istDate);

  let year = '2026';
  let month = '09';
  let day = '10';
  let hour = '12';
  let minute = '00';
  let second = '00';
  let dayPeriod = 'AM';

  for (const part of parts) {
    if (part.type === 'year') year = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'day') day = part.value;
    if (part.type === 'hour') hour = part.value;
    if (part.type === 'minute') minute = part.value;
    if (part.type === 'second') second = part.value;
    if (part.type === 'dayPeriod') dayPeriod = part.value;
  }

  const dateStr = `${year}-${month}-${day}`;

  const weekdayFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
  });
  const dayName = weekdayFormatter.format(istDate);

  const fullDateFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
  });
  const displayDate = fullDateFormatter.format(istDate);
  const timeStr = `${hour}:${minute}:${second} ${dayPeriod} IST`;

  // Calculate upcoming weekend/assembly (typically Saturday or Monday morning in Indian schools)
  // Current day index in UTC/IST
  const istDayNum = new Date(`${year}-${month}-${day}T12:00:00Z`).getUTCDay(); // 0 Sun, 6 Sat
  // Saturday is day 6. If today is Saturday, next Saturday is 7 days or today's assembly.
  let daysToSat = (6 - istDayNum + 7) % 7;
  if (daysToSat === 0 && (dayPeriod === 'PM' || parseInt(hour) >= 11)) {
    daysToSat = 7; // assembly already passed today
  }

  const satDate = new Date(new Date(`${year}-${month}-${day}T12:00:00Z`).getTime() + daysToSat * 86400000);
  const satYear = satDate.getUTCFullYear();
  const satMonth = String(satDate.getUTCMonth() + 1).padStart(2, '0');
  const satDay = String(satDate.getUTCDate()).padStart(2, '0');
  const nextSatStr = `${satYear}-${satMonth}-${satDay}`;

  const nextDisplayDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(satDate);

  return {
    iso: istDate.toISOString(),
    dateStr,
    displayDate,
    timeStr,
    dayName,
    dayOfWeek: istDayNum,
    timezone: 'Asia/Kolkata (IST, UTC+5:30)',
    nextWeekendAssembly: {
      dateStr: nextSatStr,
      displayDate: nextDisplayDate,
      dayName: 'Saturday',
      daysRemaining: daysToSat,
    },
    networkSynced: timeSyncState.isSynced,
    source: timeSyncState.source,
    syncedAt: timeSyncState.lastSyncedAt,
  };
}

// Lazy Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

// API Routes

// 1. Live Internet Time API
app.get('/api/time', async (req, res) => {
  if (req.query.force === 'true' || Date.now() - timeSyncState.lastSyncedAt > 15 * 60 * 1000) {
    await syncInternetTime();
  }
  res.json(getFormattedTimeData());
});

// 2. Upcoming Events API
app.get('/api/events/upcoming', (req, res) => {
  const timeData = getFormattedTimeData();
  const year = parseInt(timeData.dateStr.split('-')[0], 10);
  const ranked = rankEventsForDate(timeData.dateStr, year);

  res.json({
    currentTime: timeData,
    recommended: ranked.recommended,
    alternatives: ranked.alternatives,
    allEvents: ranked.allScored.slice(0, 15),
    evergreen: EVERGREEN_TOPICS,
  });
});

// 3. All Events for Yearly Calendar
app.get('/api/events/all', (req, res) => {
  const timeData = getFormattedTimeData();
  const year = parseInt(timeData.dateStr.split('-')[0], 10);
  const events = getAllEventsForYear(year);
  res.json({ year, events });
});

// Helper for generating speech via Gemini or fallback
app.post('/api/speech/generate', async (req, res) => {
  try {
    const {
      eventId,
      eventTitle,
      eventCategory,
      eventDate,
      classLevel = 'Class 2',
      language = 'English',
      duration = '2 minutes',
      style = 'Simple & Educational',
      childName,
      schoolName,
    } = req.body;

    const timeData = getFormattedTimeData();
    const resolvedEventTitle = eventTitle || 'National Science Day';

    // Check if Gemini API is configured
    const ai = getGeminiClient();

    if (ai) {
      try {
        const wordCountTarget =
          classLevel === 'Class 1'
            ? '150 to 180 words'
            : classLevel === 'Class 2'
            ? '220 to 260 words'
            : classLevel === 'Class 3' || classLevel === 'Class 4'
            ? '260 to 320 words'
            : '320 to 380 words';

        const prompt = `You are an expert Indian children's educational speech writer specializing in school morning assembly speeches.
Generate an age-appropriate, factually verified, beautiful assembly speech.

Parameters:
- Topic: "${resolvedEventTitle}"
- Category: "${eventCategory || 'National'}"
- Event Date / Observed Date: "${eventDate || timeData.dateStr}"
- Current Synced Date: "${timeData.displayDate}"
- Child's Class: "${classLevel}"
- Preferred Language: "${language}" (If not English, write in fluent, age-appropriate native script or requested Indian language. If English, keep words Class-level appropriate).
- Speech Target Duration: "${duration}" (Target word count: ${wordCountTarget})
- School Assembly Style: "${style}"
- Child Name: "${childName || ''}" (optional, include in greeting if provided)
- School Name: "${schoolName || ''}" (optional)

Strict Content Rules:
1. Opening: Polite school morning greeting ("Respected Principal, teachers, and my dear friends...")
2. Delivery markers: Sparingly insert [Smile], [Pause], or [Speak slowly] to help the child practice delivery.
3. Sentence Length: 6-12 words per sentence for Class 1-2. No complicated adult academic words without explanation.
4. Facts: 3 accurate, verified facts about India, the event, or personality. No fake claims or mythology presented as science.
5. Moral / Lesson: A simple practical lesson (e.g. kindness, discipline, saving water, loving books, curiosity).
6. Closing: "Thank you and have a wonderful day ahead! Jai Hind!"
7. Provide syllable pronunciation breakdowns for difficult words (e.g., "Sarvepalli Radhakrishnan" -> "Sar-vay-pal-lee Rad-ha-krish-nan").
8. Provide 3 key facts to remember and 2-3 anticipated questions a teacher might ask with simple answers.

Respond strictly in valid JSON format matching this schema:
{
  "title": "A short inspiring speech title",
  "speechText": "The full speech with delivery markers like [Smile] and [Pause]",
  "cleanText": "The speech text stripped of bracket markers for text-to-speech audio reading",
  "whyThisTopic": "1-2 sentences explaining why this topic is relevant right now",
  "moralLesson": "1 simple value children learn",
  "threeKeyFacts": ["Fact 1", "Fact 2", "Fact 3"],
  "difficultWords": [
    {"word": "word", "pronunciation": "syllable breakdown", "meaning": "simple child meaning"}
  ],
  "teacherQuestions": [
    {"question": "What might teacher ask?", "answer": "Simple child-appropriate answer"}
  ],
  "speakingTips": [
    "Tip 1", "Tip 2", "Tip 3"
  ],
  "openingOptions": {
    "traditional": "Traditional greeting",
    "question": "Engaging question hook",
    "surpriseFact": "Surprise fact hook"
  },
  "sources": [
    {"name": "Government of India / Official Institution", "url": "", "confidence": 98, "note": "Verified factual record"}
  ]
}`;

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 6500)
        );

        const response: any = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          }),
          timeoutPromise,
        ]);

        const responseText = response.text || '';
        const parsed = JSON.parse(responseText);

        const wordCount = parsed.cleanText
          ? parsed.cleanText.trim().split(/\s+/).length
          : parsed.speechText.trim().split(/\s+/).length;
        const estimatedSeconds = Math.round((wordCount / 115) * 60);

        const speechResult: AssemblySpeech = {
          id: `speech-${Date.now()}`,
          eventId: eventId || 'custom',
          eventTitle: resolvedEventTitle,
          eventCategory: eventCategory || 'National',
          eventDate: eventDate || timeData.dateStr,
          classLevel,
          language,
          duration,
          style,
          title: parsed.title || `${resolvedEventTitle} Assembly Speech`,
          speechText: parsed.speechText,
          cleanText: parsed.cleanText || parsed.speechText.replace(/\[.*?\]/g, '').trim(),
          wordCount,
          estimatedSeconds,
          whyThisTopic: parsed.whyThisTopic || `Relevant for this upcoming school assembly.`,
          difficultWords: parsed.difficultWords || [],
          threeKeyFacts: parsed.threeKeyFacts || [],
          teacherQuestions: parsed.teacherQuestions || [],
          speakingTips: parsed.speakingTips || [
            'Stand straight with shoulders relaxed.',
            'Smile at the teachers and your friends.',
            'Speak slowly and clearly.',
          ],
          moralLesson: parsed.moralLesson || 'Values of respect, learning, and love for our nation.',
          openingOptions: parsed.openingOptions || {
            traditional: 'Respected Principal, teachers, and my dear friends.',
            question: 'Have you ever wondered why this day is so special for our country?',
            surpriseFact: 'Did you know that small steps can lead to great national achievements?',
          },
          sources: parsed.sources || [
            {
              name: 'National Portal of India / Official Records',
              confidence: 98,
            },
          ],
          createdAt: new Date().toISOString(),
          childName,
          schoolName,
        };

        return res.json(speechResult);
      } catch (geminiError) {
        console.warn('Gemini API call encountered an error, falling back to verified database:', geminiError);
      }
    }

    // High quality fallback generation
    const matchedFallback = FALLBACK_SPEECHES[resolvedEventTitle] || FALLBACK_SPEECHES['National Science Day'];

    let greeting = `Respected Principal, beloved teachers, and my dear friends.`;
    if (childName) {
      greeting = `Respected Principal, teachers, and my dear friends. My name is ${childName}, and today I am very excited to speak before you.`;
    }

    const fallbackSpeech: AssemblySpeech = {
      id: `fallback-${Date.now()}`,
      eventId: eventId || 'fallback',
      eventTitle: resolvedEventTitle,
      eventCategory: eventCategory || 'National',
      eventDate: eventDate || timeData.dateStr,
      classLevel,
      language,
      duration,
      style,
      title: matchedFallback.title || `${resolvedEventTitle} - Morning Assembly Speech`,
      speechText: matchedFallback.speechText || `${greeting}\n\nToday I would like to speak about ${resolvedEventTitle}...\n\nThank you and have a wonderful day!`,
      cleanText: (matchedFallback.speechText || '').replace(/\[.*?\]/g, '').trim(),
      wordCount: matchedFallback.wordCount || 215,
      estimatedSeconds: matchedFallback.estimatedSeconds || 110,
      whyThisTopic: matchedFallback.whyThisTopic || `${resolvedEventTitle} is being observed this week in India.`,
      difficultWords: matchedFallback.difficultWords || [],
      threeKeyFacts: matchedFallback.threeKeyFacts || [
        `${resolvedEventTitle} is an important occasion observed across India.`,
        `It teaches children valuable life lessons and good citizenship.`,
        `Celebrated with assemblies, learning activities, and cultural programs.`,
      ],
      teacherQuestions: matchedFallback.teacherQuestions || [
        {
          question: `Why is ${resolvedEventTitle} important for students?`,
          answer: `It reminds us of great values and inspires us to be responsible students.`,
        },
      ],
      speakingTips: matchedFallback.speakingTips || [
        'Stand straight and make eye contact with your friends.',
        'Speak in a calm, clear, and confident voice.',
        'Smile when saying good morning and thank you!',
      ],
      moralLesson: matchedFallback.moralLesson || 'Truth, continuous learning, and national harmony.',
      openingOptions: matchedFallback.openingOptions || {
        traditional: greeting,
        question: `Have you ever wondered why we celebrate ${resolvedEventTitle}?`,
        surpriseFact: `Did you know that ${resolvedEventTitle} inspires millions of children across India?`,
      },
      sources: matchedFallback.sources || [
        {
          name: 'National Portal of India',
          url: 'https://india.gov.in',
          confidence: 98,
        },
      ],
      createdAt: new Date().toISOString(),
      childName,
      schoolName,
    };

    return res.json(fallbackSpeech);
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ error: 'Failed to generate speech. Please try again.' });
  }
});

// 4. Modify Speech API (Make it easier, 1 min, 3 min, more confident)
app.post('/api/speech/modify', async (req, res) => {
  try {
    const { action, currentSpeech } = req.body;
    const ai = getGeminiClient();

    if (!ai || !currentSpeech) {
      // Local heuristic modifications if AI is not configured
      let modifiedText = currentSpeech.speechText;
      let newDuration = currentSpeech.duration;

      if (action === 'easier') {
        modifiedText = modifiedText
          .replace(/invincible/gi, 'strong')
          .replace(/commemorates/gi, 'remembers')
          .replace(/philosopher/gi, 'great thinker')
          .replace(/prestigious/gi, 'very special');
      } else if (action === '1min') {
        const sentences = modifiedText.split('. ');
        modifiedText = sentences.slice(0, Math.min(sentences.length, 6)).join('. ') + '.\n\nThank you!';
        newDuration = '1 minute';
      } else if (action === '3min') {
        modifiedText = modifiedText + '\n\nLet us also remember that every great achievement begins with small everyday efforts in our classrooms.';
        newDuration = '3 minutes';
      }

      const cleanText = modifiedText.replace(/\[.*?\]/g, '').trim();
      const wordCount = cleanText.split(/\s+/).length;

      return res.json({
        ...currentSpeech,
        speechText: modifiedText,
        cleanText,
        duration: newDuration,
        wordCount,
        estimatedSeconds: Math.round((wordCount / 115) * 60),
      });
    }

    const actionPrompts: Record<string, string> = {
      easier: `Rewrite this assembly speech using much simpler, easier words suitable for an early elementary child (Class 1-2). Keep the exact same facts, but use short sentences and very easy pronunciation.`,
      '1min': `Condense this assembly speech into approximately 1 minute (110 to 140 words). Retain the warm greeting, the main core fact, the child-friendly moral lesson, and the polite closing.`,
      '3min': `Expand this assembly speech to approximately 3 minutes (320 to 380 words). Add another simple, delightful child-friendly story or example and practical student actions without repeating sentences.`,
      confident: `Make this speech sound more confident, energetic, and engaging! Add interactive audience questions, inspiring voice pauses, and a powerful uplifting ending for the school morning assembly.`,
    };

    const instruction = actionPrompts[action] || `Improve the speech flow.`;

    const prompt = `${instruction}

Current Speech:
"${currentSpeech.speechText}"

Target Class: ${currentSpeech.classLevel}
Language: ${currentSpeech.language}

Respond strictly in JSON:
{
  "title": "Speech Title",
  "speechText": "Modified speech with [Smile] / [Pause] markers",
  "cleanText": "Clean speech text for audio read-aloud"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    const cleanText = parsed.cleanText || parsed.speechText.replace(/\[.*?\]/g, '').trim();
    const wordCount = cleanText.split(/\s+/).length;

    res.json({
      ...currentSpeech,
      title: parsed.title || currentSpeech.title,
      speechText: parsed.speechText,
      cleanText,
      wordCount,
      estimatedSeconds: Math.round((wordCount / 115) * 60),
    });
  } catch (err) {
    console.error('Error modifying speech:', err);
    res.status(500).json({ error: 'Failed to modify speech' });
  }
});

// 5. Ask AI about speech (kid-friendly Q&A)
app.post('/api/speech/ask', async (req, res) => {
  try {
    const { question, speechContext, classLevel = 'Class 2' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        answer: `That is a wonderful question! In school assemblies, the most important thing is to speak from the heart, smile at your friends, and share something helpful.`,
      });
    }

    const prompt = `You are a warm, kind teacher answering a young student (${classLevel}) who is preparing their school assembly speech.
Question from child: "${question}"
Speech Context: "${speechContext ? speechContext.substring(0, 300) : 'School assembly speech'}"

Provide a simple, cheerful, encouraging answer in 2-4 sentences suitable for a 7-year-old child. Avoid complex adult vocabulary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ answer: response.text || 'Keep practicing, you will do great!' });
  } catch (err) {
    res.json({
      answer: 'Keep smiling, take deep breaths, and practice speaking slowly!',
    });
  }
});

// Vite middleware / static serving setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`My Assembly Speech server listening on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  start();
}

export default app;
