import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../http/api";
import { TQueryParams } from "../../types";
import { getQueryString } from "../../utils";

function useProducts(queryParams: TQueryParams) {
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

export default useProducts;
