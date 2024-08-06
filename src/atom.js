import { atom } from "recoil";

const initialUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):[];


export const userState = atom({
  key:"userState",
  default: initialUserData,
})

export const isUserState = atom({
  key:"isUser",
  default: false,
})