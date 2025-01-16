'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedGradientText } from './AnimatedGradientText';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { language } = useLanguage();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };

      if (difference < 0) {
        newTimeLeft = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function TimeUnit({ value, label, className }: { value: number; label: string; className?: string }) {
    return (
      <div className="flex flex-col items-center">
        <div className={`font-bold text-white ${className}`}>
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-[10px] md:text-sm text-white/80">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-1 md:space-y-6">
      <AnimatedGradientText className="text-[6px] sm:text-sm md:text-lg">
        {language === 'en' ? 'Time until marathon starts' : 'До начала марафона'}
      </AnimatedGradientText>
      <div className="flex justify-center gap-1 md:gap-6">
        <TimeUnit 
          value={timeLeft.days} 
          label={language === 'en' ? 'Days' : 'Дней'} 
          className="text-3xl md:text-7xl"
        />
        <div className="text-3xl md:text-7xl font-bold text-white">:</div>
        <TimeUnit 
          value={timeLeft.hours} 
          label={language === 'en' ? 'Hours' : 'Часов'} 
          className="text-3xl md:text-7xl"
        />
        <div className="text-3xl md:text-7xl font-bold text-white">:</div>
        <TimeUnit 
          value={timeLeft.minutes} 
          label={language === 'en' ? 'Minutes' : 'Минут'} 
          className="text-3xl md:text-7xl"
        />
        <div className="text-3xl md:text-7xl font-bold text-white">:</div>
        <TimeUnit 
          value={timeLeft.seconds} 
          label={language === 'en' ? 'Seconds' : 'Секунд'} 
          className="text-3xl md:text-7xl"
        />
      </div>
    </div>
  );
} 