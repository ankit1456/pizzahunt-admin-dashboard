import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useAuth } from "../store";

const UnAuthenticatedLayout = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  if (!user) return <Outlet />;

  const redirect = searchParams.get("redirect");
  const redirectPath = redirect ? `/${redirect}` : "/";
  searchParams.delete("redirect");

  return <Navigate to={`${redirectPath}?${searchParams.toString()}`} replace />;
};

export default UnAuthenticatedLayout;
