import { Loader } from "@components/common/ui";
import { useSelf } from "@hooks/auth";
import { useAuth } from "@src/state/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

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
