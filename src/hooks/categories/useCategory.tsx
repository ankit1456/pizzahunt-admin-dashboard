import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../http/api";

function useCategory(categoryId: string) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  return {
    data: data?.data.category,
    isFetching,
    error,
    isError,
  };
}

export default useCategory;
