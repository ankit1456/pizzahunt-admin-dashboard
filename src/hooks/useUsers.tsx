import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../http/api";

function useUsers() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users: users?.data,
    isLoading,
    error,
    isError,
  };
}

export default useUsers;
