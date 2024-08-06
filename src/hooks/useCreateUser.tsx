import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createUser } from "../http/api";

function useCreateUser(successHandler?: () => void) {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate: newUserMutate } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successHandler?.();

      messageApi.open({
        type: "success",
        content: "User created successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });

  return { createContextHolder: contextHolder, newUserMutate };
}

export default useCreateUser;
