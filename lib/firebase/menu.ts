import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./config";
import type {
  MenuItem,
  MenuCategory,
  CreateMenuItemData,
  UpdateMenuItemData,
} from "@/types/menu";

// Menu Items
export const createMenuItem = async (
  restaurantId: string,
  data: CreateMenuItemData
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "menuItems"), {
      ...data,
      restaurantId,
      isActive: true,
      isAvailable: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw new Error("Failed to create menu item");
  }
};

export const updateMenuItem = async (
  itemId: string,
  data: UpdateMenuItemData
): Promise<void> => {
  try {
    await updateDoc(doc(db, "menuItems", itemId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw new Error("Failed to update menu item");
  }
};

export const deleteMenuItem = async (itemId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "menuItems", itemId));
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw new Error("Failed to delete menu item");
  }
};

export const getMenuItems = async (
  restaurantId: string
): Promise<MenuItem[]> => {
  try {
    const q = query(
      collection(db, "menuItems"),
      where("restaurantId", "==", restaurantId),
      orderBy("category"),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as MenuItem[];
  } catch (error) {
    console.error("Error getting menu items:", error);
    throw new Error("Failed to get menu items");
  }
};

export const subscribeToMenuItems = (
  restaurantId: string,
  callback: (items: MenuItem[]) => void
): (() => void) => {
  const q = query(
    collection(db, "menuItems"),
    where("restaurantId", "==", restaurantId),
    orderBy("category"),
    orderBy("name")
  );

  return onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as MenuItem[];
    callback(items);
  });
};

// Menu Categories
export const createMenuCategory = async (
  restaurantId: string,
  data: Omit<MenuCategory, "id" | "restaurantId" | "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "menuCategories"), {
      ...data,
      restaurantId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating menu category:", error);
    throw new Error("Failed to create menu category");
  }
};

export const updateMenuCategory = async (
  categoryId: string,
  data: Partial<MenuCategory>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "menuCategories", categoryId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating menu category:", error);
    throw new Error("Failed to update menu category");
  }
};

export const deleteMenuCategory = async (categoryId: string): Promise<void> => {
  try {
    const batch = writeBatch(db);

    // Delete the category
    batch.delete(doc(db, "menuCategories", categoryId));

    // Update all menu items in this category to "Uncategorized"
    const menuItemsQuery = query(
      collection(db, "menuItems"),
      where("category", "==", categoryId)
    );
    const menuItemsSnapshot = await getDocs(menuItemsQuery);

    menuItemsSnapshot.docs.forEach((menuItemDoc) => {
      batch.update(menuItemDoc.ref, {
        category: "Uncategorized",
        updatedAt: serverTimestamp(),
      });
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting menu category:", error);
    throw new Error("Failed to delete menu category");
  }
};

export const getMenuCategories = async (
  restaurantId: string
): Promise<MenuCategory[]> => {
  try {
    const q = query(
      collection(db, "menuCategories"),
      where("restaurantId", "==", restaurantId),
      orderBy("sortOrder")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as MenuCategory[];
  } catch (error) {
    console.error("Error getting menu categories:", error);
    throw new Error("Failed to get menu categories");
  }
};

export const subscribeToMenuCategories = (
  restaurantId: string,
  callback: (categories: MenuCategory[]) => void
): (() => void) => {
  const q = query(
    collection(db, "menuCategories"),
    where("restaurantId", "==", restaurantId),
    orderBy("sortOrder")
  );

  return onSnapshot(q, (querySnapshot) => {
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as MenuCategory[];
    callback(categories);
  });
};
