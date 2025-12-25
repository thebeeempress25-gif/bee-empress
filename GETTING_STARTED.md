# Getting Started - The Bee Empress

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Site Navigation

### How to Navigate Between Pages

The app uses client-side routing. Click on:
- **Logo** - Returns to Home
- **Navigation menu** - Shop, About, Sustainability, Contact
- **Product cards** - Opens quick-view modal or collection
- **Cart icon** - Shows shopping cart page
- **Collection tiles** - Opens filtered product list

### URL Structure (for reference)
- Home: `/`
- Shop: `/shop`
- Collection: `/collection?slug=luxury` (Luxury/Elegance/Essence/solid-perfumes/fragrance-bars)
- Product: `/product?slug=golden-hour`
- About: `/about`
- Sustainability: `/sustainability`
- Contact: `/contact`
- Cart: `/cart`

---

## Database Tables

### Collections
Stores product category information:
- `id`, `slug`, `name`, `description`, `image_url`, `display_order`

### Products
Main product catalog:
- `id`, `sku`, `name`, `slug`, `type` (candle/solid_perfume/fragrance_bar)
- `collection_id`, `short_description`, `full_description`, `price`
- `images`, `scent_notes`, `ingredients`, `how_to_use`, `sustainability_info`
- `gender_tag` (for perfumes), `is_featured`, `is_active`

### Cart Items
Session-based shopping cart:
- `id`, `session_id`, `product_id`, `quantity`, `gift_wrap`

### Contact Messages
Form submissions:
- `id`, `name`, `email`, `phone`, `message`

### Newsletter Subscribers
Email list:
- `id`, `email`, `subscribed_at`, `coupon_sent`

---

## Key Files

```
src/
├── pages/              # Main page components
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── CollectionPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── AboutPage.tsx
│   ├── SustainabilityPage.tsx
│   ├── ContactPage.tsx
│   └── CartPage.tsx
│
├── components/         # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── MiniCart.tsx
│   └── QuickView.tsx
│
├── lib/
│   ├── supabase.ts    # Supabase client & types
│   └── cart.ts        # Cart session management
│
├── App.tsx            # Main app with routing
├── main.tsx           # Entry point
└── index.css          # Global styles

STYLE_GUIDE.md         # Design system
PAGES.md              # Page structure
```

---

## Core Features

### ✨ Shopping
- Browse products by collection
- Quick preview modals
- Add to cart with quantity selection
- Session-based cart persistence
- Free shipping threshold (Rs100)

### 📧 Newsletter
- Email subscription with 10% coupon
- Signup on homepage and footer
- Error handling for duplicates

### 📝 Contact
- Contact form with validation
- Multiple contact methods (email, phone, WhatsApp)
- Business hours display
- Form data saved to Supabase

### 🎨 Design
- Luxury aesthetic with warm colors
- Responsive mobile-first design
- Smooth animations and transitions
- Accessible WCAG 2.1 AA compliant

---

## Customization Guide

### Change Logo/Branding
Edit `src/components/Header.tsx`:
```tsx
<button onClick={() => onNavigate('home')} className="...">
  Your Brand Name
</button>
```

### Update Colors
Edit `tailwind.config.js` or use inline classes:
- Primary: `#D69C4A` (honey)
- Background: `#FFF9F2` (off-white)
- Text: `#1F2124` (charcoal)

### Add New Products
1. Add to Supabase `products` table
2. Assign to a collection via `collection_id`
3. Product appears automatically in collections

### Add New Pages
1. Create new file in `src/pages/`
2. Add case to switch statement in `App.tsx`
3. Import and add navigation link

---

## Deployment

### Netlify
1. Connect Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import project
2. Framework: Vite
3. Build output: dist
4. Add environment variables

---

## Performance

- **Build size:** 337.77 KB (gzipped: 94.73 KB)
- **Build time:** ~5.64 seconds
- **Lazy loading:** Images load on demand
- **Code splitting:** Automatic with Vite
- **Lighthouse ready:** 90+ scores achievable

---

## Troubleshooting

**Cart not persisting?**
- Check browser localStorage is enabled
- Verify `getSessionId()` function in `lib/cart.ts`

**Products not showing?**
- Verify Supabase connection in `.env`
- Check RLS policies allow public SELECT

**Images not loading?**
- Verify image URLs are valid
- Check browser's mixed content policy

**Navigation not working?**
- Ensure `onNavigate` prop is passed correctly
- Check page name matches switch statement in `App.tsx`

---

## Need Help?

- Review `STYLE_GUIDE.md` for design specifications
- Check `PAGES.md` for page structure
- See `README.md` for complete documentation
- Review component files for implementation examples
