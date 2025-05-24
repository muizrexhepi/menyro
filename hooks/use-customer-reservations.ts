"use client";

import { useState } from "react";
import { createReservation } from "@/lib/firebase/reservations";
import type { CreateReservationData } from "@/types/reservation";

export const useCustomerReservations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeReservation = async (
    restaurantId: string,
    data: CreateReservationData
  ) => {
    try {
      setLoading(true);
      setError(null);

      const reservationId = await createReservation(restaurantId, data);
      return reservationId;
    } catch (err: any) {
      setError(err.message || "Failed to create reservation");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    makeReservation,
    loading,
    error,
  };
};
