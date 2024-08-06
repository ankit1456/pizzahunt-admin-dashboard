export type TPaginatedResponse<T> = {
  page: number;
  limit: number;
  totalCount: number;
  data: T[];
};

export type TQueryParams = {
  page: number;
  limit: number;
  q?: string;
  role?: string;
};

export type TFilterPayload = {
  name: string[];
  value?: string;
};

export const LIMIT_PER_PAGE = 6;
export const LIMIT_PER_SCROLL = 6;
