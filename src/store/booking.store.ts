import { create } from 'zustand';

interface BookingState {
  selectedCarId: number | null;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  currentStep: number;
  notes: string;
  setSelectedCar: (carId: number) => void;
  setDates: (pickup: string, returnDate: string) => void;
  setLocations: (pickup: string, returnLoc: string) => void;
  setStep: (step: number) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedCarId: null,
  pickupDate: '',
  returnDate: '',
  pickupLocation: '',
  returnLocation: '',
  currentStep: 1,
  notes: '',
  setSelectedCar: (carId) => set({ selectedCarId: carId }),
  setDates: (pickupDate, returnDate) => set({ pickupDate, returnDate }),
  setLocations: (pickupLocation, returnLocation) => set({ pickupLocation, returnLocation }),
  setStep: (currentStep) => set({ currentStep }),
  setNotes: (notes) => set({ notes }),
  reset: () =>
    set({
      selectedCarId: null,
      pickupDate: '',
      returnDate: '',
      pickupLocation: '',
      returnLocation: '',
      currentStep: 1,
      notes: '',
    }),
}));
