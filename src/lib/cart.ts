import { supabase } from './supabase';

export function getSessionId(): string {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
}

export type CartItemWithProduct = {
  id: string;
  product_id: string;
  quantity: number;
  gift_wrap: boolean;
  product: {
    name: string;
    price: number;
    offer_price?: number;
    images: string[];
    slug: string;
  };
};

export async function loadCart(): Promise<CartItemWithProduct[]> {
  const sessionId = getSessionId();

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      product_id,
      quantity,
      gift_wrap,
      products (
        name,
        price,
        offer_price,
        images,
        slug
      )
    `)
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error loading cart:', error);
    return [];
  }

  return (data || []).map(item => {
    // Handle products relation - it can be an object or array depending on Supabase version
    const product = Array.isArray(item.products) ? item.products[0] : item.products;

    return {
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      gift_wrap: item.gift_wrap,
      product: {
        name: product?.name || '',
        price: product?.price || 0,
        offer_price: product?.offer_price,
        images: product?.images || [],
        slug: product?.slug || '',
      }
    };
  });
}

export async function addToCart(productId: string, quantity: number = 1, giftWrap: boolean = false): Promise<void> {
  const sessionId = getSessionId();

  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('session_id', sessionId)
    .eq('product_id', productId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('cart_items')
      .insert({
        session_id: sessionId,
        product_id: productId,
        quantity,
        gift_wrap: giftWrap,
      });
  }
}

export async function updateCartItem(cartItemId: string, quantity: number, giftWrap?: boolean): Promise<void> {
  const updates: any = { quantity };
  if (giftWrap !== undefined) {
    updates.gift_wrap = giftWrap;
  }

  await supabase
    .from('cart_items')
    .update(updates)
    .eq('id', cartItemId);
}

export async function removeFromCart(cartItemId: string): Promise<void> {
  await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
}

export async function clearCart(): Promise<void> {
  const sessionId = getSessionId();

  await supabase
    .from('cart_items')
    .delete()
    .eq('session_id', sessionId);
}
