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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="relative">
      <MarathonSections />
      <div className="relative z-[60]">
        <Header />
        <div className="bg-white">
          <MarathonGrid />
          <News />
          {!isMobile && (
            <section className="py-20 flex justify-center">
              <div className="relative w-[80%] rounded-3xl overflow-hidden">
                <PartnersLogos />
              </div>
            </section>
          )}
          <section className="py-20">
            <Organizers />
          </section>
          <Footer />
          {isMobile && <PartnersLogos />}
        </div>
      </div>
    </main>
  );
} 