import React from 'react';
import { IndianEvent } from '../types.ts';

const SYMBOL_RULES: Array<[RegExp, string]> = [
  [/diwali|deepavali|lights?/i, '🪔'],
  [/holi|color/i, '🎨'],
  [/science|engineer|technology|space|mathematic|ramanujan|isro/i, '🔬'],
  [/teacher|education|student|school|literacy/i, '📚'],
  [/doctor|health|yoga|wellness|mental/i, '🩺'],
  [/women|girl|savitribai|ahilyabai|lakshmibai/i, '👩‍🎓'],
  [/farmer|kisan|harvest|onam|pongal/i, '🌾'],
  [/tree|earth|water|environment|wildlife|nature/i, '🌱'],
  [/freedom|martyr|army|navy|defence|republic|independence|shaheed/i, '🇮🇳'],
  [/music|radio|literature|poet|writer|tagore/i, '🎵'],
  [/sports|dhyan chand|fitness/i, '🏅'],
  [/festival|puja|eid|buddha|mahavir|guru nanak/i, '🪔'],
];

export function getEventSymbol(event: Pick<IndianEvent, 'title' | 'category' | 'categoryIcon'>): string {
  const match = SYMBOL_RULES.find(([pattern]) => pattern.test(event.title));
  if (match) return match[1];

  const categorySymbols: Record<string, string> = {
    National: '🇮🇳',
    Festival: '🪔',
    Education: '📚',
    Science: '🔬',
    Environment: '🌱',
    History: '📜',
    Personality: '⭐',
    Sports: '🏅',
    Culture: '🎭',
    International: '🌍',
  };

  return categorySymbols[event.category] || event.categoryIcon || '✨';
}

interface EventSymbolProps {
  event: Pick<IndianEvent, 'title' | 'category' | 'categoryIcon'>;
  size?: 'sm' | 'md' | 'lg';
}

export const EventSymbol: React.FC<EventSymbolProps> = ({ event, size = 'md' }) => {
  const sizeClass = size === 'lg' ? 'w-16 h-16 text-4xl' : size === 'sm' ? 'w-8 h-8 text-lg' : 'w-11 h-11 text-2xl';

  return (
    <span className={`${sizeClass} inline-flex items-center justify-center rounded-2xl bg-white/20 border border-white/25 shadow-sm shrink-0`} aria-hidden="true">
      {getEventSymbol(event)}
    </span>
  );
};
