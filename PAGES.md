# The Bee Empress - Page Structure

## Main Navigation Pages (6 Pages)

### 1. **Home** (`/`)
- Hero section with CTA buttons
- Collections showcase (3 tiles: Luxury, Elegance, Essence)
- Best sellers grid (4 featured products)
- Why Beeswax benefits section
- Gift box builder callout
- Newsletter signup

### 2. **Shop** (`/shop`)
Landing page organizing all products by category:
- **Candles** section with 3 sub-collections
  - Luxury
  - Elegance
  - Essence
- **Solid Perfumes** (all 5 fragrances)
- **Fragrance Bars** (all bars)

Each category shows clickable tiles linking to collection pages.

### 3. **About Us** (`/about`)
- Brand story and founder narrative
- Company values (Craftsmanship, Sustainability, Transparency)
- Behind-the-scenes photo gallery (4 images)
- Founder quote
- Mission statement

### 4. **Sustainability** (`/sustainability`)
- 4 initiative cards (Ethical Sourcing, Beekeeper Partnerships, Zero Waste, Clean Manufacturing)
- Impact metrics (10% profits, 50+ families, 100% carbon neutral)
- Why Beeswax vs Paraffin comparison
- Beekeeper partnership information
- Call-to-action for conservation

### 5. **Contact Us** (`/contact`)
- Contact form (Name, Email, Phone, Message)
- Email contact
- Phone contact
- WhatsApp integration
- Business hours
- Quick response guarantee

### 6. **Cart** (`/cart`)
Full-page cart view with:
- Product list with images and pricing
- Quantity adjusters
- Remove item buttons
- Shipping information
- Order summary
- Checkout button
- Free shipping threshold notification

---

## Sub-Pages & Collections

### Collections
Each collection shows products filtered by type:

#### **Candles Collection** (3 segments)
- **Luxury** - Premium, opulent scents
  - Golden Hour
  - Midnight Garden
- **Elegance** - Sophisticated, timeless
  - White Tea & Fig
  - Coastal Morning
- **Essence** - Pure, minimal
  - Pure Beeswax
  - Lavender Fields

#### **Solid Perfumes**
All 5 fragrances with gender tags:
- Nomad (Unisex)
- Wild Honey (Unisex)
- Forest Bathing (Unisex)
- Heritage (Masculine)
- Rose Garden (Feminine)

#### **Fragrance Bars**
- Linen & Lavender Bar

### Product Detail Pages
Individual product pages accessible from collections:
- Large product gallery (4-6 images with thumbnails)
- Product title and price
- Short sensory description
- Scent profile (Top/Heart/Base notes)
- Quantity selector
- Add to Cart button
- Wishlist & Share buttons
- Tabs for:
  - Description (full product story)
  - Ingredients (bulleted list)
  - How to Use (instructions)
  - Sustainability (eco-impact)
- SKU and dimensions

---

## Navigation Flow

```
Home
├── Shop
│   ├── Candles
│   │   ├── Luxury
│   │   │   ├── Golden Hour (Product Detail)
│   │   │   └── Midnight Garden (Product Detail)
│   │   ├── Elegance
│   │   │   ├── White Tea & Fig (Product Detail)
│   │   │   └── Coastal Morning (Product Detail)
│   │   └── Essence
│   │       ├── Pure Beeswax (Product Detail)
│   │       └── Lavender Fields (Product Detail)
│   ├── Solid Perfumes
│   │   ├── Nomad (Product Detail)
│   │   ├── Wild Honey (Product Detail)
│   │   ├── Forest Bathing (Product Detail)
│   │   ├── Heritage (Product Detail)
│   │   └── Rose Garden (Product Detail)
│   └── Fragrance Bars
│       └── Linen & Lavender Bar (Product Detail)
├── About Us
├── Sustainability
├── Contact Us
└── Cart
```

---

## Component Structure

### Pages Directory (`src/pages/`)
- `HomePage.tsx` - Home landing page
- `ShopPage.tsx` - Shop category landing
- `CollectionPage.tsx` - Collection filtered view
- `ProductDetailPage.tsx` - Individual product page
- `AboutPage.tsx` - About the brand
- `SustainabilityPage.tsx` - Sustainability info
- `ContactPage.tsx` - Contact form
- `CartPage.tsx` - Shopping cart

### Shared Components (`src/components/`)
- `Header.tsx` - Navigation header with cart icon
- `Footer.tsx` - Footer with newsletter
- `ProductCard.tsx` - Product grid card
- `MiniCart.tsx` - Cart dropdown/modal
- `QuickView.tsx` - Product preview modal

---

## Routing

Client-side navigation using React state:
- All pages accessed through `navigateTo(pageName, params)` function
- Supports parameter passing (e.g., collection slug)
- Smooth scroll to top on page change
- No page reloads - instant transitions

---

## Key Features

✅ **6 Main Pages** as requested
✅ **3 Candle Sub-collections** (Luxury, Elegance, Essence)
✅ **Solid Perfumes** collection with 5 products
✅ **Fragrance Bars** collection
✅ **Product Detail Pages** with tabs and galleries
✅ **Shopping Cart** with quantity management
✅ **Newsletter** subscription
✅ **Contact Form** with Supabase integration
✅ **Responsive Design** (mobile-first)
✅ **Production Build** (5.64s build time)
✅ **Fast Navigation** (no page reloads)

---

## Database Integration

All pages are powered by Supabase:
- **Collections** table stores category info
- **Products** table contains all product details
- **Cart Items** table manages shopping cart per session
- **Contact Messages** table stores form submissions
- **Newsletter Subscribers** table for email signups

RLS (Row Level Security) policies ensure appropriate access control.
