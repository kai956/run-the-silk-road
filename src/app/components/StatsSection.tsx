'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface SplitTypeInstance {
  chars?: HTMLElement[];
  words?: HTMLElement[];
  revert: () => void;
}

export default function StatsSection() {
  const { language } = useLanguage();
  const t = translations[language].stats;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const titleSplitRef = useRef<SplitTypeInstance | null>(null);
  const descriptionSplitRef = useRef<SplitTypeInstance | null>(null);

  useEffect(() => {
    const cleanup = () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      titleSplitRef.current?.revert();
      descriptionSplitRef.current?.revert();
    };

    cleanup();

    const timer = setTimeout(() => {
      if (!titleRef.current || !descriptionRef.current) return;

      titleSplitRef.current = new SplitType(titleRef.current, {
        types: 'chars',
        tagName: 'span'
      }) as SplitTypeInstance;

      descriptionSplitRef.current = new SplitType(descriptionRef.current, {
        types: 'words',
        tagName: 'span'
      }) as SplitTypeInstance;

      gsap.set([
        titleSplitRef.current?.chars || [], 
        descriptionSplitRef.current?.words || []
      ], {
        filter: 'blur(12px)',
        opacity: 0,
        scale: 0.9
      });

      gsap.to(titleSplitRef.current?.chars || [], {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 1
        },
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 1
      });

      gsap.to(descriptionSplitRef.current?.words || [], {
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 1
        },
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        stagger: 0.02,
        duration: 1
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [language]);

  const stats = [
    {
      value: t.stats.runners,
      label: t.runners,
    },
    {
      value: t.stats.distance,
      label: t.distance,
    },
    {
      value: t.stats.countries,
      label: t.countries,
    },
    {
      value: t.stats.charity,
      label: t.charity,
    },
  ];

  return (
    <section key={language} className="relative min-h-screen w-full py-10 md:py-20 flex flex-col items-center justify-center gap-8 md:gap-16">
      <div className="text-center max-w-5xl mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1E4A] overflow-hidden whitespace-normal break-words hyphens-none"
        >
          {t.experienceTitle}
        </h2>
        <p 
          ref={descriptionRef}
          className="text-lg md:text-xl text-gray-600 mb-8 overflow-hidden"
        >
          {t.experienceDescription}
        </p>
      </div>

      {/* Map Container */}
      <motion.div 
        className="relative w-[92%] md:w-[80%] h-[40vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-red-900 mix-blend-multiply" />
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "tween", duration: 0.8 }}
        >
          <Image
            src="/images/silk-road-map.jpg"
            alt="Silk Road Map"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Stats Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-[#1E1E4A] text-center"
            >
              <motion.h3 
                className="text-3xl md:text-6xl font-bold mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-xs md:text-sm tracking-wider opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 