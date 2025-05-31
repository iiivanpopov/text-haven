export type ApiResponse<T> = {
  data: T;
  message: string;
  error: Error | undefined;
};

export const Exposure = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
} as const;
export type Exposure = (typeof Exposure)[keyof typeof Exposure];

export const TextCategory = {
  POST: "POST",
  NOTE: "NOTE",
} as const;
export type TextCategory = (typeof TextCategory)[keyof typeof TextCategory];

type SelectOption<T = string> = { name: string; value: T };
export type SelectOptions<T = string> = SelectOption<T>[];
