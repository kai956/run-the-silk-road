'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaRoute } from 'react-icons/fa';

interface Marathon {
  id: string;
  title: string;
  date: string;
  location: string;
  distance: string;
  image: string;
  description: string;
  registrationOpen: boolean;
}

export default function MarathonGrid() {
  const { language } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // This would eventually come from an API/database
  const marathons: Marathon[] = [
    {
      id: 'silk-road-2025',
      title: language === 'en' ? 'Silk Road Marathon 2025' : 'Марафон Шелкового пути 2025',
      date: '2025-05-03',
      location: language === 'en' ? 'Bishkek, Kyrgyzstan' : 'Бишкек, Кыргызстан',
      distance: '42km',
      image: '/images/marathon-placeholder-1.jpg',
      description: language === 'en' 
        ? 'Experience the historic Silk Road route through breathtaking landscapes'
        : 'Испытайте исторический маршрут Шелкового пути через захватывающие пейзажи',
      registrationOpen: true
    },
    {
      id: 'mountain-trail-2024',
      title: language === 'en' ? 'Mountain Trail Marathon 2024' : 'Горный марафон 2024',
      date: '2024-08-15',
      location: language === 'en' ? 'Issyk Kul, Kyrgyzstan' : 'Иссык-Куль, Кыргызстан',
      distance: '35km',
      image: '/images/marathon-placeholder-2.jpg',
      description: language === 'en'
        ? 'Challenge yourself in the beautiful mountains of Kyrgyzstan'
        : 'Испытайте себя в красивых горах Кыргызстана',
      registrationOpen: true
    },
    {
      id: 'desert-ultra-2024',
      title: language === 'en' ? 'Desert Ultra Marathon 2024' : 'Пустынный Ультрамарафон 2024',
      date: '2024-10-20',
      location: language === 'en' ? 'Almaty, Kazakhstan' : 'Алматы, Казахстан',
      distance: '50km',
      image: '/images/marathon-placeholder-3.jpg',
      description: language === 'en'
        ? 'An epic ultra-marathon through the stunning desert landscapes'
        : 'Эпический ультрамарафон по потрясающим пустынным ландшафтам',
      registrationOpen: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1E1E4A]"
        >
          {language === 'en' ? 'Upcoming Marathons' : 'Предстоящие марафоны'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marathons.map((marathon) => (
            <motion.div
              key={marathon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white"
              onMouseEnter={() => setHoveredCard(marathon.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                <FaSmile className="w-24 h-24 text-gray-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#1E1E4A]">
                  {marathon.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaCalendarAlt />
                    {new Date(marathon.date).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'ru-RU',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {marathon.location}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaRoute />
                    {marathon.distance}
                  </p>
                </div>
                <p className="text-gray-700 mb-6">
                  {marathon.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-full text-white font-semibold
                    ${marathon.registrationOpen ? 'bg-[#4A90E2]' : 'bg-gray-400'}`}
                  disabled={!marathon.registrationOpen}
                >
                  {marathon.registrationOpen
                    ? (language === 'en' ? 'Register Now' : 'Зарегистрироваться')
                    : (language === 'en' ? 'Coming Soon' : 'Скоро открытие')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 