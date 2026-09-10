import React from 'react';
import { Heart, Sparkles, CheckCircle2, Shield, BookOpen, Award } from 'lucide-react';
import { SyncedTimeData } from '../types.ts';

interface FooterProps {
  syncedTime: SyncedTimeData | null;
}

export const Footer: React.FC<FooterProps> = ({ syncedTime }) => {
  return (
    <footer className="mt-16 bg-white border-t border-amber-200/80 text-stone-700">
      {/* Top Banner: Developer Stamp as requested */}
      <div className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-3.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/20 rounded-lg backdrop-blur-xs">
              <Award className="w-5 h-5 text-amber-100" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-100 font-semibold">
                Official Developer Stamp
              </div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <span>Pawan Paji</span>
                <span className="inline-flex items-center gap-0.5 bg-white/25 text-[11px] px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Verified Architect
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-100 max-w-md">
            Dedicated to inspiring confidence, eloquence, and patriotism in every young Indian student during school morning assemblies.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          {/* Col 1: About App */}
          <div>
            <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-2">
              <span className="text-xl">🇮🇳</span>
              <span>My Assembly Speech</span>
            </div>
            <p className="text-stone-500 leading-relaxed">
              Designed specifically for Class 1 to Class 5 students in India. Automatically connects to live internet time to select upcoming national days, festivals, and inspiring stories for weekly school assemblies.
            </p>
            <div className="mt-3 flex items-center gap-2 text-stone-500 text-xs">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Child-Safe Content • Zero Ads • Fact Verified</span>
            </div>
          </div>

          {/* Col 2: Assembly Success Tips */}
          <div>
            <div className="font-bold text-stone-900 text-base mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Assembly Speaking Rules</span>
            </div>
            <ul className="space-y-1.5 text-stone-600">
              <li>• Always greet: "Respected Principal, teachers & friends"</li>
              <li>• Speak slowly: around 115 words per minute</li>
              <li>• Pause 1 second between ideas to let words sink in</li>
              <li>• End proudly with: "Jai Hind! Jai Bharat!"</li>
            </ul>
          </div>

          {/* Col 3: Time Sync & Credits */}
          <div>
            <div className="font-bold text-stone-900 text-base mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Internet Sync & Architecture</span>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Live Time Source:</span>
                <span className="font-semibold text-stone-800">{syncedTime?.source || 'Internet NTP'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Synced Timezone:</span>
                <span className="font-mono text-stone-700">Asia/Kolkata (IST)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Status:</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Online Sync
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line with Pawan Paji Developer Stamp */}
        <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} My Assembly Speech. All rights reserved.
          </div>
          <div className="flex items-center gap-1 font-medium text-stone-700">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>by</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Pawan Paji
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
