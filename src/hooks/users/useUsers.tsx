import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TQueryParams } from "../../lib/types";
import { getQueryString } from "../../lib/utils";
import { getUsers } from "../../http/services/user.service";

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
