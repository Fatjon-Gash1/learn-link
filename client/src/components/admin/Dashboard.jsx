import useAuthStore from "../../stores/admin/authStore";

const Dashboard = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
