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

  // Get text based on the current language
  const getUntilText = () => {
    switch (language) {
      case 'ru':
        return 'До начала марафона';
      case 'kg':
        return 'Марафон башталганга чейин';
      default:
        return 'Time until marathon starts';
    }
  };

  // Get label for time units based on language
  const getTimeLabel = (type: 'days' | 'hours' | 'minutes' | 'seconds') => {
    const labels: Record<string, Record<string, string>> = {
      days: {
        en: 'Days',
        ru: 'Дней',
        kg: 'Күн'
      },
      hours: {
        en: 'Hours',
        ru: 'Часов',
        kg: 'Саат'
      },
      minutes: {
        en: 'Minutes',
        ru: 'Минут',
        kg: 'Мүнөт'
      },
      seconds: {
        en: 'Seconds',
        ru: 'Секунд',
        kg: 'Секунд'
      }
    };

    return labels[type][language] || labels[type]['en'];
  };

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
        {getUntilText()}
      </AnimatedGradientText>
      <div className="flex justify-center gap-1 md:gap-6">
        <TimeUnit 
          value={timeLeft.days} 
          label={getTimeLabel('days')} 
          className="text-3xl md:text-7xl"
        />
        <div className="text-3xl md:text-7xl font-bold text-white">:</div>
        <TimeUnit 
          value={timeLeft.hours} 
          label={getTimeLabel('hours')} 
          className="text-3xl md:text-7xl"
        />
        <div className="text-3xl md:text-7xl font-bold text-white">:</div>
        <TimeUnit 
          value={timeLeft.minutes} 
          label={getTimeLabel('minutes')} 
          className="text-3xl md:text-7xl"
        />
        <div className="text-3xl md:text-7xl font-bold text-white">:</div>
        <TimeUnit 
          value={timeLeft.seconds} 
          label={getTimeLabel('seconds')} 
          className="text-3xl md:text-7xl"
        />
      </div>
    </div>
  );
} 