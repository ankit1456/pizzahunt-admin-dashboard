import { TProductPayload } from "../../types/product.types";

export function generateFormData(data: TProductPayload): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) formData.append("image", value);
    else if (typeof value === "string" || typeof value === "boolean")
      formData.append(key, value as string);
    else formData.append(key, JSON.stringify(value));
  });

  return formData;
}
