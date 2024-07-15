export type TPaginatedResponse<T> = {
  page: number;
  limit: number;
  totalCount: number;
  data: T[];
};

export type TPaginatedQuery = {
  page: number;
  limit: number;
};

export type TQueryParams = TPaginatedQuery & {
  role?: string;
};

export const LIMIT_PER_PAGE = 6;
