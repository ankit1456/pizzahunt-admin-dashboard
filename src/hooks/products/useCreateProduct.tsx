import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageInstance } from "antd/lib/message/interface";
import { createProduct } from "../../http/api";

function useCreateProduct(
  successHandler?: () => void,
  messageApi?: MessageInstance
) {
  const queryClient = useQueryClient();

  const { mutate: newProductMutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      successHandler?.();

      messageApi?.open({
        type: "success",
        content: "Product created successfully",
        style: {
          fontSize: "small",
        },
      });
    },
  });

  return { newProductMutate, isPending };
}

export default useCreateProduct;
