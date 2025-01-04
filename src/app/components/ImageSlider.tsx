'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const slides = [
    {
      image: '/images/marathon1.jpg',
      alt: 'Silk Road Marathon'
    },
    {
      image: '/images/marathon2.jpg',
      alt: 'Cultural Journey'
    },
    {
      image: '/images/marathon3.jpg',
      alt: 'Adventure Run'
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slides.length) {
      setPage([newPage, newDirection]);
      setCurrentSlide(newPage);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      setCurrentSlide(nextSlide);
      setPage([nextSlide, 1]);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="w-full h-screen relative isolate overflow-hidden">
      {/* Click areas */}
      <button 
        className="absolute left-0 top-0 w-1/2 h-full z-20 cursor-pointer"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      />
      <button 
        className="absolute right-0 top-0 w-1/2 h-full z-20 cursor-pointer"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      />

      {/* Images with slide animation */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <nav className="flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setPage([index, index > currentSlide ? 1 : -1]);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </nav>
      </div>
    </div>
  );
} 