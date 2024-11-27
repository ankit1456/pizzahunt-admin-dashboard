import { Roles } from "@lib/types/user.types";
import { useAuth } from "@src/state/store";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

function AdminProtected({ children }: Readonly<PropsWithChildren>) {
  const { user } = useAuth();

  return user?.role !== Roles.ADMIN ? <Navigate to="/" replace /> : children;
}

export default AdminProtected;
