'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import ColorfulButton from './ui/ColorfulButton';

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
      title: language === 'en' 
        ? 'Silk Road SHOS Marathon 2025' 
        : language === 'ru' 
          ? 'Марафон Шелкового пути ШОС 2025'
          : 'Жибек жолу ШКУ марафону 2025',
      date: '2025-05-03',
      location: language === 'en' 
        ? 'Bishkek, Kyrgyzstan' 
        : language === 'ru' 
          ? 'Бишкек, Кыргызстан'
          : 'Бишкек, Кыргызстан',
      distance: '42km',
      image: '/images/marathon-placeholder-1.jpg',
      description: language === 'en' 
        ? 'Experience the historic Silk Road route through breathtaking landscapes'
        : language === 'ru'
          ? 'Испытайте исторический маршрут Шелкового пути через захватывающие пейзажи'
          : 'Тарыхый Жибек жолу маршрутун кооз пейзаждар аркылуу сынап көрүңүз',
      registrationOpen: true
    },
    {
      id: 'one-run-2024',
      title: language === 'en' 
        ? 'ONE RUN Marathon 2024' 
        : language === 'ru' 
          ? 'ONE RUN Марафон 2024'
          : 'ONE RUN Марафон 2024',
      date: '2024-09-15',
      location: language === 'en' 
        ? 'Issyk Kul, Kyrgyzstan' 
        : language === 'ru' 
          ? 'Иссык-Куль, Кыргызстан'
          : 'Ысык-Көл, Кыргызстан',
      distance: '35km',
      image: '/images/marathon-placeholder-2.jpg',
      description: language === 'en'
        ? 'Unite with runners from around the world in the beautiful mountains of Kyrgyzstan'
        : language === 'ru'
          ? 'Объединитесь с бегунами со всего мира в красивых горах Кыргызстана'
          : 'Дүйнө жүзүндөгү чуркоочулар менен Кыргызстандын кооз тоолорунда бириккиле',
      registrationOpen: true
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let locale = 'en-US';
    
    if (language === 'ru') {
      locale = 'ru-RU';
    } else if (language === 'kg') {
      locale = 'ky-KG';
    }
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Get text for buttons based on language
  const getButtonText = (isOpen: boolean) => {
    if (isOpen) {
      if (language === 'ru') return 'Зарегистрироваться';
      if (language === 'kg') return 'Катталуу';
      return 'Register Now';
    } else {
      if (language === 'ru') return 'Скоро открытие';
      if (language === 'kg') return 'Жакында ачылат';
      return 'Coming Soon';
    }
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
          {language === 'en' 
            ? 'Upcoming Marathons' 
            : language === 'ru'
              ? 'Предстоящие марафоны'
              : 'Келе жаткан марафондор'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                    {formatDate(marathon.date)}
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

                {marathon.registrationOpen ? (
                  <ColorfulButton 
                    label={getButtonText(true)}
                    href="https://my.runthesilkroad.com/user/register"
                    external={true}
                    size="md"
                    className="w-full"
                  />
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 rounded-full text-white font-semibold bg-gray-400"
                    disabled
                  >
                    {getButtonText(false)}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 