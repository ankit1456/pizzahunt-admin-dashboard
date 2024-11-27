import { AUTH_SERVICE } from "../../lib/constants";
import { TPaginatedResponse } from "../../lib/types";
import { TTenant, TTenantPayload } from "../../lib/types/tenant.types";
import api from "../client";

export const getRestaurants = (queryString: string) =>
  api.get<TPaginatedResponse<TTenant>>(
    `${AUTH_SERVICE}/tenants?${queryString}`
  );

export const createRestaurant = (tenant: TTenantPayload) =>
  api.post<TTenant>(`${AUTH_SERVICE}/tenants`, tenant);
export const updateRestaurant = (tenantId: string, tenant: TTenantPayload) =>
  api.patch<TTenant>(`${AUTH_SERVICE}/tenants/${tenantId}`, tenant);
