# The Bee Empress - Luxury Beeswax E-commerce

A production-ready, premium e-commerce website for luxury beeswax candles, solid perfumes, and fragrance baRs Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Implemented (MVP)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Product catalog with collections
- ✅ Shopping cart with session persistence
- ✅ Quick view modal
- ✅ Newsletter subscription with coupon
- ✅ Blog with 4 seed posts
- ✅ Contact form
- ✅ About & Sustainability pages
- ✅ Smooth scrolling navigation
- ✅ Search functionality
- ✅ WhatsApp integration
- ✅ Database-driven content
- ✅ Accessibility features (ARIA labels, semantic HTML, keyboard navigation)

### Phase 2 (Future)
- Gift box builder (drag & drop)
- Product quiz
- Customer reviews
- Subscription service
- Advanced personalization
- Payment integration (Stripe/Razorpay)

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Inter (sans-serif)
- **Build Tool**: Vite
- **Deployment**: Static hosting (Netlify, Vercel, etc.)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Database Setup

The database schema includes:
- **Collections**: Product groupings (Luxury, Elegance, Essence, Solid Perfumes, Fragrance Bars)
- **Products**: 11 sample products with full details
- **Blog Posts**: 4 articles about candle care, fragrance bars, solid perfumes, and sustainability
- **Newsletter Subscribers**: Email collection with coupon tracking
- **Cart Items**: Session-based shopping cart
- **Contact Messages**: Customer inquiries

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Project Structure

```
src/
├── components/         # React components
│   ├── Header.tsx     # Sticky navigation with cart icon
│   ├── Footer.tsx     # Links, newsletter, social media
│   ├── Hero.tsx       # Homepage hero section
│   ├── ProductCard.tsx # Product display with quick actions
│   ├── MiniCart.tsx   # Slide-out cart panel
│   ├── QuickView.tsx  # Product quick view modal
│   ├── CollectionGrid.tsx
│   ├── WhyBeeswax.tsx
│   ├── About.tsx
│   ├── Sustainability.tsx
│   ├── Contact.tsx
│   └── Blog.tsx
├── lib/
│   ├── supabase.ts    # Supabase client & types
│   └── cart.ts        # Cart session management
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles

STYLE_GUIDE.md         # Design system documentation
```

## Design System

See `STYLE_GUIDE.md` for complete details on:
- Color palette (Honey #D69C4A, Deep Charcoal #1F2124, Off-White #FFF9F2)
- Typography (Playfair Display for headings, Inter for body)
- Spacing (8px base scale)
- Component styles (buttons, cards, forms)
- Responsive breakpoints
- Animations and transitions
- Accessibility guidelines

## Key Design Principles

1. **Premium Feel**: Sophisticated serif fonts, warm colors, ample whitespace
2. **Sustainability Focus**: Green accents, eco-friendly messaging throughout
3. **Product-First**: Large, beautiful imagery with sensory descriptions
4. **Mobile-Optimized**: Touch-friendly interactions, responsive layouts
5. **Performance**: Lazy-loaded images, optimized assets, fast page loads

## Content Guidelines

### Product Descriptions
- Short description: 15-20 words (sensory)
- Full description: 200-400 words (storytelling)
- Include scent notes (Top/Heart/Base)
- Sustainability information

### Blog Posts
- Hero image (Pexels)
- 400-800 word articles
- Practical advice + brand storytelling
- SEO-optimized titles and excerpts

## SEO Optimization

- Meta tags on all pages
- Semantic HTML structure
- Alt text on all images
- Clean URL structure
- Open Graph tags (ready for implementation)
- Structured data for products (ready for JSON-LD)

## Accessibility

- WCAG 2.1 AA compliant
- 4.5:1 contrast ratios
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML
- ARIA labels where needed

## Performance Optimizations

- Code splitting
- Lazy loading images
- Optimized fonts (preconnect)
- Minified CSS/JS
- WebP images with fallbacks
- CDN-ready assets

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build
```bash
npm run build
```

### Deploy to Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Import project from Git
2. Framework preset: Vite
3. Add environment variables

## Environment Variables

Required:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Contributing

This is a production template. To customize:
1. Update product data in Supabase
2. Replace stock photos with your own
3. Customize colors in Tailwind config
4. Update contact information (email, phone, WhatsApp)
5. Integrate payment processor (Stripe/Razorpay)

## License

This project is provided as a production-ready template for e-commerce websites.

## Support

For questions or issues:
- Check the Style Guide for design questions
- Review the Supabase schema for database queries
- See component files for implementation examples

---

Built with care for The Bee Empress 🐝
