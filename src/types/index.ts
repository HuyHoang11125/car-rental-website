// ===== ENUMS =====
export enum CarCategory {
  SPORTS = 'sports',
  SEDAN = 'sedan',
  SUV = 'suv',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  ELECTRIC = 'electric',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  EWALLET = 'ewallet',
}

// ===== INTERFACES =====
export interface CarSpecs {
  engine: string;
  horsepower: number;
  acceleration: string;
  top_speed: string;
  transmission: string;
  seats: number;
  fuel_type: string;
}

export interface Supplier {
  id: number;
  name: string;
  logo: string;
  rating: number;
  contact_email: string;
  contact_phone: string;
  address: string;
}

export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  price_per_day: number;
  image: string;
  images: string[];
  specs: CarSpecs;
  features: string[];
  available: boolean;
  rating: number;
  review_count: number;
  description: string;
  supplier?: Supplier;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  avatar?: string;
  is_staff: boolean;
  date_joined: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface Booking {
  id: number;
  car: Car;
  user: User;
  pickup_date: string;
  return_date: string;
  pickup_location: string;
  return_location: string;
  total_price: number;
  deposit_amount?: number;
  payment_type?: 'full' | 'deposit';
  status: BookingStatus;
  created_at: string;
  notes?: string;
}

export interface CreateBookingData {
  car_id: number;
  pickup_date: string;
  return_date: string;
  pickup_location: string;
  return_location: string;
  notes?: string;
}

export interface Payment {
  id: number;
  booking: Booking;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string;
  created_at: string;
}

export interface Review {
  id: number;
  user: User;
  car: Car;
  rating: number;
  comment: string;
  created_at: string;
}

export interface CarFilters {
  category?: CarCategory;
  brand?: string;
  min_price?: number;
  max_price?: number;
  available?: boolean;
  search?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ===== ADMIN STATS =====
export interface DashboardStats {
  total_cars: number;
  total_bookings: number;
  total_revenue: number;
  total_users: number;
  recent_bookings: Booking[];
  monthly_revenue: { month: string; revenue: number }[];
}
