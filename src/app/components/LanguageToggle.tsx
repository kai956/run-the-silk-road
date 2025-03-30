'use client';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();

  // Function to cycle through languages
  const cycleLanguage = () => {
    if (language === 'en') {
      changeLanguage('ru');
    } else if (language === 'ru') {
      changeLanguage('kg');
    } else {
      changeLanguage('en');
    }
  };

  return (
    <button
      onClick={cycleLanguage}
      className="px-4 py-2 rounded-md text-sm font-medium text-[#1E1E4A] hover:bg-gray-100 transition-colors"
    >
      {language === 'en' ? 'RU' : language === 'ru' ? 'KG' : 'EN'}
    </button>
  );
} 