import { Car, CarCategory, Booking, BookingStatus, User, DashboardStats, Review, Supplier } from '@/types';

export const mockSuppliers: Supplier[] = [];

export const mockCars: Car[] = [];

export const mockUser: User = {
  id: 0,
  email: '',
  full_name: '',
  phone: '',
  is_staff: false,
  date_joined: '2024-01-01',
};

export const mockAdminUser: User = {
  id: 0,
  email: '',
  full_name: '',
  phone: '',
  is_staff: true,
  date_joined: '2024-01-01',
};

export const mockBookings: Booking[] = [];

export const mockReviews: Review[] = [];

export const mockDashboardStats: DashboardStats = {
  total_cars: 0,
  total_bookings: 0,
  total_revenue: 0,
  total_users: 0,
  recent_bookings: [],
  monthly_revenue: [],
};

export const locations: string[] = [];

export const carBrands: string[] = [];

