import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../http/api";
import { TQueryParams } from "../types";
import { getQueryString } from "../utils";

function useUsers(queryParams: TQueryParams) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      const queryString = getQueryString(queryParams);
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
