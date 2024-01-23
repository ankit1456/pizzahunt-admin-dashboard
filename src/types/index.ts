export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type Credentials = {
  email: string;
  password: string;
};
