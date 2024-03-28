import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { self } from "../http/api";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

export default function useSelf(enabled = true) {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });

  return { user, isLoading, refetch };
}
