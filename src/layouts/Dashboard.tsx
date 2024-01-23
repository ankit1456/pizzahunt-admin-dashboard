import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../store";

const Dashboard = () => {
  const { user } = useAuthState();

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default Dashboard;
