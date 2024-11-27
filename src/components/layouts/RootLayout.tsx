import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelf } from "../hooks";
import { useAuth } from "../store";
import { Loader } from "../ui";

const RootLayout = () => {
  const { setUser } = useAuth();
  const { data, isLoading } = useSelf();

  useEffect(() => {
    if (data?.user) setUser(data.user);
  }, [data, setUser]);

  if (isLoading) return <Loader fullscreen size={40} />;

  return <Outlet />;
};

export default RootLayout;
