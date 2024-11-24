import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "../../http/api";
import { TQueryParams } from "../../types";
import { getQueryString } from "../../utils";

function useCategories(queryParams?: TQueryParams) {
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

export default useCategories;
