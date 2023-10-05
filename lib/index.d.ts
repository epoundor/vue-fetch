import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AxiosError, type AxiosInstance, type AxiosProgressEvent } from "axios";
import { type ComputedRef } from "vue";
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface Option<PayloadType> {
    immediate: boolean;
    method: HttpMethod;
    params: Record<string, string | number | null>;
    headers: Record<string, string | number>;
    routeParams: Record<string, string | number>;
    payload: PayloadType;
}
export type SuccessCallBack<T> = (data: T, response: AxiosResponse, axiosInstance: AxiosInstance) => unknown;
export type ErrorCallBack = (error: AxiosError) => unknown;
export type FailureCallBack = (data: any, response: AxiosResponse) => unknown;
export type UploadProgressCallBack = (progressEvent: AxiosProgressEvent) => unknown;
export type ApiCall<T, PayloadType> = {
    isLoading: ComputedRef<boolean>;
    isFinished: ComputedRef<boolean>;
    isAborted: ComputedRef<boolean>;
    statusCode: ComputedRef<number>;
    response: ComputedRef<AxiosResponse> | null;
    error: ComputedRef<AxiosError> | null;
    data: ComputedRef<T> | null;
    execute: (config?: Partial<Option<PayloadType>>, useFakerWait?: boolean) => Promise<void>;
    onSuccess: (cb: SuccessCallBack<T>) => unknown;
    onFailure: (cb: FailureCallBack) => unknown;
    onError: (cb: ErrorCallBack) => unknown;
    onUploadProgress: (cb: UploadProgressCallBack) => unknown;
};
export declare class VFetcher {
    private axiosInstance;
    constructor(baseUrl?: string, axiosInstance?: AxiosInstance);
    /**
   * Registers request interceptors for axios library
   * @function
   * @param {function} [onFulfilled] - A function to be called when the request is fulfilled.
   * It takes an AxiosRequestConfig object as its parameter, and returns an AxiosRequestConfig object or a promise that resolves to an AxiosRequestConfig object.
   * @param {function} [onError=Promise.reject(error)] - A function to be called when the request is rejected.
   * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
   */
    registerRequestInterceptor(onFulfilled?: ((value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>) | null, onError?: ((error: AxiosError) => Promise<AxiosError>) | undefined): void;
    /**
     * Registers response interceptors for axios library
     * @function
     * @param {function} [onFulfilled] - A function to be called when the response is fulfilled.
     * It takes an AxiosResponse object as its parameter, and returns an AxiosResponse object or a promise that resolves to an AxiosResponse object.
     * @param {function} [onError=Promise.reject(error)] - A function to be called when the response is rejected.
     * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
     */
    registerResponseInterceptor(onFulfilled: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined, onError?: ((error: AxiosError) => Promise<AxiosError>) | undefined): void;
    fetch<T, PayloadType = any>(url?: string, options?: Partial<Option<PayloadType>> & {
        method: HttpMethod;
    }): ApiCall<T, PayloadType>;
    createCrudApi(resource: string, uri: string): {
        [x: string]: (id: number, options?: any) => ApiCall<unknown, any>;
    };
}
export {};
