import { ErrorCode } from "@/app/core/enums/error-codes"

export interface ApiErrorResponse {
  type: ErrorCode,
  title: string,
  status: number,
  detail: string,
  instance: string,
  timestamp: string,
  traceId: string,
  errors: {
    [key: string]: string[]
  }
}
