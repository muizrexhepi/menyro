export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  restaurantType?: string; // e.g. "Italian", "Fast Food", etc.
  bannerImage?: string;
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    instagram?: string;
  };
  workingHours: {
    day: string;
    open: string;
    close: string;
    closed?: boolean;
  }[];
  tags?: string[];
  cuisineTypes?: string[];
  menu?: MenuCategory[];
  isFeatured?: boolean;
  isPremium?: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type MenuCategory = {
  id: string;
  name: string; // e.g. "Starters", "Drinks", etc.
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isVegetarian?: boolean;
  isHalal?: boolean;
};
