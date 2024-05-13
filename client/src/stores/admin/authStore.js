import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => {
  const storedToken = localStorage.getItem("token");
  return {
    username: "",
    password: "",
    token: storedToken || null,
    name: null,
    surname: null,

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
        const resp = await axios.post("http://localhost:3000/users/auth", {
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

    getData: async () => {
      if (!localStorage.getItem("token")) return;
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userID = decodedToken.userId;
      console.log("The user id is: ", userID);
      try {
        const resp = await axios.get(`http://localhost:3000/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        set({
          name: resp.data.user.first_name,
          surname: resp.data.user.last_name,
        });
        console.log(resp.data.user.username);
      } catch (error) {
        console.error(error);
      }
    },

    detectTokenExpiry: () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
          localStorage.removeItem("token");
          set({ token: null });
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
