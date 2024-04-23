import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import postsStore from "../stores/postsStore";
import useAuthStore from "../stores/admin/authStore";
import LoginForm from "./admin/LoginForm";
import Dashboard from "./admin/Dashboard";
import UserFeed from "./UserFeed";

function App() {
  const store = postsStore();
  const loggedIn = useAuthStore((state) => state.LoggedIn);

  // Hook to fetch posts
  useEffect(() => {
    store.fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserFeed />} />
        <Route path="/adminlogin" element={<LoginForm />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/adminlogin" />} />
      </Routes>
    </Router>
  );
}

export default App;
