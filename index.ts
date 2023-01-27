import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosProgressEvent,
} from "axios";
import { compile } from "path-to-regexp";
import { computed, reactive, type ComputedRef } from "vue";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL
    ? import.meta.env.VITE_APP_URL + ""
    : "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function registerRequestInterceptor(
  onFulfilled:
    | ((
        value: AxiosRequestConfig
      ) => AxiosRequestConfig | Promise<AxiosRequestConfig>)
    | undefined,
  onError: ((error: AxiosError) => Promise<AxiosError>) | undefined = (
    error: AxiosError
  ) => Promise.reject(error)
) {
  axiosInstance.interceptors.request.use(onFulfilled, onError);
}

export function registerResponseInterceptor(
  onFulfilled:
    | ((
        value: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
    | undefined,
  onError: ((error: AxiosError) => Promise<AxiosError>) | undefined = (error) =>
    Promise.reject(error)
) {
  axiosInstance.interceptors.response.use(onFulfilled, onError);
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface Option<PayloadType> {
  immediate: boolean;
  method: HttpMethod;
  params: Record<string, string | number>;
  headers: Record<string, string | number>;
  routeParams: Record<string, string | number>;
  data: PayloadType;
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
  // context: Omit<Context<T>, "data">;
  isLoading: ComputedRef<boolean>;
  isFinished: ComputedRef<boolean>;
  isAborted: ComputedRef<boolean>;
  statusCode: ComputedRef<number>;
  response: ComputedRef<AxiosResponse> | null;
  // data: T | unknown | null;
  error: ComputedRef<AxiosError> | null;
  data: ComputedRef<T> | null | ComputedRef<unknown>;
  execute: (config?: Partial<Option<PayloadType>>) => Promise<void>;
  registerSuccessCallback: (cb: SuccessCallBack<T>) => unknown;
  registerFailureCallback: (cb: FailureCallBack) => unknown;
  registerErrorCallback: (cb: ErrorCallBack) => unknown;
  registerUploadProgressCallback: (cb: UploadProgressCallBack) => unknown;
};

export function apiCall<T, PayloadType = any>(
  url: string,
  options: Partial<Option<PayloadType>> & { method: HttpMethod }
): ApiCall<T, PayloadType> {
  const successCallbacks: Function[] = [];
  const failureCallbacks: Function[] = [];
  const errorCallbacks: Function[] = [];
  const uploadProgessCallbacks: Function[] = [];

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

  async function execute(config?: Partial<Option<PayloadType>>): Promise<void> {
    const generateUrl = compile(url);

    const stringifiedRouteParams: Record<string, string> = {};

    const paramsToUse = config?.routeParams || options.routeParams || {};

    const routeParamsKeys = Object.keys(paramsToUse);

    if (routeParamsKeys.length > 0) {
      routeParamsKeys.forEach((key) => {
        stringifiedRouteParams[key] = paramsToUse[key].toString();
      });
    }

    const requestConfig: AxiosRequestConfig = {
      url: generateUrl(stringifiedRouteParams || config?.routeParams),
      method: options.method || "GET",
      params: config?.params || options.params || {},
      data: options.data || {},
      headers: options.headers || {},
      onUploadProgress(progressEvent: AxiosProgressEvent) {
        uploadProgessCallbacks.forEach((cb) => {
          cb(progressEvent);
        });
      },
    };

    if (config?.data) {
      if (requestConfig.method?.toLowerCase() === "get") {
        requestConfig.params = config.data;
      } else {
        requestConfig.data = config.data;
      }
    }

    // if (config.url) {
    //   requestConfig.url = `${requestConfig.url}/${config.url}`;
    // }

    context.isLoading = true;

    try {
      const response = await axiosInstance(requestConfig);

      context.response = response;
      context.data = response.data;
      context.statusCode = response.status;

      successCallbacks.forEach((cb) => {
        cb(context.data, context.response, axiosInstance);
      });

      context.isLoading = false;
      context.isFinished = true;
    } catch (error) {
      const axiosError = error as AxiosError;
      context.isLoading = false;
      context.isFinished = true;
      if (axiosError.response) {
        context.response = axiosError.response;
        context.statusCode = axiosError.response.status;
        context.data = axiosError.response.data;

        failureCallbacks.forEach((cb) => {
          cb(context.data, context.response);
        });
      } else {
        context.error = axiosError;
        errorCallbacks.forEach((cb) => {
          cb(context.error);
        });
      }
    }

    // return axiosInstance(requestConfig)
    //   .then((response) => {
    //     context.response = response;
    //     context.data = response.data;
    //     context.statusCode = response.status;

    //     successCallbacks.forEach((cb) => {
    //       cb(context.data, context.response, axiosInstance);
    //     });
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       context.response = error.response;
    //       context.statusCode = error.response.status;
    //       context.data = error.response.data;

    //       failureCallbacks.forEach((cb) => {
    //         cb(context.data, context.response);
    //       });
    //     } else {
    //       context.error = error;
    //       errorCallbacks.forEach((cb) => {
    //         cb(context.error);
    //       });
    //     }
    //   })
    //   .finally(() => {
    //     context.isLoading = false;
    //     context.isFinished = true;
    //   });
  }

  function registerSuccessCallback(cb: Function) {
    successCallbacks.push(cb);
  }

  function registerFailureCallback(cb: Function) {
    failureCallbacks.push(cb);
  }

  function registerErrorCallback(cb: Function) {
    errorCallbacks.push(cb);
  }

  function registerUploadProgressCallback(cb: Function) {
    uploadProgessCallbacks.push(cb);
  }

  if (immediate) {
    setTimeout(() => execute(options), 0);
  }

  return {
    // ...toRefs(context),
    isLoading: computed(() => context.isLoading),
    isFinished: computed(() => context.isFinished),
    isAborted: computed(() => context.isAborted),
    statusCode: computed(() => context.statusCode),
    response: computed(() => context.response as AxiosResponse),
    // data: T | unknown | null;
    error: computed(() => context.error as AxiosError),
    data: computed(() => context.data),
    execute,
    registerSuccessCallback,
    registerFailureCallback,
    registerErrorCallback,
    registerUploadProgressCallback,
  };
}

function pascalCase(str: string) {
  return str.replace(
    /(\w)(\w*)/g,
    (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  );
}

export function createCrudApi(resource: string, uri: string) {
  const plural = `${resource}s`;
  const pascalCased = pascalCase(resource);
  const pluralPascalCased = pascalCase(plural);

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
      return apiCall(`${uri || plural}`, options);
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
      return apiCall(`${uri || plural}/${id}`, options);
    },

    [`useFetch${pascalCased}Dynamic`](options: any = {}) {
      return apiCall(`${uri || plural}/:id`, options);
    },

    [`useCreate${pascalCased}`](
      options = {
        params: {},
        headers: {},
        routeParams: {},
        data: {},
      }
    ) {
      return apiCall(`${uri || plural}`, {
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
      return apiCall(`${uri || plural}/${id}`, {
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
      return apiCall(`${uri || plural}/${id}`, {
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
      return apiCall(`${uri || plural}/:id`, {
        immediate: false,
        method: "DELETE",
        ...options,
      });
    },
  };
}
