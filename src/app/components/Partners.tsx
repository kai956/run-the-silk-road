'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Partners() {
  const { language } = useLanguage();
  const t = translations[language].partners;

  const partners = [
    { name: 'Partner 1', logo: '/logos/partner1.png' },
    { name: 'Partner 2', logo: '/logos/partner2.png' },
    { name: 'Partner 3', logo: '/logos/partner3.png' },
    { name: 'Partner 4', logo: '/logos/partner4.png' },
    { name: 'Partner 5', logo: '/logos/partner5.svg' }
  ];

  return (
    <div className="w-full overflow-hidden bg-[#1E1E4A]">
      <div className="flex items-center justify-center gap-12 md:gap-16 px-6 py-8 overflow-x-auto min-w-full">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={60}
              className="object-contain w-auto h-12 md:h-16 opacity-90 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 