import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import postsStore from "../stores/postsStore";
// import AdminLogin from "./AdminLogin";
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
        <Route path="/" element={<UserFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
