"use client";

import { useState, useEffect } from "react";
import { getMenuItems, getMenuCategories } from "@/lib/firebase/menu";
import type { MenuItem, MenuCategory } from "@/types/menu";

export const useRestaurantMenu = (restaurantId: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      if (!restaurantId) return;

      try {
        setLoading(true);
        setError(null);

        const [items, categories] = await Promise.all([
          getMenuItems(restaurantId),
          getMenuCategories(restaurantId),
        ]);

        setMenuItems(items);
        setMenuCategories(categories);
      } catch (err: any) {
        setError(err.message || "Failed to load menu");
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [restaurantId]);

  // Group menu items by category
  const menuByCategory = menuCategories.map((category) => ({
    ...category,
    items: menuItems.filter((item) => item.category === category.id),
  }));

  return {
    menuItems,
    menuCategories,
    menuByCategory,
    loading,
    error,
  };
};
