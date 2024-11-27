import { self } from "@http/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

export default function useSelf(enabled = true) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled,
    retry: (failureCount: number, error) => {
      if (
        error instanceof AxiosError &&
        (error.response?.status === 401 || !error.response)
      ) {
        return false;
      }

      return failureCount < 3;
    },
  });

  return { data, isLoading, refetch };
}
