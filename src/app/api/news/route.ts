import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import { News, INews } from '../../models/News';

interface NewsCreateBody {
  title: {
    en: string;
    ru: string;
  };
  content: {
    en: any;
    ru: any;
  };
  excerpt: {
    en: string;
    ru: string;
  };
  category: string;
  image?: string;
  published: boolean;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body: NewsCreateBody = await request.json();

    const news = await News.create({
      title: {
        en: body.title.en,
        ru: body.title.ru
      },
      content: {
        en: body.content.en,
        ru: body.content.ru
      },
      excerpt: {
        en: body.excerpt.en,
        ru: body.excerpt.ru
      },
      category: body.category,
      image: body.image,
      published: body.published
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const news = await News.find<INews>({ published: true }).sort({ date: -1 });
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
} 