import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TQueryParams } from "../../lib/types";
import { getQueryString } from "../../lib/utils";
import { getCategories } from "../../http/services/category.service";

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
