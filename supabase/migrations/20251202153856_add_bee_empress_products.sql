/*
  # Add Complete Product Catalog for The Bee Empress

  ## Overview
  Populates the database with all premium products across three main categories:
  beeswax candles, solid perfumes, and fragrance bars.

  ## Collections Added
  1. **Luxury Collection** - Deep, bold, timeless fragrances ($68)
  2. **Elegance Collection** - Calming, graceful, serene scents ($62)
  3. **Essence Collection** - Grounding, earthy, sacred aromas ($58)

  ## Products Added
  
  ### Beeswax Candles (9 products)
  - Luxury: Mystique Oud, Royal Oud Arab, Golden Oud Arabia
  - Elegance: Aura of Grace, Mystic Bloom, Divine Soul
  - Essence: Ancient Essence, Ocean Bloom, Ethereal Forest
  
  ### Solid Perfumes (5 products)
  - Golden Oud Arabia, Ancient Essence Musk, Ethereal Woody Forest, Ocean Bloom, Mystic Floral Aura
  
  ### Fragrance Bars (3 products)
  - Classic Fresh, Floral Whisper, Warm Luxe

  ## Notes
  - All products include detailed fragrance notes (top, heart, base)
  - Each product has mood keywords for emotional connection
  - Premium imagery from Pexels for luxury aesthetic
  - SEO-friendly slugs for all products
*/

-- Insert Collections
INSERT INTO collections (slug, name, description, image_url, display_order) VALUES
  ('luxury', 'Luxury Collection', 'Opulent scents crafted for grand spaces and special moments. Each candle in our Luxury line tells a story of refinement.', 'https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
  ('elegance', 'Elegance Collection', 'Graceful fragrances that bring calm sophistication to everyday moments.', 'https://images.pexels.com/photos/3992930/pexels-photo-3992930.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
  ('essence', 'Essence Collection', 'Pure, grounding scents inspired by nature''s most sacred elements.', 'https://images.pexels.com/photos/4040623/pexels-photo-4040623.jpeg?auto=compress&cs=tinysrgb&w=800', 3)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order;

-- Insert Beeswax Candles (9 products)

-- LUXURY COLLECTION CANDLES
INSERT INTO products (sku, name, slug, type, collection_id, short_description, full_description, price, images, scent_notes, is_featured, is_active) VALUES
  (
    'CANDLE-LUX-001',
    'Mystique Oud',
    'mystique-oud',
    'candle',
    (SELECT id FROM collections WHERE slug = 'luxury'),
    'Bold elegance with smoky oud and warm undertones. A mysterious and captivating luxury fragrance.',
    'Deep, smoky, unforgettable. Mystique Oud is a bold statement piece that transforms any space into a sanctuary of refined mystery. The intricate layers of pure oud wood are enhanced with warm spices and soft musk, creating an unforgettable sensory experience that lingers long after the flame is extinguished.',
    68,
    '["https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/4040589/pexels-photo-4040589.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Smoke Accord", "Spices"], "heart": ["Pure Oud", "Amber"], "base": ["Dark Woods", "Soft Musk"], "mood": ["Mysterious", "Bold", "Timeless"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6209236/pexels-photo-6209236.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/4040610/pexels-photo-4040610.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Soft Florals"], "heart": ["Arabian Oud"], "base": ["Vanilla", "Creamy Woods"], "mood": ["Elegant", "Harmonious", "Exquisite"]}'::jsonb,
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
    '["https://images.pexels.com/photos/4040620/pexels-photo-4040620.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/4040605/pexels-photo-4040605.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Warm Vanilla"], "heart": ["Golden Oud"], "base": ["Sweet Amber", "Soft Woods"], "mood": ["Warm", "Indulgent", "Glowing"]}'::jsonb,
    true,
    true
  ),

-- ELEGANCE COLLECTION CANDLES
  (
    'CANDLE-ELE-001',
    'Aura of Grace',
    'aura-of-grace',
    'candle',
    (SELECT id FROM collections WHERE slug = 'elegance'),
    'Soft florals and gentle musk that bring serenity with every gentle glow.',
    'Calming, elegant, timeless. Aura of Grace wraps you in a delicate embrace of white florals and powdery woods. Perfect for meditation, quiet evenings, or creating a peaceful sanctuary in your home.',
    62,
    '["https://images.pexels.com/photos/3992930/pexels-photo-3992930.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3992929/pexels-photo-3992929.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["White Florals"], "heart": ["Gentle Musk"], "base": ["Powdery Woods"], "mood": ["Calm", "Graceful", "Serene"]}'::jsonb,
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
    '["https://images.pexels.com/photos/4040623/pexels-photo-4040623.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5202953/pexels-photo-5202953.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Lavender"], "heart": ["Jasmine"], "base": ["Soft Florals"], "mood": ["Romantic", "Dreamy", "Enchanting"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6186477/pexels-photo-6186477.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6480701/pexels-photo-6480701.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Soft Florals"], "heart": ["Golden Amber"], "base": ["Warm Resin"], "mood": ["Warm", "Soulful", "Peaceful"]}'::jsonb,
    false,
    true
  ),

-- ESSENCE COLLECTION CANDLES
  (
    'CANDLE-ESS-001',
    'Ancient Essence',
    'ancient-essence',
    'candle',
    (SELECT id FROM collections WHERE slug = 'essence'),
    'A fresh mountain air blend with sacred myrrh and resinous woods.',
    'Grounding, earthy, sacred. Ancient Essence connects you to the earth with its blend of crisp mountain air and sacred myrrh. Perfect for meditation, yoga, or creating a space of spiritual connection.',
    58,
    '["https://images.pexels.com/photos/4040625/pexels-photo-4040625.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5202955/pexels-photo-5202955.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Crisp Mountain Air"], "heart": ["Resin"], "base": ["Myrrh"], "mood": ["Sacred", "Calm", "Earthy"]}'::jsonb,
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
    '["https://images.pexels.com/photos/5202956/pexels-photo-5202956.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6480709/pexels-photo-6480709.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Sea Air"], "heart": ["Aquatic Florals"], "base": ["Soft Minerals"], "mood": ["Free", "Fresh", "Uplifting"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6480716/pexels-photo-6480716.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5711159/pexels-photo-5711159.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"top": ["Pine"], "heart": ["Cedarwood"], "base": ["Forest Mist"], "mood": ["Calm", "Magical", "Woody"]}'::jsonb,
    false,
    true
  )
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  scent_notes = EXCLUDED.scent_notes,
  is_featured = EXCLUDED.is_featured;

-- Insert Solid Perfumes (5 products)
INSERT INTO products (sku, name, slug, type, short_description, full_description, price, images, scent_notes, is_featured, is_active) VALUES
  (
    'PERFUME-001',
    'Golden Oud Arabia',
    'golden-oud-arabia-perfume',
    'solid_perfume',
    'Bold, opulent, captivating. Smoky oud blended with aged woods and rich amber.',
    'Majestic and warm. Golden Oud Arabia Solid Perfume is your personal signature of luxury. Crafted with the finest oud, aged woods, and amber, this portable perfume offers bold sophistication wherever you go. Perfect for layering or wearing alone.',
    48,
    '["https://images.pexels.com/photos/5255232/pexels-photo-5255232.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5255231/pexels-photo-5255231.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Smoky Oud", "Aged Woods", "Amber"], "mood": ["Bold", "Opulent", "Captivating"]}'::jsonb,
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
    '["https://images.pexels.com/photos/5255225/pexels-photo-5255225.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6663530/pexels-photo-6663530.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Classic Musk", "Creamy Warmth"], "mood": ["Intimate", "Timeless", "Sensual"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6659371/pexels-photo-6659371.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/7319098/pexels-photo-7319098.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Timber", "Green Moss", "Evening Earth"], "mood": ["Calm", "Natural", "Serene"]}'::jsonb,
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
    '["https://images.pexels.com/photos/7319336/pexels-photo-7319336.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6621471/pexels-photo-6621471.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Ocean Breeze", "Light Florals"], "mood": ["Clean", "Elegant", "Uplifting"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6621445/pexels-photo-6621445.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/7319271/pexels-photo-7319271.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"notes": ["Luminous Petals", "Light Sweetness"], "mood": ["Romantic", "Refined", "Delicate"]}'::jsonb,
    false,
    true
  )
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  scent_notes = EXCLUDED.scent_notes,
  is_featured = EXCLUDED.is_featured;

-- Insert Fragrance Bars (3 products)
INSERT INTO products (sku, name, slug, type, short_description, full_description, price, images, scent_notes, is_featured, is_active) VALUES
  (
    'FBAR-001',
    'Classic Fresh',
    'classic-fresh',
    'fragrance_bar',
    'Clean, crisp, pure. Fresh linens, citrus, and herbs for wardrobes and linen closets.',
    'Best for: Wardrobes, Linen Closets, Guest Rooms. Classic Fresh brings the scent of freshly laundered linens and crisp morning air to your storage spaces. Notes of citrus and herbs ensure your clothes always smell clean and inviting.',
    28,
    '["https://images.pexels.com/photos/6207876/pexels-photo-6207876.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6207870/pexels-photo-6207870.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"profile": "Clean, crisp, pure", "notes": ["Fresh Linens", "Citrus", "Herbs"], "best_for": ["Wardrobes", "Linen Closets", "Guest Rooms"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6207909/pexels-photo-6207909.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/6621442/pexels-photo-6621442.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"profile": "Soft, romantic, delicate", "notes": ["Dewy Petals", "Powdery Florals"], "best_for": ["Vanity Drawers", "Bridal Storage"]}'::jsonb,
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
    '["https://images.pexels.com/photos/6621452/pexels-photo-6621452.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/7319329/pexels-photo-7319329.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb,
    '{"profile": "Cozy, rich, luxurious", "notes": ["Amber", "Spices", "Honeyed Woods"], "best_for": ["Winter Clothes", "Coats", "Wool Storage"]}'::jsonb,
    false,
    true
  )
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  scent_notes = EXCLUDED.scent_notes,
  is_featured = EXCLUDED.is_featured;
