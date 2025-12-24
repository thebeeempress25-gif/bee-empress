import { supabase } from './supabase';

function getSessionId(): string {
  let sessionId = localStorage.getItem('wishlist_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('wishlist_session_id', sessionId);
  }
  return sessionId;
}

export async function getWishlist(): Promise<string[]> {
  const sessionId = getSessionId();
  const { data } = await supabase
    .from('wishlist_items')
    .select('product_id')
    .eq('session_id', sessionId);

  return data?.map(item => item.product_id) || [];
}

export async function addToWishlist(productId: string): Promise<void> {
  const sessionId = getSessionId();
  await supabase
    .from('wishlist_items')
    .insert({ session_id: sessionId, product_id: productId });
}

export async function removeFromWishlist(productId: string): Promise<void> {
  const sessionId = getSessionId();
  await supabase
    .from('wishlist_items')
    .delete()
    .eq('session_id', sessionId)
    .eq('product_id', productId);
}

export async function isInWishlist(productId: string): Promise<boolean> {
  const sessionId = getSessionId();
  const { data } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('session_id', sessionId)
    .eq('product_id', productId)
    .maybeSingle();

  return !!data;
}
