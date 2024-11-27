import { logout } from "@http/services/auth.service";
import { useAuth } from "@src/state/store";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
  const { logoutFromStore } = useAuth();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => logoutFromStore(),
  });

  return { logoutMutate };
}
