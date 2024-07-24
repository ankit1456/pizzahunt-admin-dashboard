import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useAuth } from "../store";

const UnAuthenticatedLayout = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  if (user)
    return <Navigate to={`${searchParams.get("redirect") ?? "/"}`} replace />;

  return <Outlet />;
};

export default UnAuthenticatedLayout;
