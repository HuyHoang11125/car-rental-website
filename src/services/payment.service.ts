import api from './api';
import type { Payment, PaymentMethod } from '@/types';

export const paymentService = {
  async createPayment(bookingId: number, method: PaymentMethod): Promise<Payment> {
    const { data } = await api.post<Payment>('/payments/', {
      booking_id: bookingId,
      method,
    });
    return data;
  },

  async getPaymentStatus(paymentId: number): Promise<Payment> {
    const { data } = await api.get<Payment>(`/payments/${paymentId}/`);
    return data;
  },

  async getPayments(page = 1): Promise<{ count: number; results: Payment[] }> {
    const { data } = await api.get(`/payments/?page=${page}`);
    return data;
  },
};
