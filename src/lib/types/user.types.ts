import { TTenant } from "./tenant.types";

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  createdAt: string;
  updatedAt: string;
  tenant: TTenant | null;
};

export type TUserPayload = Omit<
  TUser,
  "createdAt" | "updatedAt" | "tenant" | "id"
> & {
  password: string;
  tenantId?: string;
};

export type TCredentials = {
  email: string;
  password: string;
};

export type TAuthResponse = {
  status: string;
  user: TUser;
};

export const enum Roles {
  ADMIN = "admin",
  MANAGER = "manager",
  CUSTOMER = "customer",
}
