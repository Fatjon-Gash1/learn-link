import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => {
  const host = "192.168.0.15";
  const storedAccessToken = localStorage.getItem("accessToken");


  return {
    username: "",
    password: "",
    accessToken: storedAccessToken || null,
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
        const resp = await axios.post(`http://${host}:3000/users/auth`, {
          username,
          password,
        }/*, { withCredentials: true }*/);
        const { accessToken } = resp.data;
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken });
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
      if (!localStorage.getItem("accessToken")) return;
      const token = localStorage.getItem("accessToken");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userID = decodedToken.userId;
      console.log("The user id is: ", userID);
      try {
        const resp = await axios.get(`http://${host}:3000/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

    detectTokenExpiry: async () => {
      const token = localStorage.getItem("accessToken");
      console.log('access token: ', token);
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000;
        const userID = decodedToken.userId;
        const username = decodedToken.username;
        const currentTime = Date.now();
        if (currentTime > expirationTime - 7000) {
          try {
            const resp = await axios.post(`http://${host}:3000/users/Token`, {}, { withCredentials: true });
            localStorage.setItem("accessToken", resp.data.accessToken);
            set({
              accessToken: resp.data.accessToken,
            });
            return;
          }
          catch (err) {
            localStorage.removeItem("accessToken");
            set({
              accessToken: null
            });
            return;
          }
        }
      } else {
        set({
          accessToken: null
        });
        return;
      }
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      set({ accessToken: null });
    },
  };
});

export default useAuthStore;
