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
  console.log("env var react1: ", process.env.REACT_APP_BLA); // For testing

  const store = postsStore();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    console.log("accessToken call from app.jsx:", accessToken); // For debugging

    store.fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/feed" element={<UserFeed />} />
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
            accessToken ? (
              <Dashboard />
            ) : (
              <Navigate replace to={"/adminlogin"} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
