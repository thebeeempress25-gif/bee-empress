function getSessionId(): string {
  let sessionId = localStorage.getItem('wishlist_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('wishlist_session_id', sessionId);
  }
  return sessionId;
}

function getLocalWishlist(): string[] {
    const listJson = localStorage.getItem(`wishlist_${getSessionId()}`);
    if (!listJson) return [];
    try {
        return JSON.parse(listJson);
    } catch {
        return [];
    }
}

function saveLocalWishlist(list: string[]) {
    localStorage.setItem(`wishlist_${getSessionId()}`, JSON.stringify(list));
}

export async function getWishlist(): Promise<string[]> {
  return getLocalWishlist();
}

export async function addToWishlist(productId: string): Promise<void> {
    const list = getLocalWishlist();
    if (!list.includes(productId)) {
        list.push(productId);
        saveLocalWishlist(list);
    }
}

export async function removeFromWishlist(productId: string): Promise<void> {
    let list = getLocalWishlist();
    list = list.filter(id => id !== productId);
    saveLocalWishlist(list);
}

export async function isInWishlist(productId: string): Promise<boolean> {
    const list = getLocalWishlist();
    return list.includes(productId);
}
