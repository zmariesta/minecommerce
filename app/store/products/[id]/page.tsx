import type { Metadata } from "next";
import { ProductDetail } from "@/components/store/storefront-pages";
export const metadata: Metadata = { title: "Detail Produk" };
export default async function StoreProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
