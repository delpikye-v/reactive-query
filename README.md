# 🚀 reactive-query-z

[![NPM](https://img.shields.io/npm/v/reactive-query-z.svg)](https://www.npmjs.com/package/reactive-query-z)
![Downloads](https://img.shields.io/npm/dt/reactive-query-z.svg)

---

**reactive-query-z** is a lightweight, reactive data-fetching library for React, built with hooks and TypeScript in mind.
Minimal API surface, predictable behavior, and production-ready features.

***Note:*** For full-featured query management, see [React Query](https://tanstack.com/query/v4)

[Live Example](https://codesandbox.io/p/sandbox/tmxkm5)

---

## ✨ Features

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

type User = { id: number; name: string };

function UserList() {
  const { data, loading, error, refetch } = useQuery<User[]>("/api/users", {
    cacheKey: "users",
    staleTime: 5000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul>
        {data?.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
      <button onClick={refetch}>Refetch</button>
    </>
  );
}
```

---

### 2️⃣ GraphQL Query

```ts
import { useGraphQLQuery } from "reactive-query-z";

type Message = { id: string; text: string };

function Messages() {
  const { data } = useGraphQLQuery<{ messages: Message[] }>("/graphql", {
    query: `
      query {
        messages { id text }
      }
    `,
    cacheKey: "messages",
    staleTime: 3000,
  });

  return (
    <ul>
      {data?.messages.map(m => (
        <li key={m.id}>{m.text}</li>
      ))}
    </ul>
  );
}
```

---

### 3️⃣ Mutations (REST)

```ts
import { useMutation, queryRegistry } from "reactive-query-z";

type User = { id: number; name: string };

function AddUser() {
  const { mutate } = useMutation<User>("/api/users", {
    cacheKey: "users",
    optimisticUpdate: (prev, user) => [...(prev || []), user],
    onSuccess: () => queryRegistry.invalidate("users"),
  });

  return (
    <button onClick={() => mutate({ name: "New User" })}>
      Add User
    </button>
  );
}
```

---

### 4️⃣ GraphQL Mutation

```ts
import { useGraphQLMutation, queryRegistry } from "reactive-query-z";

function SendMessage() {
  const { mutate } = useGraphQLMutation("/graphql", {
    mutation: `
      mutation ($text: String!) {
        createMessage(text: $text) { id text }
      }
    `,
    variables: { text: "Hello!" },
    cacheKey: "messages",
    onSuccess: () => queryRegistry.invalidate("messages"),
  });

  return <button onClick={() => mutate()}>Send</button>;
}
```

---

### 5️⃣ Global Query Invalidation

```ts
import { queryRegistry } from "reactive-query-z";

queryRegistry.invalidate("users"); // specific
queryRegistry.invalidate();        // all queries
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

### 7️⃣ Middleware

```ts
import { useMiddleware } from "reactive-query-z";

// Logger
useMiddleware("logger", async ctx => {
  console.log(ctx.method, ctx.endpoint, ctx.body);
  return ctx;
});

// Auth
useMiddleware("auth", async ctx => ({
  ...ctx,
  options: {
    ...ctx.options,
    headers: {
      ...ctx.options?.headers,
      Authorization: `Bearer ${token}`,
    },
  },
}));
```

---

## 🔧 API Reference

```ts
useQuery
useMutation
useGraphQLQuery
useGraphQLMutation
useHybridQuery
prefetchQuery
queryRegistry
useMiddleware
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

## 🤔 Why reactive-query-z?

* You may want reactive-query-z if:
* You want React Query–like power but with simpler internals
* You need REST + GraphQL without separate clients
* You want middleware control over every request
* You prefer explicit cache keys & invalidation
* You want something easy to read, debug, and extend

---

## 📜 License

MIT
