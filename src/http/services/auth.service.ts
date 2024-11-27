import { AUTH_SERVICE } from "../../lib/constants";
import { TCredentials, TAuthResponse } from "../../lib/types/user.types";
import api from "../client";

export const login = (credentials: TCredentials) =>
  api.post<TAuthResponse>(`${AUTH_SERVICE}/login`, credentials);
export const self = () => api.get<TAuthResponse>(`${AUTH_SERVICE}/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/logout`);
