/*
  # Fix Function Security: Search Path and SECURITY DEFINER

  1. Security Updates
    - Add SECURITY DEFINER to functions that need elevated privileges
    - Set search_path to prevent security vulnerabilities
    - Ensure functions are stable and don't have mutable search_path

  2. Functions Updated
    - generate_order_number: Add SECURITY DEFINER and search_path
    - update_order_timestamp: Add search_path
    - track_order_status_change: Add search_path
*/

-- Fix generate_order_number function
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix update_order_timestamp function
CREATE OR REPLACE FUNCTION update_order_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix track_order_status_change function
CREATE OR REPLACE FUNCTION track_order_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT') OR (OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO order_status_history (order_id, status, notes)
    VALUES (NEW.id, NEW.status, 'Status updated to ' || NEW.status);
  END IF;
  RETURN NEW;
END;
$$;