export interface Reservation {
  id: string;
  restaurantId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no-show";
  tableId?: string;
  tableName?: string;
  notes?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  source: "online" | "phone" | "walk-in" | "staff";
}

export interface CreateReservationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  tableId?: string;
  notes?: string;
  specialRequests?: string;
  source?: "online" | "phone" | "walk-in" | "staff";
}

export interface UpdateReservationData extends Partial<CreateReservationData> {
  status?: "pending" | "confirmed" | "cancelled" | "completed" | "no-show";
}

export interface Table {
  id: string;
  restaurantId: string;
  name: string;
  capacity: number;
  isActive: boolean;
  location?: string;
  createdAt: string;
  updatedAt: string;
}
