import { getCategory } from "@http/services/category.service";
import { useQuery } from "@tanstack/react-query";

export function useCategory(categoryId: string) {
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
