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
import { FaChevronDown } from 'react-icons/fa';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';

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
        ru: 'Run the Silk Road\nШОС Марафон',
        kg: 'Run the Silk Road\nШКУ Марафон'
      },
      subtitle: {
        en: 'Run through historic landscapes',
        ru: 'Бегите по историческим местам',
        kg: 'Тарыхый жерлерде чуркаңыз'
      },
      date: '2025-05-03' // May 3, 2025
    },
    {
      id: 'one-run',
      image: '/images/marathon2.jpg',
      alt: 'ONE RUN Marathon',
      title: {
        en: 'ONE RUN\nMarathon',
        ru: 'ONE RUN\nМарафон',
        kg: 'ONE RUN\nМарафон'
      },
      subtitle: {
        en: 'Unite with runners from around the world',
        ru: 'Объединитесь с бегунами со всего мира',
        kg: 'Дүйнө жүзүндөгү чуркоочулар менен бириккиле'
      },
      date: '2024-09-15' // September 15, 2024
    }
  ];

  const initSmoothScrolling = () => {
    // Only initialize Lenis for the hero section animations
    lenisRef.current = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced from 1
      touchMultiplier: 1, // Reduced from 2
      infinite: false,
    });

    // Constrain Lenis to only affect scrolling within the MarathonSections component
    lenisRef.current.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
      // Only apply smooth scrolling to first section of the page
      if (progress > 0.95 || scroll > window.innerHeight * 1.5) {
        // Once we're past the hero sections, destroy Lenis to let native scrolling take over
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
      }
    });

    gsap.ticker.lagSmoothing(0);
    
    if (lenisRef.current) {
      const scrollFn = (time: number) => {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          requestAnimationFrame(scrollFn);
        }
      };
      requestAnimationFrame(scrollFn);
    }
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

    // Use a more reasonable height to prevent scrolling issues
    const totalHeight = sectionHeights.first + 50 + sectionHeights.second;
    
    // Set a fixed height for this container only
    gsap.set(containerRef.current, {
      height: `${Math.min(totalHeight, 200)}vh`, // Cap at 200vh to prevent excessive scrolling
      margin: 0,
      padding: 0
    });
  };

  useEffect(() => {
    let mounted = true;
    
    const init = () => {
      if (!mounted) return;
      
      // Initialize in sequence
      initSmoothScrolling();
      setupScrollAnimations();
    };

    preloadImages('.content__img').then(() => {
      if (mounted) {
        document.body.classList.remove('loading');
        // Small delay to ensure DOM is ready
        setTimeout(init, 100);
      }
    });

    // Clean up all scroll-related effects
    return () => {
      mounted = false;
      
      // Clean up Lenis
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      
      // Clean up GSAP
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Remove any classes added to the document
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      document.body.classList.remove('loading');
    };
  }, []);

  // Get the section title for the current language with fallback to English
  const getSectionTitle = (section: any) => {
    return section.title[language] || section.title['en'] || '';
  };

  // Get button text based on language
  const getButtonText = () => {
    switch (language) {
      case 'ru': return 'Присоединиться';
      case 'kg': return 'Катталуу';
      default: return 'Join Now';
    }
  };

  // Get scroll text based on language
  const getScrollText = () => {
    switch (language) {
      case 'ru': return 'Прокрутите вниз';
      case 'kg': return 'Төмөн жылдырыңыз';
      default: return 'Scroll Down';
    }
  };

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
                      {getSectionTitle(section).split('\n').map((line: string, i: number) => (
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
                    <InteractiveHoverButton 
                      text={getButtonText()} 
                      href="https://my.runthesilkroad.com/user/register"
                      external={true}
                      color="#4A90E2"
                      className="hidden md:block"
                    />
                    {/* Keep the original colorful button for mobile */}
                    <a 
                      href="https://my.runthesilkroad.com/user/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="md:hidden px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#4169E1] to-[#4A90E2]"
                    >
                      {getButtonText()}
                    </a>
                  </motion.div>
                  
                  {index === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                      className="absolute bottom-12 left-0 right-0 flex flex-col items-center text-white"
                    >
                      <p className="text-sm mb-2 opacity-80">{getScrollText()}</p>
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FaChevronDown className="text-2xl opacity-80" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 