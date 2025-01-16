import { createClient, Entry, EntrySkeletonType } from 'contentful';

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error('NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not defined');
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is not defined');
}

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

interface NewsFields {
  title: string;
  content: any;
  excerpt: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  published: boolean;
}

interface NewsEntry extends EntrySkeletonType {
  fields: NewsFields;
  contentTypeId: 'news';
}

export async function getNews(limit?: number, locale: string = 'en-US') {
  try {
    console.log('Fetching news with locale:', locale);

    const entries = await contentfulClient.getEntries<NewsEntry>({
      content_type: 'news',
      order: ['-sys.createdAt'],
      limit: limit || 100,
      locale,
      include: 2,
    });

    console.log('Fetched entries:', {
      total: entries.total,
      items: entries.items.length,
      locale: locale,
    });

    return entries.items;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsById(id: string, locale: string = 'en-US') {
  try {
    console.log('Fetching article with locale:', locale);

    const entry = await contentfulClient.getEntry<NewsEntry>(id, {
      include: 2,
      locale,
    });

    return entry;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
} 