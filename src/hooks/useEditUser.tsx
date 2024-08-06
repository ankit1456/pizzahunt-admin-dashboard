import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../http/api";
import { TUser, TUserPayload } from "../types/user.types";
import { message } from "antd";

const useEditUser = (userToEdit: TUser | null, successHandler?: () => void) => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate: editUserMutate } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (formValues: TUserPayload) =>
      updateUser(userToEdit!.id, formValues),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successHandler?.();

      messageApi.open({
        type: "success",
        content: "User updated successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });
  return { editUserMutate, editContextHolder: contextHolder };
};

export default useEditUser;
