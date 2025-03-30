'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { getNews, getLocalizedValue, urlFor } from '../lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';


export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const news = await getNews(undefined, language);
        setNewsItems(news);
      } catch (error) {
        console.error('Error in NewsPage:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  // Function to get localized title based on language
  const getLocalizedTitle = () => {
    switch (language) {
      case 'ru':
        return 'Новости и обновления';
      case 'kg':
        return 'Жаңылыктар жана жаңыртуулар';
      default:
        return 'News & Updates';
    }
  };

  // Function to get localized subtitle based on language
  const getLocalizedSubtitle = () => {
    switch (language) {
      case 'ru':
        return 'Будьте в курсе последних новостей о наших марафонах и мероприятиях';
      case 'kg':
        return 'Биздин марафондор жана иш-чаралар жөнүндө акыркы жаңылыктардан кабардар болуңуз';
      default:
        return 'Stay updated with the latest news about our marathons and events';
    }
  };

  // Function to get localized empty state message
  const getLocalizedEmptyMessage = () => {
    switch (language) {
      case 'ru':
        return 'Нет доступных новостей.';
      case 'kg':
        return 'Жаңылыктар жок.';
      default:
        return 'No news articles available.';
    }
  };

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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E4A] mb-4">
              {getLocalizedTitle()}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {getLocalizedSubtitle()}
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-600 mb-8">
              <p>{error}</p>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))
            ) : newsItems.length > 0 ? (
              newsItems.map((item) => (
                <Link href={`/news/${item.slug || item._id}?lang=${language}`} key={item._id}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {item.image && (
                      <div className="relative h-48">
                        <Image
                          src={urlFor(item.image).url()}
                          alt={getLocalizedValue(item.title, language) || ''}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-[#1E1E4A] line-clamp-2">
                        {getLocalizedValue(item.title, language) || ''}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {getLocalizedValue(item.excerpt, language) || ''}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        {new Date(item._createdAt || item.publishedAt).toLocaleDateString(
                          getDateLocale(),
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">
                  {getLocalizedEmptyMessage()}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 