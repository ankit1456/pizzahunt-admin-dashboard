import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useAuthState } from "../store";
import { useEffect } from "react";
import { AxiosError } from "axios";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const RootLayout = () => {
  const { setUser } = useAuthState();
  const { data: user, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    refetchOnWindowFocus: false,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  if (isLoading) return <p>Loading...</p>;

  return <Outlet />;
};

export default RootLayout;
