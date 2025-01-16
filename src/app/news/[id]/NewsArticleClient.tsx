'use client';

import { useLanguage } from '../../context/LanguageContext';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Document } from '@contentful/rich-text-types';

interface NewsArticleClientProps {
  article: any;
}

export default function NewsArticleClient({ article }: NewsArticleClientProps) {
  const { language } = useLanguage();

  console.log('Current language:', language);
  console.log('Article data:', {
    id: article?.sys?.id,
    createdAt: article?.sys?.createdAt,
    fields: article?.fields,
    hasContent: !!article?.fields?.content,
    contentType: article?.fields?.content ? typeof article.fields.content : 'undefined'
  });

  if (!article) {
    console.log('No article data received');
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

  const richTextContent = article.fields?.content;
  
  console.log('Content for language:', {
    language,
    hasContent: !!richTextContent,
    contentType: richTextContent ? typeof richTextContent : 'undefined',
    isRichText: richTextContent?.nodeType === 'document',
    content: richTextContent
  });

  // Remove the string conversion since content is already in rich text format
  const processedContent = richTextContent;

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
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <header className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E4A]">
                {article.fields?.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {new Date(article.sys.createdAt).toLocaleDateString(
                    language === 'en' ? 'en-US' : 'ru-RU',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <FaTag />
                  {article.fields?.category}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {article.fields?.image?.fields?.file?.url && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={`https:${article.fields.image.fields.file.url}`}
                  alt={article.fields?.title || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {processedContent ? (
                documentToReactComponents(processedContent as Document, options)
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