import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type {
  Reservation,
  CreateReservationData,
  UpdateReservationData,
  Table,
} from "@/types/reservation";

// Reservations
export const createReservation = async (
  restaurantId: string,
  data: CreateReservationData
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "reservations"), {
      ...data,
      restaurantId,
      status: "pending",
      source: data.source || "online",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw new Error("Failed to create reservation");
  }
};

export const updateReservation = async (
  reservationId: string,
  data: UpdateReservationData
): Promise<void> => {
  try {
    await updateDoc(doc(db, "reservations", reservationId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw new Error("Failed to update reservation");
  }
};

export const deleteReservation = async (
  reservationId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, "reservations", reservationId));
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw new Error("Failed to delete reservation");
  }
};

export const getReservations = async (
  restaurantId: string,
  status?: string
): Promise<Reservation[]> => {
  try {
    let q = query(
      collection(db, "reservations"),
      where("restaurantId", "==", restaurantId),
      orderBy("date", "desc"),
      orderBy("time", "desc")
    );

    if (status) {
      q = query(
        collection(db, "reservations"),
        where("restaurantId", "==", restaurantId),
        where("status", "==", status),
        orderBy("date", "desc"),
        orderBy("time", "desc")
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
    })) as Reservation[];
  } catch (error) {
    console.error("Error getting reservations:", error);
    throw new Error("Failed to get reservations");
  }
};

export const getReservationsByDate = async (
  restaurantId: string,
  date: string
): Promise<Reservation[]> => {
  try {
    const q = query(
      collection(db, "reservations"),
      where("restaurantId", "==", restaurantId),
      where("date", "==", date),
      orderBy("time")
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
    })) as Reservation[];
  } catch (error) {
    console.error("Error getting reservations by date:", error);
    throw new Error("Failed to get reservations by date");
  }
};

export const subscribeToReservations = (
  restaurantId: string,
  callback: (reservations: Reservation[]) => void,
  status?: string
): (() => void) => {
  let q = query(
    collection(db, "reservations"),
    where("restaurantId", "==", restaurantId),
    orderBy("date", "desc"),
    orderBy("time", "desc")
  );

  if (status) {
    q = query(
      collection(db, "reservations"),
      where("restaurantId", "==", restaurantId),
      where("status", "==", status),
      orderBy("date", "desc"),
      orderBy("time", "desc")
    );
  }

  return onSnapshot(q, (querySnapshot) => {
    const reservations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as Reservation[];
    callback(reservations);
  });
};

// Tables
export const createTable = async (
  restaurantId: string,
  data: Omit<Table, "id" | "restaurantId" | "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "tables"), {
      ...data,
      restaurantId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating table:", error);
    throw new Error("Failed to create table");
  }
};

export const getTables = async (restaurantId: string): Promise<Table[]> => {
  try {
    const q = query(
      collection(db, "tables"),
      where("restaurantId", "==", restaurantId),
      where("isActive", "==", true),
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
    })) as Table[];
  } catch (error) {
    console.error("Error getting tables:", error);
    throw new Error("Failed to get tables");
  }
};
