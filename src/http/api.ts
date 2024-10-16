import { TPaginatedResponse } from "../types";
import { TTenant, TTenantPayload } from "../types/tenant.types";
import {
  TAuthResponse,
  TCredentials,
  TUser,
  TUserPayload,
} from "./../types/user.types";
import api from "./client";

// auth
export const login = (credentials: TCredentials) =>
  api.post<TAuthResponse>("/auth/login", credentials);
export const self = () => api.get<TAuthResponse>("/auth/self");
export const logout = () => api.post("/auth/logout");

// users
export const getUsers = (queryString: string) =>
  api.get<TPaginatedResponse<TUser>>(`/users?${queryString}`);
export const createUser = (user: TUserPayload) =>
  api.post<TUser>("/users", user);
export const updateUser = (userId: string, user: TUserPayload) =>
  api.patch<TUser>(`/users/${userId}`, user);

// tenants
export const getRestaurants = (queryString: string) =>
  api.get<TPaginatedResponse<TTenant>>(`/tenants?${queryString}`);
export const createRestaurant = (tenant: TTenantPayload) =>
  api.post<TTenant>("/tenants", tenant);
export const updateRestaurant = (tenantId: string, tenant: TTenantPayload) =>
  api.patch<TTenant>(`/tenants/${tenantId}`, tenant);
