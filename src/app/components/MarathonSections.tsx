'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { preloadImages } from '../utils';
import CountdownTimer from '../components/CountdownTimer';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import ShineBorder from './ui/ShineBorder';
import { AnimatedShinyText } from './AnimatedShinyText';
import { FlipText } from './FlipText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarathonSections() {
  const containerRef = useRef(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { language } = useLanguage();

  const sections = [
    {
      id: 'silk-road',
      image: '/images/marathon1.jpg',
      alt: 'Run the Silk Road Marathon',
      title: {
        en: 'Run the Silk Road\nSHOS Marathon',
        ru: 'Run the Silk Road\nШОС Марафон'
      },
      subtitle: {
        en: 'Run through historic landscapes',
        ru: 'Бегите по историческим местам'
      },
      date: '2025-05-03' // May 3, 2025
    },
    {
      id: 'one-run',
      image: '/images/marathon2.jpg',
      alt: 'ONE RUN Marathon',
      title: {
        en: 'ONE RUN\nMarathon',
        ru: 'ONE RUN\nМарафон'
      },
      subtitle: {
        en: 'Unite with runners from around the world',
        ru: 'Объединитесь с бегунами со всего мира'
      },
      date: '2024-09-15' // September 15, 2024
    }
  ];

  const initSmoothScrolling = () => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    gsap.ticker.lagSmoothing(0);
    
    const scrollFn = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);
  };

  const setupScrollAnimations = () => {
    const contentElements = document.querySelectorAll('.content--sticky');
    const totalContentElements = contentElements.length;
    
    const sectionHeights = {
      first: 60,    // First slide animation duration
      second: 80    // Second slide animation duration
    };

    const getStartPosition = (pos: number) => {
      if (pos === 0) return 0;
      return sectionHeights.first + 50; // 50vh gap between slides
    };

    contentElements.forEach((el, position) => {
      const isLast = position === totalContentElements - 1;
      
      if (position > 0) {
        const startPos = getStartPosition(position);
        const sectionHeight = sectionHeights.second;

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${startPos}vh top`,
            end: `${startPos + sectionHeight}vh top`,
            scrub: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            pin: false,
            markers: false
          }
        })
        .fromTo(el, 
          {
            y: '100%',
            scale: 1
          },
          {
            y: '0%',
            scale: 1,
            ease: 'power2.inOut'
          }
        );
      }

      if (!isLast) {
        const startPos = getStartPosition(position + 1);
        const sectionHeight = sectionHeights.second;

        gsap.to(el, {
          scale: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${startPos}vh top`,
            end: `${startPos + sectionHeight}vh top`,
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false
          }
        });
      }
    });

    const totalHeight = sectionHeights.first + 50 + sectionHeights.second;
    
    gsap.set(containerRef.current, {
      height: `${totalHeight}vh`,
      margin: 0,
      padding: 0
    });
  };

  useEffect(() => {
    const init = () => {
      initSmoothScrolling();
      setupScrollAnimations();
    };

    preloadImages('.content__img').then(() => {
      document.body.classList.remove('loading');
      init();
    });

    return () => {
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      style={{ 
        zIndex: 50,
        margin: 0,
        padding: 0
      }}
    >
      {sections.map((section, index) => (
        <div 
          key={section.id}
          className="content--sticky"
          style={{ 
            zIndex: index + 1,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            margin: 0,
            padding: 0,
            transform: `translate3d(0, ${index === 0 ? '0%' : '100%'}, 0)`
          }}
        >
          <div className="relative w-full h-full">
            <img 
              src={section.image}
              alt={section.alt}
              className="content__img w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40">
              <div className="max-w-7xl mx-auto px-4 md:px-12 h-full flex flex-col justify-center">
                <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full flex flex-col items-center"
                  >
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight text-center w-full max-w-4xl mx-auto">
                      {section.title[language as keyof typeof section.title].split('\n').map((line, i) => (
                        <div key={i} className="mb-2 overflow-hidden flex justify-center whitespace-nowrap">
                          <FlipText
                            word={line.trim()}
                            className="text-3xl sm:text-5xl md:text-7xl font-bold inline-block"
                            duration={0.6}
                            delayMultiple={0.1}
                          />
                        </div>
                      ))}
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full max-w-xl mx-auto px-4"
                  >
                    <CountdownTimer targetDate={section.date} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex justify-center"
                  >
                    <ShineBorder
                      color="#3b82f6"
                      hover={true}
                      className="group"
                    >
                      <button className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full transition-all duration-300">
                        {language === 'en' ? 'Join Now' : 'Присоединиться'}
                      </button>
                    </ShineBorder>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 