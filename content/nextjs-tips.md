---
title: "Next.js Tips for Beginners"
description: "Practical tips to get started with Next.js App Router."
date: "2025-10-05"
---

Here are some quick tips:

1. Pages in the `app` directory are server components by default.
2. Use `generateStaticParams` to statically generate dynamic routes.
3. Store secrets in `.env.local` and never commit real credentials.

```ts
// Example: generateStaticParams in a dynamic route
export async function generateStaticParams() {
  return [{ slug: "hello-world" }];
}
```

Learn by building! 🚀

