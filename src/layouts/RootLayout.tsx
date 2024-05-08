import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelf } from "../hooks";
import { useAuth } from "../store";
import { Loader } from "../ui";

const RootLayout = () => {
  const { setUser } = useAuth();
  const { user, isLoading } = useSelf();

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  if (isLoading) return <Loader fullscreen size={40} />;

  return <Outlet />;
};

export default RootLayout;
