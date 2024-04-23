import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  username: "",
  password: "",
  LoggedIn: false,
  setUsername: (username) => set((state) => ({ username })),
  setPassword: (password) => set((state) => ({ password })),

  sendData: async (e) => {
    e.preventDefault();
    const { username, password } = useAuthStore.getState();

    if (!username || !password) {
      console.error("Username and password are required.");
      return;
    }

    try {
      const resp = await axios.post("http://localhost:3000/adminlogin/auth", {
        username,
        password,
      });
      console.log("Login successful:", resp.data);
      set((state) => ({ LoggedIn: true }));

    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server.");
      } else {
        console.error("Error while sending request:", error.message);
      }
    }
  },
}));

export default useAuthStore;
