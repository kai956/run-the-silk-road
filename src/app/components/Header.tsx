'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useScrollDirection } from '../hooks/useScrollDirection';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
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
    { key: 'register', label: t.register, href: '#register' },
    { key: 'volunteering', label: t.volunteering, href: '/volunteering' },
    { key: 'contact', label: t.contact, href: '#', onClick: scrollToFooter }
  ];

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-32'
    }`}>
      <nav className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between">
        <Link href="/" className="w-[60px] flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Silk Road Marathon"
            width={60}
            height={24}
            className="object-contain w-full"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-[#1E1E4A] hover:text-blue-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="px-4 py-1.5 text-[14px] text-white rounded-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#1E1E4A]" />
            <span className="relative z-10 font-medium">
              {language === 'en' ? 'RU' : 'EN'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
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
            className="text-[#1E1E4A] p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/90 backdrop-blur-md mt-2 rounded-2xl shadow-lg py-4"
        >
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-6 py-3 text-[#1E1E4A] hover:bg-gray-100 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
} 