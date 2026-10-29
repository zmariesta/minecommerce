import type { Metadata } from "next";
import ProductsClient from "@/components/products-client";
export const metadata: Metadata = { title: "Produk" };
export default function ProductsPage() { return <ProductsClient />; }
