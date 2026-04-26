import { getProductById } from './data';

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
    type: string;
  };
};

type LocalCartItem = {
  id: string;
  product_id: string;
  quantity: number;
  gift_wrap: boolean;
};

function getLocalCart(): LocalCartItem[] {
  const cartJson = localStorage.getItem(`cart_${getSessionId()}`);
  if (!cartJson) return [];
  try {
    return JSON.parse(cartJson);
  } catch {
    return [];
  }
}

function saveLocalCart(cart: LocalCartItem[]) {
  localStorage.setItem(`cart_${getSessionId()}`, JSON.stringify(cart));
}

export async function loadCart(): Promise<CartItemWithProduct[]> {
  const localCart = getLocalCart();
  const items: CartItemWithProduct[] = [];

  for (const item of localCart) {
    const product = getProductById(item.product_id);
    if (product) {
      items.push({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        gift_wrap: item.gift_wrap,
        product: {
          name: product.name,
          price: product.price,
          offer_price: product.offer_price,
          images: product.images,
          slug: product.slug,
          type: product.type,
        }
      });
    }
  }

  return items;
}

export async function addToCart(productId: string, quantity: number = 1, giftWrap: boolean = false): Promise<void> {
  const cart = getLocalCart();
  const existing = cart.find(item => item.product_id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: `cart_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      product_id: productId,
      quantity,
      gift_wrap: giftWrap,
    });
  }

  saveLocalCart(cart);
}

export async function updateCartItem(cartItemId: string, quantity: number, giftWrap?: boolean): Promise<void> {
  const cart = getLocalCart();
  const item = cart.find(i => i.id === cartItemId);
  if (item) {
    item.quantity = quantity;
    if (giftWrap !== undefined) {
      item.gift_wrap = giftWrap;
    }
    saveLocalCart(cart);
  }
}

export async function removeFromCart(cartItemId: string): Promise<void> {
  let cart = getLocalCart();
  cart = cart.filter(item => item.id !== cartItemId);
  saveLocalCart(cart);
}

export async function clearCart(): Promise<void> {
  saveLocalCart([]);
}
