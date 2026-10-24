/** @format */

export * from "./Job";
export * from "./Candidate";
export * from "./Application";
export * from "./StatusFilters";
// export * from "./ServiceResult";
export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[] | undefined> };
