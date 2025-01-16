'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaSmile, FaCalendarAlt, FaTag } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { getNews } from '../lib/contentful';

export default function NewsSection() {
  const { language } = useLanguage();
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const locale = language === 'en' ? 'en-US' : 'ru-RU';
        const data = await getNews(3, locale); // Fetch only 3 items with correct locale
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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-[#1E1E4A] mb-12 text-center"
        >
          {language === 'en' ? 'Latest News' : 'Последние новости'}
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
              <Link href={`/news/${item.sys.id}`} key={item.sys.id}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  className="card cursor-pointer transition-shadow hover:shadow-xl"
                >
                  {item.fields?.image?.fields?.file?.url ? (
                    <div className="relative h-48">
                      <Image
                        src={`https:${item.fields.image.fields.file.url}`}
                        alt={item.fields.title?.[language] || ''}
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
                        {item.fields?.category || ''}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-[#1E1E4A]">
                      {item.fields?.title || ''}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {item.fields?.excerpt || ''}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <FaCalendarAlt />
                        {new Date(item.sys.createdAt).toLocaleDateString(
                          language === 'en' ? 'en-US' : 'ru-RU',
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
                {language === 'en' ? 'No news articles available.' : 'Нет доступных новостей.'}
              </p>
            </div>
          )}
        </div>

        {/* View All News Button */}
        {!isLoading && newsItems.length > 0 && (
          <div className="mt-16 flex justify-center items-center">
            <Link href="/news" className="inline-block">
              <button className="px-12 py-3.5 text-[#1E1E4A] font-medium text-base border border-[#1E1E4A] rounded-full hover:bg-[#1E1E4A] hover:text-white transition-all duration-300">
                {language === 'en' ? 'View All News' : 'Все новости'}
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 