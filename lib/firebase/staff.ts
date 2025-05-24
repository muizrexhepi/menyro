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
} from "firebase/firestore";
import { db } from "./config";
import type {
  StaffMember,
  StaffRole,
  CreateStaffData,
  StaffInvitation,
} from "@/types/staff";

// Staff Members
export const createStaffMember = async (
  restaurantId: string,
  data: CreateStaffData & { userId: string; invitedBy: string }
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "staff"), {
      ...data,
      restaurantId,
      status: "active",
      permissions: [], // Will be set based on role
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating staff member:", error);
    throw new Error("Failed to create staff member");
  }
};

export const updateStaffMember = async (
  staffId: string,
  data: Partial<StaffMember>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "staff", staffId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating staff member:", error);
    throw new Error("Failed to update staff member");
  }
};

export const deleteStaffMember = async (staffId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "staff", staffId));
  } catch (error) {
    console.error("Error deleting staff member:", error);
    throw new Error("Failed to delete staff member");
  }
};

export const getStaffMembers = async (
  restaurantId: string
): Promise<StaffMember[]> => {
  try {
    const q = query(
      collection(db, "staff"),
      where("restaurantId", "==", restaurantId),
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
    })) as StaffMember[];
  } catch (error) {
    console.error("Error getting staff members:", error);
    throw new Error("Failed to get staff members");
  }
};

export const subscribeToStaffMembers = (
  restaurantId: string,
  callback: (staff: StaffMember[]) => void
): (() => void) => {
  const q = query(
    collection(db, "staff"),
    where("restaurantId", "==", restaurantId),
    orderBy("name")
  );

  return onSnapshot(q, (querySnapshot) => {
    const staff = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as StaffMember[];
    callback(staff);
  });
};

// Staff Roles
export const createStaffRole = async (
  restaurantId: string,
  data: Omit<StaffRole, "id" | "restaurantId" | "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "staffRoles"), {
      ...data,
      restaurantId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating staff role:", error);
    throw new Error("Failed to create staff role");
  }
};

export const getStaffRoles = async (
  restaurantId: string
): Promise<StaffRole[]> => {
  try {
    const q = query(
      collection(db, "staffRoles"),
      where("restaurantId", "==", restaurantId),
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
    })) as StaffRole[];
  } catch (error) {
    console.error("Error getting staff roles:", error);
    throw new Error("Failed to get staff roles");
  }
};

// Staff Invitations
export const createStaffInvitation = async (
  restaurantId: string,
  data: { email: string; role: string; invitedBy: string }
): Promise<string> => {
  try {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    const docRef = await addDoc(collection(db, "staffInvitations"), {
      ...data,
      restaurantId,
      status: "pending",
      expiresAt: expiresAt.toISOString(),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating staff invitation:", error);
    throw new Error("Failed to create staff invitation");
  }
};

export const getStaffInvitations = async (
  restaurantId: string
): Promise<StaffInvitation[]> => {
  try {
    const q = query(
      collection(db, "staffInvitations"),
      where("restaurantId", "==", restaurantId),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
    })) as StaffInvitation[];
  } catch (error) {
    console.error("Error getting staff invitations:", error);
    throw new Error("Failed to get staff invitations");
  }
};
