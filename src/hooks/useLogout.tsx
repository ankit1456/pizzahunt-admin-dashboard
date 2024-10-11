import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
import { useAuth } from "../store";

export default function useLogout() {
  const { logoutFromStore } = useAuth();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => logoutFromStore(),
  });

  return { logoutMutate };
}
