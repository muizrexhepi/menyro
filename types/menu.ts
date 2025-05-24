export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isActive: boolean;
  isAvailable: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  preparationTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuItemData {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  preparationTime?: number;
}

export interface UpdateMenuItemData extends Partial<CreateMenuItemData> {
  isActive?: boolean;
  isAvailable?: boolean;
}
