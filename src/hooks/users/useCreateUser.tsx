import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message/interface";
import { createUser } from "../../http/services/user.service";

export function useCreateUser(
  successHandler?: () => void,
  messageApi?: MessageInstance
) {
  const queryClient = useQueryClient();

  const { mutate: newUserMutate, isPending: isCreatingUser } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successHandler?.();

      messageApi?.open({
        type: "success",
        content: "User created successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });

  return { newUserMutate, isCreatingUser };
}
