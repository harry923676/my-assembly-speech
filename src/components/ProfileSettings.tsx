import React from 'react';
import { ChildProfile, ClassLevel, LanguageCode, SpeechDuration, SpeechStyle } from '../types.ts';
import { User, School, BookOpen, Globe, Clock, Sparkles, Check } from 'lucide-react';

interface ProfileSettingsProps {
  profile: ChildProfile;
  onUpdateProfile: (newProfile: ChildProfile) => void;
  onClose?: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profile,
  onUpdateProfile,
  onClose,
}) => {
  const classLevels: ClassLevel[] = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6+'];

  const languages: LanguageCode[] = [
    'English',
    'Hindi',
    'Punjabi',
    'Telugu',
    'Marathi',
    'Bengali',
    'Tamil',
    'Kannada',
    'Malayalam',
    'Gujarati',
    'Hinglish',
  ];

  const durations: SpeechDuration[] = ['1 minute', '2 minutes', '3 minutes'];

  const styles: SpeechStyle[] = [
    'Simple & Educational',
    'Inspirational',
    'Patriotic',
    'Storytelling',
    'Friendly & Cheerful',
    'Formal',
  ];

  const handleChange = (field: keyof ChildProfile, val: any) => {
    onUpdateProfile({
      ...profile,
      [field]: val,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="border-b border-stone-100 pb-4">
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-600" />
          <span>Child Profile & Assembly Settings</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-500">
          Personalize the speech generator for your child's exact class grade, speaking speed, and language.
        </p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        {/* Child Name & School */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>Child's First Name (Optional)</span>
            </label>
            <input
              type="text"
              value={profile.childName}
              onChange={(e) => handleChange('childName', e.target.value)}
              placeholder="e.g. Aarav, Ananya, Pawan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-stone-400" />
              <span>School Name (Optional)</span>
            </label>
            <input
              type="text"
              value={profile.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              placeholder="e.g. Delhi Public School"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
            />
          </div>
        </div>

        {/* Class Level */}
        <div>
          <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-stone-400" />
            <span>Child's Class / Grade Level</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {classLevels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleChange('classLevel', lvl)}
                className={`py-2 px-1 rounded-xl text-center font-bold text-xs transition cursor-pointer border ${
                  profile.classLevel === lvl
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Language */}
        <div>
          <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>Preferred Speech Language</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleChange('preferredLanguage', lang)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                  profile.preferredLanguage === lang
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>Target Assembly Duration</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {durations.map((dur) => (
              <button
                key={dur}
                onClick={() => handleChange('speechDuration', dur)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  profile.speechDuration === dur
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        {/* Speech Style */}
        <div>
          <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-stone-400" />
            <span>Assembly Speaking Style</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {styles.map((st) => (
              <button
                key={st}
                onClick={() => handleChange('speechStyle', st)}
                className={`py-2 px-2 rounded-xl text-xs font-medium transition cursor-pointer border text-left truncate ${
                  profile.speechStyle === st
                    ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-100 flex justify-end">
        {onClose && (
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-sm transition active:scale-95 flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile Preferences</span>
          </button>
        )}
      </div>
    </div>
  );
};
