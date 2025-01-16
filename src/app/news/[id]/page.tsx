import { getNewsById } from '../../lib/contentful';
import NewsArticleClient from './NewsArticleClient';

interface PageProps {
  params: { id: string };
  searchParams: { lang?: string };
}

export default async function NewsArticlePage({
  params,
  searchParams,
}: PageProps) {
  try {
    const locale = searchParams.lang === 'ru' ? 'ru-RU' : 'en-US';
    const article = await getNewsById(params.id, locale);
    return <NewsArticleClient article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return <div>Error loading article</div>;
  }
} 