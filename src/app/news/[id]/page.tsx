import { getNewsById } from '../../lib/contentful';
import NewsArticleClient from './NewsArticleClient';

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function NewsArticlePage({
  params,
  searchParams = {},
}: Props) {
  try {
    const lang = typeof searchParams.lang === 'string' ? searchParams.lang : undefined;
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    const article = await getNewsById(params.id, locale);
    return <NewsArticleClient article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return <div>Error loading article</div>;
  }
} 