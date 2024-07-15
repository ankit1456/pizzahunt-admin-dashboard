import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../http/api";
import { TPaginatedQuery } from "../types";

function useRestaurants(queryParams: TPaginatedQuery) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["restaurants", queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>
      ).toString();
      return getRestaurants(queryString);
    },
    placeholderData: keepPreviousData,
  });

  return {
    data: data?.data,
    isFetching,
    error,
    isError,
  };
}

export default useRestaurants;
