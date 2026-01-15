/**
 * Scent Note Label Mapping
 * 
 * This utility provides a centralized mapping for scent note display labels.
 * The keys (top, heart, base) are used in Supabase and must NOT be changed.
 * Only the display labels are customized here for UI presentation.
 */

export type ScentNoteKey = 'top' | 'heart' | 'base';

export const SCENT_NOTE_LABELS: Record<ScentNoteKey, string> = {
    top: 'Energy',
    heart: 'Notes',
    base: 'Mood',
};

/**
 * Get the display label for a scent note key
 * @param key - The scent note key from database (top, heart, base)
 * @returns The user-facing display label
 */
export function getScentNoteLabel(key: ScentNoteKey): string {
    return SCENT_NOTE_LABELS[key];
}
