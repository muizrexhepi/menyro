export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  modifications?: string[];
}

export interface Order {
  id: string;
  restaurantId: string;
  orderNumber: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "completed"
    | "cancelled";
  type: "dine-in" | "takeaway" | "delivery";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: "cash" | "card" | "online";
  tableId?: string;
  deliveryAddress?: string;
  notes?: string;
  estimatedReadyTime?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface CreateOrderData {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: OrderItem[];
  type: "dine-in" | "takeaway" | "delivery";
  tableId?: string;
  deliveryAddress?: string;
  notes?: string;
  paymentMethod?: "cash" | "card" | "online";
}
