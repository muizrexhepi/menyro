"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import {
  subscribeToOrders,
  createOrder,
  updateOrder,
} from "@/lib/firebase/orders";
import type { Order, CreateOrderData } from "@/types/order";

export const useOrders = (status?: string) => {
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = userProfile?.restaurantId;

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToOrders(
      restaurantId,
      (orderData) => {
        setOrders(orderData);
        setLoading(false);
      },
      status
    );

    return unsubscribe;
  }, [restaurantId, status]);

  const addOrder = async (data: CreateOrderData) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      await createOrder(restaurantId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const editOrder = async (orderId: string, data: Partial<Order>) => {
    try {
      setError(null);
      await updateOrder(orderId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    orders,
    loading,
    error,
    addOrder,
    editOrder,
  };
};
