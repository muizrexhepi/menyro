"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import {
  getMenuItems,
  getMenuCategories,
  subscribeToMenuItems,
  subscribeToMenuCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from "@/lib/firebase/menu";
import type {
  MenuItem,
  MenuCategory,
  CreateMenuItemData,
  UpdateMenuItemData,
} from "@/types/menu";

export const useMenu = () => {
  const { userProfile } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = userProfile?.restaurantId;
  console.log("restaurantId", restaurantId);
  console.log("userprofile", userProfile);

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribeItems = subscribeToMenuItems(restaurantId, (items) => {
      setMenuItems(items);
      setLoading(false);
    });

    const unsubscribeCategories = subscribeToMenuCategories(
      restaurantId,
      (categories) => {
        setMenuCategories(categories);
      }
    );

    return () => {
      unsubscribeItems();
      unsubscribeCategories();
    };
  }, [restaurantId]);

  const addMenuItem = async (data: CreateMenuItemData) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      await createMenuItem(restaurantId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const editMenuItem = async (itemId: string, data: UpdateMenuItemData) => {
    try {
      setError(null);
      await updateMenuItem(itemId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const removeMenuItem = async (itemId: string) => {
    try {
      setError(null);
      await deleteMenuItem(itemId);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const addMenuCategory = async (
    data: Omit<MenuCategory, "id" | "restaurantId" | "createdAt" | "updatedAt">
  ) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      await createMenuCategory(restaurantId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const editMenuCategory = async (
    categoryId: string,
    data: Partial<MenuCategory>
  ) => {
    try {
      setError(null);
      await updateMenuCategory(categoryId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const removeMenuCategory = async (categoryId: string) => {
    try {
      setError(null);
      await deleteMenuCategory(categoryId);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    menuItems,
    menuCategories,
    loading,
    error,
    addMenuItem,
    editMenuItem,
    removeMenuItem,
    addMenuCategory,
    editMenuCategory,
    removeMenuCategory,
  };
};
