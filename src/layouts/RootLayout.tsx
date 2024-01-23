import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useAuthState } from "../store";
import { useEffect } from "react";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const RootLayout = () => {
  const { setUser } = useAuthState();
  const { data: user, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
  });

  useEffect(() => {
    if (user) setUser(user);
    console.log("user:", user);
  }, [user, setUser]);

  if (isLoading) return <p>Loading...</p>;

  return <Outlet />;
};

export default RootLayout;
