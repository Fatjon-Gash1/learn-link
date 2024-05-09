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
  const { token } = useAuthStore();

  // Hook to fetch posts
  useEffect(() => {
    store.fetchPosts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserFeed />} />
        function test () {console.log("token:", token)}
        <Route exact path="/adminlogin" 
          element={token ? <Navigate replace to={"/dashboard"} /> : <LoginForm />}
        />
        <Route exact path="/dashboard"
          element={token ? <Dashboard /> : <Navigate replace to={"/adminlogin"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
