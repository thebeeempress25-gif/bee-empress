# Product Pricing Structure - Bee Empress

## Overview
The Bee Empress e-commerce application implements a **category-specific discount pricing system** where different product types have different discount amounts.

## Pricing Logic

### Discount Amounts by Product Type

| Product Type | Discount Amount | Example |
|-------------|----------------|---------|
| **Candles** | Rs 500 | If price = Rs 1,500, then MRP = Rs 2,000 |
| **Solid Perfumes** | Rs 300 | If price = Rs 800, then MRP = Rs 1,100 |
| **Fragrance Bars** | Rs 400 | If price = Rs 1,200, then MRP = Rs 1,600 |

### How It Works

1. **Database Storage**: Only the **discounted/offer price** is stored in the database (`product.price`)
2. **Original Price Calculation**: The original price (MRP) is calculated dynamically as:
   ```
   Original Price = product.price + discount_amount
   ```
3. **Display**:
   - **Offer Price**: Shown in bold gold color (`#D69C4A`)
   - **Original Price**: Shown with strikethrough in gray
   - **Savings**: Displayed as a badge (varies by product type)

## Implementation

### Core Utility: `src/utils/pricing.ts`

```typescript
export function getDiscountAmount(productType: string): number {
  switch (productType) {
    case 'candle':
      return 500;
    case 'solid_perfume':
      return 300;
    case 'fragrance_bar':
      return 400;
    default:
      return 500; // Default fallback
  }
}

export function getProductPricing(product) {
  const discountAmount = getDiscountAmount(product.type);
  const displayPrice = product.price; // Current offer price
  const originalPrice = product.price + discountAmount; // MRP
  const savings = discountAmount;

  return { displayPrice, originalPrice, savings, discountAmount };
}
```

### Updated Components

The following components now use category-specific pricing:

1. **ProductCard.tsx** - Product grid cards
2. **ProductDetailPage.tsx** - Individual product pages
3. **QuickView.tsx** - Quick view modal
4. **CartPage.tsx** - Shopping cart
5. **CheckoutPage.tsx** - Checkout summary

### Cart Integration

The cart system was updated to include the `type` field:

**`src/lib/cart.ts`**:
- Added `type: string` to `CartItemWithProduct` type
- Updated Supabase query to fetch product type
- Default fallback to 'candle' if type is missing

## Visual Examples

### Candle (Rs 500 discount)
- **Offer Price**: Rs 1,500 (bold, gold)
- **Original Price**: ~~Rs 2,000~~ (strikethrough, gray)
- **You Save**: Rs 500

### Solid Perfume (Rs 300 discount)
- **Offer Price**: Rs 800 (bold, gold)
- **Original Price**: ~~Rs 1,100~~ (strikethrough, gray)
- **You Save**: Rs 300

### Fragrance Bar (Rs 400 discount)
- **Offer Price**: Rs 1,200 (bold, gold)
- **Original Price**: ~~Rs 1,600~~ (strikethrough, gray)
- **You Save**: Rs 400

## Benefits

1. **Flexibility**: Easy to adjust discount amounts per product category
2. **Consistency**: Centralized pricing logic in one utility file
3. **Maintainability**: Single source of truth for discount calculations
4. **UI-Only**: No database schema changes required
5. **Type-Safe**: Works with both full Product type and simplified cart product type

## Future Enhancements

Potential improvements:
- Store discount percentages instead of fixed amounts
- Add time-limited promotional discounts
- Implement product-specific discounts (override category defaults)
- Add seasonal pricing variations
