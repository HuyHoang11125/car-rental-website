import api from './api';
import type { AuthTokens, LoginCredentials, RegisterData, User } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/token/', credentials);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  async register(userData: RegisterData): Promise<User> {
    const { data } = await api.post<User>('/auth/register/', userData);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/auth/profile/');
    return data;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>('/auth/profile/', userData);
    return data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  },
};
