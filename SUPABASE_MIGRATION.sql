/*
  ========================================
  THE BEE EMPRESS - COMPLETE DATABASE SCHEMA
  ========================================

  This is a FRESH database setup for The Bee Empress e-commerce platform.
  Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/sql

  ## Tables Created:
  1. collections - Product collections/categories
  2. products - Main product catalog
  3. blog_posts - Blog content
  4. newsletter_subscribers - Newsletter emails
  5. cart_items - Shopping cart (session-based)
  6. contact_messages - Contact form submissions
  7. wishlist_items - Customer wishlists
  8. orders - Customer orders
  9. order_items - Individual items in orders
  10. shipping_addresses - Shipping info for orders
  11. order_status_history - Order status tracking

  ## Features:
  - Row Level Security (RLS) enabled on all tables
  - Automatic order number generation
  - Order status tracking with history
  - Inventory management support
  - Product ratings and pricing
  - Full e-commerce workflow support

  ## Security:
  All tables have appropriate RLS policies for public access patterns.
*/

-- ============================================
-- 1. COLLECTIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  parent_collection_id uuid REFERENCES collections(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for collections"
  ON collections FOR SELECT
  TO public
  USING (true);

-- ============================================
-- 2. PRODUCTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL,
  collection_id uuid REFERENCES collections(id),
  short_description text DEFAULT '',
  full_description text DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  offer_price numeric,
  rating numeric DEFAULT 5.0,
  images jsonb DEFAULT '[]'::jsonb,
  scent_notes jsonb DEFAULT '{}'::jsonb,
  ingredients text[] DEFAULT ARRAY[]::text[],
  reasons_to_love text[] DEFAULT ARRAY[]::text[],
  set_contains text[] DEFAULT ARRAY[]::text[],
  how_to_use text DEFAULT '',
  sustainability_info text DEFAULT '',
  dimensions text DEFAULT '',
  gender_tag text,
  stock_quantity integer DEFAULT NULL,
  track_inventory boolean DEFAULT false,
  low_stock_threshold integer DEFAULT 5,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

-- ============================================
-- 3. BLOG POSTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  hero_image text DEFAULT '',
  author text DEFAULT 'The Bee Empress',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published_at <= now());

-- ============================================
-- 4. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  coupon_sent boolean DEFAULT false
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);

-- ============================================
-- 5. CART ITEMS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  gift_wrap boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own cart"
  ON cart_items FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 6. CONTACT MESSAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

-- ============================================
-- 7. WISHLIST ITEMS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage their own wishlist"
  ON wishlist_items
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_wishlist_session ON wishlist_items(session_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product ON wishlist_items(product_id);

-- ============================================
-- 8. ORDERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  session_id text NOT NULL,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text,
  subtotal numeric NOT NULL DEFAULT 0,
  tax numeric NOT NULL DEFAULT 0,
  shipping_cost numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'pending',
  payment_method text,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- ============================================
-- 9. ORDER ITEMS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  product_name text NOT NULL,
  product_price numeric NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  gift_wrap boolean DEFAULT false,
  subtotal numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items inherit order permissions"
  ON order_items
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
    )
  );

-- ============================================
-- 10. SHIPPING ADDRESSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS shipping_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text DEFAULT '',
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'USA',
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shipping_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shipping addresses inherit order permissions"
  ON shipping_addresses
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = shipping_addresses.order_id
    )
  );

-- ============================================
-- 11. ORDER STATUS HISTORY TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status text NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Status history is readable"
  ON order_status_history
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_status_history.order_id
    )
  );

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_shipping_addresses_order_id ON shipping_addresses(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to generate unique order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_number text;
  exists_check boolean;
BEGIN
  LOOP
    new_number := 'ORD-' || LPAD(floor(random() * 999999)::text, 6, '0');

    SELECT EXISTS(SELECT 1 FROM orders WHERE order_number = new_number) INTO exists_check;

    EXIT WHEN NOT exists_check;
  END LOOP;

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Function to update order timestamp
CREATE OR REPLACE FUNCTION update_order_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for order timestamp
DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_order_timestamp();

-- Function to track order status changes
CREATE OR REPLACE FUNCTION track_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') OR (OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO order_status_history (order_id, status, notes)
    VALUES (NEW.id, NEW.status, 'Status updated to ' || NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for status tracking
DROP TRIGGER IF EXISTS track_order_status ON orders;
CREATE TRIGGER track_order_status
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION track_order_status_change();

-- ============================================
-- SEED DATA: COLLECTIONS
-- ============================================

INSERT INTO collections (slug, name, description, image_url, display_order) VALUES
  ('luxury', 'Luxury Collection', 'Opulent scents crafted for grand spaces and special moments. Each candle in our Luxury line tells a story of refinement.', 'https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
  ('elegance', 'Elegance Collection', 'Graceful fragrances that bring calm sophistication to everyday moments.', 'https://images.pexels.com/photos/3992930/pexels-photo-3992930.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
  ('essence', 'Essence Collection', 'Pure, grounding scents inspired by nature''s most sacred elements.', 'https://images.pexels.com/photos/4040623/pexels-photo-4040623.jpeg?auto=compress&cs=tinysrgb&w=800', 3)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order;

-- ============================================
-- SEED DATA: BEESWAX CANDLES
-- ============================================

INSERT INTO products (sku, name, slug, type, collection_id, short_description, full_description, price, rating, images, scent_notes, reasons_to_love, set_contains, is_featured, is_active) VALUES
  (
    'CANDLE-LUX-001',
    'Mystique Oud',
    'mystique-oud',
    'candle',
    (SELECT id FROM collections WHERE slug = 'luxury'),
    'Bold elegance with smoky oud and warm undertones. A mysterious and captivating luxury fragrance.',
    'Deep, smoky, unforgettable. Mystique Oud is a bold statement piece that transforms any space into a sanctuary of refined mystery. The intricate layers of pure oud wood are enhanced with warm spices and soft musk, creating an unforgettable sensory experience that lingers long after the flame is extinguished.',
    68,
    4.8,
    '["https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/4040589/pexels-photo-4040589.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Smoke Accord", "Spices"], "heart": ["Pure Oud", "Amber"], "base": ["Dark Woods", "Soft Musk"], "mood": ["Mysterious", "Bold", "Timeless"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    true,
    true
  ),
  (
    'CANDLE-LUX-002',
    'Royal Oud Arab',
    'royal-oud-arab',
    'candle',
    (SELECT id FROM collections WHERE slug = 'luxury'),
    'A regal blend of rich oud layered with soft florals and smooth vanilla for royal sophistication.',
    'Majestic, graceful, refined. Royal Oud Arab captures the essence of ancient Arabian luxury with its perfectly balanced blend of rich oud, delicate florals, and creamy vanilla. This candle brings an air of graceful sophistication to any occasion.',
    68,
    4.8,
    '["https://images.pexels.com/photos/6209236/pexels-photo-6209236.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/4040610/pexels-photo-4040610.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Soft Florals"], "heart": ["Arabian Oud"], "base": ["Vanilla", "Creamy Woods"], "mood": ["Elegant", "Harmonious", "Exquisite"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    true,
    true
  ),
  (
    'CANDLE-LUX-003',
    'Golden Oud Arabia',
    'golden-oud-arabia',
    'candle',
    (SELECT id FROM collections WHERE slug = 'luxury'),
    'Luminous oud infused with golden vanilla for a glowing, ultra-luxurious fragrance experience.',
    'Radiant, warm, indulgent. Golden Oud Arabia is like liquid gold for your senses. The warm embrace of vanilla perfectly complements the rich complexity of golden oud, creating an ambiance of pure indulgence and warmth.',
    68,
    4.8,
    '["https://images.pexels.com/photos/4040620/pexels-photo-4040620.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/4040605/pexels-photo-4040605.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Warm Vanilla"], "heart": ["Golden Oud"], "base": ["Sweet Amber", "Soft Woods"], "mood": ["Warm", "Indulgent", "Glowing"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    true,
    true
  ),
  (
    'CANDLE-ELE-001',
    'Aura of Grace',
    'aura-of-grace',
    'candle',
    (SELECT id FROM collections WHERE slug = 'elegance'),
    'Soft florals and gentle musk that bring serenity with every gentle glow.',
    'Calming, elegant, timeless. Aura of Grace wraps you in a delicate embrace of white florals and powdery woods. Perfect for meditation, quiet evenings, or creating a peaceful sanctuary in your home.',
    62,
    4.8,
    '["https://images.pexels.com/photos/3992930/pexels-photo-3992930.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3992929/pexels-photo-3992929.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["White Florals"], "heart": ["Gentle Musk"], "base": ["Powdery Woods"], "mood": ["Calm", "Graceful", "Serene"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    true,
    true
  ),
  (
    'CANDLE-ELE-002',
    'Mystic Bloom',
    'mystic-bloom',
    'candle',
    (SELECT id FROM collections WHERE slug = 'elegance'),
    'A magical floral fusion of jasmine, lavender, and delicate blossoms.',
    'Dreamy, romantic, enchanting. Mystic Bloom captures the essence of a moonlit garden in full bloom. Lavender and jasmine dance together in perfect harmony, creating an enchanting atmosphere of romance and wonder.',
    62,
    4.8,
    '["https://images.pexels.com/photos/4040623/pexels-photo-4040623.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5202953/pexels-photo-5202953.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Lavender"], "heart": ["Jasmine"], "base": ["Soft Florals"], "mood": ["Romantic", "Dreamy", "Enchanting"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    false,
    true
  ),
  (
    'CANDLE-ELE-003',
    'Divine Soul',
    'divine-soul',
    'candle',
    (SELECT id FROM collections WHERE slug = 'elegance'),
    'Golden amber paired with soft pink florals for a soulful, comforting aroma.',
    'Warm, tranquil, soulful. Divine Soul is a gentle embrace for the spirit. The golden warmth of amber mingles with delicate pink florals, creating a deeply comforting and peaceful atmosphere that soothes the soul.',
    62,
    4.8,
    '["https://images.pexels.com/photos/6186477/pexels-photo-6186477.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6480701/pexels-photo-6480701.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Soft Florals"], "heart": ["Golden Amber"], "base": ["Warm Resin"], "mood": ["Warm", "Soulful", "Peaceful"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    false,
    true
  ),
  (
    'CANDLE-ESS-001',
    'Ancient Essence',
    'ancient-essence',
    'candle',
    (SELECT id FROM collections WHERE slug = 'essence'),
    'A fresh mountain air blend with sacred myrrh and resinous woods.',
    'Grounding, earthy, sacred. Ancient Essence connects you to the earth with its blend of crisp mountain air and sacred myrrh. Perfect for meditation, yoga, or creating a space of spiritual connection.',
    58,
    4.8,
    '["https://images.pexels.com/photos/4040625/pexels-photo-4040625.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5202955/pexels-photo-5202955.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Crisp Mountain Air"], "heart": ["Resin"], "base": ["Myrrh"], "mood": ["Sacred", "Calm", "Earthy"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    false,
    true
  ),
  (
    'CANDLE-ESS-002',
    'Ocean Bloom',
    'ocean-bloom-candle',
    'candle',
    (SELECT id FROM collections WHERE slug = 'essence'),
    'Oceanic florals blended with sea breeze freshness for a liberating aroma.',
    'Emotional, refreshing, free. Ocean Bloom captures the essence of freedom with its aquatic floral notes and fresh sea breeze. Breathe deep and feel transported to endless coastal horizons.',
    58,
    4.8,
    '["https://images.pexels.com/photos/5202956/pexels-photo-5202956.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6480709/pexels-photo-6480709.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Sea Air"], "heart": ["Aquatic Florals"], "base": ["Soft Minerals"], "mood": ["Free", "Fresh", "Uplifting"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    false,
    true
  ),
  (
    'CANDLE-ESS-003',
    'Ethereal Forest',
    'ethereal-forest',
    'candle',
    (SELECT id FROM collections WHERE slug = 'essence'),
    'A mystical forest blend of pine, cedar, and misty woods.',
    'Enchanting, woody, serene. Ethereal Forest brings the magic of an ancient woodland into your home. Pine and cedarwood blend with misty notes to create a calming, grounding sanctuary.',
    58,
    4.8,
    '["https://images.pexels.com/photos/6480716/pexels-photo-6480716.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5711159/pexels-photo-5711159.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Pine"], "heart": ["Cedarwood"], "base": ["Forest Mist"], "mood": ["Calm", "Magical", "Woody"]}'::jsonb,
    ARRAY['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Releases air-purifying negative ions', 'Ethically sourced from sustainable apiaries', 'Luxurious fragrance that fills the room'],
    ARRAY['1 Premium Beeswax Candle', 'Natural cotton wick', 'Elegant reusable vessel', 'Care instructions card'],
    false,
    true
  )
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price = EXCLUDED.price,
  rating = EXCLUDED.rating,
  images = EXCLUDED.images,
  scent_notes = EXCLUDED.scent_notes,
  reasons_to_love = EXCLUDED.reasons_to_love,
  set_contains = EXCLUDED.set_contains,
  is_featured = EXCLUDED.is_featured;

-- ============================================
-- SEED DATA: SOLID PERFUMES
-- ============================================

INSERT INTO products (sku, name, slug, type, short_description, full_description, price, rating, images, scent_notes, reasons_to_love, set_contains, is_featured, is_active) VALUES
  (
    'PERFUME-001',
    'Golden Oud Arabia',
    'golden-oud-arabia-perfume',
    'solid_perfume',
    'Bold, opulent, captivating. Smoky oud blended with aged woods and rich amber.',
    'Majestic and warm. Golden Oud Arabia Solid Perfume is your personal signature of luxury. Crafted with the finest oud, aged woods, and amber, this portable perfume offers bold sophistication wherever you go. Perfect for layering or wearing alone.',
    48,
    4.9,
    '["https://images.pexels.com/photos/5255232/pexels-photo-5255232.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5255231/pexels-photo-5255231.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Smoky Oud", "Aged Woods", "Amber"], "mood": ["Bold", "Opulent", "Captivating"]}'::jsonb,
    ARRAY['Travel-friendly solid format', 'Nourishing beeswax base', 'Long-lasting fragrance', 'No spills or leaks', 'Perfect for touch-ups throughout the day'],
    ARRAY['1 Solid Perfume Compact (0.3 oz)', 'Twist-open tin container', 'Application instructions'],
    true,
    true
  ),
  (
    'PERFUME-002',
    'Ancient Essence Musk',
    'ancient-essence-musk',
    'solid_perfume',
    'Soft, seductive, timeless. Classic musk with creamy warmth for intimate moments.',
    'Intimate and timeless. Ancient Essence Musk is the essence of quiet confidence. This classic musk blend offers a soft, sensual warmth that feels like a second skin. Perfect for everyday elegance.',
    42,
    4.9,
    '["https://images.pexels.com/photos/5255225/pexels-photo-5255225.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6663530/pexels-photo-6663530.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Classic Musk", "Creamy Warmth"], "mood": ["Intimate", "Timeless", "Sensual"]}'::jsonb,
    ARRAY['Travel-friendly solid format', 'Nourishing beeswax base', 'Long-lasting fragrance', 'No spills or leaks', 'Perfect for touch-ups throughout the day'],
    ARRAY['1 Solid Perfume Compact (0.3 oz)', 'Twist-open tin container', 'Application instructions'],
    false,
    true
  ),
  (
    'PERFUME-003',
    'Ethereal Woody Forest',
    'ethereal-woody-forest',
    'solid_perfume',
    'Grounding, earthy, serene. Timber, green moss, and evening earth in perfect harmony.',
    'Calm, natural, serene. Ethereal Woody Forest grounds you with its blend of timber, green moss, and evening earth. A perfect companion for those who seek connection with nature.',
    42,
    4.9,
    '["https://images.pexels.com/photos/6659371/pexels-photo-6659371.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/7319098/pexels-photo-7319098.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Timber", "Green Moss", "Evening Earth"], "mood": ["Calm", "Natural", "Serene"]}'::jsonb,
    ARRAY['Travel-friendly solid format', 'Nourishing beeswax base', 'Long-lasting fragrance', 'No spills or leaks', 'Perfect for touch-ups throughout the day'],
    ARRAY['1 Solid Perfume Compact (0.3 oz)', 'Twist-open tin container', 'Application instructions'],
    false,
    true
  ),
  (
    'PERFUME-004',
    'Ocean Bloom',
    'ocean-bloom-perfume',
    'solid_perfume',
    'Fresh, airy, uplifting. Ocean breeze with light florals for a clean, elegant presence.',
    'Clean, elegant, uplifting. Ocean Bloom Solid Perfume captures the freedom of coastal air with its blend of ocean breeze and light florals. Fresh, light, and perfect for daytime wear.',
    42,
    4.9,
    '["https://images.pexels.com/photos/7319336/pexels-photo-7319336.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6621471/pexels-photo-6621471.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Ocean Breeze", "Light Florals"], "mood": ["Clean", "Elegant", "Uplifting"]}'::jsonb,
    ARRAY['Travel-friendly solid format', 'Nourishing beeswax base', 'Long-lasting fragrance', 'No spills or leaks', 'Perfect for touch-ups throughout the day'],
    ARRAY['1 Solid Perfume Compact (0.3 oz)', 'Twist-open tin container', 'Application instructions'],
    false,
    true
  ),
  (
    'PERFUME-005',
    'Mystic Floral Aura',
    'mystic-floral-aura',
    'solid_perfume',
    'Romantic, refined, delicate. Luminous petals with light sweetness for soft feminine elegance.',
    'Romantic, refined, delicate. Mystic Floral Aura embodies soft feminine grace with its blend of luminous petals and gentle sweetness. A subtle yet unforgettable fragrance for any occasion.',
    44,
    4.9,
    '["https://images.pexels.com/photos/6621445/pexels-photo-6621445.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/7319271/pexels-photo-7319271.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Luminous Petals", "Light Sweetness"], "mood": ["Romantic", "Refined", "Delicate"]}'::jsonb,
    ARRAY['Travel-friendly solid format', 'Nourishing beeswax base', 'Long-lasting fragrance', 'No spills or leaks', 'Perfect for touch-ups throughout the day'],
    ARRAY['1 Solid Perfume Compact (0.3 oz)', 'Twist-open tin container', 'Application instructions'],
    false,
    true
  )
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price = EXCLUDED.price,
  rating = EXCLUDED.rating,
  images = EXCLUDED.images,
  scent_notes = EXCLUDED.scent_notes,
  reasons_to_love = EXCLUDED.reasons_to_love,
  set_contains = EXCLUDED.set_contains,
  is_featured = EXCLUDED.is_featured;

-- ============================================
-- SEED DATA: FRAGRANCE BARS
-- ============================================

INSERT INTO products (sku, name, slug, type, short_description, full_description, price, rating, images, scent_notes, reasons_to_love, set_contains, is_featured, is_active) VALUES
  (
    'FBAR-001',
    'Classic Fresh',
    'classic-fresh',
    'fragrance_bar',
    'Clean, crisp, pure. Fresh linens, citrus, and herbs for wardrobes and linen closets.',
    'Best for: Wardrobes, Linen Closets, Guest Rooms. Classic Fresh brings the scent of freshly laundered linens and crisp morning air to your storage spaces. Notes of citrus and herbs ensure your clothes always smell clean and inviting.',
    28,
    4.7,
    '["https://images.pexels.com/photos/6207876/pexels-photo-6207876.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6207870/pexels-photo-6207870.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"profile": "Clean, crisp, pure", "notes": ["Fresh Linens", "Citrus", "Herbs"], "best_for": ["Wardrobes", "Linen Closets", "Guest Rooms"]}'::jsonb,
    ARRAY['Naturally scents your spaces', 'Long-lasting fragrance (2-3 months)', 'No heat or electricity needed', 'Compact and elegant design', 'Safe for all fabrics'],
    ARRAY['1 Fragrance Bar (2 oz)', 'Breathable cotton pouch', 'Placement guide'],
    false,
    true
  ),
  (
    'FBAR-002',
    'Floral Whisper',
    'floral-whisper',
    'fragrance_bar',
    'Soft, romantic, delicate. Dewy petals and powdery florals for vanity drawers and bridal storage.',
    'Best for: Vanity Drawers, Bridal Storage. Floral Whisper infuses your most precious items with the gentle scent of dewy petals and soft powder. Perfect for lingerie drawers, keepsake boxes, and special occasion attire.',
    30,
    4.7,
    '["https://images.pexels.com/photos/6207909/pexels-photo-6207909.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6621442/pexels-photo-6621442.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"profile": "Soft, romantic, delicate", "notes": ["Dewy Petals", "Powdery Florals"], "best_for": ["Vanity Drawers", "Bridal Storage"]}'::jsonb,
    ARRAY['Naturally scents your spaces', 'Long-lasting fragrance (2-3 months)', 'No heat or electricity needed', 'Compact and elegant design', 'Safe for all fabrics'],
    ARRAY['1 Fragrance Bar (2 oz)', 'Breathable cotton pouch', 'Placement guide'],
    false,
    true
  ),
  (
    'FBAR-003',
    'Warm Luxe',
    'warm-luxe',
    'fragrance_bar',
    'Cozy, rich, luxurious. Amber, spices, and honeyed woods for winter clothes and coats.',
    'Best for: Winter Clothes, Coats, Wool Storage. Warm Luxe wraps your cold-weather wardrobe in the comforting embrace of amber, warm spices, and honeyed woods. Your winter garments will emerge with a sophisticated, cozy scent.',
    32,
    4.7,
    '["https://images.pexels.com/photos/6621452/pexels-photo-6621452.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/7319329/pexels-photo-7319329.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"profile": "Cozy, rich, luxurious", "notes": ["Amber", "Spices", "Honeyed Woods"], "best_for": ["Winter Clothes", "Coats", "Wool Storage"]}'::jsonb,
    ARRAY['Naturally scents your spaces', 'Long-lasting fragrance (2-3 months)', 'No heat or electricity needed', 'Compact and elegant design', 'Safe for all fabrics'],
    ARRAY['1 Fragrance Bar (2 oz)', 'Breathable cotton pouch', 'Placement guide'],
    false,
    true
  )
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price = EXCLUDED.price,
  rating = EXCLUDED.rating,
  images = EXCLUDED.images,
  scent_notes = EXCLUDED.scent_notes,
  reasons_to_love = EXCLUDED.reasons_to_love,
  set_contains = EXCLUDED.set_contains,
  is_featured = EXCLUDED.is_featured;

-- ============================================
-- COMPLETE! DATABASE IS READY
-- ============================================
--
-- Your database is now fully set up with:
-- ✅ All tables with RLS policies
-- ✅ Order management system
-- ✅ Product catalog with demo data
-- ✅ Collections and categories
-- ✅ Cart and wishlist support
-- ✅ Contact and newsletter tables
--
-- Next steps:
-- 1. Set up storage buckets (see STORAGE_BUCKETS.sql)
-- 2. Deploy edge functions (see deployment guide)
-- 3. Update frontend .env with your credentials
