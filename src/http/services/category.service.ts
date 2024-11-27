import { CATALOG_SERVICE } from "../../lib/constants";
import { TPaginatedResponse } from "../../lib/types";
import { TCategory, TCategoryResponse } from "../../lib/types/category.types";
import api from "../client";

export const getCategories = (queryString: string) =>
  api.get<TPaginatedResponse<TCategory>>(
    `${CATALOG_SERVICE}/categories?${queryString}`
  );

export const getCategory = (categoryId: string) =>
  api.get<TCategoryResponse>(`${CATALOG_SERVICE}/categories/${categoryId}`);
