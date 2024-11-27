import { CATALOG_SERVICE } from "../../lib/constants";
import { TProduct } from "../../lib/types/product.types";
import api from "../client";

//products
export const getProducts = (queryString: string) =>
  api.get(`${CATALOG_SERVICE}/products?${queryString}`);

export const createProduct = (product: FormData) =>
  api.post<TProduct>(`${CATALOG_SERVICE}/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (productId: string, product: FormData) =>
  api.patch<TProduct>(`${CATALOG_SERVICE}/products/${productId}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
