import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../http/api";

function useRestaurants() {
  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  return {
    restaurants: restaurants?.data,
    isLoading,
    error,
    isError,
  };
}

export default useRestaurants;
