'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function HeroSlider() {
  const { language } = useLanguage();
  const t = translations[language].heroSlider;
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      image: '/images/marathon1.jpg',
      title: t.slide1.title,
      buttonText: t.slide1.buttonText,
      buttonLink: '/ways-to-run'
    },
    {
      image: '/images/marathon2.jpg',
      title: t.slide2.title,
      buttonText: t.slide2.buttonText,
      buttonLink: '/about'
    },
    {
      image: '/images/marathon3.jpg',
      title: t.slide3.title,
      buttonText: t.slide3.buttonText,
      buttonLink: '/register'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => 
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    // Prevent default scrolling behavior
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left
      setCurrentSlide((current) => 
        current === slides.length - 1 ? 0 : current + 1
      );
    } else {
      // Swiped right
      setCurrentSlide((current) => 
        current === 0 ? slides.length - 1 : current - 1
      );
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div 
      ref={sliderRef}
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30">
              <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-16 md:pb-32">
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-8">
                  {slide.title}
                </h1>
                <div className="relative w-fit">
                  <a
                    href={slide.buttonLink}
                    className="inline-block px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg font-semibold relative overflow-hidden"
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div className="absolute inset-0 bg-white" />
                    
                    <motion.div
                      className="absolute inset-0 bg-[#4A90E2]"
                      initial={{ x: '-100%' }}
                      animate={{ 
                        x: hoveredButton === index ? '0%' : '-100%'
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />

                    <span className={`relative z-10 ${hoveredButton === index ? 'text-white' : 'text-[#2A4B8C]'}`}>
                      {slide.buttonText}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide((current) => 
          current === 0 ? slides.length - 1 : current - 1
        )}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 
                   p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((current) => 
          current === slides.length - 1 ? 0 : current + 1
        )}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 
                   p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors
                      ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 