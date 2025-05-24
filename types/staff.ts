export interface StaffMember {
  id: string;
  restaurantId: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: "active" | "inactive" | "pending";
  lastActive?: string;
  createdAt: string;
  updatedAt: string;
  invitedBy: string;
}

export interface StaffRole {
  id: string;
  restaurantId: string;
  name: string;
  permissions: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffData {
  name: string;
  email: string;
  role: string;
}

export interface StaffInvitation {
  id: string;
  restaurantId: string;
  email: string;
  role: string;
  status: "pending" | "accepted" | "expired";
  invitedBy: string;
  expiresAt: string;
  createdAt: string;
}
