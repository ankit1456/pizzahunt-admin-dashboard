import { TQueryParams } from "../types";

export default function getQueryString(queryParams?: TQueryParams) {
  if (!queryParams || !Object.keys(queryParams).length) return "";

  const sanitizedQueryParams = Object.entries(queryParams)
    .filter(([, value]) => !!value)
    .reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>);

  return new URLSearchParams(sanitizedQueryParams).toString();
}
