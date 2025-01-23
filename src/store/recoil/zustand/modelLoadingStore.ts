import { create } from "zustand";

interface ModalLoadingState {
  totalModels: number;
  loadedCount: number;
  progress: number;
  isComplete: boolean;
  setTotalModels: (callback: (prev: number) => number) => void;
  incrementLoadedCount: () => void;
  resetLoading: () => void;
}

export const useModelLoadingStore = create<ModalLoadingState>((set) => ({
  totalModels: 13, // 로그인시 의자제외 12, 비로그인시 13
  loadedCount: 0,
  progress: 0,
  isComplete: false,

  setTotalModels: (callback) =>
    set((state) => {
      const newTotal = callback(state.totalModels);
      const progress =
        (newTotal / state.totalModels) * 100 > 100
          ? 100
          : (newTotal / state.totalModels) * 100;
      const isComplete = state.loadedCount >= newTotal;
      return { totalModels: newTotal, progress, isComplete };
    }),

  incrementLoadedCount: () =>
    set((state) => {
      const newLoadedCount = state.loadedCount + 1;
      const progress =
        (newLoadedCount / state.totalModels) * 100 > 100
          ? 100
          : (newLoadedCount / state.totalModels) * 100;
      const isComplete = newLoadedCount >= state.totalModels;
      return { loadedCount: newLoadedCount, progress, isComplete };
    }),

  resetLoading: () =>
    set({
      totalModels: 13,
      loadedCount: 0,
      progress: 0,
      isComplete: false,
    }),
}));
