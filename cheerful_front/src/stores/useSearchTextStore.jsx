import { create } from "zustand";

export const useSearchTextStore = create((set) => ({
  searchText: "",
  setSearchText: (value) => set({ searchText: value }),
}));
