import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../http/api";
import { TQueryParams } from "../types";
import { getQueryString } from "../utils";

function useRestaurants(queryParams: TQueryParams) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["restaurants", queryParams],
    queryFn: () => {
      const queryString = getQueryString(queryParams);
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
