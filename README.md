# 📘 reactive-query-z

[![NPM](https://img.shields.io/npm/v/reactive-query-z.svg)](https://www.npmjs.com/package/reactive-query-z)
![Downloads](https://img.shields.io/npm/dt/reactive-query-z.svg)

---

**reactive-query-z** is a lightweight, reactive, and fully-featured data-fetching and state orchestration library for React.
It is a **React Query alternative** with built-in support for REST, GraphQL, real-time subscriptions, caching, optimistic updates, and global query invalidation.

***Note:*** For full-featured query management, see [React Query](https://tanstack.com/query/v4)

[Live Example](https://codesandbox.io/p/sandbox/tmxkm5)

---

## ✨ Features

* Lightweight and reactive, fully hook-based
* Supports REST + GraphQL queries
* Full CRUD support (POST/PUT/PATCH/DELETE)
* Optimistic updates for smooth UI experience
* Auto stale-time + background refetch
* Global query invalidation
* Real-time subscriptions via WebSocket / SSE
* Cache + deduplication
* Fully TypeScript-ready

---

## 📦 Installation

```bash
npm install reactive-query-z
# or
yarn add reactive-query-z
```

---

## 🚀 Basic Usage

### 1️⃣ Querying REST Data

```ts
import { useQuery, queryRegistry } from "reactive-query-z";

type User = { id: number; name: string };

function UserList() {
  const { data: users, loading, refetch, error } = useQuery<User[]>("/api/users", {
    cacheKey: "users-list",
    staleTime: 5000,
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {users?.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
      <button onClick={refetch}>Refetch</button>
      <button onClick={() => queryRegistry.invalidate("users-list")}>Invalidate</button>
    </div>
  );
}

```

---

### 2️⃣ GraphQL Queries with Real-time Subscription

```ts
import { useHybridQuery } from "reactive-query-z";

type Message = { id: number; text: string };

function MessageList() {
  const { data: messages } = useHybridQuery<Message[]>("/graphql", {
    query: `
      query GetMessages {
        messages { id text }
      }
    `,
    options: {
      cacheKey: "messages-list",
      subscriptionUrl: "ws://localhost:4000",
      optimisticUpdate: (prev, newData) => [...(prev || []), ...(newData || [])],
      staleTime: 3000,
    },
  });

  return (
    <ul>
      {messages?.map(m => <li key={m.id}>{m.text}</li>)}
    </ul>
  );
}
```

---

### 3️⃣ Mutations (CRUD)

```ts
import { useMutation, queryRegistry } from "reactive-query-z";

type User = { id: number; name: string };

function AddUserButton() {
  const { mutate: createUser } = useMutation<User>("/api/users", {
    cacheKey: "users-list",
    optimisticUpdate: (prev, newUser) => [...(prev || []), newUser],
    onSuccess: () => queryRegistry.invalidate("users-list"),
  });

  return <button onClick={() => createUser({ name: "New User" })}>Add User</button>;
}
```

---

### 4️⃣ GraphQL Mutations

```ts
import { useGraphQLMutation, queryRegistry } from "reactive-query-z";

type Message = { id: number; text: string };

function SendMessageButton() {
  const { mutate } = useGraphQLMutation<{ createMessage: Message }>("/graphql", {
    mutation: `
      mutation CreateMessage($text: String!) {
        createMessage(text: $text) { id text }
      }
    `,
    variables: { text: "Hello world!" },
    cacheKey: "messages-list",
    optimisticUpdate: (prev, newData) => [...(prev || []), newData.createMessage],
    onSuccess: () => queryRegistry.invalidate("messages-list"),
  });

  return <button onClick={() => mutate()}>Send Message</button>;
}
```

---

### 5️⃣ Global Query Invalidation

```ts
import { queryRegistry } from "reactive-query-z";

// Invalidate a specific query
queryRegistry.invalidate("users-list");

// Invalidate all queries
queryRegistry.invalidate();
```

---

### 6️⃣ Real-time Subscriptions

```ts
import { useHybridQuery } from "reactive-query-z";

const { data } = useHybridQuery<Message[]>('/graphql', {
  subscriptionUrl: "ws://localhost:4000",
  cacheKey: "messages-list",
});
```

---

## 🔧 API Reference

### `useQuery<T>(endpoint: string, options?: QueryOptions)`

```ts
interface QueryOptions {
  cacheKey?: string;
  staleTime?: number;           // polling interval in ms
  autoRefetch?: boolean;
  interval?: number;            // auto refetch interval
  timeout?: number;             // request timeout in ms
  headers?: Record<string, string>;
  retry?: number;               // number of retries
  retryDelay?: number;          // initial retry delay in ms
  optimisticUpdate?: <T>(prevData: T | null, newData: T) => T;
}
```
Returns:

```ts
{
  data: T | null;
  error: Error | null;
  loading: boolean;
  start: () => Promise<T | null>;      // initial / manual fetch
  refetch: () => Promise<T | null>;    // with retry
  setData: (data: T) => void;          // manual update
  cancel: () => void;                   // cancel in-flight request
}
```

---

### `useHybridQuery<T>(endpoint: string, options: HybridQueryParams<T>)`

```ts
interface HybridQueryParams<T> {
  query?: string;                        // GraphQL query string
  variables?: Record<string, any>;
  options?: {
    cacheKey?: string;
    staleTime?: number;                  // ms
    subscriptionUrl?: string;            // WebSocket / SSE
    optimisticUpdate?: (prev: T | null, newData: T) => T;
    headers?: Record<string, string>;
    retry?: number;
    retryDelay?: number;
  };
}
```

Returns:

```ts
{
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<T | null>;
  mutate: (data: T) => void;           // optimistic update
  cancel: () => void;
}
```

---

### `useMutation<T>(endpoint: string, options?: MutationOptions<T>)`

```ts
interface MutationOptions<T> {
  cacheKey?: string;
  optimisticUpdate?: (prevData: any, newData: T) => any;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  retry?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}
```

Returns:

```ts
{
  mutate: (body: any, method?: "POST" | "PUT" | "PATCH" | "DELETE") => Promise<T>;
  loading: boolean;
  error: any;
  cancel: () => void;
}
```

---

### `useGraphQLMutation<T>(endpoint: string, options: GraphQLMutationOptions<T>)`

```ts
interface GraphQLMutationOptions<T> {
  mutation: string;
  variables?: Record<string, any>;
  cacheKey?: string;
  optimisticUpdate?: (prev: T | undefined, newData: T) => T;
  retry?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

```
Returns:

```ts
{
  mutate: () => Promise<T>;
  cancel: () => void;
}
```

---

## ⚖️ Comparison with Other Libraries

| Feature                    | reactive-fetch      | React Query | SWR  | Apollo Client |
| -------------------------- | ------------------  | ----------- | ---- | ------------- |
| REST support               | ✅                  | ✅           | ✅   | ⚠️ Partial    |
| GraphQL support            | ✅                  | ⚠️ Plugin    | ❌   | ✅            |
| Real-time subscription     | ✅                  | ⚠️ Plugin    | ❌   | ✅            |
| Global cache invalidation  | ✅                  | ✅           | ⚠️   | ✅            |
| Optimistic updates         | ✅                  | ✅           | ⚠️   | ✅            |
| Auto stale-time + refetch  | ✅                  | ✅           | ✅   | ✅            |
| Full CRUD mutation support | ✅                  | ✅           | ❌   | ✅            |
| TypeScript friendly        | ✅                  | ✅           | ✅   | ✅            |
| Lightweight                | ✅                  | ⚠️           | ✅   | ⚠️            |
| Subscription built-in      | ✅                  | ❌           | ❌   | ✅            |

---

## 📜 License

MIT
