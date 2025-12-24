# Navigation Map - The Bee Empress

## Page Routes

### Main Pages (6)
1. **Home** → Click logo or "Home" nav link
2. **Shop** → "Shop" in header navigation  
3. **About Us** → "About" in header navigation
4. **Sustainability** → "Sustainability" in header navigation
5. **Contact Us** → "Contact" in header navigation
6. **Cart** → Click shopping cart icon in header

---

## Shop Navigation Flow

### From Shop Page
User lands on shop landing page with 3 sections:

#### **CANDLES** Section
Shows 3 collection tiles:
- Luxury → CollectionPage (slug: "luxury")
- Elegance → CollectionPage (slug: "elegance")
- Essence → CollectionPage (slug: "essence")

Each collection page displays products with segment filtering.

#### **SOLID PERFUMES** Section
- "All Solid Perfumes" tile → CollectionPage (slug: "solid-perfumes")

Shows 5 perfume products:
- Nomad
- Wild Honey
- Forest Bathing
- Heritage
- Rose Garden

#### **FRAGRANCE BARS** Section
- "All Fragrance Bars" tile → CollectionPage (slug: "fragrance-bars")

Shows fragrance bar products:
- Linen & Lavender Bar

---

## Collection Pages

### Candles Collections
Each collection shows products + segment filter:

**Luxury** (slug: luxury)
- Opulent segment
- Signature segment
- Limited segment

Products:
1. Golden Hour → ProductDetailPage
2. Midnight Garden → ProductDetailPage

**Elegance** (slug: elegance)
- Classic segment
- Refined segment
- Subtle segment

Products:
1. White Tea & Fig → ProductDetailPage
2. Coastal Morning → ProductDetailPage

**Essence** (slug: essence)
- Pure segment
- Essential segment
- Minimal segment

Products:
1. Pure Beeswax → ProductDetailPage
2. Lavender Fields → ProductDetailPage

### Solid Perfumes Collection (slug: solid-perfumes)
Products:
1. Nomad (Unisex) → ProductDetailPage
2. Wild Honey (Unisex) → ProductDetailPage
3. Forest Bathing (Unisex) → ProductDetailPage
4. Heritage (Masculine) → ProductDetailPage
5. Rose Garden (Feminine) → ProductDetailPage

### Fragrance Bars Collection (slug: fragrance-bars)
Products:
1. Linen & Lavender Bar → ProductDetailPage

---

## Product Detail Pages

Each product has a detail page with:
- Large image gallery
- Scent profile (Top/Heart/Base)
- Ingredients
- How to use
- Sustainability info
- Add to cart button
- Related products

Products:
1. golden-hour → ProductDetailPage (slug)
2. midnight-garden
3. white-tea-fig
4. coastal-morning
5. pure-beeswax
6. lavender-fields
7. nomad
8. wild-honey
9. forest-bathing
10. heritage
11. rose-garden
12. linen-lavender-bar

---

## Quick Actions from Any Page

- **Logo** → Returns to Home
- **"Shop"** link → Goes to Shop page
- **"About"** link → Goes to About page
- **"Sustainability"** link → Goes to Sustainability page
- **"Contact"** link → Goes to Contact page
- **Cart icon** → Goes to Cart page
- **Product card** → Opens quick-view modal
- **Quick-view "View Full Details"** → Goes to ProductDetailPage
- **Add to cart** → Updates cart, shows toast notification
- **Footer links** → Navigate to relevant pages

---

## Navigation Technical Details

### Client-Side Routing
```typescript
// Navigate to a page
navigateTo('home')
navigateTo('shop')
navigateTo('collection', { slug: 'luxury' })
navigateTo('product', { slug: 'golden-hour' })
navigateTo('about')
navigateTo('sustainability')
navigateTo('contact')
navigateTo('cart')
```

### Current Page State
```typescript
currentPage = {
  name: 'collection',    // page name
  params: {
    slug: 'luxury'       // page parameters
  }
}
```

---

## Breadcrumb Navigation

**Product Detail Pages** show breadcrumbs:
- Shop > Collection > Product Name

Users can click "← Back to Collection" to return.

---

## Search & Filter

**On Collection Pages:**
- Segment filtering available for candles
  - Click filter buttons to narrow products
  - Shows only products in that segment

**Product Discovery:**
- Browse from Shop → Category → Collection
- Or click "View All Products" from Home
- Quick view modals for fast browsing
- Product cards show key details at a glance

---

## Key Navigation Features

✅ **Sticky Header** - Navigation always accessible
✅ **Mobile Menu** - Hamburger on small screens
✅ **Back Buttons** - Context navigation where needed
✅ **Breadcrumbs** - Show current location
✅ **Footer Links** - Quick access to main pages
✅ **Quick Actions** - Cart, contact in header
✅ **Logo Links** - Always returns home
✅ **Smooth Transitions** - Page scrolls to top
✅ **No Page Reloads** - Instant navigation

---

## Shopping Flow

1. **Browse**: Home → Shop → Category
2. **Explore**: Click collection tile
3. **Preview**: Hover product, click quick-view
4. **Details**: Click "View Full Details" or collection product
5. **Add**: Increase quantity, click "Add to Cart"
6. **Review**: Click cart icon to see items
7. **Manage**: Adjust quantities, remove items
8. **Checkout**: Click "Proceed to Checkout" (ready for payment integration)

