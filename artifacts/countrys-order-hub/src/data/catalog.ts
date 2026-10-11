export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description?: string;
  image?: string;
  price?: number;
  compareAtPrice?: number;
  availability: "unknown";
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
  ingredients?: string[];
  nutrition?: Record<string, string>;
  allergens?: string[];
};

export type CartLine = {
  id: string;
  quantity: number;
  saved?: boolean;
};

export type Locale = "en" | "ar";

// Product names come only from the supplied brief. Names and category grouping are unconfirmed.
export const products: Product[] = [
  {
    id: "peanut-butter",
    slug: "peanut-butter",
    name: "Peanut Butter",
    category: "Nut butters",
    availability: "unknown",
    featured: true,
  },
  {
    id: "cashew-butter",
    slug: "cashew-butter",
    name: "Cashew Butter",
    category: "Nut butters",
    availability: "unknown",
    featured: true,
  },
  {
    id: "crunchy-honey-peanut-butter",
    slug: "crunchy-honey-peanut-butter",
    name: "Crunchy / Honey Peanut Butter",
    category: "Nut butters",
    availability: "unknown",
  },
  {
    id: "cinnamon-peanut-butter",
    slug: "cinnamon-peanut-butter",
    name: "Cinnamon Peanut Butter",
    category: "Nut butters",
    availability: "unknown",
  },
  {
    id: "hazelnut-spread",
    slug: "hazelnut-spread",
    name: "Hazelnut Spread",
    category: "Spreads",
    availability: "unknown",
    featured: true,
  },
  {
    id: "pesto-basil-sauce",
    slug: "pesto-basil-sauce",
    name: "Pesto Basil Sauce",
    category: "Sauces",
    availability: "unknown",
  },
  {
    id: "stuffed-mini-sweet-peppers",
    slug: "stuffed-mini-sweet-peppers",
    name: "Stuffed Mini Sweet Peppers",
    category: "Savory",
    availability: "unknown",
  },
  {
    id: "granola-bars",
    slug: "granola-bars",
    name: "Granola Bars",
    category: "Snacks",
    availability: "unknown",
  },
  {
    id: "energy-bites",
    slug: "energy-bites",
    name: "Energy Bites",
    category: "Snacks",
    availability: "unknown",
  },
];

export const categoryNames = [
  "Nut butters",
  "Spreads",
  "Sauces",
  "Savory",
  "Snacks",
];

export const categoryLabels: Record<string, string> = {
  "Nut butters": "زبدات المكسرات",
  Spreads: "الدهنات",
  Sauces: "الصلصات",
  Savory: "المقبلات",
  Snacks: "الوجبات الخفيفة",
};

// Configure only after COUNTRY'S supplies its verified ordering destination.
export const ORDERING_URL: string | null = null;

export function readStore<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
