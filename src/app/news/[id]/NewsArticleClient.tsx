'use client';

import { useLanguage } from '../../context/LanguageContext';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { getNewsById, getLocalizedValue, urlFor } from '../../lib/sanity';
import { useRouter, useSearchParams } from 'next/navigation';

interface NewsArticleClientProps {
  article: any;
}

export default function NewsArticleClient({ article: initialArticle }: NewsArticleClientProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [article, setArticle] = useState(initialArticle);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleId = article._id;
      const updatedArticle = await getNewsById(articleId, language);
      if (updatedArticle) {
        setArticle(updatedArticle);
      }
      // Update URL with current language
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('lang', language);
      router.push(`?${currentParams.toString()}`, { scroll: false });
    };

    fetchArticle();
  }, [language, article._id, router, searchParams]); // Re-fetch when language changes

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl text-gray-600">
            {language === 'kg' ? 'Макала табылган жок' : language === 'ru' ? 'Статья не найдена' : 'Article not found'}
          </h1>
        </div>
      </div>
    );
  }

  // Get localized content
  const title = getLocalizedValue(article.title, language);
  const content = getLocalizedValue(article.content, language);
  
  // Get localized description
  const getLocalizedDescription = () => {
    switch (language) {
      case 'ru':
        return 'Читайте последние обновления в этой статье.';
      case 'kg':
        return 'Бул макаладагы акыркы жаңылыктарды окуңуз.';
      default:
        return 'Read the latest updates on this article.';
    }
  };

  // Get localized empty content message
  const getLocalizedEmptyContent = () => {
    switch (language) {
      case 'ru':
        return 'Содержание недоступно.';
      case 'kg':
        return 'Мазмуну жеткиликтүү эмес.';
      default:
        return 'No content available.';
    }
  };

  // Image alt text
  const imageAlt = title || '';

  // Header for the article
  const header = (
    <header className="text-center mb-8">
      <h2 className="text-3xl font-bold text-[#1E1E4A]">
        {title || (language === 'kg' ? 'Аталышы жок макала' : language === 'ru' ? 'Статья без названия' : 'Untitled Article')}
      </h2>
      <p className="text-gray-600">
        {getLocalizedDescription()}
      </p>
    </header>
  );

  // Portable Text components configuration
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({value}: {value: any}) => {
        return (
          <div className="my-8">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Article image'}
              width={800}
              height={500}
              className="rounded-lg mx-auto"
            />
            {value.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>
            )}
          </div>
        );
      },
    },
    block: {
      h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-[#1E1E4A]">{children}</h1>,
      h2: ({children}) => <h2 className="text-2xl font-bold mb-4 text-[#1E1E4A]">{children}</h2>,
      h3: ({children}) => <h3 className="text-xl font-bold mb-3 text-[#1E1E4A]">{children}</h3>,
      h4: ({children}) => <h4 className="text-lg font-bold mb-3 text-[#1E1E4A]">{children}</h4>,
      normal: ({children}) => <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>,
      blockquote: ({children}) => (
        <blockquote className="border-l-4 border-[#1E1E4A] pl-4 italic mb-6 text-gray-600">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({children}) => <strong className="font-bold">{children}</strong>,
      em: ({children}) => <em className="italic">{children}</em>,
      code: ({children}) => (
        <code className="bg-gray-100 rounded px-2 py-1 font-mono text-sm">{children}</code>
      ),
    },
    list: {
      bullet: ({children}) => <ul className="list-disc pl-6 mb-6 text-gray-700">{children}</ul>,
      number: ({children}) => <ol className="list-decimal pl-6 mb-6 text-gray-700">{children}</ol>,
    },
    listItem: {
      bullet: ({children}) => <li className="mb-2">{children}</li>,
      number: ({children}) => <li className="mb-2">{children}</li>,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <Header />
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            {header}

            {/* Featured Image */}
            {article.image && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(article.image).url()}
                  alt={imageAlt || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {content ? (
                <PortableText value={content} components={components} />
              ) : (
                <p className="text-center text-gray-600">
                  {getLocalizedEmptyContent()}
                </p>
              )}
            </div>
          </motion.div>
        </article>
      </div>
    </main>
  );
} 