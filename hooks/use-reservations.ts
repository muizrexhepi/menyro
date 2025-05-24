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
  const { userProfile, loading: authLoading } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = userProfile?.restaurantId;

  useEffect(() => {
    console.log(
      "useReservations effect - restaurantId:",
      restaurantId,
      "authLoading:",
      authLoading
    );

    if (authLoading) {
      return; // Wait for auth to load
    }

    if (!restaurantId) {
      console.log("No restaurant ID found");
      setLoading(false);
      setError("No restaurant ID found");
      return;
    }

    setLoading(true);
    setError(null);

    console.log(
      "Setting up reservations subscription for restaurant:",
      restaurantId
    );

    // Subscribe to real-time updates
    const unsubscribe = subscribeToReservations(
      restaurantId,
      (reservationData) => {
        console.log("Received reservations data:", reservationData);
        setReservations(reservationData);
        setLoading(false);
      },
      status
    );

    // Load tables
    getTables(restaurantId)
      .then((tablesData) => {
        console.log("Loaded tables:", tablesData);
        setTables(tablesData);
      })
      .catch((err) => {
        console.error("Error loading tables:", err);
      });

    return unsubscribe;
  }, [restaurantId, status, authLoading]);

  const addReservation = async (data: CreateReservationData) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      console.log("Creating reservation with data:", data);
      const reservationId = await createReservation(restaurantId, data);
      console.log("Created reservation with ID:", reservationId);
    } catch (error: any) {
      console.error("Error creating reservation:", error);
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
