import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware'

const useChatIdStore = create(
  devtools((set) => ({
  chatId: '',
  setChatId: (userId) => set((state) => ({chatId:userId})),
})))

export default useChatIdStore;