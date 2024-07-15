import { TPaginatedResponse } from "../types";
import { TTenant } from "../types/tenant.types";
import { TCredentials, TUser, TUserPayload } from "./../types/user.types";
import api from "./client";

export const login = (credentials: TCredentials) =>
  api.post<TUser>("/auth/login", credentials);

export const self = () => api.get<TUser>("/auth/self");
export const logout = () => api.post("/auth/logout");

export const getUsers = (queryString: string) =>
  api.get<TPaginatedResponse<TUser>>(`/users?${queryString}`);
export const getRestaurants = (queryString: string) =>
  api.get<TPaginatedResponse<TTenant>>(`/tenants?${queryString}`);

export const createUser = (user: TUserPayload) =>
  api.post<TUser>("/users", user);
