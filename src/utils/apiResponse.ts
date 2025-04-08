export interface ApiResponse<T = any> {
  status: "success" | "error";
  status_code: number;
  message: string;
  data?: T;
  errors?: any;
}

export const successResponse = <T>(
  message: string,
  data?: T,
  statusCode: number = 200
): ApiResponse<T> => {
  return {
    status: "success",
    status_code: statusCode,
    message,
    ...(data !== undefined && { data }),
  };
};

export const errorResponse = (
  message: string,
  statusCode: number = 400,
  errors?: any
): ApiResponse => {
  return {
    status: "error",
    status_code: statusCode,
    message,
    ...(errors !== undefined && { errors }),
  };
};
