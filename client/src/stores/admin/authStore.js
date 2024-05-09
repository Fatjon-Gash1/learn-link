import { create } from "zustand";
import axios from "axios";


const useAuthStore = create((set) => {
  const storedToken = localStorage.getItem("token");
  return {
    username: "",
    password: "",
    token: storedToken || null,

    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),

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
        const { token } = resp.data;
        localStorage.setItem("token", token);
        set({ token });

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

    logout: () => {
      localStorage.removeItem("token");
      set({ token: null });
    },
  };
});

export default useAuthStore;
