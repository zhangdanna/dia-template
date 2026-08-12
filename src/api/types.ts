export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface RequestOptions {
  errorMessage?: string;
  silent?: boolean;
}
