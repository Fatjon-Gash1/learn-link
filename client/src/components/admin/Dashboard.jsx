import React, { useEffect } from "react";
import useAuthStore from "../../stores/admin/authStore";

const Dashboard = () => {
  const { name, surname, getData, logout } = useAuthStore();
  const { detectTokenExpiry } = useAuthStore();

  useEffect(() => {
    detectTokenExpiry();
    getData();

    const interval = setInterval(detectTokenExpiry, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>
        Welcome to the Dashboard{" "}
        <span className="text-sky-500">
          {name} {surname}
        </span>
      </h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
