import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../store";
import { logout } from "../../http/services/auth.service";

export default function useLogout() {
  const { logoutFromStore } = useAuth();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => logoutFromStore(),
  });

  return { logoutMutate };
}
