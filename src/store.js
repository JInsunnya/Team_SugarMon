import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'

const useStore = create(
  persist(devtools((set) => ({
  user: false,
  setUser: (userData) => set((state) => ({user: userData})),
})), {
  name:'isUser'
}))

export default useStore;