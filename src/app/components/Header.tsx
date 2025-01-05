'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const t = translations[language];

  const navItems = [
    { key: 'about', label: t.about },
    { key: 'route', label: t.route },
    { key: 'register', label: t.register },
    { key: 'contact', label: t.contact }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white/90 backdrop-blur-md shadow-lg rounded-full py-2.5 px-5 items-center gap-5 mx-auto mt-6 w-fit">
        <div className="w-[60px] flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Silk Road Marathon"
            width={60}
            height={24}
            className="object-contain w-full"
            priority
          />
        </div>

        <div className="flex items-center space-x-5">
          {navItems.map((item) => (
            <div key={item.key} className="relative">
              <a
                href={`#${item.key}`}
                className="text-[#1E1E4A] text-[14px] font-medium hover:opacity-70 transition-opacity whitespace-nowrap"
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

        <button 
          onClick={toggleLanguage}
          className="px-4 py-1.5 text-[14px] text-white rounded-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#1E1E4A]" />
          <span className="relative z-10 font-medium">
            {language === 'en' ? 'RU' : 'EN'}
          </span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ${isOpen ? 'rounded-[30px] mx-4 mt-4' : ''}`}>
        <div className="flex justify-between items-center px-4 py-3">
          <div className="w-[45px]">
            <Image
              src="/logo.png"
              alt="Silk Road Marathon"
              width={45}
              height={20}
              className="object-contain w-full"
              priority
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 text-[12px] text-white rounded-full relative overflow-hidden"
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
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1E1E4A] p-1"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-4"
            >
              <div className="py-6 space-y-6">
                {navItems.map((item) => (
                  <motion.div
                    key={item.key}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <a
                      href={`#${item.key}`}
                      className="block text-[#1E1E4A] text-lg font-medium"
                      onClick={() => setIsOpen(false)}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 