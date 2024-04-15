import { create } from "zustand";

const useAuthStore = create((set) => ({
  username: '',
  password: '',
  setUsername: (username) => set((state) => ({ username })),
  setPassword: (password) => set((state) => ({ password })),
}));

export default useAuthStore;
