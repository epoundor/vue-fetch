# **@epoundor/vue-fetch**

> The ultimate solution for making API calls in your Vue.js 3 projects — reactive, typed, and simple.

## **Installation**

```bash
npm i @epoundor/vue-fetch
# or
pnpm add @epoundor/vue-fetch
```

**Peer dependencies:** `vue >= 3.3`, `axios >= 1.5`

## **Quick Start**

```ts
import { VFetcher } from "@epoundor/vue-fetch";

const api = new VFetcher("https://api.example.com");

// Make a simple GET request
const { data, isLoading, execute } = api.fetch<User[]>("/users", { method: "GET" });
execute();
```

## **Usage**

### Creating an instance

```ts
import { VFetcher } from "@epoundor/vue-fetch";

// Simple — just a base URL
const api = new VFetcher("https://api.example.com");

// With base URL + custom Axios config
const api = new VFetcher("https://api.example.com", {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Config only — no separate base URL
const api = new VFetcher({
  baseURL: "https://api.example.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
```

### Making requests

The `fetch` method returns a reactive `ApiCall` object with state and callbacks:

```ts
interface ApiCall<T, PayloadType> {
  // Reactive state (ComputedRef)
  isLoading: ComputedRef<boolean>;
  isFinished: ComputedRef<boolean>;
  isAborted: ComputedRef<boolean>;
  statusCode: ComputedRef<number>;
  response: ComputedRef<AxiosResponse | null>;
  error: ComputedRef<AxiosError | null>;
  data: ComputedRef<T | null>;

  // Methods
  execute: (config?: Partial<Option<PayloadType>>) => Promise<void>;
  onSuccess: (cb: SuccessCallBack<T>) => void;
  onFailure: (cb: FailureCallBack) => void;
  onError: (cb: ErrorCallBack) => void;
  onUploadProgress: (cb: UploadProgressCallBack) => void;
}
```

#### GET request

```ts
const { data, isLoading, execute, onSuccess, onError } = api.fetch<Post[]>("/posts", {
  method: "GET",
  immediate: true, // executes immediately
});

onSuccess((posts, response) => {
  console.log("Fetched posts:", posts);
});

onError((error) => {
  console.error("Network error:", error);
});
```

#### POST request

```ts
const { execute, onSuccess, onFailure } = api.fetch<Post, CreatePostPayload>("/posts", {
  method: "POST",
});

onSuccess((post) => {
  console.log("Created:", post);
});

onFailure((data, response) => {
  // Server responded with 4xx/5xx
  console.error("Validation error:", data);
});

// Execute with payload
execute({ payload: { title: "Hello", body: "World" } });
```

#### Dynamic route params

Uses `path-to-regexp` for URL parameter interpolation:

```ts
const { execute } = api.fetch<Post>("/posts/:id", { method: "GET" });

// Replace :id with actual value
execute({ routeParams: { id: 42 } });
```

### Interceptors

Register Axios interceptors for auth tokens, logging, etc.:

```ts
// Request interceptor — e.g. attach auth token
api.registerRequestInterceptor((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

// Response interceptor — e.g. handle 401
api.registerResponseInterceptor(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);
```

### Auto-generated CRUD hooks

`createCrudApi` generates composable-style hooks for a resource:

```ts
const postApi = api.createCrudApi("post", "/api/posts");

// Generated hooks:
// postApi.useFetchPosts()     — GET /api/posts
// postApi.useFetchPost(id)    — GET /api/posts/:id
// postApi.useFetchPostDynamic()  — GET /api/posts/:id (with routeParams)
// postApi.useCreatePost()     — POST /api/posts
// postApi.useUpdatePost(id)   — PUT /api/posts/:id
// postApi.useDeletePost(id)   — DELETE /api/posts/:id
// postApi.useDeletePostDynamic() — DELETE /api/posts/:id (with routeParams)
```

## **Recommended Pattern**

Create composable hooks per resource for clean separation:

```ts
// composables/usePosts.ts
import { api } from "@/lib/api";

export function useFetchPosts() {
  return api.fetch<Post[]>("/posts", { method: "GET" });
}

export function useCreatePost() {
  return api.fetch<Post, CreatePostPayload>("/posts", { method: "POST" });
}
```

```vue
<script setup lang="ts">
import { useFetchPosts } from "@/composables/usePosts";
import { onMounted } from "vue";

const { data: posts, isLoading, execute: fetchPosts, onError } = useFetchPosts();

onError((error) => {
  console.error("Something went wrong", error);
});

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>
```

## **Callbacks**

| Callback | When triggered | Parameters |
|---|---|---|
| `onSuccess` | Server responded with 2xx | `(data: T, response: AxiosResponse, axiosInstance: AxiosInstance)` |
| `onFailure` | Server responded with 4xx/5xx | `(data: any, response: AxiosResponse)` |
| `onError` | Network error / no response | `(error: AxiosError)` |
| `onUploadProgress` | Upload progress event | `(progressEvent: AxiosProgressEvent)` |

## **Features**

- 🎯 **Type-safe** — Full TypeScript generics for request/response types
- ⚡ **Reactive** — All state exposed as Vue `ComputedRef` values
- 🔌 **Interceptors** — Register Axios request/response interceptors
- 🛣️ **Dynamic routes** — URL parameter interpolation with `path-to-regexp`
- 📦 **CRUD generator** — Auto-generate composable hooks for any resource
- 📤 **Upload progress** — Built-in upload progress tracking
- 🎛️ **Flexible** — Pass payload, params, headers, and route params per-call

## **License**

This package is open-sourced software licensed under the **[MIT license](https://opensource.org/licenses/MIT)**.

## **Author**

Created and maintained by [Epoundor](https://github.com/epoundor).

**Contributors:** [Aimé Sagbo](https://github.com/Goldy98)
