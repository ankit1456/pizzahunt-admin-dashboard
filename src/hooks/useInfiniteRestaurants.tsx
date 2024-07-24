import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getRestaurants } from "../http/api";
import { TQueryParams } from "../types";
import { getQueryString } from "../utils";

function useInfiniteRestaurants(queryParams: TQueryParams) {
  const {
    data,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["restaurants", queryParams],
    queryFn: ({ pageParam }) => {
      const params = { ...queryParams, page: pageParam };

      const queryString = getQueryString(params);
      return getRestaurants(queryString);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.data.length === lastPage?.data.limit
        ? allPages.length + 1
        : undefined;
    },
    placeholderData: keepPreviousData,
  });

  return {
    data: data?.pages,
    isFetching,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useInfiniteRestaurants;
