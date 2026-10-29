import type { Metadata } from "next";
import ProductForm from "@/components/product-form";
export const metadata: Metadata = { title: "Tambah Produk" };
export default function NewProductPage() { return <ProductForm mode="create" />; }
