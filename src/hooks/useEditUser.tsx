import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message/interface";
import { updateUser } from "../http/api";
import { TUser, TUserPayload } from "../types/user.types";

const useEditUser = (
  userToEdit: TUser | null,
  successHandler?: () => void,
  messageApi?: MessageInstance
) => {
  const queryClient = useQueryClient();

  const { mutate: editUserMutate } = useMutation({
    mutationFn: (formValues: TUserPayload) =>
      updateUser(userToEdit!.id, formValues),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successHandler?.();

      messageApi?.open({
        type: "success",
        content: "User updated successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });
  return { editUserMutate };
};

export default useEditUser;
