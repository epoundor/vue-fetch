"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const path_to_regexp_1 = require("path-to-regexp");
const vue_1 = require("vue");
class VFetcher {
    axiosInstance;
    constructor(baseUrl = "", axiosInstance = axios_1.default.create({
        withCredentials: true,
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })) {
        this.axiosInstance = axiosInstance;
    }
    /**
   * Registers request interceptors for axios library
   * @function
   * @param {function} [onFulfilled] - A function to be called when the request is fulfilled.
   * It takes an AxiosRequestConfig object as its parameter, and returns an AxiosRequestConfig object or a promise that resolves to an AxiosRequestConfig object.
   * @param {function} [onError=Promise.reject(error)] - A function to be called when the request is rejected.
   * It takes an AxiosError object as its parameter, and returns a promise that resolves to an AxiosError object.
   */
    registerRequestInterceptor(onFulfilled, onError = (error) => Promise.reject(error)) {
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
    registerResponseInterceptor(onFulfilled, onError = (error) => Promise.reject(error)) {
        this.axiosInstance.interceptors.response.use(onFulfilled, onError);
    }
    fetch(url = "", options = { method: "GET", immediate: true }) {
        const successCallbacks = [];
        const failureCallbacks = [];
        const errorCallbacks = [];
        const uploadProgessCallbacks = [];
        const { immediate = false, routeParams } = options;
        const context = (0, vue_1.reactive)({
            isLoading: false,
            isFinished: false,
            isAborted: false,
            statusCode: 0,
            response: null,
            data: null,
            error: null,
        });
        const axiosInstance = this.axiosInstance;
        async function execute(config) {
            const generateUrl = (0, path_to_regexp_1.compile)(url);
            const stringifiedRouteParams = {};
            const paramsToUse = config?.routeParams || options.routeParams || {};
            const routeParamsKeys = Object.keys(paramsToUse);
            if (routeParamsKeys.length > 0) {
                routeParamsKeys.forEach((key) => {
                    stringifiedRouteParams[key] = paramsToUse[key].toString();
                });
            }
            const requestConfig = {
                url: generateUrl(stringifiedRouteParams || config?.routeParams),
                method: options.method || "GET",
                params: config?.params || options.params || {},
                data: options.payload || {},
                headers: options.headers || {},
                onUploadProgress(progressEvent) {
                    uploadProgessCallbacks.forEach((cb) => {
                        cb(progressEvent);
                    });
                },
            };
            if (config?.payload) {
                if (requestConfig.method?.toLowerCase() === "get") {
                    requestConfig.params = config.payload;
                }
                else {
                    requestConfig.data = config.payload;
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
                context.isFinished = true;
            }
            catch (error) {
                const axiosError = error;
                if (axiosError.response) {
                    context.response = axiosError.response;
                    context.statusCode = axiosError.response.status;
                    context.data = axiosError.response.data;
                    failureCallbacks.forEach((cb) => {
                        cb(context.data, context.response);
                    });
                }
                else {
                    context.error = axiosError;
                    errorCallbacks.forEach((cb) => {
                        cb(context.error);
                    });
                }
            }
            finally {
                context.isLoading = false;
            }
        }
        function onSuccess(cb) {
            successCallbacks.push(cb);
        }
        function onFailure(cb) {
            failureCallbacks.push(cb);
        }
        function onError(cb) {
            errorCallbacks.push(cb);
        }
        function onUploadProgress(cb) {
            uploadProgessCallbacks.push(cb);
        }
        if (immediate) {
            execute(options);
        }
        return {
            // ...toRefs(context),
            isLoading: (0, vue_1.computed)(() => context.isLoading),
            isFinished: (0, vue_1.computed)(() => context.isFinished),
            isAborted: (0, vue_1.computed)(() => context.isAborted),
            statusCode: (0, vue_1.computed)(() => context.statusCode),
            response: (0, vue_1.computed)(() => context.response),
            // data: T | unknown | null;
            error: (0, vue_1.computed)(() => context.error),
            data: (0, vue_1.computed)(() => context.data),
            execute,
            onSuccess,
            onFailure,
            onError,
            onUploadProgress,
        };
    }
    createCrudApi(resource, uri) {
        const plural = `${resource}s`;
        const pascalCased = pascalCase(resource);
        const pluralPascalCased = pascalCase(plural);
        const fetch = this.fetch;
        return {
            [`useFetch${pluralPascalCased}`](options = {
                immediate: false,
                method: "GET",
                params: {},
                headers: {},
                routeParams: {},
                data: {},
            }) {
                return fetch(`${uri || plural}`, options);
            },
            [`useFetch${pascalCased}`](id, options = {
                immediate: false,
                method: "GET",
                params: {},
                headers: {},
                routeParams: {},
                data: {},
            }) {
                return fetch(`${uri || plural}/${id}`, options);
            },
            [`useFetch${pascalCased}Dynamic`](options = {}) {
                return fetch(`${uri || plural}/:id`, options);
            },
            [`useCreate${pascalCased}`](options = {
                params: {},
                headers: {},
                routeParams: {},
                data: {},
            }) {
                return fetch(`${uri || plural}`, {
                    immediate: false,
                    method: "POST",
                    ...options,
                });
            },
            [`useUpdate${pascalCased}`](id, options = {
                params: {},
                headers: {},
                routeParams: {},
                data: {},
            }) {
                return fetch(`${uri || plural}/${id}`, {
                    immediate: false,
                    method: "PUT",
                    ...options,
                });
            },
            [`useDelete${pascalCased}`](id, options = {
                params: {},
                headers: {},
                routeParams: {},
                data: {},
            }) {
                return fetch(`${uri || plural}/${id}`, {
                    immediate: false,
                    method: "DELETE",
                    ...options,
                });
            },
            [`useDelete${pascalCased}Dynamic`](options = {
                params: {},
                headers: {},
                routeParams: {},
                data: {},
            }) {
                return fetch(`${uri || plural}/:id`, {
                    immediate: false,
                    method: "DELETE",
                    ...options,
                });
            },
        };
    }
}
exports.VFetcher = VFetcher;
function pascalCase(str) {
    return str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
}
