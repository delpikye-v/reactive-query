# 🚀 reactive-query-z

[![NPM](https://img.shields.io/npm/v/reactive-query-z.svg)](https://www.npmjs.com/package/reactive-query-z)
![Downloads](https://img.shields.io/npm/dt/reactive-query-z.svg)

---

**reactive-query-z** is a **lightweight**, reactive data-fetching library for React, built with hooks and TypeScript in mind.
Minimal API surface, predictable behavior, and production-ready features.

[Live Example](https://codesandbox.io/p/sandbox/tmxkm5)

---

### ✨ Features

* ⚡ Lightweight & hook-based
* 🔁 REST + GraphQL support
* ✍️ Full CRUD mutations
* 💾 Cache with global invalidation
* 🚀 Optimistic UI updates
* ♻️ Stale-while-revalidate
* 📡 Real-time subscriptions (WebSocket / SSE)
* 🧩 Middleware system (auth, logging, retry, timeout…)
* 🧠 TypeScript-first API

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
import { useQuery } from "reactive-query-z";

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
      // headers: { "Content-Type": "application/json" },
      cacheKey: "countries",
      // staleTime: 5000,
      // autoFetch: true,
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
export function AddPostGraphQL() {
  const { mutate, loading, error } = useGraphQLMutation(
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
      // headers: { "Content-Type": "application/json" },
      // cacheKey: "postsGraphQL",
      onSuccess: () => queryRegistry.invalidate("postsGraphQL"),
      onError: (err) => console.error("Mutation error", err),
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

### 5️⃣ Global Query Invalidation & GlobalError

```ts
import { queryRegistry, setGlobalErrorHandler } from "reactive-query-z";

queryRegistry.invalidate("users"); // specific
queryRegistry.invalidate();        // all queries

// Setup a global error handler
setGlobalErrorHandler((error, info) => {
  console.error("Global fetch error:", error, info);
  // You can show a toast, modal, or redirect to login here
});
```

---

### 6️⃣ Real-time Subscriptions

```ts
import { useHybridQuery } from "reactive-query-z";

const { data } = useHybridQuery("/graphql", {
  subscriptionUrl: "ws://localhost:4000",
  cacheKey: "messages",
  // optimisticUpdate: (prev, next) => [...(prev || []), next],
  // autoFetch: true,     
});
```

---

## 🔧 API Reference

```ts
useQuery
useMutation
useGraphQLQuery
useGraphQLMutation
useHybridQuery
queryRegistry

prefetchQuery
prefetchData
fetchWithRetry
commonFetch
setGlobalErrorHandler
```

---

## ⚖️ Comparison with Other Libraries

| Feature                    | reactive-query-z    | React Query | SWR  | Apollo Client |
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

## 🤔 Why reactive-query-z?

* You want React Query–like power but with simpler internals
* You need REST + GraphQL without separate clients
* You want middleware control over every request
* You prefer explicit cache keys & invalidation
* You want something easy to read, debug, and extend

***Note:*** For full-featured query management, see [React Query](https://tanstack.com/query/v4)

---

## 📜 License

MIT
