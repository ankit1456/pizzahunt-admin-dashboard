export type TTenant = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
};

export type TTenantPayload = Omit<TTenant, "id" | "createdAt">;
