
export interface text_model {
    id: number;
    document: number;
    type: string;
    content: string;
    heading_level: string;
}

export const CACHE_KEY_TEXT = ['text'];
export const CACHE_KEY_TEXTS = ['texts'];