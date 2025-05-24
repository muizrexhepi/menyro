"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import {
  getReservationsByDate,
  subscribeToReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  getTables,
} from "@/lib/firebase/reservations";
import type {
  Reservation,
  CreateReservationData,
  UpdateReservationData,
  Table,
} from "@/types/reservation";

export const useReservations = (status?: string) => {
  const { userProfile } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = userProfile?.restaurantId;

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToReservations(
      restaurantId,
      (reservationData) => {
        setReservations(reservationData);
        setLoading(false);
      },
      status
    );

    // Load tables
    getTables(restaurantId).then(setTables).catch(console.error);

    return unsubscribe;
  }, [restaurantId, status]);

  const addReservation = async (data: CreateReservationData) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      await createReservation(restaurantId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const editReservation = async (
    reservationId: string,
    data: UpdateReservationData
  ) => {
    try {
      setError(null);
      await updateReservation(reservationId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const removeReservation = async (reservationId: string) => {
    try {
      setError(null);
      await deleteReservation(reservationId);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const getReservationsForDate = async (date: string) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      return await getReservationsByDate(restaurantId, date);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    reservations,
    tables,
    loading,
    error,
    addReservation,
    editReservation,
    removeReservation,
    getReservationsForDate,
  };
};
