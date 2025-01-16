import { getNewsById } from '../../lib/contentful';
import NewsArticleClient from './NewsArticleClient';

export default async function NewsArticlePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lang?: string };
}) {
  try {
    const locale = searchParams.lang === 'ru' ? 'ru-RU' : 'en-US';
    const article = await getNewsById(params.id, locale);
    return <NewsArticleClient article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return <div>Error loading article</div>;
  }
} 