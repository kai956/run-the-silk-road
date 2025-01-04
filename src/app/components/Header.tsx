'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const t = translations[language];

  const navItems = [
    { key: 'about', label: t.about },
    { key: 'route', label: t.route },
    { key: 'register', label: t.register },
    { key: 'contact', label: t.contact }
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-5 py-2.5 flex items-center justify-between w-fit mx-auto">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Image
              src="/images/logo.png"
              alt="Silk Road Marathon"
              width={70}
              height={24}
              className="object-contain"
              priority
            />

            {/* Navigation Links */}
            <div className="flex items-center gap-5">
              {navItems.map((item) => (
                <div key={item.key} className="relative">
                  <a
                    href={`#${item.key}`}
                    className="text-[#1E1E4A] text-[14px] font-medium hover:opacity-70 transition-opacity"
                    onMouseEnter={() => setHoveredItem(item.key)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.label}
                  </a>
                  {hoveredItem === item.key && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1E1E4A]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="relative ml-4">
            <button 
              onClick={toggleLanguage}
              className="px-4 py-1.5 text-[14px] text-white rounded-full relative overflow-hidden"
              onMouseEnter={() => setHoveredItem('lang')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="absolute inset-0 bg-[#1E1E4A]" />
              <motion.div
                className="absolute inset-0 bg-[#4A90E2]"
                initial={{ x: '-100%' }}
                animate={{ 
                  x: hoveredItem === 'lang' ? '0%' : '-100%'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <span className="relative z-10 font-medium">
                {language === 'en' ? 'RU' : 'EN'}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
} 