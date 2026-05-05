import api from './api';
import type { Car, CarFilters, PaginatedResponse } from '@/types';

export const carService = {
  async getCars(filters?: CarFilters, page = 1): Promise<PaginatedResponse<Car>> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.min_price) params.append('min_price', String(filters.min_price));
    if (filters?.max_price) params.append('max_price', String(filters.max_price));
    if (filters?.available !== undefined) params.append('available', String(filters.available));
    if (filters?.search) params.append('search', filters.search);
    params.append('page', String(page));

    const { data } = await api.get<PaginatedResponse<Car>>(`/cars/?${params.toString()}`);
    return data;
  },

  async getCarById(id: number): Promise<Car> {
    const { data } = await api.get<Car>(`/cars/${id}/`);
    return data;
  },

  async getFeaturedCars(): Promise<Car[]> {
    const { data } = await api.get<Car[]>('/cars/featured/');
    return data;
  },

  async getBrands(): Promise<string[]> {
    const { data } = await api.get<string[]>('/cars/brands/');
    return data;
  },
};
