import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import postsStore from "../stores/postsStore";
import LoginForm from "./admin/LoginForm";
import UserFeed from "./UserFeed";

function App() {
  const store = postsStore();

  // Hook to fetch posts
  useEffect(() => {
    store.fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserFeed />} />
        <Route path="/adminlogin" Component={LoginForm} />
      </Routes>
    </Router>
  );
}

export default App;
