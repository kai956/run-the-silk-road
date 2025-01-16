'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

interface NewsFormData {
  title: {
    en: string;
    ru: string;
  };
  content: {
    en: Record<string, any> | null;
    ru: Record<string, any> | null;
  };
  excerpt: {
    en: string;
    ru: string;
  };
  category: string;
  published: boolean;
}

export default function NewsEditor() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewsFormData>({
    title: { en: '', ru: '' },
    content: { en: null, ru: null },
    excerpt: { en: '', ru: '' },
    category: '',
    published: false
  });

  const englishEditor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link
    ],
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: { ...prev.content, en: editor.getJSON() }
      }));
    }
  });

  const russianEditor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link
    ],
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: { ...prev.content, ru: editor.getJSON() }
      }));
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create news article');
      }

      // Reset form
      setFormData({
        title: { en: '', ru: '' },
        content: { en: null, ru: null },
        excerpt: { en: '', ru: '' },
        category: '',
        published: false
      });
      
      // Reset editors
      englishEditor?.commands.clearContent();
      russianEditor?.commands.clearContent();
    } catch (error) {
      console.error('Error creating news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'en' ? 'Create News Article' : 'Создать новость'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'English Title' : 'Заголовок на английском'}
            </label>
            <input
              type="text"
              value={formData.title.en}
              onChange={(e) => setFormData({
                ...formData,
                title: { ...formData.title, en: e.target.value }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Russian Title' : 'Заголовок на русском'}
            </label>
            <input
              type="text"
              value={formData.title.ru}
              onChange={(e) => setFormData({
                ...formData,
                title: { ...formData.title, ru: e.target.value }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'English Content' : 'Содержание на английском'}
            </label>
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <EditorContent 
                editor={englishEditor} 
                className="min-h-[200px] border rounded focus:outline-none p-4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Russian Content' : 'Содержание на русском'}
            </label>
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <EditorContent 
                editor={russianEditor}
                className="min-h-[200px] border rounded focus:outline-none p-4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'English Excerpt' : 'Отрывок на английском'}
            </label>
            <textarea
              value={formData.excerpt.en}
              onChange={(e) => setFormData({
                ...formData,
                excerpt: { ...formData.excerpt, en: e.target.value }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Russian Excerpt' : 'Отрывок на русском'}
            </label>
            <textarea
              value={formData.excerpt.ru}
              onChange={(e) => setFormData({
                ...formData,
                excerpt: { ...formData.excerpt, ru: e.target.value }
              })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Category' : 'Категория'}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({
                ...formData,
                category: e.target.value
              })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">{language === 'en' ? 'Select category' : 'Выберите категорию'}</option>
              <option value="event">{language === 'en' ? 'Event' : 'Событие'}</option>
              <option value="update">{language === 'en' ? 'Update' : 'Обновление'}</option>
              <option value="announcement">{language === 'en' ? 'Announcement' : 'Анонс'}</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({
                ...formData,
                published: e.target.checked
              })}
              className="mr-2"
            />
            <label className="text-sm font-medium">
              {language === 'en' ? 'Publish immediately' : 'Опубликовать сразу'}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? (language === 'en' ? 'Creating...' : 'Создание...')
            : (language === 'en' ? 'Create News' : 'Создать новость')}
        </button>
      </form>
    </div>
  );
} 