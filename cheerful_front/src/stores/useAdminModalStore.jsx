import { create } from "zustand";

export const useAdminModalStore = create((set) => ({
  openModal: false,
  setOpenModal: (value) => set({ openModal: value }),
}));
