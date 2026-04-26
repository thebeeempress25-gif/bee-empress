export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  hero_image: string;
  author: string;
  published_at: string;
  created_at: string;
};

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'benefits-of-beeswax',
    title: 'Why Beeswax is Better for You and the Planet',
    excerpt: 'Discover why beeswax candles are the superior choice for your home, from air-purifying properties to sustainable harvesting.',
    content: 'Full content here...',
    hero_image: '/images/beewax.jpeg',
    author: 'Bee Emma',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 'b2',
    slug: 'sustainable-luxury',
    title: 'Defining Sustainable Luxury in Home Fragrance',
    excerpt: 'Luxury doesn\'t have to come at a cost to the earth. Learn how we craft premium scents with minimal environmental impact.',
    content: 'Full content here...',
    hero_image: '/images/package.jpg',
    author: 'Jane Empress',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  }
];

export const getBlogPosts = () => MOCK_BLOG_POSTS;

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  display_order: number;
  parent_collection_id?: string;
  attributes?: {
    tags?: string[];
    tagline?: string;
  };
  created_at: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  type: 'candle' | 'solid_perfume' | 'fragrance_bar';
  collection_id: string;
  short_description: string;
  full_description: string;
  price: number;
  offer_price?: number;
  rating: number;
  images: string[];
  scent_notes: {
    top: string[];
    heart: string[];
    base: string[];
    mood?: string[];
    notes?: string[];
    profile?: string;
    best_for?: string[];
  };
  ingredients: string[];
  how_to_use: string;
  sustainability_info: string;
  dimensions: string;
  reasons_to_love: string[];
  set_contains: string[];
  gender_tag?: 'unisex' | 'masculine' | 'feminine';
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    slug: 'luxury',
    name: 'Luxury Collection',
    description: 'Opulent scents crafted for grand spaces and special moments.',
    image_url: '/images/luxury.jpg',
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'c2',
    slug: 'elegance',
    name: 'Elegance Collection',
    description: 'Sophisticated, classic fragrances for refined tastes.',
    image_url: '/images/elegance.jpg',
    display_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'c3',
    slug: 'essence',
    name: 'Essence Collection',
    description: 'Pure, essential scents that capture the core of nature.',
    image_url: '/images/essence.jpg',
    display_order: 3,
    created_at: new Date().toISOString()
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // LUXURY CANDLES
  {
    id: 'p1',
    sku: 'CANDLE-LUX-001',
    name: 'Mystique Oud',
    slug: 'mystique-oud',
    type: 'candle',
    collection_id: 'c1',
    short_description: 'Bold elegance with smoky oud and warm undertones.',
    full_description: 'Deep, smoky, unforgettable. Mystique Oud is a bold statement piece that transforms any space into a sanctuary of refined mystery.',
    price: 3400,
    offer_price: 2900,
    rating: 4.8,
    images: [
      '/images/mystique_oud_1.png',
      '/images/mystique_oud_2.png',
      '/images/mystique_oud_3.png',
      '/images/mystique_oud_4.png'
    ],
    scent_notes: { top: ['Smoke Accord', 'Spices'], heart: ['Pure Oud', 'Amber'], base: ['Dark Woods', 'Soft Musk'], mood: ['Mysterious', 'Bold', 'Timeless'] },
    ingredients: ['100% Pure Beeswax', 'Oud Essential Oil'],
    how_to_use: 'Trim wick to 1/4 inch before each lighting.',
    sustainability_info: 'Ethically sourced beeswax.',
    dimensions: '3.5" x 4"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours', 'Air-purifying negative ions'],
    set_contains: ['1 Premium Beeswax Candle', 'Elegant reusable vessel'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p2',
    sku: 'CANDLE-LUX-002',
    name: 'Royal Oud Arab',
    slug: 'royal-oud-arab',
    type: 'candle',
    collection_id: 'c1',
    short_description: 'A regal blend of rich oud layered with soft florals.',
    full_description: 'Majestic, graceful, refined. Royal Oud Arab captures the essence of ancient Arabian luxury.',
    price: 3400,
    rating: 4.8,
    images: [
      '/images/royal_oud_arab_1.png',
      '/images/royal_oud_arab_2.png',
      '/images/royal_oud_arab_3.png',
      '/images/royal_oud_arab_4.png'
    ],
    scent_notes: { top: ['Soft Florals'], heart: ['Arabian Oud'], base: ['Vanilla', 'Creamy Woods'], mood: ['Elegant', 'Harmonious', 'Exquisite'] },
    ingredients: ['100% Pure Beeswax', 'Floral & Oud Oils'],
    how_to_use: 'Trim wick to 1/4 inch before each lighting.',
    sustainability_info: 'Sustainable apiaries.',
    dimensions: '3.5" x 4"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Burns clean for 60+ hours'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p3',
    sku: 'CANDLE-LUX-003',
    name: 'Golden Oud Arabia',
    slug: 'golden-oud-arabia',
    type: 'candle',
    collection_id: 'c1',
    short_description: 'Luminous oud infused with golden vanilla.',
    full_description: 'Radiant, warm, indulgent. Golden Oud Arabia is like liquid gold for your senses.',
    price: 3400,
    offer_price: 3000,
    rating: 4.8,
    images: [
      '/images/golden_oud_arabia.jpg',
      '/images/goldenoudarabia_1.png',
      '/images/goldenoudarabia_2.png',
      '/images/goldenoudarabia_3.png'
    ],
    scent_notes: { top: ['Warm Vanilla'], heart: ['Golden Oud'], base: ['Sweet Amber', 'Soft Woods'], mood: ['Warm', 'Indulgent', 'Glowing'] },
    ingredients: ['100% Pure Beeswax', 'Vanilla & Oud Oils'],
    how_to_use: 'Trim wick before each use.',
    sustainability_info: '100% natural components.',
    dimensions: '3.5" x 4"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Air-purifying negative ions'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // ELEGANCE CANDLES
  {
    id: 'p4',
    sku: 'CANDLE-ELE-001',
    name: 'Aura of Grace',
    slug: 'aura-of-grace',
    type: 'candle',
    collection_id: 'c2',
    short_description: 'Soft florals and gentle musk that bring serenity.',
    full_description: 'Calming, elegant, timeless. Aura of Grace wraps you in a delicate embrace of white florals.',
    price: 3100,
    rating: 4.8,
    images: [
      '/images/aura_of_glance_1.png',
      '/images/aura_of_glance_2.png',
      '/images/aura_of_glance_3.png',
      '/images/aura_of_glance_4.png'
    ],
    scent_notes: { top: ['White Florals'], heart: ['Gentle Musk'], base: ['Powdery Woods'], mood: ['Calm', 'Graceful', 'Serene'] },
    ingredients: ['100% Pure Beeswax', 'White Floral Essential Oil'],
    how_to_use: 'Keep away from drafts.',
    sustainability_info: 'Reusable glass vessel.',
    dimensions: '3" x 3.5"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Serene atmosphere'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p5',
    sku: 'CANDLE-ELE-002',
    name: 'Mystic Bloom',
    slug: 'mystic-bloom',
    type: 'candle',
    collection_id: 'c2',
    short_description: 'A magical floral fusion of jasmine and lavender.',
    full_description: 'Dreamy, romantic, enchanting. Mystic Bloom captures the essence of a moonlit garden.',
    price: 3100,
    rating: 4.8,
    images: [
      '/images/mystic_bloom_1.jpg',
      '/images/mystic_bloom_2.jpg',
      '/images/mystic_bloom_3.jpg',
      '/images/mystic_bloom_4.jpg'
    ],
    scent_notes: { top: ['Lavender'], heart: ['Jasmine'], base: ['Soft Florals'], mood: ['Romantic', 'Dreamy', 'Enchanting'] },
    ingredients: ['Pure Beeswax', 'Lavender & Jasmine Oils'],
    how_to_use: 'Trim wick before lighting.',
    sustainability_info: 'Natural materials.',
    dimensions: '3" x 3.5"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Romantic scent profile'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p6',
    sku: 'CANDLE-ELE-003',
    name: 'Divine Soul',
    slug: 'divine-soul',
    type: 'candle',
    collection_id: 'c2',
    short_description: 'Golden amber paired with soft pink florals.',
    full_description: 'Warm, tranquil, soulful. Divine Soul is a gentle embrace for the spirit.',
    price: 3100,
    rating: 4.8,
    images: [
      '/images/divine_soul_1.png',
      '/images/divine_soul_2.png',
      '/images/divine_soul_3.png',
      '/images/divine_soul_4.png'
    ],
    scent_notes: { top: ['Soft Florals'], heart: ['Golden Amber'], base: ['Warm Resin'], mood: ['Warm', 'Soulful', 'Peaceful'] },
    ingredients: ['Pure Beeswax', 'Amber Resin'],
    how_to_use: 'Soothes the soul when burned.',
    sustainability_info: 'Eco-conscious crafting.',
    dimensions: '3" x 3.5"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Tranquil amber scent'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // ESSENCE CANDLES
  {
    id: 'p7',
    sku: 'CANDLE-ESS-001',
    name: 'Ancient Essence',
    slug: 'ancient-essence',
    type: 'candle',
    collection_id: 'c3',
    short_description: 'mountain air blend with sacred myrrh.',
    full_description: 'Grounding, earthy, sacred. Ancient Essence connects you to the earth with its blend of mountain air.',
    price: 2900,
    rating: 4.8,
    images: [
      '/images/ancient_1.png',
      '/images/ancient_2.png',
      '/images/ancient_3.png',
      '/images/ancient_4.jpg'
    ],
    scent_notes: { top: ['Crisp Mountain Air'], heart: ['Resin'], base: ['Myrrh'], mood: ['Sacred', 'Calm', 'Earthy'] },
    ingredients: ['Pure Beeswax', 'Myrrh Resin'],
    how_to_use: 'Great for meditation.',
    sustainability_info: 'Natural apiary sourced.',
    dimensions: '3" x 3"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Earth-purifying'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p8',
    sku: 'CANDLE-ESS-002',
    name: 'Ocean Bloom',
    slug: 'ocean-bloom-candle',
    type: 'candle',
    collection_id: 'c3',
    short_description: 'Oceanic florals blended with sea breeze freshness.',
    full_description: 'Emotional, refreshing, free. Ocean Bloom captures the essence of freedom.',
    price: 2900,
    rating: 4.8,
    images: [
      '/images/oceanbloom_1.png',
      '/images/oceanbloom_2.png',
      '/images/oceanbloom_3.png',
      '/images/oceanbloom_4.png'
    ],
    scent_notes: { top: ['Sea Air'], heart: ['Aquatic Florals'], base: ['Soft Minerals'], mood: ['Free', 'Fresh', 'Uplifting'] },
    ingredients: ['Beeswax', 'Sea Air Fragrance'],
    how_to_use: 'Feel transported to the coast.',
    sustainability_info: 'Eco-packaged.',
    dimensions: '3" x 3"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Refreshing sea breeze'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p9',
    sku: 'CANDLE-ESS-003',
    name: 'Ethereal Forest',
    slug: 'ethereal-forest',
    type: 'candle',
    collection_id: 'c3',
    short_description: 'A mystical forest blend of pine and cedar.',
    full_description: 'Enchanting, woody, serene. Ethereal Forest brings the magic of an ancient woodland.',
    price: 2900,
    rating: 4.8,
    images: [
      '/images/etheral_forest_1.png',
      '/images/etheral_forest_2.png',
      '/images/etheral_forest_3.png',
      '/images/etheral_forest_4.jpg'
    ],
    scent_notes: { top: ['Pine'], heart: ['Cedarwood'], base: ['Forest Mist'], mood: ['Calm', 'Magical', 'Woody'] },
    ingredients: ['Beeswax', 'Cedar & Pine Oils'],
    how_to_use: 'Grounding and calming.',
    sustainability_info: 'Sustainable harvesting.',
    dimensions: '3" x 3"',
    reasons_to_love: ['Hand-poured with 100% pure beeswax', 'Woody sanctuary'],
    set_contains: ['1 Premium Beeswax Candle'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // SOLID PERFUMES
  {
    id: 'p10',
    sku: 'PERFUME-001',
    name: 'Golden Oud Arabia Solid Perfume',
    slug: 'golden-oud-arabia-perfume',
    type: 'solid_perfume',
    collection_id: 'c1',
    short_description: 'Bold, opulent, captivating smoky oud.',
    full_description: 'Majestic and warm. Golden Oud Arabia Solid Perfume is your personal signature of luxury.',
    price: 2400,
    rating: 4.9,
    images: [
      '/images/goldenoudarabia_3.png',
      '/images/goldenoudarabia_4.jpg'
    ],
    scent_notes: { top: ['Smoky Oud'], heart: ['Aged Woods'], base: ['Amber'], mood: ['Bold', 'Opulent', 'Captivating'] },
    ingredients: ['Nourishing Beeswax base', 'Oud & Amber'],
    how_to_use: 'Warm with your finger and apply to pulse points.',
    sustainability_info: 'Zero-waste tin.',
    dimensions: 'Compact 0.3 oz',
    reasons_to_love: ['Travel-friendly solid format', 'Nourishing beeswax base', 'Long-lasting fragrance'],
    set_contains: ['1 Solid Perfume Compact (0.3 oz)', 'Twist-open tin container'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p11',
    sku: 'PERFUME-002',
    name: 'Ancient Essence Musk',
    slug: 'ancient-essence-musk',
    type: 'solid_perfume',
    collection_id: 'c3',
    short_description: 'Soft, seductive, timeless classic musk.',
    full_description: 'Intimate and timeless. Ancient Essence Musk is the essence of quiet confidence.',
    price: 2100,
    rating: 4.9,
    images: [
      '/images/ancientessencemusk_1.png',
      '/images/ancientessencemusk_2.png',
      '/images/ancientessencemusk_3.png'
    ],
    scent_notes: { top: ['Classic Musk'], heart: ['Creamy Warmth'], base: ['Soft Musk'] },
    ingredients: ['Beeswax', 'Musk Essential Oil'],
    how_to_use: 'Apply to wrists and neck.',
    sustainability_info: 'Reusable packaging.',
    dimensions: 'Compact 0.3 oz',
    reasons_to_love: ['Travel-friendly solid format', 'Nourishing beeswax base'],
    set_contains: ['1 Solid Perfume Compact (0.3 oz)'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p12',
    sku: 'PERFUME-003',
    name: 'Ethereal Woody Forest',
    slug: 'ethereal-woody-forest',
    type: 'solid_perfume',
    collection_id: 'c3',
    short_description: 'Grounding, earthy, serene timber and moss.',
    full_description: 'Calm, natural, serene. Ethereal Woody Forest grounds you with its blend of timber.',
    price: 2100,
    rating: 4.9,
    images: [
      '/images/etherealwoodyforest_1.png',
      '/images/etherealwoodyforest_2.png',
      '/images/etherealwoodyforest_3.png'
    ],
    scent_notes: { top: ['Timber'], heart: ['Green Moss'], base: ['Evening Earth'] },
    ingredients: ['Beeswax', 'Forest Essentials'],
    how_to_use: 'Warm a small amount and apply.',
    sustainability_info: 'Eco-friendly tin.',
    dimensions: 'Compact 0.3 oz',
    reasons_to_love: ['Travel-friendly solid format', 'Nourishing beeswax base'],
    set_contains: ['1 Solid Perfume Compact (0.3 oz)'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p13',
    sku: 'PERFUME-004',
    name: 'Ocean Bloom Solid Perfume',
    slug: 'ocean-bloom-perfume',
    type: 'solid_perfume',
    collection_id: 'c3',
    short_description: 'Fresh, airy, uplifting ocean breeze.',
    full_description: 'Clean, elegant, uplifting. Ocean Bloom Solid Perfume captures the freedom of coastal air.',
    price: 2100,
    rating: 4.9,
    images: [
      '/images/oceanbloom_4.png',
      '/images/oceanbloom_5.png'
    ],
    scent_notes: { top: ['Ocean Breeze'], heart: ['Light Florals'], base: ['Fresh Air'] },
    ingredients: ['Beeswax', 'Fresh Scent Oils'],
    how_to_use: 'Perfect for daytime touch-ups.',
    sustainability_info: 'Reusable container.',
    dimensions: 'Compact 0.3 oz',
    reasons_to_love: ['Travel-friendly solid format', 'Nourishing beeswax base'],
    set_contains: ['1 Solid Perfume Compact (0.3 oz)'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p14',
    sku: 'PERFUME-005',
    name: 'Mystic Floral Aura Solid Perfume',
    slug: 'mystic-floral-aura',
    type: 'solid_perfume',
    collection_id: 'c2',
    short_description: 'Romantic, refined, delicate luminous petals.',
    full_description: 'Romantic, refined, delicate. Mystic Floral Aura embodies soft feminine grace.',
    price: 2200,
    rating: 4.9,
    images: [
      '/images/mysticfloralaura_1.png',
      '/images/mysticfloralaura_2.png',
      '/images/mysticfloralaura_3.png'
    ],
    scent_notes: { top: ['Luminous Petals'], heart: ['Light Sweetness'], base: ['Soft Bloom'] },
    ingredients: ['Beeswax', 'Feminine Florals'],
    how_to_use: 'Subtle yet unforgettable fragrance.',
    sustainability_info: 'Safe for skin.',
    dimensions: 'Compact 0.3 oz',
    reasons_to_love: ['Travel-friendly solid format', 'Nourishing beeswax base'],
    set_contains: ['1 Solid Perfume Compact (0.3 oz)'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // FRAGRANCE BARS
  {
    id: 'p15',
    sku: 'FBAR-001',
    name: 'Classic Fresh Fragrance Bar',
    slug: 'classic-fresh',
    type: 'fragrance_bar',
    collection_id: 'c3',
    short_description: 'Clean, crisp, pure fresh linens.',
    full_description: 'Best for: Wardrobes, Linen Closets. Classic Fresh brings the scent of freshly laundered linens.',
    price: 1400,
    rating: 4.7,
    images: [
      '/images/classic_fresh_1.jpg',
      '/images/classic_fresh_2.jpg',
      '/images/classic_fresh_3.jpg',
      '/images/classic_fresh_4.jpg'
    ],
    scent_notes: { top: ['Fresh Linens'], heart: ['Citrus'], base: ['Herbs'] },
    ingredients: ['Pure Beeswax bar'],
    how_to_use: 'Place in wardrobes or guest rooms.',
    sustainability_info: 'Biodegradable.',
    dimensions: '2" x 4"',
    reasons_to_love: ['Naturally scents your spaces', 'Long-lasting fragrance (2-3 months)'],
    set_contains: ['1 Fragrance Bar (2 oz)', 'Breathable cotton pouch'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p16',
    sku: 'FBAR-002',
    name: 'Floral Whisper Fragrance Bar',
    slug: 'floral-whisper',
    type: 'fragrance_bar',
    collection_id: 'c2',
    short_description: 'Soft, romantic, delicate dewy petals.',
    full_description: 'Best for: Vanity Drawers, Bridal Storage. Floral Whisper infuses your most precious items.',
    price: 1500,
    rating: 4.7,
    images: [
      '/images/floral_whisper_1.jpg',
      '/images/floral_whisper_2.jpg',
      '/images/floral_whisper_3.jpg',
      '/images/floral_whisper_4.jpg'
    ],
    scent_notes: { top: ['Dewy Petals'], heart: ['Powdery Florals'], base: ['Soft Whisper'] },
    ingredients: ['Pure Beeswax', 'Floral Essence'],
    how_to_use: 'Perfect for bridal storage.',
    sustainability_info: 'Safe for silks.',
    dimensions: '2" x 4"',
    reasons_to_love: ['Naturally scents your spaces', 'Long-lasting (2-3 months)'],
    set_contains: ['1 Fragrance Bar (2 oz)', 'Breathable cotton pouch'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'p17',
    sku: 'FBAR-003',
    name: 'Warm Luxe Fragrance Bar',
    slug: 'warm-luxe',
    type: 'fragrance_bar',
    collection_id: 'c1',
    short_description: 'Cozy, rich, luxurious amber and spices.',
    full_description: 'Best for: Winter Clothes, Coats. Warm Luxe wraps your cold-weather wardrobe in comfort.',
    price: 1600,
    rating: 4.7,
    images: [
      '/images/warm_luxe_1.jpg',
      '/images/warm_luxe_2.jpg',
      '/images/warm_luxe_3.jpg',
      '/images/warm_luxe_4.jpg'
    ],
    scent_notes: { top: ['Amber'], heart: ['Spices'], base: ['Honeyed Woods'] },
    ingredients: ['Beeswax', 'Amber & Spice Oils'],
    how_to_use: 'Place in coat closets.',
    sustainability_info: 'Natural and sustainable.',
    dimensions: '2" x 4"',
    reasons_to_love: ['Naturally scents your spaces', 'Rich amber scent'],
    set_contains: ['1 Fragrance Bar (2 oz)', 'Breathable cotton pouch'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const getProducts = () => MOCK_PRODUCTS;
export const getProductById = (id: string) => MOCK_PRODUCTS.find(p => p.id === id);
export const getProductBySlug = (slug: string) => MOCK_PRODUCTS.find(p => p.slug === slug);
export const getCollections = () => MOCK_COLLECTIONS;
export const getCollectionById = (id: string) => MOCK_COLLECTIONS.find(c => c.id === id);
export const getCollectionBySlug = (slug: string) => MOCK_COLLECTIONS.find(c => c.slug === slug);
