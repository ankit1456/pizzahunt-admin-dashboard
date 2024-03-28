type TTenant = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  tenant?: TTenant;
};

export type TCredentials = {
  email: string;
  password: string;
};

export const enum Roles {
  ADMIN = "admin",
  MANAGER = "manager",
  CUSTOMER = "customer",
}
