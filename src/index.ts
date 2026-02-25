import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosProgressEvent,
} from "axios";
import { compile } from "path-to-regexp";
import { computed, reactive, type ComputedRef } from "vue";


type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface Option<PayloadType> {
  immediate: boolean;
  method: HttpMethod;
  params: Record<string, string | number | null>;
  headers: Record<string, string | number>;
  routeParams: Record<string, string | number>;
  payload: PayloadType;
}

interface Context<T> {
  isLoading: boolean;
  isFinished: boolean;
  isAborted: boolean;
  statusCode: number;
  response: AxiosResponse | null;
  data: T | unknown | null;
  error: AxiosError | null;
}

export type SuccessCallBack<T> = (
  data: T,
  response: AxiosResponse,
  axiosInstance: AxiosInstance
) => unknown;
export type ErrorCallBack = (error: AxiosError) => unknown;
export type FailureCallBack = (data: any, response: AxiosResponse) => unknown;
export type UploadProgressCallBack = (
  progressEvent: AxiosProgressEvent
) => unknown;

export type ApiCall<T, PayloadType> = {
  isLoading: ComputedRef<boolean>;
  isFinished: ComputedRef<boolean>;
  isAborted: ComputedRef<boolean>;
  statusCode: ComputedRef<number>;
  response: ComputedRef<AxiosResponse | null>;
  error: ComputedRef<AxiosError | null>;
  data: ComputedRef<T | null>;
  execute: (
    config?: Partial<Option<PayloadType>>,
  ) => Promise<void>;
  onSuccess: (cb: SuccessCallBack<T>) => void;
  onFailure: (cb: FailureCallBack) => void;
  onError: (cb: ErrorCallBack) => void;
  onUploadProgress: (cb: UploadProgressCallBack) => void;
};

export class VFetcher {
  private axiosInstance: AxiosInstance;

  constructor(config: CreateAxiosDefaults);
  constructor(baseUrl: string, config?: CreateAxiosDefaults);
  constructor(
    baseUrlOrConfig: string | CreateAxiosDefaults = "",
    config?: CreateAxiosDefaults
  ) {
    if (typeof baseUrlOrConfig === "string") {
      const resolvedConfig: CreateAxiosDefaults = config ?? {
        baseURL: baseUrlOrConfig,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      this.axiosInstance = axios.create(resolvedConfig);
      this.axiosInstance.defaults.baseURL = baseUrlOrConfig;
    } else {
      this.axiosInstance = axios.create(baseUrlOrConfig);
    }
  }

  /**
 * Registers request interceptors for axios library
 * @function
 * @param {function} [onFulfilled] - A function to be called when the request is fulfilled.
 * It takes an AxiosRequestConfig object as its parameter, and returns an AxiosRequestConfig object or a promise that resolves to an AxiosRequestConfig object.
 * @param {function} [onError=Promise.reject(error)] - A function to be called when the request is rejected.
 * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
 */
  registerRequestInterceptor(
    onFulfilled?:
      | ((
        value: InternalAxiosRequestConfig<any>
      ) =>
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>>)
      | null,
    onError: ((error: AxiosError) => Promise<AxiosError>) | undefined = (
      error: AxiosError
    ) => Promise.reject(error)
  ) {
    this.axiosInstance.interceptors.request.use(onFulfilled, onError);
  }

  /**
   * Registers response interceptors for axios library
   * @function
   * @param {function} [onFulfilled] - A function to be called when the response is fulfilled.
   * It takes an AxiosResponse object as its parameter, and returns an AxiosResponse object or a promise that resolves to an AxiosResponse object.
   * @param {function} [onError=Promise.reject(error)] - A function to be called when the response is rejected.
   * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
   */
  registerResponseInterceptor(
    onFulfilled:
      | ((
        value: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
      | undefined,
    onError: ((error: AxiosError) => Promise<AxiosError>) | undefined = (error) =>
      Promise.reject(error)
  ) {
    this.axiosInstance.interceptors.response.use(onFulfilled, onError);
  }

  fetch<T, PayloadType = any>(
    url: string = "",
    options: Partial<Option<PayloadType>> & { method: HttpMethod } = { method: "GET", immediate: true }
  ): ApiCall<T, PayloadType> {
    const successCallbacks: SuccessCallBack<T>[] = [];
    const failureCallbacks: FailureCallBack[] = [];
    const errorCallbacks: ErrorCallBack[] = [];
    const uploadProgressCallbacks: UploadProgressCallBack[] = [];

    const { immediate = false, routeParams } = options;

    const context = reactive<Context<T>>({
      isLoading: false,
      isFinished: false,
      isAborted: false,
      statusCode: 0,
      response: null,
      data: null,
      error: null,
    });

    const axiosInstance = this.axiosInstance;

    async function execute(
      config?: Partial<Option<PayloadType>>,
    ): Promise<void> {
      const generateUrl = compile(url);

      const stringifiedRouteParams: Record<string, string> = {};

      const paramsToUse = config?.routeParams || options.routeParams || {};

      const routeParamsKeys = Object.keys(paramsToUse);
      if (routeParamsKeys.length > 0) {
        routeParamsKeys.forEach((key) => {
          stringifiedRouteParams[key] = paramsToUse[key].toString();
        });
      }

      const method = config?.method || options.method || "GET";

      const requestConfig: AxiosRequestConfig = {
        url: generateUrl(stringifiedRouteParams || config?.routeParams),
        method,
        params: config?.params || options.params || {},
        headers: config?.headers || options.headers || {},
        onUploadProgress(progressEvent: AxiosProgressEvent) {
          uploadProgressCallbacks.forEach((cb) => {
            cb(progressEvent);
          });
        },
      };

      // Apply payload: as query params for GET, as body for other methods
      const payload = config?.payload || options.payload;
      if (payload) {
        if (method.toUpperCase() === "GET") {
          requestConfig.params = { ...requestConfig.params, ...(payload as Record<string, unknown>) };
        } else {
          requestConfig.data = payload;
        }
      }



      context.isLoading = true;

      try {

        const response = await axiosInstance(requestConfig);

        context.response = response;
        context.data = response.data;
        context.statusCode = response.status;

        successCallbacks.forEach((cb) => {
          cb(context.data as T, context.response as AxiosResponse, axiosInstance);
        });
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          context.response = axiosError.response;
          context.statusCode = axiosError.response.status;
          context.data = axiosError.response.data;

          failureCallbacks.forEach((cb) => {
            cb(context.data, context.response as AxiosResponse);
          });
        } else {
          context.error = axiosError;
          errorCallbacks.forEach((cb) => {
            cb(context.error as AxiosError);
          });
        }
      } finally {
        context.isLoading = false;
        context.isFinished = true;
      }
    }

    function onSuccess(cb: SuccessCallBack<T>) {
      successCallbacks.push(cb);
    }

    function onFailure(cb: FailureCallBack) {
      failureCallbacks.push(cb);
    }

    function onError(cb: ErrorCallBack) {
      errorCallbacks.push(cb);
    }

    function onUploadProgress(cb: UploadProgressCallBack) {
      uploadProgressCallbacks.push(cb);
    }

    if (immediate) {
      execute(options);
    }

    return {
      isLoading: computed(() => context.isLoading),
      isFinished: computed(() => context.isFinished),
      isAborted: computed(() => context.isAborted),
      statusCode: computed(() => context.statusCode),
      response: computed(() => context.response),
      error: computed(() => context.error),
      data: computed(() => context.data as T | null),
      execute,
      onSuccess,
      onFailure,
      onError,
      onUploadProgress,
    };
  }

  createCrudApi(resource: string, uri: string) {
    const plural = `${resource}s`;
    const pascalCased = pascalCase(resource);
    const pluralPascalCased = pascalCase(plural);
    const fetch = this.fetch.bind(this);
    return {
      [`useFetch${pluralPascalCased}`](
        options: any = {
          immediate: false,
          method: "GET",
          params: {},
          headers: {},
          routeParams: {},
          data: {},
        }
      ) {
        return fetch(`${uri || plural}`, options);
      },

      [`useFetch${pascalCased}`](
        id: number,
        options: any = {
          immediate: false,
          method: "GET",
          params: {},
          headers: {},
          routeParams: {},
          data: {},
        }
      ) {
        return fetch(`${uri || plural}/${id}`, options);
      },

      [`useFetch${pascalCased}Dynamic`](options: any = {}) {
        return fetch(`${uri || plural}/:id`, options);
      },

      [`useCreate${pascalCased}`](
        options = {
          params: {},
          headers: {},
          routeParams: {},
          data: {},
        }
      ) {
        return fetch(`${uri || plural}`, {
          immediate: false,
          method: "POST",
          ...options,
        });
      },

      [`useUpdate${pascalCased}`](
        id: number,
        options = {
          params: {},
          headers: {},
          routeParams: {},
          data: {},
        }
      ) {
        return fetch(`${uri || plural}/${id}`, {
          immediate: false,
          method: "PUT",
          ...options,
        });
      },

      [`useDelete${pascalCased}`](
        id: number,
        options = {
          params: {},
          headers: {},
          routeParams: {},
          data: {},
        }
      ) {
        return fetch(`${uri || plural}/${id}`, {
          immediate: false,
          method: "DELETE",
          ...options,
        });
      },

      [`useDelete${pascalCased}Dynamic`](
        options = {
          params: {},
          headers: {},
          routeParams: {},
          data: {},
        }
      ) {
        return fetch(`${uri || plural}/:id`, {
          immediate: false,
          method: "DELETE",
          ...options,
        });
      },
    };
  }
}


function pascalCase(str: string) {
  return str.replace(
    /(\w)(\w*)/g,
    (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  );
}

