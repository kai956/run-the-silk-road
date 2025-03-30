import { getNewsById, getNewsBySlug } from '../../lib/sanity';
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
    const lang = typeof (await searchParams).lang === 'string' ? (await searchParams).lang : 'en';
    const id = (await params).id;
    
    // Try to fetch by slug first (more SEO friendly)
    let article = await getNewsBySlug(id, lang as string);
    
    // If not found by slug, try by ID
    if (!article) {
      article = await getNewsById(id, lang as string);
    }
    
    return <NewsArticleClient article={article} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return <div>Error loading article</div>;
  }
} 