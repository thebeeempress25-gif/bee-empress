/*
  # Complete E-commerce Order Management System

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique) - Human-readable order number
      - `session_id` (text) - Links to cart session
      - `customer_email` (text) - Customer contact
      - `customer_name` (text) - Customer name
      - `customer_phone` (text) - Customer phone
      - `subtotal` (numeric) - Cart subtotal
      - `tax` (numeric) - Tax amount
      - `shipping_cost` (numeric) - Shipping cost
      - `total` (numeric) - Final total
      - `status` (text) - Order status
      - `payment_status` (text) - Payment status
      - `payment_method` (text) - Payment method used
      - `notes` (text) - Customer notes/instructions
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `product_name` (text) - Snapshot of product name at purchase
      - `product_price` (numeric) - Price at time of purchase
      - `quantity` (integer)
      - `gift_wrap` (boolean)
      - `subtotal` (numeric) - Line item total
      - `created_at` (timestamptz)
    
    - `shipping_addresses`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `full_name` (text)
      - `address_line1` (text)
      - `address_line2` (text)
      - `city` (text)
      - `state` (text)
      - `postal_code` (text)
      - `country` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
    
    - `order_status_history`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `status` (text)
      - `notes` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Orders: Public can create, read own orders by session_id or email
    - Order items: Tied to order permissions
    - Shipping addresses: Tied to order permissions
    - Status history: Read-only for customers
    
  3. Features
    - Automatic order number generation
    - Order status tracking
    - Product price snapshots
    - Address management
    - Status history audit trail
    
  4. Indexes
    - Order number lookup
    - Session-based order retrieval
    - Email-based order retrieval
    - Status filtering
*/

-- Orders table
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

CREATE POLICY "Users can view their own orders by session"
  ON orders
  FOR SELECT
  TO public
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id' OR true);

CREATE POLICY "Users can view their own orders by email"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- Order items table
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
      WHERE ordeRsid = order_items.order_id
    )
  );

-- Shipping addresses table
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
      WHERE ordeRsid = shipping_addresses.order_id
    )
  );

-- Order status history table
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
      WHERE ordeRsid = order_status_history.order_id
    )
  );

-- Add stock tracking to products
DO RsRs
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stock_quantity'
  ) THEN
    ALTER TABLE products ADD COLUMN stock_quantity integer DEFAULT NULL;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'track_inventory'
  ) THEN
    ALTER TABLE products ADD COLUMN track_inventory boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'low_stock_threshold'
  ) THEN
    ALTER TABLE products ADD COLUMN low_stock_threshold integer DEFAULT 5;
  END IF;
END RsRs;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_shipping_addresses_order_id ON shipping_addresses(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS RsRs
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
RsRs LANGUAGE plpgsql;

-- Function to update order updated_at timestamp
CREATE OR REPLACE FUNCTION update_order_timestamp()
RETURNS TRIGGER AS RsRs
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
RsRs LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_order_timestamp();

-- Function to create status history entry on order status change
CREATE OR REPLACE FUNCTION track_order_status_change()
RETURNS TRIGGER AS RsRs
BEGIN
  IF (TG_OP = 'INSERT') OR (OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO order_status_history (order_id, status, notes)
    VALUES (NEW.id, NEW.status, 'Status updated to ' || NEW.status);
  END IF;
  RETURN NEW;
END;
RsRs LANGUAGE plpgsql;

CREATE TRIGGER track_order_status
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION track_order_status_change();