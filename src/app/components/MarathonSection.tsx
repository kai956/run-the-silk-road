'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FlipText } from './FlipText';
import { ShimmerButton } from './ShimmerButton';

export default function MarathonSection() {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const titleLines = language === 'en' 
    ? ['Run the Silk', 'Road Marathon']
    : ['Марафон', 'Шелковый путь'];

  useEffect(() => {
    const targetDate = new Date('2024-05-26T09:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen bg-[#1E1E4A] text-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6"
            >
              <div className="overflow-hidden">
                {titleLines.map((line: string, index: number) => (
                  <FlipText
                    key={index}
                    word={line}
                    className="text-3xl sm:text-4xl md:text-7xl inline-block"
                  />
                ))}
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-xl mb-12 text-gray-200"
            >
              {language === 'en'
                ? "Run through historic landscapes"
                : "Бегите по историческим местах"}
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-white mb-12"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.days}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-80">
                  {language === 'en' ? 'Days' : 'Дней'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-80">
                  {language === 'en' ? 'Hours' : 'Часов'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-80">
                  {language === 'en' ? 'Minutes' : 'Минут'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-80">
                  {language === 'en' ? 'Seconds' : 'Секунд'}
                </div>
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ShimmerButton
                shimmerColor="rgba(255,255,255,0.2)"
                className="px-8 py-4 text-white border border-white/20 text-lg hover:scale-105 transition-transform"
              >
                {language === 'en' ? 'Register Now' : 'Зарегистрироваться'}
              </ShimmerButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 