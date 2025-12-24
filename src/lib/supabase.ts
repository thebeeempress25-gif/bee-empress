import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  display_order: number;
  parent_collection_id?: string;
  created_at: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  type: 'candle' | 'solid_perfume' | 'fragrance_bar';
  collection_id: string;
  short_description: string;
  full_description: string;
  price: number;
  offer_price?: number;
  rating: number;
  images: string[];
  scent_notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  ingredients: string[];
  how_to_use: string;
  sustainability_info: string;
  dimensions: string;
  reasons_to_love: string[];
  set_contains: string[];
  gender_tag?: 'unisex' | 'masculine' | 'feminine';
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  hero_image: string;
  author: string;
  published_at: string;
  created_at: string;
};

export type CartItem = {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  gift_wrap: boolean;
  created_at: string;
  updated_at: string;
};
