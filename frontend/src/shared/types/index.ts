export type ApiResponse<T> = {
  data: T;
  message: string;
  error: Error | undefined;
};

export type Exposure = "PUBLIC" | "PRIVATE";
export type TextCategory = "POST" | "NOTE";

type SelectOption<T = string> = { name: string; value: T };
export type SelectOptions<T = string> = SelectOption<T>[];
