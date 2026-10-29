# CommercePilot — Admin Dashboard + Customer Storefront

Portfolio project untuk melamar posisi **Frontend Developer Middle to Senior**. Aplikasi e-commerce demo dengan dashboard admin dan storefront pelanggan. Project ini dibuat untuk mendemonstrasikan component architecture, typed forms, server-state management, tabel data, accessibility dasar, alur checkout, dan testing.

> **Penting:** Ini adalah demo frontend untuk portfolio. Data disimpan di `localStorage` browser, bukan database permanen. Tidak ada authentication, payment gateway, ataupun pengiriman sungguhan. Riwayat pesanan berbasis email bukan sistem keamanan. Grafik sales dibuat ilustratif; angka operasional lain berasal dari seed data demo.

## Fitur

- Dashboard ringkasan revenue, pesanan, pelanggan, persediaan, dan grafik ilustratif.
- Product CRUD: create, edit, delete, search, filter status, sorting, pagination.
- Order management: search/filter dan update status dengan optimistic update.
- Customer directory admin dengan ringkasan transaksi.
- Storefront pelanggan di `/store`: katalog, filter kategori, pencarian, sorting, detail produk, keranjang, dan checkout demo.
- Riwayat pesanan pelanggan di `/store/orders`, dicari memakai email checkout (tanpa login sungguhan).
- Checkout demo menulis order dan pelanggan ke data lokal admin serta mengurangi stok produk. Tidak ada payment gateway atau pengiriman sesungguhnya.
- Product form memakai React Hook Form + Zod, termasuk pesan validasi.
- Penyimpanan di browser melalui `localStorage`, tombol reset data demo di halaman Settings.
- Contoh Next.js Route Handler pada `GET/POST /api/products` untuk memperlihatkan bentuk integrasi API.
- Unit test Vitest dan smoke test Playwright.

## Tech stack

- Next.js App Router + React + TypeScript
- Tailwind CSS untuk konfigurasi utilitas; UI inti menggunakan CSS komponen agar mudah dikustomisasi
- TanStack Query untuk cache/server-state pattern, mutations, invalidation, optimistic updates
- TanStack Table untuk tabel produk
- React Hook Form + Zod untuk form validation
- Zustand untuk pencarian global
- Vitest + Playwright untuk testing

## Prasyarat

- Node.js 20.9+ (Node 22 LTS direkomendasikan)
- npm

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Perintah

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # production server (jalankan build dahulu)
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run test       # unit tests
npm run test:e2e   # Playwright smoke tests
```

Jika menjalankan E2E test untuk pertama kali, instal browser Playwright dengan `npx playwright install chromium`.

## Peta halaman

### Admin

- `/` — Dashboard analytics
- `/products` — katalog dengan table search/filter/sorting/pagination
- `/products/new` — form pembuatan produk
- `/products/[id]/edit` — form edit produk
- `/orders` — order list dan perubahan status
- `/customers` — direktori pelanggan
- `/settings` — arsitektur demo dan reset data
- `/api/products` — contoh Route Handler API

### Pelanggan / storefront

- `/store` — beranda dan katalog pelanggan
- `/store/products/[id]` — detail produk pelanggan
- `/store/cart` — keranjang pelanggan
- `/store/checkout` — checkout demo, memperbarui data order/pelanggan/stok lokal
- `/store/orders` — riwayat pesanan berdasarkan email

## Arsitektur penting

```text
app/                       # Next.js App Router pages and API route
components/                # UI building blocks and page clients
lib/types.ts               # Domain types
lib/seed.ts                # Seed dataset for demo
lib/schemas.ts             # Zod schema shared by form/API example
lib/storage.ts             # localStorage adapter; replace for a real backend
lib/query-hooks.ts         # TanStack Query hooks and mutations
lib/ui-store.ts             # Tiny shared UI state (Zustand)
lib/format.ts              # Pure formatting / calculation helpers and tests
tests/e2e/                 # Playwright browser smoke tests
```

### Data and caching

TanStack Query caches browser queries for products, orders, and customers. Mutation hooks invalidate query keys after successful changes. Order status changes use an optimistic update and roll back to the previous cached value if a mutation fails. In this demo, writes to `localStorage` are the mutation boundary. For a real product, replace `lib/storage.ts` with typed `fetch()` requests to authenticated Route Handlers or a separate API.

### SSR and hydration

Pages and layouts use the Next.js App Router defaults (Server Components unless marked with `"use client"`). Interactive table/form/dashboard modules are client components. Browser-only storage is accessed from client query functions, not while rendering server components. This avoids reading `window` during server rendering. The app's HTML shell is still server-rendered by Next.js; the data demo is populated by client-side queries. For an interview, be ready to explain when server fetching and server-side caching would be preferable once a real database/API is added.

### TanStack Start

The role mentions TanStack Start as well as Next.js. This main application uses Next.js as its production-style primary framework to avoid mixing two routers in one app. An optional isolated starter template is included in `examples/tanstack-start-demo/`; run it separately, not from the root workspace. See its own README for commands. Verify package versions against current official docs before extending the starter.

## Before deploying or using real data

1. Implement authentication and server-enforced authorization.
2. Replace localStorage with a database-backed API and server-side validation.
3. Add audit logging, rate limiting, CSRF protections where applicable, observability, and error reporting.
4. Add pagination/filtering at the API/database layer for large datasets.
5. Add accessibility review and run Lighthouse/Web Vitals on the deployed build.
6. Do not present the illustrative chart as real sales analytics; connect actual data or keep the label explicit.

## How to present this in a portfolio

1. Deploy the Next.js app and provide a public read-only demo if possible.
2. Upload this repository to GitHub with a useful project description and screenshots.
3. Include a short architecture diagram, test commands/results, and a section explaining trade-offs.
4. Do not claim test/build/performance results until you have run them locally and verified the output.
