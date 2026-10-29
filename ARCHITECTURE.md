# Architecture Notes

```mermaid
flowchart TD
  A[Next.js App Router] --> B[Server-rendered Layout / Route Shell]
  B --> C[Client Page Components]
  C --> D[TanStack Query Hooks]
  D --> E[localStorage Adapter]
  C --> F[TanStack Table]
  C --> G[React Hook Form + Zod]
  G --> H[Product Mutation]
  H --> D
  I[Zustand UI Store] --> C
  J[Vitest] --> K[Pure Helpers + Zod Schema]
  L[Playwright] --> C
```

## Important trade-offs

- `localStorage` makes the demo easy to run, but is not multi-user or trusted persistence.
- The app shell is server-rendered by Next.js; interactive pages are client components for TanStack Query and browser storage.
- When connected to an API, move authorization, business invariants, and durable validation to the server. Use database pagination for large tables.
- The chart intentionally labels sample data as illustrative; it must not be presented as actual analytics.

## Customer storefront flow

```mermaid
flowchart LR
  A[Storefront /store] --> B[Product Catalog]
  B --> C[Cart in localStorage]
  C --> D[Demo Checkout]
  D --> E[Order + Customer + Stock update]
  E --> F[Admin Order and Product pages]
  E --> G[Customer Order History by email]
```

Storefront and admin reuse the same browser-local storage adapter. This demonstrates an integrated user flow but is intentionally not secure or multi-user. A real application should use authenticated APIs, database transactions, and server-side stock validation.
