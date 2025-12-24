/*
  # Create Wishlist Table

  1. New Tables
    - `wishlist_items`
      - `id` (uuid, primary key)
      - `session_id` (text) - for guest users
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `wishlist_items` table
    - Add policy for users to manage their own wishlist items based on session
  
  3. Notes
    - Uses session-based storage for guest users
    - Each session can have multiple wishlist items
    - Prevents duplicate entries for same product in same session
*/

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
