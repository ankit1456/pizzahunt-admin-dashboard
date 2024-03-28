import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/utils/Loader";
import { useSelf } from "../hooks";
import { useAuth } from "../store";

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
