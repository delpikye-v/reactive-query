# 🗄️ reactive-query-z

[![NPM](https://img.shields.io/npm/v/reactive-query-z.svg)](https://www.npmjs.com/package/reactive-query-z) ![Downloads](https://img.shields.io/npm/dt/reactive-query-z.svg)

[LIVE EXAMPLE](https://codesandbox.io/p/sandbox/tmxkm5)

**reactive-query-z** is a **lightweight**, reactive data-fetching library for React, built with hooks and TypeScript in mind.

> Minimal API surface, predictable behavior, and production-ready features.

---

## ✨ Why reactive-query-z

* ⚡ Lightweight & hook-based
* 🔁 REST + GraphQL support
* ✍️ Full CRUD mutations
* 💾 Cache with global invalidation
* 🚀 Optimistic UI updates
* ♻️ Stale-while-revalidate
* 📡 Real-time subscriptions (WebSocket / SSE)
* 🧩 Middleware system (auth, logging, retry, timeout…)
* 🧠 TypeScript-first API

***Note:*** For full-featured query management, see [*React Query*](https://tanstack.com/query/v4)

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

type User = { id: string; title: string };

function UserList() {
  const {
    data: users,
    loading,
    refetch,
    error,
  } = useQuery<User[]>("https://jsonplaceholder.typicode.com/posts", {
    cacheKey: "users-list",
    // staleTime: 5000,
    cacheTime: 10000,
    // autoFetch: true,
    headers: { "Content-Type": "application/json" },
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <button onClick={() => refetch()}>Refetch</button>
      <button onClick={() => queryRegistry.invalidate("users-list")}>
        Invalidate
      </button>

      <ul>
        {users?.map((u) => (
          <li key={u.id}>{u.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 2️⃣ GraphQL Query

```ts
import { useGraphQLQuery } from "reactive-query-z";

type Country = { code: string; name: string; emoji: string };

export function CountriesList() {
  const { data, loading, error, refetch } = useGraphQLQuery<{ countries: Country[] }>(
    "https://countries.trevorblades.com/",
    {
      query: `
        query {
          countries { code name emoji }
        }
      `,
      cacheKey: "countries",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      <button disabled={loading} onClick={refetch}>Refetch</button>
      <br />
      {data?.countries?.map(c => (
        <li key={c.code}>{c.name} {c.emoji}</li>
      ))}
    </ul>
  );
}
```

---

### 3️⃣ Mutations (REST)

```ts
import { useMutation, queryRegistry } from "reactive-query-z";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export function AddPost() {
  const { mutate, loading } = useMutation<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      cacheKey: "posts",
      optimisticUpdate: (prev, newPost) => newPost,
      onSuccess: () => queryRegistry.invalidate("posts"),
    }
  );

  const handleAdd = () => {
    mutate({
      title: "New Post",
      body: "This is a new post",
      userId: 1,
    });
  };

  return (
    <button onClick={handleAdd} disabled={loading}>
      {loading ? "Adding..." : "Add Post"}
    </button>
  );
}
```

---

### 4️⃣ GraphQL Mutation

```ts
import { useGraphQLMutation, queryRegistry } from "reactive-query-z";

export function AddPostGraphQL() {
  const { mutate, loading } = useGraphQLMutation(
    "https://graphqlzero.almansi.me/api",
    {
      mutation: `
        mutation ($title: String!, $body: String!, $userId: ID!) {
          createPost(input: { title: $title, body: $body, userId: $userId }) {
            id
            title
            body
          }
        }
      `,
      variables: { title: "Hello", body: "World", userId: 122 },
      onSuccess: () => queryRegistry.invalidate("postsGraphQL"),
    }
  );

  return (
    <button onClick={mutate} disabled={loading}>
      {loading ? "Adding..." : "Add Post"}
    </button>
  );
}
```

---

### 5️⃣ Global Query Invalidation & Global Error Handling

```ts
import { queryRegistry, setGlobalErrorHandler } from "reactive-query-z";

queryRegistry.invalidate("users"); // specific
queryRegistry.invalidate();        // all queries

setGlobalErrorHandler((error, info) => {
  console.error("Global fetch error:", error, info);
});
```

---

### 6️⃣ Real-time Subscriptions

```ts
import { useHybridQuery } from "reactive-query-z";

const { data } = useHybridQuery("/graphql", {
  subscriptionUrl: "ws://localhost:4000",
  cacheKey: "messages",
});
```

---

### 7️⃣ Prefetch & Request Deduplication

#### 🔹 queryClient.fetchQuery

```ts
import { queryClient } from "reactive-query-z";

await queryClient.fetchQuery<User[]>(
  "https://jsonplaceholder.typicode.com/users",
  { cacheKey: "users" }
);
```

#### 🔹 queryClient.ensureQueryData (recommended)

```ts
import { queryClient, useQuery } from "reactive-query-z";

type User = { id: number; name: string };

async function preloadUsers() {
  await queryClient.ensureQueryData<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    { cacheKey: "users" }
  );
}

function Users() {
  const { data, loading } = useQuery<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    { cacheKey: "users" }
  );

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## 🔧 API Reference

```ts
useQuery
useMutation
useGraphQLQuery
useGraphQLMutation
useHybridQuery

queryClient
queryRegistry

prefetchQuery
prefetchData
fetchWithRetry
commonFetch
setGlobalErrorHandler
```

---

## ⚖️ Comparison with Other Libraries

| Feature                   | reactive-query-z | React Query | SWR  | Apollo Client |
| ------------------------- | ---------------- | ----------- | ---- | ------------- |
| REST support              | ✅                | ✅          | ✅   | ⚠️ Partial    |
| GraphQL support           | ✅                | ⚠️ Plugin   | ❌   | ✅            |
| Real-time subscription    | ✅                | ⚠️ Plugin   | ❌   | ✅            |
| Global cache invalidation | ✅                | ✅          | ⚠️   | ✅            |
| Optimistic updates        | ✅                | ✅          | ⚠️   | ✅            |
| Stale-while-revalidate    | ✅                | ✅          | ✅   | ✅            |
| Full CRUD mutations       | ✅                | ✅          | ❌   | ✅            |
| TypeScript-first          | ✅                | ✅          | ✅   | ✅            |
| Lightweight               | ✅                | ⚠️          | ✅   | ⚠️            |
| Subscription built-in     | ✅                | ❌          | ❌   | ✅            |

---

## When to use
- You want full control over async orchestration
- You dislike heavy cache lifecycles
- You prefer explicit invalidation

---

## When NOT to use
- You need background refetch
- You need offline persistence

---

## 📜 License

MIT
