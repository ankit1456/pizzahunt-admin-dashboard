import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TQueryParams } from "../../lib/types";
import { getQueryString } from "../../lib/utils";
import { getRestaurants } from "../../http/services/tenant.service";

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
