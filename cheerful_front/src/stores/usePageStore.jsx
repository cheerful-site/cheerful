import { create } from "zustand";

export const usePageStore = create((set) => ({
  page: 1,
  setPage: (value) => set({ page: value }),
}));
