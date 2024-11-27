import { updateProduct } from "@http/services/product.service";
import { TProduct } from "@lib/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message/interface";

export function useEditProduct(
  productToEdit: TProduct | null,
  successHandler?: () => void,
  messageApi?: MessageInstance
) {
  const queryClient = useQueryClient();

  const { mutate: editProductMutate, isPending } = useMutation({
    mutationFn: (formValues: FormData) =>
      updateProduct(productToEdit!._id, formValues),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      successHandler?.();

      messageApi?.open({
        type: "success",
        content: "Product updated successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });
  return { editProductMutate, isPending };
}
