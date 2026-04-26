import type { Product } from '../lib/data';

/**
 * Get the discount amount based on product type
 */
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

/**
 * Calculate pricing details for a product
 * Accepts both full Product type and simplified cart product type
 */
export function getProductPricing(product: Product | { price: number; type: string }) {
    const discountAmount = getDiscountAmount(product.type);
    const displayPrice = product.price; // Current offer price
    const originalPrice = product.price + discountAmount; // MRP
    const savings = discountAmount;

    return {
        displayPrice,
        originalPrice,
        savings,
        discountAmount,
    };
}
