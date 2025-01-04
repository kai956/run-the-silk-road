'use client';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-md text-sm font-medium text-[#1E1E4A] hover:bg-gray-100 transition-colors"
    >
      {language === 'en' ? 'RU' : 'EN'}
    </button>
  );
} 