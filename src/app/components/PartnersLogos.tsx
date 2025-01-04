'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { useState, useEffect } from 'react';

export default function PartnersLogos() {
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

  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
        {t.partners.title}
      </h2>

      <div className="relative max-w-[95vw] md:max-w-[90vw] mx-auto">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-20 bg-gradient-to-r from-[#F5F5F5] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-6 md:w-20 bg-gradient-to-l from-[#F5F5F5] to-transparent z-10" />

        {/* Container to clip animation */}
        <div className="overflow-hidden">
          <div className="inline-flex animate-scroll">
            {/* First set of logos */}
            <div className="flex gap-2 md:gap-16 items-center">
              {partners.map((partner, index) => (
                <div 
                  key={`first-${partner.name}-${index}`}
                  className="w-14 md:w-40 h-10 md:h-24 relative transition-transform duration-300 hover:scale-110"
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
            {/* Second set of logos */}
            <div className="flex gap-2 md:gap-16 items-center">
              {partners.map((partner, index) => (
                <div 
                  key={`second-${partner.name}-${index}`}
                  className="w-14 md:w-40 h-10 md:h-24 relative transition-transform duration-300 hover:scale-110"
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
        </div>
      </div>
    </div>
  );
} 