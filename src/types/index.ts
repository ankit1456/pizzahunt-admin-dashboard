interface ITenant {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  tenant?: ITenant;
}

export type Credentials = {
  email: string;
  password: string;
};
