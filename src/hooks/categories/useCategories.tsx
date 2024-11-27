import { getCategories } from "@http/services/category.service";
import { TQueryParams } from "@lib/types";
import { getQueryString } from "@lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCategories(queryParams?: TQueryParams) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["categories", queryParams],
    queryFn: () => {
      const queryString = getQueryString(queryParams);
      return getCategories(queryString);
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
