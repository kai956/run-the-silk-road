'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Partners() {
  const { language } = useLanguage();
  const t = translations[language].partners;

  const partners = [
    { src: '/images/partners/oa.png', alt: 'OA' },
    { src: '/images/partners/globus.png', alt: 'Globus' },
    { src: '/images/partners/kanda.png', alt: 'Kanda Software' },
    { src: '/images/partners/apple.png', alt: 'Apple' },
  ];

  return (
    <section className="py-12 bg-white/90 rounded-3xl my-8 mx-4 md:mx-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#1E1E4A]">
          {t.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-32 h-16 relative"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 