import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'

const useStore = create(
  persist(devtools((set) => ({
  user: [],
  setUser: (userData) => set((state) => ({user: userData})),
})), {
  name:'isUser'
}))

export default useStore;