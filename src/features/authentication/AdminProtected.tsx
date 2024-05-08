import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store";
import { Roles } from "../../types/user.types";

function AdminProtected({ children }: Readonly<PropsWithChildren>) {
  const { user } = useAuth();

  if (user?.role !== Roles.ADMIN) return <Navigate to="/" replace />;

  return children;
}

export default AdminProtected;
