import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'

const useChatStore = create(
  devtools((set) => ({
  startChat: false,
  setStartChat: (userData) => set((state) => ({startChat: true})),
})))

export default useChatStore;