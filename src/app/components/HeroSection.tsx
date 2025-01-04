'use client';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-screen w-full">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1E1E4A] mb-6">
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl">
          {t.description}
        </p>
      </div>
    </section>
  );
} 