'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useState, useEffect } from 'react';

export default function PartnersLogos({ className = "", showTitle = true }: { className?: string; showTitle?: boolean }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);
  const isDarkBg = false;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const partners = [
    { name: 'SCO', logo: '/logos/лого ШОС.png' },
    { name: 'SCO Window', logo: '/logos/Окно в ШОС.png' },
    { name: 'СБНОН', logo: '/logos/СБНОН.png' },
    { name: 'Здоровье', logo: '/logos/Здоровье 150x200.png' },
    { name: 'Евразия', logo: '/logos/Евразия.png' },
    { name: 'Timely', logo: '/logos/Timely.png' },
    { name: 'Shanghe cultural sports', logo: '/logos/Shanghe cultural sports.png' },
    { name: 'Shanghai art fair', logo: '/logos/Shanghai art fair.png' },
    { name: 'Здоровье', logo: '/logos/Logo_основной_для светлых фонов Здоровье.png' },
    { name: 'Globus', logo: '/logos/Logo_Globus_1_page-0001.jpg' },
    { name: 'Logo 05', logo: '/logos/logo_05.png' },
    { name: 'Kanda', logo: '/logos/Kanda.png' },
    { name: 'GLOBUS', logo: '/logos/GLOBUS.png' },
    { name: 'Белая река', logo: '/logos/150x200 Белая река.png' }
  ];

  // Duplicate partners array for seamless carousel
  const allPartners = [...partners, ...partners, ...partners];
  
  const renderLogos = () => {
    return (
      <div className="relative overflow-hidden">
        {/* Fades for light background */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex items-center gap-6 md:gap-10 px-4"
        >
          {allPartners.map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center bg-white p-2 rounded-lg h-20 w-40 md:h-24 md:w-48 shadow-sm"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={240}
                  height={180}
                  className="object-contain w-auto h-auto max-w-full max-h-full mx-auto"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="w-full py-8">
        <h3 className="text-2xl font-bold text-center mb-8 text-[#1E1E4A]">
          {t.partners.title}
        </h3>
        {renderLogos()}
      </div>
    );
  }

  return (
    <section className="py-10">
      {showTitle && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1E1E4A]"
        >
          {t.partners.title}
        </motion.h2>
      )}

      {renderLogos()}
    </section>
  );
} 