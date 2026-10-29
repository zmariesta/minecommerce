"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomers, getOrders, getProducts, saveOrders, saveProducts } from "@/lib/storage";
import type { Order, Product } from "@/lib/types";
import type { ProductInput } from "@/lib/schemas";

export const queryKeys = { products: ["products"] as const, orders: ["orders"] as const, customers: ["customers"] as const };
export function useProducts() { return useQuery({ queryKey: queryKeys.products, queryFn: getProducts }); }
export function useOrders() { return useQuery({ queryKey: queryKeys.orders, queryFn: getOrders }); }
export function useCustomers() { return useQuery({ queryKey: queryKeys.customers, queryFn: getCustomers }); }
export function useSaveProduct() {
  const client = useQueryClient();
  return useMutation({ mutationFn: async ({ input, id }: { input: ProductInput; id?: string }) => {
    const products = await getProducts();
    if (id) {
      const updated = products.map(item => item.id === id ? { ...item, ...input, status: input.stock === 0 ? "out-of-stock" as const : input.status } : item);
      await saveProducts(updated); return updated.find(item => item.id === id)!;
    }
    const created: Product = { ...input, id: `prd_${Date.now()}`, sku: `CP-${String(Date.now()).slice(-6)}`, createdAt: new Date().toISOString(), status: input.stock === 0 ? "out-of-stock" : input.status };
    await saveProducts([created, ...products]); return created;
  }, onSuccess: async () => { await client.invalidateQueries({ queryKey: queryKeys.products }); } });
}
export function useDeleteProduct() {
  const client = useQueryClient();
  return useMutation({ mutationFn: async (id: string) => { const list = await getProducts(); await saveProducts(list.filter(item => item.id !== id)); }, onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.products }) });
}
export function useUpdateOrder() {
  const client = useQueryClient();
  return useMutation({ mutationFn: async ({ id, status }: { id: string; status: Order["status"] }) => {
    const orders = await getOrders(); const updated = orders.map(order => order.id === id ? { ...order, status } : order); await saveOrders(updated); return updated.find(order => order.id === id)!;
  }, onMutate: async ({ id, status }) => {
    await client.cancelQueries({ queryKey: queryKeys.orders }); const previous = client.getQueryData<Order[]>(queryKeys.orders);
    if (previous) client.setQueryData(queryKeys.orders, previous.map(order => order.id === id ? { ...order, status } : order));
    return { previous };
  }, onError: (_err, _variables, context) => { if (context?.previous) client.setQueryData(queryKeys.orders, context.previous); }, onSettled: () => client.invalidateQueries({ queryKey: queryKeys.orders }) });
}
