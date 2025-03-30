'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import MarathonSections from './components/MarathonSections';
import News from './components/NewsSection';
import PartnersLogos from './components/PartnersLogos';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import MarathonGrid from './components/MarathonGrid';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [heroSectionPassed, setHeroSectionPassed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add scroll listener to detect when user has scrolled past the hero section
    const handleScroll = () => {
      // Detect when we're past the hero section (about 100vh)
      if (window.scrollY > window.innerHeight * 0.9) {
        setHeroSectionPassed(true);
      } else {
        setHeroSectionPassed(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="relative flex flex-col">
      {/* The hero section with the parallax effect */}
      <MarathonSections />
      
      {/* The main content that should be visible after scrolling past heroes */}
      <div 
        className="relative z-[60] bg-white flex-grow"
        style={{ 
          opacity: heroSectionPassed ? 1 : 0.99, // Slight opacity difference to ensure proper rendering
          pointerEvents: 'auto' 
        }}
      >
        <Header />
        <div className="bg-white">
          <MarathonGrid />
          <News />
          {/* Partners section - shown on both mobile and desktop */}
          <section className="py-10 overflow-hidden mt-8">
            <div className="container mx-auto">
              <PartnersLogos showTitle={true} />
            </div>
          </section>
          <section className="py-20">
            <Organizers />
          </section>
          <Footer />
        </div>
      </div>
    </main>
  );
} 