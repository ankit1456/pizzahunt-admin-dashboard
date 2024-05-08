import { TCredentials, TUser } from "./../types/user.types";
import api from "./client";

export const login = (credentials: TCredentials) =>
  api.post<TUser>("/auth/login", credentials);

export const self = () => api.get<TUser>("/auth/self");
export const logout = () => api.post("/auth/logout");

export const getUsers = () => api.get<TUser[]>("/users");
