export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection: string;
  gender: "men" | "women" | "unisex";
  fabrics: string[];
  care: string[];
  colors: ProductColor[];
  sizes: string[];
  images: ProductImage[];
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  inStock: boolean;
  stockCount: number;
  allowsCustom: boolean;
  createdAt: string;
};

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  fit: "standard" | "custom";
  customNote?: string;
};

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: "Nigeria";
  isDefault?: boolean;
};

export type OrderStatus =
  | "pending_payment"
  | "awaiting_transfer"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "failed";

export type PaymentMethod = "paystack" | "flutterwave" | "bank_transfer" | "cash_on_delivery";
export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "mock";

export type OrderItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  quantity: number;
  unitPrice: number;
  color?: string;
  size?: string;
  fit: "standard" | "custom";
};

export type Order = {
  id: string;
  reference: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: Omit<Address, "id">;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  discountCode?: string;
  total: number;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  mock: boolean;
};

export type UserRole = "customer" | "admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
};

export type TailoringRequest = {
  id: string;
  createdAt: string;
  category: string;
  occasion: string;
  style: string;
  customDesign?: string;
  fabric: string;
  colour: string;
  sizing: "standard" | "custom";
  measurements?: Record<string, number>;
  budget: string;
  deliveryDate: string;
  deliveryState: string;
  deliveryCity: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  instructions?: string;
  referenceImages: string[];
  status: "demo_submitted" | "received" | "in_review";
  mock: boolean;
};

export type AppointmentType =
  | "measurements"
  | "style_consultation"
  | "wedding_outfit"
  | "bridal_groom_fitting"
  | "general_consultation";

export type AppointmentRequest = {
  id: string;
  createdAt: string;
  type: AppointmentType;
  preferredDate: string;
  preferredTime: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  notes?: string;
  status: "request_received";
  mock: boolean;
};

export type MeasurementSet = {
  id: string;
  createdAt: string;
  gender: "men" | "women";
  garment: string;
  unit: "cm" | "in";
  values: Record<string, number>;
  notes?: string;
};

export type DiscountCode = {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minSubtotal?: number;
  active: boolean;
  description: string;
};

export type DeliveryRule = {
  id: string;
  label: string;
  states: string[];
  fee: number;
};

export type DeliveryConfig = {
  freeOver: number;
  defaultFee: number;
  rules: DeliveryRule[];
  note: string;
};
