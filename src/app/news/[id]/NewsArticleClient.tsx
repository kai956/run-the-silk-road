'use client';

import { useLanguage } from '../../context/LanguageContext';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Document } from '@contentful/rich-text-types';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { getNewsById } from '../../lib/contentful';
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
      const locale = language === 'en' ? 'en-US' : 'ru-RU';
      const articleId = article.sys.id;
      const updatedArticle = await getNewsById(articleId, locale);
      if (updatedArticle) {
        setArticle(updatedArticle);
      }
      // Update URL with current language
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('lang', language);
      router.push(`?${currentParams.toString()}`, { scroll: false });
    };

    fetchArticle();
  }, [language]); // Re-fetch when language changes

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl text-gray-600">
            {language === 'en' ? 'Article not found' : 'Статья не найдена'}
          </h1>
        </div>
      </div>
    );
  }

  // Debug logging to check the structure of the article data
  console.log('Article fields:', article.fields);
  console.log('Current language:', language);

  // Get content directly from fields - Contentful already provides localized content
  const title = article.fields?.title;
  const content = article.fields?.content;
  const description = language === 'en' 
    ? 'Read the latest updates on this article.' 
    : 'Читайте последние обновления в этой статье.';

  // Image alt text
  const imageAlt = article.fields?.title || '';

  // Header for the article
  const header = (
    <header className="text-center mb-8">
      <h2 className="text-3xl font-bold text-[#1E1E4A]">
        {title || (language === 'en' ? 'Untitled Article' : 'Статья без названия')}
      </h2>
      <p className="text-gray-600">
        {description}
      </p>
    </header>
  );

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 className="text-3xl font-bold mb-6 text-[#1E1E4A]">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-2xl font-bold mb-4 text-[#1E1E4A]">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="text-xl font-bold mb-3 text-[#1E1E4A]">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc pl-6 mb-6 text-gray-700">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-decimal pl-6 mb-6 text-gray-700">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <li className="mb-2">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: any, children: any) => (
        <blockquote className="border-l-4 border-[#1E1E4A] pl-4 italic mb-6 text-gray-600">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, description, file } = node.data.target.fields;
        const { url, details } = file;
        return (
          <div className="my-8">
            <Image
              src={`https:${url}`}
              alt={description || title || 'Article image'}
              width={details.image.width}
              height={details.image.height}
              className="rounded-lg"
            />
            {description && (
              <p className="text-sm text-gray-500 mt-2 text-center">{description}</p>
            )}
          </div>
        );
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="font-bold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => (
        <em className="italic">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <u className="underline">{text}</u>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-100 rounded px-2 py-1 font-mono text-sm">
          {text}
        </code>
      ),
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
            {article.fields?.image?.fields?.file?.url && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={`https:${article.fields.image.fields.file.url}`}
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
                documentToReactComponents(content as Document, options)
              ) : (
                <p className="text-center text-gray-600">
                  {language === 'en' ? 'No content available.' : 'Содержание недоступно.'}
                </p>
              )}
            </div>
          </motion.div>
        </article>
      </div>
    </main>
  );
} 