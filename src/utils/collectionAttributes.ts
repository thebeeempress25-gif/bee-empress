/**
 * Collection attribute overrides
 * Maps collection slugs to their display attributes
 */

export type CollectionAttributes = {
    tags: string[];
    tagline: string;
};

export const COLLECTION_ATTRIBUTES: Record<string, CollectionAttributes> = {
    'classic-fresh': {
        tags: ['Clean', 'Crisp', 'Comfortingly Pure'],
        tagline: 'Clean, Crisp, Comfortingly Pure.'
    },
    'floral-whisper': {
        tags: ['Delicate', 'Romantic', 'Subtly Enchanting'],
        tagline: 'Delicate, Romantic, Subtly Enchanting.'
    },
    'warm-luxe': {
        tags: ['Opulent', 'Cozy', 'Deeply Captivating'],
        tagline: 'Opulent, Cozy, Deeply Captivating.'
    }
};

/**
 * Get collection attributes by slug
 * @param slug - Collection slug
 * @returns Collection attributes or default values
 */
export function getCollectionAttributes(slug: string): CollectionAttributes {
    return COLLECTION_ATTRIBUTES[slug] || {
        tags: [],
        tagline: ''
    };
}

/**
 * Get collection tags by slug
 * @param slug - Collection slug
 * @returns Array of tag strings
 */
export function getCollectionTags(slug: string): string[] {
    return getCollectionAttributes(slug).tags;
}

/**
 * Get collection tagline by slug
 * @param slug - Collection slug
 * @returns Tagline string
 */
export function getCollectionTagline(slug: string): string {
    return getCollectionAttributes(slug).tagline;
}
