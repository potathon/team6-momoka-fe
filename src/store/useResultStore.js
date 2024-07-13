import { create } from "zustand";

export const useResultStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
