'use client';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero; // Get the hero translations

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1E1E4A] mb-6">
          {t.title} {/* Access the title string */}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600">
          {t.description} {/* Access the description string */}
        </p>
      </div>
    </div>
  );
} 