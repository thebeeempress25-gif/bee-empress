# The Bee Empress - Deployment Guide

## Complete Manual Deployment Steps

This guide will help you deploy The Bee Empress to your Supabase project at:
**https://zviqnojhfxcbpuoegyhs.supabase.co**

---

## Prerequisites

Before starting, ensure you have:
- Access to your Supabase dashboard
- Your Supabase anon key (we'll get this in Step 1)
- Basic familiarity with Supabase dashboard

---

## Step 1: Get Your Supabase Anon Key

1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/settings/api
2. Find **Project API keys** section
3. Copy the `anon` `public` key (NOT the service_role key)
4. Update your `.env` file:
   ```bash
   VITE_SUPABASE_URL=https://zviqnojhfxcbpuoegyhs.supabase.co
   VITE_SUPABASE_ANON_KEY=<paste-your-anon-key-here>
   ```

---

## Step 2: Set Up Database Schema

1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/sql/new
2. Open the file `SUPABASE_MIGRATION.sql` in your project
3. Copy the ENTIRE contents of the file
4. Paste into the Supabase SQL Editor
5. Click **Run** button
6. Wait for success message

**What this does:**
- Creates all database tables (products, collections, orders, cart, wishlist, etc.)
- Sets up Row Level Security (RLS) policies
- Creates database functions for order management
- Seeds demo products (9 candles, 5 perfumes, 3 fragrance bars)

---

## Step 3: Set Up Storage Buckets

1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/sql/new
2. Open the file `STORAGE_BUCKETS.sql` in your project
3. Copy the ENTIRE contents
4. Paste into the Supabase SQL Editor
5. Click **Run** button

**What this does:**
- Creates 3 public storage buckets:
  - `products` - for product images
  - `collections` - for collection images
  - `blog` - for blog images
- Sets up upload/read permissions

**Verify buckets were created:**
1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/storage/buckets
2. You should see: `products`, `collections`, `blog`

---

## Step 4: Deploy Edge Function - Checkout

1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions
2. Click **Create a new function**
3. Name: `checkout`
4. Click **Create function**
5. In the code editor, replace ALL code with contents from:
   `supabase/functions/checkout/index.ts`
6. Click **Deploy**

**What this function does:**
- Validates cart items
- Checks inventory
- Creates orders
- Processes checkout
- Clears cart after order

**Important:**
- Supabase auto-injects `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- No need to configure environment variables

---

## Step 5: Deploy Edge Function - Orders

1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions
2. Click **Create a new function**
3. Name: `orders`
4. Click **Create function**
5. In the code editor, replace ALL code with contents from:
   `supabase/functions/orders/index.ts`
6. Click **Deploy**

**What this function does:**
- Retrieves orders by session ID or email
- Gets specific order details
- Updates order status
- Updates payment status

---

## Step 6: Verify Edge Functions

1. Go to: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions
2. You should see:
   - ✅ `checkout` (deployed)
   - ✅ `orders` (deployed)

**Test the functions (optional):**
```bash
# Test checkout function
curl -i --location --request POST \
  'https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/checkout' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{}'

# Test orders function
curl -i --location --request GET \
  'https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/orders?sessionId=test' \
  --header 'Authorization: Bearer YOUR_ANON_KEY'
```

---

## Step 7: Build and Test Frontend

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. If build succeeds, start dev server:
   ```bash
   npm run dev
   ```

4. Open browser to: `http://localhost:5173`

---

## Step 8: Verify Everything Works

Test the following features:

### Products
- [ ] Browse products on homepage
- [ ] View product details
- [ ] Filter by collection (Luxury, Elegance, Essence)
- [ ] View candles, perfumes, fragrance bars

### Cart
- [ ] Add items to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] Cart persists on refresh

### Wishlist
- [ ] Add items to wishlist
- [ ] Remove from wishlist
- [ ] View wishlist page

### Checkout
- [ ] Go to cart
- [ ] Click checkout
- [ ] Fill in shipping info
- [ ] Place order
- [ ] See order confirmation

### Orders
- [ ] View order confirmation page
- [ ] See order number
- [ ] Check order status

---

## Troubleshooting

### Database Issues

**Problem:** SQL migration fails
- **Solution:** Check if tables already exist. Drop existing tables first:
  ```sql
  DROP TABLE IF EXISTS order_status_history CASCADE;
  DROP TABLE IF EXISTS shipping_addresses CASCADE;
  DROP TABLE IF EXISTS order_items CASCADE;
  DROP TABLE IF EXISTS orders CASCADE;
  DROP TABLE IF EXISTS wishlist_items CASCADE;
  DROP TABLE IF EXISTS contact_messages CASCADE;
  DROP TABLE IF EXISTS cart_items CASCADE;
  DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
  DROP TABLE IF EXISTS blog_posts CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS collections CASCADE;
  ```

**Problem:** RLS policies prevent data access
- **Solution:** Check RLS policies in Supabase Dashboard > Authentication > Policies
- Ensure all tables have appropriate public read policies

### Edge Function Issues

**Problem:** Function not found (404)
- **Solution:** Verify function is deployed in dashboard
- Check function name matches exactly: `checkout` or `orders`

**Problem:** CORS errors
- **Solution:** Edge functions already include proper CORS headers
- Ensure you're using the correct Supabase URL

**Problem:** Authorization error
- **Solution:** Check you're sending the anon key in requests
- Verify anon key in .env is correct

### Frontend Issues

**Problem:** Build fails
- **Solution:** Run `npm install` first
- Check for TypeScript errors: `npm run typecheck`

**Problem:** Products not loading
- **Solution:**
  1. Check .env has correct URL and anon key
  2. Verify database migration ran successfully
  3. Check browser console for errors
  4. Verify RLS policies allow public read on products table

**Problem:** Cart not persisting
- **Solution:** Check browser localStorage
- Verify cart_items table exists
- Check RLS policies on cart_items table

---

## Edge Function URLs

Once deployed, your edge functions will be available at:

- **Checkout:** `https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/checkout`
- **Orders:** `https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/orders`

These are already configured in your frontend code.

---

## Database Tables Overview

| Table | Purpose |
|-------|---------|
| `collections` | Product categories (Luxury, Elegance, Essence) |
| `products` | All products (candles, perfumes, fragrance bars) |
| `blog_posts` | Blog content |
| `newsletter_subscribers` | Newsletter emails |
| `cart_items` | Shopping cart (session-based) |
| `contact_messages` | Contact form submissions |
| `wishlist_items` | User wishlists |
| `orders` | Customer orders |
| `order_items` | Line items in orders |
| `shipping_addresses` | Shipping details |
| `order_status_history` | Order tracking |

---

## Next Steps After Deployment

1. **Payment Gateway Integration (ICICI)**
   - The checkout flow is ready
   - Payment gateway can be integrated later
   - Currently supports Cash on Delivery

2. **Email Notifications**
   - Skipped for now
   - Can be added with Supabase Edge Functions + SendGrid/Resend

3. **Admin Dashboard**
   - Consider building admin panel for:
     - Order management
     - Product management
     - Inventory tracking

4. **Production Deployment**
   - Deploy to Vercel/Netlify
   - Connect custom domain
   - Set up environment variables

---

## Summary

You now have:
- ✅ Complete database schema in your Supabase
- ✅ 17 demo products seeded
- ✅ Storage buckets for images
- ✅ Edge functions for checkout and orders
- ✅ Frontend connected to your Supabase
- ✅ Full e-commerce workflow

**Everything is running in YOUR Supabase project:**
**https://zviqnojhfxcbpuoegyhs.supabase.co**

No dependencies on old Supabase. Fresh setup. Ready to go!
