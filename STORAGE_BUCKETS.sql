/*
  ========================================
  STORAGE BUCKETS SETUP
  ========================================

  This SQL creates public storage buckets for The Bee Empress.
  Run this in your Supabase SQL Editor AFTER running SUPABASE_MIGRATION.sql

  Buckets created:
  - products (for product images)
  - collections (for collection/category images)
  - blog (for blog post images)

  All buckets are PUBLIC and allow file uploads.
*/

-- Create products bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create collections bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('collections', 'collections', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create blog bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Set up RLS policies for products bucket
CREATE POLICY IF NOT EXISTS "Public read access for products"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'products');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload products"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'products');

CREATE POLICY IF NOT EXISTS "Authenticated users can update products"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'products');

CREATE POLICY IF NOT EXISTS "Authenticated users can delete products"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'products');

-- Set up RLS policies for collections bucket
CREATE POLICY IF NOT EXISTS "Public read access for collections"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'collections');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload collections"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'collections');

CREATE POLICY IF NOT EXISTS "Authenticated users can update collections"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'collections');

CREATE POLICY IF NOT EXISTS "Authenticated users can delete collections"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'collections');

-- Set up RLS policies for blog bucket
CREATE POLICY IF NOT EXISTS "Public read access for blog"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'blog');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload blog"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog');

CREATE POLICY IF NOT EXISTS "Authenticated users can update blog"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog');

CREATE POLICY IF NOT EXISTS "Authenticated users can delete blog"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog');

-- ============================================
-- STORAGE BUCKETS SETUP COMPLETE
-- ============================================
--
-- Your storage buckets are now ready:
-- ✅ products bucket (public)
-- ✅ collections bucket (public)
-- ✅ blog bucket (public)
--
-- All buckets allow:
-- - Public read access (anyone can view files)
-- - Authenticated users can upload/update/delete
--
-- You can now upload images directly through:
-- - Supabase Dashboard > Storage
-- - Supabase Client Library in your app
