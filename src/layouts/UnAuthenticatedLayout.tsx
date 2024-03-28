import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store";

const UnAuthenticatedLayout = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default UnAuthenticatedLayout;
