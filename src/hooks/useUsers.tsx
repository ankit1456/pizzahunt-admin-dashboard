import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../http/api";
import { TPaginatedQuery } from "../types";

function useUsers(queryParams: TPaginatedQuery) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>
      ).toString();
      return getUsers(queryString);
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

export default useUsers;
