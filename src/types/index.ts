export type TPaginatedResponse<T> = {
  status: EResponseStatus.SUCCESS;
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
  categoryId?: string;
  tenantId?: string;
  isPublished?: boolean;
};

export type TFilterPayload = {
  name: string[];
  value?: string;
};

export const LIMIT_PER_PAGE = 8;
export const LIMIT_PER_SCROLL = 6;

export const enum EResponseStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}
