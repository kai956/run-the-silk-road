'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useState, useEffect } from 'react';

export default function PartnersLogos({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const partners = [
    { name: 'Partner 1', logo: '/logos/partner1.png' },
    { name: 'Partner 2', logo: '/logos/partner2.png' },
    { name: 'Partner 3', logo: '/logos/partner3.png' },
    { name: 'Partner 4', logo: '/logos/partner4.png' },
    { name: 'Partner 5', logo: '/logos/partner5.svg' }
  ];

  if (isMobile) {
    return (
      <div className={`w-full bg-[#1E1E4A] ${className}`}>
        <div className="grid grid-cols-2 gap-8 px-6 max-w-md mx-auto py-8">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="aspect-[3/2] relative"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1E1E4A]"
      >
        {t.partners.title}
      </motion.h2>

      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 items-center whitespace-nowrap px-16"
        >
          {/* First set of logos */}
          <div className="flex gap-16 items-center">
            {partners.map((partner) => (
              <div 
                key={partner.name}
                className="w-48 h-32 relative"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex gap-16 items-center">
            {partners.map((partner) => (
              <div 
                key={`${partner.name}-duplicate`}
                className="w-48 h-32 relative"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 