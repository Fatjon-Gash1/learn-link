import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import postsStore from "../stores/postsStore";
import useAuthStore from "../stores/admin/authStore";
import LoginForm from "./admin/LoginForm";
import Dashboard from "./admin/Dashboard";
import UserFeed from "./UserFeed";

function App() {
  const store = postsStore();
  const { accessToken } = useAuthStore();
  
  console.log('env var: ', process.env.REACT_APP_TEST);

  // Hook to fetch posts
  useEffect(() => {
    console.log("accessToken call from app.jsx:", accessToken);

    store.fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserFeed />} />
        <Route
          exact
          path="/adminlogin"
          element={
            accessToken ? <Navigate replace to={"/dashboard"} /> : <LoginForm />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            accessToken ? <Dashboard /> : <Navigate replace to={"/adminlogin"} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
