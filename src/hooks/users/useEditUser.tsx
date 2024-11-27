import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message/interface";
import { TUser, TUserPayload } from "../../lib/types/user.types";
import { updateUser } from "../../http/services/user.service";

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
