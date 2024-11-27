import { AUTH_SERVICE } from "../../lib/constants";
import { TPaginatedResponse } from "../../lib/types";
import { TUser, TUserPayload } from "../../lib/types/user.types";
import api from "../client";

export const getUsers = (queryString: string) =>
  api.get<TPaginatedResponse<TUser>>(`${AUTH_SERVICE}/users?${queryString}`);
export const createUser = (user: TUserPayload) =>
  api.post<TUser>(`${AUTH_SERVICE}/users`, user);
export const updateUser = (userId: string, user: TUserPayload) =>
  api.patch<TUser>(`${AUTH_SERVICE}/users/${userId}`, user);
