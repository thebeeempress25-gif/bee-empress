/*
  # Fix Products RLS Policy

  1. Changes
    - Drop existing policy with incorrect role
    - Create new policy allowing anon and authenticated users to read active products
    - Also fix policies for collections and other public tables

  2. Security
    - Public read access for active products only
    - Proper role assignment (anon, authenticated)
*/

-- Drop existing incorrect policy
DROP POLICY IF EXISTS "Public read access for active products" ON products;

-- Create correct policy for products
CREATE POLICY "Allow public read access to active products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Ensure collections are also readable
DROP POLICY IF EXISTS "Public read access for collections" ON collections;
CREATE POLICY "Allow public read access to collections"
  ON collections
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Check if wishlists table exists and has proper policies
DO RsRs
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'wishlists') THEN
    DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlists;
    CREATE POLICY "Users can view own wishlist"
      ON wishlists
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
      
    DROP POLICY IF EXISTS "Users can insert own wishlist items" ON wishlists;
    CREATE POLICY "Users can insert own wishlist items"
      ON wishlists
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
      
    DROP POLICY IF EXISTS "Users can delete own wishlist items" ON wishlists;
    CREATE POLICY "Users can delete own wishlist items"
      ON wishlists
      FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END RsRs;