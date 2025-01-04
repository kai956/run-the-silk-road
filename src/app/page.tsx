'use client';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CountdownTimer from './components/CountdownTimer';
import Organizers from './components/Organizers';
import PartnersLogos from './components/PartnersLogos';
import StatsSection from './components/StatsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="h-screen">
        <HeroSlider />
      </section>
      
      <section className="py-20 bg-white">
        <CountdownTimer />
      </section>

      <StatsSection />

      <section className="py-20 bg-white flex justify-center">
        <div className="relative w-[80%] rounded-3xl overflow-hidden bg-[#F5F5F5] p-20">
          <PartnersLogos />
        </div>
      </section>

      <section className="py-20 bg-white">
        <Organizers />
      </section>
    </main>
  );
} 