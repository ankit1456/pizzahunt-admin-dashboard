import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message/interface";
import { updateProduct } from "../../http/api";
import { TProduct } from "../../types/product.types";

const useEditProduct = (
  productToEdit: TProduct | null,
  successHandler?: () => void,
  messageApi?: MessageInstance
) => {
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
};

export default useEditProduct;
