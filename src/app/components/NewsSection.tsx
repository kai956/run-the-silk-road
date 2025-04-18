'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaSmile, FaCalendarAlt, FaTag } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { getNews, getLocalizedValue, urlFor } from '../lib/sanity';

export default function NewsSection() {
  const { language } = useLanguage();
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(3, language); // Fetch only 3 items with correct language
        console.log('Fetched news data:', data);
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [language]); // Re-fetch when language changes

  // Get locale for date formatting
  const getDateLocale = () => {
    switch (language) {
      case 'ru':
        return 'ru-RU';
      case 'kg':
        return 'ky-KG';
      default:
        return 'en-US';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-[#1E1E4A] mb-12 text-center"
        >
          {language === 'kg' ? 'Акыркы жаңылыктар' : 
           language === 'ru' ? 'Последние новости' : 
           'Latest News'}
        </motion.h2>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <div className="p-6 bg-white rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : newsItems.length > 0 ? (
            newsItems.map((item) => (
              <Link href={`/news/${item.slug || item._id}?lang=${language}`} key={item._id}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  className="card cursor-pointer transition-shadow hover:shadow-xl"
                >
                  {item.image ? (
                    <div className="relative h-48">
                      <Image
                        src={urlFor(item.image).url()}
                        alt={getLocalizedValue(item.title, language) || ''}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                      <FaSmile className="w-24 h-24 text-gray-300" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FaTag className="text-[#4A90E2]" />
                      <span className="text-sm font-semibold text-[#4A90E2]">
                        {item.category || ''}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-[#1E1E4A]">
                      {getLocalizedValue(item.title, language) || ''}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {getLocalizedValue(item.excerpt, language) || ''}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <FaCalendarAlt />
                        {new Date(item._createdAt || item.publishedAt).toLocaleDateString(
                          getDateLocale(),
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600">
                {language === 'kg' ? 'Жаңылыктар жок.' : 
                 language === 'ru' ? 'Нет доступных новостей.' : 
                 'No news articles available.'}
              </p>
            </div>
          )}
        </div>

        {/* View All News Button */}
        {!isLoading && newsItems.length > 0 && (
          <div className="mt-16 flex justify-center items-center">
            <Link href="/news" className="inline-block">
              <button className="px-12 py-3.5 text-[#1E1E4A] font-medium text-base border border-[#1E1E4A] rounded-full hover:bg-[#1E1E4A] hover:text-white transition-all duration-300">
                {language === 'kg' ? 'Бардык жаңылыктарды көрүү' : 
                 language === 'ru' ? 'Все новости' : 
                 'View All News'}
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 