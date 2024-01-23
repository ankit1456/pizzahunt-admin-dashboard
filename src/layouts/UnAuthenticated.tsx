import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../store";

const UnAuthenticated = () => {
  const { user } = useAuthState();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default UnAuthenticated;
