'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function PartnersLogos() {
  const { language } = useLanguage();
  const t = translations[language];

  const partners = [
    { name: 'OA', logo: '/logos/partner1.png' },
    { name: 'Globus', logo: '/logos/partner2.png' },
    { name: 'Kanda Software', logo: '/logos/partner3.png' },
    { name: 'Apple', logo: '/logos/partner4.png' }
  ];

  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
        {t.partners.title}
      </h2>

      <div className="relative max-w-[90vw] mx-auto">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-[#F5F5F5] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-[#F5F5F5] to-transparent z-10" />

        {/* Container to clip animation */}
        <div className="overflow-hidden">
          {/* Infinite Scroll Container */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-12 md:gap-16 items-center whitespace-nowrap"
          >
            {/* First set of logos */}
            <div className="flex gap-12 md:gap-16 items-center">
              {partners.map((partner) => (
                <div 
                  key={partner.name} 
                  className="w-32 md:w-40 h-20 md:h-24 relative transition-transform duration-300 hover:scale-110"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex gap-12 md:gap-16 items-center">
              {partners.map((partner) => (
                <div 
                  key={`${partner.name}-duplicate`} 
                  className="w-32 md:w-40 h-20 md:h-24 relative transition-transform duration-300 hover:scale-110"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 