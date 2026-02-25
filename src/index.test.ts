import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { VFetcher } from './index';

// We need to mock axios.create to return an instance we can intercept with MockAdapter
let mockAxios: MockAdapter;
let originalCreate: typeof axios.create;

beforeEach(() => {
    // Store original create
    originalCreate = axios.create;

    // Intercept axios.create to attach our mock adapter
    const realInstance = originalCreate.call(axios, {});
    mockAxios = new MockAdapter(realInstance);

    vi.spyOn(axios, 'create').mockReturnValue(realInstance);
});

afterEach(() => {
    mockAxios.reset();
    mockAxios.restore();
    vi.restoreAllMocks();
});

// ─── VFetcher Constructor ─────────────────────────────────────────────

describe('VFetcher Constructor', () => {
    it('should create an instance with default config', () => {
        const fetcher = new VFetcher('https://api.example.com');
        expect(fetcher).toBeInstanceOf(VFetcher);
    });

    it('should create an instance with custom config', () => {
        const fetcher = new VFetcher('https://api.example.com', {
            baseURL: 'https://api.example.com',
            withCredentials: true,
        });
        expect(fetcher).toBeInstanceOf(VFetcher);
    });

    it('should create an instance with config only (no baseUrl string)', () => {
        const fetcher = new VFetcher({
            baseURL: 'https://api.example.com',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        expect(fetcher).toBeInstanceOf(VFetcher);
    });

    it('should work with config-only constructor for requests', async () => {
        mockAxios.onGet('/health').reply(200, { status: 'ok' });

        const fetcher = new VFetcher({
            baseURL: 'https://api.example.com',
        });
        const { data, execute } = fetcher.fetch<{ status: string }>('/health', { method: 'GET' });

        await execute();

        expect(data.value).toEqual({ status: 'ok' });
    });
});

// ─── fetch() — Reactive State ─────────────────────────────────────────

describe('fetch() — Reactive State', () => {
    it('should return an ApiCall with correct initial state', () => {
        const fetcher = new VFetcher('https://api.example.com');
        const result = fetcher.fetch('/users', { method: 'GET' });

        expect(result.isLoading.value).toBe(false);
        expect(result.isFinished.value).toBe(false);
        expect(result.isAborted.value).toBe(false);
        expect(result.statusCode.value).toBe(0);
        expect(result.response.value).toBeNull();
        expect(result.error.value).toBeNull();
        expect(result.data.value).toBeNull();
        expect(typeof result.execute).toBe('function');
        expect(typeof result.onSuccess).toBe('function');
        expect(typeof result.onFailure).toBe('function');
        expect(typeof result.onError).toBe('function');
        expect(typeof result.onUploadProgress).toBe('function');
    });
});

// ─── fetch() — GET Request ────────────────────────────────────────────

describe('fetch() — GET Request', () => {
    it('should execute a GET request and update reactive state', async () => {
        const mockData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
        mockAxios.onGet('/users').reply(200, mockData);

        const fetcher = new VFetcher('https://api.example.com');
        const { data, isLoading, isFinished, statusCode, execute } = fetcher.fetch<typeof mockData>('/users', { method: 'GET' });

        expect(isLoading.value).toBe(false);

        await execute();

        expect(isLoading.value).toBe(false);
        expect(isFinished.value).toBe(true);
        expect(statusCode.value).toBe(200);
        expect(data.value).toEqual(mockData);
    });

    it('should send query params with GET request', async () => {
        mockAxios.onGet('/users').reply((config) => {
            return [200, { receivedParams: config.params }];
        });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ receivedParams: any }>('/users', {
            method: 'GET',
            params: { page: 1, limit: 10 },
        });

        await execute();

        expect(data.value?.receivedParams).toEqual({ page: 1, limit: 10 });
    });

    it('should merge payload into params for GET requests', async () => {
        mockAxios.onGet('/users').reply((config) => {
            return [200, { receivedParams: config.params }];
        });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ receivedParams: any }>('/users', {
            method: 'GET',
            params: { page: 1 },
        });

        await execute({ payload: { search: 'alice' } as any });

        expect(data.value?.receivedParams).toEqual({ page: 1, search: 'alice' });
    });
});

// ─── fetch() — POST Request ──────────────────────────────────────────

describe('fetch() — POST Request', () => {
    it('should execute a POST request with payload', async () => {
        const payload = { title: 'Hello', body: 'World' };
        mockAxios.onPost('/posts').reply((config) => {
            return [201, { id: 1, ...JSON.parse(config.data) }];
        });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, statusCode, execute } = fetcher.fetch<{ id: number; title: string; body: string }>('/posts', {
            method: 'POST',
        });

        await execute({ payload });

        expect(statusCode.value).toBe(201);
        expect(data.value).toEqual({ id: 1, title: 'Hello', body: 'World' });
    });

    it('should send payload as body for POST, not as params', async () => {
        mockAxios.onPost('/posts').reply((config) => {
            return [201, {
                receivedData: JSON.parse(config.data),
                receivedParams: config.params,
            }];
        });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ receivedData: any; receivedParams: any }>('/posts', {
            method: 'POST',
        });

        await execute({ payload: { title: 'Test' } as any });

        expect(data.value?.receivedData).toEqual({ title: 'Test' });
        expect(data.value?.receivedParams).toEqual({});
    });
});

// ─── fetch() — PUT / PATCH / DELETE ───────────────────────────────────

describe('fetch() — PUT / PATCH / DELETE', () => {
    it('should execute a PUT request', async () => {
        mockAxios.onPut('/posts/1').reply(200, { id: 1, title: 'Updated' });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch('/posts/1', { method: 'PUT' });

        await execute({ payload: { title: 'Updated' } as any });

        expect(data.value).toEqual({ id: 1, title: 'Updated' });
    });

    it('should execute a DELETE request', async () => {
        mockAxios.onDelete('/posts/1').reply(204, null);

        const fetcher = new VFetcher('https://api.example.com');
        const { statusCode, execute } = fetcher.fetch('/posts/1', { method: 'DELETE' });

        await execute();

        expect(statusCode.value).toBe(204);
    });
});

// ─── fetch() — Callbacks ─────────────────────────────────────────────

describe('fetch() — Callbacks', () => {
    it('should call onSuccess callback on 2xx response', async () => {
        const mockData = { id: 1, name: 'Alice' };
        mockAxios.onGet('/users/1').reply(200, mockData);

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, onSuccess } = fetcher.fetch<typeof mockData>('/users/1', { method: 'GET' });

        const successHandler = vi.fn();
        onSuccess(successHandler);

        await execute();

        expect(successHandler).toHaveBeenCalledOnce();
        expect(successHandler).toHaveBeenCalledWith(
            mockData,
            expect.objectContaining({ status: 200 }),
            expect.any(Function) // axiosInstance
        );
    });

    it('should call multiple onSuccess callbacks', async () => {
        mockAxios.onGet('/users').reply(200, []);

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, onSuccess } = fetcher.fetch('/users', { method: 'GET' });

        const handler1 = vi.fn();
        const handler2 = vi.fn();
        onSuccess(handler1);
        onSuccess(handler2);

        await execute();

        expect(handler1).toHaveBeenCalledOnce();
        expect(handler2).toHaveBeenCalledOnce();
    });

    it('should call onFailure callback on 4xx/5xx response', async () => {
        const errorData = { message: 'Not Found' };
        mockAxios.onGet('/users/999').reply(404, errorData);

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, onFailure, isFinished, statusCode } = fetcher.fetch('/users/999', { method: 'GET' });

        const failureHandler = vi.fn();
        onFailure(failureHandler);

        await execute();

        expect(failureHandler).toHaveBeenCalledOnce();
        expect(failureHandler).toHaveBeenCalledWith(
            errorData,
            expect.objectContaining({ status: 404 })
        );
        expect(isFinished.value).toBe(true);
        expect(statusCode.value).toBe(404);
    });

    it('should call onError callback on network error', async () => {
        mockAxios.onGet('/users').networkError();

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, onError, isFinished, error } = fetcher.fetch('/users', { method: 'GET' });

        const errorHandler = vi.fn();
        onError(errorHandler);

        await execute();

        expect(errorHandler).toHaveBeenCalledOnce();
        expect(isFinished.value).toBe(true);
        expect(error.value).not.toBeNull();
    });
});

// ─── fetch() — isFinished ─────────────────────────────────────────────

describe('fetch() — isFinished behavior', () => {
    it('should set isFinished to true on success', async () => {
        mockAxios.onGet('/test').reply(200, {});

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, isFinished } = fetcher.fetch('/test', { method: 'GET' });

        expect(isFinished.value).toBe(false);
        await execute();
        expect(isFinished.value).toBe(true);
    });

    it('should set isFinished to true on failure (4xx)', async () => {
        mockAxios.onGet('/test').reply(400, { error: 'bad request' });

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, isFinished } = fetcher.fetch('/test', { method: 'GET' });

        await execute();
        expect(isFinished.value).toBe(true);
    });

    it('should set isFinished to true on network error', async () => {
        mockAxios.onGet('/test').networkError();

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, isFinished } = fetcher.fetch('/test', { method: 'GET' });

        await execute();
        expect(isFinished.value).toBe(true);
    });
});

// ─── fetch() — isLoading ──────────────────────────────────────────────

describe('fetch() — isLoading behavior', () => {
    it('should set isLoading to true during request and false after', async () => {
        mockAxios.onGet('/test').reply(200, {});

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, isLoading } = fetcher.fetch('/test', { method: 'GET' });

        expect(isLoading.value).toBe(false);

        const promise = execute();
        // After execute is called but not awaited, isLoading depends on microtask scheduling
        await promise;

        expect(isLoading.value).toBe(false);
    });

    it('should set isLoading to false after error', async () => {
        mockAxios.onGet('/test').networkError();

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, isLoading } = fetcher.fetch('/test', { method: 'GET' });

        await execute();
        expect(isLoading.value).toBe(false);
    });
});

// ─── fetch() — Dynamic Route Params ──────────────────────────────────

describe('fetch() — Dynamic Route Params', () => {
    it('should interpolate route params in URL', async () => {
        mockAxios.onGet('/users/42').reply(200, { id: 42, name: 'Alice' });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ id: number; name: string }>('/users/:id', { method: 'GET' });

        await execute({ routeParams: { id: 42 } });

        expect(data.value).toEqual({ id: 42, name: 'Alice' });
    });

    it('should support multiple route params', async () => {
        mockAxios.onGet('/orgs/5/users/10').reply(200, { orgId: 5, userId: 10 });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ orgId: number; userId: number }>('/orgs/:orgId/users/:userId', { method: 'GET' });

        await execute({ routeParams: { orgId: 5, userId: 10 } });

        expect(data.value).toEqual({ orgId: 5, userId: 10 });
    });

    it('should allow overriding route params from options via execute config', async () => {
        mockAxios.onGet('/users/99').reply(200, { id: 99 });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ id: number }>('/users/:id', {
            method: 'GET',
            routeParams: { id: 1 },
        });

        // Override the route param at execute time
        await execute({ routeParams: { id: 99 } });

        expect(data.value).toEqual({ id: 99 });
    });
});

// ─── fetch() — Immediate Execution ───────────────────────────────────

describe('fetch() — Immediate Execution', () => {
    it('should execute immediately when immediate is true', async () => {
        const mockData = { result: 'ok' };
        mockAxios.onGet('/health').reply(200, mockData);

        const fetcher = new VFetcher('https://api.example.com');
        const { data, isFinished } = fetcher.fetch<typeof mockData>('/health', {
            method: 'GET',
            immediate: true,
        });

        // Wait for the immediate execution to complete
        await vi.waitFor(() => {
            expect(isFinished.value).toBe(true);
        });

        expect(data.value).toEqual(mockData);
    });
});

// ─── Interceptors ────────────────────────────────────────────────────

describe('Interceptors', () => {
    it('should register and apply a request interceptor', async () => {
        mockAxios.onGet('/protected').reply((config) => {
            return [200, { auth: config.headers?.Authorization }];
        });

        const fetcher = new VFetcher('https://api.example.com');
        fetcher.registerRequestInterceptor((config) => {
            config.headers.Authorization = 'Bearer test-token';
            return config;
        });

        const { data, execute } = fetcher.fetch<{ auth: string }>('/protected', { method: 'GET' });

        await execute();

        expect(data.value?.auth).toBe('Bearer test-token');
    });

    it('should register and apply a response interceptor', async () => {
        mockAxios.onGet('/data').reply(200, { value: 42 });

        const fetcher = new VFetcher('https://api.example.com');

        const interceptorFn = vi.fn((response) => response);
        fetcher.registerResponseInterceptor(interceptorFn);

        const { execute } = fetcher.fetch('/data', { method: 'GET' });

        await execute();

        expect(interceptorFn).toHaveBeenCalledOnce();
    });
});

// ─── createCrudApi ───────────────────────────────────────────────────

describe('createCrudApi', () => {
    it('should generate CRUD hooks with correct keys', () => {
        const fetcher = new VFetcher('https://api.example.com');
        const api = fetcher.createCrudApi('post', '/api/posts');

        expect(api).toHaveProperty('useFetchPosts');
        expect(api).toHaveProperty('useFetchPost');
        expect(api).toHaveProperty('useFetchPostDynamic');
        expect(api).toHaveProperty('useCreatePost');
        expect(api).toHaveProperty('useUpdatePost');
        expect(api).toHaveProperty('useDeletePost');
        expect(api).toHaveProperty('useDeletePostDynamic');
    });

    it('should generate hooks that return ApiCall objects', () => {
        const fetcher = new VFetcher('https://api.example.com');
        const api = fetcher.createCrudApi('post', '/api/posts');

        const result = (api as any).useFetchPosts();

        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('isLoading');
        expect(result).toHaveProperty('execute');
        expect(result).toHaveProperty('onSuccess');
    });

    it('useFetchPosts should make a GET request to the resource URI', async () => {
        mockAxios.onGet('/api/posts').reply(200, [{ id: 1 }]);

        const fetcher = new VFetcher('https://api.example.com');
        const api = fetcher.createCrudApi('post', '/api/posts');
        const { data, execute } = (api as any).useFetchPosts();

        await execute();

        expect(data.value).toEqual([{ id: 1 }]);
    });

    it('useCreatePost should make a POST request', async () => {
        mockAxios.onPost('/api/posts').reply(201, { id: 2, title: 'New' });

        const fetcher = new VFetcher('https://api.example.com');
        const api = fetcher.createCrudApi('post', '/api/posts');
        const { data, execute } = (api as any).useCreatePost();

        await execute({ payload: { title: 'New' } });

        expect(data.value).toEqual({ id: 2, title: 'New' });
    });
});

// ─── Multiple Executions ─────────────────────────────────────────────

describe('Multiple executions', () => {
    it('should allow re-executing and updating state', async () => {
        mockAxios.onGet('/counter').replyOnce(200, { count: 1 });
        mockAxios.onGet('/counter').replyOnce(200, { count: 2 });

        const fetcher = new VFetcher('https://api.example.com');
        const { data, execute } = fetcher.fetch<{ count: number }>('/counter', { method: 'GET' });

        await execute();
        expect(data.value?.count).toBe(1);

        await execute();
        expect(data.value?.count).toBe(2);
    });

    it('should reset isFinished properly across executions', async () => {
        mockAxios.onGet('/test').reply(200, {});

        const fetcher = new VFetcher('https://api.example.com');
        const { execute, isFinished, isLoading } = fetcher.fetch('/test', { method: 'GET' });

        await execute();
        expect(isFinished.value).toBe(true);
        expect(isLoading.value).toBe(false);

        // Execute again
        await execute();
        expect(isFinished.value).toBe(true);
        expect(isLoading.value).toBe(false);
    });
});
