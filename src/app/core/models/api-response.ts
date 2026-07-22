import { ErrorCode } from "../enums/error-codes";

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  status: string;
  title: string;
  type: ErrorCode;
  traceId: string;  
}
