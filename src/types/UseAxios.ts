import { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";

export interface ResponseValues {
  data?: any
  loading: boolean
  error: AxiosError<any, any> | null
}

export type UseAxiosActionType = (
  config?: AxiosRequestConfig<any>,
  options?: RefetchOptions
) => AxiosPromise<any>;

export type UseAxiosResultType = [
  ResponseValues,
  UseAxiosActionType,
]