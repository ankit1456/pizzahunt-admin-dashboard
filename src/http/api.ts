import { Credentials, IUser } from "./../types";
import api from "./client";

export const login = (credentials: Credentials) =>
  api.post<IUser>("/auth/login", credentials);
