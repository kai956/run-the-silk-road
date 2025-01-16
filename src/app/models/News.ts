import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
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
  date: Date;
  image?: string;
  published: boolean;
}

const newsSchema = new Schema<INews>({
  title: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  content: {
    en: { type: Schema.Types.Mixed, required: true },
    ru: { type: Schema.Types.Mixed, required: true }
  },
  excerpt: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
  published: { type: Boolean, default: false }
});

export const News = mongoose.models.News || mongoose.model<INews>('News', newsSchema); 