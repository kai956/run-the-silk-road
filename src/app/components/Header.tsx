'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';

export default function Header() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isVisible = useScrollDirection();
  const t = translations[language];

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { key: 'about', label: t.about, href: '/about' },
    { key: 'blog', label: t.blog, href: '/news' },
    { key: 'volunteering', label: t.volunteering, href: '/volunteering' },
    { key: 'contact', label: t.contact, href: 'tel:+996312886410', external: true }
  ];

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1250px] z-[100] transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-32'
    }`}>
      <nav className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg px-4 py-2.5 flex items-center">
        {/* Logo - Left Side */}
        <div className="w-[60px] flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Silk Road Marathon"
              width={60}
              height={24}
              className="object-contain w-full"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation - Centered with right offset */}
        <div className="hidden md:flex flex-1 items-center justify-center ml-10">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-[#1E1E4A] hover:text-blue-600 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-[#1E1E4A] hover:text-blue-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Language Switcher - Right Side */}
        <div className="hidden md:flex items-center ml-auto">
          <div className="bg-gray-100 rounded-full p-1 flex items-center">
            {['en', 'ru', 'kg'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang as 'en' | 'ru' | 'kg')}
                className={`relative px-4 py-1.5 text-[14px] rounded-full font-medium transition-colors z-10 ${
                  language === lang ? 'text-white' : 'text-[#1E1E4A]'
                }`}
              >
                {lang.toUpperCase()}
                {language === lang && (
                  <motion.div
                    layoutId="language-indicator"
                    className="absolute inset-0 bg-blue-500 rounded-full -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4 ml-auto">
          <div className="bg-gray-100 rounded-full p-1 flex items-center">
            {['en', 'ru', 'kg'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang as 'en' | 'ru' | 'kg')}
                className={`relative px-2 py-1 text-[11px] rounded-full font-medium transition-colors z-10 ${
                  language === lang ? 'text-white' : 'text-[#1E1E4A]'
                }`}
              >
                {lang.toUpperCase()}
                {language === lang && (
                  <motion.div
                    layoutId="mobile-language-indicator"
                    className="absolute inset-0 bg-blue-500 rounded-full -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1E1E4A] p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/80 backdrop-blur-md mt-2 rounded-3xl shadow-lg py-4 z-[101] relative"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.key}
                    href={item.href}
                    className="px-6 py-3 text-[#1E1E4A] transition-colors font-medium outline-none"
                    onClick={() => setIsOpen(false)}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="px-6 py-3 text-[#1E1E4A] transition-colors font-medium outline-none"
                    onClick={() => setIsOpen(false)}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 