import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set((state) => ({ email })),
  setPassword: (password) => set((state) => ({ password })),
}));

export default useAuthStore;
