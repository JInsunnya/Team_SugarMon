import { create } from "zustand";

const useStore = create((set) => {
  user: [];
  setUser: () => set((state) => ({user:}))
})