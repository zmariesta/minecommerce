import { seedCustomers, seedOrders, seedProducts } from "@/lib/seed";
import type { Customer, Order, Product } from "@/lib/types";

const keys = { products: "commercepilot.products.v1", orders: "commercepilot.orders.v1", customers: "commercepilot.customers.v1" } as const;
function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
function read<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return clone(seed);
  try { const raw = window.localStorage.getItem(key); if (!raw) return clone(seed); return JSON.parse(raw) as T; }
  catch { return clone(seed); }
}
function write<T>(key: string, value: T): void {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}
export async function getProducts(): Promise<Product[]> { return read(keys.products, seedProducts); }
export async function saveProducts(items: Product[]): Promise<Product[]> { write(keys.products, items); return items; }
export async function getOrders(): Promise<Order[]> { return read(keys.orders, seedOrders); }
export async function saveOrders(items: Order[]): Promise<Order[]> { write(keys.orders, items); return items; }
export async function getCustomers(): Promise<Customer[]> { return read(keys.customers, seedCustomers); }
export async function saveCustomers(items: Customer[]): Promise<Customer[]> { write(keys.customers, items); return items; }
export function resetDemoData(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(keys.products); window.localStorage.removeItem(keys.orders); window.localStorage.removeItem(keys.customers);
}
