import api from './api';
import type { Booking, CreateBookingData, PaginatedResponse } from '@/types';

export const bookingService = {
  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await api.post<Booking>('/bookings/', data);
    return response.data;
  },

  async getBookings(page = 1): Promise<PaginatedResponse<Booking>> {
    const { data } = await api.get<PaginatedResponse<Booking>>(`/bookings/?page=${page}`);
    return data;
  },

  async getBookingById(id: number): Promise<Booking> {
    const { data } = await api.get<Booking>(`/bookings/${id}/`);
    return data;
  },

  async cancelBooking(id: number): Promise<Booking> {
    const { data } = await api.patch<Booking>(`/bookings/${id}/`, { status: 'cancelled' });
    return data;
  },

  async getAllBookings(page = 1, status?: string): Promise<PaginatedResponse<Booking>> {
    const params = new URLSearchParams();
    params.append('page', String(page));
    if (status) params.append('status', status);
    const { data } = await api.get<PaginatedResponse<Booking>>(`/admin/bookings/?${params.toString()}`);
    return data;
  },
};
