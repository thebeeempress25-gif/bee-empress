/*
  # Add Rating and Offer Price to Products

  ## Changes
  - Add `rating` column (decimal, default 5.0)
  - Add `offer_price` column (nullable numeric for sale prices)
  - Add `reasons_to_love` column (text array for bullet points)
  - Add `set_contains` column (text array for product contents)

  ## Notes
  - Rating defaults to 5.0 for all products
  - offer_price is optional and only used when product is on sale
  - New text arrays for enhanced product descriptions
*/

-- Add new columns to products table
DO RsRs
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'rating'
  ) THEN
    ALTER TABLE products ADD COLUMN rating numeric DEFAULT 5.0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'offer_price'
  ) THEN
    ALTER TABLE products ADD COLUMN offer_price numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'reasons_to_love'
  ) THEN
    ALTER TABLE products ADD COLUMN reasons_to_love text[] DEFAULT ARRAY[]::text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'set_contains'
  ) THEN
    ALTER TABLE products ADD COLUMN set_contains text[] DEFAULT ARRAY[]::text[];
  END IF;
END RsRs;

-- Update existing products with sample ratings and enhanced content
UPDATE products SET 
  rating = 4.8,
  reasons_to_love = ARRAY[
    'Hand-poured with 100% pure beeswax',
    'Burns clean for 60+ hours',
    'Releases air-purifying negative ions',
    'Ethically sourced from sustainable apiaries',
    'Luxurious fragrance that fills the room'
  ],
  set_contains = ARRAY[
    '1 Premium Beeswax Candle',
    'Natural cotton wick',
    'Elegant reusable vessel',
    'Care instructions card'
  ]
WHERE type = 'candle';

UPDATE products SET 
  rating = 4.9,
  reasons_to_love = ARRAY[
    'Travel-friendly solid format',
    'Nourishing beeswax base',
    'Long-lasting fragrance',
    'No spills or leaks',
    'Perfect for touch-ups throughout the day'
  ],
  set_contains = ARRAY[
    '1 Solid Perfume Compact (0.3 oz)',
    'Twist-open tin container',
    'Application instructions'
  ]
WHERE type = 'solid_perfume';

UPDATE products SET 
  rating = 4.7,
  reasons_to_love = ARRAY[
    'Naturally scents your spaces',
    'Long-lasting fragrance (2-3 months)',
    'No heat or electricity needed',
    'Compact and elegant design',
    'Safe for all fabrics'
  ],
  set_contains = ARRAY[
    '1 Fragrance Bar (2 oz)',
    'Breathable cotton pouch',
    'Placement guide'
  ]
WHERE type = 'fragrance_bar';
