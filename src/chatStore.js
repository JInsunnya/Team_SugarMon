import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'

const useChatStore = create(
  devtools((set) => ({
  startChat: true,
  setStartChat: (userData) => set((state) => ({startChat: true})),
})))

export default useChatStore;