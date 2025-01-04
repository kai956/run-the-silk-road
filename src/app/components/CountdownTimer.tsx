'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Logo from './Logo';

export default function CountdownTimer() {
  const { language } = useLanguage();
  const t = translations[language].countdown;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-05-03T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 text-center">
      <div className="bg-[#1E1E4A] rounded-[40px] py-12 px-4 mb-8">
        <div className="flex justify-center">
          <motion.div
            className="bg-[#1E1E4A] text-white p-8 rounded-full"
            initial={{ width: '100px', opacity: 0 }}
            animate={{ width: '100%', opacity: 1, borderRadius: '48px' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-2xl font-semibold mb-6">{t.until}</h2>
              <div className="flex gap-8">
                {[
                  { value: timeLeft.days, label: t.days },
                  { value: timeLeft.hours, label: t.hours },
                  { value: timeLeft.minutes, label: t.minutes },
                  { value: timeLeft.seconds, label: t.seconds }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <motion.div 
                      className="text-4xl font-bold mb-2"
                      style={{
                        background: `linear-gradient(135deg, #FF6B6B, #4ECDC4)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.div>
                    <div className="text-sm opacity-80">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Logo />
    </div>
  );
} 