# **API Caller Wrapper for Vue.js**

This package allows you to easily make calls to API using Vue.js. It provides a simple and intuitive interface for making API calls and follows the best practices for integrating with the Vue.js lifecycle.

## **Installation**

To install the package, simply run the following command:

```bash
npm i vue-apicaller
```

## **Usage**

To use the package, first import it into your Vue component:

```jsx
import apiCaller from "vue-apicaller";
```

Next , you can use the package's methods to make API calls and handle the responses:

```js
const { data, error, execute, isAborted, isFinished, isLoading } = apiCaller();
```

Additionally, the package provides a comprehensive state management system, allowing you to keep track of the progress of your API calls.

## **Example**

```jsx
Copy code
import {apiCall as api} from 'vue-apicaller'

const {execute } = api("/some-endpoint", { method: "GET" });
await execute()

```

## **Best Pratices**

Use hooks

```js
// api/posts
export function useFecthPosts() {
  return apiCall("/some-endpoint", { method: "GET" });
}
```

```js
import { useFecthPosts } from "./api/posts";
import { onMounted } from "vue";
const {
  execute: fetchPosts,
  registerErrorCallback: onError,
  registerSuccessCallback: onSuccess,
} = useFecthPosts();

onError((error) => {
  console.error("Something went wrong", error);
});
onSuccess((posts) => {
  console.log("Posts", posts);
});
onMounted(() => {
  fetchPosts();
});
```

## **Features**

- Simple and intuitive interface for making API calls
- Automatically handles errors and provides detailed information about any failures
- Comprehensive state management system
- Allows you to define your API calls using an easy-to-use OpenAI declaration file

## **Note**

This package uses axios as a dependency to handle the http calls, so make sure you have it installed in your project.

## **Contributing**

If you have any suggestions or find any bugs, please feel free to open an issue or submit a pull request.

## **License**

This package is open-sourced software licensed under the **[MIT license](https://opensource.org/licenses/MIT)**.

## **Author**

This package is created and maintained by [Epoundor](https://github.com/epoundor)

Enjoy coding!

```

```
