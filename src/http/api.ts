import { TPaginatedResponse } from "../types";
import { TCategory, TCategoryResponse } from "../types/category.types";
import { TProduct } from "../types/product.types";
import { TTenant, TTenantPayload } from "../types/tenant.types";
import {
  TAuthResponse,
  TCredentials,
  TUser,
  TUserPayload,
} from "./../types/user.types";
import api from "./client";

const AUTH_SERVICE = "/api/auth";
const CATALOG_SERVICE = "/api/catalog";

// auth
export const login = (credentials: TCredentials) =>
  api.post<TAuthResponse>(`${AUTH_SERVICE}/login`, credentials);
export const self = () => api.get<TAuthResponse>(`${AUTH_SERVICE}/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/logout`);

// users
export const getUsers = (queryString: string) =>
  api.get<TPaginatedResponse<TUser>>(`${AUTH_SERVICE}/users?${queryString}`);
export const createUser = (user: TUserPayload) =>
  api.post<TUser>(`${AUTH_SERVICE}/users`, user);
export const updateUser = (userId: string, user: TUserPayload) =>
  api.patch<TUser>(`${AUTH_SERVICE}/users/${userId}`, user);

// tenants
export const getRestaurants = (queryString: string) =>
  api.get<TPaginatedResponse<TTenant>>(
    `${AUTH_SERVICE}/tenants?${queryString}`
  );
export const createRestaurant = (tenant: TTenantPayload) =>
  api.post<TTenant>(`${AUTH_SERVICE}/tenants`, tenant);
export const updateRestaurant = (tenantId: string, tenant: TTenantPayload) =>
  api.patch<TTenant>(`${AUTH_SERVICE}/tenants/${tenantId}`, tenant);

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

//categories
export const getCategories = (queryString: string) =>
  api.get<TPaginatedResponse<TCategory>>(
    `${CATALOG_SERVICE}/categories?${queryString}`
  );

export const getCategory = (categoryId: string) =>
  api.get<TCategoryResponse>(`${CATALOG_SERVICE}/categories/${categoryId}`);
