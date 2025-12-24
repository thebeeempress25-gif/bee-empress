# Quick Start Checklist

## Your New Supabase Project
**URL:** https://zviqnojhfxcbpuoegyhs.supabase.co

---

## Step 1: Get Your Anon Key (2 minutes)

1. Visit: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/settings/api
2. Copy the **anon** **public** key
3. Update `.env` file:
   ```
   VITE_SUPABASE_ANON_KEY=<paste-your-key-here>
   ```

---

## Step 2: Run Database Migration (2 minutes)

1. Visit: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/sql/new
2. Open file: `SUPABASE_MIGRATION.sql`
3. Copy ALL contents
4. Paste into SQL Editor
5. Click **RUN**
6. Wait for success ✓

**What this does:**
- Creates 11 tables
- Sets up security (RLS)
- Seeds 17 demo products

---

## Step 3: Create Storage Buckets (1 minute)

1. Visit: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/sql/new
2. Open file: `STORAGE_BUCKETS.sql`
3. Copy ALL contents
4. Paste into SQL Editor
5. Click **RUN**

**What this does:**
- Creates `products` bucket
- Creates `collections` bucket
- Creates `blog` bucket

---

## Step 4: Deploy Checkout Function (2 minutes)

1. Visit: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions
2. Click **Create a new function**
3. Name: `checkout`
4. Click **Create function**
5. Open file: `supabase/functions/checkout/index.ts`
6. Copy ALL contents
7. Paste into function editor
8. Click **Deploy**

---

## Step 5: Deploy Orders Function (2 minutes)

1. Visit: https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions
2. Click **Create a new function**
3. Name: `orders`
4. Click **Create function**
5. Open file: `supabase/functions/orders/index.ts`
6. Copy ALL contents
7. Paste into function editor
8. Click **Deploy**

---

## Step 6: Test Locally (1 minute)

```bash
# Build project
npm run build

# Start dev server
npm run dev
```

Open: http://localhost:5173

---

## Verify Everything Works

- [ ] Homepage loads with products
- [ ] Can view product details
- [ ] Can add items to cart
- [ ] Cart shows correct items
- [ ] Can complete checkout
- [ ] Order confirmation page shows

---

## Total Time: ~10 minutes

---

## If Something Goes Wrong

See `DEPLOYMENT_GUIDE.md` for troubleshooting.

Common issues:
- **Build fails** → Run `npm install` first
- **Products don't load** → Check .env has correct anon key
- **Checkout fails** → Verify edge functions are deployed

---

## What You Get

- ✅ 9 Beeswax Candles
- ✅ 5 Solid Perfumes
- ✅ 3 Fragrance Bars
- ✅ Shopping cart
- ✅ Wishlist
- ✅ Checkout flow
- ✅ Order management
- ✅ Complete e-commerce system

---

## Files Reference

| File | What It Does |
|------|--------------|
| `SUPABASE_MIGRATION.sql` | Database setup + demo products |
| `STORAGE_BUCKETS.sql` | Image storage setup |
| `DEPLOYMENT_GUIDE.md` | Detailed instructions |
| `EDGE_FUNCTIONS_REFERENCE.md` | API documentation |
| `MIGRATION_COMPLETE.md` | What was done |
| `QUICK_START.md` | This file |

---

## Your Supabase URLs

- **Dashboard:** https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs
- **SQL Editor:** https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/sql
- **Storage:** https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/storage
- **Functions:** https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions
- **API Settings:** https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/settings/api

---

**That's it! Follow the 6 steps above and you're live!**
