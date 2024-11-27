import { getProducts } from "@http/services/product.service";
import { TQueryParams } from "@lib/types";
import { getQueryString } from "@lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useProducts(queryParams: TQueryParams) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      const queryString = getQueryString(queryParams);
      return getProducts(queryString);
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
