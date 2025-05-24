"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import {
  getStaffRoles,
  getStaffInvitations,
  subscribeToStaffMembers,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  createStaffRole,
  createStaffInvitation,
} from "@/lib/firebase/staff";
import type {
  StaffMember,
  StaffRole,
  CreateStaffData,
  StaffInvitation,
} from "@/types/staff";

export const useStaff = () => {
  const { userProfile, user } = useAuth();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [staffRoles, setStaffRoles] = useState<StaffRole[]>([]);
  const [staffInvitations, setStaffInvitations] = useState<StaffInvitation[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = userProfile?.restaurant.id;

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);
    setError(null);

    // Subscribe to real-time updates for staff members
    const unsubscribe = subscribeToStaffMembers(restaurantId, (staff) => {
      setStaffMembers(staff);
      setLoading(false);
    });

    // Load staff roles and invitations
    Promise.all([
      getStaffRoles(restaurantId),
      getStaffInvitations(restaurantId),
    ])
      .then(([roles, invitations]) => {
        setStaffRoles(roles);
        setStaffInvitations(invitations);
      })
      .catch(console.error);

    return unsubscribe;
  }, [restaurantId]);

  const addStaffMember = async (data: CreateStaffData & { userId: string }) => {
    if (!restaurantId || !user) throw new Error("No restaurant ID or user");
    try {
      setError(null);
      await createStaffMember(restaurantId, { ...data, invitedBy: user.uid });
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const editStaffMember = async (
    staffId: string,
    data: Partial<StaffMember>
  ) => {
    try {
      setError(null);
      await updateStaffMember(staffId, data);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const removeStaffMember = async (staffId: string) => {
    try {
      setError(null);
      await deleteStaffMember(staffId);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const addStaffRole = async (
    data: Omit<StaffRole, "id" | "restaurantId" | "createdAt" | "updatedAt">
  ) => {
    if (!restaurantId) throw new Error("No restaurant ID");
    try {
      setError(null);
      await createStaffRole(restaurantId, data);
      // Refresh roles
      const roles = await getStaffRoles(restaurantId);
      setStaffRoles(roles);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const inviteStaff = async (email: string, role: string) => {
    if (!restaurantId || !user) throw new Error("No restaurant ID or user");
    try {
      setError(null);
      await createStaffInvitation(restaurantId, {
        email,
        role,
        invitedBy: user.uid,
      });
      // Refresh invitations
      const invitations = await getStaffInvitations(restaurantId);
      setStaffInvitations(invitations);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    staffMembers,
    staffRoles,
    staffInvitations,
    loading,
    error,
    addStaffMember,
    editStaffMember,
    removeStaffMember,
    addStaffRole,
    inviteStaff,
  };
};
