import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '../../sanity/env';

// Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to get localized content
export function getLocalizedValue(field: Record<string, any> | undefined, language: string) {
  if (!field) return null;
  
  // Default to English if the requested language isn't available
  return field[language] || field['en'] || null;
}

// Fetch news articles with language support
export async function getNews(limit?: number, language: string = 'en') {
  try {
    console.log('Fetching news with language:', language);

    // Query to fetch news articles with localized fields
    const query = `*[_type == "news"] | order(_createdAt desc) {
      _id,
      _createdAt,
      "title": title,
      "excerpt": excerpt,
      "content": content,
      "slug": slug.current,
      "image": mainImage,
      "category": category
    }[0...${limit || 100}]`;

    const news = await client.fetch(query);

    console.log('Fetched news articles:', news.length);
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Fetch a single news article by ID with language support
export async function getNewsById(id: string, language: string = 'en') {
  try {
    console.log('Fetching article with language:', language);

    const query = `*[_type == "news" && _id == $id][0] {
      _id,
      _createdAt,
      "title": title,
      "excerpt": excerpt,
      "content": content,
      "slug": slug.current,
      "image": mainImage,
      "category": category,
      "tags": tags,
      "publishedAt": publishedAt
    }`;

    const article = await client.fetch(query, { id });
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch a single news article by slug with language support
export async function getNewsBySlug(slug: string, language: string = 'en') {
  try {
    console.log('Fetching article with slug and language:', slug, language);

    const query = `*[_type == "news" && slug.current == $slug][0] {
      _id,
      _createdAt,
      "title": title,
      "excerpt": excerpt,
      "content": content,
      "slug": slug.current,
      "image": mainImage,
      "category": category,
      "tags": tags,
      "publishedAt": publishedAt
    }`;

    const article = await client.fetch(query, { slug });
    return article;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
} 