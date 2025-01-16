import { getNewsById } from '../../lib/contentful';
import NewsArticleClient from './NewsArticleClient';

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NewsArticlePage({
  params,
  searchParams = Promise.resolve({}),
}: Props) {
  try {
    const lang = typeof (await searchParams).lang === 'string' ? (await searchParams).lang : undefined;
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    const article = await getNewsById((await params).id, locale);
    return <NewsArticleClient article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return <div>Error loading article</div>;
  }
} 