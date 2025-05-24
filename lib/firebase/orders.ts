import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { Order, CreateOrderData } from "@/types/order";

// Generate order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${timestamp}${random}`;
};

export const createOrder = async (
  restaurantId: string,
  data: CreateOrderData
): Promise<string> => {
  try {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const docRef = await addDoc(collection(db, "orders"), {
      ...data,
      restaurantId,
      orderNumber: generateOrderNumber(),
      subtotal,
      tax,
      total,
      status: "pending",
      paymentStatus: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

export const updateOrder = async (
  orderId: string,
  data: Partial<Order>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
};

export const getOrders = async (
  restaurantId: string,
  status?: string
): Promise<Order[]> => {
  try {
    let q = query(
      collection(db, "orders"),
      where("restaurantId", "==", restaurantId),
      orderBy("createdAt", "desc")
    );

    if (status) {
      q = query(
        collection(db, "orders"),
        where("restaurantId", "==", restaurantId),
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );
    }

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
    })) as Order[];
  } catch (error) {
    console.error("Error getting orders:", error);
    throw new Error("Failed to get orders");
  }
};

export const subscribeToOrders = (
  restaurantId: string,
  callback: (orders: Order[]) => void,
  status?: string
): (() => void) => {
  let q = query(
    collection(db, "orders"),
    where("restaurantId", "==", restaurantId),
    orderBy("createdAt", "desc")
  );

  if (status) {
    q = query(
      collection(db, "orders"),
      where("restaurantId", "==", restaurantId),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
  }

  return onSnapshot(q, (querySnapshot) => {
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as Order[];
    callback(orders);
  });
};
